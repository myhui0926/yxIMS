$(function(){

    //存储需要提交到服务器的数据：
    var submitDataSave = [];
    var saveMark = 0;//用于标记存储的每一项数据

    //预设表单提交按钮状态:
    var add_ads_btn = $('#add-ads-to-list');
    add_ads_btn.button({
        disabled:true
    });

    //预设数据提交按钮状态：
    var submitAdsBtn = $('#submit-ads-btn');
    submitAdsBtn.button({
        disabled:true
    });
    submitAdsBtn.click(function(){
        submitAds(submitDataSave);
        //改变footer位置：
        changePos();
    });

    //预设各表单值检查状态
    var check_status = {
        source_type:false,
        ads_platform:false,
        ads_name:false,
        ads_total:false,
        ads_price:false,
        price_unit:false
    };

    //初始化资源类型选择则列表:
    $('#ads-source-type').selectmenu({
        width:150,
        change:function(){
            check_status.source_type = true;
            ifCheckPass();
            $('#ads-platform option').remove();
            $('#ads-platform').append('<option selected disabled>loading...</option>');
            $('#ads-platform').selectmenu("refresh");
            $.ajax({
                url:ajaxHost+'yxIMS_PHP_API/source_manage/search_ads.php',
                type:'GET',
                data:{'st_id':parseInt($(this).val())},
                dataType:'json',
                success:function(response){
                    if (response.searchStatus){
                        $('#ads-platform option').remove();
                        $('#ads-platform').append('<option selected disabled>选择广告平台</option>');
                        $.each(response.successData,function(index,item){
                            $('#ads-platform').append('<option value="'+item.platform_id+'">'+item.platform+'</option>');
                        });
                        $('#ads-platform').selectmenu({disabled:false});
                        $('#ads-platform').selectmenu("refresh");
                    }
                }
            });
        }
    });

    //初始化平台选择列表：
    $('#ads-platform').selectmenu({
        width:200,
        change:function(){
            check_status.ads_platform = true;
            ifCheckPass();
        },
        disabled:true
    });

    //初始化价格单位选择列表：
    $('#price_unit').selectmenu({
        width:153,
        change:function(){
            check_status.price_unit = true;
            ifCheckPass();
        },
        disabled:false
    });

    //用户输入后执行检查
    $('#add-ads input').keyup(function(){
        CheckInput($(this));
        ifCheckPass();
    });

    //输入框失去焦点后执行检查：
    $('#add-ads input').blur(function(){
        CheckInput($(this));
        ifCheckPass();
    });

    //添加数据到列表中：
    $('#add-ads').submit(function(event){
        event.preventDefault();
        $('#ads_list').css('display','table');
        $('#ads-submit-box').css('display','block');
        $('#ads-timing-msg').remove();
        var formData = $(this).serializeArray();
        var ads_list_body = $('#ads_list tbody');
        var tbody_tr = $('<tr data-row-mark="'+saveMark+'"></tr>');
        ads_list_body.append(tbody_tr);
        var dataSave = {
            source_type:0,
            ads_platform:0,
            ads_name:'',
            ads_total:1,
            ads_price:0,
            price_unit:'',
            ads_remark:'',
            save_mark:saveMark
        };
        //遍历序列化数据，并存储和展示：
        $.each(formData,function(index,item){
            switch(item.name){
                case 'source_type':
                    var st_value = parseInt(item.value);
                    var st_name = $('#ads-source-type option[value="'+item.value+'"]').text();
                    dataSave.source_type = st_value;
                    tbody_tr.append('<td>'+st_name+'</td>');
                    break;
                case 'ads_platform':
                    var ap_value = parseInt(item.value);
                    var ap_name = $('#ads-platform option[value="'+item.value+'"]').text();
                    dataSave.ads_platform = ap_value;
                    tbody_tr.append('<td>'+ap_name+'</td>');
                    break;
                case 'ads_name':
                    dataSave.ads_name = item.value;
                    tbody_tr.append('<td>'+item.value+'</td>');
                    break;
                case 'ads_total':
                    var at_value = parseInt(item.value);
                    dataSave.ads_total = at_value;
                    tbody_tr.append('<td>'+at_value+'</td>');
                    break;
                case 'ads_price':
                    var ap_value = parseInt(item.value);
                    dataSave.ads_price = ap_value;
                    tbody_tr.append('<td>'+ap_value+'</td>');
                    break;
                case 'price_unit':
                    dataSave.price_unit = item.value;
                    tbody_tr.append('<td>'+item.value+'</td>');
                    break;
                case 'ads_remark':
                    dataSave.ads_remark = item.value;
                    break;
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
        submitAdsBtn.button('option','disabled',false);

        //改变footer位置：
        changePos();

    });

    //用于提交数据
    function submitAds(submitData){
        console.log(JSON.stringify(submitData));
        $.ajax({
            url:ajaxHost+'yxIMS_PHP_API/source_manage/insert_ads.php',
            data:JSON.stringify(submitData),
            contentType:'application/json;charset=UTF-8',
            type:'POST',
            dataType:'json',
            success:function(responseData){
                if (responseData.addStatus){
                    $('#submitted_dialog').empty().append('<p><span class="ui-icon ui-icon-check"></span>添加成功</p>');
                    $.each(responseData.successMsg,function(index,item){
                        $('#submitted_dialog').append('<p>'+item+'</p>');
                    });
                    $('#submitted_dialog').dialog({
                        modal:true,
                        buttons:{
                            "确定":function(){
                                $(this).dialog('close');
                                submitDataSave = [];//清空数据存储数组
                                $('#ads_list tbody').html('<tr id="ads-timing-msg" class="timing-msg"><td colspan="5">还没有资源加入列表</td></tr>');//清空列表
                                clearForm($('#add-ads'));//重置表单
                                submitAdsBtn.button('option','disabled',true);//更新提交按钮状态
                            }
                        }
                    });
                }else{
                    $('#submitted_dialog').empty().append('<p><span class="ui-icon ui-icon-alert"></span>添加失败</p>');
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
        $('#ads_list tbody tr[data-row-mark="'+saveMark+'"]').remove();//移除DOM元素
        var deleteIndex = -1;
        $.each(submitDataSave,function(index,item){//清楚存储在数组中的数据
            if (item.save_mark===saveMark){
                deleteIndex = index;
            }
        });
        submitDataSave.splice(deleteIndex,1);
        console.log(submitDataSave);
        if (submitDataSave.length===0){
            $('#ads_list tbody').append('<tr id="ads-timing-msg"><td colspan="5">还没有资源加入列表</td></tr>');
            //更新提交按钮状态：
            submitAdsBtn.button('option','disabled',true);
        }
    }

    //用于加入列表后重置表单
    function clearForm(theForm){
        theForm.find('input[type!="submit"]').val('');
        check_status = {
            source_type:true,
            ads_platform:true,
            ads_name:false,
            ads_total:false,
            ads_price:false,
            price_unit:true
        };
        add_ads_btn.button('option','disabled',true);
    }

    //用于检查输入数据是否合法，并更新检查状态：
    function CheckInput(thisInput){
        if (thisInput.val().length!=0){
            switch(thisInput.attr('name')){
                case 'ads_name':
                    check_status.ads_name = true;
                    break;
                case 'ads_total':
                    check_status.ads_total = true;
                    break;
                case 'ads_price':
                    check_status.ads_price = true;
                    break;
                default:
                    break;
            }
        }
    }

    //所有检查都通过之后的操作：
    function ifCheckPass(){
        var allPass = true;
        for (var x in check_status){
            if (check_status[x]===false){
                allPass = false;
                break;
            }
        }
        if (allPass){
            add_ads_btn.button('option','disabled',false);
        }
    }
});