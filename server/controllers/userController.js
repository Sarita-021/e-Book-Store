const userModel = require('../models/userModel');
const bcrypt = require("bcrypt")

//create user register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        //validation 
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "please Fill all exisits"
            })
        }

        // exisiting user 
        const exisitingUser = await userModel.findOne({ email })
        if (exisitingUser) {
            return res.status(401).send({
                success: false,
                message: 'user already exisits'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)


        //save new user
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'New user Created',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error in Register callback',
            success: false,
            error
        })
    }
};


//get all users
exports.getALLUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'all user data',
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Get All Users',
            error
        })
    }
};


//login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "please provide email or password"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: true,
                message: 'email is registered'
            })
        }
        // password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'login successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login collback',
            error
        })
    }
};
