$(document).ready(function () {

    $(document).on("click", '.order-item-save', function (event) {
        var
            row = $(this).closest('tr'),
            itemID = $(this).attr('rel'),
            url = '/admin/orders/update-item';

        updateItem(itemID,row, url);
        return false;
    });

    $(document).on("click", '.delete-order-item', function (event) {
        if (confirm('Удалить позицию из заказа?')){
            removeItem($(this).closest('tr'));
        }
    });

    $('.mask-phone').mask('+ 38 (999) 999-99-99');


});
function updateItem(itemID, row, url) {

    var data = {
        'itemID':itemID,
        'orderID':$('#list').attr('data-order-id')*1,
        'count' : row.find('.order-item-count').val(),
        'price' : row.find('.order-item-sellPrice').val()
    };
    var params = {
        url: url,
        data: data,
        type : 'get'
    };
    var callBacks = {
        success:'updateItemComplete'
    };
    sendAjax(params, callBacks,row);
}

function updateItemComplete(request, row){
    if (!request.save){
        noty({
            'text':'Ошибка сохранения товара!',
            'type':'error'
        });
        return false;
    }
    if ('html' in request){
        row.replaceWith(request.html);
        noty({
            'text':'Товар сохранен!',
            'type':'success'
        });
    }
    if ('sum' in request){
        $('#sum').html(request.sum);
    }

    if ('countItems' in request){
        $('#countItems').html(request.countItems);
    }

    if ('sumCountItems' in request){
        $('#sumCountItems').html(request.sumCountItems);
    }
}

function removeItem(row) {
    var  url = '/admin/orders/delete-item?id='+row.attr('data-key')*1;
    var params = {
        url: url,
        data: {},
        type : 'get'
    };
    var callBacks = {
        success:'removeItemComplete'
    };
    sendAjax(params, callBacks,row);
}

function removeItemComplete(request, row){
    if (request.delete){
        row.remove();
        $('#sum').html(request.sum);
        $('#sumCountItems').html(request.sumCountItems);
        $('#countItems').html(request.countItems);
    }

}
