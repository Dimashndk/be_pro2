require("dotenv").config()
const db = require ("../models")
const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken");
const { use } = require("../routes/auth");

const { User } = db; 
const secretKey = process.env.JWT_SECRET_KEY

module.exports = {
    async register (req, res) {
        const {username, email, phoneNumber, password, confirmPassword} = req.body;
        try {
            const isExist = await User.findOne({
                where:{
                    [db.Sequelize.Op.or]: [{username}, {email}, {phoneNumber}]
                },
            });
                if (isExist) {
                    res.status(400).send ({
                        message: "username / email / phone number already register"
                    });
                    return;
                }

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password,salt);
                
                const newUser = await User.create({
                    username,
                    email,
                    phoneNumber,
                    password:hashPassword
                });
                res.status (201).send({
                    message:"registration is success", 
                    data:{
                        username:newUser.username,
                        email:newUser.email,
                        phoneNumber:newUser.phoneNumber
                    }
                })
        } catch (error) {
            res.status(500).send ({
                message:"something is error with server",
                errors: error
            })
        }
    },
    async login (req, res) {
        const {user_identify,password} = req.body
        try { 
            const user = await User.findOne({
                where: {
                    [db.Sequelize.Op.or]: [
                        {username:user_identify},
                        {email:user_identify},
                        {phoneNumber:user_identify}
                    ]
                }
            });
            const isValid = await bcrypt.compare(password, user.password);
            if (user && isValid) {
                const token = jwt.sign({id:user.id}, secretKey, {expiresIn:"5h"})
                res.send({
                    message:"login success",
                    data:user,
                    accessToken: token
                })
                return;
            } else {
                res.status(400).send ({
                    message:"login failed, incorect identity/password "
                })
            }
        } catch (error) {
            res.status(500).send({
                message:"error on server",
                error,
            })
        }
    }
}