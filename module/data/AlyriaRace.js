export const AlyriaRaces = {
  hautElfe: {
    nom: "Haut-Elfe",
    description: [
      "Race la plus grande d’Alyria, ils mesurent en moyenne 2m00 pour les hommes et 2m20 pour les femmes, possédant un physique très fins et élancé, de grands yeux aux larges pupilles et une peau de couleur ambré voire doré pour certains ils ont aussi évidemment les oreilles pointues caractéristiques des elfes. Leur longévité est sans pareille et ils vivent en moyenne 250 ans, certains atteignent presque les  400 ans.",
      "Assez fragiles physiquement et supportant mal les chocs et les coups directs ils privilégient la magie et la distance en combat, il faut noter en revanche qu’ils sont très résistants aux maladies et supporte presque aussi bien les pathologies que les Hommes-Lézards.",
      "Vivant principalement sur leur île suite à la chute de leur immense empire à la fin de la deuxième ère, on en trouve parfois dans les royaumes occidentaux mais rarement ailleurs, il faut dire qu’il s’agit d’une race plutôt très fermée aux étrangers et qui n’apprécie pas particulièrement le voyage ou la mixité culturelle. Ils sont très attachés à leur culture et à leurs traditions, ce qui les rend parfois difficiles à approcher.",
      "Les Haut-Elfes sont réputés orgueilleux, fiers, ambitieux et hautains, ces traits de caractères n’étant évidemment pas des généralités pour tous, on retrouve quand même cet état d’esprit chez beaucoup d’elfe particulièrement chez ceux qui sont resté sur l’île depuis toujours. Ils vivent en essayant à tout prix de laisser leur empreinte sur le monde, que les gens se souviennent d’eux, en cela ils sont des experts dans beaucoup de domaine et s’investissent énormément dans ce qu’ils font mais ils ont tendance à se sentir rapidement supérieur à ceux qui ne fournissent pas autant d’efforts qu’eux.",
      "Vu par les autres races comme les principaux responsables de l’immense guerre de la seconde ère, ils sont assez peu appréciés à cause de leur côté hautains et ambitieux mais ils sont tout de même très respectés particulièrement dans les domaines magiques où ils excellent presque partout."
    ],
    talentRace: {
      nom: "Supériorité intellectuelle",
      effet:"Lors d’un jet de Persuader/Tromper contre une race non-elfique vous ajouter votre valeur de SAGESSE ou INTELLIGENCE à votre statistique.",
      fonction: "ajoutMajeureAuxMineures",
      parametres: {
        majeureSource: "sagesse",
        cibleType: "specifique",
        cibleMineure: "persuasion"
    }
    },
    competenceRace: {
      nom: "Canon de verre",
      effet:
        "Vous pouvez augmenter une compétence ou une attaque à l'arme de la valeur de votre bonus DSB. En contrepartie, lors du prochain coup reçu vous subirez un montant de dégâts supplémentaires égal à ceux que vous avez augmentés. Ne consomme pas d’action, utilisable une fois par combat ou scène."
    },
    majeures: {
      constitution: -2,
      intelligence: 5,
      force: 0,
      dextérité: 0,
      sagesse: 4,
      charisme: 3,
      defense: 0,
      chance: 0
    },
    mineures: {
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
    }
  },
  elfedesBois: {
    nom : "Elfe des Bois",
    description: [
      "Mesurant en moyenne 1m70, disposant d’oreilles pointues caractéristiques des elfes, les elfes des bois ou les « sylvains » comme ils aiment se faire appeler ont pour particularité singulière des yeux un peu plus grands et une peau qui apparait comme de l’écorce mais qui est tout ce qui a de plus douce au toucher. Leurs oreilles pointues sont par ailleurs les plus longues de tous les elfes et leurs ongles sont bien plus robustes et tranchants que ceux des autres races à l’instar des Fushirs. Ils vivent en moyenne 200 ans sous forme humanoïde, puisque selon leurs croyances, ils se réincarnent ensuite dans un arbre qui lui pourra vivre plusieurs milliers d’années.",
      "Les Elfes des bois vivent dans les quelques rares forêts elfiques protégées et sacrées pour eux, la forêt d’Itildïn à l’Ouest et le bosquet d’Aokigahara à l’Est, on en trouve aussi dans d’autres forêts et certains voyagent même de villes en villes ou s’installe parmi les autres races. Etant ouvert aux autres peuples et n’hésitant pas à sortir pour voir le monde les Elfes des bois se montrent pourtant féroce envers tous ceux qui ne respecterait pas leurs traditions et de nombreux conflits éclatent aux abords de leurs forêts lorsque des bucherons malavisés s’aventure un peu trop loin.",
      "Réputés audacieux, habiles et fin tireurs les Sylvains sont très appréciés en Alyria, leurs coutumes sont assez obscures pour les autres peuples mais elles sont aussi enchanteresses et alimentent bien des récits et des mythes. Cette race est probablement une des rares à faire l’unanimité à l’échelle mondiale et les sylvains pourront se promener partout et seront souvent accueilli avec enthousiasme et curiosité."
    ],
    talentRace: {
      nom: "Vie en nature",
      effet: "Vous avez grandi dans la nuture et vous avez appris à vous y adapter, vous gagnez +10 dans toutes les statistiques mineures basées sur la sagesse et la dextérité lorsque vous êtes dans un milieu naturel.",
      fonction: "bonusIndirectCaracteristiques",
      effets: {
        bonus: { 
          caracteristique: "sagesse, dexterite",
          bonusConditionnel: 10,
          condition: "en milieu forestier ou arboré",
          description: "Ajoute +10 dans les statistiques mineures basées sur la sagesse et la dextérité si vous êtes dans un milieu forestier ou arboré.",
      }}},
    competenceRace: {
      nom: "Précision naturelle (Réussite automatique)",
      effet:
        "Vous gagnez +10 mètres de portée et +10% de chances de réussir la prochaine attaque à distance et+10% de Critique. Ne consomme pas d’action, non cumulable. Utilisable une fois par combat ou scène."
    },
    majeures: {
      constitution: 0,
      intelligence: 1,
      force: 2,
      dextérité: 4,
      sagesse: 3,
      charisme: 0,
      defense: 0,
      chance: 0
    },
    mineures: {
      monde: 0,
      mystique: 0,
      nature: 40,
      sacré: 0,
      robustesse: 10,
      calme: 0,
      marchandage: 0,
      persuasion: 0,
      artmusique: 0,
      commandement: 0,
      acrobatie: 15,
      discretion: 5,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 10,
      puissance: 0,
      intimidation: 0,
      perception: 20,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },
  elfesNoirs: {
    nom: "Elfe Noir",
    description: [
      "Race elfique à la peau couleur obsidienne et aux oreilles pointues mais courtes, les elfes noirs mesurent en moyenne 1m90 et sont souvent bien plus affutés voire musclés que les autres elfes. Ils peuvent vivre près de 300 ans comme les Haut-Elfes et se paye le luxe de très bien vieillir physiquement la plupart du temps ce qui leur permet des prouesses athlétique jusqu’au crépuscule de leur vie.",
      "Les Elfes noirs, que les autres races appellent avec dédain les « Cendreux », vivent principalement au Nord-Ouest du monde, dans un climat froid et venteux et sur des terres volcaniques dangereuses et infertiles.",
      " Tout ceci les a conduits à devenir très robustes même physiquement et les a écartés des physiques « elfiques » élancés et fins, ils sont aussi incroyablement doués pour survivre avec peu et leur corps peut se passer bien plus longtemps d’eau et de nourriture que toutes les autres races majeures.",
      "Vu par les autres peuples comme une race d’assassins, de tueurs et de psychopathes ils sont malheureusement incapables de se faire entendre sur la scène internationale en raison des incessants conflits internes qui secouent les clans de leur propre territoire. Ce manque d’unité et ce climat de guerre constante n’aide pas à leur donner une réputation pacifique et la plupart des habitants du monde frémissent en voyant un elfe noir, jugés coupables avant même d’avoir prononcé un mot.",
      "Les jeunes Elfes noirs partent pourtant souvent sur les routes, leur système politique géré par des veilles générations et les conflits sans queue ni tête datant de temps immémoriaux ne leur plaisent plus beaucoup et on assiste à un véritable exode des jeunes de ce peuple qui partent se réfugier dans d’autres contrées, un peu là où ils peuvent et sont accepter. En cela les occidentaux leur ont d’ailleurs ouvert grand la porte et la ville de Nouare, en territoire occidental, est composé à plus de 60% d’Elfes noirs ce qui en fait la seule ville dirigé par une race et peuplé majoritairement par une autre."
    ],
    talentRace: {
      nom: "Méfiance",
      effet: "Lorsque vous rencontrez pour la première fois quelqu'un permet d’effetuer un jet de perception, de perception magique ou d'intuition en y ajoutant la valeur de votre meilleure statistique majeure."
    },
    competenceRace: {
      nom: "Sang et Cendre",
      effet: "Vous infliger Brulure irrésistible sur votre cible lors de votre prochaine attaque, à chaque fois que cette brulure inflige des dégâts vous vous soignez du même montant. Si la cible est immunisé à Brulure vous infligez 1d8 dégâts fixe et récupérez autant de point de vie. Ne consomme pas d'action, une fois par combat ou scène."
    },
    majeures: {
      constitution: 2,
      intelligence: 0,
      force: 3,
      dextérité: 0,
      sagesse: 3,
      charisme: 0,
      defense: 2,
      chance: 0
    },
    mineures: {
      monde: 0,
      mystique: 0,
      nature: 0,
      sacré: 0,
      robustesse: 10,
      calme: 15,
      marchandage: 0,
      persuasion: 0,
      artmusique: 0,
      commandement: 0,
      acrobatie: 0,
      discretion: 10,
      adresse: 10,
      artisanat: 0,
      hasard: 0,
      athlétisme: 5,
      puissance: 5,
      intimidation: 20,
      perception: 10,
      perceptionmagique: 5,
      medecine: 0,
      intuition: 10
    }
  },
  nomades: {
    nom : "Nomade",
    description: [
      "Race humaine ressemblant beaucoup aux deux autres, ils possèdent un physique similaire mais sont très facilement reconnaissables en raison de leur peau beaucoup plus sombre, proche du marron et du noir, ils sont aussi généralement plus grand avec une moyenne de taille de 1m80 chez les hommes et 1m70 chez les femmes, ont peu aussi dire qu’ils sont bien plus affutés physiquement que leurs cousins en raison de leur long passé de voyageur. L’espérance de vie chez eux avoisine les 70 ans, les anciens étant très respectés et très choyés dans la culture Nomade, ils peuvent vivre paisiblement jusqu’au bout, protégés par leur clan.",
      "Les Nomades ne possèdent pas à proprement parler de territoire, les autres races considèrent le Désert Allambar comme leur appartenant plus parce que ce sont les seuls à pouvoir le traverser que parce qu’ils y vivent. En effet c’est un peuple constitué à très grande majorité de voyageurs, ils traversent donc constamment le monde entier pour vendre et acheter des ressources, apporter des nouvelles, du courrier, où simplement pour le plaisir de se promener.",
      "Robustes, résistants aux conditions difficiles de tous les climats d’Alyria, ils sont réputés impossible à arrêter et voyagent sans cesse ne s’autorisant que de très courts repos. Il existe pourtant une catégorie de Nomade qui ne voyage pas, ceux-là s’appellent les exilés et ont était un jour bannis de leurs clans, ou sont les enfants d’un exilé, cette catégorie vit de manière bien plus sédentaire et s’implante dans beaucoup de villes un peu partout dans le monde.",
      "Cette race constitue le poumon commercial d’Alyria et permet le commerce entre tous les peuples en raison de sa neutralité absolue. En cela les autres races apprécient beaucoup les Nomades, ils sont vus comme fiable et apportant souvent avec eux de nombreuses richesses, néanmoins ils sont aussi des marchands redoutables à la réputation légendaire ce qui ne manque pas d’attiser certaine tension avec des marchands plus «locaux» dans les villes qu’ils traversent."
    ],
    talentRace: {
      nom: "Débrouillardise",
      effet: "Lors d’un jet de statistique mineure, vous pouvez booster jusqu’à +20 la statistique concernée. Le prochain jet sur les statistiques se fera avec autant de malus que de bonus précédemment acquis. Cette mécanique ne peut pas être utilisée pour compenser le malus qu’elle octroie, elle ne peut donc s’utiliser qu’une fois sur deux."
    },
    competenceRace: {
      nom: "Marche inexorable",
      effet: "Vous gagnez 15 mètres de portée de déplacement pour ce tour et vous débarrasser des effets entrave, engelure et mal des transports à l’utilisation de ce sort. Ne consomme pas d’action, une fois par combat ou scène."
    },
    majeures: {
      constitution: 3,
      intelligence: 0,
      force: 2,
      dextérité: 0,
      sagesse: 0,
      charisme: 5,
      defense: 0,
      chance: 0
    },
    mineures: {
      monde: 20,
      mystique: 0,
      nature: 10,
      sacré: 0,
      robustesse: 0,
      calme: 5,
      marchandage: 25,
      persuasion: 10,
      artmusique: 0,
      commandement: 10,
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 20,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },
  orientaux: {
    nom: "Humain Oriental",
    description: [
      "Race très similaire aux humains Occidentaux, ils n’ont que quelques rares différences avec leurs cousins, ils ont donc une peau plus colorée dans les tons ambres, ils ont des yeux plus étriqués «en amande» et sont généralement plus petit avec une moyenne de taille de 1m60 pour les hommes et 1m50 pour les femmes. Les autres races ont d’ailleurs souvent du mal à différencier un Oriental d’un Occidental, ils sont généralement appelés les «Humains » et mis dans le même sac. Le système de santé Oriental étant très développé l’espérance de vie est proche des 80 ans pour presque toutes les tranches de la population chez cette race.",
      "Pourtant ils vivent très différemment de leurs cousins occidentaux, de l’autre côté des montagnes céleste s’étend l’Empire Oriental, un seul bloc uni et gigantesque leur offrant le plus vaste territoire sous contrôle d’une seule entité de tout Alyria. Ils vivent soudés entre eux et s’offrant aux uns et aux autres un soutien sans faille, ils sont aussi beaucoup moins tolérants envers les étrangers et plus méfiants de tout ce qu’ils ne connaissent pas.",
      "Les Orientaux sont réputés fiable, loyaux et vivant avec honneur, il n’y a pourtant pas que des enfants de cœur au-dessus de tout soupçons mais il est vrai que c’est l’image qu’ils renvoient au reste du monde. Ils mettent un point d’honneur à vivre en suivant les lois et les traditions au pied de la lettre et ont un goût pour la beauté sans pareil, de ce dernier point vient d’ailleurs le fait qu’ils prient surtout Santis, le Dieu de la beauté, le considérant comme à l’origine de toutes choses et au-dessus des autres divins.",
      "Cette race est donc vue par les autres comme des gens fiable et assez fermés sur eux même, ils ont tendance à se méfier de tout mais offre leur soutien total si la personne qui se présente à eux et elle aussi fiable et sincère. Ils sont aussi très réputés pour leur vaillance et leurs prouesses en combat, l’armée Orientale étant considérée comme la plus puissante armée du monde."
    ],
    talentRace: {
      nom: "Code de conduite",
      effet: "Vous gagnez +10 dans une statistique mineure lorsque vous entreprenez une action qui va dans le sens d'un code de conduite ou d'une loi strictement suivit par votre personnage."
    },
    competenceRace: {
      nom: "Honneur à Tous",
      effet: "Vous et tous les alliés en combat gagnent +2 au DSB  et +10% aux chances de toucher pour un tour. Ne consomme pas d’action, une fois par combat ou scène."
    },
    majeures: {
      constitution: 1,
      intelligence: 1,
      force: 0,
      dextérité: 1,
      sagesse: 2,
      charisme: 0,
      defense: 4,
      chance: 0
    },
    mineures: {
      monde: 10,
      mystique: 10,
      nature: 0,
      sacré: 10,
      robustesse: 0,
      calme: 0,
      marchandage: 0,
      persuasion: 0,
      artmusique: 20,
      commandement: 15,
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 5,
      hasard: 0,
      athlétisme: 5,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 5
    }
  },
  continentaux: {
    nom: "Humain Continental",
    description: [
      "Race mesurant en moyenne 1m70 pour les hommes et 1m60 pour les femmes, ils possèdent la peau plutôt claire et ont généralement une pilosité corporelle plutôt faible, ils sont les humains les plus répandus en Alyria. Ils vivent en moyenne 70 ans mais seuls les plus aisés d’entre eux peuvent espérer atteindre le grand âge, il s’agit en effet d’une race plutôt fragile et sensible à de nombreuses maladies qui ne guérissent pas toute seules.",
      "Vivant dans du côté occidental des montagnes célestes comme leur nom l’indique, c’est de loin le peuple qui possède le plus de diversité que ce soit au niveau des coutumes, de la politique ou de la façon de vivre au quotidien. Les Occidentaux sont tous différents selon la région dans laquelle ils vivent, s’ils partagent un physique communs, ils ont une tendance aux conflits avec tout ce qui est ne serait-ce que légèrement différent d’eux.",
      "Même si le territoire occidental est en paix depuis quelques années il s’agit de la plus grosse poudrière d’Alyria et les nombreux royaumes qui le composent semblent constamment chercher un moyen de s’étendre au profit des autres. Les Occidentaux en eux même sont souvent vus comme des fourbes et des manipulateurs par les autres races, ils sont vus comme la race la plus « intéressante » par les Hauts-Elfes et comme le peuple le plus dangereux de la planète par les nains par exemple.",
      "Les Occidentaux envoient par vagues entières des diplomates et des voyageurs dans d’autres régions ce qui en fait une des races les plus représentée à l’étranger du monde, même s’ils ne sont pas toujours bien accueilli ils font preuve d’une formidable capacité d’adaptation aux coutumes et traditions dans lesquelles ils sont plongées.",
      "Les Humains Occidentaux ne sont donc exceptionnels nulle part mais capable de s’adapter à tout ce qu’on leur propose, de fait ils se développent vite et savent patienter pour frapper là où ça fait mal, leur territoire menace de jour en jour ceux des races voisines, même s’ils ne le disent pas directement."
    ],
    talentRace: {
      nom: "Soutien Opportun",
      effet: "Vous pouvez, lors d’un jet d’un joueur allié hors combat et si vous pouvez lui apporter votre aide d'une quelconque manière, faire en sorte que l’allié fasse son jet sur votre propre statistique dans ce domaine. Cette mécanique n’est utilisable qu’une fois par scène."
    },
    competenceRace: {
      nom: "Adaptabilité situationnelle",
      effet: "Permet de lancer le jet de touche de la prochaine capacité sur la statistique de votre choix, augmente le DSB de celle-ci de 2. Ne consomme pas d’action, une fois par combat ou scène."
    },
    majeures: {
      constitution: 2,
      intelligence: 1,
      force: 1,
      dextérité: 1,
      sagesse: 1,
      charisme: 2,
      defense: 1,
      chance: 1
    },
    mineures: {
      monde: 5,
      mystique: 5,
      nature: 5,
      sacré: 5,
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
      intuition: 0
    }
  },
  gobelins: {
    nom: "Gobelin",
    description: [
      "Race de petite taille mesurant entre 80 cm et 1m20, les gobelins sont caractérisés par des oreilles longues et pointues, des dents acérés et qui repoussent lorsqu’elles tombent, un visage plutôt triangulaire, et surtout une peau verte. Ils sont généralement assez minces même s’il peut y avoir des exceptions et ils possèdent une endurance hors du commun, vous aurez bien du mal à croiser un gobelin fatigué ou en train de dormir. Ils ne vivent pas plus de 40 ans, ce qui en fait, avec les hommes-rats, la race « majeure » à l’espérance de vie la plus courte. ",
      "Considéré comme une des races « Fléau » avec les Orcs et les Skavens, ils vivent un peu partout dans le monde en s’implantant dans des camps souvent construit avec les moyens du bord. Leur vitesse de reproduction exceptionnelle et leur maturité très rapide leur permet de compenser leur taux de mortalité effroyablement élevé. Les gobelins sont en effet matures à 3 ans et peuvent faire tout ce qu’un gobelin adulte peut faire en plus d’être d’une taille assez proche de leur taille définitive, une gobeline va avoir en moyenne une vingtaine d’enfant dans sa vie et ne sera enceinte que trois mois avant d’accoucher. Pour compenser cela peu de gobelin meurt de vieillesse, étant une race très combattante ils meurent souvent au combat mais ils sont aussi particulièrement curieux et inconscient et un nombre conséquent d’entre eux meurt en faisant des choses assez idiotes.",
      "Il va sans dire que les autres races ne les aiment pas en raison de leur grande agressivité, les nains particulièrement les haïssent car ils vivent souvent dans les même cavernes et cavités rocheuses qu’eux et ces deux races ont tendance à se disputer les minerais sur leurs territoires respectifs. Les gobelins ne seront donc pas du tout accueilli à bras ouvert partout et devront se montrer prudent s’ils souhaitent voyager.",
      "Ils ont un mode de fonctionnement et de vie très différents de toutes les autres races mais la chose la plus notable chez eux est ce que les autres ont nommé la « croyance verte », les gobelins peuvent se persuader si fort que quelque chose fonctionne que cette chose va magiquement fonctionner même si cela n’a aucun sens ni sur le plus physique si sur le plan psychique. Par exemple els gobelins sont persuadés que certains sons empêchent totalement l’utilisation de magie en raison de la « Krispassion », s’ils frottent deux bouts de métaux l’un sur l’autre par exemple vous pourriez vous retrouver en effet dans l’impossibilité de lancer un sortilège s’ils sont suffisamment nombreux à y croire."
    ],
      talentRace: {
      nom: "Insignifiance",
      effet: "Vous gagnez +10 à toutes les statistiques basés sur la dextérité lors d’un jet sur des races ou des monstres de plus grandes tailles. En contrepartie vous perdez +10 à toutes les statistiques basées sur le charisme sur ces mêmes races. Ces bonus ne s'appliquent qu'hors combat."
    },
    competenceRace: {
      nom: "Harcèlement critique",
      effet: "(Réussite automatique) Lors de la prochaine attaque vous gagnez +10% de chance de touche et de CC, si l’ennemi frappé est déjà engagé au corps à corps avec un allié vous maximisé les dégâts. Ne consomme pas d’action, une fois par combat ou scène"
    },
    majeures: {
      constitution: -2,
      intelligence: 0,
      force: -2,
      dextérité: 8,
      sagesse: 0,
      charisme: 0,
      defense: -2,
      chance: 8
    },
    mineures: {
      monde: 0,
      mystique: 0,
      nature: 0,
      sacré: 0,
      robustesse: 0,
      calme: 0,
      marchandage: 0,
      persuasion: 0,
      artmusique: 0,
      commandement: 0,
      acrobatie: 15,
      discretion: 15,
      adresse: 20,
      artisanat: 10,
      hasard: 15,
      athlétisme: 5,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 15
    }
  },
  gnomes: {
    nom: "Gnôme",
    description: [
      "Race la plus petite d’Alyria, ils ne mesurent jamais plus d’un mètre de haut et sont aussi généralement très léger. Leur corps ressemble comme deux gouttes d’eau à celui d’un humain mais leur tête est plus grosse en proportion et ils sont aussi plus léger car ils ne sont pas composés comme les autres races. Ils vivent en moyenne une centaine d’année et ne vieillissent pas au sens « normal » ils restent constamment d’apparence jeune et meurt du jour au lendemain sans qu’aucune modification physique ne soit visible.",
      "Il sont en effet composés « magiquement » comme le serait un golem ou un esprit, leurs organes vitaux fonctionnent donc avec la psyché naturelle qu’ils absorbent et réutilisent pour eux. En cela les gnomes sont difficilement soignables par les méthodes conventionnelles et ont des maladies que seul eux peuvent attraper, en revanche cela fait d’eau de véritables usines à psyché et ils leur est bien plus simple à utiliser la magie que la plupart des autres races d’Alyria.",
      "Les Gnomes ne vivent pas en communauté, ils ne disposent d’aucun territoire ou ville leur appartenant, ils se déplacent au grès de leurs envies et quittent leur famille dès qu’ils sont autonome, cela est normal pour eux et ils se mêlent donc à la population des autres races partout dans le monde. Leur comportement très libre et farceur vient en grande partie de cet état de fait, s’ils ne sont plus accepté quelque part ils iront ailleurs, ils ne semblent pas beaucoup s’attacher à quoique ce soit de matériel ni à des lieux en particulier.",
      "Plutôt bien vue par les autres races pour leurs inoffensivité, ils sont accueillis partout dans le monde mais peuvent tout de même causer de problèmes en raison de leur fâcheuse tendance à faire des farces et à vouloir rire de tout en permanence. Là ou d’autre y verrait des simplets qui vivent sans craindre les conséquences eux y voient une tradition et surtout une façon d’éviter la pire maladie pour un gnome : la grisonnante. Cette affliction rend les gnomes insensible à la joie, ils ne rient plus jamais et semblent constamment triste ou énervé, leurs cheveux grisonnent et leurs rides se creusent à grande vitesse ce qui cause leurs décès en quelques années à peine."
    ],
    talentRace: {
      nom: "Farce et attrape",
      effet: "Lors d’un jet hors combat, le gnome peut jouer un petit tour de magie pour appliquer un malus de -10 lors du jet OU donner un bonus de +10 à une entité de son choix. Il faut en outre décrire en quoi le tour de magie aide dans la situation. Utilisable une seule fois par scène"
    },
    competenceRace: {
      nom: "Image illusoire",
      effet: "Vous pouvez utiliser ce sort à la place de vous déplacer, vous créer deux images de vous-même à des endroit voulu jusqu'à 15 mètres de vous. L’image à 1 PV mais provoque tous les ennemis dans un rayon de 10 mètres en les forçant à l’attaquer. Ne consomme pas d’action, une fois par combat ou scène."
    },
    majeures: {
      constitution: 0,
      intelligence: 6,
      force: 0,
      dextérité: 2,
      sagesse: 0,
      charisme: 0,
      defense: -2,
      chance: 4
    },
    mineures: {
      monde: 0,
      mystique: 10,
      nature: 10,
      sacré: 0,
      robustesse: 0,
      calme: 0,
      marchandage: 0,
      persuasion: 15,
      artmusique: 5,
      commandement: 0,
      acrobatie: 0,
      discretion: 0,
      adresse: 15,
      artisanat: 0,
      hasard: 10,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 15,
      intuition: 20
    }
  },
  nainponnais: {
    nom: "Les Nainponnais",
    description: [
      "Similaire autant par la taille que par l’apparence à leurs cousins des montagnes les Nainponais mesurent en moyenne entre 1m10 et 1m30 et possède de petites jambes sur lesquelles se dresse un corps robuste et trapu. Cependant la ressemblance s’arrête ici car les Nainponais possèdent une peau doré qui brille presque au soleil et sont totalement glabre, les hommes sont par ailleurs totalement chauve et seules les femmes possèdent des cheveux et encore, ceux-ci sont assez fragiles et très fins. Comme leurs cousins des montagnes ils vivent en moyenne 200 ans.",
      "Les Nainponais vivent dans les Montagnes Nainponaises qui sont en fait des volcans, éteints pour la plupart, mais renfermant tout de même encore de nombreuses poches de laves et gaz sous leurs surfaces. La région est en plus située au Nord et l’environnement y est froid et sec une grande partie de l’année, pourtant les Nainponais s’y sont adaptés et ils supportent très bien les variations de températures même extrême. Un membre de cette race peut par exemple tenir plusieurs jours à des températures dépassant les 80 degrés ou inférieure à -30 degrés et ce sans avoir besoin de s’habiller particulièrement.",
      "Si leurs cousins des montagnes sont vus comme des costauds il faut bien noter que ceux-ci considère les Nainponais comme les vrais durs des durs. Ces nains d’orient sont beaucoup moins nombreux et vivent dans un royaume sans roi qui se morcèle de l’intérieur à cause de la consommation excessive par une grande partie de la population d’une drogue terrible : le champiternel. Celui-ci à fait mourir plus de la moitié des Nainponais en moins d’un siècle et la plupart des habitants d’Alyria considère que cette race vit ses derniers instants.",
      "Ces nains sont pourtant de formidables artisans, les meilleurs du monde, ils vivent isolés du reste des races par choix mais ne refuse pas qu’on vienne les visiter et sont plutôt ouvert avec les voyageurs. Globalement ils sont plutôt avenants mais ils sont aussi avide et avare et ont un fort penchant pour la bagarre, bien que tout ceci ne soit qu’une généralité."
    ],
    talentRace: {
      nom: "Doigts d'Or :",
      effet: "Vous obtenez l'avantage sur vos jets d'artisanat. Vous pouvez réaliser de petites réparations simples sans avoir à faire de jet.",
      fonction: "bonusDirectPlusConditionnel",
      
    },
    competenceRace: {
      nom: "Né de la forge :",
      effet: " Pendant 2 tours vous obtenez l'immunité au feu et à Brulure, vos attaques à mains nues infligent 1 dé 8 dégâts et appliquent Brulure. Une fois par combat ou scène"
    },
    majeures: {
      constitution: 2,
      intelligence: 0,
      force: 4,
      dextérité: 2,
      sagesse: 0,
      charisme: 0,
      defense: 2,
      chance: 0
    },
    mineures: {
      monde: 0,
      mystique: 0,
      nature: 0,
      sacré: 0,
      robustesse: 20,
      calme: 5,
      marchandage: 0,
      persuasion: 0,
      artmusique: 0,
      commandement: 10,
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 30,
      hasard: 0,
      athlétisme: 10,
      puissance: 15,
      intimidation: 10,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },
  nain: {
    nom: "Les Nains des Montagnes",
    description: [
    "Ils sont plutôt petit, entre 1m10 et 1m30 en moyenne mais extrêmement robuste, ils possèdent un corps trapu avec des petites jambes qui ne les prédisposent pas à la course mais qui leur permet d’être très difficile à bouger et particulièrement résistant à la douleur. Les nains des montagnes vivent principalement dans les montagnes célestes, au sein du puissant royaume des nains des montagnes. Ils peuvent vivre jusqu’à 200 ans en moyenne et certains atteignent presque un âge « elfique » de 300 ans.",
    "Les hommes nains portent fièrement la barbe, elle constitue même un indicateur du statut social de l’individu car ils aiment faire des insignes militaires ou des rangs de noblesses des anneaux métalliques à porter enroulés dans la barbe. Les femmes quant à elles font de même avec leurs chevelures, les naines portent les cheveux longs et les différentes insignes mise à l’intérieure. La pilosité chez les nains est donc très importantes et perdre sa barbe ou ses cheveux est souvent vu comme une catastrophe et une malédiction, il n’est pas rare donc que les plus vieux d’entre eux portent des perruques ou de fausses barbes pour garder jusqu’au bout ce qui fait leur fierté.",
    "L’autre caractéristique principale des nains est donc ce corps robuste, ils sont en effet, malgré leur petite taille, la race qui encaisse le mieux les coups et qui a la plus haute tolérance à la douleur en moyenne. Il possède aussi une force physique impressionnante et sont généralement plutôt affuté physiquement, probablement parce que la plus grande partie d’entre eux sont des mineurs ou des artisans qui travaillent d’arrache-pied.",
    "Les nains sont généralement têtus et assez prompt à se battre, ils n’aiment pas beaucoup qu’on leur dise quoi faire et réagissent généralement à chaud à la plupart des situations. Cependant ceci n’est qu’une généralité et cela ne se confirme pas chez tous les nais bien sûr, on note aussi qu’ils s’ouvrent facilement vers l’extérieur en envoyant des marchands et négociants nains partout dans le monde mais que leur royaume est plutôt hermétique aux étrangers lui-même sauf dans des cas très particulier."
    ],
    talentRace: {
      nom: "Avarice",
      effet: "Lorsque vous pouvez obtenir du butin en le ramassant dans le monde vous obtenez toujours un butin de plus. Vous avez l'avantage en perception lorsqu'il faut détecter des objets précieux."
    },
    competenceRace: {
      nom: "Né de la roche",
      effet: "Octroie +2 d’armure et +10% au blocage ainsi que l'Immunité Terre et à Sonné pour deux tours. Ne consomme pas d’action, une fois par combat ou scène"
    },
    majeures: {
      constitution: 5,
      intelligence: 0,
      force: 2,
      dextérité: -2,
      sagesse: 0,
      charisme: 0,
      defense: 5,
      chance: 0
    },
    mineures: {
      monde: 5,
      mystique: 0,
      nature: 0,
      sacré: 0,
      robustesse: 30,
      calme: 15,
      marchandage: 10,
      persuasion: 0,
      artmusique: 0,
      commandement: 10,
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 10,
      hasard: 0,
      athlétisme: 0,
      puissance: 20,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },
  skaven: {
    nom: "Skaven",
    description: [
      "Race de petite taille, ils mesurent entre 1 mètre et 1 mètre 40 en moyenne mais certains d’entre eux, qu’ils appellent des Skrix, se gavent de breuvages magiques divers et peuvent alors devenir de véritables monstres de trois mètres de haut mais à l’intelligence d’une moule. Les autres races les nomment souvent les Hommes-Rats mais ils sont en fait plus des humanoïdes possédant tous des caractéristiques liés aux rongeurs. Ils vivent en moyenne une quarantaine d’année mais peu meurt de vieillesse en raison de leur mode de vie plutôt violent.",
      "Les caractéristiques physiques d’un Skaven sont qu’il est généralement couvert de poil, qu’il possède une queue, un museau long et des moustaches au bout de celui-ci, ils ont aussi une dentition particulière avec deux grandes incisives qui poussent sans cesse et qu’ils ont besoin d’abîmer régulièrement. On peut donc trouver des Skavens qui vont effetivement tenir beaucoup du rat mais aussi de la souris, du hamster ou encore de la gerbille par exemple. Ceux qui ressemblent à des rats sont cependant nettement majoritaire et ne considère même pas les autres comme étant véritablement des Skavens, ces autres Hommes-Rongeurs vivent donc en communauté à part et sont presque tous considérés comme en voie de disparition.",
      "Les Skavens sont la race la plus détesté par les autres en Alyria, ils sont considérés comme une race « Fléau » qu’il faut éradiquer, de fait un Homme-rat ne sera jamais accueilli avec bienveillance ou que ce soit et certains pays le pendrons même haut et court s’il l’aperçoive dans leur rue. Pourtant ils sont très nombreux dans le monde et vivent même très proche des autres civilisations, juste en dessous pour être précis, ils affectionnent de se positionner dans les réseaux d’égouts ou des ruines d’anciennes cités. Ainsi ils peuvent prendre ce qu’ils ont besoin pour vivre en chapardant les ressources des habitants de la surface, ils ne vivent donc que de vol et de raid.",
      "Les Hommes-Rats prennent donc ce qu’ils veulent quand ils le veulent, ils tuent si ça leur fait plaisir et ne laisse aucune loi et aucune règle dicter leur conduite. Ce comportement égoïste se traduit dans la structure même de leurs sociétés que ce soit envers les membres de leur race ou envers ceux des autres races"
    ],
    talentRace: {
      nom: "Rat-pine",
      effet: "Vos jet pour voler des objets ne peuvent pas être soumis à un malus ou un désavantage même si la situation vous est extrêmement défavorable, vous avez l'avantage aux jets d'adresse et de discrétion visant à voler quelque chose."
    },
    competenceRace: {
      nom: "Vermine",
      effet: "Vous pouvez annuler une attaque qui vous cible, elle ne fera aucun dégâts et n'appliquera aucun effet, vous êtes considéré comme dans l'état Mort par toutes les entités jusqu'au début de votre prochain tour. Ne consomme pas d’action, une fois par combat ou scène."
    },
    majeures: {
      constitution: -2,
      intelligence: 0,
      force: 0,
      dextérité: 10,
      sagesse: 2,
      charisme: -2,
      defense: 0,
      chance: 2
    },
    mineures: {
      monde: 5,
      mystique: 0,
      nature: 0,
      sacré: 0,
      robustesse: 0,
      calme: 0,
      marchandage: 0,
      persuasion: 10,
      artmusique: 0,
      commandement: 0,
      acrobatie: 20,
      discretion: 20,
      adresse: 20,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 20,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 5
    }
  },
  fushir: {
    nom: "Fushir",
    description: [
      "Races d’hommes félins, couramment appelés Homme-Chats par les autres races, il en existe de toute les sortes et de toute les tailles, on peut trouver des Fushir de 80cm à peine et d’autre dépassant allégrement le double mètres, ils possèdent cependant tous un point commun : ils sont couvert de fourrure et portent les traits caractéristiques des félins. Ils vivent en moyenne une soixantaine d’année, cependant l’écart entre la moyenne et l’âge possible est énorme car de rare Hommes-Chats ont pu dépasser les 120 ans.",
      "Ces traits caractéristiques sont donc des moustaches, un pelage sur tout le corps, des oreilles triangulaires, un museau plutôt qu’un nez, une queue et surtout des griffes terriblement affutées. Tout ceci définit un Fushir et ils se considèrent tous comme appartenant à une seule et même race quand bien même leurs autres caractéristiques physiques peuvent variée du tout au tout.",
      "Considérés comme une race sage, pleine d’empathie et pacifiste, ils sont pourtant largement capables de se défendre grâce à leurs capacités physiques supérieures à celle de la plupart des autres races et à leurs griffes tranchantes. Ces traits de caractères sont une généralité et on trouve par exemple d’excellent guerriers Fushir qui ont mis le pacifisme entre guillemet pour détruire leurs adversaires.",
      "Vivant principalement sur l’île des Hommes-Chats (qu’ils appellent eux l’île des astres ou Fushala dans leur langue natale), on en trouve pourtant absolument partout en Alyria, ils partagent en effet une certaine envie de voyage avec les Nomades et n’hésitent pas à visiter des contrées très lointaines pour s’installer en petites communautés au quatre coins du monde. Ils apprécient grandement les sociétés cosmopolite et aiment se mélanger avec d’autres races, on trouve par ailleurs un grand nombre d’hybride au sein des Fushirs qui possède donc un parent Homme-Chat et un parent d’une autre race"
    ],
    talentRace: {
      nom: "Philosophe débatteur ",
      effet: "Vous obtenez un avantage lors de tous vos jets de Persuader/Tromper ou de marchandage si vous assommez d'un flux interrompu de parole votre interlocuteur. Si le jet est raté malgré tout il engendrera un effet négatif supplémentaire, au choix du MJ."
    },
    competenceRace: {
      nom: "Prédiction astrale",
      effet: "Vous gagnez +30% au blocage lors de la prochaine attaque subie, si vous bloquer le coup vous pouvez décider de bouger de 5 mètres dans la direction de votre choix, l’ennemi que vous avez bloqué subit 1 dé 6 dégât fixes. Ne consomme pas d’action, une fois par combat ou scène"
    },
    majeures: {
      constitution: -1,
      intelligence: 0,
      force: -1,
      dextérité: 0,
      sagesse: 0,
      charisme: 6,
      defense: 0,
      chance: 6
    },
    mineures: {
      monde: 0,
      mystique: 5,
      nature: 0,
      sacré: 5,
      robustesse: 0,
      calme: 0,
      marchandage: 20,
      persuasion: 10,
      artmusique: 0,
      commandement: 0,
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 30,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 10,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 20
    }
  },
  sysalsis: {
    nom: "Sizalsis",
    description: [
      "Race de taille et de corpulence très variables, communément appelés Hommes-Lézards par les autres races, ils peuvent mesurer entre à peine 1 mètres jusqu’à près de trois mètres pour les plus grands d’entre eux ce qui en fait la race la plus grande d’Alyria en taille maximale mais pas en taille moyenne. Ils sont très différents les uns des autres mais partage un point commun : ils sont tous couvert d’écaille et partage les traits caractéristiques des reptiles. Ils vivent en moyenne 80 ans mais certains Sizalsis, particulièrement ceux partageant les traits des tortues, peuvent atteindre une durée de vie «Elfique» de près de 300 ans",
      "Les traits physiques communs à tous les Sizalsis sont qu’il est couvert d’écaille en grande partie, ils ne disposent pas d’oreilles externes et ne génèrent aucune chaleur corporelle. Ce dernier point étant très important car c’est pour cela que vous ne verrez pas beaucoup de personnes de ce peuple dans les régions froides où ils auraient bien du mal à survivre longtemps. Ces points définissent un Sizal et, même si leurs caractéristiques physiques varient énormément, ils se considèrent tout de même comme un seul et unique peuple.",
      "Vivant en communautés tribales reliés entre-elles par des réseaux de messagers, ils existent un semblant de coordination entre tous les Hommes-Lézards, même si on ne trouve des villages de ce peuple que dans le Bois de Katrepas. Leur présence dans cet environnement extrêmement dangereux témoigne néanmoins de leurs incroyables habilités à survivre et de leur grande résistance physique. Entre eux ils se surnomment Sœur ou Frère d’écaille et sont sans aucun doute la communauté la plus unie d’Alyria, l’hospitalité et l’entraide étant quasiment obligatoire au sein de leur race, ils se montrent en revanche très méfiant avec les autres races car celles-ci n’ont pas eu un passé très calme avec les Sizalsis et ces derniers n’oublient rien",
      "Ce peuple plutôt calme dans son ensemble profite de toute façon de la protection des bois et marais qui les entourent, de fait ils n’ont pas vraiment besoin de se prémunir eux-mêmes, pourtant, pour survivre dans cette région il faut être sacrément déterminé et préparé et les Hommes-Lézards font partit des combattants que vous ne voulez vraiment pas affronter"
    ],
    talentRace: {
      nom: "Sang de lézard",
      effet: "Vous êtes immunisé au Poison, vous ne pouvez pas tomber malade, être drogué ou ivre. Vous gagnez aussi un avantage lors de vos jets pour détecter des substances nocives ou toxiques"
    },
    competenceRace: {
      nom: "Feinte Mortelle",
      effet: "Lors de la prochaine attaque avec l'arme en main loupée vous infligez tout de même les dégâts et 1 Poison irrésistible supplémentaire à la cible, sauf en cas d’échec critique. Ne consomme pas d’action, une fois par combat ou scène."
    },
    majeures: {
      constitution: 3,
      intelligence: 0,
      force: 3,
      dextérité: 3,
      sagesse: 1,
      charisme: 0,
      defense: 0,
      chance: 0
    },
    mineures: {
      monde: 0,
      mystique: 0,
      nature: 15,
      sacré: 0,
      robustesse: 20,
      calme: 0,
      marchandage: 0,
      persuasion: 0,
      artmusique: 0,
      commandement: 0,
      acrobatie: 10,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 15,
      puissance: 10,
      intimidation: 5,
      perception: 10,
      perceptionmagique: 5,
      medecine: 10,
      intuition: 0
    }
  },
  orcs: {
    nom: "Orc",
    description: [
      "Race de grande taille mesurant en moyenne 1m90, les Orcs se caractérisent par un physique musculeux et une peau verte assez sombre ainsi que deux « crocs » qui poussent comme des défenses à l’extérieur de la bouche et sont plus longs et imposants chez les hommes que chez les femmes. Ils vivent en moyenne une soixantaine d’années, mais, étant un peuple guerrier, peu d’entre eux se frayent un chemin jusqu’à la mort «naturelle».",
      "Vivant surtout à L’est et à l’Ouest du Désert Allambar, dans les terres arides, ce peuple s’est fait une véritable spécialité dans le pillage et la destruction de ce qui appartient aux autres peuples, tellement qu’ils ont fini par se faire catégorisé dans les races du « fléau » avec les gobelins et les Skavens, races qui seraient supposées avoir étaient envoyés par Lamashtu pour détruire le monde. Cette catégorisation les Orcs en rit et la prenne même comme un compliment car ils sont une société guerrière qui voue toute leur vie au combat et à la guerre pour la gloire du plus important des dieux selon eux : Kardös.",
      "Il existe bien sûr des Orcs un peu partout dans le monde qui ne partagent pas du tout ce mode de pensée mais ils sont une minorité et ceux qui ont grandi dans les terres d’origines des Orcs sont entraînés au combat et habitués à la guerre dès leur plus jeune âge.",
      "Les Orcs sont généralement plutôt bourru et bourrin, n’aiment pas beaucoup les livres ou la magie, et ne comprennent pas le second degré. A part pour ce dernier point, qui semble être une malédiction tant les Orcs y sont hermétique même après explication, le reste peut évidemment varier d’un individu à l’autre.",
      "Les pillages Orcs se font aussi souvent par bateaux et cette race fait partie des tout meilleurs navigateurs et marins qui arpentent l’Océan primordial, ils sont régulièrement recrutés, même par d’autres races, pour faire profiter de leur longue expérience de la mer."
    ],
    talentRace: {
      nom: "Gabarit hors-norme",
      effet: "Vous ajouter votre valeur de force lors d’un jet d’intimidation, et de calme. Lors d’un jet d’acrobatie ou de discrétion vous retirer votre valeur de force à votre statistique."
    },
    competenceRace: {
      nom: "Résilience totale ",
      effet: "(Réussite automatique) Pour deux tours vous gagnez +20% à vos jets de sauvegarde et 2+DSB PB, le prochain soin reçu après l’utilisation de ce sort est doublé. Ne consomme pas d’action, une fois par combat ou scène."
    },
    majeures: {
      constitution: 7,
      intelligence: -2,
      force: 5,
      dextérité: 0,
      sagesse: -1,
      charisme: 0,
      defense: 1,
      chance: 0
    },
    mineures: {
      monde: 0,
      mystique: 0,
      nature: 0,
      sacré: 0,
      robustesse: 20,
      calme: 10,
      marchandage: 0,
      persuasion: 0,
      artmusique: 0,
      commandement: 10,
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 20,
      puissance: 30,
      intimidation: 10,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },
  borealien: {
    nom:  "Les Boréaliens",
    description: [
      "Mesurant près d’1m90 en moyenne, bipède ursidé, une mâchoire prédominante, des crocs apparents et des yeux de braise irradiant un faible vapeur viennent parfaire ce look bestial, ont les dits même carnivores. Jouissant d’une faible longévité, les plus vieux mâles atteignent l’âge respectable de 60 ans.",
"Rare sont les personnes d’Alyria pouvant se vanter d’avoir vue un Boréalien, non pas que ce soit une race agressive, mais vivant dans les confins des Terres gelée de l'Ouest, il est extrêmement dur et rare de croiser ce peuple. Peu enclin à ouvrir les porte de leur majestueuse cité des glaces aux étrangers, les voyageurs ayant réussit à voir les traces de ce peuple sont à peine plus d'une poignée et même les Nomades ne s'aventurent pas aussi loin.",
"Cette société patriarcale basée sur la loi du talion vie en autarcie de pêche et chasse depuis la nuit des temps. Fière et brutale cette race règle beaucoup de conflit par le duel qui finit par la soumission du vaincu voir l’exil.",
"Malgré la brutalité de leur société, cette race est très protectrice, et valorise les liens familiaux par-dessus tout. Les Boréaliens qui se détestent vont jusqu'à s'entretuer mais sinon ils s'entraident à l'extrême."
    ],
    talentRace: {
      nom: "Enragement Bestial",
      effet: "Le lanceur gagne 1 cran en vitesse, 10% de chances de CC et une action supplémentaire, s’il reçoit des dégâts d’une autre entité pendant son tour de jeu ils sont annulés. L’effet dure 1 tour, ne consomme pas d’action, limitée à une fois par combat ou scène"
    },
    competenceRace: {
      nom: "Pelage Imperméable",
      effet: "Vous gagnez une résistance à l’Eau et une Immunité à Engelure, vous ne subissez jamais de malus dû au froid ou à l’humidité."
    },
    majeures: {
      constitution: 3,
      intelligence: -1,
      force: 6,
      dextérité: -2,
      sagesse: 0,
      charisme: 2,
      defense: 2,
      chance: 0
    },
    mineures: {
      monde: 0,
      mystique: 0,
      nature: 10,
      sacré: 0,
      robustesse: 15,
      calme: 0,
      marchandage: 0,
      persuasion: 0,
      artmusique: 0,
      commandement: 0,
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 10,
      puissance: 30,
      intimidation: 20,
      perception: 10,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 5
    }
  },
  nereide: {
    nom:  "Néréide",
    description: [
        "Mesurant en moyenne 1m50, les Néréides sont caractérisées par un corps d'apparence humanoïdes aux aspects féminin, des branchies sur le cou, de longues oreilles ressemblant presque à des nageoires et surtout le fait qu'elles ne possèdent pas de jambes mais deux ou trois paires de tentacules ainsi qu'un crâne surdéveloppé et presque translucide. Certaines sont bioluminescentes et toutes sont parfaitement adaptée à la vie sous-marine, même abyssale et peuvent également arpenter la terre ferme avec un peu moins de grâce il faut le dire. Elles vivent en moyenne 40 ans mais leur mémoire collective fait qu'elles se souviennent toutes de ce qu'a vécu chacune d'entre elle.",
        "Race la plus rare à rencontrer en Alyria, elles vivent exclusivement dans la région des lacs de givres, dans d'immenses villes creusées à même la face cachée des Icebergs, sous la surface des eaux glaciales de cette région polaire. Ne quittant jamais leurs 'ruches', leur foyer en somme, elles seraient considérées par n'importe quel habitant d'Alyria comme des monstres ou des extra-planaires, tant leur apparence tranche avec tout ce qu'il y a de connu",
        "Ne se reproduisant qu'une fois dans leur vie en pondant un unique œuf celui-ci donnera un spécimen en tout point semblable à elle-même, une fois les 5 ans atteint, le spécimen dispose de sa taille adulte et rejoint la conscience collective de sa ruche, obtenant alors les mêmes capacités que sa génitrice. Ce système relève plus du clonage que de la réelle reproduction et la perte d'un œuf est catastrophique puisqu'on perd un individu et qu'elles n'ont aucun autre moyen de se multiplier. Lentement mais surement cette race disparait peu à peu du monde, mais on raconte qu'elles ne compte pas se laisser éteindre facilement et que leurs « anciennes » disposent de plus d'un tentacule à leur chapeau pour gérer la situation.",
        "Elles semblent avoir un goût et une faculté exceptionnelle pour manipuler la psyché, ce talent leur sert, entre autre, à protéger leur corps mou et fragile des divers monstres marins ou ennemis qu'elles pourraient rencontrer. Pas spécialement encline à l’agressivité, elle semble toutes être d'une grande sagesse et cherchent généralement à éviter de se mettre en danger."
    ],
    talentRace: [
        {
            nom: "Conscience collective",
            effet: "Vous faite appel aux connaissances phénoménales de votre ruche natale, octroie un bonus de 30 dans n'importe quel jet lié à la Sagesse ou l'Intelligence. Utilisez cet effet est très épuisant, il ne peut avoir lieu qu'une fois par 24H ou il faudra dépenser 4 points de votre propre PSY pour le réutilisez avant."
        },
        {
            nom: "Aquatique",
            effet: "Cette race est très à l'aise dans l'eau, elle nage plus vite qu'elle ne court, peu voir, entendre et respirer sous l'eau comme en dehors. Hors de l'eau, elle est bien moins agile et rapide. Sa vitesse de base est donc Lente sur terre et Très rapide dans l'eau."
        }
    ],
    competenceRace: {
        nom: "Influence Cérébrale",
        effet: "Si ce sort cible un allié, vous partagez la totalité de vos statistiques en ne prenant que la meilleure dans le domaine pour les calculs ou les jets de dés, cela inclus également le DSB, le taux de CC, de blocage, l'armure ou les PB. Sur un ennemi vous le contraignez à utiliser votre pire statistique de touche pour faire ses jets. L'effet dure 1 tour en combat et 1 minute hors combat, utilisable une fois par combat ou par scène."
    },
    majeures: {
        constitution: -2,
        intelligence: 6,
        force: -2,
        dextérité: 0,
        sagesse: 8,
        charisme: 0,
        defense: 0,
        chance: 0
    },
    mineures: {
        monde: 10,
        mystique: 30,
        nature: 10,
        sacré: 10,
        robustesse: 0,
        calme: 0,
        marchandage: 0,
        persuasion: 0,
        artmusique: 0,
        commandement: 0,
        acrobatie: 0,
        discretion: 0,
        adresse: 10,
        artisanat: 0,
        hasard: 0,
        athlétisme: 0,
        puissance: 0,
        intimidation: 0,
        perception: 0,
        perceptionmagique: 20,
        medecine: 10,
        intuition: 0
    }
  }
};


