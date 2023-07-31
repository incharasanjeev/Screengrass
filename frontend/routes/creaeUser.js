const express = require('express');
const router = express.Router();
const User = require('../Modals/user.js');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const jwtSecret="fdbfdnbfddsvsdvvdvdvsvvsvddsbsfbfdbd"

router.post("/createuser", [
  body('email').isEmail(),
  body('password', 'incorrect password').isLength({ min: 5 })
], async (req, res) => {
  console.log(req.body);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(500).send({ errors: result.array() });
  }

  const salt = await bcrypt.genSalt(10);
  let secPassword = await bcrypt.hash(req.body.password, salt);
  

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ error: "User with this email already exists" });
  }  try {
     
    const newUser = await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
    
    });

    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create user" });
  }
}); 


router.post("/loginuser", [body('email').isEmail()], async (req, res) => {
    let email = req.body.email;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(500).send({ errors: result.array() });
    }
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res.status(400).json({ error: "Invalid userid or password" });
      }
      const pwdCompare=await bcrypt.compare(req.body.password,userdata.password);
      if (!pwdCompare) {
        return res.status(400).json({ error: "Invalid userid or password" });
      }
      const data={
        user:{
          id:userdata.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)
      return res.json({ success: true,authToken:authToken})
    }
    catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  })
  
  



module.exports = router;