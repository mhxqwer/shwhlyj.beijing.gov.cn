searchSelect()//搜索下拉列表框
Nav('#nav')//导航
// SubmitSearchForm()
function searchSelect(){
	$('.searchSelect').each(function(){
		var citeText = $(this).find('ul li').eq(0).text()
		$(this).find('cite').text(citeText);
	})
	$('.searchSelect').find('cite').click(function (event) { 
     //取消事件冒泡 
     event.stopPropagation(); 
    $(this).next('ul').slideToggle(300);
		$(this).parent().toggleClass('active');
		 return false;
   }); 
   $('.searchSelect').find('.ssList > li').click(function(event){
     $this = $(this)
     var liIndex = $('.searchSelect').find('li').index(this);
     var liTxt = $('.searchSelect').find('li').eq(liIndex).text()
     $('.searchSelect').find('cite').text(liTxt);
     $("#sValue").val(liTxt);
   })
	//点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
	 $(document).click(function(event){
		 var _con = $('.divSelect');  // 设置目标区域
		 if(!_con.is(event.target) && _con.has(event.target).length === 0){ 
			//$('#divTop').slideUp('slow');  //滑动消失
			$('.searchSelect').find('.ssList').slideUp(300);     //淡出消失
			$('.searchSelect').removeClass('active')
		 }
	});
	
}
if($('#sValue').length == 0){
    $('.gp-ser').append('<input id="sValue" type="hidden" value="搜本网">')
  }
  
function SubmitSearchForm(){
  
  if ($("#sValue").val() == '搜本网') {
    document.dataForm.method="post";
    var searchValue1 = document.getElementById("keywords").value;
    url1 = "http://whlyj.beijing.gov.cn/so/s?"+"siteCode=1100000211&tab=all&qt="+encodeURIComponent(searchValue1);
    window.open(url1);
    // document.dataForm.action ="http://www.beijing.gov.cn/so/s";
    // document.dataForm.submit();
    // _vaq.push(['trackSiteSearch',document.getElementById('keywords2').value,'search','1']);
    return false
  } 
  if ($("#sValue").val() == '一网通') {
    document.dataForm.method="get";
  var searchValue = document.getElementById("keywords").value;
    url = "http://www.beijing.gov.cn/so/s?qt="+encodeURIComponent(searchValue)+"&sourceCode=1100000233";
  
   window.open(url);
  return false;
  }
}
/*
下拉菜单 
例调用：Nav('#nav');
*/
function Nav(id){
	var oNav = $(id);
	var aLi = oNav.find('li');
	var winWidth = $(window).width();
  if(winWidth > 998){
    aLi.hover(function (){
          $(this).addClass('on');
          $(this).find('dl').addClass('fadeInUpSmall');
    },function (){
          $(this).removeClass('on');
           $(this).find('dl').removeClass('fadeInUpSmall');
    })	
  }else{
    oNav.find('.gp-subNav').each(function(){
      $(this).prev('a').append('<i class="nav_arrow"></i>')
      $(this).prev('a').attr('href','javascript:void(0)')
    })
    oNav.find('li > a').click(function(){
      if($(this).parent('li').hasClass('on')){
      		$(this).next('dl').hide().removeClass('fadeInUpSmall');
      		$(this).parent('li').removeClass('on')
      	}else{
      		$(this).next('dl').show().addClass('fadeInUpSmall');;
      		$(this).parent().siblings().find('dl').hide().removeClass('fadeInUpSmall');
      		$(this).parent().siblings().removeClass('on')
      		$(this).parent('li').addClass('on')
      	}
    })
  }
};


/*
返回顶部
*/
$(window).scroll(function(){
    var docHeight = $(document).height()
    var winHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    if(scrollTop >= 165){
    	$('.gp-goTop').fadeIn(500)
    }else{
    	$('.gp-goTop').fadeOut(500)
    }
    if(scrollTop >= docHeight - winHeight){
      $('.gp-goTop-fixed').addClass('bottom')
    }else{
      $('.gp-goTop-fixed').removeClass('bottom')
    }
  })
var goTopHtml = '<a href="javascript:void(0)" class="gp-goTop gp-goTop-fixed iconfont icon-zhiding"></a>'
$(goTopHtml).insertAfter('footer')
$('.gp-goTop').click(function(){
	$('body,html').stop().animate({scrollTop:0});
	return false;
});



/*
  tab切换
  例调用:$(".tab").tab({ev : 'mouseover',more : false,auto : false});
  */
  ;(function($){
      $.fn.extend({
          tab: function (options){
              var defaults = {         //默认参数
                  ev : 'mouseover',    //默认事件'mouseover','click'
                  delay : 100,         //延迟时间
                  auto : true,         //是否自动切换 true,false
                  speed : 2000,        //自动切换间隔时间(毫秒)
                  more : false         //是否有more,false,true
              };
              var options = $.extend(defaults, options);  //用户设置参数覆盖默认参数
              return this.each(function (){
                  var o = options;
                  var obj = $(this);
                  var oTil = obj.find('.til_tab');
                  var oBoxs = obj.find('.tabList')
                  var oBox = oBoxs.find('.tabListBox');
                  var oMore = null;
                  var iNum = 0;
                  var iLen = oTil.length;
                  obj.find('.til_tab').eq(0).addClass('on')
                  oBoxs.each(function(){
                    $(this).find('.tabListBox').eq(0).css('display','block')
                  })
                  
                  obj.find('.more_tab').eq(0).css('display','block')
                  //鼠标事件绑定
                  oTil.bind(o.ev , function (){
                      var _this = this;
                      if(o.ev == 'mouseover' && o.delay){
                          _this.timer = setTimeout(function (){
                              change(_this);
                          },o.delay);
                      }else{
                          change(_this);
                      }; 
                  })
  
                  oTil.bind('mouseout',function (){
                      var _this = this;
                      clearTimeout(_this.timer);
                  });
  
                  //自动切换效果
                  (function autoPlay(){
                      var timer2 = null;
                      if(o.auto){
                          function play(){
                              iNum++;
                              if(iNum >= iLen){
                                  iNum =0;
                              };
                              change(oTil.eq(iNum));
                          };
                          timer2 = setInterval(play,o.speed);
  
                          obj.on('mouseover',function (){
                              clearInterval(timer2);
                          })
  
                          obj.on('mouseout',function (){
                              timer2 = setInterval(play,o.speed);
                          })
                      };
                  })();
  
                  function change(box){
                      iNum = $(box).index();
                      oTil.removeClass('on');
                      // debugger
                      oBoxs.each(function(){
                        $(this).find('.tabListBox').css('display','none')
                      })
                      // oBox.css('display','none');
                      if(o.more){
                          oMore = obj.find('.more_tab');
                          oMore.css('display','none');
                          oMore.eq(iNum).css('display','block');
                      };
                      oTil.eq(iNum).addClass('on');
                      // oBox.eq(iNum).css('display','block');
                      oBoxs.each(function(){
                        $(this).find('.tabListBox').eq(iNum).css('display','block')
                      })
                  }
              });
          }
      })
  })(jQuery);
  /*
  侧边栏三级
  例调用: asideMenu('#gp-subLeft')
  */
  function asideMenu(menu){
    //当前状态高亮
    $(menu).find('.active').each(function(){
      if($(this).parents('dl').hasClass('gp-second-nav')){
       $(this).parents('dl').css('display','block');
       $(this).parents('li').addClass('active')
       $(this).parents('li').find('.gp-toggles').addClass('icon-down').removeClass('icon-right');
      }
    })
    $(menu).find('.gp-toggles').click(function(){
      if($(this).parents('li').hasClass('active')){
          $(this).addClass('icon-right').removeClass('icon-down')
          $(this).next('.gp-second-nav').slideUp(500)
          $(this).parents('li').removeClass('active')
        }else{
          $(this).addClass('icon-down').removeClass('icon-right');
          $(this).next('.gp-second-nav').slideDown(500);
          $(this).parents('li').siblings().find('.gp-second-nav').slideUp(500)
          $(this).parents('li').siblings().removeClass('active')
          $(this).parents('li').siblings().find('.gp-toggles').addClass('icon-right').removeClass('icon-down')
          $(this).parents('li').addClass('active')
        }
      })
  }
  
  
  //移动端侧边栏菜单
  function mobileAsideMenu(menu,main){
  		$(menu).find('.gp-m-inner-header').click(function(){
  	  	$(this).toggleClass("gp-m-inner-header-icon-click gp-m-inner-header-icon-out");
  	  	$(this).find('.iconfont').toggleClass("icon-jia icon-jian")
  	  	$(".gp-subNavm").slideToggle(500);
  		
  	  });
      $('.gp-subNavm').find('.gp-m-toggle').click(function(){
        if($(this).parents('li').hasClass('active')){
          $(this).addClass('icon-right').removeClass('icon-down')
          $(this).next('dl').slideUp(500)
          $(this).parents('li').removeClass('active')
        }else{
          $(this).addClass('icon-down').removeClass('icon-right');
          $(this).next('dl').slideDown(500);
          $(this).parents('li').siblings().find('dl').slideUp(500)
          $(this).parents('li').siblings().removeClass('active')
          $(this).parents('li').siblings().find('.gp-m-toggle').addClass('icon-right').removeClass('icon-down')
          $(this).parents('li').addClass('active')
        }
      })
  };
  
  
// 跳转到外链时弹窗提示
$('a').click(function(){
	var url = $(this).attr('href');
	if(url.indexOf('http') > -1 && url.indexOf('whlyj.beijing.gov.cn') == -1 && url.indexOf('javascript:') == -1 && url != '' && url != '#' ){
		var isGo = confirm('您即将离开北京市文化和旅游局网站，去往：' + url);
		if(isGo){
			window.location.href = url;
		}
		return false;
	}
})