$(function(){

    //预设手风琴效果:
    $( ".accordion" ).accordion({
        heightStyle: "content"
    });

    //存储需要提交到服务器的数据：
    var submitDataSave = [];
    var saveMark = 0;//用于标记存储的每一项数据

    //预设表单提交按钮状态:
    var addBtn = $('#add-to-list');
    addBtn.button({
        disabled:true
    });

    //预设数据提交按钮状态：
    var submitBtn = $('#submit-platform-btn');
    submitBtn.button({
        disabled:true
    });
    submitBtn.click(function(){
        submitData(submitDataSave);
    });

    //预设各表单值检查状态
    var check_status = {
        source_type:false,
        plat_name:false,
        other_info:true
    };

    //初始化选择则列表:
    $('#source-type').selectmenu({
        change:function(){
            check_status.source_type = true;
            ifCheckPass();
        }
    });

    //用户输入后执行检查
    $('#add-platform input').keyup(function(){
        CheckInput($(this));
        ifCheckPass();
    });

    //输入框失去焦点后执行检查：
    $('#add-platform input').blur(function(){
        CheckInput($(this));
        ifCheckPass();
    });

    //将输入数据插入列表并进行操作：
    $('#add-platform').submit(function(event){
        event.preventDefault();
        $('#plat_list').css('display','table');
        $('#plat_submit_btn').css('display','block');
        $('#timing_msg').remove();
        var formData = $(this).serializeArray();
        var plat_list_body = $('#plat_list tbody');
        var tbody_tr = $('<tr data-row-mark="'+saveMark+'"></tr>');
        plat_list_body.append(tbody_tr);
        var dataSave = {
            source_type:0,
            plat_name:'',
            other_info:'',
            save_mark:saveMark
        };
        //遍历序列化数据，并存储和展示：
        $.each(formData,function(index,element){
            if(element.name==='source_type'){
                dataSave.source_type = parseInt(element.value);
                switch(parseInt(element.value)){
                    case 1:
                        tbody_tr.append('<td>'+'户外媒体'+'</td>');
                        break;
                    case 2:
                        tbody_tr.append('<td>'+'电台媒体'+'</td>');
                        break;
                    case 3:
                        tbody_tr.append('<td>'+'网络媒体'+'</td>');
                        break;
                }
            }else if(element.name==='plat_name'){
                dataSave.plat_name=element.value;
                tbody_tr.append('<td>'+element.value+'</td>');
            }else if (element.name==='other_info'){
                dataSave.other_info = element.value;
                tbody_tr.append('<td>'+element.value+'</td>');
            }
        });
        //存储在最终提交的数据对象里面：
        submitDataSave.push(dataSave);
        //添加删除操作按钮：
        var operating = $('<a href="#">删除</a>');
        var operating_td = $('<td></td>');
        operating_td.append(operating);
        tbody_tr.append(operating_td);
        operating.click(function(event){
            event.preventDefault();
            deleteRow(dataSave.save_mark);
        });
        //重置表单状态：
        clearForm($(this));

        //更新存储数据标记
        saveMark++;

        //更新提交按钮状态：
        submitBtn.button('option','disabled',false);
    });

    //用于提交数据
    function submitData(submitData){
        $.ajax({
            url:ajaxHost+'yxIMS_PHP_API/source_manage/platform_manage.php',
            data:JSON.stringify(submitData),
            contentType:'application/json;charset=UTF-8',
            type:'POST',
            dataType:'json',
            success:function(responseData){
                if (responseData.addStatus){
                    $('#submitted_dialog').empty().append('<p><span class="ui-icon ui-icon-check"></span>创建成功</p>');
                    $.each(responseData.successMsg,function(index,item){
                        $('#submitted_dialog').append('<p>'+item+'</p>');
                    });
                        $('#submitted_dialog').dialog({
                        modal:true,
                        buttons:{
                            "确定":function(){
                                $(this).dialog('close');
                                submitDataSave = [];//清空数据存储数组
                                $('#plat_list tbody').html('<tr id="timing_msg">' +
                                    '<td colspan="4">还没有资源加入列表</td>' +
                                    '</tr>');//清空列表
                                clearForm($('#add-platform'));//重置表单
                                submitBtn.button('option','disabled',true);//更新提交按钮状态：
                            }
                        }
                    });
                }else{
                    $('#submitted_dialog').empty().append('<p><span class="ui-icon ui-icon-alert"></span>创建失败</p>');
                    $.each(responseData.errorMsg,function(index,item){
                        $('#submitted_dialog').append('<p>'+item+'</p>');
                    });
                    $('#submitted_dialog').dialog({
                        modal:true,
                        buttons:{
                            "重新输入":function(){
                                $(this).dialog('close');
                            }
                        }
                    });
                }

            }
        });
    }

    //用于删除列表中的待提交数据
    function deleteRow(saveMark){
        $('#plat_list tbody tr[data-row-mark="'+saveMark+'"]').remove();//移除DOM元素
        var deleteIndex = -1;
        $.each(submitDataSave,function(index,element){
            if (element.save_mark===saveMark){
                deleteIndex = index;
            }
        });
        submitDataSave.splice(deleteIndex,1);
        if (submitDataSave.length===0){
            $('#plat_list tbody').append('<tr id="timing_msg">' +
                '<td colspan="4">还没有资源加入列表</td>' +
                '</tr>');
            //更新提交按钮状态：
            submitBtn.button('option','disabled',true);
        }
    }

    //用于加入列表后重置表单
    function clearForm(theForm){
        theForm.find('input[type!="submit"]').val('');
        check_status = {
            source_type:true,
            plat_name:false,
            other_info:true
        };
        addBtn.button('option','disabled',true);
    }

    //用于检查输入数据是否合法，并更新检查状态：
    function CheckInput(thisInput){
        if (thisInput.val().length!=0){
            switch(thisInput.attr('name')){
                case 'plat_name':
                    check_status.plat_name = true;
                    break;
                case 'other_info':
                    check_status.other_info = true;
                    break;
                default:
                    break;
            }
        }
    }

    //所有检查都通过之后的操作：
    function ifCheckPass(){
        var allPass = true;
        for (x in check_status){
            if (check_status[x]===false){
                allPass = false;
                break;
            }
        }
        if (allPass){
            addBtn.button('option','disabled',false);
        }
    }
});