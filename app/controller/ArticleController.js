class ArticleController{

    constructor(array_Articoli_, context_pagina){
        var restController;
        var array_Articoli;
        this.array_Articoli = array_Articoli_;
        var url_output;
        var url_get;
        var modalName;
        var modalTitle;
        var modalText;
        var modalTags;
        var modalUser;
        var num_of_articles;
        var classiArticoliCS3;

        var editMode = false;

        
        this.url_output = "http://localhost:3000/tasks";
        this.url_get= "https://texty-89895.firebaseio.com/posts.json";
        
    

    }
    init(){
        var that = this;
        $(document).ready(function(){
            that.restController = new RestController();
            that.modalTitle = $("#title_in_modal");
            that.modalText = $("#text_in_modal");
            that.modalTags = $("#categoria_in_modal");
            that.modalUser = $("#user_in_modal");
            that.modalName = $("#Modal_add_article");
            that.num_of_articles = $("#n_of_elements");
            that.classiArticoliCS3 = ".box_titolo_e_articolo";

            that.get_array_from(that.url_get);






        });
    }

    
    

    /* like */
    like(nome_pulsante_like){
        var tasto = $(nome_pulsante_like);
        if(tasto.hasClass('btn-secondary')){
            $(nome_pulsante_like).removeClass('btn-secondary');
            $(nome_pulsante_like).addClass('btn-primary');
        }else if(tasto.hasClass('btn-primary')){
            $(nome_pulsante_like).removeClass('btn-primary');
            $(nome_pulsante_like).addClass('btn-secondary');
        }
    }
/* input commenti  CAMBIARE NOME */
    input_comment(int){
        var user = $("#user_in" + int).val();
        var comment = $("#text_in" + int).val();

        if(user == ""){
            user = "Anonimo";
        }
        if(comment == ""){
        }else{
            var testo_sopra = "<b>"+ user + "</b> scrive:";
            var nuovoDiv = $('<div class="containers commento rounded"><p class="comm_up_text text-break">' + testo_sopra +'</p><p class="comm_low_text text-break">' + comment + ' </p></div>');
            nuovoDiv.appendTo("#commenti" + int);
            $("#text_in" + int).val("");
        }
    }
    /* modale */
    clean_modal(){
        this.modalUser.val("");
        this.modalTags.val("");
        this.modalTitle.val("");
        this.modalText.val("");
    } genera_id(article){
        
        var lettere = [];
        lettere[0] = article.testo.charAt(0);
        if(lettere[0] = " "){
            lettere[0] = "_";
        }
        lettere[1] = article.testo.charAt((article.testo.length - 1));
        if(lettere[1] = " " || typeof lettere[1] == undefined){
            lettere[1] = "_";
        }
        lettere[2] = article.titolo.charAt(0);
        if(lettere[2] = " "){
            lettere[2] = "_";
        }
        lettere[3] = article.testo.charAt(article.titolo.length - 1);
        if(lettere[3] = " " || typeof lettere[3] == undefined){
            lettere[3] = "_";
        }
        var string_id = "-MJ0";
        for(var i = 0; i<lettere.length;i++){
            string_id += lettere[i];
        }
        string_id += "-KBd" + lettere.length +"_pa"+ "jPV";

        return string_id;
    }


    Create_article_with_modal(id_modal_text,id_modal_user,id_modal_tags,id_modal_title,id_modal_check_Featured,id_modal_check_Public,id_Articolo_modal){
        var testo = $(id_modal_text).val();
        if(testo==""){

        }else{
            var user = $(id_modal_user).val();
            var title = $(id_modal_title).val();
            var tags = $(id_modal_tags).val();
            if(user == ""){
                user = "<strong>Anonimo</strong>";
            }
            if(title == ""){
                title = "Senza Titolo";
            }
            if(tags == ""){
                tags = "ALL";
            }
            tags = tags.replace(","," ");
            var tag_ = this.tags_to_array(tags);
            var taggg = [];
            for(var i = 0;i<tag_.length;i++){
                if(tag_[i] != "" && tag_[i] != " "){
                    taggg.push(tag_[i]);
                }
            }
            var articolo = new Articolo(taggg,title,testo,user);
            /** */
            articolo.id = id_Articolo_modal;

            if($(id_modal_check_Featured).prop("checked") == true){
                articolo.featured = true;
            }
            if($(id_modal_check_Public).prop("checked")  == false){
                articolo.public = false;
            }

            this.add_Article_to_Array(articolo);

            /*
            this.post_article_to( this.url_output, article);*/
            this.update_article_online(this.genera_id(articolo),articolo);

            this.aggiorna_articoli();
            this.clean_modal();
            this.modalName.modal("hide");
        }
    }
    /* funzioni sugli articoli*/
    genera_html_Articolo(articolo){/* il'articolo va aggiunto PRIMA di generarne altri, consiglio di usare SOLO dentro appendi_Articolo() */
        
        var numero_art = $(this.classiArticoliCS3).length;   /* aggiustare con funzione che cerca primo num libero */
        var nome_pulsante = "like_button" + numero_art;
        var id_comment_text_in = "text_in" + numero_art;
        var id_comment_user_in = "user_in" + numero_art;
        var featured = "";
        var draft = "";
        if(articolo.featured == true){
            featured = "featured ";
        }
        if(articolo.public == false){
            draft = "draft ";
        }
        var tagstring;
        if(Array.isArray(articolo.tag)){
            tagstring = this.article_tags_to_string(articolo);
        }else{
            tagstring = articolo.tag;
        }
        var testo_completo = $('<div id="_box'+ numero_art +'" class= "col-12 col-lg-4"><div class="big_box rounded '+ featured + draft + '"><div class="box_titolo_e_articolo"><header><h2><b>' + tagstring + '</b></h2></header><header><h1><em>'+ articolo.titolo +'</em></h1></header><p class="testo_articolo">' + articolo.testo + '</p></div><div class="row" style="width: 100%; margin-left: auto; margin-right: auto;"><footer class="col-9"><p class="text-truncate"><b>Articolo scritto da:</b>'+ articolo.autore +'</p></footer> <div class="like_div col-3"><button id="' + nome_pulsante +'" type="button" class="btn btn-secondary like_button float-right" onclick="controllore.like('+ nome_pulsante +')" data-toggle="button">Like</button></div><div id="commenti' + numero_art +'"></div><div  class="input-group mb-3"><input id="'+ id_comment_user_in + '" type="text" class="form-control" placeholder="Il tuo NickName"><div class="input-group-append"><button class="btn btn-outline-secondary bottoni_input" type="button" id="button-comment'+ numero_art +'" onclick="controllore.input_comment(' + numero_art +')">Invia</button></div></div><div  class="input-group"><textarea id="' + id_comment_text_in + '" class="form-control" aria-label="With textarea" placeholder="Commenta..."></textarea></div></div></div>');
        
        return testo_completo;
    }

    add_Article_to_Array(article){

        array_Articoli[array_Articoli.length] = new Articolo(article.tag,article.titolo,article.testo,article.autore);
    }

    appendi_Articolo(articolo){
        if(articolo.featured == true){
            this.genera_html_Articolo(articolo).prependTo($("#row_container"));
        }else{
            this.genera_html_Articolo(articolo).insertAfter($("#sep"));
        }
    }
    DeleteArticle_from_page(int){
        $("#_box" + int).detach();
    }
    article_tags_to_string(articolo){
        
        var tag_string = "";
        for(var i = 0;i<articolo.tag.length;i++){
            var s = articolo.tag[i].charAt(0).toUpperCase() + articolo.tag[i].slice(1);
            tag_string += s + " ";
        }
        return tag_string;
    }
    tags_to_array(tags){
        var array_t = [];
        var array = tags.split(" ");
        if(Array.isArray(array)){
            array_t = array;
        }else{
            array_t.push(array);
        }
        return array_t;
    }

    aggiorna_articoli(){
        var articolo_temp;
        for(var i = 0; i<array_Articoli.length;i++){
            articolo_temp = array_Articoli[i];
            this.DeleteArticle_from_page(i);
            array_Articoli[i] = articolo_temp;
        }
        for(var i = 0; i<array_Articoli.length;i++){
            this.appendi_Articolo(array_Articoli[i]);
        }
        var numero_art = $(this.classiArticoliCS3).length;
        this.num_of_articles.html(numero_art);
    }

    /* "https://api.npoint.io/24620ef625c768a4f3c4" */
    get_array_from(){
        var that = this;
        this.restController.get(this.url_get, function(data,status,xhr){
                if(Array.isArray(data)){
                    for(var i = 0;i<data.length;i++){
                        that.array_Articoli.push(that.transform_array(data[i]));
                    }
                }else{
                    if(data === null){}else{
                    var array_id = Object.keys(data);
                    for(var i = 0;i<array_id.length;i++){
                        if(that.check_integry(data[array_id[i]])){
                            that.array_Articoli.push(that.transform_key_value_to_article(array_id[i],data[array_id[i]]));
                        }}
                    }

                }
            
            that.aggiorna_articoli();
        });
    }
    post_article_to(url,articolo){
        var that = this;
        var dato_output = this.transform_article_to_key_value(articolo);
        this.restController.post(this.url_output, dato_output, function(){

        });
    }

    update_article_online(id,articolo){
        var dato_output = this.transform_article_to_key_value(articolo);
        this.restController.update(this.url_output,id, dato_output, function(){
        });
    }
    delete_article_from_server(articolo){
        var that = this;
        this.restController.delete(this.url_output,articolo.id, function(){
            
        that.DeleteArticle_from_page(that.array_Articoli.indexOf(articolo));
        });
    }
    delete_article_byID_from_server(id_){
        var that = this;
        this.restController.delete(this.url_output,id_, function(){
            var index_article;
            for(var i = 0;i<that.array_Articoli.lenth;i++){
                if(that.array_Articoli[i].id == id_){
                    index_article = i;
                }
            }
        that.DeleteArticle_from_page(index_article);
        });
    }

    transform_array(backArticle){
        var testo = backArticle.body;
        var titolo = backArticle.title;
        var tags = backArticle.tag;
        var pubblico = backArticle.public;
        var preferito = backArticle.featured;
    
        var articolo = new Articolo(tags,titolo,testo,"<strong>Anonimo</strong>");
        articolo.public = pubblico;
        articolo.featured = preferito;
        return articolo;
    }

    transform_key_value_to_article(index, element){
        var testo = element.body;
        var titolo = element.title;
        var tags = element.tag;
        var pubblico = element.public;
        var preferito = element.featured;
    
        var articolo = new Articolo(tags,titolo,testo,"<strong>Anonimo</strong>");
        articolo.public = pubblico;
        articolo.featured = preferito;
        articolo.id = index;
        
        return articolo;

    }
    transform_article_to_key_value(article){
        var element = {body: article.testo,featured: article.featured, public: article.public, tag: article.tag, title: article.titolo};
        /*var ritorno = {};
        ritorno[article.id] = element;*/
        return element;
    }
    check_integry(element){
        if(typeof element.body == undefined || element.body == "undefined"){
            return false;
        }else if(typeof element.title == undefined || element.title == "undefined"){
            return false;
        }else if(typeof element.tag == undefined){
            return false;
        }else if(typeof element.public == undefined){
            return false;
        }else{
            return true;
        }
        
    }open_modal(articolo){

    }


}