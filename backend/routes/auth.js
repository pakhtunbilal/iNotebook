const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_TOKEN = "bilal is agood b$oy";

// ROUTE:1 create a user using :POST"/api/auth/createuser". no login required
router.post('/createuser', [
   body('name', 'enter a valid name').isLength({ min: 3 }),
   body('email', 'enter a valid email').isEmail(),
   body('password', 'enter a valid password').isLength({ min: 5 })
], async (req, res) => {

   let success = false;

   const result = validationResult(req);
   if (result.isEmpty()) {
      // res.send("homepage")
      // console.log(req.body)

      //check if user with same email already exists!

      try {



         let user = await User.find({ email: req.body.email });
         if (user.length > 0) {
            success = false;
            return res.status(400).json({ success, error:"User with email already exists."})
         } else {
            success = true;
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
               name: req.body.name,
               email: req.body.email,
               password: secPass
            })
            user.save();
            const data = {
               user:{
                  id: user.id
               }
            }
            const authToken = jwt.sign(data, JWT_TOKEN)
            res.json({success, authToken})
            
         }
      } catch (error) {
         success= false
         console.log(success, error)

      }


      // let user = await new User(req.body)
      // user.save()
   } else {
      // if there is error then show error
      res.send({ errors: result.array() });
   }



})

// ROUTE:2 Authenticate a user using :POST"/api/auth/login". no login required

router.post('/login', [
   body('email', 'enter a valid email').isEmail(),
   body('password', 'password cannot be blank').exists()
], async (req, res) => {

   let success = false;
   const result = validationResult(req);
   if (result.isEmpty()) {
      
      const {email, password} = req.body;
      try {
         let user = await User.findOne({email})
         if(!user){
            success = false;
            return res.status(400).json({ success, error:"Please try to login with correct credentials!"})
         }
         const bcryptPassword = await  bcrypt.compare(password, user.password);
         if(!bcryptPassword){
            success = false;
            return res.status(400).json({ success, error:"Please try to login with correct credentials!"})
         }
         else{
            const data = {
               user:{
                  id: user.id
               }
            }
            const authToken = jwt.sign(data, JWT_TOKEN)
            success = true;
            res.json({success, authToken})
         }
      } catch (error) {
         console.log(error)
      }

   } else {
      // if there is error then show error
      res.send({ errors: result.array() });
   }
})

// ROUTE:3 get loggedIn user details using :POST"/api/auth/getuser". login required

router.post('/getuser', fetchuser , async (req, res) => {
   try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
   } catch (error) {
      console.log(error)
   }
})


module.exports = router