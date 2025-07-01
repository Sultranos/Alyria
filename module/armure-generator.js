import { TRAIT_ARMURE } from "./data/traits.js";
import { IMPERFECTIONS } from "./data/imperfections.js";
import { ARMURES } from "./data/armes.js";

// Probabilités de rareté selon le niveau du joueur (identique aux armes)
const RARETES_PAR_NIVEAU = {
  Novice: [
    { name: "Commune", proba: 0.95, maxTraits: 3, maxImperfections: 2 },
    { name: "Rare", proba: 0.05, maxTraits: 3, maxImperfections: 1 },
    { name: "Epic", proba: 0, maxTraits: 4, maxImperfections: 1 },
    { name: "Legendaire", proba: 0, maxTraits: 4, maxImperfections: 0 }
  ],
  Confirme: [
    { name: "Commune", proba: 0.17, maxTraits: 3, maxImperfections: 2 },
    { name: "Rare", proba: 0.77, maxTraits: 3, maxImperfections: 1 },
    { name: "Epic", proba: 0.05, maxTraits: 4, maxImperfections: 1 },
    { name: "Legendaire", proba: 0, maxTraits: 4, maxImperfections: 0 }
  ],
  Expert: [
    { name: "Commune", proba: 0.05, maxTraits: 3, maxImperfections: 2 },
    { name: "Rare", proba: 0.1, maxTraits: 3, maxImperfections: 1 },
    { name: "Epic", proba: 0.845, maxTraits: 4, maxImperfections: 1 },
    { name: "Legendaire", proba: 0.005, maxTraits: 4, maxImperfections: 0 }
  ],
  Maitre: [
    { name: "Commune", proba: 0.0, maxTraits: 3, maxImperfections: 2 },
    { name: "Rare", proba: 0.00, maxTraits: 3, maxImperfections: 1 },
    { name: "Epic", proba: 0.08, maxTraits: 4, maxImperfections: 1 },
    { name: "Legendaire", proba: 0.92, maxTraits: 4, maxImperfections: 0 }
  ]
};

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Filtre les traits accessibles selon la rareté de l'armure
function traitsPourRareté(rarete) {
  console.log(`🎯 Recherche traits pour rareté: "${rarete}"`);
  
  // **DEBUG : Vérifier TRAITS_ARMURE**
  console.log(`📋 Premier trait de TRAIT_ARMURE:`, TRAIT_ARMURE[0]);
  console.log(`📋 Structure du premier trait:`, JSON.stringify(TRAIT_ARMURE[0], null, 2));
  
  const traitsFiltrés = TRAIT_ARMURE.filter(trait => {
      const traitRarete = trait.rarete?.toLowerCase();
      const rareteRecherche = rarete?.toLowerCase();
      
      return traitRarete === rareteRecherche;
  });
  
  console.log(`🎯 Traits disponibles pour rareté ${rarete}:`, traitsFiltrés.length);
  console.log(`📋 Premiers traits filtrés:`, traitsFiltrés.slice(0, 3));
  
  return traitsFiltrés;
}


// Tire une rareté selon les probabilités du niveau
function randomRarity(niveau) {
  const table = RARETES_PAR_NIVEAU[niveau];
  const roll = Math.random();
  let acc = 0;
  for (const r of table) {
    acc += r.proba;
    if (roll < acc) return r;
  }
  return table[0];
}

// Générateur principal
function genererArmureAleatoire(niveau = "Novice") {
    console.log(`🔧 === DÉBUT GÉNÉRATION ARMURE INTERNE ===`);
    console.log(`📊 Niveau demandé: ${niveau}`);
    
    const armure = randomFromArray(ARMURES);
    console.log(`🛡️ Armure de base tirée: ${armure.nom}`);
    
    const rarete = randomRarity(niveau);
    console.log(`🌟 Rareté tirée:`, rarete);
    
    const nbTraits = Math.floor(Math.random() * rarete.maxTraits) + 1;
    console.log(`🎲 Nombre de traits à générer: ${nbTraits} (max: ${rarete.maxTraits})`);
    
    // **CORRECTION : Utiliser le nouveau calcul d'imperfections**
    const nbImperfections = calculerNombreImperfections(rarete.name, nbTraits);
    console.log(`🎲 Nombre d'imperfections calculées: ${nbImperfections} (formule: ${nbTraits} traits - bonus rareté)`);

    // Traits uniques compatibles avec la rareté
    const traitsPossibles = traitsPourRareté(rarete.name);
    console.log(`📋 Traits disponibles pour ${rarete.name}:`, traitsPossibles.length);
    
    const traits = [];
    const nomsUtilises = new Set();

    let tentatives = 0;
    while (traits.length < nbTraits && traitsPossibles.length > 0 && tentatives < 50) {
        tentatives++;
        const randomIndex = Math.floor(Math.random() * traitsPossibles.length);
        const traitCandidat = traitsPossibles[randomIndex];
        
        // **DEBUG : Vérifier la structure du trait**
        console.log(`🔍 Debug trait candidat:`, traitCandidat);
        console.log(`🔍 Nom du trait: "${traitCandidat?.name}"`);
        console.log(`🔍 Structure complète:`, JSON.stringify(traitCandidat, null, 2));
        
        // **CORRECTION 1 : Changer name en nom**
        if (traitCandidat && traitCandidat.nom && !nomsUtilises.has(traitCandidat.nom)) {
            traits.push(traitCandidat);
            nomsUtilises.add(traitCandidat.nom);
            console.log(`✅ Trait ajouté: ${traitCandidat.nom} (${traitCandidat.rarete})`);
        } else {
            console.warn(`⚠️ Trait invalide ou déjà utilisé:`, traitCandidat);
        }
        
        traitsPossibles.splice(randomIndex, 1);
    }
    
    console.log(`📊 Traits finaux générés: ${traits.length}/${nbTraits}`);
    if (traits.length < nbTraits) {
        console.warn(`⚠️ Moins de traits générés que prévu (${traits.length}/${nbTraits})`);
    }

    // Imperfections uniques
    const imperfections = [];
    if (typeof IMPERFECTIONS !== 'undefined') {
        const imperfectionsPossibles = [...IMPERFECTIONS];
        
        let tentativesImperf = 0;
        while (imperfections.length < nbImperfections && imperfectionsPossibles.length > 0 && tentativesImperf < 20) {
            tentativesImperf++;
            const randomIndex = Math.floor(Math.random() * imperfectionsPossibles.length);
            const imperfectionCandidate = imperfectionsPossibles[randomIndex];
            
            if (imperfectionCandidate && !imperfections.find(i => i.name === imperfectionCandidate.name)) {
                imperfections.push(imperfectionCandidate);
                console.log(`❌ Imperfection ajoutée: ${imperfectionCandidate.name}`);
            }
            
            imperfectionsPossibles.splice(randomIndex, 1);
        }
    } else if (typeof DEFAUTS !== 'undefined') {
        // Utiliser DEFAUTS si IMPERFECTIONS n'existe pas
        const imperfectionsPossibles = [...DEFAUTS];
        
        let tentativesImperf = 0;
        while (imperfections.length < nbImperfections && imperfectionsPossibles.length > 0 && tentativesImperf < 20) {
            tentativesImperf++;
            const randomIndex = Math.floor(Math.random() * imperfectionsPossibles.length);
            const imperfectionCandidate = imperfectionsPossibles[randomIndex];
            
            if (imperfectionCandidate && !imperfections.find(i => i.name === imperfectionCandidate.name)) {
                imperfections.push(imperfectionCandidate);
                console.log(`❌ Imperfection ajoutée: ${imperfectionCandidate.name}`);
            }
            
            imperfectionsPossibles.splice(randomIndex, 1);
        }
    } else {
        console.warn(`⚠️ Aucune liste d'imperfections trouvée (IMPERFECTIONS ou DEFAUTS)`);
    }
    
    console.log(`📊 Imperfections finales générées: ${imperfections.length}/${nbImperfections}`);



    const armureComplete = {
        nom: armure.nom,
        rarete: rarete.name, // **CORRECTION : Assigner explicitement**
        traits: traits,
        imperfections: imperfections,
        system: {
            rarete: rarete.name,
            typeArmure: armure.typeArmure,
            description: armure.description,
            encombrement: armure.encombrement || 6, // Valeur par défaut si non définie
            valeurOr: calculerValeurArmure(rarete.name, armure.typeArmure, traits.length, imperfections.length).formate,
            traits: traits,
            imperfections: imperfections,
            
        }
    };
    
    console.log(`🔧 === FIN GÉNÉRATION ARMURE INTERNE ===`);
    console.log(`📦 Armure complète:`, armureComplete);
    
    return armureComplete;
}

function calculerValeurArmure(rarete, typeArmure, nbTraits, nbImperfections) {
  let valeurBase = 0, valeurTrait = 0, valeurImperfection = 0;
  
  // Multiplicateur selon le type d'armure
  const multiplicateur = { "Légère": 1, "Moyenne": 1.25, "Lourde": 1.5 }[typeArmure] || 1;
  
  switch (rarete) {
    case "Commune":
      valeurBase = 200 * multiplicateur;
      valeurTrait = 100;
      valeurImperfection = 50;
      break;
    case "Rare":
      valeurBase = 20000 * multiplicateur;
      valeurTrait = 10000;
      valeurImperfection = 5000;
      break;
    case "Epic":
    case "Épique":
      valeurBase = 1200000 * multiplicateur;
      valeurTrait = 300000;
      valeurImperfection = 150000;
      break;
    default:
      return {
        brut: 0,
        formate: "0 PO",
        monnaie: "PO",
        couleur: "#FFD700"
      };
  }
  
  let valeur = valeurBase + (nbTraits * valeurTrait) - (nbImperfections * valeurImperfection);

  let monnaie = "PO";
  let couleur = "#FFD700"; // Or
  let valeurAffichee = valeur;

  if (valeur >= 1000000) {
    valeurAffichee = valeur / 1000000;
    monnaie = "PJ";
    couleur = "#00C781"; // Jade
  } else if (valeur >= 1000) {
    valeurAffichee = valeur / 1000;
    monnaie = "PP";
    couleur = "#E5E4E2"; // Platine
  }

  return {
    brut: valeur,
    formate: `${valeurAffichee} ${monnaie}`,
    monnaie,
    couleur
  };
}

function calculerNombreImperfections(rarete, nbTraits) {
    let result = 0;
    switch(rarete) {
        case "Commune":
            result = Math.max(0, nbTraits - 1);
            break;
        case "Rare":
            result = Math.max(0, nbTraits - 2);
            break;
        case "Epic":
            result = Math.max(0, nbTraits - 3);
            break;
        case "Legendaire":
            result = Math.max(0, nbTraits - 4);
            break;
        default:
            result = Math.max(0, nbTraits - 1);
    }
    console.log(`🎯 Calcul imperfections: ${rarete} avec ${nbTraits} traits = ${result} imperfections`);
    return result;
}

function genererNomArmure(armureObj) {
  // Récupère le nom de base
  const nomBase = armureObj?.nom || armureObj?.name || "Armure";
  // Récupère les noms des traits et imperfections
  const traits = armureObj?.system?.traits || [];
  const imperfections = armureObj?.system?.imperfections || [];

  // Prend la première imperfection comme adjectif devant le nom
  const imperf = imperfections[0]?.name ? imperfections[0].name : "";

  // Liste des traits, sans doublons, et qui ne sont pas déjà dans le nom ou l'imperfection
  const traitNoms = [...new Set(traits.map(t => t.nom))]
    .filter(t => t && t !== nomBase && t !== imperf);

  let nomFinal = nomBase;

  // Ajoute l'imperfection devant si présente et différente du nom de base
  if (imperf && imperf !== nomBase) nomFinal = `${imperf} ${nomFinal}`;

  // Ajoute les traits après, sous forme "de [trait1]" ou "de [trait1] et [trait2]"
  if (traitNoms.length === 1) {
    nomFinal += ` de ${traitNoms[0]}`;
  } else if (traitNoms.length > 1) {
    const last = traitNoms.pop();
    nomFinal += ` de ${traitNoms.join(", ")} et ${last}`;
  }

  return nomFinal.trim();
}

/**
 * Ajoute une armure générée dans un dossier "Stock d'Armures" (créé si besoin).
 * @param {Object} armure - L'objet armure généré par genererArmureAleatoire.
 */
async function ajouterArmureAuStock(armure) {
  // Cherche le dossier "Stock d'Armures" ou crée-le s'il n'existe pas
  let dossier = game.folders.find(f => f.name === "Stock d'Armures" && f.type === "Item");
  if (!dossier) {
    dossier = await Folder.create({
      name: "Stock d'Armures",
      type: "Item",
      color: "#8b4513"
    });
  }
  // Crée l'armure dans ce dossier
  await Item.create({
    name: armure.nom,
    type: "armure",
    system: armure.system,
    folder: dossier.id
  });
}

// Expose les fonctions pour macro ou autres scripts
window.ajouterArmureAuStock = ajouterArmureAuStock;
window.genererArmureAleatoire = genererArmureAleatoire;
window.genererNomArmure = genererNomArmure;
window.calculerValeurArmure = calculerValeurArmure;

Hooks.once("ready", () => {
  game.ajouterArmureAuStock = ajouterArmureAuStock;
  game.genererArmureAleatoire = genererArmureAleatoire;
  game.genererNomArmure = genererNomArmure;
  game.calculerValeurArmure = calculerValeurArmure;
});

// Exports
export { genererArmureAleatoire, genererNomArmure, ajouterArmureAuStock };