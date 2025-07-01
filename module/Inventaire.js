export class InventoryManager {
    
    // **INITIALISATION : Créer l'inventaire vide**
    static initializeInventory() {
        return {
            items: [], // **NOUVEAU : Liste simple d'IDs d'items**
            encombrement: {
                actuel: 0,
                max: 20
            },
            armeEquipee: null,
            armeSecondaireEquipee: null, 
            armureEquipee: null,
            accessoire1: null,
            accessoire2: null
        };
    }

    // **CALCUL : Encombrement total des items dans l'inventaire**
    // **CORRECTION : calculateTotalEncumbrance pour le nouveau système**
    // **AMÉLIORATION avec plus de sécurité**
    static calculateTotalEncumbrance(actor) {
        try {
            const inventory = actor.system.inventaire || this.initializeInventory();
            let total = 0;
            
            console.log("📊 Calcul encombrement total (inventaire + équipements)");
            
            // **ÉTAPE 1 : Encombrement des items dans l'inventaire**
            if (inventory.items && Array.isArray(inventory.items)) {
                inventory.items.forEach(itemId => {
                    const item = actor.items.get(itemId);
                    if (item) {
                        const encombrement = parseInt(item.system?.encombrement) || 1;
                        total += encombrement;
                        console.log(`📦 Inventaire - ${item.name}: ${encombrement} enc.`);
                    }
                });
            }
            
            // **ÉTAPE 2 : Encombrement des équipements (s'ils ne sont pas dans l'inventaire)**
            const equipments = [
                { key: 'armeEquipee', name: 'Arme équipée' },
                { key: 'armeSecondaireEquipee', name: 'Arme secondaire' },
                { key: 'armureEquipee', name: 'Armure équipée' },
                { key: 'accessoire1', name: 'Accessoire 1' },
                { key: 'accessoire2', name: 'Accessoire 2' }
            ];
            
            for (const equipment of equipments) {
                const equipped = inventory[equipment.key];
                if (equipped && equipped.id) {
                    // **Vérifier si l'item équipé est aussi dans l'inventaire**
                    const isInInventory = inventory.items && inventory.items.includes(equipped.id);
                    
                    if (!isInInventory) {
                        // **L'item équipé n'est pas dans l'inventaire, compter son encombrement**
                        const encombrement = parseInt(equipped.system?.encombrement) || 1;
                        total += encombrement;
                        console.log(`⚔️ Équipé - ${equipped.name}: ${encombrement} enc.`);
                    } else {
                        console.log(`⚔️ Équipé - ${equipped.name}: déjà compté dans l'inventaire`);
                    }
                }
            }
            
            console.log(`📊 Encombrement total final: ${total}/${inventory.encombrement?.max || 20}`);
            return total;
            
        } catch (error) {
            console.error("❌ Erreur dans calculateTotalEncumbrance:", error);
            return 0;
        }
    }

    // **AJOUT : Ajouter un item à l'inventaire**
    // **CORRECTION : addItemToInventory avec vérification d'initialisation**
    static async addItemToInventory(actor, item) {
        let inventory = actor.system.inventaire || this.initializeInventory();
        
        // **CORRECTION : S'assurer que la structure existe**
        if (!inventory.items || !Array.isArray(inventory.items)) {
            console.log("🆕 Initialisation de la liste d'items");
            inventory.items = [];
            
            // Mettre à jour l'acteur avec la structure corrigée
            await actor.update({
                'system.inventaire': inventory
            });
            
            // Récupérer la version mise à jour
            inventory = actor.system.inventaire;
        }
        
        // Vérifier si l'item est déjà dans l'inventaire
        if (inventory.items.includes(item.id)) {
            ui.notifications.warn(`${item.name} est déjà dans l'inventaire !`);
            return false;
        }
        
        // Calculer l'encombrement de l'item
        let encombrement = parseInt(item.system?.encombrement) || 1;
        
        // **Encombrement par défaut selon le type**
        if (!item.system?.encombrement) {
            switch (item.type) {
                case "armure":
                    encombrement = 6;
                    break;
                case "arme":
                    encombrement = this._getWeaponEncumbrance(item);
                    break;
                default:
                    encombrement = 1;
            }
        }
        
        // Vérifier la capacité d'encombrement
        const currentEncumbrance = this.calculateTotalEncumbrance(actor);
        const newTotal = currentEncumbrance + encombrement;
        
        if (newTotal > inventory.encombrement.max) {
            const deficit = newTotal - inventory.encombrement.max;
            ui.notifications.error(`Inventaire plein ! Il manque ${deficit} points d'encombrement.`);
            return false;
        }
        
        // Ajouter l'item à la liste
        const updatedItems = [...inventory.items, item.id];
        const updatedEncumbrance = newTotal;
        
        try {
            await actor.update({
                'system.inventaire.items': updatedItems,
                'system.inventaire.encombrement.actuel': updatedEncumbrance
            });
            
            console.log(`✅ ${item.name} ajouté à l'inventaire (${encombrement} encombrement)`);
            ui.notifications.info(`${item.name} ajouté à l'inventaire !`);
            return true;
        } catch (error) {
            console.error("❌ Erreur lors de l'ajout:", error);
            ui.notifications.error("Erreur lors de l'ajout à l'inventaire");
            return false;
        }
    }

    // **SUPPRESSION : Retirer un item**
    // **CORRECTION : removeItemFromInventory avec vérification**
    static async removeItemFromInventory(actor, itemId) {
        const inventory = actor.system.inventaire || this.initializeInventory();
        
        // **CORRECTION : Vérifier que la liste existe**
        if (!inventory.items || !Array.isArray(inventory.items)) {
            console.log("⚠️ Liste d'items manquante dans removeItemFromInventory");
            ui.notifications.warn("Structure d'inventaire corrompue !");
            return false;
        }
        
        // Vérifier si l'item est dans l'inventaire
        if (!inventory.items.includes(itemId)) {
            ui.notifications.warn("Objet non trouvé dans l'inventaire !");
            return false;
        }
        
        // **ÉTAPE 1 : Déséquiper automatiquement si nécessaire**
        await this.unequipIfRemoved(actor, itemId);
        
        // **ÉTAPE 2 : Retirer de la liste**
        const updatedItems = inventory.items.filter(id => id !== itemId);
        
        // **ÉTAPE 3 : Supprimer l'item de Foundry**
        const item = actor.items.get(itemId);
        let itemName = "Objet inconnu";
        if (item) {
            itemName = item.name;
            await item.delete();
            console.log(`🗑️ Item Foundry supprimé: ${item.name}`);
        }
        
        // **ÉTAPE 4 : Recalculer l'encombrement**
        // Créer un acteur temporaire pour le calcul
        const tempInventory = { ...inventory, items: updatedItems };
        let newEncumbrance = 0;
        updatedItems.forEach(id => {
            const tempItem = actor.items.get(id);
            if (tempItem) {
                newEncumbrance += parseInt(tempItem.system?.encombrement) || 1;
            }
        });
        
        // **ÉTAPE 5 : Mettre à jour l'inventaire**
        await actor.update({
            'system.inventaire.items': updatedItems,
            'system.inventaire.encombrement.actuel': newEncumbrance
        });
        
        console.log(`✅ ${itemName} retiré de l'inventaire`);
        ui.notifications.info(`${itemName} supprimé de l'inventaire !`);
        return true;
    }

    // **ÉQUIPEMENT : Équiper depuis l'inventaire**
    // **CORRECTION : equipItemFromInventory avec vérification**
    static async equipItemFromInventory(actor, itemId, equipType) {
        const inventory = actor.system.inventaire || this.initializeInventory();
        
        // **CORRECTION : Vérifier que la liste existe**
        if (!inventory.items || !Array.isArray(inventory.items)) {
            console.log("⚠️ Liste d'items manquante dans equipItemFromInventory");
            ui.notifications.error("Structure d'inventaire corrompue !");
            return false;
        }
        
        // Vérifier que l'item est dans l'inventaire
        if (!inventory.items.includes(itemId)) {
            ui.notifications.error("Objet non trouvé dans l'inventaire !");
            return false;
        }
        
        // Récupérer l'item
        const item = actor.items.get(itemId);
        if (!item) {
            ui.notifications.error("Item non trouvé !");
            return false;
        }
        
        // Préparer les données d'équipement
        const equipData = {
            id: item.id,
            name: item.name,
            img: item.img,
            system: { ...item.system }
        };
        
        const updatePath = `system.inventaire.${equipType}Equipee`;
        
        try {
            await actor.update({
                [updatePath]: equipData
            });
            
            ui.notifications.info(`${item.name} équipé !`);
            console.log(`✅ ${item.name} équipé depuis l'inventaire`);
            return true;
        } catch (error) {
            console.error("Erreur lors de l'équipement:", error);
            ui.notifications.error("Erreur lors de l'équipement");
            return false;
        }
    }

    // **DONNÉES : Préparer les données pour le template**
static async prepareInventoryData(actor) {
    try {
        // **ÉTAPE 0 : Migration automatique des items existants**
        await this.migrateExistingItems(actor);
        
        // **ÉTAPE 1 : Nettoyer les équipements orphelins**
        await this.cleanupOrphanedEquipment(actor);
        
        // **ÉTAPE 2 : Récupérer la version fraîche de l'acteur APRÈS migration**
        const freshActor = game.actors.get(actor.id);
        let inventory = freshActor.system.inventaire || this.initializeInventory();
        
        // **ÉTAPE 3 : Vérification et correction forcée si nécessaire**
        if (!inventory.items || !Array.isArray(inventory.items)) {
            console.log("🔧 Correction forcée de la structure d'inventaire");
            
            inventory = this.initializeInventory();
            await freshActor.update({
                'system.inventaire': inventory
            });
            
            // **RELANCER la migration après correction**
            await this.migrateExistingItems(freshActor);
            inventory = freshActor.system.inventaire;
            
            console.log("✅ Structure d'inventaire corrigée et migration effectuée");
        }
        
        // **ÉTAPE 4 : Construction sécurisée de la liste**
        const inventoryItems = [];
        const itemIds = Array.isArray(inventory.items) ? inventory.items : [];
        
        console.log(`📋 Construction liste avec ${itemIds.length} IDs d'items`);
        
        for (const itemId of itemIds) {
            const item = freshActor.items.get(itemId);
            if (item) {
                const itemData = {
                    id: item.id,
                    name: item.name,
                    img: item.img,
                    type: item.type,
                    system: { ...item.system },
                    isEquipped: this._isItemEquipped(freshActor, itemId),
                    rarityColor: this._getRarityColor(item.system?.rarete || "Commune"),
                    rarityIcon: this._getRarityIcon(item.system?.rarete || "Commune"),
                    encombrement: parseInt(item.system?.encombrement) || 1
                };
                inventoryItems.push(itemData);
                console.log(`✅ Item ajouté à la liste: ${item.name} (${item.type})`);
            } else {
                console.warn(`⚠️ Item introuvable: ${itemId}`);
            }
        }
        
        console.log(`📊 Liste finale: ${inventoryItems.length} items`);
        
        // **ÉTAPE 5 : Calcul sécurisé de l'encombrement**
        let totalEncumbrance = 0;
        try {
            totalEncumbrance = this.calculateTotalEncumbrance(freshActor);
        } catch (error) {
            console.error("Erreur calcul encombrement:", error);
            totalEncumbrance = 0;
        }
        
        // **ÉTAPE 6 : Retour sécurisé**
        const result = {
            armeEquipee: inventory.armeEquipee || null,
            armeSecondaireEquipee: inventory.armeSecondaireEquipee || null,
            armureEquipee: inventory.armureEquipee || null,
            accessoire1: inventory.accessoire1 || null,
            accessoire2: inventory.accessoire2 || null,
            items: inventoryItems,
            encombrement: {
                actuel: totalEncumbrance,
                max: inventory.encombrement?.max || 20
            },
            surcharge: totalEncumbrance > (inventory.encombrement?.max || 20),
            totalItems: inventoryItems.length,
            freeSpace: Math.max(0, (inventory.encombrement?.max || 20) - totalEncumbrance)
        };
        
        console.log(`📊 Inventaire préparé avec succès: ${result.totalItems} items`);
        return result;
        
    } catch (error) {
        console.error("❌ Erreur dans prepareInventoryData:", error);
        
        // **Retour d'urgence avec structure vide mais valide**
        return {
            armeEquipee: null,
            armeSecondaireEquipee: null,
            armureEquipee: null,
            accessoire1: null,
            accessoire2: null,
            items: [],
            encombrement: { actuel: 0, max: 20 },
            surcharge: false,
            totalItems: 0,
            freeSpace: 20
        };
    }
}

    // **HELPERS PRIVÉS**
    static _getWeaponEncumbrance(weapon) {
        // Logique pour déterminer l'encombrement des armes
        const mains = weapon.system?.mains || 1;
        return mains === 2 ? 4 : 1; // 2 mains = 4 encombrement, 1 main = 1 encombrement
    }
    
        static _isItemEquipped(actor, itemId) {
            const inventory = actor.system.inventaire || {};
            
            return (
                inventory.armeEquipee?.id === itemId ||
                inventory.armeSecondaireEquipee?.id === itemId || // **AJOUTÉ**
                inventory.armureEquipee?.id === itemId ||
                inventory.accessoire1?.id === itemId ||
                inventory.accessoire2?.id === itemId
            );
        }
    
    static _getRarityColor(rarity) {
        const colors = {
            "Commune": "#9E9E9E",
            "Rare": "#2196F3", 
            "Epic": "#9C27B0",
            "Legendaire": "#FF9800"
        };
        return colors[rarity] || colors["Commune"];
    }
    
    static _getRarityIcon(rarity) {
        const icons = {
            "Commune": "fas fa-circle",
            "Rare": "fas fa-star",
            "Epic": "fas fa-crown", 
            "Legendaire": "fas fa-fire"
        };
        return icons[rarity] || icons["Commune"];
    }

    // **DÉSÉQUIPEMENT AUTOMATIQUE**
    static async unequipIfRemoved(actor, itemId) {
        const inventory = actor.system.inventaire || this.initializeInventory();
        const updates = {};
        let hasChanges = false;
        
        // Vérifier tous les équipements
        const equipments = [
            { key: 'armeEquipee', name: 'Arme principale' },
            { key: 'armeSecondaireEquipee', name: 'Arme secondaire' },
            { key: 'armureEquipee', name: 'Armure' },
            { key: 'accessoire1', name: 'Accessoire 1' },
            { key: 'accessoire2', name: 'Accessoire 2' }
        ];
        
        for (const equipment of equipments) {
            const equipped = inventory[equipment.key];
            if (equipped && equipped.id === itemId) {
                updates[`system.inventaire.${equipment.key}`] = null;
                hasChanges = true;
                console.log(`🔧 ${equipment.name} déséquipé: ${equipped.name}`);
                ui.notifications.info(`${equipped.name} déséquipé automatiquement`);
            }
        }
        
        if (hasChanges) {
            await actor.update(updates);
        }
    }

    // **NETTOYAGE DES ÉQUIPEMENTS ORPHELINS**
    static async cleanupOrphanedEquipment(actor) {
        const inventory = actor.system.inventaire || this.initializeInventory();
        const foundryItemIds = actor.items.contents.map(item => item.id);
        const updates = {};
        let hasChanges = false;
        
        console.log("🧹 Nettoyage des équipements orphelins");
        console.log("📦 Items Foundry:", foundryItemIds.length);
        console.log("📋 Inventaire actuel:", inventory);
        
        // **Vérifier chaque équipement**
        const equipments = [
            { key: 'armeEquipee', name: 'Arme principale' },
            { key: 'armeSecondaireEquipee', name: 'Arme secondaire' },
            { key: 'armureEquipee', name: 'Armure' },
            { key: 'accessoire1', name: 'Accessoire 1' },
            { key: 'accessoire2', name: 'Accessoire 2' }
        ];
        
        for (const equipment of equipments) {
            const equipped = inventory[equipment.key];
            if (equipped && equipped.id && !foundryItemIds.includes(equipped.id)) {
                updates[`system.inventaire.${equipment.key}`] = null;
                hasChanges = true;
                console.log(`🧹 ${equipment.name} orphelin supprimé (${equipped.name})`);
            }
        }
        
        // **CORRECTION : Nettoyer la liste des items (vérifier qu'elle existe)**
        if (inventory.items && Array.isArray(inventory.items)) {
            const validItems = inventory.items.filter(itemId => foundryItemIds.includes(itemId));
            if (validItems.length !== inventory.items.length) {
                updates['system.inventaire.items'] = validItems;
                hasChanges = true;
                console.log(`🧹 ${inventory.items.length - validItems.length} items orphelins supprimés de la liste`);
            }
        } else {
            // **NOUVEAU : Initialiser la liste d'items si elle n'existe pas**
            console.log("🆕 Initialisation de la liste d'items dans l'inventaire");
            updates['system.inventaire.items'] = [];
            hasChanges = true;
        }
        
        if (hasChanges) {
            try {
                await actor.update(updates);
                console.log("✅ Nettoyage terminé avec succès");
            } catch (error) {
                console.error("❌ Erreur lors du nettoyage:", error);
            }
        }
    }

    // **DÉSÉQUIPEMENT MANUEL**
    static async unequipItem(actor, equipType) {
        const updatePath = `system.inventaire.${equipType}`;
        
        try {
            await actor.update({
                [updatePath]: null
            });
            
            console.log(`✅ ${equipType} déséquipé manuellement`);
            ui.notifications.info("Objet déséquipé !");
            return true;
        } catch (error) {
            console.error("❌ Erreur lors du déséquipement:", error);
            ui.notifications.error("Erreur lors du déséquipement");
            return false;
        }
    }

    // **NOUVEAU : Gestion du drop dans les slots d'équipement**
    async _onEquipmentSlotDrop(event) {
        event.preventDefault();
        const slot = event.currentTarget;
        const slotType = slot.dataset.slotType; // 'arme', 'armure', 'accessoire'
        
        slot.classList.remove('highlight', 'invalid');
        
        try {
            const dragData = event.originalEvent.dataTransfer.getData('text/plain');
            const data = JSON.parse(dragData);
            
            if (data.type === "Item") {
                const item = await fromUuid(data.uuid);
                if (!item) {
                    ui.notifications.error("Item non trouvé !");
                    return;
                }
                
                console.log(`🎯 Drop dans slot ${slotType}:`, item.name, "Type item:", item.type);
                
                // **Vérifier que le type correspond**
                if (item.type !== slotType) {
                    ui.notifications.error(`Impossible d'équiper un ${item.type} dans un slot ${slotType} !`);
                    return;
                }
                
                // **ÉTAPE 1 : Ajouter à l'inventaire si pas déjà présent**
                const inventory = this.actor.system.inventaire || InventoryManager.initializeInventory();
                
                if (!inventory.items || !inventory.items.includes(item.id)) {
                    console.log("📦 Item pas dans l'inventaire, ajout automatique");
                    const addSuccess = await InventoryManager.addItemToInventory(this.actor, item);
                    if (!addSuccess) {
                        return; // Échec de l'ajout (inventaire plein)
                    }
                }
                
                // **ÉTAPE 2 : Équiper l'item**
                let equipType = slotType;
                if (slotType === "accessoire") {
                    // Déterminer quel slot d'accessoire utiliser
                    const slot1Occupied = inventory.accessoire1 !== null;
                    const slot2Occupied = inventory.accessoire2 !== null;
                    
                    if (!slot1Occupied) {
                        equipType = "accessoire1";
                    } else if (!slot2Occupied) {
                        equipType = "accessoire2";
                    } else {
                        // Demander à l'utilisateur quel slot remplacer
                        const choice = await Dialog.confirm({
                            title: "Remplacer un accessoire ?",
                            content: `<p>Les deux slots d'accessoires sont occupés.</p>
                                     <p>Voulez-vous remplacer l'accessoire dans le slot 1 ?</p>
                                     <p><em>Annuler pour utiliser le slot 2</em></p>`,
                            yes: () => "accessoire1",
                            no: () => "accessoire2"
                        });
                        equipType = choice ? "accessoire1" : "accessoire2";
                    }
                }
                
                const equipSuccess = await InventoryManager.equipItemFromInventory(this.actor, item.id, equipType);
                if (equipSuccess) {
                    this.render(false);
                    ui.notifications.info(`${item.name} équipé !`);
                }
                
            } else if (data.type === "InventoryItem") {
                // **Drop interne : équiper depuis l'inventaire**
                const equipSuccess = await InventoryManager.equipItemFromInventory(this.actor, data.itemId, slotType);
                if (equipSuccess) {
                    this.render(false);
                }
            }
            
        } catch (error) {
            console.error("Erreur lors du drop dans slot d'équipement:", error);
            ui.notifications.error("Erreur lors de l'équipement");
        }
    }

    // **Drag over pour slots d'équipement**
    _onEquipmentSlotDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        
        const slot = event.currentTarget;
        slot.classList.add('highlight');
        
        // Vérifier le type si possible
        try {
            const dragData = event.dataTransfer.getData('text/plain');
            if (dragData) {
                const data = JSON.parse(dragData);
                const slotType = slot.dataset.slotType;
                
                if (data.itemType && data.itemType !== slotType) {
                    slot.classList.add('invalid');
                    slot.classList.remove('highlight');
                }
            }
        } catch (error) {
            // Ignorer les erreurs de parsing pendant le drag
        }
    }

    // **Drag leave pour slots d'équipement**
    _onEquipmentSlotDragLeave(event) {
        const slot = event.currentTarget;
        slot.classList.remove('highlight', 'invalid');
    }

    // **NOUVEAU : Déséquipement depuis les slots**
    async _onItemUnequip(event) {
        event.preventDefault();
        
        const button = event.currentTarget;
        const equipType = button.dataset.equipType; // 'armeEquipee', 'armureEquipee', etc.
        
        console.log(`🔧 Déséquipement de ${equipType}`);
        
        if (!equipType) {
            ui.notifications.error("Type d'équipement manquant !");
            return;
        }
        
        const success = await InventoryManager.unequipItem(this.actor, equipType);
        if (success) {
            this.render(false);
        }
    }

        // **CORRECTION dans module/Inventaire.js - Méthode pour migrer les items existants**
    static async migrateExistingItems(actor) {
        const inventory = actor.system.inventaire || this.initializeInventory();
        const foundryItems = actor.items.contents;
        const inventoryItemIds = inventory.items || [];
        
        let hasChanges = false;
        const newItemIds = [];
        
        console.log("🔄 Migration des items existants vers l'inventaire");
        console.log(`📦 Items Foundry: ${foundryItems.length}`);
        console.log(`📋 Items dans inventaire: ${inventoryItemIds.length}`);
        
        // Ajouter tous les items Foundry qui ne sont pas dans la liste d'inventaire
        for (const item of foundryItems) {
            if (!inventoryItemIds.includes(item.id)) {
                newItemIds.push(item.id);
                hasChanges = true;
                console.log(`➕ Ajout automatique: ${item.name} (${item.type})`);
            }
        }
        
        if (hasChanges) {
            const updatedItemIds = [...inventoryItemIds, ...newItemIds];
            
            await actor.update({
                'system.inventaire.items': updatedItemIds
            });
            
            console.log(`✅ Migration terminée: ${newItemIds.length} items ajoutés`);
            ui.notifications.info(`${newItemIds.length} items automatiquement ajoutés à l'inventaire !`);
            
            return true;
        }
        
        return false;
    }

}