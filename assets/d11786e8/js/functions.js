function sendAjax(params, callBackFunctions, extParams){
    var ajaxLoader = $('#ajax-image');
    var template = {
        dataType: 'json',
        type: 'post',
        async: true,
        error: function (request) {
            if ('error' in callBackFunctions){
                if (extParams){
                    window[callBackFunctions.error](request, extParams);
                } else {
                    window[callBackFunctions.error](request);
                }
            }
        },
        success: function (request) {
            if ('redirect' in request){
                var newUrl = location.host;
                if ('url' in request){
                    newUrl = request.url;
                }
                location.href = newUrl;
                return false;
            }
            if (extParams) {
                window[callBackFunctions.success](request, extParams);
            } else {
                window[callBackFunctions.success](request);
            }

        },
        complete: function (request) {
            $('#ajax-image').hide();
            if ('complete' in callBackFunctions){
                if (extParams){
                    window[callBackFunctions.complete](request, extParams);
                } else {
                    window[callBackFunctions.complete](request);
                }
            }
        }
    };
    $.extend(template,params);
    ajaxLoader.show();
    $.ajax(template);
}

function loginUser(form){
    var data = {};
    form.find('input, select').each(function(){
        data[$(this).attr('name')] = $(this).val();
    });
    var params = {
        url: form.attr('action'),
        data: data
    };
    var callBacks = {
        success:'loginUserComplete'
    };
    sendAjax(params, callBacks, form);
}

function loginUserComplete(request, form){
    setTimeout(function() {
        form.find('.btn-block').removeClass('send');
    }, 500);
    if ('login' in request){
        location.reload();
        return true;
    }
    if ('error' in request){
        var prefixInputId = form.attr('id').toLowerCase();
        var fields = form.find('input');
        for (var field in request.error){
            fields.filter('#'+prefixInputId+'-' + field).parent().removeClass('has-success').addClass('has-error').find('.help-block').html(request.error[field][0]);
        }
        return false;
    }
}

function requestCallback(form){
    var data = {};
    form.find('input').each(function(){
        data[$(this).attr('name')] = $(this).val();
    });
    var params = {
        url: form.attr('action'),
        data: data
    };
    var callBacks = {
        success:'requestCallbackComplete'
    };
    sendAjax(params, callBacks, form);
}

function requestCallbackComplete(request, form){
    setTimeout(function() {
        form.find('.btn-block').removeClass('send');
    }, 500);
    if ('send' in request){
        noty({
            'text': 'Запрос отправлен',
            'type': 'success'
        });
        return true;
    }
    if ('error' in request){
        var prefixInputId = form.attr('id').toLowerCase();
        var fields = form.find('input');
        for (var field in request.error){
            fields.filter('#'+prefixInputId+'-' + field).parent().removeClass('has-success').addClass('has-error').find('.help-block').html(request.error[field][0]);
        }
        return false;
    }
}

function adaptivSlides() {
    var widthSwiper = $(".swiper-main").width();
    if (1165 <= widthSwiper) {
        return 4;
    }
    if (940 <= widthSwiper && widthSwiper < 1165) {
        return 3;
    }
    if (720 <= widthSwiper && widthSwiper < 940) {
        return 2;
    }
    if (widthSwiper < 719) {
        return 1;
    }
}

function addToCart(elem, count) {
    $.noty.closeAll();
    if (count == 0){
        return false;
    }
    var data = {
        'Cart[priceID]' : elem.attr('rel'),
        'Cart[count]' : count,
        '_csrf' : $('[name=csrf-token]').attr('content')
    };

    var params = {
        url: '/cart/add',
        data: data
    };
    var callBacks = {
        success:'requestCartComplete'
    };
    sendAjax(params, callBacks, elem);
}

function requestCartComplete(request, elem){
    if ('error' in request){
        return false;
    }

    $.noty.closeAll();
    $('#head-cart-sum').html(request.sum + ' грн.');
    $('#head-cart-count').html(request.count);
    var messageType = request.result ? 'success' : 'error';
    var messageText = '';
    switch (request.type){
        case 'add':
            if (request.result){
                messageText = 'Товар добавлен!';
                elem.addClass('in-cart').text('Добавлен');
            } else {
                messageText = 'Ошибка при добавлении товара!';
            }
            break;
        case 'modify':
            $('#cart-total-sum').html(request.sum + ' грн.');
            elem.closest('.row_table_default.row_basked').find('.total_col_basked').html(request.itemSum + ' грн.');
            messageText = request.result ? 'Товар сохранен!' : 'Ошибка при сохранении товара!';
            return false;
            break;
        case 'delete':
            elem.closest('.row_table_default.row_basked').remove();
            $('#cart-total-sum').html(request.sum + ' грн.');
            messageText = request.result ? 'Товар удален!' : 'Ошибка при удалении товара!';
            if (messageText == 'Товар удален!'){
                messageType = 'information'
            }
            break;
    }
    noty({
        'text': messageText,
        'type': messageType
    });
    return true;
}

function addReview() {
    var form = $('#reviewForm');
    if (form.attr('data-block')){
        return false;
    }
    form.attr('data-block',true);

    var data = {};
    form.find('input, textarea').each(function(){
        data[$(this).attr('name')] = $(this).val();
    });
    var params = {
        url: form.attr('action'),
        data: data
    };
    var callBacks = {
        success:'addReviewCompelete'
    };
    sendAjax(params, callBacks, form);
    return false;

}

function addReviewCompelete(request, form) {
    if ('add' in request && request.add){
        location.reload();
    }
    form.removeAttr('data-block');
}

function requestItemAvailable() {
    var form = $('#requestFormItemAvailable');
    if (form.attr('data-block')){
        return false;
    }
    form.attr('data-block',true);

    var data = {};
    form.find('input').each(function(){
        data[$(this).attr('name')] = $(this).val();
    });
    var params = {
        url: form.attr('action'),
        data: data
    };
    var callBacks = {
        success:'requestItemAvailableCompelete'
    };
    sendAjax(params, callBacks, form);
    return false;
}

function requestItemAvailableCompelete(request, form) {
    form.removeAttr('data-block');
    $('#modal-request-item-available').modal('hide');
    noty({
        'text': request.add ? 'Запрос добавлен' : 'Ошибка добавления запроса',
        'type': request.add ? 'success' : 'error'
    });
}