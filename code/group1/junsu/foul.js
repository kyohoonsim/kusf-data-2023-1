var isEventHandlersBound = false;

$(document).ready(function(){

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
      
        //ajax get 요청 -> url : api + query parameter  
        queryParameter = queryParameter.slice(0, queryParameter.length - 1)
    
        $.ajax ({
            url	: "https://kusf-api-1-chungsu.run.goorm.site/fouls"+queryParameter,   // 요청이 전송될 URL 주소
            type : "GET", // http 요청 방식 (default: ‘GET’)               
            success : function(data, status, xhr) {     // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
                var list = data.foul_percentage_data;
      
                for(var i=0; i<list.length; i++) {
                    var rowHtml = "<tr>";
                    rowHtml += "<td>" + list[i][0] + "</td>";
                    rowHtml += "<td>" + list[i][1] + "</td>";
                    
                        
                    console.log(rowHtml);
      
                    $("#foulTable").append(rowHtml);
                }
            },
            error : function(xhr, status, error) {    // 서버에서 error가 생겼을 때 호출됩니다.
                console.log(xhr);                      
            },
        });
    });
}

function HomeTeam(e) {
    var selectedTeam = e.value;
    var target = document.getElementById("selectBatter");
    var queryParameter = "?team=" + selectedTeam;

    target.options.length = 1;

    $.ajax ({
        url	: "https://kusf-api-1-chungsu.run.goorm.site/batter"+queryParameter ,   // 요청이 전송될 URL 주소
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
        url	: "https://kusf-api-1-chungsu.run.goorm.site/pitcher" + queryParameter ,   // 요청이 전송될 URL 주소
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


