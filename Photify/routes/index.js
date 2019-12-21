var express = require('express');
var path = require('path');
var router = express.Router();

var User = require('../core/user'); // Require user class in order to query database
const user = new User(); // Create an instance of User

const multer = require('multer');   // use multer for storing images

// Set The Storage Engine for multer
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  // there is no filesize limit set
}).single('userImage');


//====================
//  RENDER HOME PAGE 
//====================
router.get('/', (req, res, next) => {
  console.log("in root page");
  res.render('index', { name: user.username });
  next()
}
);

//=================
//  LOG OUT
//=================
router.get('/loggout', (req, res, next) => {
  if (req.session.user) {
    req.session.destroy(function () {
      res.clearCookie('connect.sid');
      res.redirect('/login.html')
    });
  } else {
    res.redirect('Failed to Log out');
  }
});

//=================
//  LOG IN 
//=================
router.post('/login', (req, res, next) => {
  user.login(req.body.username, req.body.password, function (result) {
    if (result) {
      // If we log in, make a session and save user data. result has all user data
      // req.session.user is like making a cookie named user which saves the
      // user's information on the server side
      req.session.user = result;
      res.redirect('/'); // once logged in, take back to landing page
    } else {
      res.send('<h1>Username or password is incorrect. Please try again.</h1>');
    }
  });
});

//=================
//  REGISTER
//=================
router.post('/register', (req, res, next) => {
  // make an object containing all user inputs
  let userInput = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  // create a new user. if there is no error, return its id
  user.create(userInput, function (lastId) {
    if (lastId) {
      console.log('New user registered successfully! userID: ' + lastId);
      res.redirect('/login.html'); // once they register, send user to landing page
    } else {
      console.log('Error creating a new user...');
    }
  });
});

//=================
//  POST IMAGE 
//=================
router.post('/upload', (req, res) => {
  // if logged in, allow post
  if (req.session.user) {
    upload(req, res, (err) => { // this is a function from multer for saving img in local storage
      if (err) {
        res.send("There was an error while uploading file.");
      } else {
        // gather user input from form
        let userInput = {
          title: req.body.postTitle,
          description: req.body.postDescription,
          fk_userid: req.session.user.id,
          photopath: req.file.path.replace('public', '.'),
        };
        // save image info in DB
        user.uploadImage(userInput, (imageId) => {
          if (imageId) {
            console.log("Image posted successfully. imgID = " + imageId);
            res.redirect('/');
          } else {
            console.log("UploadImage error.");
          }
        });
      }
    });
  } else {
    console.log('User Not logged in');
    res.redirect('/');
  }
});

//=================
//  POST COMMENT
//=================
router.post('/comment', function(req, res) {
  if(req.session.user){
    let userInput = {
      comment: req.body.comment,
      fk_postid: req.body.imgId,
      fk_userid: req.session.user.id,
    };
    user.submitComment(userInput, (commentId) => {
      if(commentId){
        console.log('Comment submitted successfully! commentID: ' + commentId);
        res.redirect(`/ViewImage.html?id=${req.body.imgId}`);
      } else {
        res.send("Something went wrong with post comment.");
      }
    });
  } else {
    // User will also get an alert in front end
    console.log("User Not Logged In");
  }
});

//=================
//  LOAD COMMENTS 
//=================
router.get('/comments/:imgId', (req, res, next) => {
  user.getComments(req.params.imgId, (result) => {
    res.send(result); // send back to our fetch request in img_view.js
  })
});

//=================
//  LOAD IMAGES 
//=================
router.get('/images', (req, res, next) => {
  user.getImgData((result) => {
    res.send(result); // send back to our fetch request in landing.js
  })
});

//=================
//  LOAD IMAGE 
//=================
router.get('/images/:imgId', (req, res, next) => {
  user.getImgDataById(req.params.imgId, (result) => {
      res.send(result); // send back to our fetch request in img_view.js
  });
});

//=================
//  SEARCH IMAGES 
//=================
router.get('/search/:imgTitle', (req, res, next) => {
  user.getImgDataByTitle(req.params.imgTitle, (results) => {
    res.send(results); // send back to our fetch request in search.js
  })
});
module.exports = router;
