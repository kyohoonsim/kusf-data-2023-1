# FRONT END
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <style>
        table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        }
        span {
            font-weight:600;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
        #choose1 {
            border:4px solid #222;
            padding: 10px;
            position:absolute;
            top: 10px;
            margin-left:70%;
        }
        #choose2 {
            border:4px solid #222;
            padding: 10px;
            position:absolute;
            top: 190px;
            margin-left:70%;
        }
        #choose3 {
            border:4px solid #222;
            padding: 10px;
            position:absolute;
            top: 500px;
            margin-left:70%;
        }
        legend{
            font-weight: 900;
        }
        #submitBtn1 {
            color:rgb(252, 252, 252);
            background-color: #6c6d75;
        }
        #submitBtn2 {
            color:rgb(252, 252, 252);
            background-color: #223c45;
        }
        #submitBtn3 {
            color:rgb(252, 252, 252);
            background-color: #d30505;
        }
        #submitBtn4 {
            color:rgb(252, 252, 252);
            background-color: #6c6d75;
        }
        #submitBtn5 {
            color:rgb(252, 252, 252);
            background-color: #223c45;
        }
        #submitBtn6 {
            color:rgb(252, 252, 252);
            background-color: #d30505;
        }
        .foul_image {
            width: 800px;
            height: 700px;
        }
        .home_team:hover {
            font-weight: bold;
            color: blue;
        }
        .away_team:hover {
            font-weight: bold;
            color: blue;
        }
        .batter_name:hover {
            font-weight: bold;
            color: blue;
        }
        .pitcher_name:hover {
            font-weight: bold;
            color: blue;
        }
        .match_date:hover {
            font-weight: bold;
            color: blue;
        }
        .choice {
            
            text-align: center;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>

    <script>

        $(document).on("click", "#submitBtn1", function(e) {
            var home_team = $("#home_team").val();
            
            getTeamFoul(home_team);
        });

        function getTeamFoul(home_team) {

            $("#foulTable").empty();

            $.ajax ({
                url	: "https://kusf-api-1-chungsu.run.goorm.site/" + home_team,   // 요청이 전송될 URL 주소
                type : "GET",                            // http 요청 방식 (default: ‘GET’)
                //data  : {key : value},                    // 요청 시 포함되어질 데이터
                success : function(data, status, xhr) {     // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
                    var list = data.team_percentage_data;
                    console.log(list);

                    for(var i=0; i<list.length; i++) {
                        var rowHtml = "<tr>";
                        rowHtml += "<td>" + list[i][0] + "</td>";
                        rowHtml += "<td>" + list[i][1] + "</td>";
                
                    
                        console.log(rowHtml);

                        $("#foulTable").append(rowHtml);
                    }
                },
                error	: function(xhr, status, error) {    // 서버에서 error가 생겼을 때 호출됩니다.
                    console.log(xhr);                      
                },
            });
        };
    </script>
</head>
<body style="background-color:rgb(80, 183, 84)">
    <img src="./잠실야구장사진.jpg" class="foul_image">
    <div>
        <form action="#" id="choose2">
            <fieldset>
                <legend class="choice">선택사항</legend>
                <ul>
                    <li>
                        <label for="batter_name"><span>타자:</span></label>
                        <select class="batter_name" name="batter_name" id="batter_name">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </li>
                    <li>
                        <label for="away_team"><span>상대팀:</span></label>
                        <select class="away_team" name="away_team" id="away_team">
                            <option value="LG">LG트윈스</option>
                            <option value="SSG">SSG랜더스</option>
                            <option value="두산">두산베어스</option>
                            <option value="NC">NC다이노스</option>
                            <option value="롯데">롯데자이언츠</option>
                            <option value="KIA">KIA타이거즈</option>
                            <option value="KT">KT위즈</option>
                            <option value="한화">한화이글스</option>
                            <option value="키움">키움히어로즈</option>
                            <option value="삼성">삼성라이온스</option>
                        </select>
                        <label for="pitcher_name"><span>투수:</span></label>
                        <select class="pitcher_name" name="pitcher_name" id="pitcher_name">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </li>
                    <li>
                        <span>경기날짜:</span> <input class="match_date" type="date">
                    </li>
                    <li>
                        <span>OUT 카운트:</span> <label></label><input class="out_count" type="radio" name="out" value="0">0</label>
                        <label><input type="radio" name="out" value="1">1</label>
                        <label></label><input type="radio" name="out" value="2">2</label>
                    </li>
                    <li>
                        <span>STRIKE 카운트:</span> <label></label><input class="strike_count" type="radio" name="strike" value="0">0</label>
                        <label><input type="radio" name="strike" value="1">1</label>
                        <label><input type="radio" name="strike" value="2">2</label>
                    </li>
                    <li>
                        <span>BALL 카운트:</span> <label></label><input class="ball_count" type="radio" name="ball" value="0">0</label>
                        <label><input type="radio" name="ball" value="1">1</label>
                        <label></label><input type="radio" name="ball" value="2">2</label>
                        <label></label><input type="radio" name="ball" value="3">3</label>
                    </li>
                </ul>
                <input id="submitBtn4" type="submit" value="확인" style="margin-left:70px ;"/>
                <input id="submitBtn5" type="reset" value="초기화" style="margin-left:35px ;"/>
                <input id="submitBtn6" type="button" value="취소" style="margin-left:30px ;"/>
            </fieldset>
        </form>
    </div>
    <form action="#" id="choose1">
        <fieldset>
            <legend class="choice">필수 선택사항</legend>
            <ul>
                <li>
                    <label for="home_team"><span>팀:</span></label>
                    <select class="home_team" name="home_team" id="home_team">
                        <option value="LG">LG트윈스</option>
                        <option value="SSG">SSG랜더스</option>
                        <option value="두산">두산베어스</option>
                        <option value="NC">NC다이노스</option>
                        <option value="롯데">롯데자이언츠</option>
                        <option value="KIA">KIA타이거즈</option>
                        <option value="KT">KT위즈</option>
                        <option value="한화">한화이글스</option>
                        <option value="키움">키움히어로즈</option>
                        <option value="삼성">삼성라이온스</option>
                    </select>
                    
                </li>
            </ul>
            <input id="submitBtn1" type="button" value="확인" style="margin-left:10px;"/>
                <input id="submitBtn2" type="reset" value="초기화" style="margin-left:35px ;"/>
                <input id="submitBtn3" type="button" value="취소" style="margin-left:30px ;"/>
        </fieldset>
    </form>

    <form action="#" id="choose3">
        <fieldset>
        <label></label>
        <table >
            <thead>
                <tr>
                    <td>구역</td>
                    <td>파울발생확률</td>
                </tr>
            </thead>
            <tbody id="foulTable">

            </tbody>
        </table>
        </fieldset>
    </form>
</body>
</html>
```
