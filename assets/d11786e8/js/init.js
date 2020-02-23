$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();
    $(".ellipsis").dotdotdot();
    //== =============окно входа=======================
    $('.btn_avtoriz').on("click", function (e) {
        e.preventDefault();
        var blockEnter = $("#modal_auth");
        if (blockEnter.is(":hidden")) {
            blockEnter.show("200");
        } else {
            blockEnter.hide("200");
        }
    });
    $(document).mouseup(function (e) { // событие клика по веб-документу
        var blockEnter = $("#modal_auth");
        if (!blockEnter.is(e.target) // если клик был не по нашему блоку
            && blockEnter.has(e.target).length === 0) { // и не по его дочерним элементам
            blockEnter.hide("200"); // скрываем его
        }
        $(document).on('click', '#modal_auth .close', function (e) {
            blockEnter.hide("200");
        });
    });

    // ===============окно call back=======================
    $('#call-back-btn').on("click", function (e) {
        e.preventDefault();
        var blockEnter = $("#modal_call_back");
        if (blockEnter.is(":hidden")) {
            blockEnter.show("200");
        } else {
            blockEnter.hide("200");
        }
    });

    $(document).mouseup(function (e) { // событие клика по веб-документу
        var blockEnter = $("#modal_call_back");
        if (!blockEnter.is(e.target) // если клик был не по нашему блоку
            && blockEnter.has(e.target).length === 0) { // и не по его дочерним элементам
            blockEnter.hide("200"); // скрываем его
        }
        $(document).on('click', '#modal_call_back .close', function (e) {
            blockEnter.hide("200");
        });
    });

    $(".mask-phone").mask("+ 38 (999) 999-99-99");

    $('.countItem').keydown(function (event) {
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return true;
        }  else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault();
            }
        }
    });
    /*var countFields = $(".countItem");

    countFields.mask("999{1,3}");
    countFields.val(countFields.attr('data-val'));*/

    $(document).on("submit", '#loginForm', function (event) {
        event.preventDefault();
        var sendButton = $(this).find('.btn-block');
        if (sendButton.hasClass('send')) {
            return false;
        }
        sendButton.addClass('send');
        loginUser($(this));
    });

    $(document).on("submit", '#callbackForm', function (event) {
        event.preventDefault();
        var sendButton = $(this).find('.btn-block');
        if (sendButton.hasClass('send')) {
            return false;
        }
        sendButton.addClass('send');
        requestCallback($(this));
    });

    $(document).on("submit", '#search-form', function (event) {
        var name = $(this).find('#search-field').val();
        name = name.replace(/[^\wа-яА-Я-]/gi, ' ');
        if (name === '') {
            //нужно выводить какое то сообщение об ошибке
            return false;
        }
        location.href = $(this).attr('action') + name;
        return false;
    });

    $('.but-plus').click(function () {
        var countInput = $(this).parent().find('.countItem');
        var countItem = (countInput.val().replace(' ', '').replace(',', '.') * 1 + 1).toFixed(1) * 1;
        countItem = Math.ceil(countItem);
        countInput.val(countItem < 9999 ? countItem : 9999);
        return false;
    });

    $('.but-minus').click(function () {
        var countInput = $(this).parent().find('.countItem');
        var countItem = (countInput.val().replace(' ', '').replace(',', '.') * 1 - 1).toFixed(1) * 1;
        countItem = Math.ceil(countItem);
        countInput.val(countItem < 0.1 ? 1 : countItem);
        return false;
    });

    $('.addToCart').click(function (event) {
        var countInput = $(this).parent().find('.countItem');
        if (!countInput.length) {
            countInput = $(this).parent().parent().find('.countItem');
        }
        var countItem = (countInput.val().replace(' ', '').replace(',', '.') * 1).toFixed(1) * 1;
        countItem = Math.ceil(countItem);
        countInput.val(countItem);
        addToCart($(this), countItem);
    });

    $(".parent_stars>li").click(function () {
        $(this).closest(".parent_stars").addClass("active_str");
        $(".parent_stars>li").removeClass("full_str");
        $(this).toggleClass("full_str");
        $('#reviewform-ratio').val($(this).attr('rel'));
    });

    $(".requestInfo").click(function () {
        $('#requestitemsavailable-item').val($(this).attr('rel'));
        $('#modal-request-item-available').modal('show');
    });

    $(document).on('submit', '#reviewForm', function (event) {
        event.preventDefault();
        addReview();
    });

    $(document).on('submit', '#requestFormItemAvailable', function (event) {
        event.preventDefault();
        requestItemAvailable();
    });

    var toTop = $('#to-top');
    toTop.click(function () {
        $('body,html').animate({scrollTop: 0}, 800);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#to-top').fadeIn();
        } else {
            $('#to-top').fadeOut();
        }
    });

});

