class RestController{


    constructor(){        
    }



    get(url,onSuccess,onError){
        $.get({
            url: url,
            success: onSuccess
          });


    }

    post(url,data,onSuccess,onError){
        $.post({
            url: url,
            data: data,
            success: onSuccess
          });


    }

    update(url,id,dato,onSuccess,onError){
        var that = this;
        var url_changed = url+ "/" + id;
        $.ajax({
            url: url_changed,
            type: "PUT",
            data: dato,
            success: onSuccess
        });
        
    }
    delete(url,id,onSuccess,onError){
        var that = this;
        var url_changed = url+ "/" + id;
        $.ajax({
            url: url_changed,
            type: "DELETE",
            success: onSuccess
        });
        
    }


}