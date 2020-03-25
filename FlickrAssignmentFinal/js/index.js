
/* Variables */
const searchButton = document.querySelector('button');
let imagesElem = document.getElementById('images');
let bigImage = document.getElementById('bigImage');
let modal = document.getElementById('modal');

 
/* Show images */
function showImage(images) {
    let elem = document.createElement('img');
    elem.setAttribute('src', returnInfo(images, 'm'));
    imagesElem.appendChild(elem);
    
    elem.addEventListener('click', () => {
        openModal(images);
        closeModal(images);
    });
}

/* Big image */
function big(images) {
    let img = document.createElement('img');
    img.setAttribute('src', returnInfo(images, 'z'));
    bigImage.appendChild(img);
}


/* Add images in HTML */ 
function addImages(images) {
    imagesElem.innerHTML = '';
    for(let i = 0; i < images.photos.photo.length; i++) {
        returnInfo(images.photos.photo[i]);
        showImage(images.photos.photo[i]);
    }
}



/* Get images */
async function fetchImg (inputText, numberOfImages) {
    let searchUrl = `https://api.flickr.com/services/rest?&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d&method=flickr.photos.search&text=${inputText}&per_page=${numberOfImages}&page=1&format=json&nojsoncallback=1`;
    let url = searchUrl;
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        addImages(data);
        return url;
    } catch(error) {
        console.error(error);
    }
}


/* Info for images */
function returnInfo(images, size) {
    return `https://farm${images.farm}.staticflickr.com/${images.server}/${images.id}_${images.secret}_${size}.jpg`;
    
}


/* Button */
searchButton.addEventListener('click', function() {
    let inputText = document.getElementById('inputText').value;
    let numberOfImages = document.getElementById('numberOfImages').value;
    fetchImg (inputText, numberOfImages);
});


/* Open and close modal */
function openModal(images) {
    modal.classList.toggle('hide');
    big(images);
}

function closeModal() {
    let close = document.querySelector('.close');
    close.addEventListener('click', () => {
        modal.classList.add('hide');
        bigImage.innerHTML = '';
    });
}