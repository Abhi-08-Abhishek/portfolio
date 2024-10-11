// script.js

// Function to filter videos based on category
function filterVideos(category) {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(videoCard => {
        if (category === 'all') {
            videoCard.style.display = 'block';
        } else {
            if (videoCard.dataset.category === category) {
                videoCard.style.display = 'block';
            } else {
                videoCard.style.display = 'none';
            }
        }
    });
}

// Add event listeners to filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        filterVideos(category);
    });
});

// Function to search videos based on keyword
function searchVideos() {
    const searchBar = document.getElementById('search-bar');
    const keyword = searchBar.value.toLowerCase();
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(videoCard => {
        const videoTitle = videoCard.querySelector('h3').textContent.toLowerCase();
        if (videoTitle.includes(keyword)) {
            videoCard.style.display = 'block';
        } else {
            videoCard.style.display = 'none';
        }
    });
}

// Add event listener to search bar
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', searchVideos);

// Function to pause all videos except the one playing
function pauseOtherVideos(video) {
    const videos = document.querySelectorAll('video, iframe');
    videos.forEach(otherVideo => {
        if (otherVideo !== video) {
            if (otherVideo.tagName === 'VIDEO') {
                otherVideo.pause();
            } else {
                const iframeSrc = otherVideo.src;
                otherVideo.src = '';
                otherVideo.src = iframeSrc;
            }
        }
    });
}

// Add event listeners to videos
const videos = document.querySelectorAll('video, iframe');
videos.forEach(video => {
    if (video.tagName === 'VIDEO') {
        video.addEventListener('play', () => {
            pauseOtherVideos(video);
        });
    } else {
        video.addEventListener('load', () => {
            const iframe = video.contentWindow;
            iframe.addEventListener('play', () => {
                pauseOtherVideos(video);
            });
        });
    }
});