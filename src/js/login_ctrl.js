//控制用户的登录行为：
$(function(){
    var thisCCer = new cookieChecker(checkIfLogin);
    thisCCer.checkValid();
    function checkIfLogin(resData){
        if(resData.loStatus) {//如果确认用户已经登陆：
            window.location.href='_index.html';
        }
    }
    var check_status = [false,false];//初始化表单验证状态
    //初始化tabs：
    var allLoginForms = $('#login-tabs form.login-form');
    $('#login-tabs').tabs({
        active:0,
        create: function() {
            check_status = [false,false];
            var thisCheckForm = $(allLoginForms[0]);
            runCheck(thisCheckForm);
        },
        activate:function(){
            check_status = [false,false];
            var active_tab = $(this).tabs("option","active");
            var thisCheckFrom = $(allLoginForms[active_tab]);
            runCheck(thisCheckFrom);
        }
    });
    //初始化提交按钮：
    $('#login-tabs input[type="submit"]').button({
        disabled:true
    });

    //处理表单提交：
    $('#login-tabs form').submit(function(eve){
        eve.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url:'http://localhost/yxIMS_PHP_API/user_register_login/user_login.php',
            type:'POST',
            data:formData,
            dataType:'json',
            success:function(response){
                if (response.loStatus){
                    $('#submitted_dialog').html('<p>'+response.successMsg[0]+'</p>');
                    $('#submitted_dialog').dialog({
                        modal:true
                    });
                    setTimeout(function(){
                        window.location.href="_index.html";
                    },1500);
                }else{
                    var html = '';
                    $.each(response.errorMsg,function(index,ele){
                        html+='<p>'+ele+'</p>';
                    });
                    $('#submitted_dialog').html(html);
                    $('#submitted_dialog').dialog({
                        modal:true,
                        buttons:{
                            '重新输入':function(){
                                $(this).dialog("close");
                            }
                        }
                    });
                }
            }
        });
    });

    //验证表单输入值是否合法：
    function runCheck(checkForm){
        checkForm.on('keyup','input[type!=submit]',function(){
            checkFormValue($(this));
        });
        checkForm.on('blur','input[type!=submit]',function(){
            checkFormValue($(this));
        });
    }

    //验证登录表单输入值：
    function checkFormValue(thisInput){
        switch(thisInput.attr('name')){
            case 'job_number':
                checkHandle(thisInput.val(),$('#jn-check'),'必须输入3位数字',/^\d{3}$/g,'工号',0);
                break;
            case 'user_mobile':
                checkHandle(thisInput.val(),$('#um-check'),'请输入正确的手机号码',/^1[34578]\d{9}$/g,'手机号码',0);
                break;
            case 'user_email':
                checkHandle(thisInput.val(),$('#ue-check'),'请输入正确的邮箱地址',/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g,'邮箱地址',0);
                break;
            case 'user_pass':
                checkHandle(thisInput.val(),thisInput.next('.up-check'),'密码必须6-16位，至少包含数字、字母、符号中的两类',/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/g,'密码',1);
        }
    }

    //复用验证函数：
    function checkHandle(inputValue,checkBox,textMessage,regExp,inputName,inp_order){
        if (inputValue.length != 0){
            if (regExp.test(inputValue)){
                checkBox.find('.check-icon').removeClass('check-icon-error').addClass('check-icon-pass');
                checkBox.find('.check-text').text('输入正确').css({
                    display:'inline-block',
                    color:'#22ac38'
                });
                check_status[inp_order] = true;
                submitHandler();
            }else{
                checkBox.find('.check-icon').removeClass('check-icon-pass').addClass('check-icon-error');
                checkBox.find('.check-text').text(textMessage).css({
                    display:'inline-block',
                    color:'#ff0000'
                });
                check_status[inp_order] = false;
                submitHandler();
            }
        }else{
            checkBox.find('.check-icon').removeClass('check-icon-pass').addClass('check-icon-error');
            checkBox.find('.check-text').text(inputName+'不能为空').css({
                display:'inline-block',
                color:'#ff0000'
            });
            check_status[inp_order] = false;
            submitHandler();
        }
    }

    //更改允许提交的状态：
    function submitHandler(){
        var last_check_status = true;
        $.each(check_status,function(index,element){
            if (!element){
                last_check_status=false;
                return false;
            }
        });
        if (last_check_status){//如果所有状态验证都通过
            $('#login-tabs input[type="submit"]').button({
                disabled:false
            });
        }else{
            $('#login-tabs input[type="submit"]').button({
                disabled:true
            });
        }
    }
});