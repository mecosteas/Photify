//=================
//  DISPLAY IMAGES
//=================
fetch('http://localhost:3000/images')
    .then((res) => {
         res.json()
        .then((images) => {
            // console.log('received result:', images);
            let resultHTML = '';
            images.forEach((image) => {
                resultHTML += `
                    <div class="column">
                        <a href="ViewImage.html?id=${image.id}">
                            <div class="card">
                                <div id="imgTitle">${image.title}</div>
                                <div id="imgImage">
                                    <img src="${image.photopath}" alt="Failed to Load Image" width="200px" height="200px">
                                </div>
                                <div id="imgDescription">${image.description}</div>
                            </div>
                        </a>
                    </div>`;
            });
            // console.log(">>>>");
            // console.log(resultHTML);
            document.getElementById('row').innerHTML = resultHTML;
        })
    });
