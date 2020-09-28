define(['jquery'],  function()  {    
    return  {        
        init:   function()  {
            $('.big').hover(
                function() {
                    $(this).addClass('active').siblings('.big').removeClass('active');
                    $('.cartlist').show();
                    $('.item').eq($(this).index()).show().siblings('.item').hide();
                },
                function() {
                    $('.cartlist').hide();
                    $(this).removeClass('active')
                }
            );

            // (function() {
            //     let index = 0
            //     let cd = $('.carousel li').length - 1
            //     $('.left').on('click', function() {
            //         if (index == 0) {
            //             index = cd
            //             $('.carousel').css({
            //                 'left': parseInt($('.carousel li').css('width')) * -cd
            //             })
            //         }
            //         index--
            //         $('.carousel').stop(true).animate({
            //             'left': parseInt($('.carousel li').css('width')) * -index
            //         }, 300)
            //     })
            //     $('.right').on('click', function() {
            //         if (index == cd) {
            //             index = 0
            //             $('.carousel').css({
            //                 'left': 0
            //             })
            //         }
            //         index++
            //         $('.carousel').stop(true).animate({
            //             'left': parseInt($('.carousel li').css('width')) * -index
            //         }, 300)


            //     })

            // })();        
            let $liW = $('.carousel li').first().width();
            let index = null;
            $('.carousel').width($('.carousel li').size() * $liW + 'px');
            $(".active li").click(function() { //小圆点切换图片
                index = $(this).index() - 1;
                move();
            });
            let $timer = setInterval(move, 3000); //自动轮播
            function move() { //右移
                index++;
                if (index === $(".active li").length + 1) {
                    $('.carousel').css({
                        left: 0
                    })
                    index = 1
                }
                if (index === $(".active li").length) {
                    $(".active li").eq(0).addClass("select").siblings().removeClass("select");
                }
                if (index === -1) {
                    $('.carousel').css({
                        left: -($('.carousel li').length - 1) * $liW + 'px'
                    })
                    index = $(".active li").length - 1;
                }
                $(".active li").eq(index).addClass("select").siblings().removeClass("select");
                $(".carousel").stop(true).animate({ left: -$liW * index });
            };
            $('.left').click(function() { //点击左箭头
                index -= 2;
                move();
            });
            $('.right').click(function() { //点击右箭头
                move();
            });
            $(".pic-box").hover(function() { //鼠标移入暂停，移出继续
                    $('.left').css({
                        display: 'block'
                    });
                    $('.right').css({
                        display: 'block'
                    })
                    clearInterval($timer);
                },
                function() {
                    $('.left').css({
                        display: 'none'
                    });
                    $('.right').css({
                        display: 'none'
                    })
                    $timer = setInterval(move, 3000);
                });
        }    
    }

})