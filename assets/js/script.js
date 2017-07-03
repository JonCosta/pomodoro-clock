$(function () {

    var clock = {
        pomo: 25,
        pause: 5,
        active: 'pomo'
    };

    var time = clock[clock.active] * 60;

    setTime(time);
    var refreshIntervalId = '';

    $(".btn__start").click(function () {
        refreshIntervalId = setInterval(timeFlow, 1000);
    });

    $(".custom__btn").click(function () {
        let operation = $(this).val().split("-");
        if (operation[0] == "plus") {
            plusTime(operation[1]);
        } else {
            minusTime(operation[1]);
        }
    });

    $(".btn__stop").click(function () {
        clearInterval(refreshIntervalId);
        // var sound = document.getElementById("audio");
        // sound.play();
    });

    $(".btn__reset").click(function () {
        clearInterval(refreshIntervalId);
        clock.active = 'pomo';
        time = clock.pomo * 60;
        setTime(time);
    });

    /**
     * Countdown function that will reduce time by seconds
     */
    function timeFlow() {
        if (time == 0) {
            // If the countdown is finished, stop the countdown
            clearInterval(refreshIntervalId);
            // Checks the currently active countdown and start a new one
            if (clock.active == 'pomo') {
                clock.active = 'pause';
                time = clock.pause * 60;
            } else {
                clock.active = 'pomo';
                time = clock.pomo * 60;
            }
            setTime(time);
            refreshIntervalId = setInterval(timeFlow, 1000);
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

    /**
     * Adds one minute to the custom time input field
     * @param {String} selector Class of the target input ('pomo' or 'pause')
     */
    function plusTime(selector) {
        let val = parseInt($(".input__" + selector).val());
        clock[selector] = val + 1;
        $(".input__" + selector).val(val + 1);
    }

    /**
     * Reduces one minute from the custom time input field
     * @param {String} selector Class of the target input ('pomo' or 'pause')
     */
    function minusTime(selector) {
        let val = parseInt($(".input__" + selector).val());
        if (val == 1) return false;
        clock[selector] = val - 1;
        $(".input__" + selector).val(val - 1);
    }

});
