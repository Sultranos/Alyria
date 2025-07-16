import AlyriaItemSheet from "./sheet/AlyriaItemSheet.js";
import AlyriaActorSheet from "./sheet/AlyriaActorSheet.js";
import AlyriaActor from "./AlyriaActor.js";
import { genererArmeAleatoire, genererNomArme } from "./arme-generator.js";
import './accessoire-generator.js';
import './armure-generator.js';
import { 
    FOLIE_PSYCHIQUE_TABLE,
    TRAITS_ARMES_COMMUNS_TABLE,
    TRAITS_ARMES_RARES_TABLE,
    TRAITS_ARMES_EPIQUES_TABLE,
    TRAITS_ARMES_LEGENDAIRES_TABLE,      
    TRAITS_ARMURES_COMMUNS_TABLE,
    TRAITS_ARMURES_RARES_TABLE,
    TRAITS_ARMURES_EPIQUES_TABLE,
    TRAITS_ARMURES_LEGENDAIRES_TABLE,
    IMPERFECTIONS_TABLE } from "./TablesAleatoires.js";
import { TalentFonctions } from "./data/talentFonctions.js";
import { ParcheminJournal } from './data/parchemin.js';
import { JournauxAlyria } from './data/journauxAlyria.js';


Hooks.once("init", () => {
    console.log("Alyria | Initialisation du système Alyria");

    ParcheminJournal.init();
    JournauxAlyria.init();
    // **CORRECTION : Garder l'ancienne syntaxe pour compatibilité v13**
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("alyria", AlyriaItemSheet, { makeDefault: true });
    
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("alyria", AlyriaActorSheet, { makeDefault: true });

    // Configuration des acteurs
    CONFIG.Actor.documentClass = AlyriaActor; 
    CONFIG.Actor.Joueur = CONFIG.Actor.Joueur || {};
    CONFIG.Actor.Joueur.documentClass = AlyriaActor;
    
    // **AJOUTER : Enregistrer les helpers Handlebars**
    AlyriaActorSheet._registerHandlebarsHelpers();
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
    
    Handlebars.registerHelper('hasSituationalBonus', function(talents, caracteristique) {
    if (!talents || !Array.isArray(talents)) return false;
    
        return talents.some(talent => {
            // Vérifier si le talent a un bonus conditionnel pour cette caractéristique
            if (talent.effet && talent.effet.caracteristique === caracteristique && talent.effet.bonusConditionnel) {
                return true;
            }
            return false;
        });
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
    
    

Hooks.once('ready', async () => {
    console.log("🎲 Création des tables aléatoires d'Alyria");
    
    // **DÉFINITION : Toutes les tables avec nouvelle organisation**
    const tablesToCreate = [
        // Table de folie (dossier racine)
        {
            data: FOLIE_PSYCHIQUE_TABLE,
            folder: null
        },
        // Tables dans le dossier Crafts
        {
            data: IMPERFECTIONS_TABLE,
            folder: "Crafts"
        },
        // Tables de traits d'armes (sous-dossier de Crafts)
        {
            data: TRAITS_ARMES_COMMUNS_TABLE,
            folder: "Crafts/Traits d'Armes"
        },
        {
            data: TRAITS_ARMES_RARES_TABLE,
            folder: "Crafts/Traits d'Armes"
        },
        {
            data: TRAITS_ARMES_EPIQUES_TABLE,
            folder: "Crafts/Traits d'Armes"
        },
        {
            data: TRAITS_ARMES_LEGENDAIRES_TABLE,
            folder: "Crafts/Traits d'Armes"
        },
        // Tables de traits d'armures (sous-dossier de Crafts)
        {
            data: TRAITS_ARMURES_COMMUNS_TABLE,
            folder: "Crafts/Traits d'Armures"
        },
        {
            data: TRAITS_ARMURES_RARES_TABLE,
            folder: "Crafts/Traits d'Armures"
        },
        {
            data: TRAITS_ARMURES_EPIQUES_TABLE,
            folder: "Crafts/Traits d'Armures"
        },
        {
            data: TRAITS_ARMURES_LEGENDAIRES_TABLE,
            folder: "Crafts/Traits d'Armures"
        }
    ];
    
    // **ÉTAPE 1 : Créer la hiérarchie de dossiers**
    const folders = {};
    
    // Créer le dossier principal Crafts
    let craftsFolder = game.folders.find(f => f.name === "Crafts" && f.type === "RollTable");
    if (!craftsFolder) {
        try {
            craftsFolder = await Folder.create({
                name: "Crafts",
                type: "RollTable",
                color: "#8b5a2b",
                sort: 0
            });
            console.log(`📁 Dossier principal créé: Crafts`);
        } catch (error) {
            console.error(`❌ Erreur création dossier Crafts:`, error);
            return;
        }
    }
    folders["Crafts"] = craftsFolder;
    
    // Créer les sous-dossiers
    const subFolders = ["Traits d'Armes", "Traits d'Armures"];
    for (const subFolderName of subFolders) {
        const fullPath = `Crafts/${subFolderName}`;
        let existingFolder = game.folders.find(f => 
            f.name === subFolderName && 
            f.type === "RollTable" && 
            f.folder?.id === craftsFolder.id
        );
        
        if (!existingFolder) {
            try {
                existingFolder = await Folder.create({
                    name: subFolderName,
                    type: "RollTable",
                    folder: craftsFolder.id,
                    color: subFolderName.includes("Armes") ? "#ff6b35" : "#4ecdc4",
                    sort: subFolderName.includes("Armes") ? 1 : 2
                });
                console.log(`📁 Sous-dossier créé: ${fullPath}`);
            } catch (error) {
                console.error(`❌ Erreur création sous-dossier ${fullPath}:`, error);
                continue;
            }
        }
        folders[fullPath] = existingFolder;
    }
    
    // **ÉTAPE 2 : Créer toutes les tables**
    let createdCount = 0;
    let existingCount = 0;
    
    for (const tableConfig of tablesToCreate) {
        const tableData = tableConfig.data;
        const folderPath = tableConfig.folder;
        
        // **Vérifier si la table existe déjà**
        const existingTable = game.tables.find(t => t.name === tableData.name);
        
        if (!existingTable) {
            try {
                // **Préparer les données de la table**
                const createData = {
                    name: tableData.name,
                    description: tableData.description,
                    formula: tableData.formula
                };
                
                // **Ajouter le dossier si spécifié**
                if (folderPath && folders[folderPath]) {
                    createData.folder = folders[folderPath].id;
                }
                
                // **Créer la table**
                const table = await RollTable.create(createData);
                
                // **Créer les résultats**
                const results = tableData.results.map(result => ({
                    type: result.type,
                    text: result.text,
                    range: result.range,
                    drawn: false
                }));
                
                await table.createEmbeddedDocuments("TableResult", results);
                
                console.log(`✅ Table créée: "${tableData.name}" (${results.length} résultats) dans ${folderPath || "racine"}`);
                createdCount++;
                
            } catch (error) {
                console.error(`❌ Erreur création table "${tableData.name}":`, error);
            }
        } else {
            console.log(`✅ Table existante: "${tableData.name}"`);
            existingCount++;
        }
    }
    
    // **RÉSUMÉ**
    console.log(`📊 Résumé création tables:`);
    console.log(`   - Créées: ${createdCount}`);
    console.log(`   - Existantes: ${existingCount}`);
    console.log(`   - Total: ${tablesToCreate.length}`);
    
    if (createdCount > 0) {
        ui.notifications.success(`${createdCount} nouvelles tables créées dans l'organisation Crafts !`);
    }
    
    if (createdCount === 0 && existingCount === tablesToCreate.length) {
        console.log("ℹ️ Toutes les tables existent déjà");
    }
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
    console.log('🗞️ Système Alyria prêt - Parchemins activés');
    
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



Hooks.once('init', async function() {
    // ... autre code ...
    
    console.log("🎭 Alyria System | Chargement des générateurs...");
});

Hooks.once('ready', async function() {
    console.log("🎭 Alyria System | Ready");
    
    // **Vérifier que les générateurs sont chargés**
    if (game.genererArmeAleatoire) {
        console.log("✅ Générateur d'armes chargé");
    }
    if (game.genererArmureAleatoire) {
        console.log("✅ Générateur d'armures chargé");
    }
    if (game.genererAccessoireAleatoire) {
        console.log("✅ Générateur d'accessoires chargé");
    } else {
        console.warn("⚠️ Générateur d'accessoires non chargé");
    }
});

// **AJOUT dans Alyria.js - Synchronisation feuille acteur ↔ token**

// **1. Hook sur l'ouverture des feuilles**
Hooks.on("renderActorSheet", async (app, html, data) => {
    console.log(`📋 Feuille ouverte: ${app.actor.name}`);
    console.log(`🔍 UUID: ${app.actor.uuid}`);
    console.log(`🔍 Type: ${app.actor.isToken ? 'Token' : 'Base'}`);
    
    // **Synchroniser les données si c'est un token actor**
    if (app.actor.isToken) {
        await synchronizeTokenWithBaseActor(app.actor);
    }
});

// **2. Hook sur la fermeture des feuilles**
Hooks.on("closeActorSheet", async (app, html) => {
    console.log(`📋 Feuille fermée: ${app.actor.name}`);
    
    // **Si c'est un token actor, synchroniser vers l'acteur de base**
    if (app.actor.isToken) {
        await synchronizeTokenToBaseActor(app.actor);
    }
});

// **3. Hook sur les mises à jour d'acteur**
Hooks.on("updateActor", async (actor, changes, options, userId) => {
    console.log(`🔄 Mise à jour acteur: ${actor.name}`);
    
    // **Synchroniser les tokens liés**
    if (!actor.isToken) {
        await synchronizeBaseActorToTokens(actor);
    }
});

// **4. Hook sur les mises à jour de token**
Hooks.on("updateToken", async (tokenDoc, changes, options, userId) => {
    console.log(`🎭 Mise à jour token: ${tokenDoc.actor?.name}`);
    
    // **Synchroniser l'acteur de base si nécessaire**
    if (tokenDoc.actor && changes.actorData) {
        await synchronizeTokenToBaseActor(tokenDoc.actor);
    }
});

// **FONCTION 1 : Synchroniser Token → Acteur de base**
async function synchronizeTokenToBaseActor(tokenActor) {
    if (!tokenActor.isToken) return;
    
    try {
        const baseActor = game.actors.get(tokenActor.id);
        if (!baseActor) {
            console.warn(`⚠️ Acteur de base introuvable pour: ${tokenActor.name}`);
            return;
        }
        
        console.log(`🔄 Synchronisation Token → Base: ${tokenActor.name}`);
        
        // **Copier les données importantes**
        const syncData = {
            "system.inventaire": tokenActor.system.inventaire,
            "system.majeures": tokenActor.system.majeures,
            "system.mineures": tokenActor.system.mineures,
            "system.experience": tokenActor.system.experience,
            "system.sante": tokenActor.system.sante,
            "system.psyche": tokenActor.system.psyche,
            "system.talents": tokenActor.system.talents,
            "system.passifs": tokenActor.system.passifs,
            "system.sorts": tokenActor.system.sorts
        };
        
        // **Nettoyer les données undefined**
        Object.keys(syncData).forEach(key => {
            if (syncData[key] === undefined) {
                delete syncData[key];
            }
        });
        
        await baseActor.update(syncData);
        console.log(`✅ Synchronisation Token → Base terminée: ${tokenActor.name}`);
        
    } catch (error) {
        console.error(`❌ Erreur synchronisation Token → Base:`, error);
    }
}

// **FONCTION 2 : Synchroniser Acteur de base → Token**
async function synchronizeTokenWithBaseActor(tokenActor) {
    if (!tokenActor.isToken) return;
    
    try {
        const baseActor = game.actors.get(tokenActor.id);
        if (!baseActor) {
            console.warn(`⚠️ Acteur de base introuvable pour: ${tokenActor.name}`);
            return;
        }
        
        console.log(`🔄 Synchronisation Base → Token: ${tokenActor.name}`);
        
        // **Trouver le token sur la scène**
        const token = canvas.tokens?.placeables.find(t => t.actor === tokenActor);
        if (!token) {
            console.warn(`⚠️ Token introuvable sur la scène: ${tokenActor.name}`);
            return;
        }
        
        // **Copier les données de l'acteur de base**
        const syncData = {
            "actorData.system.inventaire": baseActor.system.inventaire,
            "actorData.system.majeures": baseActor.system.majeures,
            "actorData.system.mineures": baseActor.system.mineures,
            "actorData.system.experience": baseActor.system.experience,
            "actorData.system.sante": baseActor.system.sante,
            "actorData.system.psyche": baseActor.system.psyche,
            "actorData.system.talents": baseActor.system.talents,
            "actorData.system.passifs": baseActor.system.passifs,
            "actorData.system.sorts": baseActor.system.sorts
        };
        
        // **Nettoyer les données undefined**
        Object.keys(syncData).forEach(key => {
            if (syncData[key] === undefined) {
                delete syncData[key];
            }
        });
        
        await token.document.update(syncData);
        console.log(`✅ Synchronisation Base → Token terminée: ${tokenActor.name}`);
        
    } catch (error) {
        console.error(`❌ Erreur synchronisation Base → Token:`, error);
    }
}

// **FONCTION 3 : Synchroniser Base → Tous les tokens**
async function synchronizeBaseActorToTokens(baseActor) {
    try {
        const linkedTokens = canvas.tokens?.placeables.filter(t => 
            t.actor && t.actor.id === baseActor.id && t.actor.isToken
        ) || [];
        
        if (linkedTokens.length === 0) return;
        
        console.log(`🔄 Synchronisation Base → ${linkedTokens.length} tokens: ${baseActor.name}`);
        
        for (const token of linkedTokens) {
            const syncData = {
                "actorData.system.inventaire": baseActor.system.inventaire,
                "actorData.system.majeures": baseActor.system.majeures,
                "actorData.system.mineures": baseActor.system.mineures,
                "actorData.system.experience": baseActor.system.experience,
                "actorData.system.sante": baseActor.system.sante,
                "actorData.system.psyche": baseActor.system.psyche,
                "actorData.system.talents": baseActor.system.talents,
                "actorData.system.passifs": baseActor.system.passifs,
                "actorData.system.sorts": baseActor.system.sorts
            };
            
            // **Nettoyer les données undefined**
            Object.keys(syncData).forEach(key => {
                if (syncData[key] === undefined) {
                    delete syncData[key];
                }
            });
            
            await token.document.update(syncData);
        }
        
        console.log(`✅ Synchronisation Base → Tokens terminée: ${baseActor.name}`);
        
    } catch (error) {
        console.error(`❌ Erreur synchronisation Base → Tokens:`, error);
    }
}

// **FONCTION 4 : Forcer la synchronisation avant ouverture**
Hooks.on("preRenderActorSheet", async (app, html, data) => {
    console.log(`🔍 Pré-rendu feuille: ${app.actor.name} (${app.actor.isToken ? 'Token' : 'Base'})`);
    
    // **Synchronisation préventive**
    if (app.actor.isToken) {
        // **S'assurer que le token a les dernières données**
        await synchronizeTokenWithBaseActor(app.actor);
    } else {
        // **S'assurer que les tokens sont à jour**
        await synchronizeBaseActorToTokens(app.actor);
    }
});

// **FONCTION 5 : Macro manuelle de synchronisation**
window.synchronizeActorData = async function(actorId) {
    const actor = game.actors.get(actorId);
    if (!actor) {
        ui.notifications.error("Acteur introuvable !");
        return;
    }
    
    console.log(`🔄 Synchronisation manuelle: ${actor.name}`);
    
    // **Synchroniser dans les deux sens**
    await synchronizeBaseActorToTokens(actor);
    
    const linkedTokens = canvas.tokens?.placeables.filter(t => 
        t.actor && t.actor.id === actor.id && t.actor.isToken
    ) || [];
    
    for (const token of linkedTokens) {
        await synchronizeTokenToBaseActor(token.actor);
    }
    
    ui.notifications.success(`Synchronisation terminée pour ${actor.name} !`);
};

// **FONCTION 6 : Auto-refresh des feuilles ouvertes**
Hooks.on("updateActor", (actor, changes, options, userId) => {
    // **Rafraîchir toutes les feuilles ouvertes de cet acteur**
    Object.values(ui.windows).forEach(app => {
        if (app instanceof ActorSheet && 
            (app.actor.id === actor.id || 
             (app.actor.isToken && app.actor.id === actor.id))) {
            
            console.log(`🔄 Refresh feuille: ${app.actor.name}`);
            app.render(false); // Refresh sans recalculer
        }
    });
});

console.log("✅ Système de synchronisation Token ↔ Acteur installé");

// **AJOUT : Bouton de synchronisation dans les feuilles**
Hooks.on("renderActorSheet", (app, html, data) => {
    // **Ajouter un bouton de synchronisation**
    const header = html.find('.window-header');
    if (header.length > 0) {
        const syncButton = $(`
            <a class="sync-actor-data" title="Synchroniser les données">
                <i class="fas fa-sync-alt"></i>
            </a>
        `);
        
        syncButton.click(async (event) => {
            event.preventDefault();
            console.log(`🔄 Synchronisation manuelle demandée: ${app.actor.name}`);
            
            if (app.actor.isToken) {
                await synchronizeTokenToBaseActor(app.actor);
                await synchronizeTokenWithBaseActor(app.actor);
            } else {
                await synchronizeBaseActorToTokens(app.actor);
            }
            
            // **Refresh la feuille**
            app.render(true);
            
            ui.notifications.success("Synchronisation terminée !");
        });
        
        header.find('.close').before(syncButton);
    }
});
})
