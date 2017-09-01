$(function(){
    var sng_pos = 0;
    var sn_sf_pos = 1;
    var sng = $('#sng');
    var ni_amount = sng.children('div.notice-inner').length;//.notice-inner数量

    //生成下方方形位置标记:
    for (var i=0;i<ni_amount;i++){
        $('#sn-sf').append('<span data-sfpos="'+(sn_sf_pos+i)+'"></span>');
    }
    //激活相应位置标记:
    snSfPosActive(sn_sf_pos);
    //位置标记与.notice-inner相关联：
    $('#sn-sf').on('click','span',function(){
        sn_sf_pos = $(this).data('sfpos');
        snSfPosActive(sn_sf_pos);
        sng_pos = -(sn_sf_pos-1)*1000;
        $('.site-notice-group').css('transform','translate('+sng_pos+'px,0)');
    });
    //自动切换.notice-inner:
    sngPosInterval();
    //鼠标悬停在#sng（.site-notice-group）上时，停止自动切换
    sng.on('mouseenter',function(){
        clearPosInterval();
    });

    //点击箭头切换.notice-inner:
    $('#right-arrow').click(function(event){
        event.preventDefault();
        if (sng_pos>-1000*(ni_amount-1)){
            sng_pos-=1000;
            sn_sf_pos +=1;
        }else{
            sng_pos=0;
            sn_sf_pos=1;
        }
        $('.site-notice-group').css('transform','translate('+sng_pos+'px,0)');
        snSfPosActive(sn_sf_pos);
        clearPosInterval();
    });

    $('#left-arrow').click(function(event){
        event.preventDefault();
        if (sng_pos<0){
            sng_pos+=1000;
            sn_sf_pos-=1;
        }else{
            sng_pos= -1000*(ni_amount-1);
            sn_sf_pos = ni_amount;
        }
        $('.site-notice-group').css('transform','translate('+sng_pos+'px,0)');
        snSfPosActive(sn_sf_pos);
        clearPosInterval();
    });

    function sngPosInterval(){
        sng.pos_interval = setInterval(function(){
            if (sng_pos>-1000*(ni_amount-1)){
                sng_pos-=1000;
                sn_sf_pos +=1;
            }else{
                sng_pos=0;
                sn_sf_pos=1;
            }
            $('.site-notice-group').css('transform','translate('+sng_pos+'px,0)');
            snSfPosActive(sn_sf_pos);
        },5000);
    }

    function clearPosInterval(){
        clearInterval(sng.pos_interval);
        if (sng.pos_timeOut){
            clearTimeout(sng.pos_timeOut);
        }
        sng.pos_timeOut = setTimeout(function(){
            sngPosInterval();
        },20000);
    }

    function snSfPosActive(sn_sf_pos){
        $('#sn-sf span').removeClass('sf-active');
        $('#sn-sf span:nth-child('+sn_sf_pos+')').addClass('sf-active');
    }
});