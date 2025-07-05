// **STRUCTURE dans FoliePsychique.js**
export const FOLIE_PSYCHIQUE_TABLE = {
    name: "Folie Psychique",
    description: "Table de folie psychique pour Alyria",
    formula: "1d100",
    results: [
        {
            range: [1, 1],
            text: "Un air de piano se fait entendre dans un rayon de 30m autour du lanceur, qui dure 10 minutes par point de psyché dépensée au déclenchement de la folie.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Vous avez une voix très aiguë et nasillarde, comme si vous aviez inhalé de l'hélium, pendant la prochaine heure. Cela a tendance à agacer les autres, vos jets de statistique mineures liés au Charisme se font avec désavantage.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Le joueur qui a déclenché l'effet devient invisible pendant 10 minutes par point de psyché dépensée au déclenchement de la folie. L'effet ne peut être révoquer de quelque manière que ce soit.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Un personnage présent se met à créer des fleurs et de l'herbe à chacun de ses pas pendant 20 minutes.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 100],
            text: "Lance le sort 'Hurlement de l'Orage' un sort Expert de l'Arcane de Foudre, dans un rayon de 5m autour du lanceur.",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

// **TABLES TRAITS D'ARMES**
export const TRAITS_ARMES_COMMUNS_TABLE = {
    name: "Traits d'Armes Communs",
    description: "Table de traits communs pour les armes d'Alyria",
    formula: "1d38",
    results: [
        {
            range: [1, 1],
            text: "Habile - +1 à la Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Perspicace - +1 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Costaud - +1 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Joli - +1 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Solide - +1 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Chanceux - +1 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Apte - +5 dans une statistique mineure choisie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Violent - +1 au dégât de l'arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "Roublarde - Sur un CC applique une altération d'état choisie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Affûté - +5% de chance de CC",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Bénéfique - Transforme les dégâts de l'arme en soin",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Perçant - Divise les dégâts par 2, inflige des dégâts perce armure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Long - Augmente la portée de 5m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Erudit - Donne accès à un sortilège Novice choisi",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Revanchard - Inflige 2 dégâts à un assaillant au corps à corps une fois par tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Bloquant - +5% aux chances de blocage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Large - Divise les dégâts par 2, inflige en zone croix d'une case",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Polyvalent - Ajoute un type de touche supplémentaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Hybride - Ajoute une catégorie à l'arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Averti - +10 dans une statistique mineure dans une condition précise",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [21, 21],
            text: "Opportuniste - +5% de chance de toucher si un allié est au corps à corps de la cible",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [22, 22],
            text: "Double - Après une touche réussie, deuxième jet sur la moitié de la statistique",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [23, 23],
            text: "Rapide - +1 cran de vitesse après une attaque réussie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [24, 24],
            text: "Esotérique - +1 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [25, 25],
            text: "Discret - Arme cachée en toute circonstance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [26, 26],
            text: "Clinquant - Avantage sur les jets de ciblage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [27, 27],
            text: "Doré - Double la valeur de l'arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [28, 28],
            text: "Médicinal - Sort zone carré de 2 qui soigne 1d4+1",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [29, 29],
            text: "Traqueur - +10% de chance de touche sur un type d'ennemi précis",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [30, 30],
            text: "Eclairé - Produit une faible lumière de bougie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [31, 31],
            text: "Sûr - Divise les dégâts max par 2, dégâts fixes",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [32, 32],
            text: "Broyeur - Ignore 1 d'armure avant calcul",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [33, 33],
            text: "Néfaste - Divise dégâts par 2, applique Brulure/Poison/Engelure/Entrave/Hémorragie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [34, 34],
            text: "Aérodynamique - Peut être lancée jusqu'à 15m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [35, 35],
            text: "Sain - +1 aux soins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [36, 36],
            text: "Amortissant - 2 PB en début de combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [37, 37],
            text: "Libre - Peut être prise sans consommer l'action",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [38, 38],
            text: "Mouvant - Pousse la cible de 5m après les dégâts",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

export const TRAITS_ARMES_RARES_TABLE = {
    name: "Traits d'Armes Rares",
    description: "Table de traits rares pour les armes d'Alyria",
    formula: "1d40",
    results: [
        {
            range: [1, 1],
            text: "Habile - +1 en Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Perspicace - +1 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Costaud - +1 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Joli - +1 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Solide - +1 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Chanceux - +1 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Doué - +10 dans une statistique mineure choisie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Furieux - +2 aux dégâts de l'arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "Vicieux - Sur un CC applique une altération + 5% de chance de CC",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Aiguisé - +10% de chance de CC",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Bénéfique - Transforme les dégâts en soin",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Perforant - Réduit dégâts de 3, inflige dégâts perce armure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Lointain - +10m de portée (distance uniquement)",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Mage - Donne accès à un sortilège Confirmé",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Epineux - Inflige 4 dégâts à un assaillant une fois par tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Obstruant - +10% aux chances de blocage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Volumineux - Divise dégâts par 2, zone croix de 2 cases",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Multiple - Type de touche selon meilleure statistique",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Destructeur - CC = dégâts maximisés",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Professionnel - +20 dans une mineure ou +10 dans 2",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [21, 21],
            text: "Profiteur - +10% toucher et +5% CC si allié au corps à corps",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [22, 22],
            text: "Glissant - Ignore attaques d'opportunité après touche",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [23, 23],
            text: "Sprinteur - +1 cran de vitesse permanent",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [24, 24],
            text: "Magique - +2 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [25, 25],
            text: "Camouflé - Arme discrète + utilisation discrète",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [26, 26],
            text: "Tape à L'œil - Avantage ciblage actif 2 tours",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [27, 27],
            text: "Platiné - Triple la valeur de l'arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [28, 28],
            text: "Médical - Sort zone carré de 3 qui soigne 1d6+1",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [29, 29],
            text: "Chasseur - +15% toucher et +10% CC sur un type d'ennemi",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [30, 30],
            text: "Lumineux - Lumière de torche",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [31, 31],
            text: "Certain - Réduit dégâts max de 4, dégâts fixes",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [32, 32],
            text: "Robuste - +1 en constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [33, 33],
            text: "Ecraseur - Ignore 2 d'armure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [34, 34],
            text: "Virulent - Réduit dégâts de 4, applique Brulure/Poison/Engelure/Hémorragie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [35, 35],
            text: "Retour - Lance 15m et revient",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [36, 36],
            text: "Sacré - +2 aux soins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [37, 37],
            text: "Absorbant - 4 PB en début de combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [38, 38],
            text: "Jumeaux - Sépare dégâts pour 2 cibles",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [39, 39],
            text: "Mobile - Pousse 5m OU bouge utilisateur 5m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [40, 40],
            text: "Infusé - Consomme 2 PSY, ajoute moitié DSB aux dégâts",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

export const TRAITS_ARMES_EPIQUES_TABLE = {
    name: "Traits d'Armes Épiques",
    description: "Table de traits épiques pour les armes d'Alyria",
    formula: "1d25",
    results: [
        {
            range: [1, 1],
            text: "Acrobatique - +2 en Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Ingénieux - +2 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Puissant - +2 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Splendide - +2 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Incassable - +2 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Veinard - +2 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Génie - +20 dans une statistique mineure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Brutal - +4 aux dégâts de l'arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "Sadique - CC irrésistible + 10% de chance de CC",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Affilé - +15% de chance de CC",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Pénétrant - Inflige dégâts perce armure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Retiré - +20m de portée (distance)",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Sage - Donne accès à un sortilège Expert",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Vengeur - Inflige 6 dégâts à assaillant, 2x par tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Hermétique - +15% aux chances de blocage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Maitrise - +30 dans une mineure ou +10 dans 3",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Psychique - +4 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Invisible - Arme visible que pour utilisateur",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Eblouissant - Cécité irrésistible 20m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Inébranlable - +2 en constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [21, 21],
            text: "Ferrailleur - Ignore 4 armure + réduit armure cible",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [22, 22],
            text: "Fatale - Applique altération irrésistible",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [23, 23],
            text: "Céleste - +3 aux soins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [24, 24],
            text: "Triplé - Sépare dégâts pour 3 cibles",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [25, 25],
            text: "Tamponneur - Pousse cible de 10m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

export const TRAITS_ARMES_LEGENDAIRES_TABLE = {
    name: "Traits d'Armes Légendaires",
    description: "Table de traits légendaires pour les armes d'Alyria",
    formula: "1d35",
    results: [
        {
            range: [1, 1],
            text: "Mazul - +4 en Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Arintiël - +4 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Kardös - +4 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Santis - +4 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Forgeterre - +4 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Scélenis - +4 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Divin - +40 dans une statistique mineure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Oroun - +4 en constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "L'Antépénultième - +4 en Intelligence",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Archimage - Sortilège Maitre 1x par combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Brutal - +4 aux dégâts de l'arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Sadique - CC irrésistible + 10% de chance de CC",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Affilé - +15% de chance de CC",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Pénétrant - Inflige dégâts perce armure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Retiré - +20m de portée (distance)",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Sage - Donne accès à un sortilège Expert",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Vengeur - Inflige 6 dégâts à assaillant, 2x par tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Hermétique - +15% aux chances de blocage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Maitrise - +30 dans une mineure ou +10 dans 3",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Psychique - +4 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [21, 21],
            text: "Invisible - Arme visible que pour utilisateur",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [22, 22],
            text: "Eblouissant - Cécité irrésistible 20m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [23, 23],
            text: "Inébranlable - +2 en constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [24, 24],
            text: "Ferrailleur - Ignore 4 armure + réduit armure cible",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [25, 25],
            text: "Fatale - Applique altération irrésistible",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [26, 26],
            text: "Céleste - +3 aux soins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [27, 27],
            text: "Triplé - Sépare dégâts pour 3 cibles",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [28, 28],
            text: "Tamponneur - Pousse cible de 10m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [29, 29],
            text: "Runique - Consomme 3 PSY, ajoute DSB aux dégâts",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [30, 30],
            text: "Machiavélique - Applique Cécité/Terreur/Sonné/Charme/Sommeil/Folie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [31, 31],
            text: "Régénérant - Récupère 2 PSY à chaque touche",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [32, 32],
            text: "Déphasé - Ignore résistances adverses",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [33, 33],
            text: "Dissimulant - Invisible début combat + action",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [34, 34],
            text: "Polymorphe - Catégorie et trait changent à l'utilisation",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [35, 35],
            text: "Surchargé - Double le dé de dégâts 1x par combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

// **TABLES TRAITS D'ARMURES** (existantes)
export const TRAITS_ARMURES_COMMUNS_TABLE = {
    name: "Traits d'Armures Communs",
    description: "Table de traits communs pour les armures d'Alyria",
    formula: "1d38",
    results: [
        {
            range: [1, 1],
            text: "Habile - +1 en Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Perspicace - +1 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Costaud - +1 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Joli - +1 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Solide - +1 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Chanceux - +1 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Doué - +10 dans une statistique mineure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Malin - +1 en Intelligence",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "Insensible - Immunité à une altération aléatoire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Visée - +5m portée compétences Distance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Erudit - Donne accès à un sortilège Novice",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Revanchard - Inflige 2 dégâts à assaillant une fois par tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Bloquant - +5% aux chances de blocage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Professionnel - +20 dans une mineure ou +10 dans 2",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Esotérique - +1 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Bling - Supprime premier malus ciblage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Doré - Double la valeur de l'équipement",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Eclairé - Lumière de bougie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Costaud - +1 en constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Sain - +1 aux soins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [21, 21],
            text: "Amortissant - 2 PB en début de combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [22, 22],
            text: "Portatif - Divise place inventaire par 2",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [23, 23],
            text: "Fourbi - +2 places d'inventaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [24, 24],
            text: "Typé - +5% toucher et CC avec une catégorie d'arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [25, 25],
            text: "Leste - +1 cran vitesse premier tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [26, 26],
            text: "Repoussant - Adversaire attaque allié en priorité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [27, 27],
            text: "Elémentaire - Résistance aléatoire + faiblesse aléatoire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [28, 28],
            text: "Nyctalopie - Vision dans le noir",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [29, 29],
            text: "Maçon - +1 dégâts à mains nues",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [30, 30],
            text: "Planant - Volant premier tour + planer hors combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [31, 31],
            text: "Ajusté - +1 d'armure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [32, 32],
            text: "Purificateur - Supprime altérations sous 25% PV",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [33, 33],
            text: "Restauration - Récupère 2 PSY et PV fin combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [34, 34],
            text: "Etudiant - Sortilège novice supplémentaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [35, 35],
            text: "Novice - Sortilèges novices coûtent 1 PSY de moins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [36, 36],
            text: "Equivalence - Transforme type de touche 1x par combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [37, 37],
            text: "Outillage - Outils d'artisanat de base",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [38, 38],
            text: "Renforçant - +1 aux boucliers",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

export const TRAITS_ARMURES_RARES_TABLE = {
    name: "Traits d'Armures Rares",
    description: "Table de traits rares pour les armures d'Alyria",
    formula: "1d40",
    results: [
        {
            range: [1, 1],
            text: "Acrobatique - +2 en Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Ingénieux - +2 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Puissant - +2 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Splendide - +2 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Incassable - +2 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Veinard - +2 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Génie - +20 dans une statistique mineure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Réfléchi - +2 en Intelligence",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "Pugnace - Immunité à une altération choisie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Verrouillage - +10m portée compétences Distance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Mage - Donne accès à un sortilège Confirmé",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Epineux - Inflige 4 dégâts à assaillant une fois par tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Obstruant - +10% aux chances de blocage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Professionnel - +20 dans une mineure ou +10 dans 2",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Magique - +2 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Bling-Bling - Supprime 2 premiers malus ciblage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Platiné - Triple la valeur de l'équipement",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Lumineux - Lumière de torche",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Robuste - +2 en constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Sacré - +2 aux soins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [21, 21],
            text: "Absorbant - 4 PB en début de combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [22, 22],
            text: "Planaire - Stocké dans plan dimensionnel",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [23, 23],
            text: "Barda - +4 places d'inventaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [24, 24],
            text: "Stéréotypé - +10% toucher et CC avec catégorie arme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [25, 25],
            text: "Fulgurant - +1 cran vitesse permanent",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [26, 26],
            text: "Evitement - Bouge 5m après blocage corps à corps",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [27, 27],
            text: "Elémentariste - Résistance choisie + faiblesse choisie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [28, 28],
            text: "Cow-Boy - +2 dégâts à mains nues",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [29, 29],
            text: "Orgueilleux - 10% critique hors combat sur catégorie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [30, 30],
            text: "Destiné - Avantage sur une statistique mineure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [31, 31],
            text: "Purgeant - Supprime altérations sans action",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [32, 32],
            text: "Animé - Objet peut parler et raconter",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [33, 33],
            text: "Conseiller - Sortilège confirmé supplémentaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [34, 34],
            text: "Confirmé - Sortilèges confirmés coûtent 1 PSY de moins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [35, 35],
            text: "Equitable - 2x transformation type touche par combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [36, 36],
            text: "Atelier - Atelier mobile d'artisanat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [37, 37],
            text: "Colmatant - +2 aux boucliers",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [38, 38],
            text: "Bagarreur - +4 dégâts attaques opportunité, -2 reçues",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [39, 39],
            text: "Télépathe - Communication mentale 20m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [40, 40],
            text: "Secouriste - Garde 1PV au lieu de mourir",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

export const TRAITS_ARMURES_EPIQUES_TABLE = {
    name: "Traits d'Armures Épiques",
    description: "Table de traits épiques pour les armures d'Alyria",
    formula: "1d30",
    results: [
        {
            range: [1, 1],
            text: "Vif - +3 en Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Clairvoyant - +3 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Féroce - +3 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Magnifique - +3 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Indestructible - +3 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Bienheureux - +3 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Prophétique - +30 dans une statistique mineure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Sage - Donne accès à un sortilège Expert",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "Vengeur - Inflige 6 dégâts à assaillant, 2x par tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Hermétique - +15% aux chances de blocage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Maitrise - +30 dans une mineure ou +10 dans 3",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Psychique - +4 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Eblouissant - Cécité irrésistible 20m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Inébranlable - +3 en constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Céleste - +3 aux soins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Engloutissant - 8 PB en début de combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Bardator - +8 places d'inventaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Cérébral - +3 en Intelligence",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Elementaliste - Résistance à un élément choisi",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Forain - +3 dégâts à mains nues",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [21, 21],
            text: "Elu - Avantage sur catégorie statistiques mineures",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [22, 22],
            text: "Résurgent - Supprime altérations + soigne + immunité 1 tour",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [23, 23],
            text: "Adorateur - 2 sorts coûtent 2 PSY de moins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [24, 24],
            text: "Blindé - +3 d'armure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [25, 25],
            text: "Acharné - 2 relances par combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [26, 26],
            text: "Professeur - Sortilège Expert supplémentaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [27, 27],
            text: "Expert - Sortilèges Expert coûtent 1 PSY de moins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [28, 28],
            text: "Buvard - Récupère 2PV si inflige dégâts corps à corps",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [29, 29],
            text: "Dément - Décharge 6 PSY surcharge locale",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [30, 30],
            text: "Admirateur - Sort Expert de n'importe quelle Voie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

export const TRAITS_ARMURES_LEGENDAIRES_TABLE = {
    name: "Traits d'Armures Légendaires",
    description: "Table de traits légendaires pour les armures d'Alyria",
    formula: "1d20",
    results: [
        {
            range: [1, 1],
            text: "Mazul - +4 en Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Arintiël - +4 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Kardös - +4 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Santis - +4 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Forgeterre - +4 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Scélenis - +4 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Divin - +40 dans une statistique mineure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Oroun - +4 en constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "L'Antépénultième - +4 en Intelligence",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Archimage - Sortilège Maitre 1x par combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Représailles - Inflige 5 dégâts à tout assaillant",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Maitre - +40 dans une mineure ou +10 dans 4",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Fantasmagorique - +6 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Blindé - +3 d'armure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Impérial - Échec devient réussite critique",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Admirateur - Sort Expert de n'importe quelle Voie",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Joker - +5 dans toutes les statistiques mineures",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Bastion - 2 résistances ou 1 immunité élémentaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Invincible - Invulnérable 1 tour (recharge 24h)",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Négation - Immunité altérations d'une stat majeure",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};

// **AJOUT : TABLE DES IMPERFECTIONS COMPLÈTE**
export const IMPERFECTIONS_TABLE = {
    name: "Imperfections",
    description: "Table des imperfections pour les équipements d'Alyria",
    formula: "1d40",
    results: [
        {
            range: [1, 1],
            text: "Maladroit - Retire -2 en Dextérité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [2, 2],
            text: "Impotent - Retire -2 en Sagesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [3, 3],
            text: "Chétif - Retire -2 en Force",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [4, 4],
            text: "Laid - Retire -2 en Charisme",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [5, 5],
            text: "Fragile - Retire -2 en Défense",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [6, 6],
            text: "Infortuné - Retire -2 en Chance",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [7, 7],
            text: "Inapte - Retire -10 dans deux statistiques mineures aléatoires",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [8, 8],
            text: "Pacifiste - Retire -2 aux dégâts",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [9, 9],
            text: "Grossier - Retire 10% de chance de CC",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [10, 10],
            text: "Farceur - Malus de 10% aux jets de touche",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [11, 11],
            text: "Court - Réduit la portée de 10m (arme à distance uniquement)",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [12, 12],
            text: "Masochiste - +2 dégâts subis au corps à corps",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [13, 13],
            text: "Gênant - Retire 10% aux chances de blocage",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [14, 14],
            text: "Poissard - Augmente les chances d'EC de 10%",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [15, 15],
            text: "Naïf - Malus de 30 dans une statistique mineure dans une condition précise",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [16, 16],
            text: "Lente - Retire un cran en vitesse",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [17, 17],
            text: "Préoccupant - Retire -3 PSY",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [18, 18],
            text: "Bruyante - Produit un bruit fort et constant",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [19, 19],
            text: "Pathétique - Divise par 3 la valeur de revente",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [20, 20],
            text: "Inratable - Bonus de 10% pour vous toucher",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [21, 21],
            text: "Abruti - Retire -2 en Intelligence",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [22, 22],
            text: "Maladif - Retire -3 en Constitution",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [23, 23],
            text: "Dépressif - Altération aléatoire en début de combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [24, 24],
            text: "Maudite - Retire -2 aux soins",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [25, 25],
            text: "Encombrant - Double la place d'inventaire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [26, 26],
            text: "Siphonnant - Retire 1 PSY par tour en combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [27, 27],
            text: "Drainant - Retire 1 PV par tour en combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [28, 28],
            text: "Lâche - Adversaires ont avantage aux attaques d'opportunité",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [29, 29],
            text: "Rodage - Premier jet sur pire statistique de touche",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [30, 30],
            text: "Amnésique - Perd l'usage d'un sortilège au choix",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [31, 31],
            text: "Craintif - Ajoute une faiblesse à un élément aléatoire",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [32, 32],
            text: "Inattentif - Ne peut pas bloquer la première attaque du combat",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [33, 33],
            text: "Affligeant - Malus de 20% aux jets de sauvegarde",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [34, 34],
            text: "Fracassé - Supprime les effets du premier trait positif",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [35, 35],
            text: "Pataud - Effets de déplacement réduits de 5m",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [36, 36],
            text: "Perturbateur - Prochain jet avec désavantage (1x par scène/combat)",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [37, 37],
            text: "Victime - Ciblé en priorité si moins de PV qu'un allié",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [38, 38],
            text: "Epuisant - Compétences 4+ PSY/PV coûtent +1 PSY/PV",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [39, 39],
            text: "Coercitif - Annule 2 premiers traits positifs d'autres équipements",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        },
        {
            range: [40, 40],
            text: "Phobique - Perd immunité OU altération irrésistible permanente",
            type: CONST.TABLE_RESULT_TYPES.TEXT
        }
    ]
};
