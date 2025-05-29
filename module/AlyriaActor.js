
function getRangSorts(niveau) {
  if (niveau >= 10) return "maitre";
  if (niveau >= 7) return "expert";
  if (niveau >= 4) return "confirme";
  return "novice";
}

function getSortsDisponibles(voie, niveau) {
  const rang = getRangSorts(niveau);
  return voie?.sorts?.[rang] || [];
}

import { AlyriaRaces } from "./data/AlyriaRace.js";
import { AlyriaVoies } from "./data/AlyriaVoies.js";

export default class AlyriaActor extends Actor {
  prepareData() {
    super.prepareData();
    const system = this.system;
    const race = AlyriaRaces[system.race] || {};
    const voie = AlyriaVoies[system.voie] || {};
    const raceMajeures = race.majeures || {};
    const voieMajeures = voie.majeures || {};

    system.force ??= ((raceMajeures.force || 0) + (voieMajeures.force || 0));
    system.dexterite ??= ((raceMajeures.dexterite || 0) + (voieMajeures.dexterite || 0));
    system.constitution ??= ((raceMajeures.constitution || 0) + (voieMajeures.constitution || 0));
    system.intelligence ??= ((raceMajeures.intelligence || 0) + (voieMajeures.intelligence || 0));
    system.sagesse ??= ((raceMajeures.sagesse || 0) + (voieMajeures.sagesse || 0));
    system.charisme ??= ((raceMajeures.charisme || 0) + (voieMajeures.charisme || 0));
    system.defense ??= ((raceMajeures.defense || 0) + (voieMajeures.defense || 0));
    system.chance ??= ((raceMajeures.chance || 0) + (voieMajeures.chance || 0));

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

    system.toucheForce ??= 0;
    system.toucheDexterite ??= 0;
    system.toucheCharisme ??= 0;
    system.toucheSagesse ??= 0;

  const niveau = system.niveau || 1;
    system.sortsDisponibles = getSortsDisponibles(voie, niveau);
    system.nbSortsAChoisir = 4;
    system.sortsChoisis ??= [];
    
    system.pointsDeVie ??= 0;
    system.PointsPsy ??= 0;
    system.pointsDeVie ??= { actuels: 0, max: 0 };
    system.pointsPsy ??= { actuels: 0, max: 0 };

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
  
  const talents = system.talentsVoie || [];
  const autresVoies = {
      "choixSortNoviceSamourai": "samourai",
      "choixSortNovicePaladin": "paladin",
      "choixSortNovicePugiliste": "pugiliste",
      "choixSortNoviceRoublard": "roublard"
    };

    for (const talent of talents) {
      const autreVoieKey = autresVoies[talent.effet];
      if (autreVoieKey) {
        const autreVoie = AlyriaVoies[autreVoieKey];
        if (autreVoie && autreVoie.sortVoie && autreVoie.sortVoie.sortNovice) {
          // Ajoute les sorts novices de l'autre voie à la liste des sorts disponibles
          system.sortsDisponibles = [
            ...system.sortsDisponibles,
            ...autreVoie.sortVoie.sortNovice.map(s => ({
              ...s,
              voie: autreVoieKey // pour info
            }))
          ];
        }
      }
    }
  }
}