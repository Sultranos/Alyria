export const afflictions = {
        general: {
            nom: "Généralité des Altérations d'État",
            description: "Les altérations d'états sont des modificateurs qui peuvent être appliqués à n'importe quelles entités. Elles sont pour la plupart handicapante et infligent des dégâts ou empêche ceux qui en sont affectés de jouer normalement. Les altérations d'états durent un tour, sauf si quelque chose dit le contraire dans leur fonctionnement individuel, ou dans l'effet du sortilège ou de l'attaque qui les appliquent. Les altérations d'état n'infligeant pas de dégâts (sauf Vidé, Mort et K.O) immunise leur cible à elle même pour un tour quand leur effet se termine, ce qui rend impossible leur application deux tours consécutifs sur la même cible.",
            icon: "",
                 },
       brulure: {
            nom: "Brûlure",
            description: "Inflige 2 dégâts par tour à la fin des trois prochains tours de la cible affectée, l’état “Brûlure“ ne peut pas se cumuler sauf si un effet le précise.",
            icon: "",
            effect: {
                duree: "3 tours",
                degats: "2 dégâts par tour",
                condition: "à la fin du tour"
            },
            cummulable: false,
            imunite: false
        },
        Sonner: {
            nom: "Sonné",
            description: "Impossible d’agir, saute le prochain tour de la cible affectée sans qu’elle ne puisse faire une action ou un mouvement, la cible ne peut pas bloquer si elle est “Sonnée“.",
            icon: "",
            effect: {
                duree: "1 tour",
                degats: "",
                condition: "Impossible d’agir, saute le prochain tour, ne peut pas bloquer"
            },
            cummulable: false,
            imunite: true
        },
        entrave: {
            nom: "Entrave",
            description: "Impossible se déplacer, la cible peut toujours lancer des sorts et attaquer à distance mais ne peut plus se déplacer, les sorts qui permettent de se déplacer sont inutilisables sauf s’ils stipulent : Ignore “Entrave“.",
            icon: "",
            effect: {
                duree: "1 tour",
                degats: "",
                condition: "Impossible de se déplacer"
            },
            cummulable: false,
            imunite: true
        },
        engelure: {
            nom: "Engelure",
            description: "Si l’effet est réappliqué alors qu’il est déjà actif, on augmente la durée d’un tour. La cible affectée subit 3 dégâts à chaque déplacement, volontaire ou non pendant l'effet.",
            icon: "",
            effect: {
                duree: "variable (1 tour de base, augmente si réappliqué)",
                degats: "3 dégâts",
                condition: "à chaque déplacement, volontaire ou non"
            },
            cummulable: true,
            imunite: false
        },
        poison: {
            nom: "Poison",
            description: "Cet effet peut être cumulé de toutes les manières possibles, et même en utilisant plusieurs fois le même sort. Inflige 1 dégât à la fin du tour de la cible pendant une durée infinie.",
            icon: "",
            effect: {
                duree: "infinie",
                degats: "1 dégât par tour",
                condition: "à la fin du tour"
            },
            cummulable: true,
            imunite: false
        },
        charme: {
            nom: "Charme",
            description: "Une cible dans cet état change de camp, elle attaque ses alliés et aide ses ennemis.",
            icon: "",
            effect: {
                duree: "1 tour",
                degats: "",
                condition: "change de camp, attaque ses alliés"
            },
            cummulable: false,
            imunite: true
        },
        cecite: {
            nom: "Cécité",
            description: "Une cible dans cet état ne voit plus rien et doit faire ses jets de touches avec seulement la moitié de la valeur de sa statistique de touche.",
            icon: "",
            effect: {
                duree: "1 tour",
                degats: "",
                condition: "Jets de touches avec moitié de la valeur de statistique"
            },
            cummulable: false,
            imunite: true
        },
        terreur: {
            nom: "Terreur",
            description: "Une cible sous terreur ne peut pas réaliser d’action offensive. Les sorts n’infligeant aucun dégât ne sont pas des actions offensives. Elle cherchera aussi à s'éloigner le plus possible de l'entité lui ayant appliqué Terreur.",
            icon: "",
            effect: {
                duree: "1 tour",
                degats: "",
                condition: "Ne peut pas réaliser d’action offensive, cherche à s'éloigner"
            },
            cummulable: false,
            imunite: true
        },
        invulnerable: {
            nom: "Invulnérable",
            description: "Une cible dans cet état ne peut subir de dégâts ou d'effets quels que soient la source, même venant d'altérations d'états ou de mécanique.",
            icon: "",
            effect: {
                duree: "1 tour",
                degats: "",
                condition: "Ne peut subir de dégâts ou d'effets"
            },
            cummulable: false,
            imunite: true
        },
        sommeil: {
            nom: "Sommeil",
            description: "Une cible dans l’état sommeil ne peut ni agir ni bouger, cet état est retiré aux moindres dégâts direct reçu par la cible (n’inclus pas les dégâts d’état). Une entité peut aussi utiliser une action pour réveiller la cible si elle est sur une case adjacente.",
            icon: "",
            effect: {
                duree: "variable (jusqu'à dégâts directs ou action pour réveiller)",
                degats: "",
                condition: "Ne peut ni agir ni bouger, retiré par dégâts directs ou action"
            },
            cummulable: false,
            imunite: true
        },
        chaos: {
            nom: "Chaos",
            description: "Un état spécial de la branche Chaos et de la voie du cultiste, il transforme les dégâts de la cible en soin et ses soins en dégâts. L’état “Chaos“ est “invisible” il ne doit pas être annoncé au joueur et les PNJ jouent sans le prendre en compte.",
            icon: "",
            effect: {
                duree: "variable (selon sort)",
                degats: "Transforme les dégâts en soin et les soins en dégâts",
                condition: "Invisible, PNJ ne le prennent pas en compte"
            },
            cummulable: false,
            imunite: true
        },
        silence: {
            nom: "Silence",
            description: "Empêche l’utilisation de la PSY tant que l’effet est actif, le porteur peut tout de même utiliser des attaques qui ne consomment pas de PSY.",
            icon: "",
            effect: {
                duree: "1 tour",
                degats: "",
                condition: "Empêche l’utilisation de la PSY"
            },
            cummulable: false,
            imunite: true
        },
        ko: {
            nom: "K.O.",
            description: "Cet effet est retiré si la cible repasse au-dessus de 0 point de vie. Cet effet ne peut pas être retiré si on retire les effets négatifs. La cible affectée ne peut plus rien faire, elle n’a plus de tour de jeu, mais elle peut être réanimée en étant soignée jusqu'à ce que ses PV repassent au-dessus de 0.",
            icon: "",
            effect: {
                duree: "Jusqu'à récupération PV > 0",
                degats: "",
                condition: "Ne peut plus rien faire, pas de tour de jeu, réanimable par soin"
            },
            cummulable: false,
            imunite: false
        },
        mort: {
            nom: "Mort",
            description: "S’applique après 2 tours dans l’état K.O. Ne peut pas être retiré même si on retire les états nocifs, un reroll s’annonce ! La cible affectée est retirée du jeu, elle ne peut pas être réanimée ou soignée. (Sauf sort particulier).",
            icon: "",
            effect: {
                duree: "Permanent",
                degats: "",
                condition: "Retirée du jeu, non réanimable/soignable (sauf sorts spécifiques)"
            },
            cummulable: false,
            imunite: false
        },
        vide: {
            nom: "Vidé",
            description: "Si vous tombez à 0 PSY vous subissez automatiquement cet état jusqu'à récupérer au moins 1 PSY, cet état octroie un désavantage à tout vos jets.",
            icon: "",
            effect: {
                duree: "Jusqu'à récupération PSY > 0",
                degats: "",
                condition: "Désavantage à tout vos jets (si 0 PSY)"
            },
            cummulable: false,
            imunite: false
        },
       hemorragie: {
            nom: "Hémorragie",
            description: "Si l’effet est réappliqué alors qu’il est déjà actif, on augmente la durée d’un tour. La cible affectée subit 3 dégâts si elle essaye de faire une action pendant l'effet. Peut s'enclencher autant de fois que la cible exécute d'actions.",
            icon: "",
            effect: {
                duree: "variable (1 tour de base, augmente si réappliqué)",
                degats: "3 dégâts",
                condition: "si elle essaye de faire une action"
            },
            cummulable: true,
            imunite: false
        },
        folie: {
            nom: "Folie",
            description: "Une cible dans cet état lance 1 dé 2 à chaque fois qu'elle veut lancer un sort qui ne la cible pas elle même. Si elle fait 1 le sort cible correctement, si elle fait 2 le sort cible une entité de l'autre camp présente dans sa zone d'effet ou n'a aucun effet si une entité de ce type n'est pas présente.",
            icon: "",
            effect: {
                duree: "1 tour",
                degats: "",
                condition: "Lance 1d2 pour ciblage de sorts (non-soi)"
            },
            cummulable: false,
            imunite: true
        }
    };
  

