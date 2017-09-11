$(function(){
  $('#reg-radio-box input').checkboxradio();
    $( ".input-line input[type=submit]").button({
        disabled:true
    });

    var check_status = [false,true,false,false,false,false,false];
    $('#register-form').on('keyup','input',function(){
        checkFormValue($(this));
    });

    $('#register-form').on('blur','input',function(){
        checkFormValue($(this));
    });

    $('#reg-submit-btn').click(function(event){
        event.preventDefault();
        console.log('xxx');
    });

    function checkFormValue(thisInput){
        switch(thisInput.attr('name')){
            case 'job_number':
                checkHandle(thisInput.val(),$('#jn-check'),'必须输入3位数字',/^\d{3}$/g,'工号',0);
                break;
            case 'username':
                checkHandle(thisInput.val(),$('#un-check'),'必须输入2-4个汉字',/^[\u4e00-\u9fa5]{2,4}$/g,'姓名',2);
                break;
            case 'user_mobile':
                checkHandle(thisInput.val(),$('#um-check'),'请输入正确的手机号码',/^1[34578]\d{9}$/g,'手机号码',3);
                break;
            case 'user_email':
                checkHandle(thisInput.val(),$('#ue-check'),'请输入正确的邮箱地址',/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g,'邮箱地址',4);
                break;
            case 'user_pass':
                checkHandle(thisInput.val(),$('#up-check'),'密码必须6-16位，至少包含数字、字母、符号中的两类',/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{6,16}$/g,'密码',5);
                break;
            case 'user_pass_confirm':
                if (thisInput.val().length != 0 && thisInput.val()==$('#user-pass').val()){
                    $('#upc-check').find('.check-icon').removeClass('check-icon-error').addClass('check-icon-pass');
                    $('#upc-check').find('.check-text').text('输入正确').css({
                        display:'inline-block',
                        color:'#22ac38'
                    });
                    check_status[6] = true;
                    submitHandler();
                }else{
                    $('#upc-check').find('.check-icon').removeClass('check-icon-pass').addClass('check-icon-error');
                    $('#upc-check').find('.check-text').text('两次密码输入不匹配').css({
                        display:'inline-block',
                        color:'#ff0000'
                    });
                    check_status[6] = false;
                    submitHandler();
                }
        }
    }

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

    function submitHandler(){
        var check_statue = true;
        $.each(check_status,function(index,ele){
            if (!ele){
                check_statue = false;
                return false;
            }
        });
        if (check_statue){
            $('#reg-submit-btn').button('option','disabled',false);
        }else{
            $('#reg-submit-btn').button('option','disabled',true);
        }
    }

});