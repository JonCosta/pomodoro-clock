$(function () {

    var time = 25 * 60;
    setTime(time);
    var refreshIntervalId = '';

    $(".btn__start").click(function () {
        refreshIntervalId = setInterval(timeFlow, 1000);
    });

    $(".btn__stop").click(function () {
        clearInterval(refreshIntervalId);
        var sound = document.getElementById("audio");
        sound.play();
    });

    $(".btn__reset").click(function () {
        time = 25 * 60;
        setTime(time);
    })

    $(".btn__plus_pomo").click(function (e) {
        e.preventDefault();
        plusTime("pomo");
    });

    $(".btn__plus_break").click(function (e) {
        e.preventDefault();
        plusTime("break");
    });

    $(".btn__minus_pomo").click(function (e) {
        e.preventDefault();
        minusTime("pomo");
    });

    $(".btn__minus_break").click(function (e) {
        e.preventDefault();
        minusTime("break");
    });

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
        $(".block__time").html(`${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`);
    }

    function plusTime(selector) {
        let val = parseInt($(".input__" + selector).val());
        $(".input__" + selector).val(val + 1);
    }

    function minusTime(selector) {
        let val = parseInt($(".input__" + selector).val());
        $(".input__" + selector).val(val - 1);
    }

});
