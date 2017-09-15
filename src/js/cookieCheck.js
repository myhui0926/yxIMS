function cookieChecker(callBackFun){
    this.allCookie = document.cookie;
    this.cookieArray = this.allCookie.split(';');
    this.user_id = this.getCookieValue('user_id');
    this.user_job_number = this.getCookieValue('user_job_number');
    this.username = this.getCookieValue('username');
    this.user_pass = this.getCookieValue('user_pass');
    this.callBack = callBackFun;
}

cookieChecker.prototype.getCookieValue = function(cookieName){
    for (var i=0;i<this.cookieArray.length;i++){
        var thisCookie = this.cookieArray[i];
        if (thisCookie.indexOf(cookieName)!=-1){
            var cookieValue = thisCookie.substring(thisCookie.indexOf('=')+1);
            cookieValue = decodeURI(cookieValue);
            return cookieValue;
        }
    }
}

cookieChecker.prototype.checkValid = function(){
    var callBack = this.callBack;
    if (this.user_id && this.user_job_number && this.username && this.user_pass){
        $.ajax({
            url:'http://localhost/yxIMS_PHP_API/user_register_login/user_login.php',
            type:'POST',
            dataType:'json',
            success:function(responseData){
                callBack(responseData);
            }
        });
    }
}

cookieChecker.prototype.clearCookie = function(){
    var hour = new Date();
    hour.setHours(hour.getHours()-5);
    var expires = "expires="+hour.toUTCString()+";";
    document.cookie = "user_id=;"+expires+"path=/";
    document.cookie = "user_job_number=;"+expires+"path=/";
    document.cookie = "username=;"+expires+"path=/";
    document.cookie = "user_pass=;"+expires+"path=/";
    window.location.reload();
}