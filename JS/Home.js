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

    })


    //Hover effect on the laptop navigation

    $('.laptop-nav li').on("mouseenter", function(e){
        
        $(e.currentTarget).children('a').addClass("hoverLinks");
    })

    $('.laptop-nav li').on("mouseleave", function(e){
        $(e.currentTarget).children('a').removeClass("hoverLinks");
    })


    //feature car slider for mobile devices
    const viewportWidth = $("body").width();
    let sliderItemWidth;
    let sliderItemHeight;
    let count = 0;
    let distanceX;
    let distanceY;
    $('.slider img').on('click',function(e){
        let currentIndex = $(e.currentTarget).index('.slider img');

        if(viewportWidth < 1200){       //slider function work for mobile 
            sliderItemWidth = $('.slider img').eq(0).width();
            if(currentIndex-1 > count){   // If click right image from current active image, make the slider move right
                count++
                distanceX = count * sliderItemWidth;
                $('.slider').css({
                    transform: 'translateX('+ -distanceX +'px)'
                })
                $(e.currentTarget).addClass('active-car');
                $('.slider img').eq(count).removeClass('active-car');
                
            }

            else if(currentIndex-1 < count){  //move left
                count--;
                distanceX = count * sliderItemWidth;
                $('.slider').css({
                    transform: 'translateX('+ -distanceX+'px)'
                })
                $(e.currentTarget).addClass('active-car');
                $('.slider img').eq(count+2).removeClass('active-car');
            }
            
        }

        else if(viewportWidth >= 1200){     //slider function works for laptop
            sliderItemHeight = $('.slider img').eq(0).height();
            if(currentIndex-1 > count){   // If click below image from current active image, make the slider move down
                count++;
                distanceY = count * sliderItemHeight;
                $('.slider').css({
                    transform: 'translateY('+ -distanceY +'px)',
                })
                $(e.currentTarget).addClass('active-car');
                $('.slider img').eq(count).removeClass('active-car');
                
            }

            else if(currentIndex-1 < count){  //move up when click above image
                count--;
                distanceY = count * sliderItemHeight;
                $('.slider').css({
                    transform: 'translateY('+ -distanceY+'px)'
                })
                $(e.currentTarget).addClass('active-car');
                $('.slider img').eq(count+2).removeClass('active-car');
            }
        }
    })



    //Click plus icon to expand mission statement
    $('.statement i').on('click',function(e){
        $(e.currentTarget).siblings('div.cornor-decor').toggleClass('expand');
        $(e.currentTarget).toggleClass('fa-minus');
        $(e.currentTarget).toggleClass('fa-plus');
        $(e.currentTarget).siblings('div.description').toggleClass('show-description');
    })

    
})