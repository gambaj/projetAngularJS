
var cobra = new Cobra();
var room = "JoSaCo";
var url = null;
var socketId = null;
var apiUrl = 'http://cobra-framework.com:3000/api/events/' + room;

cobra.connectionCallback = function(){
    console.log("connection success to room " + room);
    cobra.joinRoom(room);
};

cobra.ajouterNote = function(note) {
    monDiagramme.model.nodeDataArray.forEach(function(ll) {
        if(ll.nodeTitre == note.node.nodeTitre) {
            console.log("Une note avec le même titre existe. Veuillez modifier le titre de votre note ou mettez à jour la note existante");
            note.existant = true;
        }
    });
    if(!note.existant){
        monDiagramme.startTransaction('addNode');
        monDiagramme.model.addNodeData(note.node);
        monDiagramme.commitTransaction('addNode');
    }
};

cobra.supprimerNote = function(titreNote) {
    monDiagramme.model.nodeDataArray.forEach(function(ll) {
        if(ll.nodeTitre == titreNote) {
            monDiagramme.startTransaction('removeNode');
            monDiagramme.model.removeNodeData(ll);
            monDiagramme.commitTransaction('removeNode');
        }
    });
};

cobra.joinRoomCallback = function(){
    $.ajax({
        type: 'GET',
        url: apiUrl,
        success: function () {
            console.log("success");
        },

        error: function () {
            console.log("error when retrieve events");
        },

        complete: function (result, status) {
            console.log("complete");

            for (var i = 0; i < result.responseJSON.Events.length; i++) {
                var content = JSON.parse(result.responseJSON.Events[i].content);
                if(content.message.action == "ajoutOuModification") {
                    var note = content.message.note;
                    note.node = {
                        nodeTitre: content.message.title,
                        nodeContenu: content.message.content,
                        nodeAuteurName: content.message.user,
                        nodeDateFinal: content.message.date
                    };
                    cobra.ajouterNote(note);
                }
            }
        }
    });
};

cobra.messageReceivedCallback = function(message){
    console.log("messageReceivedCallback");
    if(message.type == "infos"){
        console.log("infos");
        for(var i = 0; i < message.clients.length; i++)
        {
            var client = message.clients[i];
        }
        socketId = message.socketId;
        console.log("infos1111");
    }
    else {
        switch(message.message.action) {
            case "connexion" :
                console.log("Action " + message.message.action);
                if (socketId != message.socketId) {
                    $.notify(message.message.user + " vient de se connecter !", {className: 'info', position: "bottom left"});
                }
                break;

            case "ajoutOuModification" :
                console.log("Action " + message.message.action);
                var note = message.message.note;
                cobra.ajouterNote(note);
                if (socketId == message.socketId) {
                    if (note.existant) {
                        $.notify('"' + note.node.nodeTitre + '" existe deja.', {className: 'success', position: "top left"});
                    } else {
                        $.notify('"' + note.node.nodeTitre + '" vient d\'etre ajoute.', {className: 'success', position: "top left"});
                    }
                }
                else {
                    if (!note.existant) {
                        $.notify(note.node.nodeAuteurName + ' a ajoute la note : "' + note.node.nodeTitre + '".', {className: 'info', position: "bottom left"});
                    }
                }
                break;

            case "suppressionNote" :
                console.log("Action " + message.message.action);
                var noteTitre = message.message.title;
                cobra.supprimerNote(noteTitre);
                if (socketId == message.socketId) {
                    $.notify('"' + noteTitre + '" vient d\'etre supprime.');
                }
                else {
                    $.notify(message.message.user + ' a supprime la note : "' + noteTitre + '".', {className: 'info', position: "bottom left"});
                }
                break;

            default :
                console.log("Error action inconnu : " + message.message.action);
        }
    }
};