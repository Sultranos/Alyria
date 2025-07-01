import AlyriaItemSheet from "./sheet/AlyriaItemSheet.js";
import AlyriaActorSheet from "./sheet/AlyriaActorSheet.js";
import AlyriaActor from "./AlyriaActor.js";
import { genererArmeAleatoire, genererNomArme } from "./arme-generator.js";

Hooks.once("init", () => {
    console.log("Alyria | Initialisation du système Alyria");

    // **CORRECTION : Garder l'ancienne syntaxe pour compatibilité v13**
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("alyria", AlyriaItemSheet, { makeDefault: true });
    
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("alyria", AlyriaActorSheet, { makeDefault: true });

    // Configuration des acteurs
    CONFIG.Actor.documentClass = AlyriaActor; 
    CONFIG.Actor.Joueur = CONFIG.Actor.Joueur || {};
    CONFIG.Actor.Joueur.documentClass = AlyriaActor;

    console.log("Alyria | Fiches d'acteurs et d'objets enregistrées");

    // **HANDLEBARS : Tous les helpers en une seule fois**
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
    
    Handlebars.registerHelper('lte', function(a, b) {
        return a <= b;
    });
    
    Handlebars.registerHelper('mul', function(a, b) {
        return a * b;
    });
    
    Handlebars.registerHelper('div', function(a, b) {
        return Math.floor(a / b);
    });

    Handlebars.registerHelper('toLowerCase', function(str) {
        return str ? str.toLowerCase() : '';
    });
    
    Handlebars.registerHelper('capitalize', function(value) {
        if (typeof value !== 'string') return value;
        return value.charAt(0).toUpperCase() + value.slice(1);
    });
    
    Handlebars.registerHelper('includes', function(array, value) {
        return Array.isArray(array) && array.includes(value);
    });
    
    Handlebars.registerHelper('range', function(count) {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(i);
        }
        return result;
    });
    
    Handlebars.registerHelper('split', function(str, separator) {
        return str ? str.split(separator) : [];
    });
    
    Handlebars.registerHelper('last', function(array) {
        return Array.isArray(array) && array.length > 0 ? array[array.length - 1] : '';
    });
    
    Handlebars.registerHelper('extractSpellName', function(sortId) {
        if (!sortId) return 'Sort inconnu';
        const parts = sortId.split(':');
        return parts[parts.length - 1] || 'Sort inconnu';
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

// **AJOUT dans module/alyria.js - Hook global pour tous les nouveaux acteurs**
Hooks.once('ready', async function() {
    console.log("🎭 Alyria System | Ready");
    
    // **NOUVEAU : Migration automatique pour tous les acteurs existants**
    await migrateAllActorsInventory();
});

// **NOUVELLE FONCTION : Migrer tous les acteurs existants**
async function migrateAllActorsInventory() {
    console.log("🔄 Migration globale des inventaires...");
    
    const alyriaActors = game.actors.filter(actor => actor.type === "Joueur");
    let migratedCount = 0;
    
    for (const actor of alyriaActors) {
        try {
            const inventory = actor.system.inventaire || InventoryManager.initializeInventory();
            const foundryItems = actor.items.contents;
            const inventoryItemIds = inventory.items || [];
            
            const missingItems = foundryItems.filter(item => !inventoryItemIds.includes(item.id));
            
            if (missingItems.length > 0) {
                const allItemIds = [...inventoryItemIds, ...missingItems.map(item => item.id)];
                
                await actor.update({
                    'system.inventaire.items': allItemIds
                });
                
                console.log(`✅ ${actor.name}: ${missingItems.length} items migrés`);
                migratedCount++;
            }
        } catch (error) {
            console.error(`❌ Erreur migration ${actor.name}:`, error);
        }
    }
    
    if (migratedCount > 0) {
        ui.notifications.info(`Migration terminée : ${migratedCount} acteurs mis à jour !`);
        console.log(`📊 Migration globale terminée: ${migratedCount} acteurs mis à jour`);
    } else {
        console.log("ℹ️ Aucune migration nécessaire");
    }
}

// **Hook pour les nouveaux items créés**
Hooks.on("createItem", async (item, options, userId) => {
    if (item.parent && item.parent.type === "Joueur") {
        const actor = item.parent;
        
        // **S'assurer que l'inventaire existe**
        let inventory = actor.system.inventaire;
        if (!inventory) {
            inventory = InventoryManager.initializeInventory();
            await actor.update({ 'system.inventaire': inventory });
        }
        
        // **Ajouter l'item à l'inventaire s'il n'y est pas**
        const items = inventory.items || [];
        if (!items.includes(item.id)) {
            const updatedItems = [...items, item.id];
            
            await actor.update({
                'system.inventaire.items': updatedItems
            });
            
            console.log(`📦 Item auto-ajouté: ${item.name} → ${actor.name}`);
        }
    }
});