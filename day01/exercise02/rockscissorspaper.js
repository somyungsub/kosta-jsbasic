//페이지 로드시 호출되는 메서드
function init() {
    //아이디가 game인 객체 (가위 바위 보 버튼 포함 div) 를 gameElement 변수에 대입
    var gameElement = document.getElementById('game');
    //gameElement에서 버튼을 클릭했을때 playRockScissorsPaper 메서드 호출
    addListener(gameElement, 'click', playRockScissorsPaper);
}
// 크로스 브라우징을 고려해 구현한 이벤트 리스너 등록  함수입니다.
// el : 이벤트가 발생할 HTML 요소
// ev : 이벤트
// handler : 이벤트 핸들러 함수
function addListener(el, ev, handler) {
    // FireFox, Chrome과 같은 비 IE 웹브라우저의 경우
    if (el.addEventListener) {
        el.addEventListener(ev, handler, false);
    } else { // IE 웹 브라우저의 경우
        el.attachEvent('on' + ev, handler);
    }
}

//클릭 이벤트가 발생한 버튼 객체를 리턴
// evt : 이벤트
function getEventSource(evt) {
    // FireFox, Chrome과 같은 비 IE 웹브라우저의 경우
    if (evt.target)
        return evt.target;//클릭 이벤트가 발생한 버튼 리턴
    else // IE 웹 브라우저의 경우
        return window.event.srcElement; //클릭 이벤트가 발생한 버튼 리턴
}

//Player의 생성자
function Player(p) {
    //매개변수 p가 null이면 point 속성에 0 대입 아니면 point 속성에 p 대입
    if (!p) {
        this.point = 0;
    } else {
        this.point = p;
    }
}


//가위 바위 보 버튼 클릭시 호출되는 메서드
function playRockScissorsPaper(evt) {
    //1.getEventSource(evt) 함수를 호출해서 클릭 이벤트가 발생한 버튼을 변수 source에 대입
    var source = getEventSource(evt);

    //2. Player객체를 생성해서 변수 player에 대입
    var player = new Player();


    /*3.클릭이벤트가 발생한 source변수의 id속성이
       'btnScissors' 일때 (가위) ->player의 point 속성에 0 대입
       'btnRock' 일때 (바위) ->player의 point 속성에 1 대입
       'btnPaper' 일때 (보) ->player의 point 속성에 2 대입
     */
    var targetId = source.getAttribute("id");

    if ('btnScissors' === targetId) {
        player.point = 0;
    }
    else if ('btnRock' === targetId) {
        player.point = 1;
    }
    else {
        player.point = 2;
    }

    /*
    * 4. 0~2 사이의 난수를 생성해서 변수 num에 대입
    *     Math.floor(Math.random() * 3)
    * */
    var num = Math.floor(Math.random() * 3);

    /*
    * 5. num을 매개변수를 갖는 Player객체 생성해서 변수 computer에 대입
    *
    * */
    var computer = new Player(num);

    var resultElement = document.getElementById('result');

    if (player.point == computer.point) {
        resultElement.innerHTML = '플레이어: ' + player + ' vs 컴퓨터: ' + computer + ' => 비겼습니다!!!';
    } else {
        if ((player.point + 1) % 3 == computer.point) {
            resultElement.innerHTML = '플레이어: ' + player + ' vs 컴퓨터: ' + computer + ' => 졌습니다!!!';
        } else {
            resultElement.innerHTML = '플레이어: ' + player + ' vs 컴퓨터: ' + computer + ' => 이겼습니다!!!';
        }
    };

}
Player.prototype.toString = function() {
    switch(this.point) {
        case 0:
            return "가위";
        case 1:
            return "바위";
        case 2:
            return "보";
    }
};

addListener(window, 'load', init);
