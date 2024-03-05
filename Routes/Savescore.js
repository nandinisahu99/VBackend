const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const jwtSecret = "ShivNandHarshTiyaShubhRuchAnja1$#"
const dotenv = require("dotenv");
dotenv.config();

// router.post(
//     "/score",
 const Savescore =   async (req,res)=>{

        try{
            const score=req.body.score;
            const email = req.body.email;

            await User.updateOne(
                { email: email },
                {
                $set: {
                    score: score
                },
                }
            );
            return res.json({
                message: "Score is stored",
                selected: true,
            });
        }
        catch (err) {
            console.log(err);
            res.json({ err });
        }
    }
// )
module.exports = Savescore;