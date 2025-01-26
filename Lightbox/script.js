const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;


function openLightbox(index) {
    lightbox.style.display = 'flex';
    lightboxImg.src = thumbnails[index].src;
    currentIndex = index;
}


function closeLightbox() {
    lightbox.style.display = 'none';
}

function showNext() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    lightboxImg.src = thumbnails[currentIndex].src;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    lightboxImg.src = thumbnails[currentIndex].src;
}

thumbnails.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);


document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') closeLightbox();
    }
});
