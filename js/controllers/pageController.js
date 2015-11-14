/**
 * Déclaration du contrôleur de l'application permettant l'initialisation du site.
 */
notesInteractives.controller('pageController', ['$scope',
    function ($scope) {

        /**
         * Cette fonction initialise la taille de la page et le formulaire
         */
        $scope.initialisation = function () {
            $scope.fixerTailleEcran();
            $scope.configurerDate();
            $scope.cacherFormulaire();
        };

        /**
         * Cette fonction fixe la taille des deux blocs principaux à la taille de l'ecran.
         */
        $scope.fixerTailleEcran = function () {
            $scope.calculerHauteur('divTableau');
            $scope.calculerHauteur('divMenu');
        };

        /**
         * Cette fonction calcule la taille verticale de l'ecran en pixel et la fixe à un bloc.
         * @param bloc le bloc dont on souhaite modifier la taille.
         */
        $scope.calculerHauteur = function (bloc) {
            if(typeof( window.innerWidth )=='number')
                var hauteur = window.innerHeight;
            else if( document.documentElement && document.documentElement.clientHeight )
                var hauteur = document.documentElement.clientHeight;

            document.getElementById(bloc).style.height = hauteur+"px";
        };

        /**
         * Cette fonction cache le formulaire.
         */
        $scope.cacherFormulaire = function () {
            $("#formulaire").hide();
            $("#impression").hide();
        };

        /**
         * Cette fonction initialise le format du champ "date".
         */
        $scope.configurerDate = function() {
            $('.datetime').datetimepicker({
                dateFormat: "dd/mm/yy",
                timeFormat:  "HH:mm",
                language:  'fr',
                weekStart: 1,
                todayBtn:  1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1,
                startDate: '+0d'
            });
        };

        /**
         * Cette fonction telecharge l'image du diagramme de post-it.
         */
        $scope.genererImage = function() {
            var imgData = monDiagramme.makeImageData({
                scale: 1
            });

            $("#imgLink").attr('href', imgData);
            $("#imgLink")[0].click();
        };
    }
]);

