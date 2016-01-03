$(".scroll").click(function(event){
        event.preventDefault();
        //calculate destination place
        var dest=0;
        if($(this.hash).offset().top > $(document).height()-$(window).height()){
             dest=$(document).height()-$(window).height();
        }else{
             dest=$(this.hash).offset().top;
        }
        //go to destination
        $('html,body').animate({scrollTop:dest}, 1000,'swing');
    });


    $(document).ready(function() {
        $(window).resize(function(){
            var $c = $('.container'),
                $w = $('.details'),
                totalWidth = $('.navbar').outerWidth(),
                wellWidth = $c.outerWidth(),
                diff = totalWidth - wellWidth,
                marg = -Math.floor(diff/2) + 'px';
            $w.each(function(){
                $(this).css({
                    'margin-left': marg,
                    'margin-right': marg
                });
            })
        });
        $(window).resize();
    });
