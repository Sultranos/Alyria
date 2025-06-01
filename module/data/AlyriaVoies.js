const toucheForce = "Chance de touche en Force";
const toucheDexterite = "Chance de touche en Dexterité";
const toucheCharisme = "Chance de touche en Charisme";
const toucheSagesse = "Chance de touche en Sagesse";


export const AlyriaVoies = {
   
guerrier: {
      
    nom:"Guerrier",    
    description: [
      "Les guerriers ne vivent que pour se battre, ils aiment l’odeur du champ de bataille, celle de la poudre, du sang et de la sueur.", 
      "Ils sont redoutables dans les combats que ce soit en duel ou contre une armée entière. Ces personnes sont très recherchées dans les armées et rejoignent régulièrement celle de leur pays ou se font embaucher en tant que mercenaire.", 
      "Dans de rares cas, les guerriers se joignent à des groupes d’aventuriers et détruisent les monstres ou les brigands qu’ils croisent. Autant dire qu’ils sont très recherchés pour former des groupes, car leur puissance et leur polyvalence sont sans égale.", 
      "Les maîtres guerriers peuvent frapper en zone, ignorer les armures, et même gagner d’importants bonus avec une catégorie d’arme spécifique"],
      majeures: {
            force: 2,
            dexterite: 2,
            constitution: 3,
            intelligence: 0,
            sagesse: 0,
            charisme: 0,
            defense: 0,
            chance: 0
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
            description: "Ajoute +1 en force et 10 en Puissance",
            niveauJoueur: 1,
            prerequis: [],
            effet: { force: 1, Puissance: 10 }
          },
          {
            nom: "Samouraï Déshonoré",
            description: "Vous pouvez choisir un des sorts Novice de la voie de Samouraï. Utilisez-le comme il est indiqué, cela fonctionne aussi avec les passifs.",
            niveauJoueur: 2,
            prerequis: ["Guerrier Puissant"],
            effet: "choixSortNoviceSamourai",
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
            effet: "choixSortNovicePaladin",
          },
          {
            nom: "Guerrier Véloce",
            description: "Ajoute +1 en dexterite et +10 en acrobatie",
            niveauJoueur: 5,
            prerequis: ["Paladin de Pacotille"],
            effet: { dexterite: 1, Acrobatie: 10 }
          },
          {
            nom: "Pugiliste Petits Bras",
            description: "Vous pouvez choisir un des sorts Novice de la Monovoie de Pugiliste. Utilisez-le comme il est indiqué, cela fonctionne aussi avec les passifs.",
            niveauJoueur: 6,
            prerequis: ["Guerrier Véloce"],
            effet: "choixSortNovicePugiliste",
          },
          {
            nom: "Guerrier Solide",
            description: "Ajoute +1 en constitution et +10 en Robustesse.",
            niveauJoueur: 7,
            prerequis: ["Pugiliste Petits Bras"],
            effet: { constitution: 1, Robustesse: 10 }
          },
          {
            nom: "Roublard des Bas Quartiers",
            description: "Vous pouvez choisir un des sorts Novice de la Monovoie de Roublard. Utilisez-le comme il est indiqué cela fonctionne aussi avec les passifs.",
            niveauJoueur: 8,
            prerequis: ["Guerrier Solide"],
            effet: "choixSortNoviceRoublard",
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
            effet: { defense: 1, PointBouclier: 3 }
          }
        ],
      },
        sortVoie: {
            niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
                sortNovice:[
                    {
                    nom: "Fureur Guerrière",
                    description: "Arme contondante uniquement. Le lanceur inflige un coup si puissant avec son arme qu’il ignore l’armure et les boucliers de la cible",
                    Psy: 3,
                    Zone: 0,
                    Distance: 0,
                    Action: "consommée",
                    Touche: "force",
                    effet: { bonusDegats: 0, NoArmure: true, NoBouclier: true },
                     }
                  ],
                sortConfirme: [{}],
                sortExpert: [{}],
                sortMaitre: [{}] 
            },
    },

pugiliste: {
        
    nom:"Pugiliste",    
    description: [
            "Les pugilistes ont fait le choix de ne pas prendre d’arme, ils refusent d’utiliser des épées ou des arcs en combat, leur corps est cependant bien assez dangereux comme ça, la puissance de leur poing n’a rien à envier à la plus puissante des lames.",
            "Souvent venu d’orient, l’art du poing s’est répandu petit à petit en occident, mais reste une vocation rare. Les aventuriers pugilistes sont souvent incompris par les autres de par le risque fou qu’ils prennent en affrontant des créatures surpuissantes à mains nues. Mais les histoires les plus folles commencent toujours par un type qui étrangle un ours à mains nues non ?",
            "Les maîtres pugilistes disposent de multiples bonus en statistique et d’attaque visant directement la PSY adverse. Ils ont aussi accès à l’attaque au plus gros potentiel de dégâts possibles."],
        majeures: {
            force: 3,
            dexterite: 2,
            constitution: 3,
            intelligence: 0,
            sagesse: 0,
            charisme: 0,
            defense: 2,
            chance: 0
            },
        mineures:  {
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
            "Ceux qui suivent cette voie doivent être fort et rapide, Quand ils utilisent leur dexterite et leur force en simultané ils sont invincible :",
            "Voler comme un papillon et frapper comme une abeille : Lorsque vous utilisez un sort de force APRES avoir utilisé un sort de dexterite vous infligez 1 dé 4 dégâts fixe supplémentaire sur ce sort, si vous utilisez un sort de dexterite APRES un sort de force vous gagnez 1 cran en vitesse et 10% de chance de toucher pour 1 tour",
            "Les sorts ayant 'Réussite automatique' ne sont pas considérés comme des sorts de force ou de dexterite. Les attaques à mains nues quant à elle sont considérées comme des sorts de force Ou de dexterite pour le fonctionnement de la mécanique mais elles ne déclenchent aucune des augmentations.",],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[
                {
                    nom: "Vivacité Naturelle ",
                    description: "Ajoute +1 en dexterite et +1 cran de vitesse au tour 1 de chaque combat et a chaque fois que vous tuer un ennemi.",
                    niveauJoueur: 1,
                    prerequis: [],
                    effet: { dexterite: 1, vitesse: 1 }
                },
                {
                    nom: "Maîtrise des Arts Martiaux",
                    description: "Ajoute +1 en force OU en dexterite. Chaque attaque à mains nues peuvent infliger ”Sonné” sur un coup critique",
                    niveauJoueur: 2,
                    prerequis: ["Vivacité Naturelle"],
                    effet: { force: +1 , dexterite: +1 , etat: "Sonné" },
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
                    description: "Ajoute +1 en force. Bonus de +15 en puissance pour détruire des objets.",
                    niveauJoueur: 5,
                    prerequis: ["Manœuvre d’Approche"],
                    effet: { force: 1, puissance: 15 }
                },
                {
                    nom: "Résistance de la Brute",
                    description: "Ajoute +1 en constitution et +10 en Robustesse. Si vos PV tombent sous 25%, vous gagnez 2 points de bouclier + votre DSB, une fois par combat.",
                    niveauJoueur: 6,
                    prerequis: ["Phalange brutale"],
                    effet: {
                        constitution: 1,
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
                            bonusArmure: 2,
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
                                canvas.grid.measureDistance(token, t) <= 2
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
                    description: "Ajoute +1 en dexterite et +10 en Acrobatie. Si vous avez moins de 25% de PV restants, vous augmentez votre taux de blocage de 20%.",
                    niveauJoueur: 9,
                    prerequis: ["Vigilance totale"],
                    effet: { 
                        dexterite: 1, 
                        Acrobatie: 10, 
                        tauxBlocage: {
                            valeur: 20, 
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
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
                sortNovice:[{}],
                sortConfirme: [{}],
                sortExpert: [{}],
                sortMaitre: [{}]
            }
    },

changeForme: {
        
    nom:"Change-Forme",    
    description: [
            " Les changeformes sont des êtres capables de se transformer en une autre créature, que ce soit un animal, un monstre ou même un autre être humanoïde. Ils sont souvent considérés comme des mystiques ou des sorciers, car leur capacité à changer de forme est liée à la magie. Les changeformes sont très recherchés pour leurs capacités d’infiltration et de déguisement, mais ils peuvent aussi être redoutables au combat lorsqu’ils choisissent de se transformer en une créature puissante.",
            "Les plus doués peuvent prendre de multiples formes et sont donc de redoutables et imprévisibles combattants, certains d’entre eux rejoignent les armées ou les groupes d’aventuriers pour éprouver leurs compétences en combat.",
            "Les maîtres change-forme peuvent prendre les 5 formes élémentaires et sont donc d’une versatilité absolue, ils peuvent en plus augmenter les dégâts de leurs sorts élémentaires grâce à leurs affinités."],
        majeures: {
            force: 1,
            dexterite: 2,
            constitution: 1,
            intelligence: 1,
            sagesse: 2,
            charisme: 1,
            defense: 1,
            chance: 1
            },
        mineures:  {
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
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
                sortNovice:[{}],
                sortConfirme: [{}],
                sortExpert: [{}],
                sortMaitre: [{}]
            }
    },

berserker: {
        
    nom:"Berserker",    
    description: "",
        majeures: {
            force: 2,
            dexterite: 0,
            constitution: 6,
            intelligence: 0,
            sagesse: 2,
            charisme: 0,
            defense: 0,
            chance: 0
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        sortVoie: {
            niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
                sortNovice:[{}],
                sortConfirme: [{}],
                sortExpert: [{}],
                sortMaitre: [{}]
            }
    },

paladin: {
        
    nom:"Paladin",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 0,
            constitution: 2,
            intelligence: 0,
            sagesse: 0,
            charisme: 2,
            defense: 6,
            chance: 0
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
        mecanique:[
            "Les paladins sont très souvent affiliés à la Lumière, mais en réalité, il peut y avoir des paladins de n’importe quelle classe ou éléments, ils sont juste moins bruyants et moins nombreux que ceux de la Lumière. Ces gens se vouent à protéger les faibles, à défendre les opprimés et à faire respecter les lois.",
            "Ils sont souvent intransigeants ce qui ne convient pas toujours pour rejoindre des groupes d’aventuriers, mais les paladins peuvent tout de même se faire violence ... Ou faire violence à leur groupe pour que la voie du bien soit parfaitement respectée.",
            "Les plus grands paladins peuvent protéger tous les alliés proches et obtiennent un panel de bonus défensif, ils sont parmi les plus durs à abattre.",

            "​Le Paladin se lie à un élément au choix, cela peut aussi inclure les éléments dit 'fusionnés' comme la plante, le dragon etc… Il gagne les résistances et les faiblesses de cet élément.",
            "Le Paladin choisi ensuite un serment, cela peut-être n’importe quel principe de vie : Toujours voler aux riches, Protéger les démunis, gagner à la course à pied etc… Mais ce ne doit pas être quelque chose que le Paladin fait tout le temps, ce point reste au choix du MJ.",

            "Zelote: A chaque fois que la Paladin suit son serment il gagne +1 au DSB et +10 dans une statistique mineure jusqu’à un maximum de 5. A chaque fois qu’il échoue à le suivre il diminue son DSB de 1 DSB et  perd -10 dans une statistique mineure jusqu’à un maximum de 5.	"
        ],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[
            {
                nom: "Blocage Parfait",
                description: "Le Paladin peut augmenter son taux de blocage à 100% pour 1 tour, s'il le fait il ne subit aucun dégât de l'attaque. Utilisable 1 fois par combat.",
                niveauJoueur: 1,
                prerequis: [],
                effet: { tauxBlocage: 100, duree: 1, noDmg: true, utilisation: "1/combat" }
            },
            {
                nom: "Ferveur Secourable",
                description: "Ajoute +1 en Défense et +10 en Robustesse et en connaissance sacré.",
                niveauJoueur: 2,
                prerequis: ["Blocage Parfait"],
                effet: { defense: 1, robustesse: 10, sacré: 10 }
            },
            {
                nom: "Habilité au Bouclier",
                description: "Si vous tenez une arme secondaire de type Bouclier, vous gagnez +5% de chances de toucher et +5% de taux de blocage. Ajoute aussi un avantage à vos jets de Robustesse si vous portez un bouclier.",
                niveauJoueur: 3,
                prerequis: ["Ferveur Secourable"],
                effet: { chanceToucher: 5, tauxBlocage: 5, avantageRobustesse: true, condition: "arme secondaire = bouclier" }
            },
            {
                nom: "Fervent Protecteur",
                description: "Ajoute +1 aux soins. Blocage Parfait peut s’utiliser 2 fois par combat.",
                niveauJoueur: 4,
                prerequis: ["Habilité au Bouclier"],
                effet: { bonusSoin: 1, blocageParfaitUtilisations: 2 }
            },
            {
                nom: "Corps Saint",
                description: "Ajoute +1 en Constitution et en Défense. Donne l’immunité aux maladies et octroie un avantage pour éviter de se faire empoisonner.",
                niveauJoueur: 5,
                prerequis: ["Fervent Protecteur"],
                effet: { constitution: 1, defense: 1, immuniteMaladie: true, avantageAntiPoison: true }
            },
            {
                nom: "Théologien",
                description: "Permet de parler la langue Ancienne. Ajoute un avantage lors des jets de connaissance sacré.",
                niveauJoueur: 6,
                prerequis: ["Corps Saint"],
                effet: { langueAncienne: true, avantageSacré: true }
            },
            {
                nom: "Chevalier Saint",
                description: "Immunité à ‘Chaos’. Ajoute 1d6 dégâts fixe si vous frappez un monstre Mort-Vivant ou Extra-Planaire.",
                niveauJoueur: 7,
                prerequis: ["Théologien"],
                effet: { immuniteChaos: true, bonusDegats: "1d6", condition: "cible mort-vivant ou extra-planaire" }
            },
            {
                nom: "Béni",
                description: "Le Paladin gagne 1d4 PB fixe à chaque début de tour.",
                niveauJoueur: 8,
                prerequis: ["Chevalier Saint"],
                effet: { pointBouclier: "1d4", frequence: "début de tour" }
            },
            {
                nom: "Esprit Saint",
                description: "Ajoute +1 en Intelligence et en Charisme. Ajoute Immunité à ‘Terreur’.",
                niveauJoueur: 9,
                prerequis: ["Béni"],
                effet: { intelligence: 1, charisme: 1, immuniteTerreur: true }
            },
            {
                nom: "Ultime rempart",
                description: "Si le Paladin est seul au combat avec au moins un des membres du groupe ayant été mis K.O ou Mort, il gagne +2 d’armure, +2 aux dégâts, +20% de CC, +8 PB et un avantage sur tous ses jets de sauvegarde.",
                niveauJoueur: 10,
                prerequis: ["Esprit Saint"],
                effet: { armure: 2, bonusDegats: 2, critique: 20, pointBouclier: 8, avantageSauvegarde: true, condition: "seul + allié KO/mort" }
            }
        ]
    },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
                sortNovice:[
            {
                nom: "Défense partagée",
                description: "Octroie la même quantité d’armure et de PB que le lanceur possède à un allié au corps à corps. Ce sort dure 1 tour.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            },
            {
                nom: "Lame imprégnée",
                description: "Le lanceur imprègne sa lame de l’élément de son serment, cette attaque inflige les dégâts de l’arme en main + le bonus dégât du Paladin et frappe dans l’élément du serment plutôt que dans celui de l’arme.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: "Auto",
                effet: { type: "Arme + Bonus" }
            },
            {
                nom: "Aura de Châtiment",
                description: "Les ennemis à moins de 10 mètres du lanceur subissent 1 dé 4 dégâts fixe à chaque fois qu’ils lancent un sort consommant de la PSY. Ces dégâts doublent contre les Morts-Vivants ou les Extra-Planaire. Cet effet persiste jusqu’à sa révocation. Il est révoqué si le Paladin lance un autre sortilège d’Aura.",
                Psy: 4,
                Zone: "15mcroixEcentré",
                ZoneImage: "systems/alyria/module/data/images/15mcroixEcentré.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D4 fixe" }
            },
            {
                nom: "Aura de Protection",
                description: "Le lanceur et les alliés à moins de 10 mètres gagnent +20% au blocage et +2 à l’armure. Cet effet persiste jusqu’à sa révocation. Il est révoqué si le Paladin lance une autre sortilège d’Aura.",
                Psy: 4,
                Zone: "15mcroixEcentré",
                ZoneImage: "systems/alyria/module/data/images/15mcroixEcentré.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Levée de Bouclier",
                description: "Permet de diviser par 2 les dégâts des attaques à distance reçu pendant 1 tour pour vous et les alliés au corps-à-corps.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            },
            {
                nom: "Répurgateur",
                description: "Ce sort inflige 1 dé 6 +3 dégâts et le double si la cible est de race Mort-Vivant ou Extra-Planaire.",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D6+3 (x2ExtraP)" }
            },
            {
                nom: "Apposition des Mains",
                description: "Permet de soigner une cible de 1 dé 4 PV, lançable une fois par tour.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { soin: "1D4" }
            },
            {
                nom: "Inébranlable",
                description: "Octroie +2 à l’armure et +20% de blocage et Immunité à ‘’Entrave’’ pendant 2 tours. En contrepartie, vous infligez -2 dégâts pendant l’effet.",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            },
            {
                nom: "Ferveur Combattante",
                description: "Le paladin dégage une aura puissante, déclenche le ciblage sur lui pour tous les ennemis dans un rayon de 10 mètres.",
                Psy: 3,
                Zone: "15mcroixEcentré",
                ZoneImage: "systems/alyria/module/data/images/15mcroixEcentré.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Ciblage" }
            },
            {
                nom: "Assistance",
                description: "Permet d’avancer en ligne de 10 mètres si un allié est sur la même ligne que vous. Si vous arriver au corps-à-corps de l’allié avec ce sort, vous le soignez de 1 dé 6 PV. Fonctionne aussi au corps-à-corps.",
                Psy: 3,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "10m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { soin: "1D6" }
            },
            {
                nom: "Zone Dégagée",
                description: "Pousse tous les ennemis autour du paladin de 5 mètres, inflige 1 dé 6 dégâts.",
                Psy: 3,
                Zone: "5mcroix",
                ZoneImage: "systems/alyria/module/data/images/5mcroix.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D6 Push" }
            },
            {
                nom: "Avancée Prudente",
                description: "Avance en prenant attention à bloquer un maximum de dégâts, augmente de 20% le taux de blocage et permet de bloquer autant d'attaque à distance que voulu. Mais perd 1 cran en vitesse et empêche d’effectuer des attaques d’opportunités tant que ce sort est actif. Peut-être révoqué n’importe quand.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: "Auto",
                effet: { type: "Buff" }
            }
        ],
        sortConfirme: [
            {
                nom: "Défense groupée",
                description: "Ce sort ne peut s’utiliser que si un allié est au corps à corps du lanceur. Le Paladin et les alliés gagnent +2 d’armure et +20% de blocage par allié à leur corps à corps. Cet effet se rompt si le Paladin n’est plus adjacent à l'allié ou s’il n’a plus aucun allié à ses côté.",
                Psy: 5,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            },
            {
                nom: "Position défensive",
                description: "Le lanceur devient Immobile, dans le même temps il obtient une résistance à tous les éléments ainsi qu’au Neutre et peut bloquer autant de fois qu’il le veut. Cet effet dure jusqu’à sa révocation.",
                Psy: 6,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            },
            {
                nom: "Intimidation",
                description: "Utilise l’aura puissante du Paladin pour faire douter l’adversaire. Infligez ‘’Terreur’’ à la cible et 1 dé 8 +2 dégâts. Hors combat ce sort coûte 3 PSY de moins et octroie +15 à l’intimidation ainsi qu’un avantage.",
                Psy: 5,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D8+2 Terreur" }
            },
            {
                nom: "Prière de Purge",
                description: "Tous les ennemis dans la zone subissent 1 dé 8 dégâts de l’élément du serment du Paladin et s’applique \"Silence\". Ce sort double ses dégâts sur les Morts-Vivants et les Extra-Planaire.",
                Psy: 5,
                Zone: "15mcarréEcentré",
                ZoneImage: "systems/alyria/module/data/images/15mcarréEcentré.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D8 Ele (x2Extra)" }
            },
            {
                nom: "Aura de Résilience",
                description: "Le lanceur et les alliés à moins de 15 mètres gagnent un avantage et +20% à tous leurs jets de sauvegarde. Cet effet persiste jusqu’à sa révocation. Il est révoqué si le Paladin lance un autre sortilège d’Aura.",
                Psy: 4,
                Zone: "15mcroixEcentré",
                ZoneImage: "systems/alyria/module/data/images/15mcroixEcentré.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Coup de Bouclier",
                description: "Ce sort n’est utilisable que si vous avez un bouclier comme arme en main. Inflige 1 dé 6 +2 dégâts et repousse la cible de 10 mètres. Si la cible a moins de 50% de sa vie max, elle subit ‘’Sonné’’.",
                Psy: 4,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D6+2 Push" }
            },
            {
                nom: "Couverture Parfaite",
                description: "Vous pouvez défendre à la place des alliés autour de vous s’ils subissent un coup pendant le tour suivant, vous défendez autant de fois que nécessaire et vous subissez les dégâts à leur place si vous deviez en subir.",
                Psy: 5,
                Zone: "5mcroix",
                ZoneImage: "systems/alyria/module/data/images/5mcroix.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: "Auto",
                effet: { type: "Buff" }
            },
            {
                nom: "Prière Curative",
                description: "Soigne tous les alliés dans un rayon de 10 mètres autour du paladin de 1 dé 6 +2 PV.",
                Psy: 4,
                Zone: "15mcroixEcentré",
                ZoneImage: "systems/alyria/module/data/images/15mcroixEcentré.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { soin: "1D6+2" }
            },
            {
                nom: "Protéger et Sévir",
                description: "Vous ciblez un allié jusqu’à 15 mètres avec ce sort. Lors de la prochaine attaque au corps-à-corps qu’il subit, vous échangez de place avec lui pour encaisser les dégâts et vous infligez la totalité des dégâts que vous bloquez à l’assaillant.",
                Psy: 4,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "15m",
                Action: "Ne consomme pas d'action",
                Touche: toucheForce,
                effet: { type: "Renvoi" }
            }
        ],
        sortExpert: [
            {
                nom: "Résistance sacrée",
                description: "Le Paladin choisit un élément et y devient résistant jusqu’à la fin du combat ou la révocation de cet effet, cela peut aussi inclure le Neutre. Pendant cet effet le Paladin peut aussi décider que les sorts frappant sur l’élément de son serment frappent plutôt sur cet élément.",
                Psy: 5,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            },
            {
                nom: "Sacrifice pour la cause",
                description: "Le Paladin peut lancer ce sort si un allié doit tomber K.O ou Mourir, il échange sa place avec cet allié et encaisse le coup final à sa place, l’allié se soigne d’autant de dégâts que le Paladin encaisse avec cet effet.",
                Psy: 5,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "MAX",
                Action: "Réaction",
                Touche: toucheCharisme,
                effet: { type: "Anti-Mort" }
            },
            {
                nom: "Serment inviolable",
                description: "Le Paladin renforce ses vœux, pendant 2 tours l’effet bonus ou malus octroyé par son serment est doublé, les sorts qui frappent sur l’élément du serment augmentent leurs dégâts de 4.",
                Psy: 6,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff", bonus: "+4/2tour" }
            },
            {
                nom: "Aura de bénédiction",
                description: "Le lanceur et les alliés à moins de 10 mètres gagnent un avantage sur tous leurs jets de touche et +10% au CC. Cet effet persiste jusqu’à sa révocation. Il est révoqué si le Paladin lance un autre sortilège d’Aura.",
                Psy: 4,
                Zone: "15mcroixEcentré",
                ZoneImage: "systems/alyria/module/data/images/15mcroixEcentré.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Armure Bénie",
                description: "Invoque une armure de lumière qui vous octroie +2 d’armure, +20% de taux de blocage et 8 PB pendant 2 tours.",
                Psy: 6,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: "Auto",
                effet: { type: "Buff" }
            },
            {
                nom: "Punir les Forts",
                description: "Un coup de la plus puissante des épées détruit complètement le mal. Inflige 3 dés 6 dégâts sur l’élément du serment du Paladin et 2 dés 6 de plus si la cible est un Mort-Vivant ou Extra-Planaire et supprime tous les bonus sur la cible. Ce sort a +25% de CC lors de sa première utilisation du combat.",
                Psy: 7,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "3D6 (+2D6extraP)" }
            },
            {
                nom: "Protéger les Faibles",
                description: "Rend tous les alliés sur le terrain Invulnérable pour 1 tour, les soigne de 1 dé 6 + 2 PV à la fin de l’effet.",
                Psy: 6,
                Zone: "Tout le Terrain",
                ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
                Distance: "MAX",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { soin: "1D6+2" }
            },
            {
                nom: "Inquisition Impériale",
                description: "Prend la valeur de votre statistique de défense et l'ajoute à celle de votre force et dexterite, votre valeur de défense devient 0. Tous vos bonus aux taux de blocage deviennent des bonus aux chances de toucher. Votre armure est réduite à 0 devient un bonus de dégâts équivalent à sa valeur. Ce sort reste actif jusqu’au K.O. du Paladin ou la fin du combat.",
                Psy: 7,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            }
        ],
        sortMaitre: [
            {
                nom: "Sanctuaire Sacré",
                description: "Le lanceur et ses alliés à moins de 10 mètres bénéficient de toutes les Auras du Paladin en simultané, ils gagnent donc : un avantage sur tous leurs jets de touche, +10% au CC et un avantage, jets de sauvegarde/Blocage 20% et +2 à l’armure. Les ennemis à moins de 15 mètres du lanceur subissent 1 dé 4 dégâts fixe à chaque fois qu’ils lancent un sort consommant de la PSY. Le Sanctuaire soigne aussi 1 dé 6 PV à chaque allié qui finit son tour à l’intérieur et inflige 1 dé 6 dégâts à chaque ennemis qui finit son tour à l’intérieur. Ce sort dure 2 tours.",
                Psy: 10,
                Zone: "15mcroixEcentré",
                ZoneImage: "systems/alyria/module/data/images/15mcroixEcentré.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: "Meilleure",
                effet: { soin: "1D6", degats: "1D6" }
            }
        ]
            }
    },

moine: {
        
    nom:"Moine",    
    description: "",
        majeures: {
            force: 3,
            dexterite: 0,
            constitution: 2,
            intelligence: 2,
            sagesse: 3,
            charisme: 0,
            defense: 0,
            chance: 0
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
                sortNovice:[{}],
                sortConfirme: [{}],
                sortExpert: [{}],
                sortMaitre: [{}]
            }
    },

roublard: {
        
    nom:"Roublard",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 6,
            constitution: 0,
            intelligence: 0,
            sagesse: 0,
            charisme: 0,
            defense: 0,
            chance: 4
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
                sortNovice:[{}],
                sortConfirme: [{}],
                sortExpert: [{}],
                sortMaitre: [{}]
            }
    },

samourai: {
        
    nom:"Samourai",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 4,
            constitution: 0,
            intelligence: 0,
            sagesse: 2,
            charisme: 0,
            defense: 4,
            chance: 0
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
        mecanique:[],
        talentVoie:{
            niveauJoueur:[1,2,3,4,5,6,7,8,9,10],
            talents:[],
            },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
                sortNovice:[{}],
                sortConfirme: [{}],
                sortExpert: [{}],
                sortMaitre: [{}]
            }
    },

cuisinier: {
        
    nom:"Cuisinier",    
    description: "",
        majeures: {
            force: 1,
            dexterite: 1,
            constitution: 3,
            intelligence: 0,
            sagesse: 1,
            charisme: 4,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: [
            {
                nom: "Habitué du Coup de Rush",
                description: "Ajoute +1 en Force et +10 en Calme.",
                niveauJoueur: 1,
                prerequis: [],
                effet: { force: 1, calme: 10 }
            },
            {
                nom: "Escalope Revigorante",
                description: "À la fin du combat vous et tous vos alliés regagnent automatiquement 2 PV et 2 PSY. (+1 PV / PSY par niveau du cuisinier).",
                niveauJoueur: 2,
                prerequis: ["Habitué du Coup de Rush"],
                effet: { soinFinCombat: { pv: 2, psy: 2, scaling: true } }
            },
            {
                nom: "Bedaine Rembourrée",
                description: "Ajoute +1 en Constitution et +10 en Robustesse.",
                niveauJoueur: 3,
                prerequis: ["Escalope Revigorante"],
                effet: { constitution: 1, robustesse: 10 }
            },
            {
                nom: "Sacoche de Cuisine",
                description: "Ajoute +1 emplacement d’inventaire. Ajoute +1 aux soins prodigués.",
                niveauJoueur: 4,
                prerequis: ["Bedaine Rembourrée"],
                effet: { inventaire: 1, bonusSoin: 1 }
            },
            {
                nom: "Parfum d’Exotisme",
                description: "Le sort Parfum de Cuisson affecte maintenant tous les ennemis sur le terrain. Le ciblage ne dure cependant qu’1 tour. Si vous ne possédez pas ce sort vous ignorez cet effet et vous gagnez la possibilité d’utiliser ce sort à la place.",
                niveauJoueur: 5,
                prerequis: ["Sacoche de Cuisine"],
                effet: { parfumExotisme: true }
            },
            {
                nom: "Sucrerie",
                description: "Ajoute +1 en Charisme. Bonus de 15 en marchandage et persuasion avec tous les personnages d’alignement Neutre ou Bon.",
                niveauJoueur: 6,
                prerequis: ["Parfum d’Exotisme"],
                effet: { charisme: 1, marchandage: 15, persuasion: 15 }
            },
            {
                nom: "Estomac d'Acier",
                description: "Immunité à “Poison“ et “Restauration rapide” soigne maintenant “Poison“, “Brûlure“ et “Engelure“ sur la cible. Si vous ne possédez pas le sortilège, vous ignorez le dernier effet et vous obtenez le sortilège à la place.",
                niveauJoueur: 7,
                prerequis: ["Sucrerie"],
                effet: { immunitePoison: true, restaurationRapide: true }
            },
            {
                nom: "Haut Gastronome",
                description: "Ajoute +1 en Sagesse OU en Force et octroie un avantage lors de tous les jets concernant la cuisine. Immunité à ‘’Sommeil’.",
                niveauJoueur: 8,
                prerequis: ["Estomac d'Acier"],
                effet: { choix: ["sagesse", "force"], avantageCuisine: true, immuniteSommeil: true }
            },
            {
                nom: "Au Fourneau",
                description: "Ajoute +1 en Constitution et octroie une résistance au Feu et une immunité à ‘‘Brûlure’’.",
                niveauJoueur: 9,
                prerequis: ["Haut Gastronome"],
                effet: { constitution: 1, resistanceFeu: true, immuniteBrulure: true }
            },
            {
                nom: "Spécialiste en Gastronomie Locale",
                description: "Tout les sorts commençant par ‘’Spécialité’’ voit leurs soins et dégâts augmentés de 1 dé 4. Si vous n’en possédez aucun, vous ignorez cet effet et en choisissez deux pour les ajouter à vos sortilèges.",
                niveauJoueur: 10,
                prerequis: ["Au Fourneau"],
                effet: { specialiteBonus: "1d4" }
            }
        ]
        },        
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

alchimiste: {
        
    nom:"Alchimiste",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 2,
            constitution: 0,
            intelligence: 5,
            sagesse: 3,
            charisme: 0,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

erudit: {
        
    nom:"Erudit",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 0,
            constitution: 0,
            intelligence: 5,
            sagesse: 5,
            charisme: 0,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

baroudeur: {
        
    nom:"Baroudeur",    
    description: "",
        majeures: {
            force: 1,
            dexterite: 2,
            constitution: 2,
            intelligence: 0,
            sagesse: 0,
            charisme: 1,
            defense: 2,
            chance: 2
        },
        mineures: {},
        mecanique: [
            "Le baroudeur est un habitué des voyages et des routes même les plus dangereuse, il gagne naturellement une résistance dans un élément choisit grâce à cette mécanique.",
            "On m'as dit que: deux fois par scène ou par combat, donné ou prendre la valeur d’une statistique majeures ou mineures à un allié et effectuer son jet sur cette valeur plutôt que la valeur originelle"
        ],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: [
            {
                nom: "Transporteur",
                description: "Ajoute +1 place dans l’inventaire.",
                niveauJoueur: 1,
                prerequis: [],
                effet: { inventaire: 1, force: 1 }
            },
            {
                nom: "Tout Terrain",
                description: "Ajoute +2 en dexterite, octroie un bonus de +15 en acrobatie pour se faufiler ou escalader.",
                niveauJoueur: 2,
                prerequis: ["Transporteur"],
                effet: { dexterite: 2, acrobatie: 15 }
            },
            {
                nom: "Marcheur Véloce",
                description: "Immunité à ‘’Entrave’’. Si vous appliquez ‘’Entrave’’ à un ennemi, vous lui infligez l’équivalent de votre bonus DSB en dégâts supplémentaires.",
                niveauJoueur: 3,
                prerequis: ["Tout Terrain"],
                effet: { immuniteEntrave: true, bonusDSB: true }
            },
            {
                nom: "Connu Partout",
                description: "Ajoute +1 en Charisme. Bonus de 10 dans toutes les statistiques liées au charisme lors d’une discussion amicale.",
                niveauJoueur: 4,
                prerequis: ["Marcheur Véloce"],
                effet: { charisme: 1, bonusCharisme: 10 }
            },
            {
                nom: "Vadrouilleur de Banquise",
                description: "Immunité à ‘’Engelure’’. Lorsque vous faites un CC pour toucher avec votre arme, vous appliquez ‘’Engelure’’.",
                niveauJoueur: 5,
                prerequis: ["Connu Partout"],
                effet: { immuniteEngelure: true, appliqueEngelureCC: true }
            },
            {
                nom: "Polyglotte",
                description: "Ajoute +1 en Charisme. Permet de parler une langue supplémentaire (sauf Ancien).",
                niveauJoueur: 6,
                prerequis: ["Vadrouilleur de Banquise"],
                effet: { charisme: 1, langueSup: true }
            },
                {
                nom: "Infatigable",
                description: "Le personnage ne ressent pas la fatigue, il ne peut plus être victime de désavantage lors d’un jet de statistiques liées à la dexterite, à la Défense ou à la Force.",
                niveauJoueur: 7,
                prerequis: ["Polyglotte"],
                effet: { immuniteFatigue: true }
                },
                {
                nom: "Barda Infini",
                description: "Ajoute +2 places d’inventaire et +1 en Force.",
                niveauJoueur: 8,
                prerequis: ["Infatigable"],
                effet: { inventaire: 2, force: 1 }
                },
                {
                nom: "Voyageur Chevronné",
                description: "A chaque fois que vous appliquez « Entrave » l’ennemi doit réussir son jet de sauvegarde avec un désavantage. Ajoute +1 en dexterite ou en Charisme ou en Force.",
                niveauJoueur: 9,
                prerequis: ["Barda Infini"],
                effet: { choix: ["dexterite", "charisme", "force"], entraveDesavantage: true }
                },
                {
                nom: "L’important n’est pas la Destination",
                description: "Accorde un bonus permanent de +10% de chances de toucher et +2 dégât au Baroudeur s’il a deux alliés ou plus à moins de 10 mètres, les alliés gagnent +2 d'armure et 10% de blocage si le baroudeur est à moins de 10 mètres.",
                niveauJoueur: 10,
                prerequis: ["Voyageur Chevronné"],
                effet: { bonusToucher: 10, bonusDegats: 2, allies: { armure: 2, blocage: 10, portee: 10 } }
                }
            ]
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

forgeron: {
        
    nom:"Forgeron",    
    description: "",
        majeures: {
            force: 4,
            dexterite: 0,
            constitution: 3,
            intelligence: 0,
            sagesse: 0,
            charisme: 0,
            defense: 3,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

barde: {
        
    nom:"Barde",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 0,
            constitution: 0,
            intelligence: 0,
            sagesse: 0,
            charisme: 8,
            defense: 0,
            chance: 2
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

voleur: {
        
    nom:"Voleur",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 8,
            constitution: 0,
            intelligence: 0,
            sagesse: 0,
            charisme: 0,
            defense: 0,
            chance: 2
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
            niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

marchand: {
        
    nom:"Marchand",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 2,
            constitution: 0,
            intelligence: 2,
            sagesse: 0,
            charisme: 6,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
            niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

danseur: {
        
    nom:"Danseur",    
    description: "",
        majeures: {
            force: 2,
            dexterite: 5,
            constitution: 0,
            intelligence: 0,
            sagesse: 0,
            charisme: 3,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: [
            {
                nom: "Danseur étoile",
                description: "Ajoute +1 en dexterite et +10 en Art et Musique.",
                niveauJoueur: 1,
                prerequis: [],
                effet: { dexterite: 1, artmusique: 10 }
            },
            {
                nom: "Danseur vedette",
                description: "Ajoute +1 en Charisme OU dexterite, et +10 en Connaissance Monde, vous obtenez un avantage sur vos jets de ciblage.",
                niveauJoueur: 2,
                prerequis: ["Danseur étoile"],
                effet: { choix: ["charisme", "dexterite"], monde: 10, avantageCiblage: true }
            },
            {
                nom: "Forte Fièvre",
                description: "Modifie le sort \"Fièvre du disco\", l’effet s’applique à CHAQUE déplacement hors du tour de jeu de la cible. Si vous ne possédez pas ce sort vous ignorez cet effet et débloquez le sort.",
                niveauJoueur: 3,
                prerequis: ["Danseur vedette"],
                effet: { forteFievre: true }
            },
            {
                nom: "Danseur infatigable",
                description: "Ajoute +1 en Force OU dexterite, et +10 en Athlétisme,  vous êtes immunisé à Entrave.",
                niveauJoueur: 4,
                prerequis: ["Forte Fièvre"],
                effet: { choix: ["force", "dexterite"], athlétisme: 10, immuniteEntrave: true }
            },
            {
                nom: "Performeur",
                description: "Ajoute +1 en Charisme OU Force. Le Danseur obtient un avantage sur ses jets d’Art et Musique.",
                niveauJoueur: 5,
                prerequis: ["Danseur infatigable"],
                effet: { choix: ["charisme", "force"], avantageArtMusique: true }
            },
            {
                nom: "Danse hypnotique",
                description: "Donne l’immunité à Charme, tous les sorts de Danseur coutant plus de 5 PSY appliquent aussi Silence en plus de leurs effets.",
                niveauJoueur: 6,
                prerequis: ["Performeur"],
                effet: { immuniteCharme: true, silenceSorts: true }
            },
            {
                nom: "Entrer dans la Danse",
                description: "Les alliés peuvent utilisés un sort de que le Danseur vient d’utiliser pendant leur tour de jeu, dans ce cas il n’infligera que la moitié des dégâts possibles mais gardera tous ses effets et consommera autant de PSY.",
                niveauJoueur: 7,
                prerequis: ["Danse hypnotique"],
                effet: { partageSort: true }
            },
            {
                nom: "Phénomène de la scène",
                description: "Le Danseur gagne +1 DSB à chaque sort de la branche Danseur qu’il utilise dans le combat.",
                niveauJoueur: 8,
                prerequis: ["Entrer dans la Danse"],
                effet: { dsbParSort: 1 }
            },
            {
                nom: "Gala de clôture inoubliable",
                description: "Le sort \"Ballet de clôture\" inflige également 1 dé 6 dégâts par sort de danse utilisé avant son lancement à tous les ennemis. Si vous ne possédez pas ce sort vous le débloquez à la place et ignorez cet effet.",
                niveauJoueur: 9,
                prerequis: ["Phénomène de la scène"],
                effet: { galaCloture: true }
            },
            {
                nom: "Chorégraphe Professionnel",
                description: "Après l’utilisation d’un sort de la voie du Danseur vous pouvez bouger toutes les entités à votre corps à corps de 5 mètres dans la direction voulue. SI un allié bouge de cette manière il gagne le même bonus que vous octroie « Phénomène de la scène » pendant un tour.",
                niveauJoueur: 10,
                prerequis: ["Gala de clôture inoubliable"],
                effet: { deplacementAllies: 5, bonusPhenomene: true }
            }
        ]
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [
            {
                nom: "Numéro de claquette",
                description: "Vous frappez des pieds en rythme ce qui augmente votre vitesse d’un cran pour 2 tours et vous permet aussi d’ignorer les attaques d’opportunités et les effets limitant le déplacement pendant cet effet.",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheDexterite,
                effet: { type: "Buff" }
            },
            {
                nom: "Makahaka",
                description: "Le lanceur pratique une danse Orc guerrière qui consiste entre autre à mettre des baffes puissantes à son voisin direct. Un adversaire au corps à corps subit 1 dé 6 +2 dégâts et recule de 5 mètres",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D6+2 Push" }
            },
            {
                nom: "Fièvre du disco",
                description: "Une frénésie étrange s’empare de tous les ennemis sur le terrain, à chaque fois qu’un ennemi est déplacé hors de son tour de jeu il subit 1 dé 4 dégâts fixe, cet effet n’a d’occurrence qu’une seule fois par tour. Son effet dure 3 tours ou jusqu’à ce qu’il soit révoqué",
                Psy: 3,
                Zone: "Tout le terrain",
                ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
                Distance: "MAX",
                Action: "Ne consomme pas d'action",
                Touche: "Auto",
                effet: { degats: "1D4 fixe" }
            },
            {
                nom: "Bachata rapide",
                description: "Vous vous déplacez vous, ou une cible au corps à corps, de 5 mètres dans la direction voulue. Ce sort ne consomme pas d’action mais ne peut être lancé qu’une fois par tour et par cible",
                Psy: 1,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: "Auto",
                effet: { type: "Push" }
            },
            {
                nom: "Pas rapide",
                description: "Vous augmentez votre vitesse de 1 cran, cet effet coûte 1 PSY de plus par tour pour être maintenu.",
                Psy: 1,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: "Auto",
                effet: { type: "Buff" }
            },
            {
                nom: "Ecraseur de Godasse",
                description: "Technique inventée par un célèbre danseur nain, elle consiste simplement à aplatir les pieds de ceux avec qui vous dansez. Inflige 1 dé 6 +1 dégâts et \"Entrave\" à un ennemi au corps à corps",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D6+1 Entrave" }
            },
            {
                nom: "Tempo Perso",
                description: "Vous pouvez retirer une altération d’état basée sur la Sagesse à vous ou un allié au corps à corps, pendant 2 tours la cible de ce sort est immunisée à toutes les altérations d’état basées sur la Sagesse.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Purge" }
            },
            {
                nom: "Mauvais Tempo",
                description: "Vous désignez une cible, à chaque fois qu’elle se déplace elle doit faire un jet de sauvegarde de dexterite avec avantage, si elle le loupe elle subit Entrave irrésistible",
                Psy: 2,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Entrave" }
            },
            {
                nom: "Danse du ventre",
                description: "Lors d’une attaque subie au corps à corps, le danseur augmente son taux de blocage de 20%, s’il réussit à bloquer il se déplace de 5 mètres comme il le désire sans subir les attaques d’opportunité, tant que ce sort est actif on peut bloquer autant de fois que voulu par tour. Cet effet dure 2 tours",
                Psy: 4,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheDexterite,
                effet: { type: "Buff" }
            },
            {
                nom: "Danse-Danse Gnomulesque",
                description: "Vous exécuter une danse Gnome extrêmement rapide et qui consiste en une petite série de mouvements répétés en boucle. Vous vous déplacez de 5 mètres en ignorant les effets négatifs et les attaques d’opportunités jusqu’à 3 fois quand vous voulez pendant le tour ou à était lancé ce sort, à chaque déplacement les ennemis au corps à corps de la case de départ subissent Entrave.",
                Psy: 3,
                Zone: "5mcroix",
                ZoneImage: "systems/alyria/module/data/images/5mcroix.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheDexterite,
                effet: { type: "Entrave" }
            },
            {
                nom: "Charleston communicatif",
                description: "Vous vous lancez dans un charleston rapide et qui donne furieusement envie de vous rejoindre, toutes les entités au corps à corps se mettent à danser jusqu’à l’épuisement, ils subissent 1 dé 6 +1 dégâts et Entrave.",
                Psy: 4,
                Zone: "5mcroix",
                ZoneImage: "systems/alyria/module/data/images/5mcroix.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { degats: "1D6+1" }
            },
            {
                nom: "Valse à trois temps",
                description: "Vous attrapez un ennemi au corps à corps et dansez une valse avec lui, à ce titre vous lui infligez 1 dé 6 dégâts et vous pouvez déplacez de 10 mètres tout en prenant la cible avec vous.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { degats: "1D6 Push" }
            }
        ],
        sortConfirme: [
            {
                nom: "Capoeira intimidante",
                description: "Vous dansez en faisant mine de donner des coups de poings et de pieds à votre adversaire, il ne pourra plus se défendre lors de ce tour, et voit ses point de bouclier tomber à 0.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheDexterite,
                effet: { type: "Débuff" }
            },
            {
                nom: "La chenille",
                description: "Vous empoignez une cible au corps à corps et la faite avancer de dix mètres dans une direction voulue, si la cible arrive au corps à corps d’une autre cible elle l’attrape et vous avancez à nouveau de dix mètres et ainsi de suite jusqu’à ce qu’aucune cible ne reste ou que vous ne parveniez pas à en attraper une autre. Quand l’effet se termine vous infligez 1 dé 4 dégâts par cible touchée par l’effet du sort à tous les ennemis pris dans la chenille.",
                Psy: 5,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "10m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D4 / ennemi" }
            },
            {
                nom: "La Gob-Gob mania",
                description: "Le lanceur se lance dans une danse gobeline interminable et impossible à prédire, il gagne +20% en blocage et +2 d’armure. S’il fait un blocage pendant l’effet de ce sort il inflige 1 dé 6 dégâts à la cible bloquée et la déplace de 5 mètres. Ce sort dure 2 tours.",
                Psy: 5,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { type: "Buff / 1D6" }
            },
            {
                nom: "Danse des célestes",
                description: "Le Danseur devient \"Volant\" pour 2 tours et gagne 2 PB et 10% de blocage",
                Psy: 4,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Smurf Robotique",
                description: "Le Danseur exécute des pas entrecoupés de blocages comme un robot défaillant, la prochaine attaque encaissée sera totalement annulée et, s’il aurait dû subir des dégâts, le lanceur gagne 1 cran en vitesse.",
                Psy: 4,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            },
            {
                nom: "Pas torrides",
                description: "Le danseur fait monter la chaleur d’un cran, il inflige 1 dé 8 + 2 et Brulure à tous les ennemis à son corps à corps, pendant 2 tours après l’utilisation de ce sort le Danseur est Immunisé à \"Brulure\" et résiste au Feu mais est faible à L’Eau.",
                Psy: 5,
                Zone: "5mcroix",
                ZoneImage: "systems/alyria/module/data/images/5mcroix.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D8+2 Brulure" }
            },
            {
                nom: "Sens du Rythme",
                description: "Ce sort soigne 1 dé 4 PV à tous les alliés s’étant déplacer ce tour ci, vous soignez 1 dé 4 PV supplémentaires si ils se sont déplacés en dehors de leur tour de jeu. Les ennemis qui se sont déplacez subissent 1 dé 6 dégâts, les ennemis n’ayant pas bougé subissent le double de dégâts. Le lanceur, s’il a bougé ou fait bougé plus de trois fois lors de ce tour gagne 20% en Blocage  pour 2 tours, et se soigne de 1 dé 6+2 PV.",
                Psy: 5,
                Zone: "Tout le Terrain",
                ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
                Distance: "MAX",
                Action: "Action",
                Touche: "Auto",
                effet: { type: "Débuff" }
            },
            {
                nom: "Danse interdite",
                description: "Le lanceur pratique une danse elfe des bois interdite et langoureuse, il inflige 1 dé 6 dégâts et \"Charme\" à une cible jusqu’à 15 mètres et cette dernière et attirée jusqu’à son corps à corps.",
                Psy: 4,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "15m",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { degats: "1D6 Charme" }
            },
            {
                nom: "Tango brulant",
                description: "Le lanceur se lance dans un tango endiablé avec une cible au corps à corps, il peut se déplacer de 10 mètres avec la cible dans la direction souhaitée. Si c’est un ennemi il subit 1 dé 6 +2 dégâts Feu et \"Brulure\", si c’est un allié il est guérit \"d’Entrave\", \"Sonné\" et \"Engelure\", gagne 1 cran en vitesse et +10% de chances de toucher pour 2 tours.",
                Psy: 4,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { degats: "1D6+2 Feu" }
            }
        ],
        sortExpert: [
            {
                nom: "Salsa de Santis",
                description: "Le lanceur danse comme Santis incarné, Pendant 2 tours, le lanceur créer une copie de lui-même de sexe opposé avec les exactes mêmes statistiques que lui, cette invocation peut jouer son tour juste après lui et est totalement autonome. L’invocation et le lanceur ne peuvent utiliser que les sorts de Danseur pendant l’utilisation de ce sort mais ils ne coûtent que la moitié de leur PSY habituelle. utilisable une seule fois par combat, si le lanceur doit mourir pendant l’effet il sacrifie son invocation à la place et conserve 1 PV",
                Psy: 12,
                Zone: "Invocation",
                ZoneImage: "systems/alyria/module/data/images/invocation.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: "Meilleure",
                effet: { type: "Buff" }
            },
            {
                nom: "Hymne des cendres",
                description: "Danse rituelle des elfes noirs, elle met le danseur dans une transe combattante pleine de grâce et d’agressivité. Pendant 2 tours, le lanceur et toutes les entités alliés à son corps à corps gagnent +2 au DSB, +10% aux chances de toucher et déplacent toutes les cibles qu’elles frappent de 5 mètres dans la direction voulue.",
                Psy: 7,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { type: "Buff" }
            },
            {
                nom: "Danse dimensionnelle",
                description: "Le danseur et jusqu’à 2 cibles choisit à moins de 15 mètres de lui se téléporte où il le désire sur le terrain. Chaque cible se voit choisir une destination par le danseur. Une fois à destination les ennemis subissent 1 dé 8 dégâts et les alliés se soignent de 1 dé 8 PV.",
                Psy: 6,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "15m",
                Action: "Action",
                Touche: "Auto",
                effet: { degats: "1D8", soin: "1D8" }
            },
            {
                nom: "Communion du Butô",
                description: "Le lanceur danse pour communier avec les esprits et les forces naturelles. Ce sort frappe dans un élément choisi au moment de son lancement et infligera 2 dé 8 dégâts à un ennemi où qu’il soit sur le terrain",
                Psy: 7,
                Zone: "Tout le terrain",
                ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
                Distance: "MAX",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { degats: "2D8" }
            },
            {
                nom: "Gigue aux dingues",
                description: "Danse Occidentale réputée pour sa vitesse frénétique, il faut une endurance hors du commun pour la tenir jusqu’au bout. Le danseur doit faire un jet de sauvegarde en force et tous les ennemis à moins de 10 mètres de lui doivent faire un jet de sauvegarde de force avec désavantage. S’ils le loupent ils subissent 1 dé 10 dégâts en PV et en PSY et la moitié s’ils le réussissent, si le lanceur le loupe il se retire 4 PV en plus du coût de ce sort",
                Psy: 5,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "10m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D10 pv/psy" }
            },
            {
                nom: "Limbo endiablé",
                description: "Une barre enflammée apparait et descend petit à petit le lanceur et une cible à son corps à corps doivent consécutivement faire des jets de sauvegarde de dexterite à tour de rôle pour passer en dessous jusqu’à ce que l’un rate, le danseur les fait avec avantage et sa cible avec désavantage. Si le danseur rate il subit 1 dé 6 dégâts mais devient enragé et gagne une action supplémentaire pour 2 tours, si la cible rate elle se fait carbonisé par la barre et subit 2 dé 6 + 4 dégâts et Brulure irrésistible",
                Psy: 7,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "2D6+4 Brulure" }
            },
            {
                nom: "Meurtrier Tecktonik",
                description: "Pendant 2 tours le lanceur peut traverser les entités lors de ses déplacements, s’il en traverse un ennemi il lui inflige Terreur et 1 dé 4 dégâts, cet effet ne peut se produire qu’une fois par tour et par cible.",
                Psy: 5,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "15m",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { degats: "1D8 pv/psy Débuff" }
            },
            {
                nom: "Pas fantômes",
                description: "Pendant 2 tours le lanceur peut traverser les entités lors de ses déplacements, s’il en traverse un ennemi il lui inflige Terreur et 1 dé 4 dégâts, cet effet ne peut se produire qu’une fois par tour et par cible",
                Psy: 5,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { degats: "1D4 Terreur" }
            },
            {
                nom: "Ballet de clôture",
                description: "Le lanceur force tous les ennemis sur le terrain à suivre ses pas, la prochaine capacité de Danseur qu’il utilisera verra alors tous ses effets doublés, que ce soit les bonus, les malus, ou les dégâts et elle appliquera ses effets sur toutes les entités sur le terrain. Ce sort met le lanceur dans l’état Sonné irrésistible pour le tour suivant l’utilisation de la capacité augmentée. Ne peut être utilisé qu’une fois par combat",
                Psy: 6,
                Zone: "Tout le terrain",
                ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
                Distance: "MAX",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            }
        ],
        sortMaitre: []
        }
    },

dresseur: {
        
    nom:"Dresseur",    
    description: "",
        majeures: {
            force: 1,
            dexterite: 2,
            constitution: 3,
            intelligence: 0,
            sagesse: 1,
            charisme: 2,
            defense: 1,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

prestidigitateur: {
        
    nom:"Prestidigitateur",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 3,
            constitution: 0,
            intelligence: 4,
            sagesse: 0,
            charisme: 3,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

cartomancien: {
        
    nom:"Cartomancien",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 0,
            constitution: 0,
            intelligence: 1,
            sagesse: 0,
            charisme: 2,
            defense: 0,
            chance: 7
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: [
            {
                nom: "Chance Insolente",
                description: "Ajoute +2 en Chance. Bonus +20 au hasard en situation critique ou lors d'un jeu de hasard.",
                niveauJoueur: 1,
                prerequis: [],
                effet: { chance: 2, hasard: 20 }
            },
            {
                nom: "Destinée Magnifique",
                description: "Ajoute +1 en dexterite et en Charisme. Vous ignorez les tentatives de ciblage adverse, car votre destin vous appartient.",
                niveauJoueur: 2,
                prerequis: ["Chance Insolente"],
                effet: { dexterite: 1, charisme: 1, ignoreCiblage: true }
            },
            {
                nom: "Bonne Aventure",
                description: "A la fin d’un combat, le Cartomancien tire une carte. Si c’est une reine ou un roi, on ajoutera un dé de butin supplémentaire.",
                niveauJoueur: 3,
                prerequis: ["Destinée Magnifique"],
                effet: { carteButin: true }
            },
            {
                nom: "Prédiction",
                description: "Quitte ou double devient : si vous fait 1 ou 2, vous ne subissez rien. Si vous fait faite 6, vous prenez le double de dégâts. Sinon rien ne se passe. Si vous ne possédez pas ce sort vous ignorez l’effet et le débloquez à la place.",
                niveauJoueur: 4,
                prerequis: ["Bonne Aventure"],
                effet: { prediction: true }
            },
            {
                nom: "Tricherie",
                description: "Le sort \"Lancer de Carte\" Permet désormais de tirer deux cartes mais vous n’en gardez qu’une seule pour appliquer son effet et celle qui n’est pas retenu ne compte pas pour les effets de combinaison.",
                niveauJoueur: 5,
                prerequis: ["Prédiction"],
                effet: { tricherie: true }
            },
            {
                nom: "Bonne Etoile",
                description: "Ajoute +2 en Chance. Si vous devez mourir d’une attaque, vous encaissez avec 1 PV et subissez ‘’Sommeil’’ à la place. Utilisable 1 fois par combat.",
                niveauJoueur: 6,
                prerequis: ["Tricherie"],
                effet: { chance: 2, survieSommeil: true }
            },
            {
                nom: "Mains sur le Destin",
                description: "Immunité à ‘’Charme’’ et ‘’Silence’’.",
                niveauJoueur: 7,
                prerequis: ["Bonne Etoile"],
                effet: { immuniteCharme: true, immuniteSilence: true }
            },
            {
                nom: "Maître des Cartes",
                description: "Les effets des cartes sont doublés. Si vous avez déjà un effet doublé vous le triplez et le sort octroie +10% de chances de CC pendant l’effet de la carte. La carte Joker octroie une résistance élémentaire aux choix pendant un tour en plus de son effet.",
                niveauJoueur: 8,
                prerequis: ["Mains sur le Destin"],
                effet: { carteDouble: true, carteTriple: true, bonusCC: 10, jokerResistance: true }
            },
            {
                nom: "Astrologue",
                description: "Ajoute +2 en Intelligence. Bonus de +30 en connaissance sacré, monde et mystique pour tout ce qui concerne les cartes, les astres et la Divinité Scélenis.",
                niveauJoueur: 9,
                prerequis: ["Maître des Cartes"],
                effet: { intelligence: 2, sacré: 30, monde: 30, mystique: 30 }
            },
            {
                nom: "Chance Infinie",
                description: "Si vous avez plus de 50% de chances de CC lors de la réalisation d’une attaque, vous transformez votre chance d’EC en échec simple. Vous gagnez aussi un avantage lors de tous vos jets de hasard et d'intuition.",
                niveauJoueur: 10,
                prerequis: ["Astrologue"],
                effet: { ccToEchec: true, avantageHasard: true, avantageIntuition: true }
            }
        ]
        },
        sortVoie: {
            niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [
            {
                nom: "Flot de Cartes",
                description: "Le lanceur fait sortir un déluge de cartes tranchantes de ses mains, inflige 1 dé 6 dégâts dans la zone et permet de tirer une carte par ennemi touchés.",
                Psy: 4,
                Zone: "10mcone",
                ZoneImage: "systems/alyria/module/data/images/10mcone.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D6" }
            },
            {
                nom: "Carte Forte",
                description: "Si vous avez appliqué l’effet d’une Reine ou un Valet en dernier ce sort soigne 1 dé 6+1 PV si vous avez appliqué l’effet d’un As ou d’un Roi en dernier ce sort inflige 1 dé 6+1 dégâts.",
                Psy: 3,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D6+1" }
            },
            {
                nom: "Heureux hasard",
                description: "Vous pouvez lancer ce sort juste après avoir raté un jet de dé, vous pouvez relancer le jet et garderez le résultat obtenu même s’il est pire. Ce sort ne peut pas être utilisé deux fois pour le même jet.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consommer pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Relance" }
            },
            {
                nom: "Ratage Total",
                description: "Influez sur un adversaire au corps-à-corps, celui-ci voit son taux de CC diminué à 0 et son taux d’EC augmenter de 20% pendant 2 tours. Ce sort lui inflige aussi 1 dé 6 dégâts.",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D6 Débuff" }
            },
            {
                nom: "Tarot Malchanceux",
                description: "Vous pouvez choisir une cible jusqu’à 25 mètres. A chaque fois que vous piochez une carte et que son effet s’applique à vous, la cible subira le même effet en négatif pendant la même durée. L’effet de ce sort reste actif jusqu’à la mort de la cible ou la réutilisation du sort sur une autre cible.",
                Psy: 3,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "25m",
                Action: "Ne cosomme pas d'Action",
                Touche: toucheCharisme,
                effet: { type: "Nul" }
            },
            {
                nom: "Coup de Bol",
                description: "Octroie un bonus de 10% au CC mais aussi d’EC pendant les 3 prochains tours. Ce sort ne consomme pas d'action et sont effet est cumulable deux fois maximum.",
                Psy: 1,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Main pleine",
                description: "Vous pouvez tirer 2 cartes au lieu d’une avec \"Lancer de Carte\", mais vous n’en garderez qu’une seule pour appliquer ses effets et jouer les combinaisons. Ce sort dure jusqu’à sa révocation et coûte 1 PSY par tour à maintenir.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Mauvaise pioche",
                description: "L’adversaire tire une carte, son effet est doublé et appliqué en tant que Malus, il prend ensuite 1 dé 6 dégâts. La carte tirée compte pour les combinaisons de la mécanique.",
                Psy: 4,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D6" }
            },
            {
                nom: "Tarot Chanceux",
                description: "Vous désignez un allié à jusqu’à 25 mètres, l’effet des cartes qui vous sont appliqué lui sont appliqué aussi. L’effet de ce sort reste actif jusqu’à la mort de la cible ou la réutilisation du sort sur une autre cible.",
                Psy: 4,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "25m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Débuff" }
            },
            {
                nom: "Ratage Partiel",
                description: "Ce sort attenu les échecs critiques en les transformant en échec normal. Vous obtenez aussi +20% au blocage. L'effet dure 1 tour.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Réaction",
                Touche: toucheCharisme,
                effet: { type: "Nul" }
            },
            {
                nom: "Bord Tranchant",
                description: "Le lanceur utilise ses cartes pour taillader un ennemi, inflige 1 dé 6 +3 dégâts",
                Psy: 3,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D6+3" }
            },
            {
                nom: "Quitte ou Double",
                description: "Lors de la prochaine attaque que vous recevez, vous lancez 1 dé 6. Si vous faite 1, vous ne subissez rien. Si vous faites 6, vous prenez le double de dégâts, sinon rien ne se passe.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d’action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            }
        ],
        sortConfirme: [
            {
                nom: "Croupier féérique",
                description: "Le lanceur invoque une fée ou un petit élémentaire qui tient le rôle de croupier. A chaque fois que le Cartomancien pioche une carte le croupier en pioche une aussi. Toutes les améliorations du croupier sont aussi appliquées au lanceur. L’invocation possède 8 PV et une résistance dans un élément choisit, elle inflige 1 dé 4 dégâts à distance en tirant des cartes.",
                Psy: 5,
                Zone: "Invocation",
                ZoneImage: "systems/alyria/module/data/images/invocation.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D4" }
            },
            {
                nom: "Carte-Pharnaüm",
                description: "Ce sort ne peut s’utiliser que si vous avez pioché au moins 4 cartes et qu’aucune combinaison ne s’est réalisée. Vous pouvez choisir entre déclencher l’effet d’une combinaison au choix en doublant sa durée et son effet OU Infligez X dé 2 dégâts (ou X est le nombre de cartes piochées) à une cible jusqu’à 30 mètres",
                Psy: 4,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "30m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "x D2" }
            },
            {
                nom: "Joker Fou",
                description: "Si vous avez déjà pioché un Joker durant ce combat, vous pouvez utiliser ce sort. Il inflige X dé 6 dégâts (X est le nombre de cartes Joker piochées pendant ce combat) à tous les adversaires où qu’ils soient en faisant pleuvoir des cartes. Le compte des cartes joker piochées se réinitialise à l'utilisation de ce sort et à la fin du combat",
                Psy: 6,
                Zone: "Tout le Terrain",
                ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
                Distance: "MAX",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "x D6" }
            },
            {
                nom: "Pioche de Défausse",
                description: "Vous pouvez réappliquer l’effet de la carte tirée au tour précédent. Ce sort compte comme un tirage de carte normal. Utilisable 1 fois par tour",
                Psy: 1,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne  consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Dans la Manche",
                description: "Le lanceur tire 2 cartes et s’applique les deux effets. Si l’une des deux est un As, l’effet dure 2 tours au lieu d’un. Utilisable 1 fois par tour et compte comme un tirage de carte.",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d’action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Paris Truqué",
                description: "Vous désignez une cible avec ce sort où qu’elle soit, si elle est la prochaine cible à tomber K.O ou Mort pendant ce combat vous gagnez +10% de chances de CC, de toucher et +1 DSB jusqu’à la fin du combat. Si la cible de ce sort est un allié, juste après être tombé K.O il revient à la vie avec 1 PV. SI la cible de ce sort est un ennemi et qu’il n’est pas le premier à tomber K.O vous lui infligez 1 dé 8 dégâts, si ces dégâts le tue vous gagnez tout de même le bonus comme s’il était K.O en premier",
                Psy: 4,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "MAX",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Cocu",
                description: "Vous infligez 1 dé 6 +1 dégât et Charme à un adversaire. Si vous faites un CC avec ce sort, un second adversaire de votre choix subit Charme également",
                Psy: 4,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D6+1" }
            },
            {
                nom: "C’est votre Carte ?",
                description: "Utilisable uniquement si vous avez un ou plusieurs effets de cartes actifs. Alors, l’adversaire lance 1 dé 6, s’il fait le résultat correspondant à une carte active, il subit 2 dés 6 +2 dégâts sinon 1 dé 6 +2 dégâts.",
                Psy: 5,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1 à 2 D6+2" }
            },
            {
                nom: "Âme des Cartes",
                description: "Vous tirez une carte, l’effet de la carte et de la combinaison appliquée grâce à ce sort est doublé et dure 2 tours. Ce sort compte comme un tirage de carte",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            }
        ],
        sortExpert: [
            
            {
                nom: "Mélange Maitrisé",
                description: "Le lanceur choisit une carte, il s’applique le double des effets de la carte et de la combinaison obtenue. Compte comme un tirage de carte. Utilisable 1 fois par tour.",
                Psy: 2,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Carte Maitresse",
                description: "Vous choisissez une de vos cartes, son effet est quadruplé de manière permanente, mais pas sa durée, elle ne subit plus aucune augmentation d’une autre sorte. Cet effet dure jusqu’à ce que vous relancer ce sort pour une autre carte ou jusqu’à sa révocation.",
                Psy: 4,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Ultime Tapis",
                description: "Le Cartomancien pioche 6 cartes, les effets de ces cartes sont doublés y compris celui des combinaisons éventuelles et leur durée est infinie. Il ne pourra plus jamais piocher de cartes du combat d’aucune manière, de plus il perd 3 PV à chaque début de tour. ne s’interrompt que si le lanceur meurt ou tombe K.O",
                Psy: 6,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Tour de carte",
                description: "Tout les effets de cartes et de combinaison du lanceur sont appliqués à tous les alliés sur le terrain pendant 1 tour",
                Psy: 5,
                Zone: "Tout le terrain",
                ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
                Distance: "MAX",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Pile ou Face Mortel",
                description: "Le lanceur choisit un ennemi et lance 1 dé 2. S’il fait 1 l’adversaire subit 4 dés 8 dégâts, s’il fait 2 le lanceur subit 2 dé 8 dégâts. Si ce sort doit tuer ou mettre K.O une cible le survivant récupère 1 dé 10 PV.",
                Psy: 6,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "2 à 4 D8" }
            },
            {
                nom: "Baraka de Scélenis",
                description: "Le lanceur devient aussi chanceux que la déesse du Destin. Pendant ce tour il est \"Invulnérable\" et il fait un coup critique sur tous ses sorts automatiquement s’il les réussit. Tous les effets d’augmentation ou de malus qu’il applique le sont pour 1 tour supplémentaire.  coûte 4 PSY de plus à lancer à chacune de ses utilisations dans le même combat.",
                Psy: 6,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Prendre la Main",
                description: "Vous pouvez lancer ce sort n’importe quand hors de votre tour de jeu, vous obtenez un tour supplémentaire que vous jouez immédiatement après l’entité en train de jouer. Au début de ce tour vous piochez deux cartes et leurs effets sont doublés.",
                Psy: 7,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Réaction",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Transfert de Chance",
                description: "Vous pouvez utiliser ce sort immédiatement après avoir fait un CC. Transférez la moitié de votre taux de critique à un allié à moins de 15 mètres. Utilisable 1 fois par tour.",
                Psy: 2,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "15m",
                Action: "Ne consomme pas d’action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            }
        ],
        sortMaitre: [
            {
                nom: "Hérault du Hasard",
                description: "Pendant 2 tours, vous ne pouvez plus rater de jet. Les chances d’EC deviennent des chances de CC. Les adversaires qui veulent vous frapper doivent lancer 1 dé 2. S’ils font 2, ils ne vous infligent aucun dégât sinon ils attaquent normalement. Tous les effets et la durée des cartes et des combinaisons sont triplés peu importe la manière de tirage mais vous ne prenez plus en compte aucune augmentation d'effet supplémentaire. Vous gagnez +20% de chances de CC.",
                Psy: 11,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: "Meilleure",
                effet: { type: "Buff" }
            },]
        }
    },

animancien: {
        
    nom:"Animancien",    
    description: "",
        majeures: {
            force: 3,
            dexterite: 0,
            constitution: 2,
            intelligence: 2,
            sagesse: 3,
            charisme: 0,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

invocateur: {
        
    nom:"Invocateur",      
    description: "",
        majeures: {
            force: 0,
            dexterite: 1,
            constitution: 0,
            intelligence: 4,
            sagesse: 2,
            charisme: 0,
            defense: 2,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

elementariste: {
        
    nom:"Elémentariste",   
    description: "",
        majeures: {
            force: 2,
            dexterite: 0,
            constitution: 3,
            intelligence: 3,
            sagesse: 2,
            charisme: 0,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

mage: {
        
    nom:"Mage",
    description: "",
        majeures: {
            force: 0,
            dexterite: 0,
            constitution: 0,
            intelligence: 7,
            sagesse: 0,
            charisme: 3,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

chaman: {
        description: "",
        majeures: {
            force: 0,
            dexterite: 2,
            constitution: 2,
            intelligence: 2,
            sagesse: 1,
            charisme: 0,
            defense: 3,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
            niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

prêtre: {
        description: "",
        majeures: {
            force: 0,
            dexterite: 0,
            constitution: 0,
            intelligence: 4,
            sagesse: 2,
            charisme: 4,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

cultiste: {
        
    nom:"Cultiste",    
    description: "",
        majeures: {
            force: 2,
            dexterite: 0,
            constitution: 3,
            intelligence: 3,
            sagesse: 1,
            charisme: 1,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

magicka: {
        
    nom:"Magicka",    
    description: [
            "Les Magickas sont des combattantes usant d'une magie étrange capable d'apporter la justice, le bonheur et l'amour en ce monde, elles sont très peu nombreuses et doivent suivre un entrainement intensif et particulier auprès d'une de leur aînée pour pouvoir un jour devenir elles aussi une vraie Magicka. Elles partagent généralement des valeurs de défense des faibles, et exècrent le mal mais il n'y a aucune unité réelle dans cette voie et il n'est pas impossible de trouver des Magicka du côté obscur. De même qu'il n'est pas impossible de trouver des Magicka mâle, même si ceux là sont encore plus rare et souvent moqués.", 
            "Les Magickas possèdent des capacités permettant d'être très polyvalente et de s'adapter pour réussir face à n'importe qu'elle situation, elle utilise des métamorphoses leurs octroyant divers pouvoirs et sont capable aussi bien de soigner efficacement que d'infliger de lourd dégâts.", 

            "Particularité : La voie de la Magicka ne peut être utilisée qu'en Monovoie."],
        majeures: {
            force: 2,
            dexterite: 2,
            constitution: 0,
            intelligence: 2,
            sagesse: 2,
            charisme: 2,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [
            "-Magicka Transformation !",
            "- Forme rapide : +1 cran de vitesse et +15% de chances de toucher et aux jets de sauvegarde basés sur la dexterite. En contrepartie vous subissez 1 dégât en plus de toutes les attaques qui vous touchent sans que vous ne réussissiez un blocage. Octroie +15 dans toutes les statistiques mineures basées sur la dexterite.",
            "- Forme brutale : +2 aux dégâts, 15% de CC et aux jets de sauvegarde basés sur la Force. En contrepartie vous perdez 20% de chance de bloquer et -2 à l’armure. Octroie +15 dans toutes les statistiques mineures basées sur la Force",
            "- Forme bastion : +1 d’armure et +20% aux chances de bloquer et à tous les jets de sauvegarde. En contrepartie vous perdez un cran en vitesse et ne pouvez plus utilisez d’attaque qui ont une portée supérieure à 15 mètres. Octroie +15 dans toutes les statistiques mineures basées sur la Défense.",
            "- Forme sage : Toute vos attaques coûtent 1 PSY de moins (cet effet ne se cumul pas avec d’autres effets diminuant le coût en PSY) et gagnent +5 mètres de portée. En contrepartie vous ne pouvez plus effectuer de jets de sauvegarde. Octroie +15 dans toutes les statistiques mineures basées sur la Sagesse.",

            "Ce sort ne consomme pas d’action, le changement de forme peut intervenir n’importe quand dans le tour de jeu. Ce sort ne peut pas voir son coût en PSY diminuer d’une quelconque manière, hors combat changer de forme prend quelques dizaines de secondes et ne peut donc pas intervenir en réflexe. 1 PSY"	
        ],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: [
            {
                nom: "Entraînement de Magicka",
                description: "Vous donne 2 points de statistiques à répartir.",
                niveauJoueur: 1,
                prerequis: [],
                effet: { stats: 2 }
            },
            {
                nom: "Magicka Haste",
                description: "Ajoute +1 en dexterite. Vous pouvez choisir une transformation au tout début du combat avant même le placement. Cette forme est gratuite.",
                niveauJoueur: 2,
                prerequis: ["Entraînement de Magicka"],
                effet: { dexterite: 1, transformationGratuite: true }
            },
            {
                nom: "Worldwide Magicka",
                description: "Ajoute +1 en Charisme, la forme de base de la Magicka octroie +15 dans toutes les statiques mineures liées au charisme.",
                niveauJoueur: 3,
                prerequis: ["Magicka Haste"],
                effet: { charisme: 1, bonusMineuresCharisme: 15 }
            },
            {
                nom: "Perfect Transformation !",
                description: "Lors d’un changement de forme vous pouvez doubler les effets positifs et négatifs de la transformation, le sort de transformation coute alors le double.",
                niveauJoueur: 4,
                prerequis: ["Worldwide Magicka"],
                effet: { transformationDouble: true }
            },
            {
                nom: "Leader Magicka",
                description: "Au début de votre tour, vous pouvez désigner un allié, il sera alors considéré comme une \"Magicka\" jusqu’au début de votre prochain tour et pourra utiliser l'effet de la mécanique même si ce n'est pas sa voie.",
                niveauJoueur: 5,
                prerequis: ["Perfect Transformation !"],
                effet: { leaderMagicka: true }
            },
            {
                nom: "Encore un Espoir",
                description: "Ajoute +1 en Défense, une fois par combat si une attaque devait vous tuer ou vous faire tomber K.O vous gardez 1 PV et récupérez 1 dé 6 PV fixe instantanément.",
                niveauJoueur: 6,
                prerequis: ["Leader Magicka"],
                effet: { defense: 1, survieMagicka: true }
            },
            {
                nom: "Overdrive Transformation !",
                description: "Vous pouvez changer de forme même hors de votre tour de jeu, y compris en utilisant l’effet de \"Perfect Transformation !\". Hors combat vous changer de forme instantanément.",
                niveauJoueur: 7,
                prerequis: ["Encore un Espoir"],
                effet: { transformationHorsTour: true }
            },
            {
                nom: "Ancestral Magicka",
                description: "Ajoute +1 en Sagesse, permet de parler la langue Ancien.",
                niveauJoueur: 8,
                prerequis: ["Overdrive Transformation !"],
                effet: { sagesse: 1, langueAncien: true }
            },
            {
                nom: "Strongest Magicka",
                description: "Ajoute +1 en Force, en forme brutale la Magicka peut soulever ou détruire des objets très massifs.",
                niveauJoueur: 9,
                prerequis: ["Ancestral Magicka"],
                effet: { force: 1, forceBrutale: true }
            },
            {
                nom: "Victoire éclatante",
                description: "A chaque fois que vous, ou une Magicka tuez ou mettez K.O un ennemi dans le combat toute les Magicka récupèrent 1 dé 6 PV et gagnent +1 DSB pour le reste du combat. Ce passif ne s’enclenche qu’une fois par ennemi tué même si d’autres Magicka le possèdent aussi.",
                niveauJoueur: 10,
                prerequis: ["Strongest Magicka"],
                effet: { victoireEclatante: true }
            }
        ]
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [
            {
                nom: "Magical Dodge",
                description: "A la prochaine attaque reçue vous vous déplacer de 5 mètres dans la direction de votre choix, si vous n’êtes plus à portée de l’attaque après ce déplacement vous ne subissez aucun dégâts.",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Ne consomme pas d'Action",
                Touche: toucheDexterite,
                effet: { type: "Buff" }
            },
            {
                nom: "Motivational speech",
                description: "Octroie 2 PB à tous les alliés sur le terrain, la prochaine attaque qu’ils subissent sera automatiquement bloquée. Sur les autres Magicka ce sort les soigne aussi de 1 dé 4 PV",
                Psy: 3,
                Zone: "Tout le terrain",
                ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
                Distance: "MAX",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Dynamic Entry",
                description: "Le lanceur se téléporte jusqu’à 10 mètres en ignorant les attaques d’opportunités et les états affectant le déplacement. Il frappe tous les ennemis autour de la case d’arrivée pour 1 dé 6 +1 dégâts puis se téléporte à nouveau de 10 mètres. Lors de ce téléport final, si le lanceur finit à côté d’une Magicka il gagne +1 cran en vitesse pour ce tour.",
                Psy: 4,
                Zone: "10mcroix",
                ZoneImage: "systems/alyria/module/data/images/10mcroix.png",
                Distance: "20m",
                Action: "Action",
                Touche: toucheDexterite,
                effet: { degats: "1D6+1" }
            },
            {
                nom: "Unicorn starlight",
                description: "Ce sort peut cibler jusqu’à 40 mètres. Dans la zone d’effet les alliés récupère 1 dé 4 PV et les ennemis subissent 1 dé 4 dégâts. Si une Magicka est dans la zone ce sort ne consomme pas d’action.",
                Psy: 2,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "40m",
                Action: "Action",
                Touche: "SAG",
                effet: { degats: "1D4", soin: "1D4" }
            },
            {
                nom: "Love Cry",
                description: "La Magicka hurle et emplie de sentiment bienveillant les alliés à proximité, octroie une Immunité à \"Charme\" et retire l’effet, donne également 2 d’armure et 20% de chances de bloquer pendant 2 tours. Les Magicka dans la zone peuvent désormais répartir les dégâts subis d’une attaque entre eux pendant l’effet de ce sort",
                Psy: 4,
                Zone: "15mcroix",
                ZoneImage: "systems/alyria/module/data/images/15mcroix.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { type: "Buff" }
            },
            {
                nom: "Kiss Shot",
                description: "La Magicka lance un baiser volant jusqu’à une cible à 40 mètre maximum. Ce sort inflige 1 dé 4 dégâts perce armure",
                Psy: 2,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "40m",
                Action: "Ne consomme pas d'Action",
                Touche: toucheDexterite,
                effet: { degats: "1D4 Percant" }
            },
            {
                nom: "Helping Hand",
                description: "La Magicka propose son aide désintéressé et pleine de compassion. Sur un ennemi cela lui inflige \"Charme\" et le considère comme une Magicka pendant l’effet du \"Charme\". Sur un allié ce sort reste dormant jusqu’à ce qu’il prenne une attaque qui le tue ou le mette \"K.O\", il ignore alors cette attaque et ses effets. Si ce sort cible une Magicka l’effet s’applique au lanceur également.",
                Psy: 4,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: "SAG",
                effet: { type: "Charme" }
            },
            {
                nom: "Candy Hammer",
                description: "Frappe un ennemi avec un marteau en bonbon qui éclate à l’impact, ce sort inflige 1 dé 6 +1 dégâts à la cible initiale et 3 dégâts à toutes les cibles à son corps à corps alliés compris. Les Magickas dans la zone se soignent plutôt que de subir les dégâts de la zone",
                Psy: 4,
                Zone: "5mcroix",
                ZoneImage: "systems/alyria/module/data/images/5mcroix.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D6+1, 3 fixe en zone" }
            },
            {
                nom: "Sparkling Hope",
                description: "Soigne 1 dé 6 PV à une cible jusqu’à 30 mètres et lui retire Cécité et Chaos. Si la cible est une Magicka ce sort octroie 2 PB fixe au lanceur et à la cible.",
                Psy: 3,
                Zone: "Dist.",
                ZoneImage: "systems/alyria/module/data/images/dist.png",
                Distance: "30m",
                Action: "Action",
                Touche: "SAG",
                effet: { soin: "1D6" }
            },
            {
                nom: "Love-Love Punch",
                description: "Frappe avec toute la force de l’amour une cible au corps à corps, lui inflige 1 dé 6 +1 dégâts et \"Charme\", si la cible ne subit pas le \"Charme\" ce sort inflige de nouveau 1 dé 4 dégâts fixe",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D4 Charme" }
            },
            {
                nom: "Magicka Spirit",
                description: "Convoque un esprit magique mignon lié à la Magicka il sera toujours de taille \"très petite\", possède la vitesse normale et 10 PV, il peut soigner un allié pour 1 dé 4 PV ou frapper un ennemi à distance pour 1 dé 6 dégâts. S’il termine son tour à côté d’une Magicka il gagne 2 PB et octroie 2 PB à la Magicka",
                Psy: 4,
                Zone: "Invocation",
                ZoneImage: "systems/alyria/module/data/images/invocation.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheCharisme,
                effet: { degats: "1D6" }
            },
            {
                nom: "Magical Kick",
                description: "Frappe un adversaire au corps à corps avec un puissant coup de pied, inflige 1 dé 6 +2 dégâts et le repousse de 5 mètres",
                Psy: 3,
                Zone: "CàC",
                ZoneImage: "systems/alyria/module/data/images/cac.png",
                Distance: "5m",
                Action: "Action",
                Touche: toucheForce,
                effet: { degats: "1D6+2 Push" }
            }
        ],
            sortConfirme: [
        {
            nom: "Magical Beam",
            description: "Concentrez tout le pouvoir de Magicka en une attaque surpuissante, nécessite un tour de charge, après ce tour l’attaque inflige 2 dé 8 dégâts à un ennemi jusqu’à 30 mètres. Si vous perdez des PV pendant le tour de charge l’attaque est annulée et le coût en PSY vous est rendu, vous pouvez charger l’attaque autant que vous le voulez, chaque tour de charge ajoute 1 dé 8 à l’attaque. Chaque autre Magicka sur une case adjacente à vous au lancement du sort ajoute +2 dégâts à chaque dé lors du calcul des dégâts.",
            Psy: 5,
            Zone: "Dist.",
            ZoneImage: "systems/alyria/module/data/images/dist.png",
            Distance: "30m",
            Action: "Action",
            Touche: toucheCharisme,
            effet: { degats: "2D8" }
        },
        {
            nom: "Magical Plush",
            description: "Lance une série de peluches autour du lanceur, inflige 3 dé 4 dégâts, peut cibler jusqu’à 3 cibles elles se partageront alors les dégâts équitablement. Si une autre Magicka est dans la zone d’effet une grosse peluche se colle à un ennemi et explose infligeant 1 dé 4 dégâts et \"Brulure\" à celui-ci.",
            Psy: 5,
            Zone: "CàC",
            ZoneImage: "systems/alyria/module/data/images/cac.png",
            Distance: "5m",
            Action: "Action",
            Touche: toucheDexterite,
            effet: { degats: "3D4" }
        },
        {
            nom: "Goodbye Hug",
            description: "La Magicka s’empare d’un ennemi et lui brise tous les os en le serrant avec une force démesurée. Inflige 1 dé 6 +4 dégâts et applique \"Entrave\" irrésistible. Pour chaque Magicka au corps à corps de la cible on ajoute 1 dé 6 dégâts fixes supplémentaires.",
            Psy: 5,
            Zone: "CàC",
            ZoneImage: "systems/alyria/module/data/images/cac.png",
            Distance: "5m",
            Action: "Action",
            Touche: toucheForce,
            effet: { degats: "1D6+4" }
        },
        {
            nom: "Super Magicka",
            description: "La Magicka se montre comme la véritable héroïne sur le terrain, ce sort déclenche le ciblage sur le lanceur pour tous les ennemis sur le terrain. Les autres Magicka ont les mains libres et infligent 2 dégâts supplémentaires avec toutes leurs attaques sur les ennemis pris par ce ciblage.",
            Psy: 5,
            Zone: "Tout le terrain",
            ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
            Distance: "5m",
            Action: "Action",
            Touche: toucheCharisme,
            effet: { type: "Buff" }
        },
        {
            nom: "Faster than Baddies",
            description: "Augmente d’un cran la vitesse de tous les alliés sur le terrain et octroie un avantage sur tous les jets de sauvegarde. Les Magickas gagnent aussi un avantage sur les jets de blocage. Cet effet dure 1 tour et peut être prolongé pour 2 PSY par tour supplémentaire",
            Psy: 4,
            Zone: "Tout le terrain",
            ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
            Distance: "MAX",
            Action: "Action",
            Touche: toucheDexterite,
            effet: { type: "Buff" }
        },
        {
            nom: "Friendship is Magic",
            description: "L’allié ciblé par ce sort est considéré comme une Magicka pendant 1 tour et à accès à la mécanique de la voie en plus de ses capacités habituelles. son effet peut être prolongé pour 1 PSY par tour supplémentaire",
            Psy: 2,
            Zone: "Dist.",
            ZoneImage: "systems/alyria/module/data/images/dist.png",
            Distance: "20m",
            Action: "Ne consomme pas d'Action",
            Touche: "Auto",
            effet: { type: "Buff" }
        },
        {
            nom: "Magical shinny slap",
            description: "Gifle un ennemi au corps à corps et inflige 2 dé 6 dégâts, un grand flash lumineux se produit lors de l’impact infligeant \"Cécité\" à tous les ennemis autour du point d’impact. Inflige aussi \"Cécité\" à tous les ennemis au corps à corps des autres Magicka sur le terrain.",
            Psy: 5,
            Zone: "CàC",
            ZoneImage: "systems/alyria/module/data/images/cac.png",
            Distance: "5m",
            Action: "Action",
            Touche: toucheForce,
            effet: { degats: "2D6 Cécité" }
        },
        {
            nom: "Magical Rainbow",
            description: "Un arc en ciel se forme depuis la Magicka et va frapper un allié jusqu’à 30 mètres, il se soigne de 2 dés 4 PV et se voit supprimer un effet négatif. Si ce sort frappe une autre Magicka il soigne 2 dé 6 PV et supprime tous les effets négatifs",
            Psy: 5,
            Zone: "Dist.",
            ZoneImage: "systems/alyria/module/data/images/dist.png",
            Distance: "30m",
            Action: "Action",
            Touche: "SAG",
            effet: { soin: "2D4" }
        },
        {
            nom: "Candy Gummi Jar",
            description: "Invoque une jarre de bonbon qui distribue des friandises qui ajoutent +2 dégâts et 20% de chances de CC pendant 1 tour à ceux qui les mangent. Sur les Magicka l’effet soigne aussi 1 dé 4 PV.",
            Psy: 4,
            Zone: "15mcarré",
            ZoneImage: "systems/alyria/module/data/images/15mcarré.png",
            Distance: "5m",
            Action: "Ne consomme pas d'Action",
            Touche: "SAG",
            effet: { type: "Buff" }
        }
    ],
            sortExpert: [
        {
            nom: "Magical unknow flying object",
            description: "Un objet non identifié s’écrase sur une cible jusqu’à 25 mètres et inflige 2 dés 8 dégâts dans toute la zone d’impact et applique \"Sonné\". Ce sort touche allié comme ennemi mais pas les autres Magicka.",
            Psy: 7,
            Zone: "Dist.",
            ZoneImage: "systems/alyria/module/data/images/dist.png",
            Distance: "25m",
            Action: "Action",
            Touche: "SAG",
            effet: { degats: "2D8 Sonné" }
        },
        {
            nom: "Magical Sparkle Dash",
            description: "Avance en ligne droite de 20 mètres, traverse toutes les entités, la case d’arrivée doit être libre ou avoir une Magicka à cette place. Les ennemis traversés subissent 2 dés 6 dégâts, des paillettes brillantes giclent alors et infligeront 1 dés 6 dégâts en explosant dans la zone traversée au début du prochain tour de la Magicka. Si une autre Magicka est sur la case d’arrivée elle vous propulse pour un deuxième passage qui fait exploser les paillettes instantanément et ajoute 1 dé 6 dégâts supplémentaire.",
            Psy: 8,
            Zone: "Dist.",
            ZoneImage: "systems/alyria/module/data/images/dist.png",
            Distance: "20m",
            Action: "Action",
            Touche: toucheDexterite,
            effet: { degats: "2D6 + 1D6" }
        },
        {
            nom: "Magical power of friendship",
            description: "Téléporte toutes les Magicka au corps à corps du lanceur, ensemble il canalise alors une puissante boule de psyché qui infligera 1 dé 10 dégâts par Magicka lançant le sort à une cible jusqu’à 25 mètres, en ignorant les armures et les boucliers.",
            Psy: 7,
            Zone: "Dist.",
            ZoneImage: "systems/alyria/module/data/images/dist.png",
            Distance: "25m",
            Action: "Action",
            Touche: "SAG",
            effet: { degats: "1D10 / Magicka" }
        },
        {
            nom: "Highway To Love",
            description: "La Magicka rejoint l’allié le plus proche par le chemin le plus court, ce faisant elle traverse toutes les entités, ignore les effets altérant le déplacement et les attaques d’opportunités. Elle soigne cet allié de 1 dé 6 PV puis se déplace vers l’allié le plus proche à nouveau. Cet effet se répète jusqu’à ce que tous les alliés est était soigné 1 fois. De plus chaque ennemi traversé subit 1 dé 6 dégâts. Si ce sort soigne une Magicka elle gagne les bonus de la forme Rapide sans en subir les Malus pendant 1 tour, en supplément d’une éventuelle autre forme",
            Psy: 6,
            Zone: "Dist.",
            ZoneImage: "systems/alyria/module/data/images/dist.png",
            Distance: "20m",
            Action: "Action",
            Touche: toucheDexterite,
            effet: { degats: "1D6", soin: "1D6" }
        },
        {
            nom: "Heartbeat Breaker",
            description: "La Magicka frappe des centaines de fois en quelques secondes le cœur de la cible, perturbant ses battements. Ce sort inflige 3 dés 4 +2 dégâts et impose un désavantage à tous les jets de la cible pendant 1 tour. Si la cible meurt toutes les Magicka sur le terrain gagne un avantage sur tous leurs jets pendant 1 tour.",
            Psy: 6,
            Zone: "CàC",
            ZoneImage: "systems/alyria/module/data/images/cac.png",
            Distance: "5m",
            Action: "Action",
            Touche: toucheForce,
            effet: { degats: "3D4+2" }
        },
        {
            nom: "Magical power of love",
            description: "Téléporte toute les Magicka au corps à corps du lanceur, ensemble ils canalisent une puissante onde de psyché qui soigne 1 dé 8 +2 par Magicka lançant le sort à tous les alliés y compris eux même sur le terrain, purge aussi tous les effets négatifs",
            Psy: 8,
            Zone: "Tout le Terrain",
            ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
            Distance: "MAX",
            Action: "Action",
            Touche: toucheCharisme,
            effet: { soin: "1D8+2" }
        },
        {
            nom: "Magical dramatic Cry",
            description: "Le lanceur pleure à chaude larme et implore de l’aide au ciel, les ennemis subissent soudainement \"Silence\", \"Cécité\" et \"Entrave\" irrésistible pour 1 tour. Les alliés se sentent gonflés à bloc leurs attaques infligeront 2 dégâts supplémentaires par effets négatifs sur la cible, les autres Magicka se purgeront de leurs effets négatifs et soigneront 4 PV par effet supprimés.",
            Psy: 7,
            Zone: "Tout le Terrain",
            ZoneImage: "systems/alyria/module/data/images/tout-le-terrain.png",
            Distance: "MAX",
            Action: "Ne consomme pas d'Action",
            Touche: toucheCharisme,
            effet: { type: "Buff" }
        },
        {
            nom: "Magical Muscle",
            description: "La Magicka voit sa masse musculaire soudainement gonflée, elle frappe alors tous les ennemis à son corps à corps et inflige 1 dé 10 dégâts à chacun d’entre eux et leur applique \"Sonné\". Si une autre Magicka est présente au corps à corps d’un ou plusieurs adversaires touché par cette attaque, elle réplique l’attaque et inflige à son tour 1 dé 10 dégâts",
            Psy: 7,
            Zone: "5mcroix",
            ZoneImage: "systems/alyria/module/data/images/5mcroix.png",
            Distance: "5m",
            Action: "Action",
            Touche: toucheForce,
            effet: { degats: "1D10" }
        }
    ],
            sortMaitre: [
        {
            nom: "Magical Apothéosis",
            description: "Vous prenez les bonus doublés des 4 formes de Magicka, sans subir le moindre malus. Cette forme peut changer grandement l’apparence de la Magicka. Pendant la durée de ce sort, tous les alliés sont considérés comme des Magicka. Ce sort à une durée de 2 tours, il peut prolonger sa durée pour 3 PSY supplémentaire par tour",
            Psy: 8,
            Zone: "CàC",
            ZoneImage: "systems/alyria/module/data/images/cac.png",
            Distance: "5m",
            Action: "Auto",
            Touche: "Buff",
            effet: { type: "Buff" }
        }
    ]
  }
    },

enchanteur: {
        
    nom:"Enchanteur",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 0,
            constitution: 0,
            intelligence: 2,
            sagesse: 4,
            charisme: 4,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
            niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

sorciere: {        
    nom:"Sorcière",    
    description: "",
        majeures: {
            force: 0,
            dexterite: 0,
            constitution: 0,
            intelligence: 4,
            sagesse: 3,
            charisme: 3,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

dementien: {        
    nom:"Démentien",    
    description: "",
        majeures: {
            force: 2,
            dexterite: 2,
            constitution: 0,
            intelligence: 0,
            sagesse: 2,
            charisme: 2,
            defense: 0,
            chance: 2
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

chasseur: {        
    nom:"Chasseur",    
    description: "",
        majeures: {
            force: 3,
            dexterite: 4,
            constitution: 0,
            intelligence: 0,
            sagesse: 3,
            charisme: 0,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        }
    },

ninja: {
    nom: "Ninja",
    description: "",
    majeures: {
        force: 0,
        dexterite: 3,
        constitution: 0,
        intelligence: 0,
        sagesse: 3,
        charisme: 0,
        defense: 0,
        chance: 4
    },
    mineures: {},
    mecanique: [],
    talentVoie: {
        niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
        talents: []
    },
    sortVoie: {
         niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
        sortNovice: [{}],
        sortConfirme: [{}],
        sortExpert: [{}],
        sortMaitre: [{}]
    }
    },

pistolero: {
    nom:"Pistoleros",    
    description: "",
    majeures: {
        force: 3,
        dexterite: 3,
        constitution: 0,
        intelligence: 0,
        sagesse: 0,
        charisme: 0,
        defense: 0,
        chance: 4
    },
    mineures: {},
    mecanique: [],
    talentVoie: {
        niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
        talents: []
    },
    sortVoie: {
         niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
        sortNovice: [{}],
        sortConfirme: [{}],
        sortExpert: [{}],
        sortMaitre: [{}]
    }
    },

mecanicien: {
    nom:"Mécanicien",    
    description: "",
    majeures: {
        force: 3,
        dexterite: 0,
        constitution: 2,
        intelligence: 0,
        sagesse: 2,
        charisme: 0,
        defense: 3,
        chance: 0
    },
    mineures: {},
    mecanique: [],
    talentVoie: {
        niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
        talents: []
    },
    sortVoie: {
         niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
        sortNovice: [{}],
        sortConfirme: [{}],
        sortExpert: [{}],
        sortMaitre: [{}]
    }
    },

rodeur: {
    nom:"Rodeur",    
    description: "",
        majeures: {
            force: 3,
            dexterite: 5,
            constitution: 2,
            intelligence: 0,
            sagesse: 0,
            charisme: 0,
            defense: 0,
            chance: 0
        },
        mineures: {},
        mecanique: [],
        talentVoie: {
            niveauJoueur: [1,2,3,4,5,6,7,8,9,10],
            talents: []
        },
        sortVoie: {
             niveau: ["Novice" , "Confirme" , "Expert" , "Maître"],
            sortNovice: [{}],
            sortConfirme: [{}],
            sortExpert: [{}],
            sortMaitre: [{}]
        } 
    }
}
