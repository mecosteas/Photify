
var url_string = window.location.href;
var url = new URL(url_string);
var imgId = url.searchParams.get("id");

var loggedInCookie = document.cookie;

//=================
//  LOAD IMAGE
//=================
fetch(`http://localhost:3000/images/${imgId}`)
.then((res) => {
    res.json()
    .then((image) => {
        // console.log('received result:', image);;
        let imageHTML = `
        <p>Posted by ${image[0].username}</p>
            <image class="responsive" id="image" src="${image[0].photopath}".responsive {
              }></image>`;
        let titleHTML = `<p>${image[0].title}</p>`;
        let descHTML = `<p>${image[0].description}\n</p>`;

        document.getElementById('image').innerHTML = imageHTML;
        document.getElementById('imgTitle').innerHTML = titleHTML;
        document.getElementById('imgDescription').innerHTML = descHTML;
    })
});

//=================
//  LOAD COMMENTS 
//=================
function sort_by_key(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
fetch(`http://localhost:3000/comments/${imgId}`)
.then((res) => {
    res.json()
    .then((comments) => {
            comments = sort_by_key(comments, 'id');
        var commentHTML = "";
        comments.forEach((comment) => {
            console.log("Comments: " + JSON.stringify(comment));
            commentHTML += `
            <div class="comment-box">
            <p class="comment-username">${comment.username}</p>
            <p>${comment.comment}</p>
            </div>`;
        }); 
        document.getElementById('postedComments').innerHTML = commentHTML;
    })
});

//=================
//  POST COMMENT 
//=================
var button = document.getElementById('commentButton');
button.addEventListener('click', postComment)

function postComment(e){
    e.preventDefault();

    const comment = document.getElementById('comment').value;
    if(loggedInCookie){
        fetch(`http://localhost:3000/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment, imgId}),
        })
        .then((res) => {
            // HTTP redirect
            if (res.redirected) {
                window.location.href = res.url;
            }
        })
    } else {
        alert("You must be logged in.");
    }
}
