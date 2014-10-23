/*! (c) Mat Marquis (@wilto). MIT License. http://wil.to/3a */
(function(e,t){var n=0;e.fn.getPercentage=function(){var e=this.attr("style").match(/margin\-left:(.*[0-9])/i)&&parseInt(RegExp.$1);return e};e.fn.adjRounding=function(t){var n=e(this),r=n.find(t),i=n.parent().width()-e(r[0]).width();if(i!==0){e(r).css("position","relative");for(var s=0;s<r.length;s++){e(r[s]).css("left",i*s+"px")}}return this};e.fn.carousel=function(r){if(this.data("carousel-initialized")){return}this.data("carousel-initialized",true);var i={slider:".slider",slide:".slide",prevSlide:null,nextSlide:null,slideHed:null,addPagination:false,addNav:r!=t&&(r.prevSlide||r.nextSlide)?false:true,namespace:"carousel",speed:300},s=e.extend(i,r),o=this,u=document.body||document.documentElement,a=function(){var e="transitionProperty",n=document.createElement("tester"),r=n.style,i=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),s="Webkit Moz O ms Khtml".split(" "),o=e.charAt(0).toUpperCase()+e.substr(1),u=(e+" "+s.join(o+" ")+o).split(" ");for(var a in u){if(r[u[a]]!==t){return true}}return false},f={init:function(){n++;o.each(function(t){var r=e(this),i=r.find(s.slider),o=r.find(s.slide),u=o.length,a="margin-left "+s.speed/1e3+"s ease",l="carousel-"+n+"-"+t;if(o.length<=1){return}r.css({overflow:"hidden",width:"100.2%"}).attr("role","application");i.attr("id",i[0].id||"carousel-"+n+"-"+t).css({marginLeft:"0px","float":"left",width:100*u+"%","-webkit-transition":a,"-moz-transition":a,"-ms-transition":a,"-o-transition":a,transition:a}).bind("carouselmove",f.move).bind("nextprev",f.nextPrev).bind("navstate",f.navState);o.css({"float":"left",width:100/u+"%"}).each(function(t){var n=e(this);n.attr({role:"tabpanel document",id:l+"-slide"+t});if(s.addPagination){n.attr("aria-labelledby",l+"-tab"+t)}});s.addPagination&&f.addPagination();s.addNav&&f.addNav();i.trigger("navstate",{current:0})})},addNav:function(){o.each(function(t){var n=e(this),r=n.find(s.slider),i=r[0].id,o=['<ul class="slidecontrols" role="navigation">','	<li role="presentation"><a href="#'+i+'" class="'+s.namespace+'-next"><i class="icon-angle-right"></i></a></li>','	<li role="presentation"><a href="#'+i+'" class="'+s.namespace+'-prev"><i class="icon-angle-left"></i></a></li>',"</ul>"].join(""),u={nextSlide:"."+s.namespace+"-next",prevSlide:"."+s.namespace+"-prev"};s=e.extend(s,u);n.prepend(o)})},addPagination:function(){o.each(function(t){var r=e(this),i=e('<ol class="'+s.namespace+'-tabs" role="tablist navigation" />'),o=r.find(s.slider),u=r.find(s.slide);slideNum=u.length,associated="carousel-"+n+"-"+t;while(slideNum--){var a=e(u[slideNum]).find(s.slideHed).text()||"Page "+(slideNum+1),f=['<li role="presentation">','<a href="#'+associated+"-slide"+slideNum+'"',' aria-controls="'+associated+"-slide"+slideNum+'"',' id="'+associated+"-tab"+slideNum+'" role="tab">'+a+"</a>","</li>"].join("");i.prepend(f)}i.appendTo(r).find("li").keydown(function(t){var n=e(this),r=n.prev().find("a"),i=n.next().find("a");switch(t.which){case 37:case 38:r.length&&r.trigger("click").focus();t.preventDefault();break;case 39:case 40:i.length&&i.trigger("click").focus();t.preventDefault();break}}).find("a").click(function(t){var n=e(this);if(n.attr("aria-selected")=="false"){var i=n.parent().index(),o=-(100*i),u=r.find(s.slider);u.trigger("carouselmove",{moveTo:o})}t.preventDefault()})})},roundDown:function(e){var t=parseInt(e,10);return Math.ceil((t-t%100)/100)*100},navState:function(t,n){var r=e(this),i=r.find(s.slide),o=-(n.current/100),u=e(i[o]);r.attr("aria-activedescendant",u[0].id);u.addClass(s.namespace+"-active-slide").attr("aria-hidden",false).siblings().removeClass(s.namespace+"-active-slide").attr("aria-hidden",true);if(!!s.prevSlide||!!s.nextSlide){var a=e('[href*="#'+this.id+'"]');a.removeClass(s.namespace+"-disabled");if(o==0){a.filter(s.prevSlide).addClass(s.namespace+"-disabled")}else if(o==i.length-1){a.filter(s.nextSlide).addClass(s.namespace+"-disabled")}}if(!!s.addPagination){var f=u.attr("aria-labelledby"),l=e("#"+f);l.parent().addClass(s.namespace+"-active-tab").siblings().removeClass(s.namespace+"-active-tab").find("a").attr({"aria-selected":false,tabindex:-1});l.attr({"aria-selected":true,tabindex:0})}},move:function(t,n){var r=e(this);r.trigger(s.namespace+"-beforemove").trigger("navstate",{current:n.moveTo});if(a()){r.adjRounding(s.slide).css("marginLeft",n.moveTo+"%").one("transitionend webkitTransitionEnd OTransitionEnd",function(){e(this).trigger(s.namespace+"-aftermove")})}else{r.adjRounding(s.slide).animate({marginLeft:n.moveTo+"%"},{duration:s.speed,queue:false},function(){e(this).trigger(s.namespace+"-aftermove")})}},nextPrev:function(t,n){var r=e(this),i=r?r.getPercentage():0,o=r.find(s.slide),u=n.dir==="prev"?i!=0:-i<(o.length-1)*100,a=e('[href="#'+this.id+'"]');if(!r.is(":animated")&&u){if(n.dir==="prev"){i=i%100!=0?f.roundDown(i):i+100}else{i=i%100!=0?f.roundDown(i)-100:i-100}r.trigger("carouselmove",{moveTo:i});a.removeClass(s.namespace+"-disabled").removeAttr("aria-disabled");switch(i){case-(o.length-1)*100:a.filter(s.nextSlide).addClass(s.namespace+"-disabled").attr("aria-disabled",true);break;case 0:a.filter(s.prevSlide).addClass(s.namespace+"-disabled").attr("aria-disabled",true);break}}else{var l=f.roundDown(i);r.trigger("carouselmove",{moveTo:l})}}};f.init(this);e(s.nextSlide+","+s.prevSlide).bind("click",function(t){var n=e(this),r=this.hash,i=n.is(s.prevSlide)?"prev":"next",o=e(r);if(n.is("."+s.namespace+"-disabled")){return false}o.trigger("nextprev",{dir:i});t.preventDefault()}).bind("keydown",function(t){var n=e(this),r=this.hash;switch(t.which){case 37:case 38:e("#"+r).trigger("nextprev",{dir:"next"});t.preventDefault();break;case 39:case 40:e("#"+r).trigger("nextprev",{dir:"prev"});t.preventDefault();break}});var l={wrap:this,slider:s.slider};o.bind("dragSnap",l,function(t,n){var r=e(this).find(s.slider),i=n.direction==="left"?"next":"prev";r.trigger("nextprev",{dir:i})});o.filter("[data-autorotate]").each(function(){var t,n=e(this),r=n.attr("data-autorotate"),i=n.find(s.slider),o=n.find(s.slide).length,u=true,a=function(){var e=-(i.getPercentage()/100)+1;switch(e){case o:u=false;break;case 1:u=true;break}i.trigger("nextprev",{dir:u?"next":"prev"})};t=setInterval(a,r);n.attr("aria-live","polite").bind("mouseenter click touchstart",function(){clearInterval(t)})});return this}})(jQuery);$.event.special.dragSnap={setup:function(e){var t=$(this),n=function(e,t){var n=.3,r=t?"margin-left "+n+"s ease":"none";e.css({"-webkit-transition":r,"-moz-transition":r,"-ms-transition":r,"-o-transition":r,transition:r})},r=function(e){var e=parseInt(e,10);return Math.ceil((e-e%100)/100)*100},i=function(e,t){var i=t.target,s=i.attr("style")!=undefined?i.getPercentage():0,o=t.left===false?r(s)-100:r(s),u=document.body.style,a=function(){var e="transitionProperty",t=document.createElement("tester"),n=t.style,r=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),i="Webkit Moz O ms Khtml".split(" "),s=e.charAt(0).toUpperCase()+e.substr(1),o=(e+" "+i.join(s+" ")+s).split(" ");for(var u in o){if(n[o[u]]!==undefined){return true}}return false};n(i,true);if(a()){i.css("marginLeft",o+"%")}else{i.animate({marginLeft:o+"%"},opt.speed)}};t.bind("snapback",i).bind("touchstart",function(r){function f(e){var t=e.originalEvent.touches?e.originalEvent.touches[0]:e;o={time:(new Date).getTime(),coords:[t.pageX,t.pageY]};if(!s||Math.abs(s.coords[0]-o.coords[0])<Math.abs(s.coords[1]-o.coords[1])){return}u.css({"margin-left":a+(o.coords[0]-s.coords[0])/s.origin.width()*100+"%"});if(Math.abs(s.coords[0]-o.coords[0])>10){e.preventDefault()}}var i=r.originalEvent.touches?r.originalEvent.touches[0]:r,s={time:(new Date).getTime(),coords:[i.pageX,i.pageY],origin:$(r.target).closest(e.wrap)},o,u=$(r.target).closest(e.slider),a=u.attr("style")!=undefined?u.getPercentage():0;n(u,false);t.bind("gesturestart",function(e){t.unbind("touchmove",f).unbind("touchend",f)}).bind("touchmove",f).one("touchend",function(e){t.unbind("touchmove",f);n(u,true);if(s&&o){if(Math.abs(s.coords[0]-o.coords[0])>10&&Math.abs(s.coords[0]-o.coords[0])>Math.abs(s.coords[1]-o.coords[1])){e.preventDefault()}else{t.trigger("snapback",{target:u,left:true});return}if(Math.abs(s.coords[0]-o.coords[0])>1&&Math.abs(s.coords[1]-o.coords[1])<75){var r=s.coords[0]>o.coords[0];if(-(o.coords[0]-s.coords[0])>s.origin.width()/4||o.coords[0]-s.coords[0]>s.origin.width()/4){s.origin.trigger("dragSnap",{direction:r?"left":"right"})}else{t.trigger("snapback",{target:u,left:r})}}}s=o=undefined})})}}