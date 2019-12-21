/**
 * User class to send queries to the database.
 */
const bcrypt = require('bcryptjs');
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(path.resolve(__dirname, './photify.db'));

function User() { };

User.prototype = {
    // Find user data by id or username.
    find: function (user = null, callback) {
        // if user = number, return field = id. if user = string, return field = username.
        if (user) {
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        db.all(sql, user, function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },
    // Used to display ALL images in landing page
    getImgData: function (callback) {

        let sql = `SELECT * FROM imageposts`;

        db.all(sql, function (err, results) {
            if (err) {
                console.log("getImgData went wrong.");
            } else {
                const response = JSON.stringify(results);
                // console.log("the results from getImgData: " + response);
                callback(response);
            }
        });
    },
    // Used for retreiving an image through the imgId url parameter in ViewImage.html
    getImgDataById: function(imgId, callback) {
        // let sql = `SELECT * FROM imageposts WHERE id = ${imgId}`;
        let sql = `
            SELECT i.title, i.description, i.photopath, u.username
            FROM imageposts i
            INNER JOIN users u ON i.fk_userid = u.id
            WHERE i.id = ${imgId};`;

        db.all(sql, function(err, results) {
            if(err){
             console.log("getImgDataById went wrong")
            } else{
                let response = JSON.stringify(results);
                callback(response);
            }
        });
    },
    // Used for searching images by title
    getImgDataByTitle: function(imgTitle, callback) {
        let sql = `SELECT * FROM imageposts WHERE title REGEXP '${imgTitle}*'`;
        db.all(sql, function(err, results) {
            if(err){
             console.log("getImgDataByTitle went wrong")
            } else{
                let response = JSON.stringify(results);
                callback(response);
            }
        });
    },

    login: function (username, password, callback) {
        this.find(username, function (user) {
            // if user is found
            if (user) {
                // if password matches
                if (bcrypt.compareSync(password, user.password)) {
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    },
    // the user input passed through the route will make up the body parameter
    create: function (body, callback) {
        var pwd = body.password;
        // hash the password before inserting into database
        body.password = bcrypt.hashSync(pwd, 10);
        // put values into an array
        let bind = [];
        // this will put username, email, password into the array
        for (prop in body) {
            bind.push(body[prop]);
        }

        let sql = `INSERT INTO users(username, email, password) VALUES(?, ?, ?)`;
        // call query, give it the sql string and the values from bing array
        db.run(sql, bind, function (err) {
            if (err) {
                throw err;
            }
            // Callback for error handling. return the last inserted id if there is no error
            callback(this.lastID);
        });
    },

    submitComment: function(body, callback) {

        let bind = [];
        for(prop in body){
            bind.push(body[prop]);
        }
        let sql = `INSERT INTO comments(comment, fk_postid, fk_userid) VALUES (?, ?, ?)`;
        db.run(sql, bind, function(err) {
            if(err){
                throw err;
            } else {
                callback(this.lastID);
            }
        });
    },
    // Used for displaying comments in ViewImage.html
    getComments: function(imgId, callback) {
        // users and comments tables are joined to get each username and their respective comment
        let sql = `
        SELECT c.id, c.comment, u.username
        FROM comments c
        INNER JOIN users u ON c.fk_userid = u.id
        WHERE c.fk_postid = ${imgId};`;

        db.all(sql, function(err, results){
            if(err){
                throw err;
            } else {
                let response = JSON.stringify(results);
                callback(response);
            }
        })
    },

    uploadImage: function (body, callback) {
        // put body data into an array
        let bind = [];
        for (prop in body) {
            bind.push(body[prop]);
        }
        // prepare query
        let sql = `INSERT INTO imageposts(title, description, fk_userid, photopath) VALUES(?, ?, ?, ?)`;
        // pass info to DB
        db.run(sql, bind, function (err) {
            if (err) {
                throw err;
            }
            // return the new image's id
            callback(this.lastID);
        });
    },
}

module.exports = User;