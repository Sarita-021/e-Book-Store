const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const express = require('express')
const cors = require('cors')

//create user register user
exports.registerController = async (req, res) => {

    try {

        //fetching details form frontend
        const { username, email, password } = req.body

        //Confirming if user has entered all the required details 
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Fill all exists"
            })
        }

        // checking if user already exists
        const exisitingUser = await userModel.findOne({ email })
        if (exisitingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            })
        }

        //Password encryption
        const hashedPassword = await bcrypt.hash(password, 10)

        //saving new user to database with encrypted password
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'New user Created',
            user
        })
    } catch (error) {     //handling errors
        console.log(error)
        return res.status(500).send({
            message: 'Error in Register callback',
            success: false,
            error
        })
    }
};


//getting all users
exports.getALLUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'All user data',
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Getting All Users',
            error
        })
    }
};


//login controller
exports.loginController = async (req, res) => {
    try {

        //fetching email and password entered by user
        const { email, password } = req.body

        //validating if user entered both
        if (!email || !password) {
            return res.status(200).send({
                success: false,
                message: "Please enter email and password"
            })
        }

        // Checking if user exists or not
        const user = await userModel.findOne({ email })   //Checking mail id in db
        console.log(user)
        if (!user) {    //handling if user does not exists
            return res.status(200).send({
                success: true,
                message: 'Email is not registered'
            })
        }

        // checking if password entered is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {         //handling if password does not match
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password',
            })
        }
        return res.status(200).send({       //All credentials matched
            success: true,                  //user ready for login
            message: 'Login successfully',
            user
        })
    } catch (error) {                       //handling unexpected errors
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login callback',
            error
        })
    }
};


// OTP Mail Sending
const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

exports.OTPController = async (req, res) => {
    try {

        //Fetchig variables for required to send otp
        const { email, OTP, procedure } = req.body;

        //Checking if user has entered mailId or not
        if (!email) {
            return res.status(200).send({
                success: false,
                message: "Please Enter Your Email"
            })
        }

        // Checking if user already exists
        const user = await userModel.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        //Creating transporter for sending mail
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            tls: true,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: process.env.MY_EMAIL, // sender address
                to: email,                  // receiver
                subject: procedure, // Subject line
                html: `<!DOCTYPE html>
                  <html lang="en" >
                  <head>
                    <meta charset="UTF-8">
                    <title>OTP Email Template</title>
                    
                  
                  </head>
                  <body>
                  <!-- partial:index.partial.html -->
                  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                      <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">BookRaze</a>
                      </div>
                      <p style="font-size:1.1em">Hi,</p>
                      <p>Thank you for choosing BookRaze. Use the following OTP to complete your Password. OTP is valid for 5 minutes</p>
                      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                      <p style="font-size:0.9em;">Regards,<br />BookRaze</p>
                      <hr style="border:none;border-top:1px solid #eee" />
                      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>BookRaze</p>
                        <p>India</p>
                      </div>
                    </div>
                  </div>
                  <!-- partial -->
                    
                  </body>
                  </html>`,
            });

            console.log("Message sent: %s", info.messageId);

        }

        main().catch(console.error);
        return res.status(200).send({
            success: true,
            message: 'Mail sent'
        })

    } catch (error) {
        // Code to handle errors
        console.log(error)
        return res.status(500).send({
            message: 'Error in mail callback',
            success: false,
            error
        })
    }
}

// Controller to update password in database
exports.updatePassword = async (req, res) => {

    try {
        //fetching details mail id and new password form frontend
        const { email, password } = req.body;

        //Checking if user has entered password or not
        if (!password) {
            return res.status(401).send({
                success: false,
                message: "Please provide new password"
            })
        }

        //finding user 
        const user = await userModel.findOne({ email })

        //Password encryption
        const hashedPassword = await bcrypt.hash(password, 10)

        //updating new password
        await user.updateOne({
            email: email,
            $set: { password: hashedPassword }
        });

        console.log("Password updated");
        await user.save()    //Saving updated password
        return res.status(201).send({
            success: true,
            message: 'Password Updated',
            user
        })

    } catch (error) {    //Handling errors
        console.log(error);
        return res.status(500).send({
            message: 'Error in Register callback',
            success: false,
            error
        })
    }
}


