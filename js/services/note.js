notesInteractives.provider("noteFactory", function(){


    function NoteFactory() {

        this.node = false;
        this.existant = false;

        this.creation = function (contenu, auteur, echeance) {
            if (contenu != undefined || contenu != null) {
                this.initialiser(contenu, auteur, echeance);
                this.ajoutDiagramme();
            }
        };

        this.initialiser = function (titre, contenu, auteur, echeance) {
            this.node = {
                nodeTitre: titre,
                nodeContenu: contenu,
                nodeAuteurName: auteur,
                nodeDateFinal: echeance
            };
        };
    }

    this.$get = function() {
        return new NoteFactory();
    }
});