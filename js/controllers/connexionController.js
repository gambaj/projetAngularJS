/**
 * Déclaration du contrôleur de l'application permettant de gérer le formulaire.
 */
notesInteractives.controller('connexionController', ['$scope',
    function ($scope) {

        $scope.roomTest = "JoSaCo";

        $scope.$watch('name', function(value){
            $scope.name = angular.uppercase($scope.name.substr(0,1)) + $scope.name.substr(1).toLowerCase();
        });

        /**
         * Cette fonction affiche le formulaire lorsque l'utilisateur se connecte.
         */
        $scope.connexion = function () {
            var name = $scope.name.trim();
            var action="connexion";
            if (name.length > 0) {
                $('#formulaire').show();
                $('#impression').show();
                var message={action:action, user:name};
                cobra.connect("http://cobra-framework.com:8080");
                setTimeout(function(){ cobra.sendMessage(message, $scope.roomTest, true); }, 3000);
            } else {
                $('#textInputSession').notify("Veuillez saisir votre nom.", {
                    className: 'error',
                    position: "bottom left"
                });
            }
        };
    }
]);


