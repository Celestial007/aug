let aug = document.getElementById("aug");
let songTitle = document.getElementById("Songtitle");
let startTime = document.getElementById("startTime");
let endTime = document.getElementById("endTime");
let playBtn = document.getElementById("playBtn");
let preBtn = document.getElementById("preBtn");
let nextBtn = document.getElementById("nextBtn");
let player_bar = document.getElementById("seekBar");
let seeking = true;
let body = document.body;
let isPlaying = true;
let titles = ["mor mor mayur","यादनेश की शादीशुदा मस्ती","गीत: गॉट्या आणि किरण"]
let index = 0;
let store1 = "https://nogui.freewebhostmost.com/col/mp3/";
let store2 = "https://nogui.freewebhostmost.com/col/jpeg/";
let songs = [];
let covers = [];
for(let i=0;i<3;i++){
    songs.push(`${store1}${i+1}.mp3`);
    covers.push(`${store2}${i+1}.jpeg`);
}
seekBar()
details();
customNav()
playBtn.onclick = function () {
  if (isPlaying) {
    aug.play();
    isPlaying = false;
  } else {
    aug.pause();
    isPlaying = true;
  }
};

aug.onended = function () {
    index++;
    if (index >= 3) {
      index = 0;
    }
    details();
    aug.play();
  };

  preBtn.onclick = function () {
    index--;
    if (index < 0) {
      index = 2;
    }
    details();
    aug.play();
  };

  nextBtn.onclick = function () {
    index++;
    if (index > 2) {
      index = 0;
    }
    details();
    aug.play();
  };

aug.onplay = function(){
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
}
aug.onpause = function(){
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
}

function details(){
    songTitle.innerHTML = titles[index];
    aug.src = songs[index];
    customNav()
    body.style.backgroundImage = `url(${covers[index]})`
    console.log(covers[index])
    isPlaying = true;
}

function TimerDuration(){
    let durationMins = Math.floor(aug.duration / 60);
    let durationSecs = Math.floor(aug.duration - durationMins * 60);

    if(durationSecs < 10){
        durationSecs = "0"+durationSecs;
    }
    if(durationMins < 10){
        durationMins = "0"+durationMins;
    }
    endTime.innerHTML = durationMins + ":" + durationSecs;
}
function TimercurrentTime(){
  let curmins = Math.floor(aug.currentTime / 60);
  let cursecs = Math.floor(aug.currentTime - curmins * 60);
  if(curmins < 10){
    curmins = "0"+curmins
}
if(cursecs < 10){
    cursecs = "0"+cursecs
}
  startTime.innerHTML = curmins + ":" + cursecs;
}

function seekBar(){
    setInterval(() => {
      if (seeking) {
        player_bar.value = aug.currentTime;
      }
    });
    setInterval(() => {
      TimercurrentTime()
      })
    
    aug.onloadedmetadata = function () {
      player_bar.max = aug.duration;
        TimerDuration()
    };
    player_bar.onchange = function () {
      seeking = false;
      aug.currentTime = player_bar.value;
    };
    
    player_bar.onclick = function () {
      seeking = false;
    };
    let usingTouch = false;
    player_bar.addEventListener('touchstart', function() {
      usingTouch = true;
      seeking = false;
    });
    player_bar.addEventListener('touchmove', function() {
      usingTouch = true;
      seeking = false;
    });
    window.addEventListener('touchend', function() {
      usingTouch = true;
      setTimeout(function() {
        seeking = true;
      }, 1000);
    });
    player_bar.addEventListener('mouseover', function() {
      seeking = false
    });
    player_bar.addEventListener('mouseout', function() {
      seeking = true;
    });
    }
function customNav(){
navigator.mediaSession.metadata = new MediaMetadata({
  title: titles[index],
  artwork: [
    { src: covers[index], sizes: '640x640', type: 'image/jpeg' }
  ]
});
navigator.mediaSession.
            setActionHandler('nexttrack', function () {
 index++;
    if (index > 2) {
      index = 0;
    }
    details();
    aug.play();
            });
navigator.mediaSession.
            setActionHandler("previoustrack", () => {
    index--;
    if (index < 0) {
      index = 2;
    }
    details();
    aug.play();
            });
            navigator.mediaSession.
            setActionHandler("seekforward", () => {
                aug.currentTime+=10;
            });

            navigator.mediaSession.
            setActionHandler("seekbackward", () => {
                aug.currentTime-=10;
            });
          
navigator.mediaSession.playbackState = 'none';
}
