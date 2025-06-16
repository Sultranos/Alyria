import { TRAITS } from "./data/traits.js";
import { IMPERFECTIONS } from "./data/imperfections.js";
import { DEGATS_PAR_RARETE } from "./data/Particularites.js";
import { ARMES } from "./data/armes.js";



// Probabilités de rareté selon le niveau du joueur
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

// Filtre les traits accessibles selon la rareté de l'arme
function traitsPourRareté(rarete) {
  const index = ["Commune", "Rare", "Epic", "Legendaire"].indexOf(rarete);
  return TRAITS.filter(t => ["Commune", "Rare", "Epic", "Legendaire"].indexOf(t.rarete) <= index);
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

const TOUCHES = ["Force", "Dexterite", "Charisme", "Sagesse"];

// Générateur principal
function genererArmeAleatoire(niveau = "Novice") {
  const arme = randomFromArray(ARMES);
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

  // Calcul des dégâts selon rareté et nombre de mains
  const degatsInfo = DEGATS_PAR_RARETE[rarete.name][arme.mains];
  const degats = degatsInfo.de;
  const bonusDegats = degatsInfo.bonus;
  const touche = randomFromArray(TOUCHES);

  // Ne compose pas le nom ici !
  // const nom = `${arme.nom} ${traits.map(t => t.name).join(" ")} ${rarete.name}`;
  // Utilise juste le nom de base
  const nom = arme.nom;
  const encombrement = arme.encombrement || 1; // Valeur par défaut si non définie

  const valeur = calculerValeurArme(
    rarete.name,
    arme.mains,
    traits.length,
    imperfections.length
  );

  return {
    nom, // <-- nom de base
    type: "arme",
    system: { 
      rarete: rarete.name,
      categorie: arme.categorie,
      degatsType: arme.degatsType,
      mains: arme.mains,
      description: arme.description || "",
      encombrement,
      traits,
      imperfections,
      degats,
      bonusDegats,
      touche,
      valeur
    }
  };
}

function calculerValeurArme(rarete, mains, nbTraits, nbImperfections) {
  let valeurBase = 0, valeurTrait = 0, valeurImperfection = 0;
  switch (rarete) {
    case "Commune":
      valeurBase = (mains === 1) ? 150 : 300;
      valeurTrait = 100;
      valeurImperfection = 50;
      break;
    case "Rare":
      valeurBase = (mains === 1) ? 15000 : 30000;
      valeurTrait = 10000;
      valeurImperfection = 5000;
      break;
    case "Epic":
    case "Épique":
      valeurBase = (mains === 1) ? 900000 : 1500000;
      valeurTrait = 300000;
      valeurImperfection = 150000;
      break;
    default:
      return {
        brut: 0,
        formate: "0 PO",
        monnaie: "PO",
        couleur: "#FFD700" // Or
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

function genererNomArme(armeObj) {
  // Récupère le nom de base
  const nomBase = armeObj?.nom || armeObj?.name || "Arme";
  // Récupère les noms des traits et imperfections
  const traits = armeObj?.system?.traits || [];
  const imperfections = armeObj?.system?.imperfections || [];

  // Prend la première imperfection comme adjectif devant le nom
  const imperf = imperfections[0]?.name ? imperfections[0].name : "";

  // Liste des traits, sans doublons, et qui ne sont pas déjà dans le nom ou l'imperfection
  const traitNoms = [...new Set(traits.map(t => t.name))]
    .filter(t => t && t !== nomBase && t !== imperf);

  let nomFinal = nomBase;

  // Ajoute l’imperfection devant si présente et différente du nom de base
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
 * Ajoute une arme générée dans un dossier "Stock d'Armes" (créé si besoin).
 * @param {Object} arme - L'objet arme généré par genererArmeAleatoire.
 */
async function ajouterArmeAuStock(arme) {
  // Cherche le dossier "Stock d'Armes" ou crée-le s'il n'existe pas
  let dossier = game.folders.find(f => f.name === "Stock d'Armes" && f.type === "Item");
  if (!dossier) {
    dossier = await Folder.create({
      name: "Stock d'Armes",
      type: "Item",
      color: "#b8860b"
    });
  }
  // Crée l'arme dans ce dossier
  await Item.create({
    name: arme.nom, // <-- Correction ici
    type: "arme",
    system: arme.system,
    folder: dossier.id
  });
}

// Expose la fonction pour macro ou autres scripts
window.ajouterArmeAuStock = ajouterArmeAuStock;
Hooks.once("ready", () => {
  game.ajouterArmeAuStock = ajouterArmeAuStock;
});

window.genererArmeAleatoire = genererArmeAleatoire;
window.genererNomArme = genererNomArme;
window.calculerValeurArme = calculerValeurArme;

Hooks.once("ready", () => {
  game.genererArmeAleatoire = genererArmeAleatoire;
  game.genererNomArme = genererNomArme;
  game.calculerValeurArme = calculerValeurArme;
});

// À la fin du fichier, ajoutez les exports :
export { genererArmeAleatoire, genererNomArme, ajouterArmeAuStock };