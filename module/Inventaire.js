export class InventoryManager {
    
    // **INITIALISATION : Créer l'inventaire vide**
    static initializeInventory() {
        return {
            slots: Array(20).fill(null),
            encombrement: {
                actuel: 0,
                max: 20
            },
            armeEquipee: null,
            armureEquipee: null,
            accessoire1: null,
            accessoire2: null
        };
    }

    // **CALCUL : Encombrement total optimisé**
    static calculateEncumbrance(slots) {
        if (!slots || !Array.isArray(slots)) return 0;
        
        const uniqueItems = new Map();
        
        // Compter chaque item unique
        slots.forEach(slot => {
            if (slot && slot.id) {
                if (!uniqueItems.has(slot.id)) {
                    uniqueItems.set(slot.id, slot.system?.encombrement || 1);
                }
            }
        });
        
        // Sommer les encombrements
        let total = 0;
        uniqueItems.forEach(encombrement => {
            total += encombrement;
        });
        
        return total;
    }

    // **RECHERCHE : Trouver des slots libres consécutifs**
    static findFreeSlots(slots, encombrement) {
        if (!slots || !Array.isArray(slots) || encombrement <= 0) return -1;
        
        for (let i = 0; i <= slots.length - encombrement; i++) {
            let canPlace = true;
            for (let j = 0; j < encombrement; j++) {
                if (slots[i + j] !== null) {
                    canPlace = false;
                    break;
                }
            }
            if (canPlace) return i;
        }
        return -1;
    }

    // **AJOUT : Ajouter un item à l'inventaire**
    static async addItemToInventory(actor, item) {
        const inventory = actor.system.inventaire || this.initializeInventory();
        const slots = [...inventory.slots];
        
        // Récupérer l'encombrement depuis les données de l'item ou le fichier ARMES
        let encombrement = item.system?.encombrement || 1;
        
        // Si pas d'encombrement défini, essayer de le trouver dans ARMES
        if (!item.system?.encombrement && item.type === "arme") {
            try {
                const { ARMES } = await import("./data/armes.js"); // **ENLEVER le "../"**
                const armeData = ARMES.find(a => a.nom === item.name);
                if (armeData) {
                    encombrement = armeData.encombrement;
                    console.log(`📦 Encombrement trouvé pour ${item.name}: ${encombrement}`);
                }
            } catch (error) {
                console.log("Impossible de charger armes.js, utilisation de l'encombrement par défaut");
            }
        }
        
        console.log(`📦 Ajout de ${item.name} - Encombrement: ${encombrement}`);
        
        // Trouver un emplacement libre
        const freeSlotIndex = this.findFreeSlots(slots, encombrement);
        
        if (freeSlotIndex === -1) {
            ui.notifications.error("Inventaire plein ! Impossible d'ajouter l'objet.");
            return false;
        }
        
        // Créer les données de l'objet avec l'encombrement correct
        const itemData = {
            id: item.id,
            name: item.name,
            type: item.type,
            img: item.img,
            system: {
                ...item.system,
                encombrement: encombrement // S'assurer que l'encombrement est correct
            }
        };
        
        // Placer l'objet dans les slots
        for (let i = 0; i < encombrement; i++) {
            slots[freeSlotIndex + i] = itemData;
        }
        
        // Calculer le nouvel encombrement
        const nouvelEncombrement = this.calculateEncumbrance(slots);
        
        // Mettre à jour l'acteur
        await actor.update({
            'system.inventaire.slots': slots,
            'system.inventaire.encombrement.actuel': nouvelEncombrement
        });
        
        console.log(`✅ ${item.name} ajouté à l'inventaire (${encombrement} slots)`);
        return true;
    }

    // **SUPPRESSION : Retirer un item**
    static async removeItemFromInventory(actor, itemId) {
        const inventory = actor.system.inventaire || this.initializeInventory();
        const slots = [...inventory.slots];
        
        // Retirer toutes les occurrences de l'objet
        let itemRemoved = false;
        for (let i = 0; i < slots.length; i++) {
            if (slots[i] && slots[i].id === itemId) {
                slots[i] = null;
                itemRemoved = true;
            }
        }
        
        if (!itemRemoved) {
            ui.notifications.warn("Objet non trouvé dans l'inventaire !");
            return false;
        }
        
        // Calculer le nouvel encombrement
        const nouvelEncombrement = this.calculateEncumbrance(slots);
        
        // **NOUVEAU : Supprimer aussi l'item de l'acteur**
        const item = actor.items.get(itemId);
        if (item) {
            await item.delete();
            console.log(`🗑️ Item supprimé de l'acteur: ${item.name}`);
        }
        
        // Mettre à jour l'inventaire
        await actor.update({
            'system.inventaire.slots': slots,
            'system.inventaire.encombrement.actuel': nouvelEncombrement
        });
        
        console.log(`✅ Objet retiré de l'inventaire`);
        ui.notifications.info("Objet supprimé !");
        return true;
    }

    // **ÉQUIPEMENT : Équiper depuis l'inventaire**
    static async equipItemFromInventory(actor, itemId, equipType) {
        const inventory = actor.system.inventaire || this.initializeInventory();
        const slot = inventory.slots.find(s => s && s.id === itemId);
        
        if (!slot) {
            ui.notifications.error("Objet non trouvé dans l'inventaire !");
            return false;
        }
        
        // **CORRECTION : Équiper SANS retirer de l'inventaire**
        const updatePath = `system.inventaire.${equipType}Equipee`;
        
        try {
            await actor.update({
                [updatePath]: slot
            });
            
            ui.notifications.info(`${slot.name} équipé !`);
            console.log(`✅ ${slot.name} équipé depuis l'inventaire`);
            return true;
        } catch (error) {
            console.error("Erreur lors de l'équipement:", error);
            ui.notifications.error("Erreur lors de l'équipement");
            return false;
        }
    }

    // **VALIDATION : Vérifier si l'inventaire est valide**
    static validateInventory(inventory) {
        if (!inventory) return this.initializeInventory();
        
        if (!inventory.slots || !Array.isArray(inventory.slots)) {
            inventory.slots = Array(20).fill(null);
        }
        
        if (!inventory.encombrement) {
            inventory.encombrement = { actuel: 0, max: 20 };
        }
        
        return inventory;
    }

    // **DONNÉES : Préparer les données pour le template - VERSION COMPLÈTE**
    static async prepareInventoryData(actor) {
        // **ÉTAPE 1 : Initialiser l'inventaire de base**
        let inventory = actor.system.inventaire || this.initializeInventory();
        inventory = this.validateInventory(inventory);
        
        // **ÉTAPE 2 : S'assurer qu'on a 20 slots**
        if (!inventory.slots || inventory.slots.length !== 20) {
            inventory.slots = Array(20).fill(null);
        }
        
        // **ÉTAPE 3 : Créer la structure de retour**
        const inventaire = {
            armeEquipee: inventory.armeEquipee || null,
            armureEquipee: inventory.armureEquipee || null,
            accessoire1: inventory.accessoire1 || null,
            accessoire2: inventory.accessoire2 || null,
            slots: [...inventory.slots],
            encombrement: {
                actuel: 0,
                max: inventory.encombrement?.max || 20
            },
            slotsLibres: 0,
            surcharge: false
        };

        // **ÉTAPE 4 : Ajouter les items Foundry non équipés**
        const foundryItems = actor.items.contents.filter(item => 
            ['arme', 'armure', 'accessoire', 'consommable'].includes(item.type)
        );

        console.log(`🔍 Items Foundry trouvés: ${foundryItems.length}`);

        // Vérifier quels items ne sont pas déjà dans les slots
        const slotsItemIds = inventaire.slots
            .filter(slot => slot !== null)
            .map(slot => slot.id);

        // Exclure les items équipés
        const equippedItemIds = [];
        if (inventaire.armeEquipee?.id) equippedItemIds.push(inventaire.armeEquipee.id);

        const itemsNotInSlots = foundryItems.filter(item => 
            !slotsItemIds.includes(item.id) && !equippedItemIds.includes(item.id)
        );

        console.log(`📦 Items à ajouter aux slots (non équipés): ${itemsNotInSlots.length}`);

        // **ÉTAPE 5 : Ajouter les items manquants**
        let currentSlotIndex = 0;
        for (const item of itemsNotInSlots) {
            // Trouver le prochain slot libre
            while (currentSlotIndex < inventaire.slots.length && inventaire.slots[currentSlotIndex] !== null) {
                currentSlotIndex++;
            }

            if (currentSlotIndex < inventaire.slots.length) {
                let encombrement = 1;
                
                if (item.type === "arme") {
                    encombrement = await this.getEncombrementFromArmes(item.name);
                } else {
                    encombrement = item.system?.encombrement || 1;
                }

                inventaire.slots[currentSlotIndex] = {
                    id: item.id,
                    name: item.name,
                    img: item.img,
                    type: item.type,
                    system: {
                        encombrement: encombrement,
                        ...item.system
                    }
                };
                
                console.log(`✅ Item ajouté au slot ${currentSlotIndex}: ${item.name} (encombrement: ${encombrement})`);
                currentSlotIndex++;
            }
        }

        // **ÉTAPE 6 : Calculer l'encombrement actuel**
        inventaire.encombrement.actuel = inventaire.slots
            .filter(slot => slot !== null)
            .reduce((total, slot) => {
                const enc = slot.system?.encombrement || 1;
                console.log(`Encombrement de ${slot.name}: ${enc}`);
                return total + enc;
            }, 0);

        // **ÉTAPE 7 : Calculer les slots libres et surcharge**
        inventaire.slotsLibres = inventaire.slots.filter(slot => slot === null).length;
        inventaire.surcharge = inventaire.encombrement.actuel > inventaire.encombrement.max;

        console.log(`📊 Inventaire final - Encombrement: ${inventaire.encombrement.actuel}/${inventaire.encombrement.max}, Slots libres: ${inventaire.slotsLibres}`);

        return inventaire;
    }

    // **SYNCHRONISATION : Sauvegarder les changements dans l'acteur**
    static async synchronizeInventory(actor, inventoryData) {
        try {
            await actor.update({
                'system.inventaire.slots': inventoryData.slots,
                'system.inventaire.encombrement.actuel': inventoryData.encombrement.actuel
            });
            console.log("✅ Inventaire synchronisé avec l'acteur");
            return true;
        } catch (error) {
            console.error("❌ Erreur lors de la synchronisation:", error);
            return false;
        }
    }

    // **CORRECTION : Chemin d'import correct pour armes.js**
    static async getEncombrementFromArmes(itemName) {
        try {
            const { ARMES } = await import("./data/armes.js"); // **ENLEVER le "../"**
            const armeData = ARMES.find(a => a.nom === itemName);
            if (armeData) {
                console.log(`✅ Encombrement trouvé pour ${itemName}: ${armeData.encombrement}`);
                return armeData.encombrement;
            }
            console.log(`⚠️ Arme non trouvée dans armes.js: ${itemName}`);
            return 1;
        } catch (error) {
            console.log(`⚠️ Fallback encombrement pour ${itemName}: 1`);
            return 1; // **CORRECTION : Fallback silencieux**
        }
    }
}