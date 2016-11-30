var $ = function(selector) { return document.querySelector(selector); }
var player = videojs($('.video-js'), {
    controlBar:{
        volumeMenuButton:{
            inline: false,
            vertical: true,
        },
    },
});
