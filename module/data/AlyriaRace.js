export const AlyriaRaces = {
  hautElfe: {
    nom: "Haut-Elfes",
    description: [
      "Race la plus grande d’Alyria, ils mesurent en moyenne 2m00 pour les hommes et 2m20 pour les femmes, possédant un physique très fins et élancé, de grands yeux aux larges pupilles et une peau de couleur ambré voire doré pour certains ils ont aussi évidemment les oreilles pointues caractéristiques des elfes. Leur longévité est sans pareille et ils vivent en moyenne 250 ans, certains atteignent presque les  400 ans.",
      "Assez fragiles physiquement et supportant mal les chocs et les coups directs ils privilégient la magie et la distance en combat, il faut noter en revanche qu’ils sont très résistants aux maladies et supporte presque aussi bien les pathologies que les Hommes-Lézards.",
      "Vivant principalement sur leur île suite à la chute de leur immense empire à la fin de la deuxième ère, on en trouve parfois dans les royaumes occidentaux mais rarement ailleurs, il faut dire qu’il s’agit d’une race plutôt très fermée aux étrangers et qui n’apprécie pas particulièrement le voyage ou la mixité culturelle. Ils sont très attachés à leur culture et à leurs traditions, ce qui les rend parfois difficiles à approcher.",
      "Les Haut-Elfes sont réputés orgueilleux, fiers, ambitieux et hautains, ces traits de caractères n’étant évidemment pas des généralités pour tous, on retrouve quand même cet état d’esprit chez beaucoup d’elfe particulièrement chez ceux qui sont resté sur l’île depuis toujours. Ils vivent en essayant à tout prix de laisser leur empreinte sur le monde, que les gens se souviennent d’eux, en cela ils sont des experts dans beaucoup de domaine et s’investissent énormément dans ce qu’ils font mais ils ont tendance à se sentir rapidement supérieur à ceux qui ne fournissent pas autant d’efforts qu’eux.",
      "Vu par les autres races comme les principaux responsables de l’immense guerre de la seconde ère, ils sont assez peu appréciés à cause de leur côté hautains et ambitieux mais ils sont tout de même très respectés particulièrement dans les domaines magiques où ils excellent presque partout."
    ],
    talentRace: {
      nom: "Supériorité intellectuelle",
      effect:
        "Lors d’un jet de Persuader/Tromper contre une race non-elfique vous ajouter votre valeur de SAGESSE ou INTELLIGENCE à votre statistique."
    },
    competenceRace: {
      nom: "Canon de verre",
      effect:
        "Vous pouvez augmenter une compétence  de la valeur de votre bonus DSB ou une attaque à l'arme de 2 fois le DSB. En contrepartie, lors du prochain coup reçu vous subirez un montant de dégâts supplémentaires égal à ceux que vous avez augmentés. Ne consomme pas d’action, utilisable une fois par combat ou scène.passage à 1 fois par combat ou par scène. Le boost concerne le DSB appliqué à la prochaine attaque = doublement du DSB + contrecoup en prenant le montant augmenté dans la tronche au prochain coup reçu..​"
    },
    majeures: {
      force: 0,
      dextérité: 2,
      constitution: -2,
      intelligence: 5,
      sagesse: 2,
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
      effect:
        "Ajoute +10 dans les statistiques mineures basées sur la sagesse et la dextérité si vous êtes dans un milieu forestier ou arboré."
    },
    competenceRace: {
      nom: "Précision naturelle (Réussite automatique)",
      effect:
        "Vous gagnez +10 mètres de portée et +10% de chances de réussir la prochaine attaque à distance et+10% de Critique. Ne consomme pas d’action, non cumulable. Utilisable une fois par combat ou scène."
    },
    majeures: {
      force: 3,
      dextérité: 5,
      constitution: 0,
      intelligence: 2,
      sagesse: 2,
      charisme: -2,
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
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 3,
      dextérité: 2,
      constitution: 0,
      intelligence: 2,
      sagesse: 3,
      charisme: -2,
      defense: 2,
      chance: 0
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  nomades: {
    nom : "Les Nomades",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 2,
      dextérité: 0,
      constitution: 3,
      intelligence: -2,
      sagesse: 0,
      charisme: 5,
      defense: 0,
      chance: 2
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  orientaux: {
    nom: "Les Humains Orientaux",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 3,
      dextérité: 0,
      constitution: -2,
      intelligence: 2,
      sagesse: 3,
      charisme: 0,
      defense: 4,
      chance: 0
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  continentaux: {
    nom: "Les Humains Continentaux",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 1,
      dextérité: 1,
      constitution: 2,
      intelligence: 1,
      sagesse: 1,
      charisme: 2,
      defense: 1,
      chance: 1
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  gobelins: {
    nom: "Les Gobelins",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: -2,
      dextérité: 8,
      constitution: 2,
      intelligence: 0,
      sagesse: -2,
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  gnomes: {
    nom: "Les Gnômes",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 0,
      dextérité: 2,
      constitution: 0,
      intelligence: 6,
      sagesse: 0,
      charisme: 0,
      defense: -2,
      chance: 4
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  nainponnais: {
    nom: "Les Nainponnais",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 4,
      dextérité: 0,
      constitution: 0,
      intelligence: 2,
      sagesse: 4,
      charisme: 0,
      defense: -4,
      chance: 2
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  nain: {
    nom: "Les Nains des Montagnes",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 2,
      dextérité: -2,
      constitution: 2,
      intelligence: 0,
      sagesse: 0,
      charisme: 0,
      defense: 5,
      chance: 0
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  skaven: {
    nom: "Les Skaven",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 0,
      dextérité: 10,
      constitution: 5,
      intelligence: 0,
      sagesse: 2,
      charisme: -2,
      defense: 0,
      chance: 2
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  fushir: {
    nom: "Les Fushirs",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 3,
      dextérité: 2,
      constitution: -2,
      intelligence: 0,
      sagesse: 1,
      charisme: 8,
      defense: 0,
      chance: 2
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  sysalsis: {
    nom: "Les Sizalsis",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 4,
      dextérité: 3,
      constitution: 0,
      intelligence: 0,
      sagesse: -1,
      charisme: 0,
      defense: 2,
      chance: 0
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  orcs: {
    nom: "Les Orcs",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 6,
      dextérité: -1,
      constitution: 3,
      intelligence: -2,
      sagesse: 2,
      charisme: 2,
      defense: 1,
      chance: 0
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  },

  borealien: {
    nom:  "Les Boréaliens",
    description: [],
    talentRace: {
      nom: "",
      effect: ""
    },
    competenceRace: {
      nom: "",
      effect: ""
    },
    majeures: {
      force: 7,
      dextérité: 0,
      constitution: 2,
      intelligence: -2,
      sagesse: 2,
      charisme: 2,
      defense: 1,
      chance: 0
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
      acrobatie: 0,
      discretion: 0,
      adresse: 0,
      artisanat: 0,
      hasard: 0,
      athlétisme: 0,
      puissance: 0,
      intimidation: 0,
      perception: 0,
      perceptionmagique: 0,
      medecine: 0,
      intuition: 0
    }
  }
};