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
  const index = ["Commune", "Rare", "Epic", "Legendaire"].indexOf(rarete);
  return TRAIT_ARMURE.filter(t => ["Commune", "Rare", "Epic", "Legendaire"].indexOf(t.rareté) <= index);
}

// Tire une rareté selon les probabilités du niveau
function randomRarity(niveau) {
  const table = RARETES_PAR_NIVEAU[niveau] || RARETES_PAR_NIVEAU.Novice;
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
  const armure = randomFromArray(ARMURES);
  const rarete = randomRarity(niveau);
  const nbTraits = Math.floor(Math.random() * rarete.maxTraits) + 1;
  const nbImperfections = Math.max(0, rarete.maxImperfections);

  // Traits uniques compatibles avec la rareté
  const traitsPossibles = traitsPourRareté(rarete.name);
  const traits = [];
  while (traits.length < nbTraits && traitsPossibles.length > 0) {
    const t = randomFromArray(traitsPossibles);
    if (!traits.includes(t)) traits.push(t);
  }

  // Imperfections uniques
  const imperfections = [];
  while (imperfections.length < nbImperfections && IMPERFECTIONS.length > 0) {
    const i = randomFromArray(IMPERFECTIONS);
    if (!imperfections.includes(i)) imperfections.push(i);
  }

  // Utilise juste le nom de base
  const nom = armure.nom;
  const encombrement = armure.encombrement || 1;

  const valeur = calculerValeurArmure(
    rarete.name,
    armure.typeArmure,
    traits.length,
    imperfections.length
  );

  return {
    nom,
    type: "armure",
    system: { 
      rarete: rarete.name,
      typeArmure: armure.typeArmure,
      description: armure.description || "",
      encombrement,
      traits,
      imperfections,
      valeurOr: valeur.formate
    }
  };
}

function calculerValeurArmure(rarete, typeArmure, nbTraits, nbImperfections) {
  let valeurBase = 0, valeurTrait = 0, valeurImperfection = 0;
  
  // Multiplicateur selon le type d'armure
  const multiplicateur = { "Légère": 1, "Moyenne": 1.5, "Lourde": 2 }[typeArmure] || 1;
  
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