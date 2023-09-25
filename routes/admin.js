const express = require('express');
const fetchadmin = require('../middleware/fetchadmin')
const router = express.Router();
const Admin = require('../models/Admin')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_secret = "Talhaisintelligent";
///////////////////////////////////create a admin:get"/api/admin/createadmin"/////////////////
router.post('/createadmin', [
    body('adminname', 'please enter the name').isLength({ min: 5 }),
    body('password', 'password must be atleat 8 character').isLength({ min: 8 }),
  ], async (req, res) => {
    const admincode="admin"
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const numSaltRounds = await bcrypt.genSalt(8);
      const sacpassword = req.body.password;
      const Password = await bcrypt.hash(sacpassword, numSaltRounds);
      const admin = await Admin.create({
        admincode:admincode,
        adminname: req.body.adminname,
        password: Password
      })
      const data = {
        admin: {
          id: admin.id
        }
      }
      var authtokent = jwt.sign(data, JWT_secret);
      res.json({ authtokent });
    } catch (error) {
      res.json({ error: "please enter the valid credential" })
    }
  }
  )
//////////////////////////////////////Login admin:get"/api/admin/adminlogin"////////////////////////////////

router.post('/adminlogin', async (req, res) => {
    try {
      const {adminname, password } = req.body;
      let admin = await Admin.findOne({adminname});
      let success=false;
      if (!admin) {
        return res.status(400).json({success, error: "please try to login correct credentials" })
      }
      const passwordcompare = await bcrypt.compare(password, admin.password);
      if (!passwordcompare) {
        return res.status(400).json({success, error: "please try to login correct credentials" });
      }
      const data = {
        admin: {
          id: admin.id
        }
      }
      success=true;
      var authtoken = jwt.sign(data, JWT_secret);
      res.json({authtoken,success})
  
    } catch (error) {
      console.error(error.message);
      res.json({ error: "please enter the valid credential" })
    }
  
  }
  )
///////////////////////fetchadmin :post"/api/admin/fetchadmin"////////////////////////////
router.post('/fetchadmin', fetchadmin, async (req, res) => {
    let success=false
    try {
      const userId = req.admin.id;
      const user = await Admin.findById(userId).select("-password");
      success=true;
      res.json({user,success});
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("interval Server error")
    }
  
  })

module.exports=router;