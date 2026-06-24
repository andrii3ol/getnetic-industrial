(function () {
  'use strict';

  function fmt(secs) {
    var m = Math.floor(secs / 60);
    var s = Math.floor(secs % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function initPlayer(ids) {
    var player   = document.getElementById(ids.player);
    var video    = document.getElementById(ids.video);
    var bigPlay  = document.getElementById(ids.bigPlay);
    var ppBtn    = document.getElementById(ids.pp);
    var controls = document.getElementById(ids.controls);
    var scrubber = document.getElementById(ids.scrubber);
    var fill     = document.getElementById(ids.fill);
    var timeEl   = document.getElementById(ids.time);
    var muteBtn  = document.getElementById(ids.mute);
    var errorEl  = document.getElementById(ids.error);

    if (!player || !video) return;

    function setPlayState(playing) {
      player.classList.toggle('is-playing', playing);
      player.classList.toggle('is-paused',  !playing);
      ppBtn.querySelector('.icon-play').style.display  = playing ? 'none' : '';
      ppBtn.querySelector('.icon-pause').style.display = playing ? ''     : 'none';
      ppBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      bigPlay.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
    }

    function setMuteState(muted) {
      video.muted = muted;
      muteBtn.querySelector('.icon-muted').style.display = muted ? '' : 'none';
      muteBtn.querySelector('.icon-sound').style.display = muted ? 'none' : '';
      muteBtn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
    }

    function togglePlay() {
      if (video.paused || video.ended) { video.play(); } else { video.pause(); }
    }

    function updateProgress() {
      if (!video.duration) return;
      var pct = video.currentTime / video.duration;
      fill.style.width = (pct * 100) + '%';
      scrubber.setAttribute('aria-valuenow', Math.round(pct * 100));
      if (timeEl) {
        timeEl.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
      }
    }

    function seekTo(clientX) {
      if (!video.duration) return;
      var rect = scrubber.getBoundingClientRect();
      var pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      video.currentTime = pct * video.duration;
    }

    /* video events */
    video.addEventListener('play',   function () { setPlayState(true); });
    video.addEventListener('pause',  function () { setPlayState(false); });
    video.addEventListener('ended',  function () { setPlayState(false); });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', function () {
      if (timeEl && video.duration) {
        timeEl.textContent = '0:00 / ' + fmt(video.duration);
      }
    });
    video.addEventListener('error', function () {
      if (errorEl) errorEl.style.display = 'flex';
    });

    /* big play + small pp buttons */
    bigPlay.addEventListener('click', function (e) { e.stopPropagation(); togglePlay(); });
    ppBtn.addEventListener('click',   function (e) { e.stopPropagation(); togglePlay(); });
    muteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setMuteState(!video.muted);
    });

    /* click on player body (not controls) = toggle play */
    player.addEventListener('click', function (e) {
      if (controls && controls.contains(e.target)) return;
      togglePlay();
    });

    /* scrubber — mouse */
    var dragging = false;
    scrubber.addEventListener('mousedown', function (e) {
      dragging = true; seekTo(e.clientX); e.stopPropagation();
    });
    document.addEventListener('mousemove', function (e) { if (dragging) seekTo(e.clientX); });
    document.addEventListener('mouseup',   function ()  { dragging = false; });

    /* scrubber — touch */
    scrubber.addEventListener('touchstart', function (e) {
      dragging = true; seekTo(e.touches[0].clientX);
      e.stopPropagation(); e.preventDefault();
    }, { passive: false });
    scrubber.addEventListener('touchmove', function (e) {
      if (dragging) seekTo(e.touches[0].clientX); e.preventDefault();
    }, { passive: false });
    document.addEventListener('touchend', function () { dragging = false; });

    /* scrubber — keyboard (arrow = seek 5 s) */
    scrubber.addEventListener('keydown', function (e) {
      if (!video.duration) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        video.currentTime = Math.max(0, video.currentTime - 5);
        e.preventDefault();
      }
    });

    /* player-level keyboard shortcuts */
    player.addEventListener('keydown', function (e) {
      if (e.target === scrubber) return;
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePlay(); }
      else if (e.key === 'm')             { e.preventDefault(); setMuteState(!video.muted); }
    });

    /* init */
    setPlayState(false);
    setMuteState(true);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initPlayer({
      player:  'techops-player',
      video:   'techops-video',
      bigPlay: 'techops-big-play',
      pp:      'techops-pp',
      controls:'techops-controls',
      scrubber:'techops-scrubber',
      fill:    'techops-fill',
      time:    'techops-time',
      mute:    'techops-mute',
      error:   'techops-error'
    });
  });

}());
