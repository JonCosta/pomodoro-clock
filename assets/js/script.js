$(function() {
    
    var time = 1 * 60;
    setTime(time);
    var refreshIntervalId = '';

    $(".block__btn").click(function() {
        refreshIntervalId = setInterval( timeFlow, 1000);
    });

    $(".block__stop").click(function() {
        clearInterval(refreshIntervalId);
    });

    $(".block__reset").click(function() {
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
