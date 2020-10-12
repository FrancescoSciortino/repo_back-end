var array_Articoli = [];

var postcontainer;
var modal;
var addPostBtn;

/* like */
function like(nome_pulsante_like){
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
function input_comment(user_id,text_id){
    var user = $(user_id).val();
    var comment = $(text_id).val();
    if(user == ""){
        user = "Anonimo";
    }
    if(comment == ""){
    }else{
        var testo_sopra = "<b>"+ user + "</b> scrive:";
        var nuovoDiv = $('<div class="containers commento rounded"><p class="comm_up_text text-break">' + testo_sopra +'</p><p class="comm_low_text text-break">' + comment + ' </p></div>');
        nuovoDiv.appendTo("#commenti" + int);
        comment.val("");
    }
}
/* modale */
function clean_modal(){
    $("#user_in_modal").val("");
    $("#categoria_in_modal").val("");
    $("#title_in_modal").val("");
    $("#text_in_modal").val("");
}
function Create_article_with_modal(id_modal_text,id_modal_user,id_modal_category,id_modal_title,id_modal_check_Featured,id_modal_check_Public){
    var testo = $(id_modal_text).val();
    if(testo==""){

    }else{
        var user = $(id_modal_user).val();
        var title = $(id_modal_title).val();
        var categoria = $(id_modal_category).val();
        if(user == ""){
            user = "<strong>Anonimo</strong>";
        }
        if(title == ""){
            title = "Senza Titolo";
        }
        if(categoria == ""){
            categoria = "ALL";
        }
        var articolo = new Articolo(categoria,title,testo,user);
        var checkBox_Featured = document.getElementById(id_modal_check_Featured);
        var checkBox_Public = document.getElementById(id_modal_check_Public);
        if(checkBox_Featured.checked == true){
            articolo.featured = true;
        }
        if(checkBox_Public.checked == false){
            articolo.public = false;
        }

        add_Article_to_Array(articolo);
        aggiorna_articoli();
        clean_modal();
        $("#Modal_add_article").modal("hide");
    }
}
function Create_article_with_modal(id_modal_text,id_modal_user,id_modal_category,id_modal_title,id_modal_check_Featured,id_modal_check_Public){
    var testo = $(id_modal_text).val();
    if(testo==""){

    }else{
        var user = $(id_modal_user).val();
        var title = $(id_modal_title).val();
        var categoria = $(id_modal_category).val();
        if(user == ""){
            user = "<strong>Anonimo</strong>";
        }
        if(title == ""){
            title = "Senza Titolo";
        }
        if(categoria == ""){
            categoria = "ALL";
        }
        var articolo = new Articolo(categoria,title,testo,user);
        var checkBox_Featured = document.getElementById(id_modal_check_Featured);
        var checkBox_Public = document.getElementById(id_modal_check_Public);
        if(checkBox_Featured.checked == true){
            articolo.featured = true;
        }
        if(checkBox_Public.checked == false){
            articolo.public = false;
        }

        add_Article_to_Array(articolo);
        aggiorna_articoli();
        clean_modal();
        $("#Modal_add_article").modal("hide");
    }
}
/* funzioni sugli articoli*/
function genera_html_Articolo(articolo){/* il'articolo va aggiunto PRIMA di generarne altri, consiglio di usare SOLO dentro appendi_Articolo() */
    
    var numero_art = $(".box_titolo_e_articolo").length;
    var nome_pulsante = "like_button" + numero_art;
    var id_comment_text_in = "#text_in" + numero_art;
    var id_comment_user_in = "#user_in" + numero_art;
    
    testo_completo = $('<div id="_box'+ numero_art +'" class= "col-12 col-lg-4"><div class="big_box rounded"><div class="box_titolo_e_articolo"><header><h2><b>' + articolo.categoria + '</b></h2></header><header><h1><em>'+ articolo.titolo +'</em></h1></header><p class="testo_articolo">' + articolo.testo + '</p></div><div class="row" style="width: 100%; margin-left: auto; margin-right: auto;"><footer class="col-9"><p class="text-truncate"><b>Articolo scritto da:</b>'+ articolo.autore +'</p></footer> <div class="like_div col-3"><button id="' + nome_pulsante +'" type="button" class="btn btn-secondary like_button float-right" onclick="like('+ nome_pulsante +')" data-toggle="button">Like</button></div><div id="commenti' + numero_art +'"></div><div  class="input-group mb-3"><input id="'+ id_comment_user_in + '" type="text" class="form-control" placeholder="Il tuo NickName"><div class="input-group-append"><button class="btn btn-outline-secondary bottoni_input" type="button" id="button-comment" onclick="input_comment('+ id_comment_user_in +','+ id_comment_text_in +')">Invia</button></div></div><div  class="input-group"><textarea id="' + id_comment_text_in + '" class="form-control" aria-label="With textarea" placeholder="Commenta..."></textarea></div></div></div>')
    return testo_completo;
}

function add_Article_to_Array(article){
    array_Articoli[array_Articoli.length] = new Articolo(article.categoria,article.titolo,article.testo,article.autore);
}

function appendi_Articolo(articolo){
    genera_html_Articolo(articolo).prependTo($("#row_container"));
}
function DeleteArticle_from_page(int){
    $("#_box" + int).detach();
}

function aggiorna_articoli(){
    var articolo_temp;
    for(var i = 0; i<array_Articoli.length;i++){
        articolo_temp = array_Articoli[i];
        DeleteArticle_from_page(i);
        array_Articoli[i] = articolo_temp;
    }
    for(var i = 0; i<array_Articoli.length;i++){
        appendi_Articolo(array_Articoli[i]);
    }
}
