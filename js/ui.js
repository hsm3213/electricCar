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
    if($('.fixed_tab').length > 0){
        fixed_tab();
    }
    
    //accordion
    $('.accordion_wrap .ctrl').on('click',function(){
        $(this).toggleClass('on');
    });
    
    //popup close
    $('.alert_wrap .btn_close').on('click',function(){
        $(this).closest('.alert_wrap').hide();
        $('.dimmed').hide();
    });

    //tab
    $('.tab_area .tab_list li a').on('click',function(e){
        e.preventDefault();
        $(this).parent('li').addClass('on').siblings('li').removeClass('on');
    });
});


function favorite_slide(){
	const swiper_favorite = new Swiper(".favorite_area", {
		slidesPerView: 'auto',
		spaceBetween: 10,
	});
}
function visual_slide(){
	const swiper_visual = new Swiper(".visual_slide", {
		slidesPerView: 'auto',
		spaceBetween: 13,
	});
}
function side_open(){
	const ic_menu = document.querySelector('.main_header .ic_menu');
	const side_menu = document.querySelector('#side_menu');
	const ic_close = document.querySelector('#side_menu .ic_close');
	const side_setting = document.querySelector('#side_menu .header .setting');
	const app_setting = document.querySelector('.app_setting');
	const setting_back = document.querySelector('.app_setting .ic_back');
	ic_menu.addEventListener('click', function(){
		side_menu.style.right = 0
	});
	ic_close.addEventListener('click', function(){
		side_menu.style.right = "100%"
	});
	side_setting.addEventListener('click', function(){
		app_setting.style.right = 0
	});
	setting_back.addEventListener('click', function(){
		app_setting.style.right = "100%"
	});
}
function darkmode(){
	const checkbox = document.querySelector('.app_setting .darkmode');
	checkbox.addEventListener('click', function(e) {
		if (e.target.checked) {
			document.documentElement.setAttribute('color-theme', 'dark');
		} else {
			document.documentElement.setAttribute('color-theme', 'light');
		}
	});
}
function popup_open(obj){
	const obj_data = obj.attr('data-popup');
	const popup_id = $('#' + obj_data);
	popup_id.addClass('open');
	dim_open();
}
function dim_open(){
	let open_popup = $('[class^="layer_popup"].open').length;
	if(open_popup <= 1){
		$('.layer_dim').show();
	}
}
function popup_close(obj){
	let open_popup = $('[class^="layer_popup"].open').length;
	obj.closest('[class^="layer_popup"]').removeClass('open');
	if(open_popup <= 1){
		$('.layer_dim').hide();
	}
}

//tab fixed
function fixed_tab(){
    var tabPos = $('.tab_area.fixed_tab').offset().top;
    $(window).scroll(function(){
        var myPos = $(document).scrollTop();
        if(tabPos-60 <= myPos){
            $('.tab_area.fixed_tab').addClass('fixed');
        } else if(tabPos >= myPos){
            $('.tab_area.fixed_tab').removeClass('fixed');
        }
    });
}   