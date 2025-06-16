import { AlyriaRaces } from "./data/AlyriaRace.js";
import { AlyriaVoies } from "./data/AlyriaVoies.js";
import { AlyriaArcane } from "./data/AlyriaArcanes.js";
import { talentStatistique } from "./data/talents.js";
import { talentUtilitaire } from "./data/talents.js";
import { talentCombat } from "./data/talents.js";
import { talentCreation } from "./data/talents.js";


  function getRangSorts(niveauJoueur) {
    if (niveauJoueur >= 10) return "maitre";
    if (niveauJoueur >= 7) return "expert";
    if (niveauJoueur >= 4) return "confirme";
    return "novice";
  }

function getSortsDisponibles(voie, niveauJoueur) {
  const rang = getRangSorts(niveauJoueur);
  return voie?.sorts?.[rang] || [];
}

export default class AlyriaActor extends Actor {
  prepareData() {
    super.prepareData();
    const system = this.system;

    // CORRECTION : Récupérer la voie depuis system.voiesArcane
    const race = AlyriaRaces[system.race] || {};
    
    // Récupérer la première voie/arcane
    const voiesArcane = system.voiesArcane || {};
    let voie = {};
    let arcane = {};
    
    if (voiesArcane.type1 === "voie" && voiesArcane.key1) {
      voie = AlyriaVoies[voiesArcane.key1] || {};
    } else if (voiesArcane.type1 === "arcane" && voiesArcane.key1) {
      arcane = AlyriaArcane[voiesArcane.key1] || {};
      // Si c'est une arcane, utilisez ses stats comme "voie" pour les calculs
      voie = arcane;
    }
    
    // Récupérer la seconde voie/arcane si elle existe
    let secondeVoie = {};
    if (voiesArcane.type2 === "voie" && voiesArcane.key2) {
      secondeVoie = AlyriaVoies[voiesArcane.key2] || {};
    } else if (voiesArcane.type2 === "arcane" && voiesArcane.key2) {
      secondeVoie = AlyriaArcane[voiesArcane.key2] || {};
    }
    
    // Récupère les majeures et mineures de la race et des voies
    const raceMajeures = race.majeures || {};
    const voieMajeures = voie.majeures || {};
    const secondeVoieMajeures = secondeVoie.majeures || {};
    
    const raceMineures = race.mineures || {};
    const voieMineures = voie.mineures || {};
    const secondeVoieMineures = secondeVoie.mineures || {};
    
    
    // Initialise les objets si non définis (important pour les nouveaux acteurs)
    system.majeures ??= {};
    system.mineures ??= {};
    system.pointsDeVie ??= { actuels: 0, max: 0 };
    system.pointsPsyque ??= { actuels: 0, max: 0 };
    system.niveauJoueur ??= 1; // Assure que niveauJoueur est toujours défini

    const attributsMajeurs = [
                "force", "dexterite", "constitution",
                "intelligence", "sagesse", "charisme",
                "defense", "chance"];

        const attributsMineurs = [
                "monde", "mystique", "nature", "sacré", "robustesse", "calme",
                "marchandage", "persuasion", "artmusique", "commandement", "acrobatie",
                "discretion", "adresse", "artisanat", "hasard", "athlétisme",
                "puissance", "intimidation", "perception", "perceptionmagique", "medecine",
                "intuition"
            ];

        // Assure que chaque attribut majeur est un objet avant de définir des propriétés dessus
        attributsMajeurs.forEach(attribut => {
            system.majeures[attribut] ??= {
                creation: 0,
                repartition: 0,
                equipement: 0,
                talents: 0,
                bonus: 0,
                totale: 0
            };
            
            // CORRECTION : Additionner race + première voie + seconde voie
            system.majeures[attribut].creation = (raceMajeures[attribut] || 0) + 
                                                 (voieMajeures[attribut] || 0) + 
                                                 (secondeVoieMajeures[attribut] || 0);
            
            system.majeures[attribut].totale = (
                (system.majeures[attribut].creation || 0) +
                (system.majeures[attribut].talents || 0) +
                (system.majeures[attribut].equipement || 0) +
                (system.majeures[attribut].repartition || 0) +
                (system.majeures[attribut].bonus || 0)
            );
        });
    
        // Même chose pour les mineures
        attributsMineurs.forEach(attribut => {
            system.mineures[attribut] ??= {
                creation: 0,
                repartition: 0,
                equipement: 0,
                talents: 0,
                bonus: 0,
                totale: 0
            };
            
            // CORRECTION : Additionner race + première voie + seconde voie
            system.mineures[attribut].creation = (raceMineures[attribut] || 0) + 
                                                 (voieMineures[attribut] || 0) + 
                                                 (secondeVoieMineures[attribut] || 0);
            
            system.mineures[attribut].totale = (
                (system.mineures[attribut].creation || 0) +
                (system.mineures[attribut].talents || 0) +
                (system.mineures[attribut].equipement || 0) +
                (system.mineures[attribut].repartition || 0) +
                (system.mineures[attribut].bonus || 0)
            );
        });

        // Supprime l'objet 'creation' s'il existe (il n'est plus nécessaire dans cette structure)
        if (system.creation) {
            delete system.creation; 
        }
        
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
                  totalBlockChance = 0;}
              else if (defenseValue >= 1 && defenseValue <= 10) {
                  totalBlockChance = defenseValue * 4;}
              else if (defenseValue >= 11 && defenseValue <= 15) {
                  totalBlockChance = (10 * 4) + ((defenseValue - 10) * 3);}
              else if (defenseValue >= 16 && defenseValue <= 20) {
                  totalBlockChance = (10 * 4) + (5 * 3) + ((defenseValue - 15) * 2);}
              else if (defenseValue > 20) {
                  totalBlockChance = (10 * 4) + (5 * 3) + (5 * 2) + ((defenseValue - 20) * 1);}
              return totalBlockChance;
          };

          function getBonusChanceCritique(chanceValue) {
              let totalCritChance = 0;

              if (chanceValue === 0) {
                  totalCritChance = 5;}
              else if (chanceValue >= 1 && chanceValue <= 18) {
                  totalCritChance = 5 + (chanceValue * 2);}
              else if (chanceValue >= 19 && chanceValue <= 30) {
                  totalCritChance = 5 + (18 * 2) + ((chanceValue - 18) * 1);}
              else if (chanceValue > 30) {
                  totalCritChance = 5 + (18 * 2) + (12 * 1);}

            return totalCritChance;
          };

        system.rang = getRangSorts(system.niveauJoueur)
        
        // Mise à jour des touches pour utiliser la propriété .totale des majeures
        system.toucheForce = getBonusPourcentage(system.majeures.force.totale);
        system.toucheDexterite = getBonusPourcentage(system.majeures.dexterite.totale);
        system.toucheCharisme = getBonusPourcentage(system.majeures.charisme.totale);
        system.toucheSagesse = getBonusPourcentage(system.majeures.sagesse.totale);
        system.toucheChance = getBonusChanceCritique(system.majeures.chance.totale);
        system.toucheDefense = getChanceBlocage(system.majeures.defense.totale);
        

        // Cette partie est utilisée pour itérer dans le HTML pour afficher les caractéristiques majeures
        // Mise à jour pour utiliser la propriété .totale des majeures
        system.caracteristiquesMajeuresAffichees = [
            { id: "constitution", label: "Constitution", valeurBrute: system.majeures.constitution.totale, valeurTouche: null },
            { id: "intelligence", label: "Intelligence", valeurBrute: system.majeures.intelligence.totale, valeurTouche: null },
            { id: "force", label: "Force", valeurBrute: system.majeures.force.totale, valeurTouche: system.toucheForce },
            { id: "dexterite", label: "Dextérité", valeurBrute: system.majeures.dexterite.totale, valeurTouche: system.toucheDexterite },
            { id: "sagesse", label: "Sagesse", valeurBrute: system.majeures.sagesse.totale, valeurTouche: system.toucheSagesse },
            { id: "charisme", label: "Charisme", valeurBrute: system.majeures.charisme.totale, valeurTouche: system.toucheCharisme },
            { id: "defense", label: "Défense", valeurBrute: system.majeures.defense.totale, valeurTouche: system.toucheDefense },
            { id: "chance", label: "Chance", valeurBrute: system.majeures.chance.totale, valeurTouche: system.toucheChance }
        ];


      const niveau = system.niveauJoueur || 1;
        system.sortsDisponibles = getSortsDisponibles(voie, niveau);
        system.nbSortsAChoisir = 4;
        system.sortsChoisis ??= [];
        
        
    // --- Initialisation des points de vie et de psy ---
        // DOIT être fait avant les appels à _calculateHPMax et _calculatePsyMax
        system.pointsDeVie = system.pointsDeVie || { actuels: 0, max: 0 };
        system.pointsPsyque = system.pointsPsyque || { actuels: 0, max: 0 };

        // --- Calcul des Points de Vie et de Psy Maximum ---
        // Utilise les caractéristiques majeures DÉRIVÉES et le niveau
        // Mise à jour pour utiliser la propriété .totale des majeures
        system.pointsDeVie.max = this._calculateHPMax(system);
        system.pointsPsyque.max = this._calculatePsyMax(system);

        // Assurer que les valeurs actuelles ne dépassent pas le maximum et initialiser pour les nouveaux acteurs
        if (system.pointsDeVie.actuels === 0 && system.pointsDeVie.max > 0) {
            system.pointsDeVie.actuels = system.pointsDeVie.max;
        } else if (system.pointsDeVie.actuels > system.pointsDeVie.max) {
            system.pointsDeVie.actuels = system.pointsDeVie.max;
        } else if (system.pointsDeVie.actuels < 0) { // S'assurer que les PV ne sont pas négatifs
            system.pointsDeVie.actuels = 0;
        }

        if (system.pointsPsyque.actuels === 0 && system.pointsPsyque.max > 0) {
            system.pointsPsyque.actuels = system.pointsPsyque.max;
        } else if (system.pointsPsyque.actuels > system.pointsPsyque.max) {
            system.pointsPsyque.actuels = system.pointsPsyque.max;
        } else if (system.pointsPsyque.actuels < 0) { // S'assurer que les Psy ne sont pas négatifs
            system.pointsPsyque.actuels = 0;
        }


        // --- Calcul des pourcentages pour les jauges ---
        system.hpPercentage = 0;
        if (system.pointsDeVie.max > 0) {
            system.hpPercentage = (system.pointsDeVie.actuels / system.pointsDeVie.max) * 100;
        }
        system.hpPercentage = Math.max(0, Math.min(100, system.hpPercentage)); // Clamper entre 0 et 100

        system.psyPercentage = 0;
        if (system.pointsPsyque.max > 0) {
            system.psyPercentage = (system.pointsPsyque.actuels / system.pointsPsyque.max) * 100;
        }
        system.psyPercentage = Math.max(0, Math.min(100, system.psyPercentage)); // Clamper entre 0 et 100

       
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


    // Ajoute selectedVoie au contexte system pour le template
    // On suppose que les talents de la voie sont dans voie.talents (adapte si besoin)
   this.selectedVoie = {
        nom: voie.nom,
        description: voie.description,
        talents: voie.talents || []
    };
  }

  _calculateHPMax(actorSystemData) { 
          // Utilisez les caractéristiques DÉRIVÉES (system.majeures) pour les calculs
          const baseHp = 10; 
          const hpPerLevel = 4;
          const hpPerCon = 2; 

          const niveau = actorSystemData.niveauJoueur || 1; 
          const constitution = actorSystemData.majeures.constitution.totale || 0; // Utilise .totale ici

          let calculatedMaxHp = baseHp + ((niveau * hpPerLevel)-4) ;
            if (constitution > 0) {
              calculatedMaxHp += constitution * hpPerCon;} 
            else if (constitution < 0) {
              calculatedMaxHp += constitution * 1;}

          return Math.max(1, calculatedMaxHp); 
          }

        _calculatePsyMax(actorSystemData) {
            const basePsy = 10; 
            const psyPerLevel = 2;
            const psyPerInt = 1; 

            const niveau = actorSystemData.niveauJoueur || 1;
            const intelligence = actorSystemData.majeures.intelligence.totale || 0; // Utilise .totale ici

            let calculatedMaxPsy = basePsy + (niveau * psyPerLevel) + (intelligence * psyPerInt);
              
            return Math.max(0, calculatedMaxPsy);
        }

}