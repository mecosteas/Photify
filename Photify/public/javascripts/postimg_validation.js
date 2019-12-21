/**
 * Roberto Herman Valdivia
 * CSC 317
 * Assignment 4
 * This is the JS file to validate the form in postimage.html
 */

/**
 * TODO:
 * 1. Require user to enter text for Post Title                                        DONE
 * 2. Require user to enter text for Post Description                                  DONE
 * 3. Require the user to only upload images that are either jpg, png, bmp, gif        DONE
 * 4. Add an actoin to the form so that on submission, the following is done:          DONE
 *     a. store the values into a JS Object (key value pairs)
 *     b. convert this object into JSON. (JSON.stringify())
 *     c. Print the JSON using console.log
 */

var imgTitle, imgDesc; // These global variables are declared in validateForm()

var aupCheckBox = document.getElementById("aupCheckBox").value;
var fileInput = document.getElementById("imgFile");

/**
 * Validates the file type. Valid file types: jpg, png, bmp, or gif.
 * This function is called inside validateForm()
 * @param {none}
 * @returns {boolean}
 */
function validateFile() {
    var filePath = fileInput.value;
    var fileTypeRegex = /(\.jpg|\.jpeg|\.png|\.bmp|\.gif)$/i; // ends with .jpg or .png or .bmp or .gif
    var isValid = fileTypeRegex.test(filePath);

    return isValid;
}
/**
 * Function to validate the input fields of our form.
 * Makes sure the form doesn't have an empty image title and description.
 * Makes sure the image being uploaded is either a jpg, png, bmp, or gif
 * @param {none}
 * @return {boolean}
 */
function validateForm() {
    var message;

    imgTitle = document.getElementById("imgTitle").value;
    imgDesc = document.getElementById("imgDesc").value;
    aupCheckBox = document.getElementById("aupCheckBox").value;

    // Check if submitted file is of valid file type
    while (!validateFile()) {
        message = "Valid file types: jpg, png, bmp, gif.";
        document.getElementById("invalidFileTypeMsg").innerHTML = message;
        return false;
    }
    document.getElementById("invalidFileTypeMsg").innerHTML = ""; // clear message

    // trim whitespace from title and description text so user doesn't use whitespace as a valid input
    var trimImgTitle = imgTitle.trim();
    var trimImgDesc = imgDesc.trim();

    // Check if title is empty
    while (trimImgTitle.length == 0) {
        message = "Your image must have a title.";
        document.getElementById("emptyTitleMsg").innerHTML = message;
        return false;
    }
    document.getElementById("emptyTitleMsg").innerHTML = ""; // clear message

    // Check if description is empty
    while (trimImgDesc.length == 0) {
        message = "Your image must have a description.";
        document.getElementById("emptyDescMsg").innerHTML = message;
        return false;
    }
    return true;
} // end of validateForm()

//Check if user is logged in
var loggedInCookie = document.cookie;

function isLoggedIn(){
    if(!loggedInCookie){
        alert("You must be logged in.");
        return false;
    } else {
        return true;
    }
}