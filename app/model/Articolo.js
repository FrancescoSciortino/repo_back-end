class Articolo{
        /* 4 categoria titolo testo e autore */
        constructor(tag,titolo,testo,autore){
        this.id = "temp";
        this.testo = testo;
        this.titolo = titolo;
        this.autore = autore;
        this.featured = false;
        this.piace = false;
        this.tag = [];
        if(Array.isArray(tag)){
                this.tag = tag;
        }
        this.public = true;
        }
}