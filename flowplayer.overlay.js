(function() {
  /* global flowplayer */
  var common = flowplayer.common
    , bean = flowplayer.bean;

  flowplayer(function(api, root) {
    if (!api.conf.overlay) return;
    api.conf.splash = api.conf.autoplay = true;
    common.addClass(root, 'is-overlaid');
    common.addClass(root, 'is-closeable');

    var vendor = api.conf.overlay.vendor || 'native';
    if (!flowplayer.overlay[vendor]) throw new Error('Overlay "' + vendor + '" not implemented');
    flowplayer.overlay[vendor](api, root);
  });


  flowplayer.overlay = {};
  flowplayer.overlay.native = function(api, root) {
    var trigger = api.conf.overlay.trigger || api.conf.overlay
      , wrapper = document.createElement('div');
    wrapper.className = 'flowplayer-overlay-mask';
    wrapper.appendChild(root);

    bean.on(document, 'click', trigger, function() {
      showOverlay();
      api.load();
    });

    bean.on(document, 'keydown', function(ev) {
      if (ev.keyCode === 27) api.unload();
    });

    api.on('unload', function() {
      hideOverlay();
    });


    function showOverlay() {
      document.body.appendChild(wrapper);
      common.addClass(root, 'is-open');
    }

    function hideOverlay() {
      if (wrapper.parentNode) document.body.removeChild(wrapper);
      common.removeClass(root, 'is-open');
    }
  };
})();
