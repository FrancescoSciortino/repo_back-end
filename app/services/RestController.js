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
            data:JSON.stringify(data),
            success: onSuccess
          });


    }

    update(url,id,dato,onSuccess,onError){
        var that = this;
        var url_changed = url.replace(".json", "/" + id + ".json");
        $.ajax({
            url: url_changed,
            type: "PUT",
            data: JSON.stringify(dato),
            success: onSuccess
        });
        
    }
    delete(url,id,onSuccess,onError){
        var that = this;
        var url_changed = url.replace(".json", "/" + id + ".json");
        $.ajax({
            url: url_changed,
            type: "DELETE",
            success: onSuccess
        });
        
    }


}