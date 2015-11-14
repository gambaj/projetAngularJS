/**
 * Created by salsabile on 30-09-15.
 */


var $$ = go.GraphObject.make;
var monDiagramme = $$(go.Diagram,"divTableau",
    {
        initialContentAlignment: go.Spot.Center, // Center Diagram contents
        "undoManager.isEnabled": true  //interaction ctrl z,y, ...
    }
);

//Définir un modéle de noeuds simple

monDiagramme.nodeTemplate=
    $$(go.Node,"Vertical",
        {
            background: "lightyellow",
            minSize: new go.Size(200, 200)
        },
        new go.Binding("location", "loc"),
        $$(go.Panel,"Table",
            {
                defaultRowSeparatorStroke: "black"
            },
            $$(go.TextBlock,
                {
                    row: 0, margin: 3,
                    font: "bold 12pt sans-serif",
                    isMultiline: false, editable: true,
                    name : "name",
                    alignment: go.Spot.Center
                },
                new go.Binding("text","nodeTitre").makeTwoWay()),
            //$$(go.Panel,"Table",
            $$(go.TextBlock, new go.Binding("text","nodeContenu").makeTwoWay(),
                {
                    row: 1, margin: 3,alignment: go.Spot.Left,
                    font: "bold 10pt sans-serif",
                    isMultiline: true, editable: true

                }
            ),
            $$(go.TextBlock, new go.Binding("text","nodeAuteurName").makeTwoWay(),
                {
                    row: 2, margin: 3,alignment: go.Spot.Right,
                    font: "Comic Sans MS",stroke: "gray",
                    isMultiline: false, editable: false,
                    width: 70

                }
            ),
            $$(go.TextBlock, new go.Binding("text","nodeDateFinal").makeTwoWay(),
                {
                    row: 2, margin: 3,alignment: go.Spot.Left,
                    font: "Comic Sans MS",stroke: "red",
                    isMultiline: false, editable: false,
                    width: 200

                }
            )
            //)
        )

    );

//Ajout de l'overview
var myOverview = $$(go.Overview,"myOverviewDiv",{ observed: monDiagramme });