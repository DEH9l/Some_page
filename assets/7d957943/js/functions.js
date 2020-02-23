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