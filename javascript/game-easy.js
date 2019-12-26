window.onload = function() {

    const HOLES = document.querySelectorAll('.hole');
    const SCOREBOARD = document.querySelector('.score');
    const MOLES = document.querySelectorAll('.mole');
    const STARTBTN = document.getElementById('start_btn');

    let titleH1 = document.getElementById('title');
    let lastHole;
    let timeUp = false;
    let score = 0;
    let gameTime = 10000;
    let time;
    let mole;

    STARTBTN.addEventListener('click', function() {
        showBtnAnimation();
        startGame();
    }, false);

    function showBtnAnimation() {
        event.preventDefault();
        STARTBTN.classList.add('animate');
        // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
        setTimeout(() => {
            STARTBTN.classList.remove('animate');
            // STARTBTN.style.display = 'none';
            STARTBTN.classList.add('disappear');
        }, 700);
    }


    function startGame() {
        resetScoreAndTime();
        peep();

        setTimeout(() => {
            // TODO: 写当游戏时间结束后要发生的事
            showTxt(titleH1, 'TIME UP!');
            showScore(SCOREBOARD, score);
            STARTBTN.innerText = 'Replay';
            STARTBTN.classList.remove('disappear');
            // STARTBTN.style.display = '';
            timeUp = true;
        }, gameTime)
    }

    /**
     * 初始化设置.
     */
    function resetScoreAndTime() {
        // TODO: 写游戏的初始化设置
        showTxt(titleH1, 'WHACK-A-MOLE!');
        timeUp = false;
        score = 0;
        showScore(SCOREBOARD, score);
    }

    /**
     * 出洞.
     */
    function peep() {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        comeOutAndStop(hole, time);
    }

    /**
     * 随机生成地鼠出洞的停留时间. 该时间其实是[min, max]间的随机数.
     *
     * @param min 随机数的下界.
     * @param max 随机数的上界.
     * @returns {number}
     */
    function randomTime(min, max) {
        // TODO: 写生成随机数的逻辑，
        // return 0;
        return Math.round(Math.random() * (max - min) + min);

    }

    /**
     * 随机选择地鼠钻出的地洞，如果与上一个是相同地洞，则重新选择一个地洞.
     *
     * @param holes
     * @returns {*}
     */
    function randomHole(holes) {
        // TODO: 写地鼠随机选择钻出地洞的逻辑，如果与上一个是相同地洞，则重新选择一个地洞.
        // return null;
        let lastMole;
        let newMole = getRandom(1, 6);
        while (newMole === lastMole) {
            newMole = getRandom(1, 6);
        }
        lastMole = newMole;
        return holes[newMole];
    }

    /**
     * 地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
     *
     * @param hole 地鼠所出地洞.
     * @param time 地鼠停留时间.
     */
    function comeOutAndStop(hole, time) {
        // TODO: 写地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) {
                peep();
            }
        }, time);
    }

    /**
     * 打地鼠。为每个moles添加点击事件，点击后分数显示+1，地鼠入洞。
     */
    moles.forEach(mole => mole.addEventListener('click', function(e) {
        // TODO: 在这里写用户点击地鼠发生的事.
        score += 1;
        showScore(SCOREBOARD, score);
        mole.classList.remove('up');
    }));

    function showTxt(titleH1, txt) {
        titleH1.innerText = txt;
    }

    function showScore(SCOREBOARD, score) {
        SCOREBOARD.innerText = score;
    }

};