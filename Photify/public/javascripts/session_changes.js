// if logged in
if(document.cookie){
    // change log in button to log out
    var loginButton = document.getElementById("login-button");
    loginButton.innerHTML = "Log out";
    loginButton.href = "/loggout";
    // remove registration button
    var registrationButton = document.getElementById("registration-button");
    registrationButton.remove();
    
}

/*For Hamburger Nav icon*/
function iconNav() {
    var x = document.getElementById("myTopNav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}