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
   
    // **CORRECTION dans equipItemFromInventory - Gestion des accessoires**
static async equipItemFromInventory(actor, itemId, equipType) {
    console.log(`🎯 Équipement de l'item ${itemId} en tant que ${equipType}`);
    
    try {
        const item = actor.items.get(itemId);
        if (!item) {
            console.error(`❌ Item ${itemId} non trouvé dans les items Foundry`);
            ui.notifications.error("Objet non trouvé dans l'inventaire !");
            return false;
        }
        
        console.log(`✅ Item trouvé: ${item.name} (${item.type})`);
        
        // **CORRECTION : Gestion spéciale pour les accessoires**
        let actualEquipType = equipType;
        let baseEquipType = equipType;
        
        if (equipType === "accessoire") {
            // **AUTO-DÉTERMINATION du slot pour les accessoires**
            const inventaire = actor.system.inventaire || {};
            
            // **Vérifier l'état RÉEL des slots après nettoyage**
            const slot1Valid = inventaire.accessoire1 && actor.items.get(inventaire.accessoire1.id);
            const slot2Valid = inventaire.accessoire2 && actor.items.get(inventaire.accessoire2.id);
            
            console.log("🔍 État slots accessoires:", {
                slot1: slot1Valid ? "OCCUPÉ" : "LIBRE",
                slot2: slot2Valid ? "OCCUPÉ" : "LIBRE"
            });
            
            if (!slot1Valid) {
                actualEquipType = "accessoire1";
                console.log("✅ Utilisation du slot 1");
            } else if (!slot2Valid) {
                actualEquipType = "accessoire2";
                console.log("✅ Utilisation du slot 2");
            } else {
                ui.notifications.warn("Tous les slots d'accessoires sont vraiment occupés !");
                return false;
            }
            
            baseEquipType = "accessoire"; // Pour la vérification de type
        } else {
            baseEquipType = actualEquipType.replace(/[0-9]/g, '');
        }
        
        // **Vérifier le type**
        if (item.type !== baseEquipType) {
            console.error(`❌ Type d'item incorrect: attendu ${baseEquipType}, reçu ${item.type}`);
            ui.notifications.error("Type d'objet incorrect !");
            return false;
        }
        
        // **ÉQUIPEMENT selon le type**
        let updateData = {};
        
        switch (baseEquipType) {
            case "arme":
                updateData = await this._equipWeapon(actor, item, actualEquipType);
                break;
            case "armure":
                updateData = await this._equipArmor(actor, item);
                break;
            case "accessoire":
                updateData = await this._equipAccessory(actor, item, actualEquipType);
                break;
            default:
                console.error(`❌ Type d'équipement non supporté: ${baseEquipType}`);
                ui.notifications.error("Type d'équipement non supporté !");
                return false;
        }
        
        if (updateData && Object.keys(updateData).length > 0) {
            await actor.update(updateData);
            console.log(`✅ ${item.name} équipé avec succès dans ${actualEquipType}`);
            ui.notifications.success(`${item.name} équipé !`);
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error("❌ Erreur lors de l'équipement:", error);
        ui.notifications.error("Erreur lors de l'équipement !");
        return false;
    }
}

    // **CORRECTION dans Inventaire.js - Méthode _equipAccessory**
    static async _equipAccessory(actor, item, slotType = null) {
        console.log(`📿 Équipement accessoire: ${item.name} dans ${slotType || 'slot auto'}`);
        
        const equipData = {
            id: item.id,
            name: item.name,
            img: item.img,
            system: { ...item.system },
            rarityColor: this._getRarityColor(item.system?.rarete),
            rarityIcon: this._getRarityIcon(item.system?.rarete)
        };
        
        // **DÉTERMINER LE SLOT si pas spécifié**
        if (!slotType) {
            const inventaire = actor.system.inventaire || {};
            
            if (!inventaire.accessoire1) {
                slotType = "accessoire1";
            } else if (!inventaire.accessoire2) {
                slotType = "accessoire2";
            } else {
                ui.notifications.warn("Tous les slots d'accessoires sont occupés !");
                return null;
            }
        }
        
        // **VÉRIFICATION TALENT pour le slot 2**
        if (slotType === "accessoire2") {
            const hasAccessoiriste = actor.system.talents?.some(t => 
                t.nom && t.nom.toLowerCase().includes("accessoiriste")
            ) || actor.system.hasAccessoiristeTalent;
            
            if (!hasAccessoiriste) {
                ui.notifications.warn("Le talent 'Accessoiriste' est requis pour équiper un second accessoire !");
                return null;
            }
        } else {
            // Les deux slots sont occupés
            ui.notifications.warn("Tous les slots d'accessoires sont occupés ! Déséquipez un accessoire d'abord.");
            return null;
        }
        
        const updateData = {};
        updateData[`system.inventaire.${slotType}`] = equipData;
        
        console.log(`📿 Équipé dans ${slotType}:`, equipData.name);
        return updateData;
    }

    // **CORRECTION : Méthode _equipWeapon**
    static async _equipWeapon(actor, item) {
        console.log(`⚔️ Équipement arme: ${item.name}`);
        
        const equipData = {
            id: item.id,
            name: item.name,
            img: item.img,
            system: { ...item.system },
            rarityColor: this._getRarityColor(item.system?.rarete),
            rarityIcon: this._getRarityIcon(item.system?.rarete)
        };
        
        return {
            "system.inventaire.armeEquipee": equipData
        };
    }

    // **CORRECTION : Méthode _equipArmor**
    static async _equipArmor(actor, item) {
        console.log(`🛡️ Équipement armure: ${item.name}`);
        
        const equipData = {
            id: item.id,
            name: item.name,
            img: item.img,
            system: { ...item.system },
            rarityColor: this._getRarityColor(item.system?.rarete),
            rarityIcon: this._getRarityIcon(item.system?.rarete)
        };
        
        return {
            "system.inventaire.armureEquipee": equipData
        };
    }

    // **UTILITAIRES : Méthodes pour les couleurs de rareté**
    static _getRarityColor(rarity) {
        switch(rarity) {
            case "Commune": return "#9E9E9E";
            case "Rare": return "#2196F3";
            case "Epic": return "#9C27B0";
            case "Legendaire": return "#FF9800";
            default: return "#9E9E9E";
        }
    }

    static _getRarityIcon(rarity) {
        switch(rarity) {
            case "Commune": return "fas fa-circle";
            case "Rare": return "fas fa-gem";
            case "Epic": return "fas fa-star";
            case "Legendaire": return "fas fa-crown";
            default: return "fas fa-circle";
        }
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

        // **Dans Inventaire.js - Méthode _equipAccessory**
    // **CORRECTION COMPLÈTE : _equipAccessory en méthode statique**
static async _equipAccessory(actor, item, slotType) {
    console.log(`📿 Équipement accessoire: ${item.name} dans ${slotType}`);
    
    const inventory = actor.system.inventaire || {};
    
    // **DIAGNOSTIC : Vérifier l'état réel des slots**
    console.log("🔍 État actuel inventaire:", {
        accessoire1: inventory.accessoire1,
        accessoire2: inventory.accessoire2
    });
    
    // **NETTOYER les références fantômes AVANT vérification**
    const updateCleanup = {};
    let needsCleanup = false;
    
    if (inventory.accessoire1 && inventory.accessoire1.id && !actor.items.get(inventory.accessoire1.id)) {
        console.log("🧹 Nettoyage slot 1 fantôme avant équipement");
        updateCleanup["system.inventaire.accessoire1"] = null;
        needsCleanup = true;
    }
    
    if (inventory.accessoire2 && inventory.accessoire2.id && !actor.items.get(inventory.accessoire2.id)) {
        console.log("🧹 Nettoyage slot 2 fantôme avant équipement");
        updateCleanup["system.inventaire.accessoire2"] = null;
        needsCleanup = true;
    }
    
    // **Nettoyer les anciens champs**
    if (inventory.accessoire1Equipee) {
        console.log("🧹 Suppression ancien champ accessoire1Equipee");
        updateCleanup["system.inventaire.-=accessoire1Equipee"] = null;
        needsCleanup = true;
    }
    
    if (inventory.accessoire2Equipee) {
        console.log("🧹 Suppression ancien champ accessoire2Equipee");
        updateCleanup["system.inventaire.-=accessoire2Equipee"] = null;
        needsCleanup = true;
    }
    
    // **Appliquer le nettoyage si nécessaire**
    if (needsCleanup) {
        await actor.update(updateCleanup);
        console.log("✅ Inventaire nettoyé");
    }
    
    // **RÉCUPÉRER L'INVENTAIRE FRAÎCHEMENT NETTOYÉ**
    const freshInventory = actor.system.inventaire || {};
    console.log("🔍 Inventaire après nettoyage:", {
        accessoire1: freshInventory.accessoire1,
        accessoire2: freshInventory.accessoire2
    });
    
    // **CRÉER LES DONNÉES D'ÉQUIPEMENT**
    const equipData = this._createEquipmentData(item);
    
    // **LOGIQUE D'ÉQUIPEMENT**
    if (slotType === "accessoire1") {
        // **Vérifier que le slot 1 est libre APRÈS nettoyage**
        const slot1Occupied = freshInventory.accessoire1 && 
                             freshInventory.accessoire1.id && 
                             actor.items.get(freshInventory.accessoire1.id);
        
        if (slot1Occupied) {
            console.log("❌ Slot 1 toujours occupé après nettoyage:", freshInventory.accessoire1.name);
            ui.notifications.warn(`Slot 1 occupé par ${freshInventory.accessoire1.name} ! Déséquipez-le d'abord.`);
            return null;
        }
        
        console.log("✅ Slot 1 libre, équipement autorisé");
        return { "system.inventaire.accessoire1": equipData };
        
    } else if (slotType === "accessoire2") {
        // **Vérifier le talent Accessoiriste**
        const hasAccessoiriste = actor.system.talents?.some(t => 
            t.nom && t.nom.toLowerCase().includes("accessoiriste")
        ) || actor.system.hasAccessoiristeTalent;
        
        if (!hasAccessoiriste) {
            console.log("❌ Talent Accessoiriste requis pour le slot 2");
            ui.notifications.warn("Le talent 'Accessoiriste' est requis pour équiper un second accessoire !");
            return null;
        }
        
        // **Vérifier que le slot 2 est libre APRÈS nettoyage**
        const slot2Occupied = freshInventory.accessoire2 && 
                             freshInventory.accessoire2.id && 
                             actor.items.get(freshInventory.accessoire2.id);
        
        if (slot2Occupied) {
            console.log("❌ Slot 2 toujours occupé après nettoyage:", freshInventory.accessoire2.name);
            ui.notifications.warn(`Slot 2 occupé par ${freshInventory.accessoire2.name} ! Déséquipez-le d'abord.`);
            return null;
        }
        
        console.log("✅ Slot 2 libre, équipement autorisé");
        return { "system.inventaire.accessoire2": equipData };
        
    } else {
        console.error("❌ Type de slot accessoire invalide:", slotType);
        return null;
    }
}

// **AJOUT : Méthode _createEquipmentData si elle n'existe pas**
static _createEquipmentData(item) {
    return {
        id: item.id,
        name: item.name,
        img: item.img,
        system: { ...item.system },
        rarityColor: this._getRarityColor(item.system?.rarete),
        rarityIcon: this._getRarityIcon(item.system?.rarete)
    };
}
}