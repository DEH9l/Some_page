/**
 * Created by Ins on 29.08.17.
 */
$(document).ready(function(){
    var previous = $(".gallery-thumbs .swiper-wrapper");
    var previousSlider = previous.find(".swiper-slide");

    if (previousSlider.length == 1) {
        $(".wrap_slider_card .swiper-button-next, .wrap_slider_card .swiper-button-prev").css("display", "none");
        previous.css("display", "none");
    }
    if (previousSlider.length == 2) {
        previous.addClass("fixed");
    }
    if (2 <= previousSlider.length) {
        var galleryTop = new Swiper('.gallery-top', {
            /*nextButton: '.but_top_next',
             prevButton: '.but_top_prev',*/
            spaceBetween: 10
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            nextButton: '.but_thumb_next',
            prevButton: '.but_thumb_prev',
            spaceBetween: 10,
            roundLengths: true,
            centeredSlides: true,
            slidesPerView: 3,
            touchRatio: 0.2,
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    }
});
