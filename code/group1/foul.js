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
