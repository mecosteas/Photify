/**
 * Roberto Herman Valdivia
 * CSC 317
 * Assignment 4
 * This is the JS file to validate the forms in both login.html and registration.html
 */

// Global variables initialized here but declared in validateForm()
var userName, userPwd, confirmPwd, userEmail;

/**
 * A function to make sure the input values are in accordance to our restrictions:
 * Username length should be >= 3 alphanumeric characters.
 * Password length should be >= 8 characters.
 * For the registration form:
 * Password must contain at least 1 upper case letter, 1 number, and 1 special character.
 * Password must match confirmed password
 * @param {none}
 * @return {boolean}
 * @declares userName, userPwd, confirmPwd, userEmail
 */
function validateForm() {
    var message;
    var isValid;
    // regular expressions
    var alphaNumRegex = /^[a-zA-Z0-9]+$/;   // alphanumeric
    var upperCaseRegex = /.*[A-Z].*/;       // uppercase
    var numberRegex = /.*[0-9].*/;          // numbers
    var specialCharRexex = /.*[!@#&*\^\)\(\$/-].*/; // special characters
    // Declare our global variables    
    userName = document.getElementById("usrName").value;
    userPwd = document.getElementById("usrPwd").value;

    // Validating Username first for better flow of user experience
    // The following two conditional statements are for both LOGIN and REGISTRATION:

    // Check to make sure there are no symbols or empty spaces in username (only alphanumeric allowed)
    // Using test() method from JavaScript RegExp Object
    // test() tests for a match in string. Returns true if match is found
    isValid = alphaNumRegex.test(userName);

    while (!isValid) {
        message = "Username must contain alphanumeric characters only.";
        document.getElementById("usrNameValMsg").innerHTML = message;
        return false;
    }
    while (userName.length < 3) {
        message = "Username must be at least 3 characters long.";
        document.getElementById("usrNameValMsg").innerHTML = message;
        return false;
    }
    document.getElementById("usrNameValMsg").innerHTML = ""; // clear message

    // Conditional statement for REGISTRATION form only
    if (document.forms[1].name === "registrationForm") {
        // Declare variables from registrationForm
        userEmail = document.getElementById("usrEmail").value;

        // Check for at least one uppercase, number, and special character in password
        containsUpper = upperCaseRegex.test(userPwd);
        containsNumber = numberRegex.test(userPwd);
        containsSpecial = specialCharRexex.test(userPwd);

        while (!containsUpper) {
            message = "Password must contain at least one uppercase letter.";
            document.getElementById("pwdValMsg").innerHTML = message;
            return false;
        }
        while (!containsNumber) {
            message = "Password must contain at least one number.";
            document.getElementById("pwdValMsg").innerHTML = message;
            return false;
        }
        while (!containsSpecial) {
            message = "Passowrd must contain at least one special character.";
            document.getElementById("pwdValMsg").innerHTML = message;
            return false;
        }

        // Check for passwords to match
        confirmPwd = document.getElementById("confirmPwd").value;
        pwdMatch = (userPwd === confirmPwd);
        while (!pwdMatch) {
            message = "Passwords must match."
            document.getElementById("pwdValMsg").innerHTML = message;
            return false;
        }
        document.getElementById("pwdValMsg").innerHTML = ""; // clear message
    } // end of if statement

    // Conditional statement for both LOGIN and REGISTRATION
    while (userPwd.length < 8) {
        message = "Password must be at least 8 characters long.";
        document.getElementById("pwdValMsg").innerHTML = message;
        return false;
    }
    return true;    // form can finally be submitted
} // end of validateForm()

/**
 * Function that creates an object to store key/value pairs from the form's input data.
 * It also turns that object into a JSON that is printed on the console.
 * @param {none}
 * @returns {void}
 */
function createJSON() {
    var formData = {
        UserName: userName,
        Password: userPwd,
        Email: userEmail,
    };

    var myJSON = JSON.stringify(formData);
    console.log(myJSON);
} // end of createJASON()
