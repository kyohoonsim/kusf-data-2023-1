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
//foulmaker의 타자를 선택할 수 있는 자바스크립트문
var lg트윈스 = ["====","홍창기", "오지환", "문보경", "문성주", "양의지","임찬규","손주영","김민성","서건창","안익훈","김현수","박해민","이천웅"];
var SSG랜더스 = ["====","최정", "최지훈", "안상현", "길레르모 에레디아"];
var 두산베어스 = ["====","김재환","박지훈","허경민","박치국","홍건희","이영하","김재호","정수빈","양의지","강승호","김대한","도수행","양찬열","신성현"];
var NC다이노스 = ["====","박석민","도태훈","박민우","서호철"];
var 롯데자이언츠 = ["====","전준우","안치홍","최종은","김민수","김원중"];
var KIA타이거즈 = ["====","황대인","김도영","오정환","김선빈"];
var KT위즈 = ["====","김상수","박병호","문상준","황재균","앤서니 알포드","양의지"];
var 한화이글스 =["====","정은원","노시환","하주석","오선진","노시환","채은성"];
var 키움히어로즈 = ["====","이정후","김혜성","김준완"];
var 삼성라이온스 = ["====","구자욱","오재일","김재상","김동진"];
var target = document.getElementById("selectBatter");

function HomeTeam(e) {
    var selectedTeam = e.value;
    var target = document.getElementById("selectBatter");
    var players = [];

    if (selectedTeam === "LG") players = lg트윈스;
    else if (selectedTeam === "SSG") players = SSG랜더스;
    else if(selectedTeam === "두산") players = 두산베어스;
    else if(selectedTeam === "NC") players = NC다이노스;
    else if(selectedTeam === "롯데") players = 롯데자이언츠;
    else if(selectedTeam === "KIA") players = KIA타이거즈;
    else if(selectedTeam === "KT") players = KT위즈;
    else if(selectedTeam === "한화") players = 한화이글스;
    else if(selectedTeam === "키움") players = 키움히어로즈;
    else if(selectedTeam === "삼성") players = 삼성라이온스;

    target.options.length = 0;

    for (var i = 0; i < players.length; i++) {
        var opt = document.createElement("option");
        opt.value = players[i];
        opt.innerHTML = players[i];
        target.appendChild(opt);
    }
}


//foulINDUCER의 투수를 선택할 수 있는 자바스크립트문
var lg = ["====","강효종", "고우석", "김동규", "김영준", "김윤식"];
var SSG = ["====","강매성", "김주온", "김주한", "고효준", "노경은"];
var 두산 = ["====","박치국","김지용","김강률","장원준","김동주"];
var NC = ["====","심창민","김재균","전루건","김태현","최성영"];
var 롯데 = ["====","구승민","김강현","김상수","김원중","나균안"];
var KIA = ["====","강병우","강이준","고영창","곽도규","김건국"];
var KT = ["====","고영표","김건웅","김민","김민수","김영현"];
var 한화 =["====","문동주","이승관","윤대경","남지민","송윤준"];
var 키움 = ["====","김건희","김동혁","김성진","김준형","노운현"];
var 삼성 = ["====","오승환","우규민","김대우","뷰캐넌","이상민"];
var target = document.getElementById("selectPitcher");

function selectAwayTeam(e) {
    var selectedTeam = e.value;
    var target = document.getElementById("selectPitcher");
    var players = [];

    if (selectedTeam === "LG") players = lg;
    else if (selectedTeam === "SSG") players = SSG;
    else if(selectedTeam === "두산") players = 두산;
    else if(selectedTeam === "NC") players = NC;
    else if(selectedTeam === "롯데") players = 롯데;
    else if(selectedTeam === "KIA") players = KIA;
    else if(selectedTeam === "KT") players = KT;
    else if(selectedTeam === "한화") players = 한화;
    else if(selectedTeam === "키움") players = 키움;
    else if(selectedTeam === "삼성") players = 삼성;

    target.options.length = 0;

    for (var i = 0; i < players.length; i++) {
        var opt = document.createElement("option");
        opt.value = players[i];
        opt.innerHTML = players[i];
        target.appendChild(opt);
    }
}
