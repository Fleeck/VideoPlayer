$(document).ready(function () {
  var video = $('#media-video').get(0);
  var currTime = $('#current-time').get(0);
  var isToggled = false;

  $('#media-video, #play-pause, #video-icon').click(clickPlayPause);
  $('#mute').click(clickMuteButton);
  $('#full-screen').click(toggleFullscreen);
  $('#volume-bar').change(handleVolumeBar);
  $('#toggle-duration').click(clickToggleTimeButton);
  $('#seek-bar').change(handleSeekBar);
  $('#media-video').bind("timeupdate", handleTimeUpdate);
  $(video).on('ended', playToRepeat);

  function clickPlayPause() {
    if (video.paused) {
      video.play();
      $('#play-pause, #video-icon').removeClass('fa-play');
      $('#video-icon, #play-pause').addClass('fa-pause');
      $('#video-icon').css("display", 'none');
    } else {
      video.pause();
      $('#play-pause').removeClass('fa-pause');
      $('#play-pause').addClass('fa-play');
      $('#video-icon').css('display', 'initial');
    }
  }

  function handleTimeUpdate() {
      $('#video-duration').text(((video.duration).toFixed()).toMMSS());
      $('#current-time').text((video.currentTime.toFixed()).toMMSS());
      $('#left-duration').text('-' + ((video.duration - video.currentTime).toFixed()).toMMSS());
      $('#seek-bar').val(video.currentTime * 100 / video.duration);
  }

  function handleSeekBar() {
    var time = video.duration * this.value / 100;
    video.currentTime = time;
  }

  function clickToggleTimeButton() {
    if (!isToggled) {
      $('#current-time').attr('id', 'left-duration');
      isToggled = true;
    } else {
      $('#left-duration').attr('id', 'current-time');
      isToggled = false;
    }
  }

  function clickMuteButton() {
    if (!video.muted) {
      $('#media-video').prop('muted', true);
      $(this).toggleClass('fa-volume-up');
    } else {
      $('#media-video').prop('muted', false);
      $(this).toggleClass('fa-volume-up');
    }
  }

  function toggleFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  }

  function playToRepeat() {
    $('#play-pause, #video-icon').removeClass('fa-play fa-pause');
    $('#play-pause, #video-icon').addClass('fa-repeat');
    $('#video-icon').css('display', 'initial');
  }

  function handleVolumeBar() {
    video.volume = $(this).get(0).value;
  }
});

String.prototype.toMMSS = function() {
  var sec_num = parseInt(this, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var time = +minutes + ':' + seconds;
  return time;
};
