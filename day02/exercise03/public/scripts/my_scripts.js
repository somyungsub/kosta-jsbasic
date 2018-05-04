$(document).ready(function () {
    //페이지의 시간이 갱신되는 시간 단위는 1/1000 초로 1000 은 1초 10000은 10초
    var FREQ = 1000;
    //반복여부
    var repeat = true;

    function showFrequency() {
        //1.화면에서 id속성이 값이 freq인 객체에 이페이지는 1초마다 갱신됩니다 메시지 출력
        //id속성이 freq인 객체.html(출력할 메시지)
        $("#freq").html("이페이지는 1초마다 갱신됩니다.");
    }

    function startAJAXcalls() {

        if (repeat) {
            //FREQ 시간마다 getXMLRacers() 와 startAJAXcalls() 메서드 호출
            setTimeout(function () {
                getXMLRacers();
                startAJAXcalls();
            }, FREQ);
        }
    }

    function getXMLRacers() {
        //서버와 통신하는 메서드
        $.ajax({
            url: "/data.json",  //서버url
            cache: false,       //캐쉬 사용 안함
            dataType: "json",   //서버에서 리턴하는 타입 (json:자바스크립트 객체,배열)
            success: function (data) {  //서버에서 응답하면 이 메서드가 실행되고 리턴값은 data에 저장
                //id 속성값이 finishers_m 인 객체의 내용 삭제
                $('#finishers_m').empty();
                //2. id 속성값이 finishers_f인 객체의 내용 삭제
                $('#finishers_f').empty();
                //3. id 속성값이 finishers_all 인 객체의 내용 삭제
                $('#finishers_all').empty();

                /*
                * 서버에서 리턴한 값을 저장한 변수 data에는 다음과 같은 배열이 저장되 있음
                *
                * [{name:홍길동, time: 시간,gender:m},
                *  {name:홍길순,time:시간,gender:f}
                *  ...
                *  ]
                * */

                //data 배열의 사이즈 만큼 반복
                //몆번째 반복인지는 index에 저장
                //배열에서 요소를 순서대로 꺼내서 item에 저장
                $.each(data, function (index, item) {
                        //1.item의 name 속성과 time 속성을 변수 info에 저장
                        var info = "";
                        info += item.name;
                        info += item.time;

                        //2. 변수 info에 줄바꿈 <br/> 추가
                        info += "<br/>";

                        //item의 gender 속성이 m이면
                        if (item.gender == "m") {
                            //info를 id 속성이 finisher_m인 객체에 추가
                            $('#finishers_m').append(info);
                        } else {
                            //3.info를 id 속성이 finisher_f인 객체에 추가
                            $('#finishers_f').append(info);
                        }
                        //4.info를 id 속성이 finisher_all 인 객체에 추가
                        $('#finishers_all').append(info);

                    }
                )

                getTimeAjax();
            }
        });
    }

    function getTimeAjax() {

        var time = "";
        //서버와 통신
        $.ajax({
            url: "/time", //서버 url
            cache: false,  //캐쉬 안함
            success: function (data) { //서버에서 리턴하면 이메서드가 실행 서버의 리턴값은 변수 data에 저장
                $('#updatedTime').html(data);//서버의 리턴값을 id 속성값이 updateTime인 객체에 추가
            }
        });

    }

    $("#btnStop").on('click', function () {
        repeat = false;
        $("#freq").html("Updates paused.");
    });

    $("#btnStart").on('click', function () {
        repeat = true;
        startAJAXcalls();
        showFrequency();
    });

    showFrequency();
    getXMLRacers();
    startAJAXcalls();
});
