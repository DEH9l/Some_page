$(document).ready(function(){
    $('.delete-image').click(function () {
        deleteImage($(this));
    });

    $('#create-backup').click(function () {
        createBackUp();
    });

    $('#copy-characteristics').click(function () {
        copyCharacteristic($(this).attr('data-item'));
    });

    $(document).on("submit", '#characteristics-form', function (event) {
        event.preventDefault();
        addCharacteristics($(this));
    });

    $('.characteristic-save').on("click", function (e) {
        saveCharacteristic($(this).closest('tr'));
        return false;
    });

});

function createBackUp(){
    var params = {
        url: '/admin/items/create-back-up'
    };
    var callBacks = {
        success:'createBackUpComplete'
    };
    sendAjax(params, callBacks);
}

function createBackUpComplete(request){
    if (request.create){
        noty({
            'text':'Резервная копия создана!',
            'type':'success'
        });
    } else {
        noty({
            'text':'Ошибка при при создании резевной копии',
            'type':'error'
        });
    }
}

function deleteImage(image) {
    var data = {
        'item' : image.attr('data-item'),
        'image' : image.attr('data-image'),
        '_csrf' : $('[name=csrf-token]').attr('content')
    };
    var params = {
        url: '/admin/items/delete-image',
        type : 'get',
        data: data
    };
    var callBacks = {
        success:'requestDeleteImage'
    };
    sendAjax(params, callBacks, image);

}

function requestDeleteImage(request, elem) {
    if (request.delete){
        elem.closest('.item-image-container').remove();
    } else {
        alert('Ошибка удаления файла');
    }

}


function addCharacteristics(form){
    var data = {};
    form.find('input, select').each(function(){
        data[$(this).attr('name')] = $(this).val();
    });
    var params = {
        url: form.attr('action'),
        data: data
    };
    var callBacks = {
        success:'addCharacteristicsComplete'
    };
    sendAjax(params, callBacks, form);
}

function addCharacteristicsComplete(request, form){
    if ('add' in request){
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

function saveCharacteristic(row){
    var data = {
        '_csrf' : $('[name=csrf-token]').attr('content')
    };
    row.find('input').each(function(){
        data[$(this).attr('name')] = $(this).val();
    });
    var params = {
        url: '/admin/characteristics/save?id='+row.attr('data-key'),
        data: data
    };
    var callBacks = {
        success:'saveCharacteristicsComplete'
    };
    sendAjax(params, callBacks);
}

function saveCharacteristicsComplete(request){
    noty({
        'text': request.save ? 'Характеристика сохранена' : 'Ошибка сохранения характеристики',
        'type': request.save ? 'information' : 'error'
    });
}

function copyCharacteristic(targetId){
    var data = {
        'sourceId' : $('#source-characteristics').val(),
        'targetId' : targetId,
        '_csrf' : $('[name=csrf-token]').attr('content')
    };
    var params = {
        url: '/admin/items/copy-characteristics',
        data: data
    };
    var callBacks = {
        success:'copyCharacteristicsComplete'
    };
    sendAjax(params, callBacks);
}

function copyCharacteristicsComplete(request){
    if ('copy' in request){
        location.reload();
        return true;
    }
    noty({
        'text': 'Ошибка копирования характеристик',
        'type': 'error'
    });
}