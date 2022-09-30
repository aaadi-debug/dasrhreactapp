const { json } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');   // used at last of this page

require('../db/conn');
const User = require('../model/userSchema');

//register route and sending the data to MongoDB Atlas online

//using promises
// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: `Please fill the fields properly` });
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ eroor: "Email already exist" });
//             }

//             const user = new User({ name, email, phone, work, password, cpassword });

//             user.save().then(() => {
//                 res.status(201).json({ message: `user registered successfully` });
//             }).catch((err) => res.status(500).json({ err: `Failed to register` }));

//         }).catch(err => { console.log(err); })

// });

//using asyc await
router.post('/register',async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: `Please fill the fields properly` });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ eroor: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ eroor: "Password not matching" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            //pre save method for password hashing in userSchema.js

            await user.save();

            res.status(201).json({ message: `User registered successfully` });
        }

    } catch (err) {
        console.log(err);
    }
});


//login route
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password ) {
        return res.status(400).json({ error: `Please fill the fields properly` });
    }

    try {
        let token;
        
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isPasswordMatch = await bcrypt.compare(password, userLogin.password);

            //token generation in userSchema.js and fetching here
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isPasswordMatch) {
                return res.status(400).json({ eroor: "Invalid credentials" });
            } else {
                res.status(201).json({ message: `Signin successfully` });
            }
        } else {
            return res.status(400).json({ eroor: "Email not registered" });
        } 

    } catch (err) {
        console.log(err);
    }
});

// --- about page ----- for middleware means about page will be loaded when login is done with unique id that is jwt 
router.get("/about", authenticate , (req, res) => {         // middleware or authenticate is same
    console.log(`Hello my about`);
    // res.send(`Hello from about server side`);
    res.send(req.rootUser);
})

//for contact auto filled name, email, and phone
router.get("/getdata", authenticate , (req, res) => {         // middleware or authenticate is same
    console.log(`Hello my about`);
    // res.send(`Hello from about server side`);
    res.send(req.rootUser);
})

//contact page
router.post("/contact", authenticate , async (req, res) => {         // middleware or authenticate is same
    try {

        const {  name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log(`Error in contact form`);
            return res.json({ error: `Please fill the contact form` });
        }

        const userContact = await User.findOne({ _id: req.userID });

        //adding contact frontend data to backend database
        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message); 

            await userContact.save();

            res.status(201).json({ message: `User messaged successfully` });
        }

    } catch (error) {
        console.log(error);
    }
})

//logout
router.get("/logout", (req, res) => {         
    console.log(`Hello! I'm logged out`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send(`User logged out`);
})


module.exports = router;