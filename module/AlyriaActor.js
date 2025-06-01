
function getRangSorts(niveauJoueur) {
  if (niveauJoueur >= 10) return "maitre";
  if (niveauJoueur >= 7) return "expert";
  if (niveauJoueur >= 4) return "confirme";
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
    
    console.log("DEBUG race:", system.race, "voie:", system.voie);
    
    system.majeures ??= {};
    system.majeures.force ??= ((raceMajeures.force || 0) + (voieMajeures.force || 0));
    system.majeures.dexterite ??= ((raceMajeures.dexterite || 0) + (voieMajeures.dexterite || 0));
    system.majeures.constitution ??= ((raceMajeures.constitution || 0) + (voieMajeures.constitution || 0));
    system.majeures.intelligence ??= ((raceMajeures.intelligence || 0) + (voieMajeures.intelligence || 0));
    system.majeures.sagesse ??= ((raceMajeures.sagesse || 0) + (voieMajeures.sagesse || 0));
    system.majeures.charisme ??= ((raceMajeures.charisme || 0) + (voieMajeures.charisme || 0));
    system.majeures.defense ??= ((raceMajeures.defense || 0) + (voieMajeures.defense || 0));
    system.majeures.chance ??= ((raceMajeures.chance || 0) + (voieMajeures.chance || 0));

    // Mineures
    system.mineures ??= {};
    system.mineures.monde ??= ((race.mineures?.monde || 0) + (voie.mineures?.monde || 0));
    system.mineures.mystique ??= ((race.mineures?.mystique || 0) + (voie.mineures?.mystique || 0));
    system.mineures.nature ??= ((race.mineures?.nature || 0) + (voie.mineures?.nature || 0));
    system.mineures.sacré ??= ((race.mineures?.sacré || 0) + (voie.mineures?.sacré || 0));
    system.mineures.robustesse ??= ((race.mineures?.robustesse || 0) + (voie.mineures?.robustesse || 0));
    system.mineures.calme ??= ((race.mineures?.calme || 0) + (voie.mineures?.calme || 0));
    system.mineures.marchandage ??= ((race.mineures?.marchandage || 0) + (voie.mineures?.marchandage || 0));
    system.mineures.persuasion ??= ((race.mineures?.persuasion || 0) + (voie.mineures?.persuasion || 0));
    system.mineures.artmusique ??= ((race.mineures?.artmusique || 0) + (voie.mineures?.artmusique || 0));
    system.mineures.commandement ??= ((race.mineures?.commandement || 0) + (voie.mineures?.commandement || 0));
    system.mineures.acrobatie ??= ((race.mineures?.acrobatie || 0) + (voie.mineures?.acrobatie || 0));
    system.mineures.discretion ??= ((race.mineures?.discretion || 0) + (voie.mineures?.discretion || 0));
    system.mineures.adresse ??= ((race.mineures?.adresse || 0) + (voie.mineures?.adresse || 0));
    system.mineures.artisanat ??= ((race.mineures?.artisanat || 0) + (voie.mineures?.artisanat || 0));
    system.mineures.hasard ??= ((race.mineures?.hasard || 0) + (voie.mineures?.hasard || 0));
    system.mineures.athlétisme ??= ((race.mineures?.athlétisme || 0) + (voie.mineures?.athlétisme || 0));
    system.mineures.puissance ??= ((race.mineures?.puissance || 0) + (voie.mineures?.puissance || 0));
    system.mineures.intimidation ??= ((race.mineures?.intimidation || 0) + (voie.mineures?.intimidation || 0));
    system.mineures.perception ??= ((race.mineures?.perception || 0) + (voie.mineures?.perception || 0));
    system.mineures.perceptionmagique ??= ((race.mineures?.perceptionmagique || 0) + (voie.mineures?.perceptionmagique || 0));
    system.mineures.medecine ??= ((race.mineures?.medecine || 0) + (voie.mineures?.medecine || 0));
    system.mineures.intuition ??= ((race.mineures?.intuition || 0) + (voie.mineures?.intuition || 0));

     
    const getBonusPourcentage = (statValue) => {
        let totalToucheBonus = 0;
        if (statValue > 0) { 
            const phase1Points = Math.min(statValue, 10);
            totalToucheBonus += phase1Points * 5;}
        if (statValue > 10) {
            const phase2Points = Math.min(statValue - 10, 5); // Max 5 points dans cette phase (11 à 15)
            totalToucheBonus += phase2Points * 3;}
        if (statValue > 15) {
            const phase3Points = Math.min(statValue - 15, 5); // Max 5 points dans cette phase (16 à 20)
            totalToucheBonus += phase3Points * 2;}
        if (statValue > 20) {
            const phase4Points = Math.min(statValue - 20, 10); // Max 10 points dans cette phase (21 à 30)
            totalToucheBonus += phase4Points * 1;}

        return totalToucheBonus; // Retourne le pourcentage total (ex: 75 pour 75%)
    };

    function getChanceBlocage(defenseValue) {
    let totalBlockChance = 0;

          if (defenseValue === 0) {
              totalBlockChance = 0;
          }
          else if (defenseValue >= 1 && defenseValue <= 10) {
              totalBlockChance = defenseValue * 4;
          }
          else if (defenseValue >= 11 && defenseValue <= 15) {
              totalBlockChance = (10 * 4) + ((defenseValue - 10) * 3); // 40% pour les 10 premiers points
          }
          else if (defenseValue >= 16 && defenseValue <= 20) {
              totalBlockChance = (10 * 4) + (5 * 3) + ((defenseValue - 15) * 2); // 40% + 15% pour les points 11-15
          }
          else if (defenseValue > 20) {
              totalBlockChance = (10 * 4) + (5 * 3) + (5 * 2) + ((defenseValue - 20) * 1); // 40% + 15% + 10% pour les points 16-20
          }
          return totalBlockChance;
      };

      function getBonusChanceCritique(chanceValue) {
          let totalCritChance = 0;

          if (chanceValue === 0) {
              totalCritChance = 5;
          }
          else if (chanceValue >= 1 && chanceValue <= 18) {
              totalCritChance = 5 + (chanceValue * 2); 
          }
          else if (chanceValue >= 19 && chanceValue <= 30) {
              totalCritChance = 5 + (18 * 2) + ((chanceValue - 18) * 1);
          }
          else if (chanceValue > 30) {
              totalCritChance = 5 + (18 * 2) + (12 * 1); 
            }

        return totalCritChance;
      };

    system.rang = getRangSorts(system.niveauJoueur)
    
    system.toucheForce = getBonusPourcentage(system.majeures.force);
    system.toucheDexterite = getBonusPourcentage(system.majeures.dexterite);
    system.toucheCharisme = getBonusPourcentage(system.majeures.charisme);
    system.toucheSagesse = getBonusPourcentage(system.majeures.sagesse);
    system.toucheChance = getBonusChanceCritique(system.majeures.chance);
    system.toucheDefense = getChanceBlocage(system.majeures.defense);
    


    system.caracteristiquesMajeuresAffichees = [
    {
        id: "constitution",
        label: "Constitution",
        valeurBrute: system.majeures.constitution,
        valeurTouche: null // Constitution n'a pas de touche directe dans votre exemple
    },
    {
        id: "intelligence",
        label: "Intelligence",
        valeurBrute: system.majeures.intelligence,
        valeurTouche: null // Intelligence n'a pas de touche directe dans votre exemple
    },
      {
        id: "force",
        label: "Force",
        valeurBrute: system.majeures.force,
        valeurTouche: system.toucheForce
    },
    {
        id: "dexterite",
        label: "Dextérité",
        valeurBrute: system.majeures.dexterite,
        valeurTouche: system.toucheDexterite
    },
        {
        id: "sagesse",
        label: "Sagesse",
        valeurBrute: system.majeures.sagesse,
        valeurTouche: system.toucheSagesse
    },
    {
        id: "charisme",
        label: "Charisme",
        valeurBrute: system.majeures.charisme,
        valeurTouche: system.toucheCharisme
    },
    {
        id: "defense",
        label: "Défense",
        valeurBrute: system.majeures.defense,
        valeurTouche: system.toucheDefense
    },
    {
        id: "chance",
        label: "Chance",
        valeurBrute: system.majeures.chance,
        valeurTouche: system.toucheChance
    }
];


  const niveau = system.niveauJoueur || 1;
    system.sortsDisponibles = getSortsDisponibles(voie, niveau);
    system.nbSortsAChoisir = 4;
    system.sortsChoisis ??= [];
    
    
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