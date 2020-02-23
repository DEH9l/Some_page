$(document).ready(function(){
    
    $('.deleteCartItem').click(function(e){
        deleteCartItem($(this));
    });


    $(document).on('submit', '#createOrderForm',function (event) {
        event.preventDefault();
        createOrder();
    });

    $('.field-orders-delivery').find('label').click(function () {
        var delivery = $(this).parent().find('input').val();
        $('.field-orders-delivery').find('[name="Orders[delivery]"]').first().val(delivery);
        var deliveryCity = $('#delivery-city');
        var deliveryAddress = $('#delivery-address');
        var deliverySettlement = $('#delivery-settlement');
        deliveryCity.addClass('hidden');
        deliveryAddress.addClass('hidden');
        deliverySettlement.addClass('hidden');
        switch (delivery){
            case '0':
                break;
            case '1':
                deliveryAddress.removeClass('hidden');
                break;
            case '2':
                deliveryCity.removeClass('hidden');
                deliverySettlement.removeClass('hidden');
                break;
            case '3':
                deliveryCity.removeClass('hidden');
                deliveryAddress.removeClass('hidden');
                break;
        }
    });

    $('#orders-delivery').find('label').first().click();

    $('.field-orders-payment').find('label').click(function () {
        var payment = $(this).parent().find('input').val();
        $('.field-orders-payment').find('[name="Orders[payment]"]').first().val(payment);
        var name = $('#man-fields');
        var organization = $('#organization-fields');
        if (payment == '3'){
            name.addClass('hidden');
            organization.removeClass('hidden');
        } else {
            name.removeClass('hidden');
            organization.addClass('hidden');
        }
    });
    $('#orders-payment').find('label').first().click();


    $('#createOrderModal').on('hide.bs.modal', function (e) {
        location.href = '/';
    })

    $('#order-payment2').change(function(){
        checkSum();
    });


});

function createOrder() {
    var paymentMethod = $('.field-orders-payment').find('[name="Orders[payment]"]').first().val();
    if (paymentMethod == 2 && !checkSum()){
        return false;
    }

    if (!checkDelivery()){
        return false;
    }
    var form = $('#createOrderForm');
    if (form.attr('data-block')){
        return false;
    }
    form.attr('data-block',true);

    var data = {};
    form.find('input, select, textarea').each(function(){
        data[$(this).attr('name')] = $(this).val();
    });
    data['Orders[delivery]'] = $('.field-orders-delivery').find('[name="Orders[delivery]"]').first().val();
    data['Orders[payment]'] = paymentMethod;
    var params = {
        url: form.attr('action'),
        data: data
    };
    var callBacks = {
        success:'createOrderCompelete'
    };
    sendAjax(params, callBacks, form);
    return false;

}

function createOrderCompelete(request, form) {
    if ('orderID' in request){
        $('#modal-order-num').html(request.orderID);
        $('#createOrderModal').modal('show');
    }
    form.removeAttr('data-block');
}

function getWarehouses (){
    var data = {
        'city' : $('#orders-newmailcity').val(),
        '_csrf' : $('[name=csrf-token]').attr('content')
    };
    var params = {
        url: '/order/get-warehouses',
        data: data
    };
    var callBacks = {
        success:'getWarehouseComplete'
    };
    sendAjax(params, callBacks);
}

function getWarehouseComplete (request){
    var elem = $('#orders-newmailsettlement');
    var Options = {
        allowClear: true,
        language: "ru-RU",
        placeholder: "Выберите отделение",
        theme: "krajee",
        width: "100%",
        data : request.warehouses
    };
    elem.val('');
    elem.html('<option value="">Выберите отделение</option>');
    elem.select2(Options);
}


function checkDelivery() {
    var deliveryMethod = $('.field-orders-delivery').find('[name="Orders[delivery]"]').first().val(),
        result = true;
    switch(deliveryMethod){
        case '1':
            var addr = $('#orders-address');
            var addrText = addr.val().replace(/[^w]/gi);
            if (addrText == '' || addrText == 'undefined' || !addrText){
                var blockField = $('.field-orders-address');
                blockField.removeClass('has-success').addClass('has-error');
                blockField.find('.help-block').text('Заполните адрес доставки');
                result = false;
            }

            break;
        case '2':
            if (!$('#orders-newmailsettlement').val()){
                var blockField = $('.field-orders-newmailsettlement');
                blockField.removeClass('has-success').addClass('has-error');
                blockField.find('.help-block').text('Выберите отделение');
                result = false;
            }
            break;
        case '3':
            if (!$('#orders-newmailcity').val()){
                var blockField = $('.field-orders-newmailcity');
                blockField.removeClass('has-success').addClass('has-error');
                blockField.find('.help-block').text('Выберите город');
                result = false;
            }
            var addr = $('#orders-address');
            var addrText = addr.val().replace(/[^w]/gi);
            if (addrText == '' || addrText == 'undefined' || !addrText){
                var blockField = $('.field-orders-address');
                blockField.removeClass('has-success').addClass('has-error');
                blockField.find('.help-block').text('Заполните адрес доставки');
                result = false;
            }
            break;
    }
    return result;
}

function checkSum() {
    var minSumForOrderPayment = $('#orders-minsumfororderpayment').val()*1,
        maxSumForOrderPayment = $('#orders-maxsumfororderpayment').val()*1,
        orderSum = $('#head-cart-sum').text().replace(/[^\d]/g,'');
    if ((orderSum < minSumForOrderPayment || orderSum > maxSumForOrderPayment)) {
        $('#messagesOrder').modal('show');
        return false;
    }
    return true;
}