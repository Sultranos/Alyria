import AlyriaItemSheet from "./sheet/AlyriaItemSheet.js";
import AlyriaActorSheet from "./sheet/AlyriaActorSheet.js";
import AlyriaActor from "./AlyriaActor.js";
import AlyriaStuffSheet from "./sheet/AlyriaStuffSheet.js";
import { genererArmeAleatoire, genererNomArme } from "./arme-generator.js";

Hooks.once("init", () => {
    console.log("Alyria | Initialisation du système Alyria");

    // Register the AlyriaItemSheet
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("alyria", AlyriaItemSheet, { makeDefault: true });

    // Register the AlyriaActorSheet
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("alyria", AlyriaActorSheet, { makeDefault: true });

    // Enregistre la classe d'acteur personnalisée pour le type "Joueur"
    CONFIG.Actor.documentClass = AlyriaActor; 
    
    CONFIG.Actor.Joueur = CONFIG.Actor.Joueur || {};
    CONFIG.Actor.Joueur.documentClass = AlyriaActor;

    // Enregistrer la feuille d'item
    Items.registerSheet("alyria", AlyriaStuffSheet, {
        types: ["arme", "armure", "objet", "accessoire", "consommable"],
        makeDefault: true
    });

    console.log("Alyria | Fiches d'acteurs et d'objets enregistrées");
});

Hooks.once('init', function() {
    // **HANDLEBARS : Ajouter les helpers manquants**
    Handlebars.registerHelper('sub', function(a, b) {
        return (a || 0) - (b || 0);
    });
    
    Handlebars.registerHelper('add', function(a, b) {
        return (a || 0) + (b || 0);
    });
    
    Handlebars.registerHelper('eq', function(a, b) {
        return a === b;
    });
    
    Handlebars.registerHelper('gt', function(a, b) {
        return a > b;
    });
    
    Handlebars.registerHelper('mul', function(a, b) {
        return a * b;
    });
    
    Handlebars.registerHelper('div', function(a, b) {
        return Math.floor(a / b);
    });
    
    Handlebars.registerHelper('capitalize', function(value) {
        if (typeof value !== 'string') {
            return value;}
        return value.charAt(0).toUpperCase() + value.slice(1);
    })
    Handlebars.registerHelper('includes', function(array, value) {
      return Array.isArray(array) && array.includes(value);
    });
    
    // Helper Handlebars pour créer une range de nombres
    Handlebars.registerHelper('range', function(count) {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(i);
        }
        return result;
    });
    
    // Helper pour comparer des nombres
    Handlebars.registerHelper('gt', function(a, b) {
        return a > b;
    });
});

// **NOUVEAU : Système d'unicité des armes**
Hooks.on('preCreateItem', async (item, data, options, userId) => {
    // Vérifier uniquement pour les armes
    if (item.type !== 'arme') return;
    
    const itemName = item.name;
    console.log(`🔍 Vérification d'unicité pour: ${itemName}`);
    
    // Chercher dans tous les acteurs
    for (let actor of game.actors) {
        const existingItem = actor.items.find(i => i.name === itemName && i.type === 'arme');
        if (existingItem) {
            ui.notifications.error(`❌ L'arme "${itemName}" existe déjà dans l'inventaire de ${actor.name} !`);
            console.log(`❌ Arme dupliquée détectée: ${itemName} chez ${actor.name}`);
            return false; // Empêcher la création
        }
    }
    
    // Chercher dans les compendiums s'ils sont ouverts
    for (let pack of game.packs) {
        if (pack.documentName === "Item") {
            const items = await pack.getDocuments();
            const existingItem = items.find(i => i.name === itemName && i.type === 'arme');
            if (existingItem) {
                console.log(`⚠️ Arme trouvée dans le compendium: ${pack.title}`);
                // Ne pas bloquer, juste informer
            }
        }
    }
    
    console.log(`✅ Arme unique confirmée: ${itemName}`);
});

// **NOUVEAU : Empêcher les transferts d'armes déjà possédées**
Hooks.on('preUpdateActor', async (actor, data, options, userId) => {
    // Vérifier s'il y a des nouveaux items ajoutés
    if (!data.items) return;
    
    for (let itemData of data.items) {
        if (itemData.type === 'arme') {
            const itemName = itemData.name;
            
            // Chercher dans les autres acteurs
            for (let otherActor of game.actors) {
                if (otherActor.id === actor.id) continue; // Ignorer l'acteur courant
                
                const existingItem = otherActor.items.find(i => i.name === itemName && i.type === 'arme');
                if (existingItem) {
                    ui.notifications.error(`❌ L'arme "${itemName}" existe déjà chez ${otherActor.name} !`);
                    return false; // Empêcher la mise à jour
                }
            }
        }
    }
});

Hooks.once("ready", function() {
    // Rendre les fonctions disponibles globalement
    game.genererArmeAleatoire = genererArmeAleatoire;
    game.genererNomArme = genererNomArme;
    
    console.log("Alyria | Générateur d'armes chargé");
});