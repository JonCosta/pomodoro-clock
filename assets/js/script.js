$(function () {

    var clock = {
        pomo: 25,
        pause: 5,
        active: 'pomo'
    };

    var time = clock[clock.active] * 60;

    setTime(time);
    var refreshIntervalId = false;

    // -------------------------------------------------------

    $(".btn__start").click(function () {
        if (refreshIntervalId) return false;
        let sound = document.getElementById("audio__start");
        sound.volume = 0.2; sound.play();
        refreshIntervalId = setInterval(timeFlow, 1000);
    });

    $(".btn__stop").click(function () {
        if (!refreshIntervalId) return false;
        let sound = document.getElementById("audio__stop");
        sound.volume = 0.2; sound.play();
        clearInterval(refreshIntervalId);
        refreshIntervalId = false;
    });

    $(".btn__reset").click(function () {
        let sound = document.getElementById("audio__reset");
        sound.volume = 0.2; sound.play();
        clearInterval(refreshIntervalId);
        clock.active = 'pomo';
        time = clock.pomo * 60;
        setTime(time);
    });

    $(".custom__btn").click(function () {
        if (refreshIntervalId) return false;
        let operation = $(this).val().split("-");
        changeTime(operation[1], operation[0]);
    });

    // ----------------------------------------------------

    /**
     * Countdown function that will reduce time by seconds
     */
    function timeFlow() {
        if (time == 0) {
            // If the countdown is finished, stop the countdown
            clearInterval(refreshIntervalId);
            // Play a sound
            let alarm = document.getElementById("audio__alarm");
            alarm.volume = 0.3; alarm.play();
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
     * Customizes countdown values for Work or Break time
     * @param {String} selector The class (pomo/pause) of the field being changed
     * @param {String} operation The operation (plus/minus) to run in the clock
     */
    function changeTime(selector, operation) {
        let val = parseInt($(".input__" + selector).val());
        if (val == 1 && operation == 'minus') return false;
        val = operation == 'plus' ? val + 1 : val - 1;
        clock[selector] = val;
        $(".input__" + selector).val(val);
        if (clock.active == selector) {
            time = clock[selector] * 60;
            setTime(time);
        }
    }

    var transform_styles = [
        '-webkit-transform',
        '-ms-transform',
        'transform'];

    var rotation = 180;
    
    window.randomize = function (degree) {
        // var rotation = Math.floor(Math.random() * 180);
        // var rotation = 180;
        // rotation -= 1;
        var fix_rotation = rotation * 2;
        for (let i in transform_styles) {
            $(".circle .fill, .circle .mask.full").css(transform_styles[i], 'rotate(' + rotation + 'deg)');
            $(".circle .fill.fix").css(transform_styles[i], 'rotate('+fix_rotation+'deg)');
        }
    }

    setTimeout(window.randomize(180), 200);
    // setInterval(function () {
    //     window.randomize(rotation)
    // }, 1000);
    $(".radial-progress").click(window.randomize);

});
