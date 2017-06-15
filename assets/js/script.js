$(function() {
    
    var time = 25 * 60;
    setTime(time);
    var refreshIntervalId = '';

    $(".btn__start").click(function() {
        refreshIntervalId = setInterval( timeFlow, 1000);
    });

    $(".btn__stop").click(function() {
        clearInterval(refreshIntervalId);
        var sound = document.getElementById("audio");
        sound.play();
    });

    $(".btn__reset").click(function() {
        time = 25 * 60;
        setTime(time);
    })

    function timeFlow() {
        if (time == 0) {
            clearInterval(refreshIntervalId);        
        } else {
            time -= 1;
            setTime(time);
        }
    }

    /**
     * Updates the current time value
     * @param {Integer} time Time in seconds
     */ 
    function setTime(time) {
        let minutes = parseInt(time / 60);
        let seconds = time % 60;
        $(".block__time").html(`${minutes > 9 ? minutes : "0"+minutes}:${seconds > 9 ? seconds : "0"+seconds}`);
    }

});
