//Get the button:
let mybutton = document.getElementById("backtop");

// When the user scrolls down 20px from the top of the document, show the button
/*window.onscroll = function () {
    scrollFunction()
};*/

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function backtotop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// mute-video-toggle
var x = $("#myVideo");
x.prop("autoplay", true);

function changeMuteStatus() {
    var isMuted = x.prop("muted");
    var icon = $('.btn-mute');
    if (isMuted) {
        x.prop("muted", false);
        icon.addClass('fa-volume-up');
        icon.removeClass('fa-volume-mute');
    } else {
        x.prop("muted", true);
        icon.addClass('fa-volume-mute');
        icon.removeClass('fa-volume-up');
    }
}

changeMuteStatus();
$('.intro .btn-vol').on('click', changeMuteStatus);

//active-link
jQuery(function ($) {
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $('ul a').each(function () {
        if (this.href === path) {
            $(this).addClass('active');
        }
    });
});

// slider
$(document).ready(function () {
    $('.responsive').slick({
        // dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                // centerMode: true,

            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,

            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,

            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        }, {
            breakpoint: 320,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
        }]
    });
    $('.responsive-library').slick({
        // dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false,
        autoplaySpeed: 1000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                // centerMode: true,

            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,

            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,

            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        }, {
            breakpoint: 320,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
        }]
    });
    $('.responsive-library2').slick({
        // dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                // centerMode: true,

            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: true,

            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,

            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        }, {
            breakpoint: 320,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
        }]
    });
});

//click to copy
function clickcopy(text) {
    /* Get the text field */
    var copyText = document.getElementById(text);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

//count-down 24h
// setInterval(function time(){
//     var d = new Date();
//     var hours = 24 - d.getHours();
//     var min = 60 - d.getMinutes();
//     if((min + '').length == 1){
//         min = '0' + min;
//     }
//     var sec = 60 - d.getSeconds();
//     if((sec + '').length == 1){
//         sec = '0' + sec;
//     }
//     jQuery('#countdown').html(hours+':'+min+':'+sec)
// }, 1000);
//count-down
// (function () {
//     const second = 1000,
//         minute = second * 60,
//         hour = minute * 60,
//         day = hour * 24;
//
//     //I'm adding this section so I don't have to keep updating this pen every year :-)
//     //remove this if you don't need it
//     let today = new Date(),
//         dd = String(today.getDate()).padStart(2, "0"),
//         mm = String(today.getMonth() + 1).padStart(2, "0"),
//         yyyy = today.getFullYear(),
//         thisYear = yyyy,
//         dayMonth = "01/21/",
//         dayMonth2 = "02/17/",
//         dayclaim = dayMonth + yyyy,
//         dayclaim2 = dayMonth2 + yyyy;
//
//     today = mm + "/" + dd + "/" + yyyy;
//     if (today > dayclaim) {
//         dayclaim = dayMonth + thisYear;
//     }
//     if (today > dayclaim2) {
//         dayclaim2 = dayMonth2 + thisYear;
//     }
//     //end
//
//     const countDown = new Date(dayclaim).getTime(),
//         x = setInterval(function() {
//
//             const now = new Date().getTime(),
//                 distance = countDown - now;
//             if( document.getElementById("days")){
//                 document.getElementById("days").innerText = Math.floor(distance / (day))
//
//             }
//             if(document.getElementById("hours")){
//                 document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour))
//             }
//             if(document.getElementById("minutes")){
//                 document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute))
//             }
//             if(document.getElementById("seconds")){
//                 document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second)
//             }
//             //seconds
//         }, 0)
//
//     const countDown2 = new Date(dayclaim2).getTime(),
//         y = setInterval(function() {
//
//             const now = new Date().getTime(),
//                 distance = countDown2 - now;
//             if( document.getElementById("days1")){
//                 document.getElementById("days1").innerText = Math.floor(distance / (day))+'d '
//
//             }
//             if(document.getElementById("hours1")){
//                 document.getElementById("hours1").innerText = Math.floor((distance % (day)) / (hour))+'h '
//             }
//             if(document.getElementById("minutes1")){
//                 document.getElementById("minutes1").innerText = Math.floor((distance % (hour)) / (minute))+'m '
//             }
//             if(document.getElementById("seconds1")){
//                 document.getElementById("seconds1").innerText = Math.floor((distance % (minute)) / second)+'s '
//             }
//             //seconds
//         }, 0)
// }());

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
//value-animation
// const fill = document.querySelector('.tok-left');
// fill.classList.remove('value-up-10');
//
// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             fill.classList.add('value-up-10');
//             return; // if we added the class, exit the function
//         }
//         // We're not intersecting, so remove the class!
//         fill.classList.remove('value-up-10');
//     });
// });
// observer.observe(document.querySelector('.value-10'));
//
// //value-animation-1
// const fill1 = document.querySelector('.tok-team');
// fill1.classList.remove('value-up-20');
//
// const observer1 = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             fill1.classList.add('value-up-20');
//             return; // if we added the class, exit the function
//         }
//         // We're not intersecting, so remove the class!
//         fill1.classList.remove('value-up-20');
//     });
// });
// observer1.observe(document.querySelector('.value-20'));
//
// //value-animation-2
// const fill2 = document.querySelector('.tok-foudation');
// fill2.classList.remove('value-up-20');
//
// const observer2 = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             fill2.classList.add('value-up-20');
//             return; // if we added the class, exit the function
//         }
//         // We're not intersecting, so remove the class!
//         fill2.classList.remove('value-up-20');
//     });
// });
// observer2.observe(document.querySelector('.value-20-1'));
//
// //value-animation-3
// const fill3 = document.querySelector('.tok-marketing');
// fill3.classList.remove('value-up-30');
//
// const observer3 = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             fill3.classList.add('value-up-30');
//             return; // if we added the class, exit the function
//         }
//         // We're not intersecting, so remove the class!
//         fill3.classList.remove('value-up-30');
//     });
// });
// observer3.observe(document.querySelector('.value-15'));
//
// //value-animation-4
// const fill4 = document.querySelector('.tok-reserved');
// fill4.classList.remove('value-up-15');
//
// const observer4 = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             fill4.classList.add('value-up-15');
//             return; // if we added the class, exit the function
//         }
//         // We're not intersecting, so remove the class!
//         fill4.classList.remove('value-up-15');
//     });
// });
// observer4.observe(document.querySelector('.value-15'));
//
// //value-animation-5
// const fill5 = document.querySelector('.tok-legal');
// fill5.classList.remove('value-up-5');
//
// const observer5 = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             fill5.classList.add('value-up-5');
//             return; // if we added the class, exit the function
//         }
//         // We're not intersecting, so remove the class!
//         fill5.classList.remove('value-up-5');
//     });
// });
// observer5.observe(document.querySelector('.value-5'));