//=================
//  POST COMMENT 
//=================
var url_string = window.location.href;
var url = new URL(url_string);
var searchString = url.searchParams.get("search");

fetch(`http://localhost:3000/search/${searchString}`)
    .then((res) => {
        res.json()
            .then((images) => {
                // console.log('received result:', images);
                let resultHTML = '';
                let pageTitleHTML = document.getElementById('title');
                images.forEach((image) => {
                    titleHTML = `<div>${image.title}</div>`;
                    resultHTML += `
                        <div class="column">
                            <div class="card">
                                <div id="gif-Title">${image.title}</div>
                                <div id="gif-Image">
                                <a href="ViewImage.html?id=${image.id}"><img src="${image.photopath}" alt="Failed to Load Image" width="200px" height="200px"></a>
                                </div>
                                <div id="gif-Description">${image.description}</div>
                                <div id="viewBtn"><button onclick="window.location.href='ViewImage.html?id=${image.id}'">View Image</button></div>
                            </div>
                        </div>`;
                });
                // console.log(">>>>");
                // console.log(resultHTML);
                document.getElementById('row').innerHTML = resultHTML;
                pageTitleHTML.innerHTML += ` for "${searchString}"`;

            })
    });
