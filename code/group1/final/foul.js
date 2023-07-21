var isEventHandlersBound = false;

$(document).ready(function(){

    // 캔버스 요소 가져오기
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // 고해상도 그래픽을 위해 픽셀 밀도 설정
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;

    var ratio = devicePixelRatio / backingStoreRatio;

    // 캔버스 크기 설정
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;

    // 스타일로 크기 조정
    canvas.style.width = canvas.offsetWidth + "px";
    canvas.style.height = canvas.offsetHeight + "px";

    // 캔버스 스케일 설정
    ctx.scale(ratio, ratio);

    // 이벤트 핸들러 바인딩 함수 호출

    if (!isEventHandlersBound) {
        이벤트핸들러바인딩();
        isEventHandlersBound = true;
    }
});

function 이벤트핸들러바인딩() {
    $(function(){
        $('.helpBtn').on('mouseover', function(){
            $('.helpMessage1').css('display','block');
        });
    
        $('.helpBtn').on('mouseout', function(){
            $('.helpMessage1').css('display','none');
        });
    });
    
    $(function(){
        $('.helpBtn2').on('mouseover', function(){
            $('.helpMessage2').css('display','block');
        });
    
        $('.helpBtn2').on('mouseout', function(){
            $('.helpMessage2').css('display','none');
        });
    });
    
    $(document).on("click", "#searchBtn", function() {
    
        $("#foulTable").empty();
        var attack_team = $("#selectHomeTeam").val();
        var batter = $("#selectBatter").val();
        var defense_team = $("#selectAwayTeam").val();
        var pitcher = $("#selectPitcher").val();
        var outcount = $("input[name='out']:checked").val();
        var strike = $("input[name='strike']:checked").val();
        var ball = $("input[name='ball']:checked").val();
    
        var queryParameter = "?";
    
        if (attack_team != "원하는 타자의 팀을 선택해 주세요") {
            queryParameter += "team=" + attack_team + "&"
    
            if (batter != "타자선택") {
                queryParameter += "batter=" + batter + "&"
            }
        }  
    
        if (defense_team != "상대팀을 선택해주세요.") {
            queryParameter += "opposing_team=" + defense_team + "&"
    
            if (pitcher != "투수선택") {
                queryParameter += "pitcher=" + pitcher + "&"
            }
        }

        if (outcount) {
            queryParameter += "outcount=" + outcount + "&"
        }

        if (strike) {
            queryParameter += "strike=" + strike + "&"
        }

        if (ball) {
            queryParameter += "ball=" + ball + "&"
        }

        
    
        //ajax get 요청 -> url : api + query parameter  
        queryParameter = queryParameter.slice(0, queryParameter.length - 1)
    
        $.ajax ({
            url   : "https://kusf-api-1-chungsu.run.goorm.site/fouls"+queryParameter,   // 요청이 전송될 URL 주소
            type : "GET", // http 요청 방식 (default: ‘GET’)               
            success : function(data, status, xhr) {     // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
                var list = data.foul_percentage_data;
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                for(var i=0; i<list.length; i++) {
                    drawTextOnPolygon(list[i])                  
                }
            },
            error : function(xhr, status, error) {    // 서버에서 error가 생겼을 때 호출됩니다.
                console.log(xhr);                      
            },
        });
    });
}

function drawTextOnPolygon(section) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var section_name = section[0];
    var section_value = section[1];


    // getPolygonCoordinates 함수에서 리턴되는 좌표 값들을 캔버스 크기에 맞게 조정
    var coords = getAdjustedPolygonCoordinates(getPolygonCoordinates(section_name), canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(coords[0][0], coords[0][1]);
    for (var i = 1; i < coords.length; i++) {
        ctx.lineTo(coords[i][0], coords[i][1]);
    }
    ctx.closePath();

    if (section_value <= 10){
        console.log(section_value)
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.strokeStyle = "green";
    }
    else if (section_value > 10 && section <= 30){
        ctx.fillStyle = "rgba(127, 128, 0, 0.5)";
        ctx.strokeStyle = "yellow";
    }
    else {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.strokeStyle = "red";
    }
    ctx.fill();
    ctx.lineWidth = 1; // 폰트사이즈
    ctx.stroke();

    // 텍스트 표시
    var fontSize = 12; // 원하는 폰트 크기로 조정
    var scaledFontSize = fontSize * (canvas.width / 700); // 기준 폰트 크기 (700px)에 비례하여 크기 조정

    // 텍스트 표시
    var centerCoords = getPolygonCenter(coords);
    ctx.font = `${scaledFontSize}px italic`; // 폰트 크기 적용
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(section_value+"%", centerCoords.x, centerCoords.y);
}

function getAdjustedPolygonCoordinates(coords, canvasWidth, canvasHeight) {
    // 이미지의 원본 크기 (700px x 656px)와 캔버스의 크기를 비교하여 좌표 값을 조정
    var originalWidth = 700;
    var originalHeight = 656;

    var adjustedCoords = [];
    for (var i = 0; i < coords.length; i++) {
        var adjustedX = (coords[i][0] / originalWidth) * canvasWidth;
        var adjustedY = (coords[i][1] / originalHeight) * canvasHeight;
        adjustedCoords.push([adjustedX, adjustedY]);
    }

    return adjustedCoords;
}

function getPolygonCenter(coords) {
    var centerX = coords.reduce((sum, coord) => sum + coord[0], 0) / coords.length;
    var centerY = coords.reduce((sum, coord) => sum + coord[1], 0) / coords.length;
    return { x: centerX, y: centerY };
}

function getPolygonCoordinates(text) {
    if (text === "A") {
        return [
            [568, 248],
            [542, 267],
            [500, 338],
            [544, 358],
            [570, 307]
        ];
    } else if (text === "B") {
        return [
            [500, 341],
            [492, 352],
            [486, 376],
            [474, 400],
            [502, 420],
            [524, 390],
            [542, 360]
        ];
    } else if (text === "C") {
        return [
            [473, 402],
            [443, 440],
            [400, 477],
            [408, 500],
            [442, 482],
            [474, 453],
            [501, 422]
        ];
    } else if (text === "D") {
        return [
            [320, 477],
            [314, 499],
            [282, 483],
            [219, 418],
            [246, 398],
            [278, 439]
        ];
    } else if (text === "E") {
        return [
            [244, 396],
            [216, 413],
            [178, 356],
            [217, 332],
            [232, 353],
            [233, 368]
        ];
    } else if (text === "F") {
        return [
            [215, 329],
            [176, 351],
            [152, 307],
            [153, 250],
            [181, 270]
        ];
    } else if (text === "G") {
        return [
            [572, 252],
            [603, 245],
            [607, 291],
            [590, 353],
            [558, 341],
            [571, 314],
            [574, 281]
        ];
    } else if (text === "H") {
        return [
            [557, 345],
            [590, 356],
            [570, 399],
            [539, 438],
            [510, 414]
        ];
    } else if (text === "I") {
        return [
            [509, 418],
            [537, 443],
            [481, 487],
            [414, 515],
            [410, 504],
            [464, 468],
            [508, 416]
        ];
    } else if (text === "J") {
        return [
            [312, 503],
            [308, 515],
            [238, 488],
            [182, 440],
            [212, 416],
            [260, 470]
        ];
    } else if (text === "K") {
        return [
            [210, 413],
            [179, 435],
            [162, 418],
            [142, 384],
            [132, 356],
            [165, 343],
            [209, 412]
        ];
    } else if (text === "L") {
        return [
            [163, 340],
            [132, 352],
            [120, 310],
            [119, 246],
            [152, 252],
            [150, 304]
        ];
    } else if (text === "N") {
        return [
            [608, 243],
            [621, 240],
            [631, 281],
            [632, 350],
            [616, 412],
            [582, 395],
            [600, 340],
            [608, 293]
        ];
    } else if (text === "M") {
        return [
            [613, 416],
            [594, 458],
            [555, 512],
            [504, 550],
            [478, 498],
            [516, 471],
            [548, 437],
            [576, 399]
        ];
    } else if (text === "O") {
        return [
            [500, 551],
            [442, 581],
            [341, 592],
            [268, 576],
            [220, 552],
            [243, 496],
            [304, 517],
            [363, 525],
            [435, 511],
            [475, 495]
        ];
    } else if (text === "P") {
        return [
            [217, 549],
            [173, 517],
            [127, 460],
            [106, 416],
            [144, 399],
            [172, 438],
            [207, 471],
            [241, 492]
        ];
    } else if (text === "Q") {
        return [
            [105, 411],
            [92, 372],
            [89, 313],
            [100, 238],
            [117, 242],
            [114, 291],
            [124, 345],
            [143, 394]
        ];
    } else if (text === "R") {
        return [
            [614, 222],
            [595, 175],
            [559, 131],
            [530, 154],
            [550, 187],
            [568, 237]
        ];
    } else if (text === "S") {
        return [
            [556, 128],
            [527, 151],
            [503, 127],
            [471, 104],
            [449, 91],
            [462, 64],
            [508, 89]
        ];
    } else if (text === "T") {
        return [
            [458, 64],
            [445, 88],
            [409, 77],
            [378, 71],
            [378, 45],
            [415, 49]
        ];
    } else if (text === "U") {
        return [
            [344, 44],
            [344, 71],
            [310, 78],
            [273, 92],
            [263, 63],
            [300, 50]
        ];
    } else if (text === "V") {
        return [
            [270, 94],
            [244, 107],
            [214, 133],
            [195, 154],
            [165, 129],
            [193, 103],
            [224, 81],
            [259, 64]
        ];
    } else if (text === "W") {
        return [
            [192, 158],
            [176, 183],
            [162, 211],
            [153, 237],
            [106, 223],
            [118, 191],
            [138, 159],
            [163, 131]
        ];
    } else if (text === "X") {
        return [
            [185, 271],
            [205, 281],
            [237, 336],
            [231, 348]
        ];
    } else if (text === "Y") {
        return [
            [538, 269],
            [517, 280],
            [484, 335],
            [489, 350]
        ];
    } else if (text === "Z") {
        return [
            [322,479],
            [314, 515],
            [339, 522],
            [388, 522],
            [409, 515],
            [398, 477],
            [374, 485],
            [346, 485]
        ];
    }
}



function HomeTeam(e) {
    var selectedTeam = e.value;
    var target = document.getElementById("selectBatter");
    var queryParameter = "?team=" + selectedTeam;

    target.options.length = 1;

    $.ajax ({
        url   : "https://kusf-api-1-chungsu.run.goorm.site/batter"+queryParameter ,   // 요청이 전송될 URL 주소
        type : "GET", // http 요청 방식 (default: ‘GET’)               
        success : function(data, status, xhr) {     // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
            var list = data.batter;

            for(var i = 0; i < list.length; i++) {
                var opt = document.createElement("option");
                opt.value = list[i];
                opt.innerHTML = list[i];
                target.appendChild(opt);
            }
        },
        error : function(xhr, status, error) {    // 서버에서 error가 생겼을 때 호출됩니다.
            console.log(xhr);                      
        },
    });
}

function selectAwayTeam(e) {
    var selectedTeam = e.value;
    var target = document.getElementById("selectPitcher");
    var queryParameter = "?opposing_team=" + selectedTeam;

    target.options.length = 1;

    $.ajax ({
        url   : "https://kusf-api-1-chungsu.run.goorm.site/pitcher" + queryParameter ,   // 요청이 전송될 URL 주소
        type : "GET", // http 요청 방식 (default: ‘GET’)               
        success : function(data, status, xhr) {     // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
            var list = data.pitcher;

            for(var i = 0; i < list.length; i++) {
                var opt = document.createElement("option");
                opt.value = list[i];
                opt.innerHTML = list[i];
                target.appendChild(opt);
            }
        },
        error : function(xhr, status, error) {    // 서버에서 error가 생겼을 때 호출됩니다.
            console.log(xhr);                      
        },
    });
}



document.addEventListener("DOMContentLoaded", function() {
    var toggle = document.getElementById("toggle");
    var countOptions = document.querySelector(".count-options");
    var countInputs = document.querySelectorAll("input[type='radio']");
    
    toggle.addEventListener("change", function() {
        if (toggle.checked) {
            countOptions.style.display = "block";
            countInputs.forEach(input => {
                input.checked = false;
            });
        } else {
            countOptions.style.display = "none";
            resetRadioButtons(countOptions);
        }
    });
});

function resetRadioButtons(container) {
    var radioButtons = container.querySelectorAll("input[type='radio']");
    radioButtons.forEach(function(radioButton) {
        radioButton.checked = false;
    });
}
