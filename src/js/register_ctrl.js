$(function(){
    //默认状态禁用提交按钮
  $('#reg-radio-box input').checkboxradio();
    $( ".input-line input[type=submit]").button({
        disabled:true
    });

    var check_status = [false,true,false,false,false,false,false,false];//预设各表单值检查状态

    //部门选择应用controlgroup:
    var user_depart='no_select';
    $('#depart_type').selectmenu({
        change:function(){
            switch($(this).val()){
                case 'xz':
                    userDepartCreate($('#w-xz'));
                    break;
                case 'nr':
                    userDepartCreate($('#w-nr'));
                    break;
                case 'yw':
                    userDepartCreate($('#w-yw'));
                    break;
                default:
                    $('#user_depart').selectmenu({
                        disabled:true
                    });
            }
                $('#ud-check').find('.check-icon').removeClass('check-icon-pass').addClass('check-icon-error');
                $('#ud-check').find('.check-text').text('请选择具体部门').css({
                    display:'inline-block',
                    color:'#ff0000'
                });
                check_status[2] = false;//检查未通过
                submitHandler();
            }
    });

    //具体部门选择菜单初始状态：
    $('#user_depart').selectmenu({
        change:function(){
            user_depart = $(this).val();
            console.log(user_depart);
            if (user_depart!='no_select'){
                $('#ud-check').find('.check-icon').removeClass('check-icon-error').addClass('check-icon-pass');
                $('#ud-check').find('.check-text').text('正确').css({
                    display:'inline-block',
                    color:'#22ac38'
                });
                check_status[2] = true;//检查通过
                submitHandler();
            }
        },
        disabled:true
    });

    $('#register-form').on('keyup','input',function(){
        checkFormValue($(this));//检查输入值是否合法
    });

    $('#register-form').on('blur','input',function(){
        checkFormValue($(this));//检查输入值是否合法
    });

    //根据部门类型动态创建用户所属部门：
    function userDepartCreate(appendEle){
        var innerEle = appendEle.children('option');
        $('#user_depart option').remove();
        $('#user_depart').selectmenu({
            disabled:false
        });
        $('#user_depart').selectmenu("refresh");
        $('#user_depart').append(innerEle.clone()).selectmenu("refresh");
    }

    function checkFormValue(thisInput){
        switch(thisInput.attr('name')){
            case 'job_number':
                checkHandle(thisInput.val(),$('#jn-check'),'必须输入3位数字',/^\d{3}$/g,'工号',0);
                break;
            case 'username':
                checkHandle(thisInput.val(),$('#un-check'),'必须输入2-4个汉字',/^[\u4e00-\u9fa5]{2,4}$/g,'姓名',3);
                break;
            case 'user_mobile':
                checkHandle(thisInput.val(),$('#um-check'),'请输入正确的手机号码',/^1[34578]\d{9}$/g,'手机号码',4);
                break;
            case 'user_email':
                checkHandle(thisInput.val(),$('#ue-check'),'请输入正确的邮箱地址',/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g,'邮箱地址',5);
                break;
            case 'user_pass':
                checkHandle(thisInput.val(),$('#up-check'),'密码必须6-16位，至少包含数字、字母、符号中的两类',/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/g,'密码',6);
                break;
            case 'user_pass_confirm':
                if (thisInput.val().length != 0 && thisInput.val()==$('#user-pass').val()){
                    $('#upc-check').find('.check-icon').removeClass('check-icon-error').addClass('check-icon-pass');
                    $('#upc-check').find('.check-text').text('输入正确').css({
                        display:'inline-block',
                        color:'#22ac38'
                    });
                    check_status[7] = true;
                    submitHandler();
                }else{
                    $('#upc-check').find('.check-icon').removeClass('check-icon-pass').addClass('check-icon-error');
                    $('#upc-check').find('.check-text').text('两次密码输入不匹配').css({
                        display:'inline-block',
                        color:'#ff0000'
                    });
                    check_status[7] = false;
                    submitHandler();
                }
                break;
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

    var userType = 'other';//设置默认用户类型
    $('#reg-radio-box input[name="user_type"]').change(function(){//根据值的变化确认用户类型
        userType = $(this).val();
    });

    function submitHandler(){
        var check_statue = true;
        $.each(check_status,function(index,ele){
            if (!ele){
                check_statue = false;
                return false;
            }
        });
        if (check_statue){//如果所有数据都验证正确：
            $('#reg-submit-btn').button('option','disabled',false);
            $('#register-form').on('submit',function(event){
                event.preventDefault();
                var msg_entered = '';
                msg_entered+='<span>工号：'+$('input[name="job_number"]').val()+'</span>';
                switch(userType){
                    case 'ae':
                        msg_entered+='<span>用户类型：'+'AE'+'</span>';
                        break;
                    case 'mm':
                        msg_entered+='<span>用户类型：'+'媒介'+'</span>';
                        break;
                    case 'other':
                        msg_entered+='<span>用户类型：'+'其他用户'+'</span>';
                        break;
                    default:
                        msg_entered+='<span>用户类型：'+'其他用户'+'</span>';
                        break;
                }
                msg_entered+='<span>所属部门：'+user_depart+'</span>';
                msg_entered+='<span>姓名：'+$('input[name="username"]').val()+'</span>';
                msg_entered+='<span>手机号：'+$('input[name="user_mobile"]').val()+'</span>';
                msg_entered+='<span>邮箱：'+$('input[name="user_email"]').val()+'</span>';

                $('#msg_confirm').html(msg_entered);
                var formData = $(this).serialize();
                $( "#dialog-confirm" ).dialog({
                    resizable: false,
                    height: "auto",
                    width: 1000,
                    modal: true,
                    buttons: {
                        "确认提交": function() {
                            $('#submitted_dialog').ajaxStart(function(){
                                console.log('start');
                            });
                            $.ajax({
                                type:'POST',
                                url:'http://localhost/yxIMS_PHP_API/user_register_login/user_register.php',
                                data:formData,
                                success:function(responseData){
                                    if (responseData.reStatus){
                                        var html='';
                                        $.each(responseData.successMsg,function(index,item){
                                            html+='<p>'+item+'</p>';
                                        });
                                        $('#submitted_dialog').html(html);
                                        $('#submitted_dialog').dialog({
                                            modal:true,
                                            buttons:{
                                                '确定':function(){
                                                    window.location.href='login.html';
                                                    $(this).dialog("close");
                                                }
                                            }
                                        });
                                        $('#reg-submit-btn').button('option','disabled',true);

                                    }else{
                                        var html = '';
                                        $.each(responseData.errorMsg,function(index,item){
                                            html+='<p>'+item+'</p>';
                                        });
                                        console.log(html);
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
                                },
                                dataType:'json'
                            });
                            $( this ).dialog( "close" );
                        },
                        "取消": function() {
                            $( this ).dialog( "close" );
                        }
                    }
                });
            });
        }else{
            $('#reg-submit-btn').button('option','disabled',true);
        }
    }

});