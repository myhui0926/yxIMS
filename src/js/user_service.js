$(function(){
    var headImghost = "http://localhost/imsMedia/";
    var thisCCer = new cookieChecker(createUserCenter);
    thisCCer.checkValid();

    function createUserCenter(responseData){
        if(responseData.loStatus){//如果确认用户已经登陆：
            $('#loginControl').css('display','none');
            var user_center_box = $('<div class="userCenter" id="userCenter"></div>');
            var headImgCon = $('<a id="userHeadPortrait" href="user_self.html"></a>');
            headImgCon.css('background-image','url("'+headImghost+thisCCer.user_job_number+'headportrait.jpg")');
            var usernameCon = $('<a href="user_self.html">'+thisCCer.username+'</a>');
            var logoutCon = $('<a href="#" id="user_logout">退出登录</a>');
            $('#siteTools').append(user_center_box);
            user_center_box.append(headImgCon).append(usernameCon).append(logoutCon);
            logoutCon.click(function(event){
                event.preventDefault();
                thisCCer.clearCookie();
            });
        }else{
            var html = '';
            $.each(response.errorMsg,function(index,ele){
                html+='<p>'+ele+'</p>';
            });
            $('#submitted_dialog').html(html);
            $('#submitted_dialog').dialog({
                modal:true,
                buttons:{
                    '重新登录':function(){
                        window.location.href='login.html';
                        $(this).dialog("close");
                    }
                }
            });
        }
    }
});