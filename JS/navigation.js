$(document).ready(function(){
    // Mobile menu icon click
    let numberOfLinks = $('.mobile-nav ul li').length;
    let showMenuLinksMobile = () =>{
        let delaytime = 500;
        for(let i = 0; i < numberOfLinks; i++){
            $('.mobile-nav ul li').eq(i).css({
                transitionDelay: delaytime + "ms"
            })

            delaytime+= 100;
        }
    }
    $('.mobile-menu-icon').on('click', function(){
        $(this).children('.mobile-menu-icon span:first-of-type').toggleClass('first');

        $(".mobile-nav").toggleClass('hide-menu');
        showMenuLinksMobile();
        $('.mobile-nav ul li').toggleClass("roll-up");
        $('.nav-container').toggleClass('nav-container-sticky');
    })


    //Hover effect on the laptop navigation

    $('.laptop-nav li').on("mouseenter", function(e){
        
        $(e.currentTarget).children('a').addClass("hoverLinks");
    })

    $('.laptop-nav li').on("mouseleave", function(e){
        $(e.currentTarget).children('a').removeClass("hoverLinks");
    })

})