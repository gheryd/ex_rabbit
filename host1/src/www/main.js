var app = function(w,d, $){

var me = {};

$(function(){

    var msgForm = comps.msgForm($('#sendMessageForm'));

});


var comps = {};


comps.msgForm = function($box){
    var comp = {};
    
    $($box).find("button[type=submit]").click(submitSendMessage);

    function submitSendMessage(){
        var message = $($box).find("input[name=message]").val();
        $.ajax({
            url: '/service/send_message.php',
            data: {message: message},
            dataType: 'json',
            method: 'POST'
        }).done(function(data){
            console.log("data:", data);
        });
    }

    return comp;
};


return me;

}(window, document, jQuery);