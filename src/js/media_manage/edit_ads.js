$(function(){
    $('#ads-source-type-2').selectmenu({
        width:180,
        change:function(){
            searchPlatform2($(this).val());
        }
    });

    $('#ads-platform-2').selectmenu({
        width:200,
        disabled:true,
        change:function(){
            searchAds($(this).val());
        }
    });

    function searchPlatform2(inputData){
        $.ajax({
            url:ajaxHost+'yxIMS_PHP_API/source_manage/search_platform.php',
            type:'GET',
            data:{source_type:parseInt(inputData)},
            dataType:'json',
            beforeSend:function(){
                $('#ads-platform-2').empty().append('<option selected disabled>loading...</option>');
                $('#ads-platform-2').selectmenu('refresh');
            },
            success:function(responseData){
                if (responseData.searchStatus){
                    $('#ads-platform-2').empty().append('<option selected disabled>选择则广告平台</option>');
                    $.each(responseData.successData,function(index,item){
                        $('#ads-platform-2').append('<option value="'+item.platform_id+'">'+item.platform+'</option>');
                    });
                    $('#ads-platform-2').selectmenu({disabled:false});
                    $('#ads-platform-2').selectmenu('refresh');
                }
            }
        });
    }

    function searchAds(inputValue){
        $.ajax({
            url:ajaxHost+"yxIMS_PHP_API/source_manage/search_all_ads.php",
            type:'GET',
            data:{platform_id:parseInt(inputValue)},
            dataType:'json',
            beforeSend:function(){
                $('#edit-ads-list').css('display','table');
                var el_msg = $('<tr><td colspan="7">正在加载...</td></tr>');
                $('#edit-ads-list tbody').empty().append(el_msg);
            },
            success:function(responseData){
                if (responseData.searchStatus){
                    createList(responseData.successData);
                }else{
                    $('#edit-ads-list tbody').empty();
                    $.each(responseData.errorMsg,function(index,item){
                        $('#edit-ads-list tbody').append('<tr><td colspan="7">'+item+'</td></tr>')
                    });
                }
            }
        });
    }

    function createList(data){
        $('#edit-ads-list tbody').empty();
        $.each(data,function(index,item){
            var tbody_tr = $('<tr id="ads-row-'+item.ads_id+'"></tr>');
            $('#edit-ads-list tbody').append(tbody_tr);
            tbody_tr.append(
                '<td class="ads_id">'+item.ads_id+'</td>' +
                '<td class="ads_name">'+item.ads_name+'</td>'+
                '<td class="ads_total">'+item.ads_total+'</td>'+
                '<td class="ads_price">'+item.ads_price+'</td>'+
                '<td class="price_unit">'+item.price_unit+'</td>'+
                '<td class="remark">'+item.remark+'</td>');
            var ads_rowId = '#ads-row-'+item.ads_id;
            var operating_delete = $('<a class="plat_btn" href="#"><span class="ui-icon ui-icon-trash"></span>删除</a>');
            var operating_edit = $('<a class="plat_btn" href="#"><span class="ui-icon ui-icon-pencil"></span>编辑</a>');
            var operating_td = $('<td class="ope_tool"></td>');
            tbody_tr.append(operating_td);
            operating_td.append(operating_edit).append(operating_delete);

            operating_edit.click(function(event){
                event.preventDefault();
                editAds(ads_rowId,item);
            });

            operating_delete.click(function(event){
                event.preventDefault();
                deleteAdsRow(ads_rowId,item);
            });
        });
    }

    function editAds(rowId,dataObj){
        var thisRow = $(rowId);
        thisRow.css('display','none');
        var editRow = $('<tr></tr>');
        editRow.insertBefore(thisRow);
        editRow.append('<td>'+dataObj.ads_id+'</td>');
        editRow.append('<td><input name="ads_name" value="'+dataObj.ads_name+'"></td>');
        editRow.append('<td><input type="number" name="ads_total" value="'+parseInt(dataObj.ads_total)+'"></td>');
        editRow.append('<td><input type="number" name="ads_price" value="'+parseInt(dataObj.ads_price)+'"></td>');
        editRow.append('<td><select name="price_unit">' +
            '<option disabled selected>请选择价格单位</option>' +
            '<option value="天">天</option>'+
            '<option value="月">月</option>'+
            '<option value="年">年</option>'+
            '</select></td>');
        editRow.append('<td><input name="remark" value="'+dataObj.remark+'"></td>');
        var editOpe = $('<td></td>');
        var confirm_btn = $('<button>确认</button>');
        var cancel_btn = $('<button>取消</button>');
        editOpe.append(confirm_btn).append(cancel_btn).appendTo(editRow);

        //初始化按钮状态并绑定事件
        confirm_btn.button({
            disabled:true
        });
        cancel_btn.button();
        confirm_btn.click(function(){
            submitRowdata(jsonObj,thisRow,editRow);
        });
        cancel_btn.click(function(){
            console.log('running!');
            editRow.remove();
            thisRow.css('display','table-row');
        });

        var jsonObj = {//存储修改之后的数据
            ads_id:parseInt(dataObj.ads_id),
            ads_name:dataObj.ads_name,
            ads_total:parseInt(dataObj.ads_total),
            ads_price:parseInt(dataObj.ads_price),
            price_unit:dataObj.price_unit,
            remark:dataObj.remark
        }

        var changeStatus = [false,false,false,false,false];

        //获取新的数据：
        editRow.find('input,select').change(function(){
            switch($(this).attr('name')){
                case 'ads_name':
                    if ($(this).val()===dataObj.ads_name){
                        jsonObj.ads_name = dataObj.ads_name;
                        changeStatus[0] = false;
                    }else{
                        jsonObj.ads_name = $(this).val();
                        changeStatus[0] = true;
                    }
                    break;
                case 'ads_total':
                    if (parseInt($(this).val())===parseInt(dataObj.ads_total)){
                        jsonObj.ads_total = parseInt(dataObj.ads_total);
                        changeStatus[1] = false;
                    }else{
                        jsonObj.ads_total = parseInt($(this).val());
                        changeStatus[1] = true;
                    }
                    break;
                case 'ads_price':
                    if (parseInt($(this).val())===parseInt(dataObj.ads_price)){
                        jsonObj.ads_price = parseInt(dataObj.ads_price);
                        changeStatus[2] = false;
                    }else{
                        jsonObj.ads_price = parseInt($(this).val());
                        changeStatus[2] = true;
                    }
                    break;
                case 'price_unit':
                    if ($(this).val()===dataObj.price_unit){
                        jsonObj.price_unit = dataObj.price_unit;
                        changeStatus[3] = false;
                    }else{
                        jsonObj.price_unit = $(this).val();
                        changeStatus[3] = true;
                    }
                    break;
                case 'remark':
                    if ($(this).val()===dataObj.remark){
                        jsonObj.remark = dataObj.remark;
                        changeStatus[4] = false;
                    }else{
                        jsonObj.remark = $(this).val();
                        changeStatus[4] = true;
                    }
                    break;
            }
            watchChange(changeStatus,confirm_btn);
        });
    }

    function watchChange(changeStatus,cBtn){
        var checkResult = false;
        $.each(changeStatus,function(index,item){
            if (item){
                checkResult = true;
            }
        });

        if (checkResult){
            cBtn.button({
                disabled:false
            });
        }else{
            cBtn.button({
                disabled:true
            });
        }
    }

    function submitRowdata(jsonObj,thisRow,editRow){
        $('#submitted_dialog').empty().append('<p><span class="ui-icon ui-icon-alert"></span>你确认要修改这个广告资源吗？</p>');
        $('#submitted_dialog').dialog({
            modal:true,
            buttons:{
                "确认修改":function(){
                    var jsonData = JSON.stringify(jsonObj);
                    $.ajax({
                        url:ajaxHost+'yxIMS_PHP_API/source_manage/change_ads.php',
                        type:'POST',
                        contentType:'application/json;charset=UTF-8',
                        data:jsonData,
                        dataType:'json',
                        success:function(response){
                            if (response.updateStatus){
                                $('#submitted_dialog').empty();
                                $.each(response.successData,function(index,item){
                                    $('#submitted_dialog').append('<p><span class="ui-icon ui-icon-check"></span>'+item+'</p>');
                                });
                                $('#submitted_dialog').dialog({
                                    modal:true,
                                    buttons:{
                                        "确定":function(){
                                            thisRow.children('.ads_name').text(jsonObj.ads_name);
                                            thisRow.children('.ads_total').text(jsonObj.ads_total);
                                            thisRow.children('.ads_price').text(jsonObj.ads_price);
                                            thisRow.children('.price_unit').text(jsonObj.price_unit);
                                            thisRow.children('.remark').text(jsonObj.remark);
                                            thisRow.css('display','table-row');
                                            editRow.remove();
                                            $(this).dialog('close');
                                        }
                                    }
                                })
                            }
                        }
                    });
                    $(this).dialog('close');
                },
                "取消":function(){
                    $(this).dialog('close');
                }
            }
        });
    }

    function deleteAdsRow(rowId,dataObj){
        $('#submitted_dialog').empty().append('<h5><span class="ui-icon ui-icon-alert"></span>你确认要删除这个广告资源吗？</h5><p>你即将删除的资源名称：<strong>'+dataObj.ads_name+'</strong></p>');
        $('#submitted_dialog').dialog({
            modal:true,
            width:500,
            buttons:{
                "确认删除":function(){
                    $.ajax({
                        url:ajaxHost+'yxIMS_PHP_API/source_manage/delete_ads.php',
                        type:'GET',
                        data:{ads_id:dataObj.ads_id},
                        dataType:'json',
                        success:function(response){
                            if (response.searchStatus){
                                $('#submitted_dialog').empty();
                                $.each(response.successMsg,function(index,item){
                                    $('#submitted_dialog').append('<p>'+item+'</p>').dialog({
                                        modal:true,
                                        buttons:{
                                            '确定':function(){
                                                $(rowId).remove();
                                                $(this).dialog('close');
                                            }
                                        }
                                    });
                                });
                            }
                        }
                    });
                    $(this).dialog('close');
                },
                "取消":function(){
                    $(this).dialog('close');
                }
            }
        })
    }
});