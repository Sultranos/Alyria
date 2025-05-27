export default class AlyriaActor extends Actor {
  prepareData() {
    super.prepareData();
    const system = this.system;

    // Majeures
    system.Force ??= 0;
    system.Dexterite ??= 0;
    system.Constitution ??= 0;
    system.Intelligence ??= 0;
    system.Sagesse ??= 0;
    system.Charisme ??= 0;
    system.Defense ??= 0;
    system.Chance ??= 0;

    // Mineures
    system.mineurs ??= {
      "connaissance monde": 0,
      "connaissance mystique": 0,
      "connaissance nature": 0,
      "connaissance sacré": 0,
      "robustesse": 0,
      "calme": 0,
      "marchandage": 0,
      "persuasion": 0,
      "art et musique": 0,
      "commandement": 0,
      "acrobatie": 0,
      "discretion": 0,
      "adresse": 0,
      "artisanat": 0,
      "hasard": 0,
      "athlétisme": 0,
      "puissance": 0,
      "intimidation": 0,
      "perception": 0,
      "perception magique": 0,
      "medecine": 0,
      "intuition": 0
    };

    
    system.PointsVie ??= 0;
    system.PointsPsy ??= 0;
    system.pointsDeVie ??= { actuels: 0, max: 0 };
    system.pointsPsyque ??= { actuels: 0, max: 0 };

    // Autres propriétés utiles selon ton template
    system.talentsVoie ??= [];
    system.talents ??= [];
    system.talentRace ??= "";
    system.mecaniques ??= [];
    system.inventaire ??= {
      armes: "",
      armures: "",
      objets: [],
      accessoires: [],
      consommables: []
    };
    system.sortileges ??= [];
    system.sortilegeRace ??= "";
    system.dsb ??= "";
    system.race ??= "";
    system.voie ??= "";
    system.magie ??= "";
    system.description ??= "";
  }
}