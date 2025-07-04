// **STRUCTURE dans FoliePsychique.js**
export const FOLIE_PSYCHIQUE_TABLE = {
    name: "Folie Psychique",
    description: "Table de folie psychique pour Alyria",
    formula: "1d100",
    results: [
        {
            range: [1, 1],
            text: "Un air de piano se fait entendre dans un rayon de 30m autour du lancceur, qui dure 10 minutes par point de psyché dépénsée au déclenchement de la folie.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Voux avez une voie tres aigue et nasillarde, comme si vous aviez inhalé de l'hélium, pendant la prochaine heure. Cela a tendance à agacer les autres, vos jet de statistique mineures liés au Charimse se font avec desaventage.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Le joueur qui a déclenché l'effet devient invisible pendant 10 minutes par point de psyché dépensée au déclenchement de la folie. L'effet ne peux etre révoquer de quelque manière que ce soit.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "un personnage présent se met a cree des fleurr et de l'herbe a chacun de ses pas pendant 20 minutes.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 100],
            text: "lance le sort 'Hurlement de l'Orage' un sort Expert de l'Arcane de Foudre, dans un rayon de 5m autrour du lanceur.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};