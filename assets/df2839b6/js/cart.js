$(document).ready(function(){
    $('.deleteCartItem').click(function(e){
        deleteCartItem($(this));
    });

    var cartTable = $('.wrap_basked');
    cartTable.find('.countItem').change(function () {
        modifyCartItem($(this));
    });

    cartTable.find('.spin-number-but').click(function () {
        modifyCartItem($(this).parent().find('.countItem'));
    });

});

function modifyCartItem(elem){
    if (elem.val() == 0){
        return false;
    }
    var data = {
        'Cart[count]' : Math.ceil(elem.val()),
        '_csrf' : $('[name=csrf-token]').attr('content')
    };
    var params = {
        url: '/cart/save?id='+elem.attr('data-item'),
        data: data
    };
    var callBacks = {
        success:'requestCartComplete'
    };
    sendAjax(params, callBacks, elem);
}

function deleteCartItem(elem){
    var data = {
        '_csrf' : $('[name=csrf-token]').attr('content')
    };
    var params = {
        url: '/cart/delete?id='+elem.attr('data-item'),
        data: data
    };
    var callBacks = {
        success:'requestCartComplete'
    };
    sendAjax(params, callBacks, elem);
}
