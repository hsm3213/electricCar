//select
(function ($, window) {  
    // project default object
    var common = {
        Swiper: null,
        el: {
            doc: $(document),
            win: $(window),
            body: null,
        },
        selector: {
            body: "body",
            html: "html",
            bh: "body, html",
            header: "header",
            footer: "footer",
        },
        setting: {
            device: null,
            browser: null,
        },
        handler: {
            ready: function () {
                common.el.body = $(common.selector.body);
                common.Swiper = window.Swiper;

                common.el.doc.find(common.selector.swiperWrap).each(function (idx, el) {
                    mySwiper.init(el);
                });

                common.el.win.trigger("scroll");
            },
            load: function () {},
        },
    };

    // window ready event
    // $(document).on('DOMContentLoaded', common.handler.ready);
    common.el.doc.ready(common.handler.ready);

    // window load event
    // string: single quotation
    common.el.win.on("load", common.handler.load);
    // common.el.win.load(common.handler.load);

    // project util object
    var utils = {
        scrollDisabled: function () {
            var body = common.el.body;
                body.css({
                overflow: "hidden",
                position: "fixed",
                height: "100%",
                width: "100%",
                marginTop:
                parseInt(body.css("margin-top")) || -common.el.win.scrollTop(),
            });
        },
        scrollEnabled: function () {
            var body = common.el.body;
            var count = 0;
            body.find(".layPop").each(function () {
                var $this = $(this);
                if ($this.is(":visible")) {
                    count++;
                }
            });
            if (count > 0) {
                return false;
            }
            var scrollTop = -parseInt(body.css("margin-top"));
            body.css({
                overflow: "",
                position: "",
                height: "",
                width: "",
                marginTop: "",
            });
            common.el.win.scrollTop(scrollTop);
        },
    };
    
    
    // mvJs interface
    var mvJs = {
        utils: {
            //window 스크롤 비활성화
            scrollDisabled: utils.scrollDisabled,
            //window 스크롤 활성화
            scrollEnabled: utils.scrollEnabled,
        }
    };

    window.mvJs = mvJs;
})(window.jQuery, window);

$(function(){
    //accordion
    $('.accordion_wrap .ctrl').on('click',function(){
        $(this).toggleClass('on');
    });
});
