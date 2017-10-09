$(function(){
    $('#select-plat-type').selectmenu({
        width:180,
        change:function(){
            searchPlatform($(this).val());
        }
    });

    function searchPlatform(inputData){
        $.ajax({
            url:ajaxHost+'yxIMS_PHP_API/source_manage/search_platform.php',
            type:'GET',
            data:{source_type:parseInt(inputData)},
            dataType:'json',
            beforeSend:function(){
                var el_msg = $('<tr id="el_msg" class="timing-msg"><td colspan="5">正在加载...</td></tr>');
                $('#edit-list tbody').empty().append(el_msg);
                $('#edit-list').css('display','table');
            },
            success:function(responseData){
                createList(responseData,$('#el_msg'),$('#edit-list tbody'));
            }
        });
    }

    function createList(data,el_msg,el_tbody){
        if (data.searchStatus){
            $.each(data.successData,function(index,item){
                el_msg.remove();
                var source_type_text = '';
                switch(parseInt(item.source_type_id)){//将平台类型键值转化为文本形式：
                    case 1:
                        source_type_text = "户外媒体";
                        break;
                    case 2:
                        source_type_text = "电台媒体";
                        break;
                    case 3:
                        source_type_text = "网络媒体";
                        break;
                }
                var tbody_tr = $('<tr id="row-'+item.platform_id+'"></tr>');
                el_tbody.append(tbody_tr);
                var dataTd = //存储初始创建dom的字符串：
                    '<td>'+item.platform_id+'</td>'+
                    '<td class="stid">'+source_type_text+'</td>'+
                    '<td class="pf_name">'+item.platform+'</td>'+
                    '<td class="pf_oi">'+item.other_info+'</td>';
                tbody_tr.append($(dataTd));
                var row_id = "#row-"+item.platform_id;
                var operating_delete = $('<a class="plat_btn" href="#"><span class="ui-icon ui-icon-trash"></span>删除</a>');
                var operating_edit = $('<a class="plat_btn" href="#"><span class="ui-icon ui-icon-pencil"></span>编辑</a>');
                var operating_td = $('<td class="ope_tool"></td>');
                tbody_tr.append(operating_td);
                operating_td.append(operating_edit).append(operating_delete);

                operating_edit.click(function(event){
                    event.preventDefault();
                    editPlatRow(row_id,item);
                });

                operating_delete.click(function(event){
                    event.preventDefault();
                    deletePlatRow(row_id,item);
                });

            });
        }else{
            el_tbody.empty();
            $.each(data.errorMsg,function(index,item){
                el_tbody.append('<tr><td colspan="5">'+item+'</td></tr>');
            });
        }
    }

    function editPlatRow(rowId,dataObj){
        var thisRow = $(rowId);
        thisRow.css('display','none');
        var editRow = $('<tr id="'+rowId+'-e"></tr>');
        editRow.insertBefore(thisRow);
        editRow.append('<td>'+dataObj.platform_id+'</td>');
        editRow.append('<td><select name="source_type">' +
            '<option disabled selected>请选择平台类型</option>'+
            '<option value="1">户外媒体</option>' +
            '<option value="2">电台媒体</option>'+
            '<option value="3">网络媒体</option>'+
            '</select></td>');
        editRow.append('<td><input name="platform" value="'+dataObj.platform+'"></td>');
        editRow.append('<td><input name="other_info" value="'+dataObj.other_info+'"></td>');
        var editOpe = $('<td></td>');
        var confirm_btn = $('<button>确认</button>');
        var cancel_btn = $('<button>取消</button>');
        editOpe.append(confirm_btn).append(cancel_btn);
        editRow.append(editOpe);

        //初始化按钮状态并绑定事件
        confirm_btn.button({
            disabled:true
        });
        cancel_btn.button();
        confirm_btn.click(function(){
            submitRowData(jsonObj);
        });
        cancel_btn.click(function(){
            editRow.remove();
            thisRow.css('display','table-row');
        });

        var source_type = parseInt(dataObj.source_type_id);//转换值类型

        var jsonObj = {
            platform_id:parseInt(dataObj.platform_id),
            platform:dataObj.platform,
            source_type:source_type,
            other_info:dataObj.other_info
        };

        var changeStatus = [false,false,false];

        //获取新的数据：
        editRow.find('input,select').change(function(){
            switch($(this).attr('name')){
                case 'platform':
                    if ($(this).val()===dataObj.platform){
                        jsonObj.platform = dataObj.platform;
                        changeStatus[0] = false;
                    }else{
                        jsonObj.platform = $(this).val();
                        changeStatus[0] = true;
                    }
                    break;
                case 'source_type':
                    if (parseInt($(this).val()) === source_type){
                        jsonObj.source_type = source_type;
                        changeStatus[1] = false;
                    }else{
                        jsonObj.source_type = parseInt($(this).val());
                        changeStatus[1] = true;
                    }
                    break;
                case 'other_info':
                    if ($(this).val()===dataObj.other_info){
                        jsonObj.other_info = dataObj.other_info;
                        changeStatus[2] = false;
                    }else{
                        jsonObj.other_info = $(this).val();
                        changeStatus[2] = true;
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

    function deletePlatRow(rowId,platform){
        $('#submitted_dialog').empty().append('<h5><span class="ui-icon ui-icon-alert"></span>你确认要删除这个平台吗？</h5><p>删除后该平台下的所有广告资源也将被同时删除，请谨慎操作！</p><p>你即将删除的平台名：<strong>'+platform.platform+'</strong></p>');
        $('#submitted_dialog').dialog({
            modal:true,
            width:500,
            buttons:{
                '确认删除':function(){
                    $.ajax({
                        url:ajaxHost+'yxIMS_PHP_API/source_manage/delete_platform.php',
                        type:'GET',
                        data:{platform_id:platform.platform_id},
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
                                    })
                                });
                            }
                        }
                    });
                    $(this).dialog('close');
                },
                '取消':function(){
                    $(this).dialog('close');
                }
            }
        })
    }

    function submitRowData(jsonObj){
        $('#submitted_dialog').empty().append('<p><span class="ui-icon ui-icon-alert"></span>你确认要修改这个平台吗？</p>');
        $('#submitted_dialog').dialog({
            modal:true,
            buttons:{
                "确认提交":function(){
                    var jsonData = JSON.stringify(jsonObj);
                    $.ajax({
                        url:ajaxHost+'yxIMS_PHP_API/source_manage/change_platform.php',
                        type:'POST',
                        data:jsonData,
                        contentType:'application/json;charset=UTF-8',
                        success:function(response){
                            if(response.updateStatus){
                                $('#submitted_dialog').empty();
                                $('#submitted_dialog').append('<p><span class="ui-icon ui-icon-check"></span>'+response.successData.msg_text+'</p>');
                                $('#submitted_dialog').dialog({
                                        modal:true,
                                        buttons:{
                                            "确定":function(){
                                                searchPlatform(response.successData.source_type_id);
                                                $(this).dialog('close');
                                            }
                                        }
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