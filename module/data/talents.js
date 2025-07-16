export const talentCreation = {
  talentHistorique: {
    nom: "Talent Historique",
    description: "Ces talents ne peuvent être choisis que lors de la création du personnage, ils représentent une particularité physique de celui-ci ou ses accomplissements passés. Vous pouvez avoir un personnage dont l’histoire peut convenir à plusieurs talents historiques, il convient de n’en choisir qu’un seul, mais vous pouvez aussi mélanger deux talents entre eux ou en créer un de toutes pièces pour qu’il corresponde plus foncièrement avec l’idée que vous avez de votre personnage.",
    talents:[    
       {
        nom: "Mort-Vivant",
        description: "Le personnage est déjà un mort réanimé, il ne peut pas être tué mais seulement mis K.O, les soins le blessent mais il se soigne avec l’altération d’état 'Poison'. Il gagne aussi l'immunité à terreur.\nEtant un mort-vivant, la plupart des habitants d’Alyria essaieront de vous éradiquer s’ils se rendent compte de votre véritable nature, heureusement vous en êtes parfaitement conscient et profitez également de pouvoir simplement survivre à vos ennemis facilement…",
        benediction: "Immunité à Terreur. Les soins blessent le personnage, qui se soigne avec l'altération d'état 'Poison'. Le personnage ne peut être que mis K.O, pas tué. Gagne +10 en Survie et en Robustesse."
      },
      {
        nom: "Buvard",
        description: "Le personnage est un buvard, un être qui aspire tous les fluides de ses victimes et s’en nourrit exclusivement. Les soins n’ont aucun effet, il regagne 50% de ses PV max à chaque fois qu’il tue une cible, il obtient une faiblesse au feu.\nVous n’êtes plus tout à fait vous-même depuis cette morsure, vous avez constamment soif et êtes souvent à deux doigts de boire un bon cou, vos yeux virent au rouge sang sous la pression et vous êtes assez pâle en plus de développer une surprenante force physique mais tant que vous n’êtes pas pris sur le fait les gens ne devraient pas faire le lien avec le maléfice qui vous ronge.",
        benediction: "Les soins n'ont aucun effet. Regagne 50% des PV max à chaque fois qu'il tue une cible. Faiblesse au feu. Gagne +10 en Puissance et en Athlétisme."
      },
      {
        nom: "Élu",
        description: "Le personnage est choisi par une entité immortelle surpuissante, il s’efforcera de suivre ses préceptes et se verra gratifier d’incroyables talents en échange. Vous choisissez une entité disponible dans les talents mythiques et vous profiterez de tous ses talents, en revanche vous ne pourrez pas en choisir d’autre.\nEtant un élu vous portez de manière significative ou non le signe distinctif de votre entité, cela peut vous ouvrir des portes ou vous conduire au bûcher, mais dans tous les cas vous n’êtes pas quelqu’un d’ordinaire.",
        benediction: "Choisit une entité mythique et profite de tous ses talents (y compris le talent de niveau 0 et les bonus statistiques)."
      },
      {
        nom: "Sombrageux",
        description: "Le personnage est une créature d’ombre, il gagne une résistance au Neutre mais une faiblesse dans tous les autres éléments, le personnage est nyctalope et gagne Invisible au début du combat qui l’empêche d’être ciblé tant qu’il n’a pas agi.\nVous êtes une ombre, littéralement, votre corps est vaporeux, difficile à appréhender, vous vous réjouissez des nuits les plus sombres et craignez l’horrible lumière du jour. Les gens vous regardent avec horreur, vous n’inspirez pas confiance et êtes, au mieux, considéré comme porteur d’une malédiction.",
        benediction: "Résistance au Neutre, faiblesse dans tous les autres éléments. Nyctalope. Gagne Invisible au début du combat (ne peut être ciblé tant qu'il n'a pas agi). Gagne +20 en Discrétion."
      },
      {
        nom: "Demi-élémentaire",
        description: "Le personnage est à moitié composé d’un élément, il gagne les faiblesses et les résistances de celui-ci, tous les sorts de cet élément coûtent 1 PSY de moins à lancer et voient leurs dégâts, soins et boucliers augmentés de 2, en revanche les sortilèges venant d’autres branches coûtent 1 PSY de plus. Le personnage est très lié à la psyché, il tombe K.O si sa PSY atteint 0.\nVous avez une apparence qui ne met aucun doute sur votre affiliation élémentaire. Considéré par certaines races comme des bénédictions divines, d’autres vous craignent ou vous traquent avec insistance. Votre élément naturel n’a aucun secret pour vous et, de manière générale, vous êtes extrêmement lié aux fluctuations de psyché naturelle.",
        benediction: "Gagne les faiblesses et résistances de l'élément choisi. Les sorts de cet élément coûtent 1 PSY de moins à lancer et leurs dégâts/soins/boucliers sont augmentés de 2. Les sortilèges d'autres branches coûtent 1 PSY de plus. Tombe K.O si la PSY atteint 0. Gagne +10 en Connaissance mystique et en Perception magique."
      },
      {
        nom: "Oublié",
        description: "Le personnage est parfaitement insensible à la psyché, elle semble même totalement disparaître en sa présence. Dans un rayon de 10m autour de vous, vous imposez un désavantage pour lancer des compétences ou utiliser des armes qui consomment de la psyché. Ce désavantage s’applique également à vous-même ou à vos alliés. Quand vous parvenez à utiliser un sortilège utilisant de la PSY vous chargez la surcharge locale de la moitié de la valeur de ce sort (arrondie au supérieur). Vous ne pouvez pas utiliser la psyché naturelle hors combat pour lancer des sorts.\nVous paraissez totalement normal, pourtant, les personnes sensibles à la psyché se sentent mal à l’aise en votre présence et vous rebutez les mages et sorciers en tout genre. Vous ne pouvez pas benedictionuer de jets de perception magique, ils seront toujours considérés comme loupés, en revanche il est impossible de vous perturber magiquement, vous êtes donc immunisé à Charme, Silence, Terreur, Cécité, Folie, Chaos, Sommeil s’ils sont appliqués par magie. Vous êtes immunisé à Vidé.",
        benediction: "Dans un rayon de 10m, impose un désavantage pour lancer des compétences ou utiliser des armes consommant de la psyché (s'applique aussi aux alliés et au lanceur). Quand un sort utilisant de la PSY est lancé, charge la surcharge locale de la moitié de sa valeur (arrondi au supérieur). Ne peut pas utiliser la psyché naturelle hors combat pour lancer des sorts. Immunisé à Charme, Silence, Terreur, Cécité, Folie, Chaos, Sommeil si appliqués par magie. Immunisé à Vidé. Ne peut pas faire de jets de perception magique (toujours considérés comme loupés)."
      },
      {
        nom: "Histoire d'Artisan",
        description: "Vous avez pratiqué une forme d’artisanat dans votre passé, cela a pu être une véritable passion ou une obligation sociale de chez vous. Que vous soyez un véritable passionné ou un amateur averti vous gagnez +15 en artisanat et obtenez un avantage lorsque le jet d’artisanat concerne votre domaine. Votre domaine peut être n’importe lequel de votre choix, en voici quelques exemples : Couturier, Forge, Ébéniste, Joaillier, Cuisinier, Verrier, Tailleur de pierre…",
        benediction: "+15 en Artisanat. Avantage sur les jets d'Artisanat concernant le domaine choisi.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Artisanat:15},}
      },
      {
        nom: "Histoire de Paysan",
        description: "Vous venez d'un petit village, vous y avez eu une enfance paisible au milieu des animaux, des champs et des vertes prairies. Vous avez appris le travail rude que vous aimiez ça ou non. +10 en Robustesse et +10 dans UNE des statistiques suivantes au choix : Connaissance nature, Survie, Puissance, Athlétisme, Adresse ou Artisanat",
        benediction: "+10 en Robustesse et +10 dans UNE des statistiques suivantes au choix : Connaissance nature, Survie, Puissance, Athlétisme, Adresse ou Artisanat.",
        fonction: "bonusIndirectCaracteristique",
        parametres: {
          bonus: { mineures: { robustesse: 10 } },
          choix: {
            type: "mineures",
            stats: ["nature", "survie", "puissance", "athletisme", "adresse", "artisanat"], 
            points: 10
          }
        }
      },
      {
        nom: "Histoire de Fervent",
        description: "Vous avez suivi les préceptes divins, vous avez vécu dans un temple et mis une partie de votre vie au service d’une, ou de plusieurs divinités. Si vous avez choisi une divinité qui possède des talents mythiques vous obtenez son talent niveau 0 (mais pas les bonus statistiques) mais ne prendrez pas obligatoirement les autres par la suite.",
        benediction: "+10 en Sacrée ",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Sacrée:10},},
      },
      {
        nom: "Histoire de Bienfaiteur",
        description: "Vous avez passé votre temps à aider votre prochain, qu’importe la raison pour laquelle vous l’ayez fait, vous aidez ceux dans le besoin et, de manière générale, vous êtes (ou étiez !) quelqu’un sur qui on peut compter.",
        benediction: "+10 en Médecine et en Calme.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Medecine:10, Calme:10},}
      },
      {
        nom: "Histoire d'Aventurier",
        description: "Vous avez arpenté les routes et accompli des missions comme tout bon aventurier novice. Vous avez des bases solides et avez pu accomplir divers rôles dans un groupe.",
        benediction: "+5 dans 4 statistiques mineures de votre choix."
      },
      {
        nom: "Histoire de Marchand",
        description: "Vous avez passé du temps sur les marchés, votre œil avisé traque les bonnes affaires et votre bagout peut vous octroyer les meilleures opportunités du coin.",
        benediction: "+10 en Marchandage et en Persuader/Tromper.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {marchandage:10, persuasion:10},}
      },
      {
        nom: "Histoire de Guerrier",
        description: "Que vous ayez fait partie d’une armée, d’une milice ou d’un groupe de mercenaires, vous maîtrisez les champs de bataille et ne craignez pas l’adversité.",
        benediction: "+1 aux dégâts et +10 en Survie."
      },
      {
        nom: "Histoire de Roublard",
        description: "Vous avez navigué dans des milieux pas très clairs, vous avez appris à jouer avec les règles et non pas dedans. Vous avez ça par nécessité ou par goût.",
        benediction: "+10 en Adresse, +5 en Connaissance monde et +5 en Discrétion.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Adresse:10, Monde:5, Discrétion:5},},
      },
      {
        nom: "Histoire de Noble",
        description: "Vous venez d’une famille d’aristocrate ou de gens riches et influents. Que vos racines existent toujours ou non vous avez passé une enfance dans le luxe et le confort.",
        benediction: "+10 en Art et Musique et en Persuader/Tromper.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Artmusique:10, Persuadertromper:10},},
      },
      {
        nom: "Histoire d'Artiste",
        description: "Vous avez suivi une discipline artistique et vous êtes beaucoup entraîné, que ce soit par volonté ou par obligation vous êtes assez bon dans votre secteur. Vous gagnez +15 en Art et Musique et obtenez un avantage sur les jets de cette catégorie quand ils concernent votre domaine. Vous pouvez choisir n’importe quel domaine mais voici quelques exemples : Sculpture, Peinture, Théâtre, Musique, Poésie, Littérature…",
        benediction: "+15 en Art et Musique. Avantage sur les jets de cette catégorie concernant le domaine choisi.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Artmusique:15},}        
      },
      {
        nom: "Histoire de Mage",
        description: "Vous êtes un amateur de magie, vous avez pu pratiquer dans une académie, en solitaire ou auprès d’un mentor. Vous êtes rompu à l’utilisation et l’analyse de la psyché, que ce soit un don ou le fruit d’un long travail.",
        benediction: "+10 en Connaissance mystique et en Perception magique.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Mystique:10, Perceptionmagique:10},},
      },
      {
        nom: "Histoire de Savant",
        description: "Vous avez passé une partie de votre vie le nez dans les livres, peu importe votre sujet de prédilection vous y avez consacré un temps certain et êtes calé en la matière.",
        benediction: "+20 à répartir dans les statistiques mineures liées à l’intelligence.",
        fonction : "repartitionCaracteristiquesMineures",
        effets: { mineure: { intelligence:20 },},
      },
      {
        nom: "Histoire de Survivant",
        description: "Vous avez survécu à un cataclysme, à une guerre ou à une quelconque calamité ayant provoqué beaucoup de morts et une grande désolation. Vous avez été endurci par cette expérience et êtes devenu effroyablement difficile à abattre, mentalement ou physiquement.",
        benediction: "+20 en Survie. Avantage sur les jets pour sortir d'une situation de vie ou de mort hors combat.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Survie:20},}
      },
      {
        nom: "Histoire de Voyageur",
        description: "Vous êtes passé sur nombre de chemins, suivi palanquées de sentiers, visité flopée de villes et villages. Vous avez rencontré quantité de gens plus ou moins formidables et avez une expérience certaine si vous souhaitez un jour devenir guide touristique.",
        benediction: "+20 en Connaissance monde.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Monde:20},}
      },
      {
        nom: "Histoire de Hors-la-loi",
        description: "Vous étiez ou êtes toujours recherché dans un ou plusieurs royaumes. Qu’importe le, ou les, crime que vous ayez commis, il était grave et vous a contraint à une vie en marge de la société.",
        benediction: "+5 en Intimidation et en Discrétion. Avantage dans les statistiques mineures liées au Charisme avec les brigands, bandits ou personnes liées à la pègre.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Intimidation:5, Discretion:5},}
      },
      {
        nom: "Histoire de Naturaliste",
        description: "Vous avez pu être chasseur, bûcheron, herboriste ou simplement quelqu’un ayant grandi dans la nature sauvage. Vos compétences en milieu naturel ne sont plus à prouver et votre milieu de prédilection n’a aucun secret pour vous. Vous gagnez +10 en connaissance nature, et +5 en Survie, vous obtenez également un avantage à vos jets dans ces domaines si vous êtes dans votre milieu de prédilection. Ce milieu peut être n’importe lequel mais en voici quelques exemples : Montagne, marais, plaine, forêt, désert, marin…",
        benediction: "+10 en Connaissance nature et +5 en Survie. Avantage sur les jets de ces domaines si vous êtes dans votre milieu de prédilection.",
        fonction: "ajoutDirectCaracteristique",
        effets: { mineure: {Connaissancenature:10, Survie:5},}

      },
      {
        nom: "Histoire de Joueur",
        description: "Vous êtes un joueur invétéré, vous adorez jouer aux cartes, aux dés ou à n’importe quel jeu de hasard, vous adoriez ou aimez toujours, parier sur tout ce qui passe. +10 en Hasard. Avantage lorsque vous utilisez un jet de hasard pour résoudre une situation avec un coup de chance.",
        benediction: "+10 en Hasard. Avantage lorsque vous utilisez un jet de hasard pour résoudre une situation avec un coup de chance.",
        fonction: "bonusDirectPlusConditionnel",
        parametres: {
          bonus: {mineures: {Hasard:10}},
          caracteristique: "Hasard",
          bonusConditionnel: "Avantage",
          condition: "Utilisation d'un jet de hasard pour résoudre une situation avec un coup de chance",
          description: "+10 en Hasard. Avantage lorsque vous utilisez un jet de hasard pour résoudre une situation avec un coup de chance."
        }
      },
      {
        nom: "Histoire de Chercheur",
        description: "Vous avez passé du temps à chercher quelque chose ou quelqu’un, toute cette énergie dans la traque et la localisation de l’objet de vos désirs vous ont rendu performant pour chercher et trouver tout et n’importe quoi.",
        benediction: "+15 en Intuition et +5 dans une des statistiques mineures liées à l’intelligence.",
        fonction: "repartitionCaracteristiquesMineures",
        effets: { mineure: {Intuition:15, Intelligence:5},}
      },
      {
        nom: "Histoire d'Athlète",
        description: "Vous êtes un sportif, amateur ou professionnel, vous vous êtes longuement dédié à la pratique et à l’entraînement dans votre sport favori.",
        benediction: "+10 dans deux statistiques parmi les suivantes au choix : Acrobatie, Adresse, Puissance, Athlétisme, Robustesse."
      }
    ]
  }
};

export const talentStatistique = {
  felin: {
    nom: "Félin",
    prerequis: "Aucun",
    description: "Vous vous déplacez correctement, tout du moins vous trébuchez moins souvent.",
    fonction: "ajoutDirectCaracteristique",
    effets: { 
      majeure:{ Dextérité: 2}, 
      mineure: { Acrobatie: 10},
    }
  },
  musculature: {
    nom: "Musculature",
    prerequis: "Aucun",
    description: "Vous avez un peu moins le triceps mou que la moyenne. Ajoute 2 en Force et 10 en Athlétisme.",
    fonction: "ajoutDirectCaracteristique",
    effets: { 
      majeure: { Force: 2}, 
      mineure: { Athlétisme: 10},
    }
  },
  chanceDuDebutant: {
    nom: "Chance du Débutant",
    prerequis: "Aucun",
    description: "Vous trouvez régulièrement votre caleçon fétiche dans votre tiroir du premier coup et dans le noir! Ajoute 2 en Chance et 10 en Intuition.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Chance:2}, mineure: { Intuition:10},}
  },
  costaud: {
    nom: "Costaud",
    prerequis: "Aucun",
    description: "Vous encaissiez comme personne dans votre jeunesse quand vous vous faisiez voler votre goûter.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Constitution:2}, mineure: { Robustesse:10},}
  },
  eleveStudieux: {
    nom: "Élève Studieux",
    prerequis: "Aucun",
    description: "Vous êtes toujours le premier à faire remarquer une faute d’orthographe, les professeurs vous détestent.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure: { Intelligence: 2}, mineure: { Mondes: 5, Sacrée: 5},}
  },
  forteresse: {
    nom: "Forteresse",
    prerequis: "Aucun",
    description: "Votre peau est épaisse comme le cuir d’un cochon, l’odeur est la même. Ajoute 2 en Defense et 10 en Survie.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Defense:2}, mineure: { Survie:10},}
  },
  starlette: {
    nom: "Starlette",
    prerequis: "Aucun",
    description: "Vous êtes connu au moins jusqu’à la quatrième maison en partant de la vôtre.Ajoute 2 en Charisme et 10 en Persuader/Tromper.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Charisme:2}, mineure: { Persuasion:10},}
  },
  sensible: {
    nom: "Sensible",
    prerequis: "Aucun",
    description: "On vous tire facilement une larme, au moins quelques personnes disent de vous que vous êtes à l’écoute… Ajoute 2 en Sagesse et 10 en Médecine.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Sagesse:2}, mineure: { Medecine:10},}
  },
  visionAiguisee: {
    nom: "Vision Aiguisée",
    prerequis: "Perception ou Perception magique > 50",
    description: "Vous faites attention aux petits détails et rien ne vous échappe.Avantage sur les jets de Perception ou de Perception magique ainsi que +10 dans ces deux statistiques.",
    fonction: "bonusDirectPlusConditionnel",
    effets: {
      bonus: {mineure: { perception: 10, perceptionMagique: 10}},
      caracteristique: "Perception, Perceptionmagique",
      bonusConditionnel: "Avantage",
      condition: "Perception > 50 ou Perception magique > 50" ,
      description: "Avantage sur les jets de Perception ou de Perception magique ainsi que +10 dans ces deux statistiques."
    }
  },
  intimidateur: {
    nom: "Intimidateur",
    prerequis: "Aucun",
    description: "Vous savez convaincre les gens plus faibles que vous.",
    effets: "Ajoute votre Charisme en plus de votre Force lors d’un jet d’Intimidation.",
    fonction: "ajoutMajeureAuxMineures",
    parametres: {
        majeureSource: "charisme",
        cibleType: "specifique",
        cibleMineure: "intimidation"  
    }
  },
  manipulateur: {
    nom: "Manipulateur",
    prerequis: "Aucun",
    description: "Vous savez faire croire aux autres que votre idée brillante vient d’eux.",
    effets: "Ajoute votre Intelligence en plus de votre Charisme lors d’un jet de Persuader/Tromper.",
    fonction: "ajoutMajeureAuxMineures",
    parametres: {
        majeureSource: "intelligence",
        cibleType: "specifique",
        cibleMineure: "persuasion"  
    }
  },
  cqfd: {
    nom: "CQFD",
    prerequis: "Aucun",
    description: "Vous savez faire déballage de vos connaissances et les articuler au sein d’un raisonnement juste et sans faille.",
    effets: "Ajoute votre Sagesse en plus de votre Charisme lors d’un jet de Persuader/Tromper.",
    fonction: "ajoutMajeureAuxMineures",
    parametres: {
        majeureSource: "sagesse",
        cibleType: "specifique",
        cibleMineure: "persuasion"  
    }
  },
  fortCommeUnBoeuf: {
    nom: "Fort comme un Bœuf",
    prerequis: "Force > 15 et « Musculature » obtenu",
    description: "Vous avez des muscles sur les muscles, vous pouvez soulever des charges très lourdes jusqu’à 300 kilos.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Force:2}, mineure: { Athlétisme:10},},
  },
  neSousBonneEtoile: {
    nom: "Né sous une Bonne Étoile",
    prerequis: "Chance > 15 et « Chance du Débutant » obtenu",
    description: "Vous trouvez souvent des pièces d’or par terre, des bourses entières même, et quand vous jouez aux cartes vous avez toujours la meilleure main, les taverniers oublient de vous faire payer la note et vous n’êtes jamais attrapé par la garde quand vous taguez les murs de votre village, en bref, les gens vous détestent.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Chance:2}, mineure: { Intuition:10},}
  },
  presenceEffacee: {
    nom: "Présence Effacée",
    prerequis: "Dextérité > 15 et « Félin » obtenu",
    description: "Personne ne vous remarque jamais, quand vous faites une blague un autre la répète plus fort, quand vous êtes à une fête vous finissez seul dans un coin, et volez toutes les bourses. Ajoute 2 en Dextérité et 10 en Discrétion ou en Adresse.",
    fonction: "bonusIndirectCaracteristique",
    parametres: { 

      majeures: {
          stats: [ "Dextérité"], 
          points:2}, 
      mineures: { 
          stats: ["Discretion", "Adresse"],
          points: 10 },}
  },
  baleze: {
    nom: "Balèze",
    prerequis: "Constitution > 15 et « Costaud » obtenu",
    description: "La dernière fois qu’un type a essayé de vous tuer il est mort de vieillesse avant d’avoir pu porter le coup de grâce… Non, il est mort de déshydratation au bout de trois jours de combat mais quand même.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Constitution:2}, mineure: { Robustesse:10},}
  },
  hypersensibilitePsychique: {
    nom: "Hypersensibilité Psychique",
    prerequis: "Sagesse > 15 et « Sensible » obtenu",
    description: "Vous êtes extrêmement sensible à la magie, et au froid, et aux insultes, et aux histoires tristes, et à la douleur mais surtout à la magie.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Sagesse:2}, mineure: { Medecine:10},}
  },
  academicien: {
    nom: "Académicien",
    prerequis: "Intelligence > 15 et « Élève Studieux » obtenu",
    description: "Vous avez lu beaucoup de livres et acquis un savoir phénoménal, vous adorez par-dessus tout étaler vos connaissances quand personne ne vous le demande.",
    effets: "Double la valeur d’Intelligence lors d’un jet d’une statistique mineure liée à l’Intelligence choisie lors de l’obtention de ce talent.",
    fonction: "ajoutMajeureAuxMineures",
    parametres: {
        majeureSource: "intelligence",
        cibleType: "categorie",
        cibleCategorie: "intelligence" 
    }

  },
  starLocale: {
    nom: "Star Locale",
    prerequis: "Charisme > 15 et « Starlette » obtenu",
    description: "Vous êtes connu dans tout le groupement de communes de votre village, vous ne pouvez plus aller à la boulangerie sans vous faire harceler par au moins 2 ou 3 grands-mères gnomes.Ajoute 2 en Charisme et octroie un avantage lors des jets de statistiques mineures liées au Charisme avec les personnes de la même race ou du même alignement que vous.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Charisme:2}, mineure: { Persuasion:10},}

  },
  bastionDairain: {
    nom: "Bastion d'Airain",
    prerequis: "Défense > 15 et « Forteresse » obtenu",
    description: "Vous êtes toujours sur vos gardes et vous laissez difficilement avoir, vous avez droit à un blocage avec avantage si on vous attaque par surprise.",
    fonction: "ajoutDirectCaracteristique",
    effets: { majeure:{Defense:2}, mineure: { Survie:10},}
  },
specialiste: {
    nom: "Spécialiste",
    prerequis: "Statistique mineure > 50",
    description: "Vous maîtrisez parfaitement votre domaine, même si votre domaine c'est de faire du diabolo. Vous choisissez deux de vos statistiques mineures qui respectent le prérequis au moment de l'obtention. Lors d'un jet de statistiques dans ces domaines vous avez un avantage.",
    fonction: "bonusDirectPlusConditionnel", // **CORRECTION : Pas de points directs**
    effets: {
        bonus: {}, // **Pas de bonus direct**
        caracteristique: "variable", // **Sera défini lors de la sélection**
        bonusConditionnel: "Avantage",
        condition: "Statistique mineure > 50",
        description: "Avantage sur les jets de deux statistiques mineures choisies (doivent respecter le prérequis)."
    }
},
  toucheATout: {
    nom: "Touche à tout",
    prerequis: "Toutes les statistiques mineures > 20",
    description: "Vous savez vous débrouiller dans à peu près tous les domaines, de la charpenterie en passant par la danse et la cuisine. Vous choisissez une statistique mineure dans chaque catégorie et obtenez un avantage lors de vos lancers de dés sur chacune d’entre elles.",
    effets: "Avantage sur les jets d'une statistique mineure choisie dans chaque catégorie."
  },
  beauteDeSantis: {
    nom: "Beauté de Santis",
    prerequis: "Charisme = 25 et « Star Locale » obtenu",
    description: "Vous êtes beau, tellement d’ailleurs que vous attirez naturellement tout le monde autour de vous, un magnétisme étrange qui vous permet bien plus de facilité dans vos interactions sociales.",
    effets: "Ajoute 2 en Charisme. Une fois par jour, peut réussir un jet de Charisme ou de statistique mineure liée au Charisme alors qu'il avait été raté, OU faire une réussite critique sur une réussite simple."
  },
  pugnaciteDeKardos: {
    nom: "Pugnacité de Kardös",
    prerequis: "Constitution = 25",
    description: "Vous êtes incroyablement difficile à tuer, des centaines de cicatrices vous recouvrent sans qu’aucun de ces coups ne vous ait occis.",
    effets: "Une fois par combat, lorsque le personnage devrait tomber K.O d’une attaque, il ignore les dégâts infligés et récupère le montant ignoré en PB à la place."
  },
  veilleParScelenis: {
    nom: "Veillé par Scélenis",
    prerequis: "Chance = 25 et « Né sous une bonne étoile » obtenu",
    description: "Vous avez tellement de chance qu’on commence à croire que vous faites tout exprès et que vous êtes juste extrêmement puissant, alors qu’en fait vous avez à peine conscience de ce qu’il se passe autour de vous. Ajoute 2 en Chance. Octroie un avantage lors des jets de Hasard. Peut relancer un jet une fois par scène ou par combat.",
    fonction: "bonusDirectPlusConditionnel",
     effets: {
      bonus: {majeures: {Chance:2}},
      caracteristique: "Hasard",
      bonusConditionnel: "Avantage",
      condition: "Chance = 25" ,
      description: "Ajoute 2 en Chance. Avantage lors des jets de Hasard. Peut relancer un jet une fois par scène ou par combat."
    }
  },
  bienveillanceDarintiel: {
    nom: "Bienveillance d'Arïntiël",
    prerequis: "Sagesse = 25 et « Hypersensibilité psychique » obtenu",
    description: "Vous faites attention à tout le monde et pensez à tout, c’est grâce à vous que votre groupe se porte bien.",
    effets: "Ajoute 2 en Sagesse et octroie un avantage lors des jets de statistiques mineures liées à la Sagesse. Soigne de 4 PV fixes à chaque fois qu'un sortilège est lancé sur un allié."
  },
  rejetonDeLantepenultieme: {
    nom: "Rejeton de l’Antépénultième",
    prerequis: "Intelligence = 25 et « Académicien » obtenu",
    description: "Vous savez que vous savez tout, aucun sujet ne vous échappe et les gens sont impressionnés par l’abîme de connaissance que vous êtes, ceux qui vous détestent sont jaloux c’est sûr.",
    effets: "Ajoute 2 en Intelligence. Octroie un avantage lors de tous les jets de statistiques mineures liées à l’Intelligence. Peut parler deux langues supplémentaires."
  },
  pupilleDOroun: {
    nom: "Pupille d’Oroun",
    prerequis: "Force = 25 et « Fort comme un bœuf » obtenu",
    description: "Vous êtes d’une force démentielle, vous pouvez soulever des objets jusqu’à 1 tonne sans effort et enfoncer des remparts à l’épaule.",
    effets: "Ajoute 2 en Force. Octroie un avantage lors de tous les jets de statistiques mineures liées à la Force. Peut briser des murs très solides ou soulever des objets de plusieurs tonnes."
  },
  citadelleDeNarigForgeterre: {
    nom: "Citadelle de Narig Forgeterre",
    prerequis: "Défense = 25 et « Bastion d’airain » obtenu",
    description: "Vous ne laissez jamais rien passer, ni un coup, ni une insulte vous rendez tout au centuple et certains racontent qu’il est impossible d’effleurer votre peau même quand vous dormez.",
    effets: "Ajoute 2 en Défense. Octroie un avantage lors de tous les jets de statistiques mineures liées à la Défense. Une fois par scène ou par combat, peut annuler une occurrence de dégâts qui le cible."
  },
  ombreDeMazul: {
    nom: "Ombre de Mazul",
    prerequis: "Dextérité = 25 et « Présence effacée » obtenue",
    description: "Vous êtes rapide, agile, discret et mortel, les gens racontent que vous n’êtes en fait qu’un spectre vengeur ou l’ombre du dieu Mazul lui-même.",
    effets: "Ajoute 2 en Dextérité. Octroie un avantage lors de tous les jets de statistiques mineures liées à la Dextérité. Peut devenir invisible et indétectable même magiquement pour 1 tour en combat ou 10 minutes hors combat, une fois par jour."
  }
};

export const talentUtilitaire = {
  poingLourd: {
    nom: "Poing lourd",
    prerequis: "Force et Constitution > 10",
    description: "Vous retournez des têtes d’une seule gifle. Votre attaque à main nue inflige désormais 1d8 dégâts, si vous êtes pugiliste vous doublez la valeur du dé de dégâts des attaques à mains nues avec ce talent.",
    effets: "Les attaques à mains nues infligent 1d8 dégâts. Si pugiliste, double la valeur du dé de dégâts des attaques à mains nues."
  },
  amoureuxDesLangues: {
    nom: "Amoureux des langues",
    prerequis: "Intelligence > 8 OU Charisme > 8",
    description: "Permet de parler deux langues supplémentaires sauf ancien.",
    effets: "Parle deux langues supplémentaires (sauf l'ancien)."
  },
  scienceDesLanguesMortes: {
    nom: "Science des langues mortes",
    prerequis: "Intelligence > 15 OU Charisme > 15",
    description: "Permet de parler le langage ancien, octroie un avantage lors d'un jet de Persuader/Tromper dans une langue qui ne vous est pas maternelle.",
    effets: "Parle le langage ancien. Avantage sur les jets de Persuader/Tromper dans une langue non maternelle."
  },
  porteurDeSac: {
    nom: "Porteur de sac",
    prerequis: "Constitution > 5",
    description: "Vous obtenez 5 places d'inventaires supplémentaires.",
    effets: "Gagne 5 places d'inventaire supplémentaires."
  },
  bardator: {
    nom: "Bardator",
    prerequis: "« Porteur de sac » obtenu",
    description: "Le personnage gagne 10 places d’inventaire supplémentaire.",
    effets: "Gagne 10 places d'inventaire supplémentaires."
  },
  maitriseNovice: {
    nom: "Maîtrise novice",
    prerequis: "Joueur non mono Voie ou Arcane",
    description: "Vous gagnez deux sortilèges novices supplémentaires dans une voie ou une arcane que vous maîtrisez.",
    effets: "Gagne deux sortilèges novices supplémentaires dans une voie ou une arcane maîtrisée."
  },
  maitriseConfirme: {
    nom: "Maîtrise confirmée",
    prerequis: "Niveau du personnage > 4 et joueur non mono Voie ou Arcane",
    description: "Vous obtenez deux sortilèges confirmés supplémentaires dans la voie ou l'arcane que vous avez choisie.",
    effets: "Gagne deux sortilèges confirmés supplémentaires dans la voie ou l'arcane choisie."
  },
  maitriseExperte: {
    nom: "Maîtrise experte",
    prerequis: "Niveau du personnage > 7 et joueur non mono Voie ou Arcane",
    description: "Vous obtenez deux sorts experts supplémentaires dans la voie ou l'arcane que vous avez choisie.",
    effets: "Gagne deux sorts experts supplémentaires dans la voie ou l'arcane choisie."
  },
  sortilegesFetiches: {
    nom: "Sortilèges fétiches",
    prerequis: "Niveau du personnage = 4 et joueur mono Voie ou Arcane",
    description: "Vous pouvez choisir deux de vos sortilèges et réduire de 1 leur coût en PSY de manière permanente.",
    effets: "Choisit deux sortilèges et réduit leur coût en PSY de 1 de manière permanente."
  },
  specialisteUtilitaire: { // Renommé pour éviter le conflit avec le Talent Statistique
    nom: "Spécialiste",
    prerequis: "Niveau du personnage > 7 et joueur mono Voie ou Branche",
    description: "Lors de l’utilisation d’un sortilège de votre voie ou arcane de départ vous gagnez +2 DSB.",
    effets: "Gagne +2 DSB lors de l'utilisation d'un sortilège de sa voie ou arcane de départ."
  },
  sousLesFeuxDeLaRampe: {
    nom: "Sous les feux de la rampe",
    prerequis: "Charisme > 10",
    description: "Une fois par combat vous pouvez réussir automatiquement un jet de ciblage.",
    effets: "Une fois par combat, réussit automatiquement un jet de ciblage."
  },
  toutCeQuiBrilleVautQuelqueChose: {
    nom: "Tout ce qui brille vaut quelque chose",
    prerequis: "Charisme > 15 OU Voie = Marchand",
    description: "Vous gagnez 50% d’or en plus à la fin d’un combat ou d’une quête.",
    effets: "Gagne 50% d'or en plus à la fin d'un combat ou d'une quête."
  },
  pilleurDeCadavre: {
    nom: "Pilleur de cadavre",
    prerequis: "Dextérité OU Sagesse > 15",
    description: "Vous récupérez un équipement ou consommable supplémentaire lorsque vous recherchez de l’équipement sur des créatures mortes.",
    effets: "Récupère un équipement ou consommable supplémentaire lors de la fouille de créatures mortes."
  },
  accessoiriste: {
    nom: "Accessoiriste",
    prerequis: "Niveau de personnage > 5",
    description: "Vous pouvez équiper un deuxième accessoire.",
    effets: "Peut équiper un deuxième accessoire."
  },
  feruDeRarete: {
    nom: "Féru de rareté",
    prerequis: "Perception OU Perception magique > 60",
    description: "Vous pouvez relancer un jet d’équipement aléatoire lorsque vous fouillez du butin OU vous pouvez relancer 1 trait d’équipement sur un objet que vous venez d’acquérir via une phase de butin. Une seule fois par phase de butin.",
    effets: "Relance un jet d'équipement aléatoire lors de la fouille de butin OU relance 1 trait d'équipement sur un objet acquis via butin. Une seule fois par phase de butin."
  },
  toutNuEtSurarme: {
    nom: "Tout nu et surarmé",
    prerequis: "Niveau de personnage > 7",
    description: "Vous ne pouvez plus équiper d’armure, vous pouvez changer d’arme ou d’équipement à tout moment, vos armes possèdent +1 dégât et aux soins.",
    effets: "Ne peut plus équiper d'armure. Peut changer d'arme ou d'équipement à tout moment. Les armes ont +1 dégâts et +1 aux soins."
  },
  resistant: {
    nom: "Résistant",
    prerequis: "Niveau du personnage > 4",
    description: "Vous choisissez un élément sauf neutre, vous y devenez résistant. Une fois par combat, si une attaque de cet élément vous touche vous pouvez l’absorber et vous soignez du montant plutôt que de subir les dégâts. Ce talent peut être choisi jusqu’à 2 fois.",
    effets: "Choisit un élément (sauf neutre) et y devient résistant. Une fois par combat, si une attaque de cet élément touche, absorbe les dégâts et se soigne du même montant. Peut être pris 2 fois."
  },
  resilient: {
    nom: "Résilient",
    prerequis: "Aucun",
    description: "Vous choisissez une altération d’état sauf K.O, Mort ou Invulnérable, vous y êtes désormais immunisé. À chaque fois que cet état doit vous être appliqué, vous gagnez 2 PB à la place. Ce talent peut être choisi jusqu’à 3 fois.",
    effets: "Choisit une altération d'état (sauf K.O, Mort, Invulnérable) et y est immunisé. Gagne 2 PB à la place si l'état doit être appliqué. Peut être pris 3 fois."
  },
  cheminPredestine: {
    nom: "Chemin prédestiné",
    prerequis: "Aucun",
    description: "Vous obtenez le pouvoir d’une entité immortelle. Ce talent devient n’importe quel talent mythique d’un niveau requis strictement inférieur à celui du personnage et à l’exception de ceux du niveau 0. Ce talent peut être choisi plusieurs fois.",
    effets: "Devient un talent mythique de niveau requis strictement inférieur à celui du personnage (sauf niveau 0). Peut être pris plusieurs fois."
  },
  maitreDarme: {
    nom: "Maître d’arme",
    prerequis: "Aucun",
    description: "Vous choisissez une catégorie d’arme. Les armes de cette catégorie infligent +1 aux dégâts et aux soins et vous obtenez +5% de chances de toucher et de CC lors de leur utilisation. Ce talent peut être choisi 2 fois.",
    effets: "Les armes de la catégorie choisie infligent +1 dégâts et soins, et +5% chances de toucher et de CC. Peut être pris 2 fois."
  },
  puissanceArmee: {
    nom: "Puissance armée",
    prerequis: "Aucun",
    description: "Augmente les dégâts et soins des armes à deux mains de 2.",
    effets: "Augmente les dégâts et soins des armes à deux mains de 2."
  },
  precisionArmee: {
    nom: "Précision armée",
    prerequis: "Aucun",
    description: "Augmente les chances de toucher des armes à 1 main de 10%.",
    effets: "Augmente les chances de toucher des armes à 1 main de 10%."
  },
  ambidextre: {
    nom: "Ambidextre",
    prerequis: "Aucun",
    description: "Vous pouvez désormais équiper deux armes principales à une main, l’arme dans la main secondaire voit ses dégâts maximaux divisés par deux, uniquement les deux premiers traits positifs sont pris en compte mais toutes les imperfections le sont.",
    effets: "Peut équiper deux armes principales à une main. L'arme secondaire voit ses dégâts maximaux divisés par deux. Seuls les deux premiers traits positifs sont pris en compte pour l'arme secondaire (toutes les imperfections le sont)."
  },
  allongeImplacable: {
    nom: "Allonge implacable",
    prerequis: "Aucun",
    description: "Lorsque vous frappez avec une arme à deux mains vous pouvez reculer de 5 mètres OU faire reculer l’adversaire d’autant, cet effet se cumule avec d’éventuels autres effets de poussée.",
    effets: "Lorsque vous frappez avec une arme à deux mains, peut reculer de 5 mètres OU faire reculer l'adversaire de 5 mètres. Se cumule avec d'autres effets de poussée."
  },
  scienceDuBlocage: {
    nom: "Science du blocage",
    prerequis: "Aucun",
    description: "Lorsque vous êtes équipé d’une arme secondaire de type bouclier vous augmentez votre taux de blocage de 10%.",
    effets: "Augmente le taux de blocage de 10% lorsque équipé d'une arme secondaire de type bouclier."
  },
  utilitaireImpitoyable: {
    nom: "Utilitaire impitoyable",
    prerequis: "Aucun",
    description: "Lorsque vous êtes équipé d’une arme secondaire vous augmentez les chances de toucher de l'arme principale de 10%.",
    effets: "Augmente les chances de toucher de l'arme principale de 10% lorsque équipé d'une arme secondaire."
  },
  mainLibre: {
    nom: "Main libre",
    prerequis: "Aucun",
    description: "Lorsque vous êtes équipé d’une arme à une main et que vous n’avez rien dans l’autre main, vous pouvez utiliser des consommables une fois par tour sans qu’ils ne consomment d’action.",
    effets: "Lorsque équipé d'une arme à une main et que l'autre main est libre, peut utiliser des consommables une fois par tour sans consommer d'action."
  },
  relance: {
    nom: "Relance",
    prerequis: "Chance > 10",
    description: "Vous pouvez relancer un jet loupé une fois par scène ou par combat.",
    effets: "Peut relancer un jet loupé une fois par scène ou par combat."
  },
  relanceJaiDit: {
    nom: "RELANCE j’ai dit !!",
    prerequis: "Chance > 20",
    description: "Vous pouvez relancer un jet loupé une fois par scène ou par combat, si vous l’avez déjà relancé une fois auparavant, vous obtenez +20% de chances de CC sur la deuxième relance (y compris sur les jets de statistiques mineures).",
    effets: "Peut relancer un jet loupé une fois par scène ou par combat. Si déjà relancé, gagne +20% chances de CC sur la deuxième relance (y compris sur les jets de statistiques mineures)."
  }
};

export const talentCombat = {
  soifDeCombat: {
    nom: "Soif de combat",
    prerequis: "Constitution > 10 OU Défense > 10",
    description: "Pour chaque ennemi présent à votre corps à corps au-delà du premier vous gagnez +1 au DSB et +5% de chances de CC.",
    effets: "Gagne +1 DSB et +5% chances de CC pour chaque ennemi au corps à corps au-delà du premier."
  },
  tenebres: {
    nom: "Ténèbres",
    prerequis: "Dextérité > 10 OU Sagesse > 10",
    description: "Une fois par combat, à la fin de votre tour de jeu, vous devenez invisible et ne pouvez pas être ciblé directement jusqu’à ce que vous agissiez.",
    effets: "Une fois par combat, à la fin du tour, devient invisible et ne peut pas être ciblé directement jusqu'à agir."
  },
  reflets: {
    nom: "Reflets",
    prerequis: "Sagesse > 10",
    description: "Une fois par combat vous pouvez faire apparaître à moins de 10 mètres, une apparition de vous-même qui possède 1 PV et ne peut ni agir ni se déplacer, elle provoque tous les ennemis à moins de 15 mètres, les forçant à l’attaquer.",
    effets: "Une fois par combat, fait apparaître une apparition (1 PV, immobile, n'agit pas) dans les 10m qui provoque les ennemis dans les 15m (les force à l'attaquer)."
  },
  menacant: {
    nom: "Menaçant",
    prerequis: "Force OU Charisme > 15",
    description: "Votre présence à moins de 10 mètres d’un ennemi peut suffire à le faire douter. Chaque adversaire qui essaie un jet de touche pour la première fois du combat à portée de cet effet le fait avec désavantage, s’il échoue il garde le désavantage sur ses jets jusqu’à la réussite de l’un d’entre eux.",
    effets: "Chaque adversaire qui fait son premier jet de touche dans les 10m le fait avec désavantage. S'il échoue, le désavantage persiste jusqu'à une réussite."
  },
  moquerie: {
    nom: "Moquerie",
    prerequis: "Charisme > 15",
    description: "Lorsqu’un ennemi loupe un jet vous pouvez vous moquer de lui, cela lui imposera un désavantage sur son prochain jet, ne fonctionne qu’une fois par ennemi dans chaque combat.",
    effets: "Lorsqu'un ennemi rate un jet, peut le moquer pour lui imposer un désavantage sur son prochain jet (1 fois par ennemi par combat)."
  },
  maitreDembuscade: {
    nom: "Maître d’embuscade",
    prerequis: "Dextérité OU Défense > 10",
    description: "Vous ne pouvez pas être pris par surprise, vous agirez avant les assaillants si vous êtes pris dans une embuscade. Si vous réalisez vous-même une embuscade vous agissez en premier et avez l’avantage sur tous vos jets pendant votre premier tour de jeu.",
    effets: "Ne peut pas être pris par surprise (agit avant les assaillants). Si fait une embuscade, agit en premier et a l'avantage sur tous les jets au premier tour."
  },
  impenetrable: {
    nom: "Impénétrable",
    prerequis: "Défense > 15",
    description: "Vous démarrez chaque combat avec 6 PB.",
    effets: "Démarre chaque combat avec 6 PB."
  },
  frappeDechainee: {
    nom: "Frappe déchaînée",
    prerequis: "Force > 15",
    description: "Vous concentrez votre puissance sur une frappe. Les dégâts de votre prochaine attaque au corps à corps sont doublés, cet effet ne double que les dégâts de base de l’attaque et pas les bonus ajoutés.",
    effets: "Les dégâts de base de la prochaine attaque au corps à corps sont doublés."
  },
  departCanon: {
    nom: "Départ canon",
    prerequis: "Dextérité OU Sagesse > 15",
    description: "Permet de toujours agir en premier lors d’un combat, si vous frappez pendant le premier tour de jeu vous infligez +2 dégâts.",
    effets: "Agit toujours en premier au combat. Si frappe au premier tour, inflige +2 dégâts."
  },
  fuyardCertifie: {
    nom: "Fuyard certifié",
    prerequis: "Dextérité > 10",
    description: "Permet de fuir automatiquement un combat sans faire de jet tant que vous êtes en zone de fuite, permet aussi à vos alliés de fuir sans faire de jets lorsqu’ils sont dans la zone avec vous.",
    effets: "Peut fuir automatiquement un combat sans jet en zone de fuite. Les alliés peuvent fuir sans jet s'ils sont dans la zone avec le personnage."
  },
  glissant: {
    nom: "Glissant",
    prerequis: "Dextérité OU Défense > 10",
    description: "Le personnage ignore les attaques d’opportunité.",
    effets: "Ignore les attaques d'opportunité."
  },
  opportuniste: {
    nom: "Opportuniste",
    prerequis: "Force ou Défense > 10",
    description: "Vous gagnez +2 aux dégâts lors d’une attaque d’opportunité.",
    effets: "Gagne +2 dégâts lors d'une attaque d'opportunité."
  },
  doubleTir: {
    nom: "Double tir",
    prerequis: "1 statistique > 15",
    description: "Lors d’une attaque avec une arme à distance vous tirez un deuxième projectile qui n’inflige que le dé de dégâts de l’arme sans aucun autre bonus, les dégâts des deux tirs sont calculés comme un seul coup porté pour la défense.",
    effets: "Lors d'une attaque à distance, tire un deuxième projectile qui inflige le dé de dégâts de l'arme (sans bonus). Les dégâts des deux tirs sont calculés comme un seul coup pour la défense."
  },
  pouvoirDeLaMeute: {
    nom: "Pouvoir de la meute",
    prerequis: "Aucun",
    description: "Vous gagnez +5% de chances de toucher et de CC par allié au corps à corps de l’ennemi ciblé lors de vos attaques.",
    effets: "Gagne +5% chances de toucher et de CC par allié au corps à corps de l'ennemi ciblé lors des attaques."
  }
};

