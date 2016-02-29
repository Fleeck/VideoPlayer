$(document).ready(function() {
  var video = $('#media-video').get(0);
  var currTime = $('#current-time').get(0);
  var isToggled = false;

  $('#media-video, #play-pause, #video-icon').click(function() {
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
  });

  $('#mute').click(function() {
    if (!video.muted) {
      $('#media-video').prop('muted', true);
      $(this).toggleClass('fa-volume-up');
    } else {
      $('#media-video').prop('muted', false);
      $(this).toggleClass('fa-volume-up');
    }
  });

  $('#full-screen').click(function() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  });

  $('#volume-bar').change(function() {
    video.volume = $(this).get(0).value;
  });

  $('#toggle-duration').click(function() {
    if (!isToggled) {
      $('#current-time').attr('id', 'left-duration');
      isToggled = true;
    } else {
      $('#left-duration').attr('id', 'current-time');
      isToggled = false;
    }
  });

  $('#seek-bar').change(function() {
    var me = this;
    var time = video.duration * this.value / 100;
    video.currentTime = time;
  });

  $('#media-video').bind("timeupdate", function() {
    $('#video-duration').text(((video.duration).toFixed()).toMMSS());
    $('#current-time').text((video.currentTime.toFixed()).toMMSS());
    $('#left-duration').text('-' + ((video.duration - video.currentTime).toFixed()).toMMSS());
    $('#seek-bar').val(video.currentTime * 100 / video.duration);
  });

});


function playToRepeat() {
  $('#play-pause, #video-icon').removeClass('fa-play fa-pause');
  $('#play-pause, #video-icon').addClass('fa-repeat');
  $('#video-icon').css('display', 'initial');
}

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
