/**
 * Déclaration du contrôleur de l'application permettant de gérer le formulaire.
 */
notesInteractives.controller('formulaireController', ['$scope', 'noteFactory',
    function ($scope, noteFactory) {

        $scope.roomTest = "JoSaCo";

        $scope.envoyerNoteCobra = function() {

            var action="ajoutOuModification";
            var title = $("#textInputTitle").val();
            var content = $("#textInputText").val();
            var user = $("#textInputSession").val();
            var date = $("#textInputDate").val();
            var note = noteFactory;

            if(title && content && user) {
                note.initialiser(title, content, user, date);
                var message={action:action,title:title, content: content, user: user, date: date, note : note};
                console.log("Envoyer note a " + $scope.roomTest);
                cobra.sendMessage(message, $scope.roomTest, true);
                $("#textInputTitle").val("");
                $("#textInputText").val("");
                $("#textInputDate").val("");
                $("#textInputTitle").focus();
            }
        };

        $scope.supprimerNoteCobra = function() {
            var action="suppressionNote";
            var title = $("#textInputNote").val();
            var user = $("#textInputSession").val();
            if(title) {
                var message={action:action,title:title, user:user};
                console.log("Supprimer note a " + $scope.roomTest);
                cobra.sendMessage(message, $scope.roomTest, true);
                $("#textInputNote").val("");
            }
        };
    }
]);


