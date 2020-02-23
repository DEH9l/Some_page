$(document).ready(function(){

    $('.save').click(function () {
        save($(this).closest('tr'));
        return false;
    });
});

function save(elem) {
    var data = {
        'PromCharacteristics[category]' : elem.find('.category').attr('rel'),
        'PromCharacteristics[name]' : elem.find('.name').attr('rel'),
        'PromCharacteristics[promName]' : elem.find('.promName').val(),
        '_csrf' : $('[name=csrf-token]').attr('content')
    };
    var params = {
        url: '/admin/prom-characteristics/save?id='+elem.attr('data-key'),
        data: data,
        type : 'post'
    };
    var callBacks = {
        success:'saveComplete'
    };
    sendAjax(params, callBacks);
}

function saveComplete(request){
    noty({
        'text':request.save ? 'Сохранено!' : 'Ошибка сохранения',
        'type':request.save ? 'success': 'error'
    });

}