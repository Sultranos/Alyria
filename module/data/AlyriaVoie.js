export const Voie = {
   
    Guerrier: {
      description: "Les guerriers ne vivent que pour se battre, ils aiment l’odeur du champ de bataille, celle de la poudre, du sang et de la sueur. Ils sont redoutables dans les combats que ce soit en duel ou contre une armée entière. Ces personnes sont très recherchées dans les armées et rejoignent régulièrement celle de leur pays ou se font embaucher en tant que mercenaire. Dans de rares cas, les guerriers se joignent à des groupes d’aventuriers et détruisent les monstres ou les brigands qu’ils croisent. Autant dire qu’ils sont très recherchés pour former des groupes, car leur puissance et leur polyvalence sont sans égale. Les maîtres guerriers peuvent frapper en zone, ignorer les armures, et même gagner d’importants bonus avec une catégorie d’arme spécifique",
      Majeure: {
            Force: 0,
            Dextérité: 0,
            Constitution: -2,
            Intelligence: 5,
            Sagesse: 4,
            Charisme: 3,
            Defense: 0,
            Chance: 0
            },
      Mineure:  {
            monde: 0,
            mystique: 20,
            nature: 0,
            sacré: 5,
            robustesse: 0,
            calme: 0,
            marchandage: 0,
            persuasion: 15,
            artmusique: 20,
            commandement: 5,
            acrobatie: 0,
            discretion: 0,
            adresse: 0,
            artisanat: 0,
            hasard: 0,
            athlétisme: 0,
            puissance: 0,
            intimidation: 0,
            perception: 10,
            perceptionmagique: 20,
            medecine: 0,
            intuition: 0
            },
      mecanique: [
        "Le guerrier est un expert du combat, même s’il a une préférence pour la mêlée bien sûr. Son entraînement lui permet de manier à la perfection ses armes et de varier ses attaques comme personne.",
        "Le guerrier peut changer d’arme à tout moment et cela ne lui consomme pas d’action, du moment que l’arme voulue est équipée dans un de ses packs d’armes.",
        "Il gagne un bonus de 5% de chances de toucher, de CC et de +1 aux dégâts à chaque fois qu’il change d’arme pour une arme d’un autre type (tranchant/contondant/perforant), ce bonus ne perdure que pour une seule attaque. Si vous faites un cycle complet d’affilé en enchaînant une attaque avec chacun des trois types de dégâts la prochaine attaque que vous effectuerez verra son bonus triplé puis cet effet est réinitialisé.",
        "Chaque catégorie d’arme possède un trait supplémentaire quand le guerrier les manie : Tranchant : Inflige Hémorragie, Contondant : Inflige 1d4 dégâts supplémentaires, Perforant : Inflige des dégâts perce armure."
      ],
      talentVoie: {
        niveaux: [1,2,3,4,5,6,7,8,9,10],
        talents: [
          {
            nom: "Guerrier Puissant",
            description: "Ajoute +1 en Force et 10 en Puissance",
            niveau: 1,
            prerequis: [],
            effet: { Force: 1, Puissance: 10 }
          },
          {
            nom: "Samouraï Déshonoré",
            description: "Vous pouvez choisir un des sorts Novice de la voie de Samouraï. Utilisez-le comme il est indiqué, cela fonctionne aussi avec les passifs.",
            niveau: 2,
            prerequis: ["Guerrier Puissant"],
            effet: "Accès à un sort Novice de la voie de Samouraï."
          },
          {
            nom: "Brute en Mêlée",
            description: "Ajoute +1 dégâts avec les armes de type Mélée",
            niveau: 3,
            prerequis: ["Charge puissante"],
            effet: { bonusDegats: 1 }
          },
          {
            nom: "Paladin de Pacotille",
            description: "Vous pouvez choisir un des sorts Novice de la Monovoie de Paladin. Utilisez-le comme il est indiqué, cela fonctionne aussi avec les passifs.",
            niveau: 4,
            prerequis: ["Brute en Mêlée"],
            effet: "Accès à un sort Novice de la voie de Paladin."
          },
          {
            nom: "Guerrier Véloce",
            description: "Ajoute +1 en Dextérité et +10 en acrobatie",
            niveau: 5,
            prerequis: ["Paladin de Pacotille"],
            effet: { Dextérité: 1, Acrobatie: 10 }
          },
          {
            nom: "Pugiliste Petits Bras",
            description: "Vous pouvez choisir un des sorts Novice de la Monovoie de Pugiliste. Utilisez-le comme il est indiqué, cela fonctionne aussi avec les passifs.",
            niveau: 6,
            prerequis: ["Guerrier Véloce"],
            effet: "Accès à un sort Novice de la voie de Pugiliste."
          },
          {
            nom: "Guerrier Solide",
            description: "Ajoute +1 en Constitution et +10 en Robustesse.",
            niveau: 7,
            prerequis: ["Pugiliste Petits Bras"],
            effet: { Constitution: 1, Robustesse: 10 }
          },
          {
            nom: "Roublard des Bas Quartiers",
            description: "Vous pouvez choisir un des sorts Novice de la Monovoie de Roublard. Utilisez-le comme il est indiqué cela fonctionne aussi avec les passifs.",
            niveau: 8,
            prerequis: ["Guerrier Solide"],
            effet: "Accès à un sort Novice de la voie de Roublard."
          },
          {
            nom: "Expert du Maniement",
            description: "Choisissez une catégorie entre Perforant, Tranchant et Contondant, vous gagnez +2 dégâts et +10% de chances de toucher avec les armes de ce type",
            niveau: 9,
            prerequis: ["Roublard des Bas Quartiers"],
            effet: { bonusDegats: 2, ChancesDeToucher: 10 }
          },
          {
            nom: "Guerrier Prudent",
            description: "Ajoute +1 en Défense. Il gagne 3 PB au début de chaque combat et la même somme lorsqu’il tombe sous les 50% de vie, ce bonus est modifié par votre bonus bouclier.",
            niveau: 10,
            prerequis: ["Expert du Maniement"],
            effet: { Defense: 1, PointBouclier: 3 }
          }
        ],
      },
        SortVoie: {
            niveau: [Novice , Confirme , Expert , Maître],
                SortNovice:[
                    {
                    nom: "Fureur Guerrière",
                    description: "Arme contondante uniquement. Le lanceur inflige un coup si puissant avec son arme qu’il ignore l’armure et les boucliers de la cible",
                    Psy: 3,
                    Zone: 0,
                    Distance: 0,
                    Action: "consommée",
                    Touche: "Force",
                    effet: { bonusDegats: 0, NoArmure: true, NoBouclier: true },
                     },
                    {
                    nom: "Coup de Bouclier",
                    description:"",
                    Psy: 2,
                    Zone: 0,
                    Distance: 0,
                    Action: "consommée",
                    Touche: "Force",
                    effet: { bonusDegats: 0, NoArmure: true, NoBouclier: true },
                    },
                    {}
                  ],
                SortConfirme: [
                    {
                    nom: "Charge Puissante",
                    description: "Le guerrier se lance dans une charge dévastatrice, il peut se déplacer de 6 mètres et infliger 1d6 dégâts supplémentaires à la cible.",
                    Psy: 4,
                    Zone: 0,
                    Distance: 0,
                    Action: "consommée",
                    Touche: "Force",
                    effet: { bonusDegats: 1, bonusDegatsType: "Contondant" }
                    },
                    {}
                  ],
                SortExpert: [
                    {
                    nom: "Coup de Grâce",
                    description: "Le guerrier peut porter un coup dévastateur à sa cible, infligeant 2d6 dégâts supplémentaires. Si la cible est déjà blessée, elle subit 3d6 dégâts supplémentaires.",
                    Psy: 5,
                    Zone: 0,
                    Distance: 0,
                    Action: "consommée",
                    Touche: "Force",
                    effet: { bonusDegats: 2, bonusDegatsType: "Contondant", bonusDegatsSiBlesse: 3 }
                    },
                    {}
                  ],
                SortMaitre: [
                    {
                    nom: "Frappe Dévastatrice",
                    description: "Le guerrier peut porter une frappe dévastatrice, infligeant 3d6 dégâts supplémentaires. Si la cible est déjà blessée, elle subit 4d6 dégâts supplémentaires.",
                    Psy: 6,
                    Zone: 0,
                    Distance: 0,
                    Action: "consommée",
                    Touche: "Force",
                    effet: { bonusDegats: 3, bonusDegatsType: "Contondant", bonusDegatsSiBlesse: 4 }
                    }
                ] 
            },
    }
}    