const path = require('path');
const express = require('express');
const multer = require('multer');
const {authMiddleware} = require('../utils/auth')

const {  Profile } = require("../models");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb({ message: 'Images only!' });
  }
}

const upload = multer({
  storage,
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
// verify and add user token
    authMiddleware({req})
    console.log("req --------", req.user)
    await Profile.findOneAndUpdate({
      profileUser: req.user._id
    }, {
      image: req.file.path
    }, { upsert: true})
    res.send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  }
  catch(err) {
    console.error(err)
    res.send(500)
  }
  
});
router.get('/profile',async  (req, res) => {
  authMiddleware({req})
  //console.log(req)
  const profile= await Profile.findOne({profileUser: req.user._id})
  //const filename = req.params.filename;
  //res.sendFile(path.join(__dirname, `images/${filename}`));
  //console.log('----------------------------------------',res)

  res.json(profile)
});



module.exports = router;
