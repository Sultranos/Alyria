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
    system.notes ??= [];
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
    system.bonusDegats ??= 0; // Assure que bonusDegats est toujours défini
    system.armure ??= 0; // Assure que armure est toujours défini
    system.bouclier ??= 0; // Assure que bouclier est toujours défini
    system.vitesse ??= 2; // Assure que vitesse est toujours définie

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
                                                 (voieMajeures[attribut] || 0) ;
            
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
    // **ÉTAPE 1 : Calculer la valeur de la stat majeure associée**
    let majeureAssociee = 0;
    
    // Défense
    if (["robustesse", "calme"].includes(attribut)) {
        majeureAssociee = system.majeures.defense.totale || 0;
    }
    // Charisme
    else if (["marchandage", "persuasion", "artmusique", "commandement"].includes(attribut)) {
        majeureAssociee = system.majeures.charisme.totale || 0;
    }
    // Dextérité
    else if (["acrobatie", "discretion", "adresse"].includes(attribut)) {
        majeureAssociee = system.majeures.dexterite.totale || 0;
    }
    // Force
    else if (["puissance", "intimidation", "athlétisme"].includes(attribut)) {
        majeureAssociee = system.majeures.force.totale || 0;
    }
    // Sagesse
    else if (["perception", "perceptionmagique", "medecine"].includes(attribut)) {
        majeureAssociee = system.majeures.sagesse.totale || 0;
    }
    // Chance
    else if (["intuition", "hasard"].includes(attribut)) {
        majeureAssociee = system.majeures.chance.totale || 0;
    }
    // Intelligence
    else if (["artisanat", "monde", "mystique", "nature", "sacré"].includes(attribut)) {
        majeureAssociee = system.majeures.intelligence.totale || 0;
    }

    
   // **ÉTAPE 2 : Initialiser l'objet mineure si nécessaire**
system.mineures[attribut] ??= {
    creation: 0,
    repartition: 0,
    equipement: 0,
    talents: 0,
    bonus: 0,
    majeureAssocie: 0,
    totale: 0
};

// **ÉTAPE 3 : Assigner les valeurs APRÈS l'initialisation**
system.mineures[attribut].creation = (raceMineures[attribut] || 0) + (voieMineures[attribut] || 0);
system.mineures[attribut].majeureAssocie = majeureAssociee;

system.mineures[attribut].totale = (
    (system.mineures[attribut].creation || 0) +
    (system.mineures[attribut].majeureAssocie || 0) +
    (system.mineures[attribut].talents || 0) +
    (system.mineures[attribut].equipement || 0) +
    (system.mineures[attribut].repartition || 0) +
    (system.mineures[attribut].bonus || 0)
);
});

// Supprime l'objet 'creation' s'il existe
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
        system.sortsChoisis ??= [];
        system.nbSortsAChoisir ??= 0;
        
        
    // --- Initialisation des points de vie et de psy ---
        // DOIT être fait avant les appels à _calculateHPMax et _calculatePsyMax
        system.pointsDeVie = system.pointsDeVie || { actuels: 0, max: 0 };
        system.pointsPsyque = system.pointsPsyque || { actuels: 0, max: 0 };
        system.dsb = this._calculateDSB(system);
        system.armure = this._calculateArmure(system);
        system.hasAccessoiristeTalent = this._hasTalent("Accessoiriste");
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
        system.bonusArmureTemporaire ??= 0;
        system.bonusArmureTalents ??= 0;
      
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
    
    // **NOUVEAU : Application des traits d'équipement AVANT le plafond**
    this._applyEquipmentTraits(system);
    
    // **PUIS recalculer les valeurs dérivées APRÈS l'application des traits**
    this.recalculateDerivedStats(system);
    
    // **IMPORTANT : Appliquer le plafond À LA FIN, quand tout est initialisé**
    if (this._shouldApplyStatCaps()) {
        this._applyMinorStatCaps();
    }
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

        // **CORRECTION COMPLÈTE : Calcul du DSB**
 _calculateDSB(actorSystemData) {
            let totalDSB = 0;
            
            // **Statistiques majeures : paliers de 6 points**
            const statsMajeures = ['force', 'dexterite', 'sagesse', 'intelligence', 'charisme'];
            
            statsMajeures.forEach(stat => {
                const valeur = actorSystemData.majeures[stat]?.totale || 0;
                const dsbFromStat = Math.floor(valeur / 6);
                totalDSB += dsbFromStat;
                

            });
            
            // **Chance : paliers de 4 points**
            const chanceValue = actorSystemData.majeures.chance?.totale || 0;
            const dsbFromChance = Math.floor(chanceValue / 4);
            totalDSB += dsbFromChance;
            

            
            return totalDSB;
        }

                // **CORRECTION COMPLÈTE : Calcul de l'armure totale**
 _calculateArmure(actorSystemData) {
            let totalArmure = 0;
        
            // **ÉTAPE 1 : Armure de défense (paliers de 7)**
            const defenseValue = actorSystemData.majeures.defense?.totale || 0;
            const armureFromDefense = Math.floor(defenseValue / 7);
            totalArmure += armureFromDefense;
            console.log(`📊 Armure de défense: ${defenseValue} points → ${armureFromDefense} armure (paliers de 7)`);
        
            // **ÉTAPE 2 : Armure équipée (depuis l'inventaire)**
            const inventory = actorSystemData.inventaire || {};
            if (inventory.armureEquipee && inventory.armureEquipee.system) {
                const bonusArmureEquipee = parseInt(inventory.armureEquipee.system.bonusArmure) || 0;
                totalArmure += bonusArmureEquipee;
                console.log(`⚔️ Armure équipée: ${inventory.armureEquipee.name} → +${bonusArmureEquipee} armure`);
            }
        
            // **ÉTAPE 3 : Bonus d'armure des équipements (armes, accessoires)**
            if (inventory.armeEquipee && inventory.armeEquipee.system) {
                const bonusArmureArme = parseInt(inventory.armeEquipee.system.bonusArmure) || 0;
                if (bonusArmureArme > 0) {
                    totalArmure += bonusArmureArme;
                    console.log(`⚔️ Bonus armure arme: ${inventory.armeEquipee.name} → +${bonusArmureArme} armure`);
                }
            }
        
            // Accessoires
            if (inventory.accessoire1 && inventory.accessoire1.system) {
                const bonusArmureAcc1 = parseInt(inventory.accessoire1.system.bonusArmure) || 0;
                if (bonusArmureAcc1 > 0) {
                    totalArmure += bonusArmureAcc1;
                    console.log(`📿 Bonus armure accessoire 1: ${inventory.accessoire1.name} → +${bonusArmureAcc1} armure`);
                }
            }
        
            if (inventory.accessoire2 && inventory.accessoire2.system) {
                const bonusArmureAcc2 = parseInt(inventory.accessoire2.system.bonusArmure) || 0;
                if (bonusArmureAcc2 > 0) {
                    totalArmure += bonusArmureAcc2;
                    console.log(`📿 Bonus armure accessoire 2: ${inventory.accessoire2.name} → +${bonusArmureAcc2} armure`);
                }
            }
        
            // **ÉTAPE 4 : Bonus d'armure temporaires (sorts, talents, etc.)**
            const bonusArmureTemporaire = parseInt(actorSystemData.bonusArmureTemporaire) || 0;
            if (bonusArmureTemporaire > 0) {
                totalArmure += bonusArmureTemporaire;
                console.log(`✨ Bonus armure temporaire: +${bonusArmureTemporaire} armure`);
            }
        
            // **ÉTAPE 5 : Bonus d'armure des talents**
            const bonusArmureTalents = parseInt(actorSystemData.bonusArmureTalents) || 0;
            if (bonusArmureTalents > 0) {
                totalArmure += bonusArmureTalents;
                console.log(`🎯 Bonus armure talents: +${bonusArmureTalents} armure`);
            }
        
            console.log(`🛡️ Armure totale calculée: ${totalArmure}`);
            return totalArmure;
        }

 _hasTalent(talentName) {
            const talents = this.system.talents || [];
            return talents.some(talent => 
                talent.nom && talent.nom.toLowerCase().includes(talentName.toLowerCase())
            );
        }

        // **NOUVELLE MÉTHODE : Appliquer tous les traits d'équipement**
_applyEquipmentTraits(system) {
    console.log("🔧 Application des traits d'équipement");
    
    // **Réinitialiser les bonus d'équipement**
    this._resetEquipmentBonuses(system);
    
    const inventory = system.inventaire || {};
    
    // **Appliquer traits de l'arme principale**
    if (inventory.armeEquipee) {
        this._applyWeaponTraits(inventory.armeEquipee, system, "principale");
    }
    
    // **Appliquer traits de l'arme secondaire**
    if (inventory.armeSecondaireEquipee) {
        this._applyWeaponTraits(inventory.armeSecondaireEquipee, system, "secondaire");
    }
    
    // **Appliquer traits de l'armure**
    if (inventory.armureEquipee) {
        this._applyArmorTraits(inventory.armureEquipee, system);
    }
    
    // **Appliquer traits des accessoires**
    if (inventory.accessoire1) {
        this._applyAccessoryTraits(inventory.accessoire1, system, 1);
    }
    
    if (inventory.accessoire2) {
        this._applyAccessoryTraits(inventory.accessoire2, system, 2);
    }
    
    console.log("✅ Traits d'équipement appliqués");
}

// **NOUVELLE MÉTHODE : Réinitialiser les bonus d'équipement**
_resetEquipmentBonuses(system) {
    const attributsMajeurs = ["force", "dexterite", "constitution", "intelligence", "sagesse", "charisme", "defense", "chance"];
    const attributsMineurs = [
        "monde", "mystique", "nature", "sacré", "robustesse", "calme",
        "marchandage", "persuasion", "artmusique", "commandement", "acrobatie",
        "discretion", "adresse", "artisanat", "hasard", "athlétisme",
        "puissance", "intimidation", "perception", "perceptionmagique", "medecine",
        "intuition"
    ];
    
    // **Réinitialiser les bonus d'équipement des majeures**
    attributsMajeurs.forEach(attr => {
        if (system.majeures[attr]) {
            system.majeures[attr].equipement = 0;
        }
    });
    
    // **Réinitialiser les bonus d'équipement des mineures**
    attributsMineurs.forEach(attr => {
        if (system.mineures[attr]) {
            system.mineures[attr].equipement = 0;
        }
    });
    
    // **CORRECTION : Réinitialiser TOUS les bonus d'équipement**
    system.bonusDegats = 0;
    system.bonusContreAttaque = 0;  // ← AJOUTÉ
    system.bonusCritique = 0;
    system.bonusBlocage = 0;
    system.bonusVitesse = 0;
    system.bonusArmureTemporaire = 0;
    system.bonusSoins = 0;          // ← AJOUTÉ
    system.bonusIgnoreArmure = 0;   // ← AJOUTÉ
    system.bonusPSY = 0;            // ← AJOUTÉ
    system.bonusBouclier = 0;       // ← AJOUTÉ
    system.bonusInventaire = 0;     // ← AJOUTÉ
    system.bonusVitessePremierTour = 0; // ← AJOUTÉ
    
    // **Réinitialiser les bonus structurés**
    system.bouclier = 0;
    
    // **Garder les talents et bonus temporaires**
    // system.bonusArmureTalents = system.bonusArmureTalents || 0; // Préserver
    
    // **Réinitialiser les listes spéciales**
    system.specialTraits = [];
    system.resistances = {};
    system.immunites = [];
    system.faiblesses = [];
}

// **NOUVELLE MÉTHODE : Appliquer les traits d'arme**
_applyWeaponTraits(arme, system, type) {
    console.log(`⚔️ Application traits arme ${type}:`, arme.name);
    
    const traits = arme.system?.traits || [];
    const imperfections = arme.system?.imperfections || [];
    
    // **Appliquer les traits positifs**
    traits.forEach(trait => {
        this._applyTraitEffect(trait, system, true, type);
    });
    
    // **Appliquer les imperfections (traits négatifs)**
    imperfections.forEach(imperfection => {
        this._applyTraitEffect(imperfection, system, false, type);
    });
}

// **NOUVELLE MÉTHODE : Appliquer les traits d'armure**
_applyArmorTraits(armure, system) {
    console.log("🛡️ Application traits armure:", armure.name);
    
    const traits = armure.system?.traits || [];
    const imperfections = armure.system?.imperfections || [];
    
    // **Appliquer les traits positifs**
    traits.forEach(trait => {
        this._applyArmorTraitEffect(trait, system, true);
    });
    
    // **Appliquer les imperfections**
    imperfections.forEach(imperfection => {
        this._applyArmorTraitEffect(imperfection, system, false);
    });
}

// **CORRECTION COMPLÈTE : _applyAccessoryTraits dans AlyriaActor.js**
_applyAccessoryTraits(accessoire, system, slotNumber) {
    console.log(`📿 Application traits accessoire ${slotNumber}:`, accessoire.name);
    
    const traits = accessoire.system?.traits || [];
    const imperfections = accessoire.system?.imperfections || [];
    
    // **Appliquer les traits positifs**
    traits.forEach(trait => {
        console.log(`✨ Application trait accessoire ${slotNumber}: ${trait.nom || trait}`);
        this._applyAccessoryTraitEffect(trait, system, true, slotNumber);
    });
    
    // **Appliquer les imperfections (traits négatifs)**
    imperfections.forEach(imperfection => {
        console.log(`⚠️ Application imperfection accessoire ${slotNumber}: ${imperfection.nom || imperfection}`);
        this._applyAccessoryTraitEffect(imperfection, system, false, slotNumber);
    });



// **AJOUT dans module/AlyriaActor.js - Hook sur la création d'items**
Hooks.on("createItem", async (item, options, userId) => {
    // **Vérifier si l'item appartient à un acteur Alyria**
    if (item.parent && item.parent.type === "Joueur") {
        const actor = item.parent;
        
        // **Ajouter automatiquement l'item à l'inventaire**
        const inventory = actor.system.inventaire || InventoryManager.initializeInventory();
        
        if (!inventory.items) {
            inventory.items = [];
        }
        
        if (!inventory.items.includes(item.id)) {
            console.log(`📦 Ajout automatique à l'inventaire: ${item.name}`);
            
            const updatedItems = [...inventory.items, item.id];
            
            await actor.update({
                'system.inventaire.items': updatedItems
            });
            
            ui.notifications.info(`${item.name} ajouté automatiquement à l'inventaire !`);
        }
    }
})
}

_applyAccessoryTraitEffect(trait, system, isPositive, slotNumber) {
    const traitName = (trait.nom || trait.name || trait).toLowerCase();
    const multiplier = isPositive ? 1 : -1;
    
    console.log(`📿 Application trait accessoire "${traitName}" (slot ${slotNumber}, ${isPositive ? 'positif' : 'négatif'})`);
    
    // **Utiliser la même logique que pour les armures**
    switch (traitName) {
        // **TRAITS DE CARACTÉRISTIQUES**
        case "habile":
            system.majeures.dexterite.equipement += 1 * multiplier;
            break;
        case "perspicace":
            system.majeures.sagesse.equipement += 1 * multiplier;
            break;
        case "Balourd":
            system.majeures.force.equipement += 1 * multiplier;
            break;
        case "joli":
            system.majeures.charisme.equipement += 1 * multiplier;
            break;
        case "solide":
            system.majeures.defense.equipement += 1 * multiplier;
            break;
        case "chanceux":
            system.majeures.chance.equipement += 1 * multiplier;
            break;
        case "malin":
            system.majeures.intelligence.equipement += 1 * multiplier;
            break;
        case "costaud":
            system.majeures.constitution.equipement += 1 * multiplier;
            break;
        
            
        // **TRAITS RARES**
        case "acrobatique":
            system.majeures.dexterite.equipement += 2 * multiplier;
            break;
        case "ingénieux":
        case "ingenieux":
            system.majeures.sagesse.equipement += 2 * multiplier;
            break;
        case "puissant":
            system.majeures.force.equipement += 2 * multiplier;
            break;
        case "splendide":
            system.majeures.charisme.equipement += 2 * multiplier;
            break;
        case "incassable":
            system.majeures.defense.equipement += 2 * multiplier;
            break;
        case "veinard":
            system.majeures.chance.equipement += 2 * multiplier;
            break;
        case "réfléchi":
        case "reflechi":
            system.majeures.intelligence.equipement += 2 * multiplier;
            break;
        case "robuste":
        case "Robuste":
            system.majeures.constitution.equipement += 2 * multiplier;
            break;
        
            
        // **TRAITS ÉPIQUES**
        case "vif":
            system.majeures.dexterite.equipement += 3 * multiplier;
            break;
        case "clairvoyant":
            system.majeures.sagesse.equipement += 3 * multiplier;
            break;
        case "féroce":
        case "feroce":
            system.majeures.force.equipement += 3 * multiplier;
            break;
        case "magnifique":
            system.majeures.charisme.equipement += 3 * multiplier;
            break;
        case "indestructible":
            system.majeures.defense.equipement += 3 * multiplier;
            break;
        case "bienheureux":
            system.majeures.chance.equipement += 3 * multiplier;
            break;
        case "cérébral":
        case "cerebral":
            system.majeures.intelligence.equipement += 3 * multiplier;
            break;
        case "inébranlable":
        case "inebranlable":
            system.majeures.constitution.equipement += 3 * multiplier;
            break;
            
        // **TRAITS SPÉCIAUX D'ACCESSOIRES**
        case "amortissant":
            system.bouclier = (system.bouclier || 0) + (2 * multiplier);
            break;
        case "absorbant":
            system.bouclier = (system.bouclier || 0) + (4 * multiplier);
            break;
        case "engloutissant":
            system.bouclier = (system.bouclier || 0) + (8 * multiplier);
            break;
        case "magique":
            system.bonusPSY = (system.bonusPSY || 0) + (2 * multiplier);
            break;
        case "psychique":
            system.bonusPSY = (system.bonusPSY || 0) + (4 * multiplier);
            break;
        case "rapide":
        case "fulgurant":
            system.bonusVitesse = (system.bonusVitesse || 0) + (1 * multiplier);
            break;
            
        default:
            console.warn(`⚠️ Trait d'accessoire non reconnu: "${traitName}"`);
            break;
    }
}
// **NOUVELLE MÉTHODE : Appliquer l'effet d'un trait d'arme**
_applyTraitEffect(trait, system, isPositive, weaponType) {
    const traitName = trait.nom || trait.name || trait;
    const multiplier = isPositive ? 1 : -1;
    
    console.log(`🎯 Application trait "${traitName}" (${isPositive ? 'positif' : 'négatif'})`);
    
    // **Correspondance des traits avec les effets du fichier traits.js**
    switch (traitName.toLowerCase()) {
        // **TRAITS DE CARACTÉRISTIQUES**
        case "habile":
            system.majeures.dexterite.equipement += 1 * multiplier;
            break;
        case "perspicace":
            system.majeures.sagesse.equipement += 1 * multiplier;
            break;
        case "costaud":
            system.majeures.force.equipement += 1 * multiplier;
            break;
        case "joli":
            system.majeures.charisme.equipement += 1 * multiplier;
            break;
        case "solide":
            system.majeures.defense.equipement += 1 * multiplier;
            break;
        case "chanceux":
            system.majeures.chance.equipement += 1 * multiplier;
            break;
        case "esotérique":
        case "esoterique":
            system.bonusPSY = (system.bonusPSY || 0) + (1 * multiplier);
            break;
            
        // **TRAITS DE COMBAT**
        case "violent":
            system.bonusDegats += 1 * multiplier;
            break;
        case "furieux":
            system.bonusDegats += 2 * multiplier;
            break;
        case "brutal":
            system.bonusDegats += 4 * multiplier;
            break;
        case "affûté":
        case "affute":
            system.bonusCritique = (system.bonusCritique || 0) + (5 * multiplier);
            break;
        case "aiguisé":
        case "aiguise":
            system.bonusCritique = (system.bonusCritique || 0) + (10 * multiplier);
            break;
        case "affilé":
        case "affile":
            system.bonusCritique = (system.bonusCritique || 0) + (15 * multiplier);
            break;
        case "bloquant":
            system.bonusBlocage = (system.bonusBlocage || 0) + (5 * multiplier);
            break;
        case "obstruant":
            system.bonusBlocage = (system.bonusBlocage || 0) + (10 * multiplier);
            break;
        case "hermétique":
        case "hermetique":
            system.bonusBlocage = (system.bonusBlocage || 0) + (15 * multiplier);
            break;
        case "broyeur":
            system.bonusIgnoreArmure = (system.bonusIgnoreArmure || 0) + (1 * multiplier);
            break;
        case "ecraseur":
            system.bonusIgnoreArmure = (system.bonusIgnoreArmure || 0) + (2 * multiplier);
            break;
        case "ferrailleur":
            system.bonusIgnoreArmure = (system.bonusIgnoreArmure || 0) + (4 * multiplier);
            break;
            
        // **TRAITS SPÉCIAUX**
        case "rapide":
            system.bonusVitesse = (system.bonusVitesse || 0) + (1 * multiplier);
            break;
        case "sprinteur":
            system.bonusVitesse = (system.bonusVitesse || 0) + (1 * multiplier);
            break;
        case "fulgurant":
            system.bonusVitesse = (system.bonusVitesse || 0) + (1 * multiplier);
            break;
        case "libre":
            system.specialTraits = system.specialTraits || [];
            if (isPositive) {
                system.specialTraits.push("Prise en main gratuite");
            }
            break;
        case "discret":
            system.specialTraits = system.specialTraits || [];
            if (isPositive) {
                system.specialTraits.push("Arme discrète/cachable");
            }
            break;
        case "camouflé":
        case "camoufle":
            system.specialTraits = system.specialTraits || [];
            if (isPositive) {
                system.specialTraits.push("Arme camouflée");
            }
            break;
        case "Barda":
            system.encombrement = system.specialTraits || [];
            if (isPositive) {
                system.specialTraits.push("Arme de Barda");
            }
            
        // **TRAITS DE RARETÉ SUPÉRIEURE**
        case "acrobatique":
            system.majeures.dexterite.equipement += 2 * multiplier;
            break;
        case "ingénieux":
        case "ingenieux":
            system.majeures.sagesse.equipement += 2 * multiplier;
            break;
        case "puissant":
            system.majeures.force.equipement += 2 * multiplier;
            break;
        case "splendide":
            system.majeures.charisme.equipement += 2 * multiplier;
            break;
        case "incassable":
            system.majeures.defense.equipement += 2 * multiplier;
            break;
        case "veinard":
            system.majeures.chance.equipement += 2 * multiplier;
            break;
        case "magique":
            system.bonusPSY = (system.bonusPSY || 0) + (2 * multiplier);
            break;
        case "psychique":
            system.bonusPSY = (system.bonusPSY || 0) + (4 * multiplier);
            break;
        case "fantasmagorique":
            system.bonusPSY = (system.bonusPSY || 0) + (6 * multiplier);
            break;
            
        // **TRAITS LÉGENDAIRES (niveau 4)**
        case "mazul":
            system.majeures.dexterite.equipement += 4 * multiplier;
            break;
        case "arintiël":
        case "arintiel":
            system.majeures.sagesse.equipement += 4 * multiplier;
            break;
        case "kardös":
        case "kardos":
            system.majeures.force.equipement += 4 * multiplier;
            break;
        case "santis":
            system.majeures.charisme.equipement += 4 * multiplier;
            break;
        case "forgeterre":
            system.majeures.defense.equipement += 4 * multiplier;
            break;
        case "scélenis":
        case "scelenis":
            system.majeures.chance.equipement += 4 * multiplier;
            break;
        case "oroun":
            system.majeures.constitution.equipement += 4 * multiplier;
            break;
        case "l'antépénultième":
        case "l'antepenultieme":
            system.majeures.intelligence.equipement += 4 * multiplier;
            break;
            
        default:
            console.warn(`⚠️ Trait d'arme non reconnu: "${traitName}"`);
            break;
    }
}

// **NOUVELLE MÉTHODE : Appliquer l'effet d'un trait d'armure**
_applyArmorTraitEffect(trait, system, isPositive) {
    const traitName = trait.nom || trait.name || trait;
    const multiplier = isPositive ? 1 : -1;
    
    console.log(`🛡️ Application trait armure "${traitName}" (${isPositive ? 'positif' : 'négatif'})`);
    
    switch (traitName.toLowerCase()) {
        // **TRAITS DE CARACTÉRISTIQUES POUR ARMURES**
        case "habile":
            system.majeures.dexterite.equipement += 1 * multiplier;
            break;
        case "perspicace":
            system.majeures.sagesse.equipement += 1 * multiplier;
            break;
        case "costaud":
            system.majeures.force.equipement += 1 * multiplier;
            break;
        case "joli":
            system.majeures.charisme.equipement += 1 * multiplier;
            break;
        case "solide":
            system.majeures.defense.equipement += 1 * multiplier;
            break;
        case "chanceux":
            system.majeures.chance.equipement += 1 * multiplier;
            break;
        case "malin":
            system.majeures.intelligence.equipement += 1 * multiplier;
            break;
            
        // **TRAITS SPÉCIFIQUES AUX ARMURES**
        case "amortissant":
            system.bouclier = (system.bouclier || 0) + (2 * multiplier);
            break;
        case "absorbant":
            system.bouclier = (system.bouclier || 0) + (4 * multiplier);
            break;
        case "engloutissant":
            system.bouclier = (system.bouclier || 0) + (8 * multiplier);
            break;
        case "sain":
            system.bonusSoins = (system.bonusSoins || 0) + (1 * multiplier);
            break;
        case "sacré":
        case "sacre":
            system.bonusSoins = (system.bonusSoins || 0) + (2 * multiplier);
            break;
        case "céleste":
        case "celeste":
            system.bonusSoins = (system.bonusSoins || 0) + (3 * multiplier);
            break;
        case "ajusté":
        case "ajuste":
            system.bonusArmureTemporaire += 1 * multiplier;
            break;
        case "plaqué":
        case "plaque":
            system.bonusArmureTemporaire += 2 * multiplier;
            break;
        case "blindé":
        case "blinde":
            system.bonusArmureTemporaire += 3 * multiplier;
            break;
        case "renforçant":
        case "renforcant":
            system.bonusBouclier = (system.bonusBouclier || 0) + (1 * multiplier);
            break;
        case "colmatant":
            system.bonusBouclier = (system.bonusBouclier || 0) + (2 * multiplier);
            break;
        case "revanchard":
            system.bonusContreAttaque = (system.bonusContreAttaque || 0) + (2 * multiplier);
            break;
        case "epineux":
            system.bonusContreAttaque = (system.bonusContreAttaque || 0) + (4 * multiplier);
            break;
        case "vengeur":
            system.bonusContreAttaque = (system.bonusContreAttaque || 0) + (6 * multiplier);
            break;
        case "représailles":
        case "represailles":
            system.bonusContreAttaque = (system.bonusContreAttaque || 0) + (5 * multiplier);
            break;
        case "bloquant":
            system.bonusBlocage = (system.bonusBlocage || 0) + (5 * multiplier);
            break;
        case "obstruant":
            system.bonusBlocage = (system.bonusBlocage || 0) + (10 * multiplier);
            break;
        case "hermétique":
        case "hermetique":
            system.bonusBlocage = (system.bonusBlocage || 0) + (15 * multiplier);
            break;
        case "fourbi":
            system.bonusInventaire = (system.bonusInventaire || 0) + (2 * multiplier);
            break;
        case "barda":
            system.bonusInventaire = (system.bonusInventaire || 0) + (4 * multiplier);
            break;
        case "bardator":
            system.bonusInventaire = (system.bonusInventaire || 0) + (8 * multiplier);
            break;
        case "portatif":
            // Divise l'encombrement de l'armure par 2
            system.specialTraits = system.specialTraits || [];
            if (isPositive) {
                system.specialTraits.push("Encombrement réduit");
            }
            break;
        case "planaire":
            // L'objet ne prend pas de place d'inventaire
            system.specialTraits = system.specialTraits || [];
            if (isPositive) {
                system.specialTraits.push("Stockage dimensionnel");
            }
            break;
        case "leste":
            system.bonusVitessePremierTour = (system.bonusVitessePremierTour || 0) + (1 * multiplier);
            break;
        case "fulgurant":
            system.bonusVitesse = (system.bonusVitesse || 0) + (1 * multiplier);
            break;
        case "insensible":
            system.immunites = system.immunites || [];
            if (isPositive) {
                system.immunites.push("Altération aléatoire");
            }
            break;
        case "pugnace":
            system.immunites = system.immunites || [];
            if (isPositive) {
                system.immunites.push("Altération choisie");
            }
            break;
        case "élémentaire":
        case "elementaire":
            // Résistance + faiblesse élémentaire
            system.resistances = system.resistances || {};
            if (isPositive) {
                system.specialTraits = system.specialTraits || [];
                system.specialTraits.push("Résistance/Faiblesse élémentaire");
            }
            break;
        case "élémentariste":
        case "elementariste":
            // Résistance + faiblesse élémentaire choisies
            system.resistances = system.resistances || {};
            if (isPositive) {
                system.specialTraits = system.specialTraits || [];
                system.specialTraits.push("Résistance/Faiblesse élémentaire choisies");
            }
            break;
        case "elementaliste":
            // Résistance élémentaire choisie
            system.resistances = system.resistances || {};
            if (isPositive) {
                system.specialTraits = system.specialTraits || [];
                system.specialTraits.push("Résistance élémentaire");
            }
            break;
            
        // **TRAITS RARES ET ÉPIQUES**
        case "acrobatique":
            system.majeures.dexterite.equipement += 2 * multiplier;
            break;
        case "ingénieux":
        case "ingenieux":
            system.majeures.sagesse.equipement += 2 * multiplier;
            break;
        case "puissant":
            system.majeures.force.equipement += 2 * multiplier;
            break;
        case "splendide":
            system.majeures.charisme.equipement += 2 * multiplier;
            break;
        case "incassable":
            system.majeures.defense.equipement += 2 * multiplier;
            break;
        case "veinard":
            system.majeures.chance.equipement += 2 * multiplier;
            break;
        case "réfléchi":
        case "reflechi":
            system.majeures.intelligence.equipement += 2 * multiplier;
            break;
        case "robuste":
            system.majeures.constitution.equipement += 2 * multiplier;
            break;
        case "magique":
            system.bonusPSY = (system.bonusPSY || 0) + (2 * multiplier);
            break;
        case "psychique":
            system.bonusPSY = (system.bonusPSY || 0) + (4 * multiplier);
            break;
            
        // **TRAITS ÉPIQUES**
        case "vif":
            system.majeures.dexterite.equipement += 3 * multiplier;
            break;
        case "clairvoyant":
            system.majeures.sagesse.equipement += 3 * multiplier;
            break;
        case "féroce":
        case "feroce":
            system.majeures.force.equipement += 3 * multiplier;
            break;
        case "magnifique":
            system.majeures.charisme.equipement += 3 * multiplier;
            break;
        case "indestructible":
            system.majeures.defense.equipement += 3 * multiplier;
            break;
        case "bienheureux":
            system.majeures.chance.equipement += 3 * multiplier;
            break;
        case "cérébral":
        case "cerebral":
            system.majeures.intelligence.equipement += 3 * multiplier;
            break;
        case "inébranlable":
        case "inebranlable":
            system.majeures.constitution.equipement += 3 * multiplier;
            break;
            
        default:
            console.warn(`⚠️ Trait d'armure non reconnu: "${traitName}"`);
            break;
    }
}

// **AJOUTER après la méthode prepareData() dans AlyriaActor.js**

/**
 * Hook appelé quand l'acteur est mis à jour
 */
async _onUpdate(changed, options, userId) {
    await super._onUpdate(changed, options, userId);
    
    // **Vérifier si des majeures ont changé**
    if (changed.system?.majeures) {
        console.log("📊 Majeures modifiées, recalcul des bonus aux mineures");
        
        // **Importer TalentFonctions de manière dynamique**
        try {
            const { TalentFonctions } = await import('./data/talentFonctions.js');
            await this._recalculateMajeureBonuses();
        } catch (error) {
            console.error("❌ Erreur lors du recalcul des bonus:", error);
        }
    }
}

/**
 * Méthode pour recalculer les bonus de majeures aux mineures
 */
async _recalculateMajeureBonuses() {
    console.log("🔄 Recalcul des bonus de majeures aux mineures");
    
    const bonusConfigs = this.getFlag("alyria", "majeureAuxMineuresApplied") || [];
    
    if (bonusConfigs.length === 0) {
        console.log("📊 Aucun bonus majeure->mineure configuré");
        return;
    }
    
    const updateData = {};
    
    // **Pour chaque configuration de bonus**
    bonusConfigs.forEach(config => {
        const majeureValue = this.system.majeures?.[config.majeureSource]?.totale || 0;
        const nouveauBonus = majeureValue;
        const ancienBonus = config.bonusApplique || 0;
        
        console.log(`📊 ${config.talentNom}: ${config.majeureSource} ${ancienBonus} → ${nouveauBonus}`);
        
        // **Calculer la différence**
        const difference = nouveauBonus - ancienBonus;
        
        if (difference !== 0) {
            config.mineuresConcernees.forEach(mineure => {
                const currentTalents = this.system.mineures[mineure]?.talents || 0;
                updateData[`system.mineures.${mineure}.talents`] = currentTalents + difference;
                
                console.log(`  → ${mineure}: talents ${currentTalents} + ${difference} = ${currentTalents + difference}`);
            });
            
            // **Mettre à jour la configuration**
            config.bonusApplique = nouveauBonus;
        }
    });
    
    // **Mettre à jour les flags et l'acteur**
    if (Object.keys(updateData).length > 0) {
        await this.setFlag("alyria", "majeureAuxMineuresApplied", bonusConfigs);
        await this.update(updateData);
        console.log("✅ Bonus de majeures aux mineures recalculés");
    }
}

// **AJOUT : Méthode utilitaire pour extraire les nombres des descriptions**
_extractNumberFromTrait(text) {
    if (!text || typeof text !== 'string') return 1;
    
    // Chercher des patterns comme "+2", "-3", "2 points", etc.
    const matches = text.match(/[+-]?\d+/);
    if (matches) {
        return parseInt(matches[0]);
    }
    
    // Si aucun nombre trouvé, retourner 1 par défaut
    return 1;
}

// **CORRECTION : Éviter la boucle infinie dans calculateTraitsEffects**
async calculateTraitsEffects() {
    // **PROTECTION : Éviter les boucles infinies**
    if (this._calculatingTraits) {
        console.log("⚠️ Calcul des traits déjà en cours, éviter la boucle");
        return;
    }
    
    this._calculatingTraits = true;
    
    try {
        console.log("🔧 Application des traits d'équipement");
        // ... votre code existant ...
        
        console.log("✅ Traits d'équipement appliqués");
        
    } finally {
        this._calculatingTraits = false;
    }
}

recalculateDerivedStats(system) {
    console.log("🔄 Recalcul des statistiques dérivées avec traits");
    
    // **Recalculer les totaux des caractéristiques majeures**
    const attributsMajeurs = ["force", "dexterite", "constitution", "intelligence", "sagesse", "charisme", "defense", "chance"];
    
    attributsMajeurs.forEach(attribut => {
        if (system.majeures[attribut]) {
            system.majeures[attribut].totale = (
                (system.majeures[attribut].creation || 0) +
                (system.majeures[attribut].talents || 0) +
                (system.majeures[attribut].equipement || 0) +
                (system.majeures[attribut].repartition || 0) +
                (system.majeures[attribut].bonus || 0)
            );
        }
    });
    
    // **Recalculer les totaux des caractéristiques mineures**
    const attributsMineurs = [
        "monde", "mystique", "nature", "sacré", "robustesse", "calme",
        "marchandage", "persuasion", "artmusique", "commandement", "acrobatie",
        "discretion", "adresse", "artisanat", "hasard", "athlétisme",
        "puissance", "intimidation", "perception", "perceptionmagique", "medecine",
        "intuition"
    ];
    
    attributsMineurs.forEach(attribut => {
        if (system.mineures[attribut]) {
            // Recalculer la majeure associée avec les nouveaux totaux
            let majeureAssociee = 0;
            
            if (["robustesse", "calme"].includes(attribut)) {
                majeureAssociee = system.majeures.defense.totale || 0;
            } else if (["marchandage", "persuasion", "artmusique", "commandement"].includes(attribut)) {
                majeureAssociee = system.majeures.charisme.totale || 0;
            } else if (["acrobatie", "discretion", "artisanat", "adresse"].includes(attribut)) {
                majeureAssociee = system.majeures.dexterite.totale || 0;
            } else if (["puissance", "intimidation", "athlétisme"].includes(attribut)) {
                majeureAssociee = system.majeures.force.totale || 0;
            } else if (["perception", "perceptionmagique", "medecine"].includes(attribut)) {
                majeureAssociee = system.majeures.sagesse.totale || 0;
            } else if (["intuition", "hasard"].includes(attribut)) {
                majeureAssociee = system.majeures.chance.totale || 0;
            } else if (["monde", "mystique", "nature", "sacré"].includes(attribut)) {
                majeureAssociee = system.majeures.intelligence.totale || 0;
            }
            
            system.mineures[attribut].majeureAssocie = majeureAssociee;
            
            system.mineures[attribut].totale = (
                (system.mineures[attribut].creation || 0) +
                (system.mineures[attribut].majeureAssocie || 0) +
                (system.mineures[attribut].talents || 0) +
                (system.mineures[attribut].equipement || 0) +
                (system.mineures[attribut].repartition || 0) +
                (system.mineures[attribut].bonus || 0)
            );
        }
    });
    
    // **Recalculer les statistiques de combat**
    system.toucheForce = this.getBonusPourcentage(system.majeures.force.totale) + (system.bonusCombat || 0);
    system.toucheDexterite = this.getBonusPourcentage(system.majeures.dexterite.totale) + (system.bonusCombat || 0);
    system.toucheCharisme = this.getBonusPourcentage(system.majeures.charisme.totale) + (system.bonusCombat || 0);
    system.toucheSagesse = this.getBonusPourcentage(system.majeures.sagesse.totale) + (system.bonusCombat || 0);
    
    // **Appliquer les bonus de critique et blocage**
    system.toucheChance = this.getBonusChanceCritique(system.majeures.chance.totale) + (system.bonusCritique || 0);
    system.toucheDefense = this.getChanceBlocage(system.majeures.defense.totale) + (system.bonusBlocage || 0);
    
    // **Appliquer les bonus de vitesse**
    system.vitesse = (system.vitesse || 2) + (system.bonusVitesse || 0);
    
    console.log("✅ Statistiques dérivées recalculées avec traits");
}

// **NOUVELLE MÉTHODE : Vérifier si on doit appliquer le plafond**
_shouldApplyStatCaps() {
    // **Ne pas appliquer pendant la création d'acteur**
    if (!this.id) {
        console.log("🚫 Pas d'application du plafond : acteur en cours de création");
        return false;
    }
    
    // **Ne pas appliquer si les mineures ne sont pas initialisées**
    if (!this.system.mineures || Object.keys(this.system.mineures).length === 0) {
        console.log("🚫 Pas d'application du plafond : mineures non initialisées");
        return false;
    }
    
    // **Vérifier qu'au moins une mineure est correctement structurée**
    const firstMinor = Object.values(this.system.mineures)[0];
    if (!firstMinor || typeof firstMinor !== 'object' || firstMinor.totale === undefined) {
        console.log("🚫 Pas d'application du plafond : structure des mineures incorrecte");
        return false;
    }
    
    return true;
}


// **CORRECTION : _applyMinorStatCaps avec plafond sur la valeur totale finale**
_applyMinorStatCaps() {
    console.log("🔢 Application du plafond de 95 aux mineures");
    
    const system = this.system;
    
    // **PROTECTION : Vérifier que system.mineures existe et est un objet**
    if (!system.mineures || typeof system.mineures !== 'object') {
        console.log("❌ system.mineures n'existe pas ou n'est pas un objet");
        return;
    }
    
    const redistributionPoints = {}; // Points disponibles par majeure
    const updateData = {};
    
    // **ÉTAPE 1 : Détecter les dépassements et appliquer un malus**
    const attributsMineurs = [
        "monde", "mystique", "nature", "sacré", "robustesse", "calme",
        "marchandage", "persuasion", "artmusique", "commandement", "acrobatie",
        "discretion", "adresse", "artisanat", "hasard", "athlétisme",
        "puissance", "intimidation", "perception", "perceptionmagique", "medecine",
        "intuition"
    ];
    
    attributsMineurs.forEach(attribut => {
        const data = system.mineures[attribut];
        
        // **PROTECTION : Vérifier que l'attribut existe et a la bonne structure**
        if (!data || typeof data !== 'object') {
            console.log(`⚠️ Attribut ${attribut} manquant ou mal structuré, création par défaut`);
            system.mineures[attribut] = {
                creation: 0,
                repartition: 0,
                equipement: 0,
                talents: 0,
                bonus: 0,
                majeureAssocie: 0,
                totale: 0
            };
            return; // Passer au suivant
        }
        
        // **NOUVEAU : Calculer le total FINAL (avec majeure associée)**
        const totalFinal = (
            (data.creation || 0) +
            (data.repartition || 0) +
            (data.equipement || 0) +
            (data.talents || 0) +
            (data.bonus || 0) +
            (data.majeureAssocie || 0)
        );
        
        // **CORRECTION : Vérifier si le TOTAL FINAL dépasse 95**
        if (totalFinal > 95) {
            const overflow = totalFinal - 95;
            
            // Déterminer quelle majeure gouverne cette mineure
            let gouvernante = "";
            if (["robustesse", "calme"].includes(attribut)) {
                gouvernante = "defense";
            } else if (["marchandage", "persuasion", "artmusique", "commandement"].includes(attribut)) {
                gouvernante = "charisme";
            } else if (["acrobatie", "discretion", "adresse", "artisanat"].includes(attribut)) {
                gouvernante = "dexterite";
            } else if (["puissance", "intimidation", "athlétisme"].includes(attribut)) {
                gouvernante = "force";
            } else if (["perception", "perceptionmagique", "medecine"].includes(attribut)) {
                gouvernante = "sagesse";
            } else if (["intuition", "hasard"].includes(attribut)) {
                gouvernante = "chance";
            } else if (["monde", "mystique", "nature", "sacré"].includes(attribut)) {
                gouvernante = "intelligence";
            }
            
            console.log(`⚠️ Dépassement détecté: ${attribut} (${totalFinal} total final) → Plafond à 95, ${overflow} points excédentaires`);
            
            // **SIMPLE : Appliquer un malus de -overflow dans bonus**
            const currentBonus = data.bonus || 0;
            updateData[`system.mineures.${attribut}.bonus`] = currentBonus - overflow;
            
            // Ajouter les points excédentaires au pool de redistribution
            if (!redistributionPoints[gouvernante]) {
                redistributionPoints[gouvernante] = 0;
            }
            redistributionPoints[gouvernante] += overflow;
            
            console.log(`  → Malus appliqué: ${currentBonus} → ${currentBonus - overflow} (stat plafonnée à 95)`);
            
        } else {
            // **Si plus de dépassement, ajuster le bonus si nécessaire**
            // On regarde s'il y avait un malus précédent qu'on peut réduire
            if (data.bonus < 0) {
                // Calculer combien on peut "remonter" sans dépasser 95
                const bonusPossible = Math.min(0, 95 - (totalFinal - data.bonus));
                if (bonusPossible > data.bonus) {
                    updateData[`system.mineures.${attribut}.bonus`] = bonusPossible;
                    console.log(`  → Ajustement bonus pour ${attribut}: ${data.bonus} → ${bonusPossible}`);
                }
            }
        }
    });
    
    // **ÉTAPE 2 : Stocker les points de redistribution pour usage ultérieur**
    if (Object.keys(redistributionPoints).length > 0) {
        console.log("🎯 Points de redistribution disponibles:", redistributionPoints);
        updateData["flags.alyria.redistributionPoints"] = redistributionPoints;
        
        // **Notification au joueur**
        const totalPointsRedistrib = Object.values(redistributionPoints).reduce((sum, val) => sum + val, 0);
        if (totalPointsRedistrib > 0) {
            ui.notifications.info(`⚠️ ${totalPointsRedistrib} points de statistiques redistribuables disponibles !`);
        }
    }
    
    // **ÉTAPE 3 : Appliquer les changements si nécessaire**
    if (Object.keys(updateData).length > 0) {
        console.log("🔄 Application des corrections de plafond:", updateData);
        return this.update(updateData);
    }
    
    return Promise.resolve();
}

// **HELPER : Obtenir les mineures gouvernées par une majeure**
_getMineuresGoverned(majeure) {
    const mapping = {
        "defense": ["robustesse", "calme"],
        "charisme": ["marchandage", "persuasion", "artmusique", "commandement"],
        "dexterite": ["acrobatie", "discretion", "adresse", "artisanat"],
        "force": ["puissance", "intimidation", "athlétisme"],
        "sagesse": ["perception", "perceptionmagique", "medecine"],
        "chance": ["intuition", "hasard"],
        "intelligence": ["monde", "mystique", "nature", "sacré"]
    };
    
    return mapping[majeure] || [];
}

// **HELPER : Labels des majeures**
_getMajeureLabel(majeure) {
    const labels = {
        "defense": "Défense",
        "charisme": "Charisme", 
        "dexterite": "Dextérité",
        "force": "Force",
        "sagesse": "Sagesse",
        "chance": "Chance",
        "intelligence": "Intelligence"
    };
    
    return labels[majeure] || majeure;
}



// **HELPER : Méthodes utilitaires déplacées pour être accessibles**
getBonusPourcentage(statValue) {
    let totalToucheBonus = 0;
    if (statValue > 0) { 
        const phase1Points = Math.min(statValue, 10);
        totalToucheBonus += phase1Points * 5;
    }
    if (statValue > 10) {
        const phase2Points = Math.min(statValue - 10, 5);
        totalToucheBonus += phase2Points * 3;
    }
    if (statValue > 15) {
        const phase3Points = Math.min(statValue - 15, 5);
        totalToucheBonus += phase3Points * 2;
    }
    if (statValue > 20) {
        const phase4Points = Math.min(statValue - 20, 10);
        totalToucheBonus += phase4Points * 1;
    }
    return totalToucheBonus;
}

getChanceBlocage(defenseValue) {
    let totalBlockChance = 0;
    if (defenseValue === 0) {
        totalBlockChance = 0;
    } else if (defenseValue >= 1 && defenseValue <= 10) {
        totalBlockChance = defenseValue * 4;
    } else if (defenseValue >= 11 && defenseValue <= 15) {
        totalBlockChance = (10 * 4) + ((defenseValue - 10) * 3);
    } else if (defenseValue >= 16 && defenseValue <= 20) {
        totalBlockChance = (10 * 4) + (5 * 3) + ((defenseValue - 15) * 2);
    } else if (defenseValue > 20) {
        totalBlockChance = (10 * 4) + (5 * 3) + (5 * 2) + ((defenseValue - 20) * 1);
    }
    return totalBlockChance;
}

getBonusChanceCritique(chanceValue) {
    let totalCritChance = 0;
    if (chanceValue === 0) {
        totalCritChance = 5;
    } else if (chanceValue >= 1 && chanceValue <= 18) {
        totalCritChance = 5 + (chanceValue * 2);
    } else if (chanceValue >= 19 && chanceValue <= 30) {
        totalCritChance = 5 + (18 * 2) + ((chanceValue - 18) * 1);
    } else if (chanceValue > 30) {
        totalCritChance = 5 + (18 * 2) + (12 * 1);
    }
    return totalCritChance;
}

prepareDerivedData() {
    // ...existing code...
    
    // **NOUVEAU : Préparer les talents conditionnels pour l'affichage**
    this._prepareConditionalTalents();
}

_prepareConditionalTalents() {
    const conditionalTalents = this.getFlag("alyria", "conditionalTalents") || [];
    
    // Créer un objet facilement utilisable dans le template
    this.system.conditionalTalentsDisplay = conditionalTalents.map(talent => ({
        nom: talent.nom,
        caracteristique: talent.caracteristique,
        bonus: talent.bonus,
        condition: talent.condition,
        description: talent.description
    }));
    
    console.log("✅ Talents conditionnels préparés:", this.system.conditionalTalentsDisplay);
}}
