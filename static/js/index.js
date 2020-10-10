/*
 * 作者:helang
 * 邮箱:helang.love@qq.com
 * jQuery插件库:http://www.jq22.com/mem395541
 * CSDN博客:https://blog.csdn.net/u013350495
 * 微信公众号:web-7258
 */

/* 搜索 */
var helangSearch = {
    /* 元素集 */
    els: {},
    /* 搜索类型序号 */
    searchIndex: 0,
    /* 火热的搜索列表 */
    hot: {
        /* 颜色 */
        color: ['#ff2c00', '#ff5a00', '#ff8105', '#fd9a15', '#dfad1c', '#6bc211', '#3cc71e', '#3cbe85', '#51b2ef', '#53b0ff'],
        /* 列表 */
        list: [
            'helang.love@qq.com',
            'qq:1846492969',
            'web前端梦之蓝',
            '公众号：web-7258',
            'jQuery插件库',
            'CSDN-IT博客',
            'jQuery之美-CSDN博客专栏',
            'jq22.com',
            'csdn.net',
            'mydarling.gitee.io'
        ]
    },
    /* 初始化 */
    init: function () {
        var _this = this;
        this.els = {
            pickerBtn: $(".picker"),
            pickerList: $(".picker-list"),
            logo: $(".logo"),
            hotList: $(".hot-list"),
            input: $("#search-input"),
            button: $(".search")
        };

        /* 设置热门搜索列表 */
        this.els.hotList.html(function () {
            var str = '';
            $.each(_this.hot.list, function (index, item) {
                str += '<a href="https://www.baidu.com/s?ie=utf8&oe=utf8&tn=98010089_dg&ch=11&wd=' + item + '" target="_blank">'
                    + '<div class="number" style="color: ' + _this.hot.color[index] + '">' + (index + 1) + '</div>'
                    + '<div>' + item + '</div>'
                    + '</a>';
            });
            return str;
        });

        /* 注册事件 */
        /* 搜索类别选择按钮 */
        this.els.pickerBtn.click(function () {
            if (_this.els.pickerList.is(':hidden')) {
                setTimeout(function () {
                    _this.els.pickerList.show();
                }, 100);
            }
        });
        /* 搜索类别选择列表 */
        this.els.pickerList.on("click", ">li", function () {
            _this.els.logo.css("background-image", ('url(img/' + $(this).data("logo") + ')'));
            _this.searchIndex = $(this).index();
            _this.els.pickerBtn.html($(this).html())
        });
        /* 搜索 输入框 点击*/
        this.els.input.click(function () {
            if (!$(this).val()) {
                setTimeout(function () {
                    _this.els.hotList.show();
                }, 100);
            }
        });
        /* 搜索 输入框 输入*/
        this.els.input.on("input", function () {
            if ($(this).val()) {
                _this.els.hotList.hide();
            }
        });
        /* 搜索按钮 */
        this.els.button.click(function () {
            var searchArr = ['百度', '搜狗', '必应', '谷歌'];
            alert(searchArr[_this.searchIndex] + "搜索：" + _this.els.input.val());
        });
        /* 文档 */
        $(document).click(function () {
            _this.els.pickerList.hide();
            _this.els.hotList.hide();
        });
        /* 搜索按钮 */
    }
};