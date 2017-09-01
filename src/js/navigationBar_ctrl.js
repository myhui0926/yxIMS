(function(){
var allMediaList = [
    {
        mediaType:'大屏网-市内大屏LED',
        mediaList:[
            '圆通大桥',
            '小西门龟背立交桥',
            '西园路电子广场',
            '七天酒店',
            '华侨大厦',
            '同德广场南',
            '同德广场北',
            '新南站',
            '螺蛳湾中心',
            '中汇商业广场',
            '小花园苏宁电器',
            '大理下关收费站LED'
        ]
    },
    {
        mediaType:'大屏网-跨街天桥LED',
        mediaList:[
            '学府路',
            '东风西路',
            '一二一大街',
            '白塔路',
            '环城南路',
            '龙泉路家乐福天桥',
            '龙泉路旅游学校',
            '星耀体育城',
            '香槟小镇',
            '官渡古镇'
        ]
    },
    {
        mediaType:'围城',
        mediaList:[
            '候车亭',
            '站名牌',
            '站名牌插条',
            '灯箱',
            '梯内广告',
            '梯外广告',
            '空港快线'
        ]
    },
    {
        mediaType:'电台媒体',
        mediaList:[
            'FM97云南音悦台',
            'FM99玩去电台',
            'FM100知道分子广播',
            'FM101.7财经广播',
            'FM105.8云南新闻广播'
        ]
    },
    {
        mediaType:'网络媒体',
        mediaList:[
            '太平洋汽车网',
            '腾讯汽车',
            '腾讯房产',
            '一点资讯APP',
            '网易房产',
            '网易新闻客户端'
        ]
    },
    {
        mediaType:'加油道',
        mediaList:[
            'A+（市区高级站）',
            'A（市区标准站）',
            'B（郊县基本站）'
        ]
    },
    {
        mediaType:'云围城',
        mediaList:[
            '200屏联播'
        ]
    }
];

var allAdPrice = [
    {
        mediaType:'户外媒体',
        mediaList:[
            '大屏网',
            '加油道',
            '围城',
            '云围城'
        ]
    },
    {
        mediaType:'电台媒体',
        mediaList:[
            'FM97云南音悦台',
            'FM99玩去电台',
            'FM100知道分子广播',
            'FM101.7财经广播',
            'FM105.8云南新闻广播'
        ]
    },
    {
        mediaType:'网络媒体',
        mediaList:[
            '太平洋汽车网',
            '腾讯汽车',
            '腾讯房产',
            '一点资讯APP',
            '网易房产',
            '网易新闻客户端'
        ]
    }
];

var globalLeftNav_structure = [
    {
        l1_menuText:'查看库存',
        l2_menu:[
            {
                l2_menuText:'户外媒体',
                l3_menu:[
                    {
                        l3_menuText:'大屏网-市内大屏LED',
                        l4_menu:[
                            {l4_menuText:'圆通大桥'},
                            {l4_menuText:'小西门龟背立交桥'},
                            {l4_menuText:'西园路电子广场'},
                            {l4_menuText:'七天酒店'},
                            {l4_menuText:'华侨大厦'},
                            {l4_menuText:'同德广场南'},
                            {l4_menuText:'同德广场北'},
                            {l4_menuText:'新南站'},
                            {l4_menuText:'螺蛳湾中心'},
                            {l4_menuText:'中汇商业广场'},
                            {l4_menuText:'小花园苏宁电器'},
                            {l4_menuText:'大理下关收费站LED'}
                        ]
                    },
                    {
                        l3_menuText:'大屏网-跨街天桥LED',
                        l4_menu:[
                            {l4_menuText:'学府路'},
                            {l4_menuText:'东风西路'},
                            {l4_menuText:'一二一大街'},
                            {l4_menuText:'白塔路'},
                            {l4_menuText:'环城南路'},
                            {l4_menuText:'龙泉路家乐福天桥'},
                            {l4_menuText:'龙泉路旅游学校'},
                            {l4_menuText:'星耀体育城'},
                            {l4_menuText:'香槟小镇'},
                            {l4_menuText:'官渡古镇'}
                        ]
                    },
                    {
                        l3_menuText:'围城',
                        l4_menu:[
                            {l4_menuText:'候车亭'},
                            {l4_menuText:'站名牌'},
                            {l4_menuText:'站名牌插条'},
                            {l4_menuText:'灯箱'},
                            {l4_menuText:'梯内广告'},
                            {l4_menuText:'梯外广告'},
                            {l4_menuText:'空港快线'}
                        ]
                    },
                    {
                        l3_menuText:'云围城',
                        l4_menu:[
                            {l4_menuText:'200屏联播'}
                        ]
                    },
                    {
                        l3_menuText:'加油道',
                        l4_menu:[
                            {l4_menuText:'A+（市区高级站）'},
                            {l4_menuText:'A（市区标准站）'},
                            {l4_menuText:'B（郊县基本站）'}
                        ]
                    }
                ]
            },
            {
                l2_menuText:'电台媒体',
                l3_menu:[
                    {l3_menuText:'FM97云南音悦台'},
                    {l3_menuText:'FM99玩去电台'},
                    {l3_menuText:'FM100知道分子广播'},
                    {l3_menuText:'FM101.7财经广播'},
                    {l3_menuText:'FM105.8云南新闻广播'}
                ]
            },
            {
                l2_menuText:'网络媒体',
                l3_menu:[
                    {l3_menuText:'太平洋汽车网'},
                    {l3_menuText:'腾讯汽车'},
                    {l3_menuText:'腾讯房产'},
                    {l3_menuText:'一点资讯APP'},
                    {l3_menuText:'网易房产'},
                    {l3_menuText:'网易新闻客户端'}
                ]
            }
        ]
    },
    {
        l1_menuText:'查看刊例',
        l2_menu:[
            {
                l2_menuText:'户外媒体',
                l3_menu:[
                    {l3_menuText:'大屏网'},
                    {l3_menuText:'加油道'},
                    {l3_menuText:'围城'},
                    {l3_menuText:'云围城'}
                ]
            },
            {
                l2_menuText:'电台媒体',
                l3_menu:[
                    {l3_menuText:'FM97云南音悦台'},
                    {l3_menuText:'FM99玩去电台'},
                    {l3_menuText:'FM100知道分子广播'},
                    {l3_menuText:'FM101.7财经广播'},
                    {l3_menuText:'FM105.8云南新闻广播'}
                ]
            },
            {
                l2_menuText:'网络媒体',
                l3_menu:[
                    {l3_menuText:'太平洋汽车网'},
                    {l3_menuText:'腾讯汽车'},
                    {l3_menuText:'腾讯房产'},
                    {l3_menuText:'一点资讯APP'},
                    {l3_menuText:'网易房产'},
                    {l3_menuText:'网易新闻客户端'}
                ]
            }
        ]
    },
    {
        l1_menuText:'单据管理',
        l2_menu:[
            {l2_menuText:'单据录入'},
            {l2_menuText:'查看单据'}
        ]
    }
]

$(function(){
    //生成顶部当航菜单浮层
    var navSheetWrapper = $('#navSheetWrapper');
    function createMediaList(listType,listName){
        var navInnerWrapper = $('<div class="nav-inner-wrapper"></div>');
        navInnerWrapper.addClass(listName);
        navSheetWrapper.append(navInnerWrapper);
        $.each(listType,function(index,item){
            var mediaList='';
            $.each(item.mediaList,function(ml_index,ml_item){
                mediaList+=('<li><a href="#">'+ml_item+'</a></li>');
            });
            navInnerWrapper.append('<div class="wrapper-list">' +
                '<h3>'+item.mediaType+'</h3>' +
                '<ul class="media-list">'+mediaList+'</ul>'+
                '</div>');
        });
    }
    createMediaList(allMediaList,'adSourceWrapper');
    createMediaList(allAdPrice,'adPrice');

    $('#topNav').on('mouseenter','li',function(){
        switch($(this).data('menuname')){
            case 'adSource':
                $('.nav-inner-wrapper').removeClass('niw-active');
                $('.adSourceWrapper').addClass('niw-active');
                break;
            case 'adPrice':
                $('.nav-inner-wrapper').removeClass('niw-active');
                $('.adPrice').addClass('niw-active');
                break;
            case 'paperManage':
                $('.nav-inner-wrapper').removeClass('niw-active');
                $('.paperManage').addClass('niw-active');
                break;
            default:
                $('.nav-inner-wrapper').removeClass('niw-active');
                break;
        }
    });
    $('#topNav').on('mouseleave','li',function(){
        $('.nav-inner-wrapper').removeClass('niw-active');
    });

    $('.nav-inner-wrapper').on('mouseenter',function(){
        $(this).addClass('niw-active');
    });

    $('.nav-inner-wrapper').on('mouseleave',function(){
        $(this).removeClass('niw-active');
    });

    //生成侧边导航栏-多级菜单
    var globalLeftNavBox = $('#globalLeftNavBox');
    var globalLeftNav = $('<ul id="globalLeftNav" class="left-nav ln-level1"></ul>');
    globalLeftNav.appendTo(globalLeftNavBox);
    $.each(globalLeftNav_structure,function(index,item){
        if (item.l2_menu){
            var l2_menuText='';
            $.each(item.l2_menu,function(l2_index,l2_item){
                if (l2_item.l3_menu){
                    var l3_menuText='';
                    $.each(l2_item.l3_menu,function(l3_index,l3_item){
                        if (l3_item.l4_menu){
                            var l4_menuText='';
                            $.each(l3_item.l4_menu,function(l4_index,l4_item){
                                l4_menuText += '<li><div><span class="ui-icon ui-icon-search"></span>'+l4_item.l4_menuText+'</div></li>';
                            });
                            l3_menuText += '<li><div>'+l3_item.l3_menuText+'</div><ul class="ln-level4">'+l4_menuText+'</ul></li>';
                        }else{
                            l3_menuText += '<li><div><span class="ui-icon ui-icon-search"></span>'+l3_item.l3_menuText+'</div></li>';
                        }
                    });
                    l2_menuText+='<li><div>'+l2_item.l2_menuText+'</div><ul class="ln-level3">'+l3_menuText+'</ul></li>';
                }else{
                    l2_menuText+='<li><div><span class="ui-icon ui-icon-search"></span>'+l2_item.l2_menuText+'</div></li>';
                }
            });
            globalLeftNav.append('<li>' +
                '<div>'+ item.l1_menuText +'</div>' +
                '<ul class="ln-level2">'+l2_menuText+'</ul>' +
                '</li>');
        }

    });
    globalLeftNav.menu(
        {
            position: { my: "left top", at: "right top+5" }
        }
    );
    globalLeftNav.prepend('<h3>全站功能导航</h3>');
    globalLeftNav.append(
        '<div class="other-enter-box">' +
        '<div class="enter"><span class="ui-icon ui-icon-extlink my-icon-option"></span><a href="#">业务员入口</a></div>' +
        '<div class="enter"><span class="ui-icon ui-icon-extlink my-icon-option"></span><a href="#">媒介入口</a></div>' +
        '<div class="enter"><span class="ui-icon ui-icon-extlink my-icon-option"></span><a href="#">问题反馈</a></div>' +
        '</div>' +
        '<div class="other-info">' +
        '<p><span class="ui-icon ui-icon-person my-icon-option"></span>开发人员：宋朝辉</p>' +
        '<p><span class="ui-icon ui-icon-flag my-icon-option"></span>优选广告汽车部 网络技术组</p>'+
        '<p><span class="ui-icon ui-icon-mail-closed my-icon-option"></span>Email:chaohuisong@qq.com</p>'+
        '</div>'
    );

    $('#leftNavSwitcher').on('mouseenter',function(){
        globalLeftNavBox.addClass('slideOut');
    });
    $('#leftNavSwitcher').on('mouseleave',function(){
        globalLeftNavBox.removeClass('slideOut');
        globalLeftNav.menu("collapseAll", null, true);
    });
    globalLeftNavBox.on('mouseenter',function(){
        $(this).addClass('slideOut');
    });
    globalLeftNavBox.on('mouseleave',function(){
        $(this).removeClass('slideOut');
        globalLeftNav.menu("collapseAll", null, true);
    });
    globalLeftNav.find('h3,.other-enter-box,.other-info').on('mouseenter',function(){
        globalLeftNav.menu("collapseAll",null,true);
    });
});
})();