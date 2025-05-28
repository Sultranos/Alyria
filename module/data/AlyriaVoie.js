export const Voie = {
   
    Guerrier: {
      description: "Les guerriers ne vivent que pour se battre, ils aiment l’odeur du champ de bataille, celle de la poudre, du sang et de la sueur. Ils sont redoutables dans les combats que ce soit en duel ou contre une armée entière. Ces personnes sont très recherchées dans les armées et rejoignent régulièrement celle de leur pays ou se font embaucher en tant que mercenaire. Dans de rares cas, les guerriers se joignent à des groupes d’aventuriers et détruisent les monstres ou les brigands qu’ils croisent. Autant dire qu’ils sont très recherchés pour former des groupes, car leur puissance et leur polyvalence sont sans égale. Les maîtres guerriers peuvent frapper en zone, ignorer les armures, et même gagner d’importants bonus avec une catégorie d’arme spécifique",
      majeures: {
            Force: 0,
            Dextérité: 0,
            Constitution: -2,
            Intelligence: 5,
            Sagesse: 4,
            Charisme: 3,
            Defense: 0,
            Chance: 0
            },
      mineures:  {
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
        niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
        talents: [
          {
            nom: "Guerrier Puissant",
            description: "Ajoute +1 en Force et 10 en Puissance",
            niveauJoueur: 1,
            prerequis: [],
            effet: { Force: 1, Puissance: 10 }
          },
          {
            nom: "Samouraï Déshonoré",
            description: "Vous pouvez choisir un des sorts Novice de la voie de Samouraï. Utilisez-le comme il est indiqué, cela fonctionne aussi avec les passifs.",
            niveauJoueur: 2,
            prerequis: ["Guerrier Puissant"],
            effet: Samourai.sortNovice +1,
          },
          {
            nom: "Brute en Mêlée",
            description: "Ajoute +1 dégâts avec les armes de type Mélée",
            niveauJoueur: 3,
            prerequis: ["Charge puissante"],
            effet: { bonusDegats: 1 }
          },
          {
            nom: "Paladin de Pacotille",
            description: "Vous pouvez choisir un des sorts Novice de la Monovoie de Paladin. Utilisez-le comme il est indiqué, cela fonctionne aussi avec les passifs.",
            niveauJoueur: 4,
            prerequis: ["Brute en Mêlée"],
            effet: Paladin.sortNovice +1,
          },
          {
            nom: "Guerrier Véloce",
            description: "Ajoute +1 en Dextérité et +10 en acrobatie",
            niveauJoueur: 5,
            prerequis: ["Paladin de Pacotille"],
            effet: { Dextérité: 1, Acrobatie: 10 }
          },
          {
            nom: "Pugiliste Petits Bras",
            description: "Vous pouvez choisir un des sorts Novice de la Monovoie de Pugiliste. Utilisez-le comme il est indiqué, cela fonctionne aussi avec les passifs.",
            niveauJoueur: 6,
            prerequis: ["Guerrier Véloce"],
            effet: Pugiliste.sortNovice +1,
          },
          {
            nom: "Guerrier Solide",
            description: "Ajoute +1 en Constitution et +10 en Robustesse.",
            niveauJoueur: 7,
            prerequis: ["Pugiliste Petits Bras"],
            effet: { Constitution: 1, Robustesse: 10 }
          },
          {
            nom: "Roublard des Bas Quartiers",
            description: "Vous pouvez choisir un des sorts Novice de la Monovoie de Roublard. Utilisez-le comme il est indiqué cela fonctionne aussi avec les passifs.",
            niveauJoueur: 8,
            prerequis: ["Guerrier Solide"],
            effet: Roublard.sortNovice +1,
          },
          {
            nom: "Expert du Maniement",
            description: "Choisissez une catégorie entre Perforant, Tranchant et Contondant, vous gagnez +2 dégâts et +10% de chances de toucher avec les armes de ce type",
            niveauJoueur: 9,
            prerequis: ["Roublard des Bas Quartiers"],
            effet: { bonusDegats: 2, ChancesDeToucher: 10 }
          },
          {
            nom: "Guerrier Prudent",
            description: "Ajoute +1 en Défense. Il gagne 3 PB au début de chaque combat et la même somme lorsqu’il tombe sous les 50% de vie, ce bonus est modifié par votre bonus bouclier.",
            niveauJoueur: 10,
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
                     }
                  ],
                SortConfirme: [{}],
                SortExpert: [{}],
                SortMaitre: [{}] 
            },
    },
    Pugiliste: {
        description: [
            "Les pugilistes ont fait le choix de ne pas prendre d’arme, ils refusent d’utiliser des épées ou des arcs en combat, leur corps est cependant bien assez dangereux comme ça, la puissance de leur poing n’a rien à envier à la plus puissante des lames.",
            "Souvent venu d’orient, l’art du poing s’est répandu petit à petit en occident, mais reste une vocation rare. Les aventuriers pugilistes sont souvent incompris par les autres de par le risque fou qu’ils prennent en affrontant des créatures surpuissantes à mains nues. Mais les histoires les plus folles commencent toujours par un type qui étrangle un ours à mains nues non ?",
            "Les maîtres pugilistes disposent de multiples bonus en statistique et d’attaque visant directement la PSY adverse. Ils ont aussi accès à l’attaque au plus gros potentiel de dégâts possibles."],
        majeures: {
            Force: 3,
            Dextérité: 2,
            Constitution: 3,
            Intelligence: 0,
            Sagesse: 0,
            Charisme: 0,
            Defense: 2,
            Chance: 0
            },
        Mineures:  {
            monde: 0,
            mystique: 0,
            nature: 0,
            sacré: 0,
            robustesse: 20,
            calme: 0,
            marchandage: 0,
            persuasion: 0,
            artmusique: 0,
            commandement: 0,
            acrobatie: 20,
            discretion: 0,
            adresse: 0,
            artisanat: 0,
            hasard: 0,
            athlétisme: 30,
            puissance: 10,
            intimidation: 0,
            perception: 0,
            perceptionmagique: 0,
            medecine: 0,
            intuition: 20
            },
        mecanique:[
            "Le Pugiliste suit la Voie du Poing, ce passif est débloqué automatiquement si vous avez sélectionné la voie et même si vous ne deviez pas utiliser sa mécanique :",
            "Voie du Poing : Ne peut pas utiliser d’arme, en contrepartie les attaques à mains nues font 1 dé 4 +1 dégâts. +1 dégât supplémentaire tous les 2 niveaux du Pugiliste.",
            "Ceux qui suivent cette voie doivent être fort et rapide, Quand ils utilisent leur dextérité et leur force en simultané ils sont invincible :",
            "Voler comme un papillon et frapper comme une abeille : Lorsque vous utilisez un sort de force APRES avoir utilisé un sort de Dextérité vous infligez 1 dé 4 dégâts fixe supplémentaire sur ce sort, si vous utilisez un sort de Dextérité APRES un sort de Force vous gagnez 1 cran en vitesse et 10% de chance de toucher pour 1 tour",
            "Les sorts ayant 'Réussite automatique' ne sont pas considérés comme des sorts de Force ou de Dextérité. Les attaques à mains nues quant à elle sont considérées comme des sorts de Force Ou de Dextérité pour le fonctionnement de la mécanique mais elles ne déclenchent aucune des augmentations.",],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[
                {
                    nom: "Vivacité Naturelle ",
                    description: "Ajoute +1 en Dextérité et +1 cran de vitesse au tour 1 de chaque combat et a chaque fois que vous tuer un ennemi.",
                    niveauJoueur: 1,
                    prerequis: [],
                    effet: { Dextérité: 1, Vitesse: 1 }
                },
                {
                    nom: "Maîtrise des Arts Martiaux",
                    description: "Ajoute +1 en Force OU en Dextérité. Chaque attaque à mains nues peuvent infliger ”Sonné” sur un coup critique",
                    niveauJoueur: 2,
                    prerequis: ["Vivacité Naturelle"],
                    effet: { Force: +1 , Dextérité: +1 , etat: "Sonné" },
                },
                {
                    nom: "Bagarreur",
                    description: "Lorsque qu’un ennemi vous inflige des dégâts au corps-à-corps, vous lui faites subir 2 dégâts fixes.",
                    niveauJoueur: 3,
                    prerequis: ["Maîtrise des Arts Martiaux"],
                    effet: { bonusDegats: 2 }
                },
                {
                    nom: "Manœuvre d’Approche",
                    description: "Lorsque vous subissez une attaque d’un ennemi situé à plus de 20 mètres, vous augmentez votre vitesse de 1 cran pour le prochain tour. Effet non cumulable",
                    niveauJoueur: 4,
                    prerequis: ["Bagarreur"],
                    effet: { Vitesse: 1, bonusCumulable: false }
                },
                {
                    nom: "Phalange brutale",
                    description: "Ajoute +1 en Force. Bonus de +15 en puissance pour détruire des objets.",
                    niveauJoueur: 5,
                    prerequis: ["Manœuvre d’Approche"],
                    effet: { Force: 1, Puissance: 15 }
                },
                {
                    nom: "Résistance de la Brute",
                    description: "Ajoute +1 en Constitution et +10 en Robustesse. Si vos PV tombent sous 25%, vous gagnez 2 points de bouclier + votre DSB, une fois par combat.",
                    niveauJoueur: 6,
                    prerequis: ["Phalange brutale"],
                    effet: {
                        Constitution: 1,
                        Robustesse: 10,
                        gainBouclier: {
                        condition: "PV < 25%",
                        valeur: "2 + DSB",
                        limite: "1 fois par combat"
                        }
                    }
                },
                {
                    nom: "Combat à la loyale",
                    description: "Vous gagnez +2 aux dégâts et à l’armure si vous affrontez un ennemi sans avoir aucune autre entité à moins de 10 mètres de lui ou de vous",
                    niveauJoueur: 7,
                    prerequis: ["Résistance de la Brute"],
                    effet: {
                            bonusDegats: 2,
                            Armure: 2,
                            bonusCumulable: false,
                            conditionMonoCible: function(actor) {
                                // Récupère le token du joueur
                                const token = actor.getActiveTokens()[0];
                                if (!token) return false;
                                // Cherche tous les tokens ennemis à moins de 10m (10 cases Foundry = 10*token.scene.gridDistance)
                                const scene = token.scene;
                                const tokens = scene.tokens.contents.filter(t =>
                                t.id !== token.id &&
                                t.document.disposition !== token.document.disposition && // ennemi
                                canvas.grid.measureDistance(token, t) <= 10
                                );
                                // Si aucun ennemi à moins de 10m autre que la cible, retourne true
                                return tokens.length === 0;
                                }
                            }
                },
                {
                    nom: "Vigilance totale ",
                    description: "Si on vous a appliqué une altération d’état avec succès vous y devenez Immunisé pendant 3 tours, cet effet est cumulable sur autant d’altérations que possible mais ça ne vous guérit pas de l’effet de celle qui vous a était appliqué.",
                    niveauJoueur: 8,
                    prerequis: ["Combat à la loyale"],
                    effet: { immuniteEtat: true, duree: 3, cumulable: true }
                },
                {
                    nom: "Souplesse du Luchador ",
                    description: "Ajoute +1 en Dextérité et +10 en Acrobatie. Si vous avez moins de 25% de PV restants, vous augmentez votre taux de blocage de 20%.",
                    niveauJoueur: 9,
                    prerequis: ["Vigilance totale"],
                    effet: { 
                        Dextérité: 1, 
                        Acrobatie: 10, 
                        tauxBlocage: {
                            Valeur: 20, 
                            condition: "pointsDeVie <25%",
                            }
                        }
                },
                {
                    nom: "Voler comme un Dragon et frapper comme un Troll ",
                    description: "Le bonus de 'Voler comme un papillon et frapper comme une abeille' est doublé.",
                    niveauJoueur: 10,
                    prerequis: ["Souplesse du Luchador"],
                    effet: { bonusDouble: true, mecanique: "Voler comme un papillon et frapper comme une abeille" }
                }                
            ],
        },
        SortVoie: {
            niveau: [Novice , Confirme , Expert , Maître],
                SortNovice:[{}],
                SortConfirme: [{}],
                SortExpert: [{}],
                SortMaitre: [{}]
            }
    },
        ChangeForme: {
        description: [
            " Les changeformes sont des êtres capables de se transformer en une autre créature, que ce soit un animal, un monstre ou même un autre être humanoïde. Ils sont souvent considérés comme des mystiques ou des sorciers, car leur capacité à changer de forme est liée à la magie. Les changeformes sont très recherchés pour leurs capacités d’infiltration et de déguisement, mais ils peuvent aussi être redoutables au combat lorsqu’ils choisissent de se transformer en une créature puissante.",
            "Les plus doués peuvent prendre de multiples formes et sont donc de redoutables et imprévisibles combattants, certains d’entre eux rejoignent les armées ou les groupes d’aventuriers pour éprouver leurs compétences en combat.",
            "Les maîtres change-forme peuvent prendre les 5 formes élémentaires et sont donc d’une versatilité absolue, ils peuvent en plus augmenter les dégâts de leurs sorts élémentaires grâce à leurs affinités."],
        majeures: {
            Force: 1,
            Dextérité: 2,
            Constitution: 1,
            Intelligence: 1,
            Sagesse: 2,
            Charisme: 1,
            Defense: 1,
            Chance: 1
            },
        Mineures:  {
            monde: 5,
            mystique: 5,
            nature: 5,
            sacré: 0,
            robustesse: 5,
            calme: 5,
            marchandage: 5,
            persuasion: 5,
            artmusique: 5,
            commandement: 5,
            acrobatie: 5,
            discretion: 5,
            adresse: 5,
            artisanat: 5,
            hasard: 0,
            athlétisme: 5,
            puissance: 5,
            intimidation: 5,
            perception: 5,
            perceptionmagique: 5,
            medecine: 5,
            intuition: 5
            },
        mecanique:[
            "La voie du change forme permet de changer d’apparence et d’affinité, elle a un impact hors combat si ces compétences sont utilisées, au loisir du MJ. Le joueur peut retrouver son apparence de base gratuitement et changer de forme pour 1 PSY, la transformation ne consomme pas d’action",
            "Voie de l’Eau : Le lanceur se transforme en une créature (ou un hybride) d’affinité aquatique. Il obtient les faiblesses et les résistances de l'élément Eau, gagne +2 aux soins et ses attaques à mains nues deviennent: Paume Aquatique (SAG/FOR) : Recouvre les paumes de l’utilisateur d’eau pour frapper une cible pour 1 dé 4 dégâts Eau ou soigner un allié du même montant. 1 PSY",
            "Voie de la Foudre : Le lanceur se transforme en une créature (ou un hybride) d’affinité foudre. Il obtient les faiblesses et la résistance de l’élément Foudre. Il obtient un cran de Vitesse supplémentaire dans cette forme. Ses attaques à mains nues deviennent: Paume de Foudre (DEX/CHA) : Déchaîne la rage de l’éclair dans ses poings. Inflige 1 dé 8 dégâts Foudre. 1 PSY",
            "Voie de la Terre : Le lanceur se transforme en une créature (ou un hybride) d’affinité terre. Il obtient les faiblesses et la résistance de l’élément Terre, il obtient +2 d’Armure sous cette forme. Ses attaques à mains nues deviennent : Paume de Pierre (FOR/DEX) : Frappe un adversaire pour 1 dé 4 dégâts, vous gagnez 3 PB en utilisant cette attaque. 1 PSY",
            "Voie du Feu : Le lanceur se transforme en une créature (ou un hybride) d’affinité Feu. Il obtient les faiblesses et les résistances de l’élément Feu et gagne +2 aux dégâts. Ses attaques à mains nues deviennent: Paume Enflammée (CHA/SAG) : Inflige 1 dé 4 dégâts en cône devant le lanceur, sur un CC applique ‘‘Brûlure’’. 1 PSY ",
            "Voie du Vent : Le lanceur se transforme en une créature (ou un hybride) d’affinité vent. Il obtient les résistances et faiblesses de l’élément. Lors de l’utilisation de cette voie, le lanceur obtient le don Volant (L’utilisateur est immunisé à toutes les attaques au corps-à-corps sauf venant d’un autre ennemi Volant) et ses attaques à mains nues deviennent: Paume du Vent (DEX/SAG) : Inflige 1 dé 6 dégâts perce armure à une cible jusqu’à 25 mètres. 1 PSY",
            "Les sorts de Paume et la transformation ne peuvent voir leur coût réduit par des capacité réduisant les coûts en PSY.",
            ],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[
                {
                    nom: "Métamorphe habile ",
                    description: "Vous pouvez vous changer en n’importe quel être vivant hors Humanoïde, cela vous coûte 2 PSY si vous utilisez une transformation qui est différente de celle que vous avez choisie pour chaque voie. La transformation est réussie automatiquement et vous possédez les mêmes caractéristiques physiques que la créature dans laquelle vous vous changer, tout en gardant votre intelligence et vos capacités mentales intacte.",
                    niveau: 1,
                    prerequis: [],
                    effet: "Accès à la transformation en n’importe quelle créature vivante."
                },
                {
                    nom: "Polyvalence",
                    description: "Vous donne +1 points de statistique majeure à répartir, ainsi que 10 point de statistique mineure.",
                    niveau: 2,
                    prerequis: ["Métamorphe habile"],
                    effet: {majeur: 1, mineur: 10}
                },
                {
                    nom: "Accro de la Métamorphose",
                    description: "Lorsque vous changez de forme alors que vous étiez dans une autre forme, vos sorts coûtent -1 PSY et infligent +1 dégât pour le tour en cours. Cet effet n’est pas cumulable.",
                    niveau: 3,
                    prerequis: ["Polyvalence"],
                    effet: { bonusDegats: 1, Psy: -1 }
                },
                {
                    nom: "Polyvalence",
                    description: "Vous donne +1 points de statistique majeure à répartir, ainsi que 10 point de statistique mineure.",
                    niveau: 4,
                    prerequis: ["Accro de la Métamorphose"],
                    effet: { majeur: 1, mineur: 10 }
                },
                {
                    nom: "Sosie parfait",
                    description: "Vous pouvez vous changer en une créature Humanoïde que vous avez déjà rencontré, cela coutera 3 PSY pour réussir la transformation mais elle se fera automatiquement. Vous gardez vos propres souvenirs et vos capacités mentale en étant transformé et n’avait en aucun cas accès à ceux de la cible. Vous avez en revanche toutes ses caractéristiques physiques au détail près.",
                    niveau: 5,
                    prerequis: ["Polyvalence"],
                    effet: "Accès à la transformation en un Humanoïde déjà rencontré."
                },
                {
                    nom: "Adaptabilité du Change-Forme",
                    description: "Lors de l’utilisation d’une transformation, l’utilisateur gagne aussi +2 DSB sur tous les sorts qui frappent sur le même élément que sa voie.",
                    niveau: 6,
                    prerequis: ["Sosie parfait"],
                    effet: { dsb: 2 }
                },
                {
                    nom: "Métamorphose en chaine ",
                    description: "Si vous avez changez de forme deux fois dans le même tour de jeu ou en moins de 5 minutes hors combat vous gagnez un avantage sur votre prochain jet de dé.",
                    niveau: 7,
                    prerequis: ["Adaptabilité du Change-Forme"],
                    effet: "Avantage sur le prochain jet de dé après deux transformations dans le même tour ou en moins de 5 minutes hors combat."
                },
                {
                    nom: "Polyvalence",
                    description: "Vous donne +1 points de statistique majeure à répartir, ainsi que 10 point de statistique mineure.",
                    niveau: 8,
                    prerequis: ["Métamorphose en chaine"],
                    effet: { majeur: 1, mineur: 10 }
                },
                {
                    nom: "Voie du Moi",
                    description: "En forme de base, sans transformation, vous gagnez un bonus de +5 dans toutes les statistiques mineures, ce bonus est doublé si vous avez changé de forme récemment (dans les 10 dernières minutes).",
                    niveau: 9,
                    prerequis: ["Polyvalence"],
                    effet: { mineur: 5, bonusDouble: true }
                },
                {
                    nom: "Clone indiscernable ",
                    description: "Vous pouvez vous changez en n’importe quelle créature et obtenez les mêmes statistiques qu’elles, vous avez aussi accès à ses souvenirs et sa conscience, néanmoins lorsque vous le faite vous alertez la cible de ce sort et elle saura que vous l’avez copiée. Cette transformation est particulièrement pénible pour le Change-Forme, elle coutera 6 PSY et vous devrait faire vos jets avec un désavantage tant que vous maintenez cette forme.",
                    niveau: 10,
                    prerequis: ["Voie du Moi"],
                    effet: "Accès à la transformation en n’importe quelle créature, même Humanoïde, avec accès aux souvenirs et à la conscience de la cible. Coût de 6 PSY et désavantage sur les jets tant que la forme est maintenue."
                }
            ],
            },
        SortVoie: {
            niveau: [Novice , Confirme , Expert , Maître],
                SortNovice:[{}],
                SortConfirme: [{}],
                SortExpert: [{}],
                SortMaitre: [{}]
            }
    },
        Berserker: {
        description: "",
        majeures: {
            Force: 0,
            Dextérité: 0,
            Constitution: 0,
            Intelligence: 5,
            Sagesse: 4,
            Charisme: 3,
            Defense: 0,
            Chance: 0
            },
        Mineures:  {
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        SortVoie: {
            niveau: [Novice , Confirme , Expert , Maître],
                SortNovice:[{}],
                SortConfirme: [{}],
                SortExpert: [{}],
                SortMaitre: [{}]
            }
    },
        Paladin: {
        description: "",
        majeures: {
            Force: 0,
            Dextérité: 0,
            Constitution: 0,
            Intelligence: 5,
            Sagesse: 4,
            Charisme: 3,
            Defense: 0,
            Chance: 0
            },
        Mineures:  {
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        SortVoie: {
            niveau: [Novice , Confirme , Expert , Maître],
                SortNovice:[{}],
                SortConfirme: [{}],
                SortExpert: [{}],
                SortMaitre: [{}]
            }
    },
        Moine: {
        description: "",
        majeures: {
            Force: 0,
            Dextérité: 0,
            Constitution: 0,
            Intelligence: 5,
            Sagesse: 4,
            Charisme: 3,
            Defense: 0,
            Chance: 0
            },
        Mineures:  {
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        SortVoie: {
            niveau: [Novice , Confirme , Expert , Maître],
                SortNovice:[{}],
                SortConfirme: [{}],
                SortExpert: [{}],
                SortMaitre: [{}]
            }
    },
        Roublard: {
        description: "",
        majeures: {
            Force: 0,
            Dextérité: 0,
            Constitution: 0,
            Intelligence: 5,
            Sagesse: 4,
            Charisme: 3,
            Defense: 0,
            Chance: 0
            },
        Mineures:  {
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        SortVoie: {
            niveau: [Novice , Confirme , Expert , Maître],
                SortNovice:[{}],
                SortConfirme: [{}],
                SortExpert: [{}],
                SortMaitre: [{}]
            }
    },
        Samourai: {
        description: "",
        majeures: {
            Force: 0,
            Dextérité: 0,
            Constitution: 0,
            Intelligence: 5,
            Sagesse: 4,
            Charisme: 3,
            Defense: 0,
            Chance: 0
            },
        Mineures:  {
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        SortVoie: {
            niveau: [Novice , Confirme , Expert , Maître],
                SortNovice:[{}],
                SortConfirme: [{}],
                SortExpert: [{}],
                SortMaitre: [{}]
            }
    },
    

}               