const videos = document.querySelector('.jsVideos');
let targetVideo;

function handleMouseOver(e) {
  if (e.target && e.target.nodeName === 'VIDEO') {
    targetVideo = e.target;
    targetVideo.play();
  }
}

function handleMouseLeave() {
  targetVideo.pause();
}

function init() {
  console.log(videos);
  if (videos) {
    videos.addEventListener('mouseover', handleMouseOver);
    videos.addEventListener('mouseleave', handleMouseLeave);
  }
}

init();
