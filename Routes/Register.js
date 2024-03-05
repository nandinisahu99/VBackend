const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const jwtSecret = "ShivNandHarshTiyaShubhRuchAnja1$#"
const dotenv = require("dotenv");
dotenv.config();

router.post(
    "/register",

    async (req, res) => {
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword
        const email = req.body.email
        const fullname = req.body.fullname
        const collegename = req.body.collegename
        const rollnumber = req.body.rollnumber
        const phonenumber = req.body.phonenumber
        try {
            if (fullname.length < 5) {
                return res.json({ success: false, error: "Min length of name should be 5" });
            }
            let userData = await User.findOne({ email });
            if (userData) {
                return res.json({ success: false, error: "Email already exists" })
            }
            if(!(phonenumber.length===10)){
                return res.json({ success: false, error: "Enter valid phone number" })
            }
            if(collegename.length < 1){
                return res.json({ success: false, error: "Enter college name" })
            }
            if(rollnumber.length < 1){
                return res.json({ success: false, error: "Enter roll no." })
            }
            if (password.length < 5) {
                return res.json({ success: false, error: "min length of password should be 5" });
            }
            if (password !== confirmpassword) {
                return res.json({ success: false, error: "Password and confirm Password should be same" });
            }

            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password, salt);

            await User.create({
                fullname: req.body.fullname,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                collegename: req.body.collegename,
                rollnumber: req.body.rollnumber,
                password: secPassword,
            });
            console.log("success");
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false, error: "error" });
        }
    }
);


router.post(
    '/login',

    async (req, res) => {

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
    
        let email = req.body.email;
        try {
          let userData = await User.findOne({email});
          if(!userData){
            return res.status(400).json({ success: false, error: "email doesn't exist"})
          }
    
          const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        
          if(!pwdCompare){
            return res.status(400).json({success: false, error: "incorrect password"})
          }
    
          const data = {
              user:{
                id:userData.id
              }
          }
          const authToken = jwt.sign(data, process.env.jwtSecret)
           return res.json({ success: true, authToken: authToken})
       
    
        } catch (error) {
          console.log(error);
          res.json({ success: false ,error:"error occured! Try again"});
        }
      } 
)

module.exports = router;
