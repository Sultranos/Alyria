import { AlyriaRaces } from "../data/AlyriaRace.js";
import { AlyriaVoies } from "../data/AlyriaVoies.js";
import { AlyriaArcane } from "../data/AlyriaArcanes.js";
import { InventoryManager } from "../Inventaire.js";

export default class AlyriaActorSheet extends ActorSheet {
    
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["alyria", "sheet", "actor"],
            width: 800,
            height: 720,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }]
        });
    }

    get template() {
        console.log(`Alyria | Chargement du template de la fiche d'objet ${this.actor.type}-sheet`);
        return `systems/alyria/templates/sheet/${this.actor.type}-sheet.html`;
    }

    // **CORRECTION : getData avec inventaire asynchrone**
async getData(options) {
    const context = await super.getData(options);
    const actorData = context.data;

    // Enrichir les données pour l'affichage
    context.system = actorData.system || {};
    context.flags = actorData.flags || {};

    console.log("=== DEBUG ARMES ===");
    console.log("Armes trouvées:", this.actor.items.filter(item => item.type === "arme").length);
    console.log("Arme équipée:", this.actor.system.inventaire?.armeEquipee?.name || "Aucune");

    // **CORRECTION : Inventaire asynchrone**
    context.inventaire = await InventoryManager.prepareInventoryData(this.actor);
    console.log("📦 Inventaire préparé:", context.inventaire);

    // **ARMES : Traitement des armes (complet)**
    context.weapons = this.actor.items.filter(item => item.type === "arme").map(weapon => ({
        ...weapon.toObject(),
        rarityColor: this._getRarityColor(weapon.system.rarete || "Commune"),
        rarityIcon: this._getRarityIcon(weapon.system.rarete || "Commune"),
        traits: weapon.system.traits || [],
        imperfections: weapon.system.imperfections || []
    }));

    // **ARMURES : Traitement des armures avec debug**
    const armorItems = this.actor.items.filter(item => item.type === "armure");
    console.log("=== DEBUG ARMURES ===");
    console.log("Armures trouvées:", armorItems.length);
    
    context.armors = armorItems.map(armor => {
        const armorObj = armor.toObject();
        console.log("Traitement armure:", armorObj.name, "Rareté:", armorObj.system?.rarete);
        
        return {
            ...armorObj,
            rarityColor: this._getRarityColor(armorObj.system?.rarete || "Commune"),
            rarityIcon: this._getRarityIcon(armorObj.system?.rarete || "Commune"),
            traits: armorObj.system?.traits || [],
            imperfections: armorObj.system?.imperfections || []
        };
    });

    // **ARME ÉQUIPÉE : Enrichir les données avec couleur/icône**
    if (this.actor.system.inventaire?.armeEquipee?.id) {
        const equippedWeaponId = this.actor.system.inventaire.armeEquipee.id;
        const equippedWeapon = this.actor.items.get(equippedWeaponId);
        
        if (equippedWeapon) {
            // Enrichir les données de l'arme équipée
            context.system.inventaire.armeEquipee.rarityColor = this._getRarityColor(equippedWeapon.system.rarete || "Commune");
            context.system.inventaire.armeEquipee.rarityIcon = this._getRarityIcon(equippedWeapon.system.rarete || "Commune");
            context.system.inventaire.armeEquipee.traits = equippedWeapon.system.traits || [];
            context.system.inventaire.armeEquipee.imperfections = equippedWeapon.system.imperfections || [];
            
            console.log("✅ Arme équipée enrichie:", context.system.inventaire.armeEquipee.name, "ID:", context.system.inventaire.armeEquipee.id);
        } else {
            console.log("❌ Arme équipée non trouvée dans les items, ID:", equippedWeaponId);
        }
    }

    // **ARMURE ÉQUIPÉE : Enrichir les données avec couleur/icône**
    if (this.actor.system.inventaire?.armureEquipee?.id) {
        const equippedArmorId = this.actor.system.inventaire.armureEquipee.id;
        const equippedArmor = this.actor.items.get(equippedArmorId);
        
        console.log("Armure équipée ID:", equippedArmorId);
        console.log("Armure trouvée:", equippedArmor?.name);
        
        if (equippedArmor) {
            // Enrichir les données de l'armure équipée
            context.system.inventaire.armureEquipee.rarityColor = this._getRarityColor(equippedArmor.system.rarete || "Commune");
            context.system.inventaire.armureEquipee.rarityIcon = this._getRarityIcon(equippedArmor.system.rarete || "Commune");
            context.system.inventaire.armureEquipee.traits = equippedArmor.system.traits || [];
            context.system.inventaire.armureEquipee.imperfections = equippedArmor.system.imperfections || [];
            
            console.log("✅ Armure équipée enrichie:", context.system.inventaire.armureEquipee.name, "ID:", context.system.inventaire.armureEquipee.id);
        } else {
            console.log("❌ Armure équipée non trouvée dans les items, ID:", equippedArmorId);
        }
    }

    // **RACES/VOIES : Code existant préservé**
    context.selectedRace = this._prepareRaceData(context.system.race);
    this._prepareVoiesArcanes(context);

    return context;
    }

    // **HELPER : Préparer les données de race**
    _prepareRaceData(raceKey) {
        const raceData = AlyriaRaces?.[raceKey] ?? {};
        return {
            nom: raceData.nom || "Non définie",
            description: raceData.description || [],
            talentRace: raceData.talentRace || {}
        };
    }

    // **HELPER : Préparer voies et arcanes**
    _prepareVoiesArcanes(context) {
        const voiesArcane = context.system.voiesArcane || {};
        const { type1, key1, type2, key2 } = voiesArcane;

        // Reset
        context.selectedVoie = null;
        context.selectedArcana = null;
        context.selectedSecondVoie = null;
        context.selectedSecondArcana = null;

        // Première sélection
        if (type1 === "voie" && key1) {
            context.selectedVoie = this._prepareVoieData(key1);
        } else if (type1 === "arcane" && key1) {
            context.selectedArcana = this._prepareArcaneData(key1);
        }

        // Seconde sélection
        if (type2 === "voie" && key2) {
            context.selectedSecondVoie = this._prepareVoieData(key2);
        } else if (type2 === "arcane" && key2) {
            context.selectedSecondArcana = this._prepareArcaneData(key2);
        }
    }

    // **HELPER : Préparer les données de voie**
    _prepareVoieData(voieKey) {
        const voie = AlyriaVoies?.[voieKey];
        if (!voie) return null;
        
        return {
            nom: voie.nom || voieKey,
            description: voie.description || [],
            talentsVoie: voie.talentsVoie || [],
            sortileges: voie.sortileges || []
        };
    }

    // **HELPER : Préparer les données d'arcane**
    _prepareArcaneData(arcaneKey) {
        const arcane = AlyriaArcane?.[arcaneKey];
        if (!arcane) return null;
        
        return {
            nom: arcane.nom || arcaneKey,
            description: arcane.description || [],
            talentsArcane: arcane.talentsArcane || [],
            sortileges: arcane.sortileges || []
        };
    }

    // **HELPER : Couleurs de rareté**
    _getRarityColor(rarity) {
        const colors = {
            "Commune": "#9E9E9E",
            "Rare": "#2196F3", 
            "Epic": "#9C27B0",
            "Legendaire": "#FF9800"
        };
        return colors[rarity] || colors["Commune"];
    }

    // **HELPER : Icônes de rareté**
    _getRarityIcon(rarity) {
        const icons = {
            "Commune": "fas fa-circle",
            "Rare": "fas fa-star",
            "Epic": "fas fa-crown", 
            "Legendaire": "fas fa-fire"
        };
        return icons[rarity] || icons["Commune"];
    }

    // **INVENTAIRE : Méthodes simplifiées**
    async _addItemToInventory(item) {
        return await InventoryManager.addItemToInventory(this.actor, item);
    }

    async _removeItemFromInventory(itemId) {
        return await InventoryManager.removeItemFromInventory(this.actor, itemId);
    }

    async _equipItemFromInventory(itemId, equipType) {
        return await InventoryManager.equipItemFromInventory(this.actor, itemId, equipType);
    }

    activateListeners(html) {
        super.activateListeners(html);

        // **CORRECTION : Ajouter la navigation des onglets**
        html.find('.sheet-navigation .item').click(this._onTabClick.bind(this));
        html.find('.rollable-dice').click(this._onRollCharacteristic.bind(this));

        html.find('.recovery-button, .open-recovery-dialog').click(this._onOpenRecoveryDialog.bind(this));

        // **CORRECTION : Vérifier que les méthodes existent avant de les binder**
    
    // Drag and drop inventory
    if (this._onInventoryDragOver) {
        html.find('.inventory-slot').on('dragover', this._onInventoryDragOver.bind(this));
    }
    if (this._onInventoryDragLeave) {
        html.find('.inventory-slot').on('dragleave', this._onInventoryDragLeave.bind(this));
    }
    if (this._onInventoryDrop) {
        html.find('.inventory-slot').on('drop', this._onInventoryDrop.bind(this));
    }

    // Inventory item clicks
    if (this._onInventoryItemClick) {
        html.find('.inventory-item').click(this._onInventoryItemClick.bind(this));
    }
    if (this._onItemEquip) {
        html.find('.item-equip').click(this._onItemEquip.bind(this));
    }
    if (this._onItemRemove) {
        html.find('.item-remove').click(this._onItemRemove.bind(this));
    }

    // Weapon actions
    if (this._onWeaponOpen) {
        html.find('.weapon-open').click(this._onWeaponOpen.bind(this));
    }
    if (this._onWeaponUnequip) {
        html.find('.weapon-unequip').click(this._onWeaponUnequip.bind(this));
    }

    // Armor actions
    if (this._onArmorOpen) {
        html.find('.armor-open').click(this._onArmorOpen.bind(this));
    }
    if (this._onArmorUnequip) {
        html.find('.armor-unequip').click(this._onArmorUnequip.bind(this));
    }

    // Equipment slots
    if (this._onSlotDrop) {
        html.find('.item-slot').on('drop', this._onSlotDrop.bind(this));
    }
    if (this._onSlotDragover) {
        html.find('.item-slot').on('dragover', this._onSlotDragover.bind(this));
    }

         // **CORRECTION COMPLÈTE : Bulles biographiques**
    html.find('.biography-bubble .bubble-title').click(function() {
        const content = $(this).siblings('.bubble-content');
        content.toggleClass('hidden');
        $(this).find('.toggle-icon').toggleClass('expanded');
    });

   // **CORRECTION : Listeners pour l'équipement depuis l'inventaire**
    html.find('.item-equip[data-equip-type="armure"]').click(this._onItemEquip.bind(this));
    
    console.log("✅ Listeners armures activés");
    console.log("Boutons armor-open trouvés:", html.find('.armor-open').length);
    console.log("Boutons armor-unequip trouvés:", html.find('.armor-unequip').length);
    console.log("Boutons item-equip armure trouvés:", html.find('.item-equip[data-equip-type="armure"]').length);

}

// **AJOUTER : _onWeaponUnequip qui manque peut-être**
async _onWeaponUnequip(event) {
    event.preventDefault();
    const weaponElement = event.currentTarget.closest('.weapon-compact');
    const itemId = weaponElement.dataset.itemId;
    
    console.log("Déséquipement arme ID:", itemId);
    
    if (!itemId) {
        ui.notifications.error("ID d'arme manquant !");
        return;
    }
    
    const equippedData = this.actor.system.inventaire.armeEquipee;
    if (equippedData) {
        await this.actor.update({
            'system.inventaire.armeEquipee': null
        });
        
        console.log("✅ Arme déséquipée:", equippedData.name);
        ui.notifications.info(`${equippedData.name} déséquipée !`);
    } else {
        ui.notifications.warn("Aucune arme à déséquiper !");
    }
}

// **AJOUTER : Méthode _onRollCharacteristic (manquante)**
async _onRollCharacteristic(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    
    // Récupérer la valeur de la touche et le nom de la caractéristique
    const targetValue = parseInt(dataset.dice, 10);
    const characteristicName = dataset.label;

    // Récupérer la chance critique de l'acteur
    const toucheCritique = this.actor.system.toucheCritique;

    // Lancer un d100
    const roll = await new Roll("1d100").evaluate({async: true});
    const rollTotal = roll.total;

    let chatContent = `
        <div class="dice-roll">
            <div class="dice-result">
                <div class="dice-formula">1d100</div>
                <h4 class="dice-total">${rollTotal}</h4>
                <div class="dice-tooltip">
                    <section class="tooltip-part">
                        <div class="dice">
                            <header class="part-header flexrow">
                                <span class="part-formula">1d100</span>
                                <span class="part-total">${rollTotal}</span>
                            </header>
                            <ol class="dice-rolls">
                                <li class="roll die d100">${rollTotal}</li>
                            </ol>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <p><strong>Jet de ${characteristicName} :</strong> ${rollTotal} (critique à ${this.actor.system.toucheCritique}%)</p>
    `;

    // Logique de succès et d'échec critiques
    const echecCritiqueSeuil = 96; // 96, 97, 98, 99, 100

    if (rollTotal < toucheCritique) {
        chatContent += `<p style="color: green;">**SUCCÈS CRITIQUE !**</p>`;
    } else if (rollTotal >= echecCritiqueSeuil) {
        chatContent += `<p style="color: red;">**ÉCHEC CRITIQUE !**</p>`;
    } else if (rollTotal <= targetValue) {
        chatContent += `<p style="color: lightgreen;">**SUCCÈS !**</p>`;
    } else {
        chatContent += `<p style="color: orange;">**ÉCHEC !**</p>`;
    }

    // Créer un message de chat
    ChatMessage.create({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        content: chatContent,
        rolls: [roll]
    });
}

// **AJOUTER : Méthode de navigation des onglets**
_onTabClick(event) {
    event.preventDefault();
    const clickedTab = event.currentTarget;
    const targetTab = clickedTab.dataset.tab;
    
    console.log("Changement d'onglet vers:", targetTab);
    
    // **CORRECTION : Chercher dans toute la feuille au lieu de .sheet-navigation**
    const sheetElement = clickedTab.closest('.alyria');
    if (!sheetElement) {
        console.error("❌ Élément feuille non trouvé");
        return;
    }
    
    // Retirer la classe active de tous les liens de navigation
    const navItems = sheetElement.querySelectorAll('.sheet-navigation .item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Ajouter la classe active au lien cliqué
    clickedTab.classList.add('active');
    
    // Masquer tous les onglets de contenu
    const contentTabs = sheetElement.querySelectorAll('.sheet-content .tab');
    contentTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });
    
    // Afficher l'onglet cible
    const targetContent = sheetElement.querySelector(`.sheet-content .tab[data-tab="${targetTab}"]`);
    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
        console.log("✅ Onglet affiché:", targetTab);
    } else {
        console.error("❌ Onglet non trouvé:", targetTab);
    }
}

// **AJOUTER : Méthode pour les bulles biographiques**
_onBubbleToggle(event) {
    event.preventDefault();
    const bubbleTitle = event.currentTarget;
    const bubbleContent = bubbleTitle.nextElementSibling;
    const toggleIcon = bubbleTitle.querySelector('.toggle-icon');
    
    if (bubbleContent.classList.contains('hidden')) {
        bubbleContent.classList.remove('hidden');
        bubbleContent.style.display = 'block';
        toggleIcon.classList.remove('fa-chevron-down');
        toggleIcon.classList.add('fa-chevron-up');
    } else {
        bubbleContent.classList.add('hidden');
        bubbleContent.style.display = 'none';
        toggleIcon.classList.remove('fa-chevron-up');
        toggleIcon.classList.add('fa-chevron-down');
    }
}

// **NOUVEAU : Méthode pour gérer le clic sur un item d'inventaire**
async _onInventoryItemClick(event) {
    event.preventDefault();
    
    // Si on clique sur un bouton d'action, ne pas ouvrir la fiche
    if (event.target.closest('.item-actions')) {
        return;
    }
    
    const itemElement = event.currentTarget;
    const itemId = itemElement.dataset.itemId;
    
    console.log("Clic sur item d'inventaire:", itemId);
    
    if (!itemId) {
        ui.notifications.error("ID d'item manquant !");
        return;
    }
    
    // **CORRECTION : Chercher l'item dans l'acteur UNIQUEMENT**
    const item = this.actor.items.get(itemId);
    
    if (item) {
        console.log("✅ Item trouvé, ouverture de la fiche:", item.name);
        item.sheet.render(true);
    } else {
        console.log("❌ Item non trouvé dans l'acteur, ID:", itemId);
        ui.notifications.error("Item non trouvé ! Il a peut-être été supprimé.");
    }
}

// **INVENTAIRE : Drag & Drop**
    _onInventoryDragOver(event) {
        event.preventDefault();
        const slot = event.currentTarget;
        slot.classList.add('highlight');
    }

    _onInventoryDragLeave(event) {
        const slot = event.currentTarget;
        slot.classList.remove('highlight', 'invalid');
    }

    // **CORRECTION : _onInventoryDrop avec fromUuidSync**
async _onInventoryDrop(event) {
    event.preventDefault();
    const slot = event.currentTarget;
    slot.classList.remove('highlight', 'invalid');
    
    try {
        const dragData = event.dataTransfer.getData('text/plain');
        const data = JSON.parse(dragData);
        
        if (data.type === "Item") {
            // **CORRECTION : Utiliser fromUuid(data.uuid) au lieu de getData**
            const item = await fromUuid(data.uuid);
            if (item) {
                console.log("📦 Drop item:", item.name);
                const success = await this._addItemToInventory(item);
                if (success) {
                    // Recharger la feuille pour voir les changements
                    this.render(false);
                }
            }
        }
    } catch (error) {
        console.error("Erreur lors du drop:", error);
        ui.notifications.error("Erreur lors de l'ajout à l'inventaire");
    }
}

    // **INVENTAIRE : Actions**
async _onItemEquip(event) {
    event.preventDefault();
    
    // **CORRECTION : Récupérer l'ID du bouton OU de l'élément parent**
    let itemId = event.currentTarget.dataset.itemId;
    if (!itemId) {
        // Fallback : chercher dans l'élément parent
        const itemElement = event.currentTarget.closest('.inventory-item');
        itemId = itemElement?.dataset.itemId;
    }
    
    const equipType = event.currentTarget.dataset.equipType;
    
    console.log(`🎯 Équipement de l'item ${itemId} en tant que ${equipType}`);
    console.log("Button dataset:", event.currentTarget.dataset);
    
    if (!itemId) {
        console.error("❌ Aucun ID d'item trouvé");
        ui.notifications.error("ID d'item manquant !");
        return;
    }
    
    // Vérifier que l'item existe dans l'acteur
    const item = this.actor.items.get(itemId);
    if (!item) {
        console.error("❌ Item non trouvé dans l'acteur:", itemId);
        ui.notifications.error("Item non trouvé dans l'acteur !");
        return;
    }
    
    console.log("✅ Item trouvé:", item.name, "Type:", item.type);
    
    // Vérifier que le type correspond
    if (item.type !== equipType) {
        ui.notifications.error(`Impossible d'équiper un ${item.type} comme ${equipType} !`);
        return;
    }
    
    // Équiper l'item
    await this._equipItem(item, equipType);
}

    async _onItemRemove(event) {
        event.preventDefault();
        const itemElement = event.currentTarget.closest('.inventory-item');
        const itemId = itemElement.dataset.itemId;
        const itemName = itemElement.querySelector('.item-name')?.textContent || 'cet objet';
        
        // Confirmation avant suppression
        const confirm = await Dialog.confirm({
            title: "Supprimer l'objet",
            content: `<p>Êtes-vous sûr de vouloir supprimer <strong>${itemName}</strong> ?</p><p><em>Cette action renverra l'objet au stock d'armes.</em></p>`,
            yes: () => true,
            no: () => false
        });
        
        if (!confirm) return;
        
        console.log(`🗑️ Suppression de l'item ${itemId}`);
        
        // **CORRECTION : Supprimer directement l'item de l'acteur**
        const item = this.actor.items.get(itemId);
        if (item) {
            await item.delete();
            ui.notifications.info(`${itemName} renvoyé au stock d'armes !`);
            console.log("✅ Item supprimé de l'acteur");
            
            // Recharger la feuille
            setTimeout(() => {
                this.render(false);
            }, 200);
        } else {
            ui.notifications.warn("Item non trouvé !");
        }
    }

    // **NOUVEAU : Ouvrir le dialogue de récupération**
    async _onOpenRecoveryDialog(event) {
        event.preventDefault();
        
        const dialogContent = `
            <div class="recovery-dialog">
                <h3>🧪 Récupération</h3>
                
                <!-- Récupération PV -->
                <div class="recovery-section">
                    <h4>❤️ Points de Vie</h4>
                    <div class="recovery-controls">
                        <select id="hp-die">
                            <option value="">Aucun</option>
                            <option value="1d4">1d4</option>
                            <option value="1d6">1d6</option>
                            <option value="1d8">1d8</option>
                            <option value="1d10">1d10</option>
                        </select>
                        <span>+</span>
                        <input type="number" id="hp-bonus" placeholder="Bonus" min="0" value="0">
                        <button type="button" id="roll-hp">Roll</button>
                    </div>
                </div>
                
                <!-- Récupération PSY -->
                <div class="recovery-section">
                    <h4>🧠 Points de Psyché</h4>
                    <div class="recovery-controls">
                        <select id="psy-die">
                            <option value="">Aucun</option>
                            <option value="1d4">1d4</option>
                            <option value="1d6">1d6</option>
                            <option value="1d8">1d8</option>
                            <option value="1d10">1d10</option>
                        </select>
                        <span>+</span>
                        <input type="number" id="psy-bonus" placeholder="Bonus" min="0" value="0">
                        <button type="button" id="roll-psy">Roll</button>
                    </div>
                </div>
                
                <!-- Repos complet -->
                <div class="full-rest-section">
                    <button type="button" id="full-rest" class="full-rest-button">
                        🛌 Repos Complet
                    </button>
                </div>
            </div>
        `;

        new Dialog({
            title: "Récupération",
            content: dialogContent,
            buttons: {
                close: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Fermer"
                }
            },
            render: (html) => {
                // Listeners pour les boutons de roll
                html.find('#roll-hp').click(() => this._onRecoveryRoll('hp', html));
                html.find('#roll-psy').click(() => this._onRecoveryRoll('psy', html));
                html.find('#full-rest').click(() => this._onFullRest(html));
            },
            default: "close"
        }).render(true);
    }

    // **NOUVEAU : Gérer le roll de récupération**
    async _onRecoveryRoll(type, html) {
        const dieSelect = html.find(`#${type}-die`);
        const bonusInput = html.find(`#${type}-bonus`);
        
        const dieValue = dieSelect.val();
        const bonus = parseInt(bonusInput.val()) || 0;
        
        let rollResult = 0;
        let rollFormula = "";
        
        // Roll du dé si sélectionné
        if (dieValue) {
            const roll = new Roll(dieValue);
            await roll.evaluate();
            rollResult = roll.total;
            rollFormula = dieValue;
            
            // Afficher le résultat du dé
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({actor: this.actor}),
                flavor: `🎲 Roll de récupération ${type.toUpperCase()}: ${dieValue}`
            });
        }
        
        // Calculer le total
        const totalRecovery = rollResult + bonus;
        
        if (totalRecovery > 0) {
            // Appliquer la récupération
            const currentValue = type === 'hp' ? 
                this.actor.system.pointsDeVie.actuels : 
                this.actor.system.pointsPsyque.actuels;
            const maxValue = type === 'hp' ? 
                this.actor.system.pointsDeVie.max : 
                this.actor.system.pointsPsyque.max;
            
            const newValue = Math.min(currentValue + totalRecovery, maxValue);
            const actualRecovery = newValue - currentValue;
            
            const updatePath = type === 'hp' ? 
                'system.pointsDeVie.actuels' : 
                'system.pointsPsyque.actuels';
            
            await this.actor.update({
                [updatePath]: newValue
            });
            
            // Message de confirmation
            const resourceName = type === 'hp' ? 'Points de Vie' : 'Points de Psyché';
            let message = `💚 **Récupération de ${resourceName}**\n`;
            if (rollFormula) {
                message += `🎲 Dé: ${rollFormula} = ${rollResult}\n`;
            }
            if (bonus > 0) {
                message += `➕ Bonus: +${bonus}\n`;
            }
            message += `**Total récupéré: ${actualRecovery} ${type.toUpperCase()}**`;
            
            ChatMessage.create({
                user: game.user.id,
                speaker: ChatMessage.getSpeaker({actor: this.actor}),
                content: message
            });
            
            ui.notifications.info(`${actualRecovery} ${resourceName} récupérés !`);
        } else {
            ui.notifications.warn("Aucune récupération à appliquer !");
        }
    }

    // **NOUVEAU : Repos complet**
    async _onFullRest(html) {
        await this.actor.update({
            'system.pointsDeVie.actuels': this.actor.system.pointsDeVie.max,
            'system.pointsPsyque.actuels': this.actor.system.pointsPsyque.max
        });
        
        ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({actor: this.actor}),
            content: `🛌 **${this.actor.name} prend un repos complet**\n💚 PV et Psyché restaurés au maximum !`
        });
        
        ui.notifications.info("Repos complet effectué ! PV et Psyché restaurés.");
        
        // Fermer le dialogue
        html.closest('.dialog').find('.dialog-button.close').click();
    }

    // **NAVIGATION : Méthode pour les onglets**
    _onClickTab(event) {
        event.preventDefault();
        const clickedTab = event.currentTarget;
        const tabName = clickedTab.dataset.tab;
        
        console.log("Clic sur onglet:", tabName);
        
        // Trouver les conteneurs
        const navigation = clickedTab.closest('.sheet-navigation');
        const sheetContent = navigation.nextElementSibling; // .sheet-content
    
        if (!sheetContent) {
            console.error("❌ .sheet-content non trouvé après .sheet-navigation");
            return;
        }
        
        // Désactiver tous les onglets
        navigation.querySelectorAll('.item').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Désactiver tous les contenus
        sheetContent.querySelectorAll('.tab').forEach(tabContent => {
            tabContent.classList.remove('active');
        });
        
        // Activer l'onglet cliqué
        clickedTab.classList.add('active');
        
        // Activer le contenu correspondant
        const targetContent = sheetContent.querySelector(`.tab[data-tab="${tabName}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
            console.log("✅ Onglet activé:", tabName);
        } else {
            console.error("❌ Contenu d'onglet non trouvé pour:", tabName);
            console.log("Contenus disponibles:", 
                       Array.from(sheetContent.querySelectorAll('.tab')).map(t => t.dataset.tab));
        }
    }

    // **BIOGRAPHIE : Bulles cliquables**
    _onToggleBiographyBubble(event) {
        event.preventDefault();
        const title = event.currentTarget;
        const bubble = title.closest('.biography-bubble');
        const content = bubble.querySelector('.bubble-content');
        const icon = title.querySelector('.toggle-icon');
        
        if (content && icon) {
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }
    }

    // **ARMES : Gestion du drag over (highlight)**
    _onSlotDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const slot = event.currentTarget;
        const slotType = slot.dataset.slotType;
        
        const dataTransfer = event.originalEvent?.dataTransfer;
        if (!dataTransfer) return;
        
        try {
            const dragData = dataTransfer.getData("text/plain");
            if (!dragData) return;
            
            const data = JSON.parse(dragData);
            
            if (data.type === "Item") {
                const item = fromUuidSync(data.uuid);
                if (item && this._canEquipInSlot(item, slotType)) {
                    slot.classList.add('slot-highlight');
                    console.log(`✅ ${item.name} peut être équipé dans ${slotType}`);
                } else {
                    slot.classList.add('slot-invalid');
                    console.log(`❌ ${item?.name} ne peut pas être équipé dans ${slotType}`);
                }
            }
        } catch (error) {
            console.log("Pas de données de drag valides");
        }
    }

    _onSlotDragLeave(event) {
        event.preventDefault();
        const slot = event.currentTarget;
        slot.classList.remove('slot-highlight', 'slot-invalid');
    }

    async _onSlotDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const slot = event.currentTarget;
        const slotType = slot.dataset.slotType;
        
        slot.classList.remove('slot-highlight', 'slot-invalid');
        
        try {
            const dragData = event.originalEvent.dataTransfer.getData("text/plain");
            const data = JSON.parse(dragData);
            
            if (data.type === "Item") {
                const item = fromUuidSync(data.uuid);
                
                if (item && this._canEquipInSlot(item, slotType)) {
                    console.log(`🎯 Équipement de ${item.name} dans ${slotType}`);
                    await this._equipItem(item, slotType);
                } else {
                    ui.notifications.warn(`Impossible d'équiper ${item?.name || "cet item"} dans ce slot`);
                }
            }
        } catch (error) {
            console.error("Erreur lors du drop:", error);
            ui.notifications.error("Erreur lors de l'équipement");
        }
    }

    _canEquipInSlot(item, slotType) {
        switch (slotType) {
            case "arme":
                return item.type === "arme" || 
                       (item.type === "item" && (item.system?.degats || item.system?.traits));
            case "armure":
                return item.type === "armure";
            case "accessoire":
                return item.type === "accessoire";
            default:
                return false;
        }
    }

    // **CORRECTION : _equipItem sans supprimer l'item de l'acteur**
    async _equipItem(item, slotType) {
        console.log(`🔧 Équipement en cours: ${item.name} dans ${slotType}`);
        
        // **CORRECTION : S'assurer que l'item est dans l'acteur**
        let actorItem = this.actor.items.get(item.id);
        if (!actorItem) {
            // Créer l'item dans l'acteur s'il n'existe pas
            const itemData = item.toObject ? item.toObject() : item;
            const createdItems = await this.actor.createEmbeddedDocuments("Item", [itemData]);
            actorItem = createdItems[0];
            console.log("✅ Item créé dans l'acteur:", actorItem.id);
        }
        
        const updateData = {};
        
        switch (slotType) {
            case "arme":
                // **CORRECTION : Utiliser actorItem au lieu de item**
                updateData["system.inventaire.armeEquipee"] = {
                    id: actorItem.id, 
                    name: actorItem.name,
                    img: actorItem.img.includes("sword-broad-steel.webp") ? "icons/svg/sword.svg" : actorItem.img,
                    system: {
                        ...actorItem.system,
                        encombrement: actorItem.system.encombrement || 1,
                        degats: actorItem.system.degats || "1d6",
                        touche: actorItem.system.touche || "Force",
                        categorie: actorItem.system.categorie || "Mélée",
                        degatsType: actorItem.system.degatsType || "Contondant",
                        mains: actorItem.system.mains || 1,
                        description: actorItem.system.description || "",
                        rarete: actorItem.system.rarete || "Commune",
                        traits: actorItem.system.traits || [],
                        imperfections: actorItem.system.imperfections || []
                    }
                };
                break;
                
            case "armure":
                // **AJOUT : Gestion des armures**
                updateData["system.inventaire.armureEquipee"] = {
                    id: actorItem.id,
                    name: actorItem.name,
                    img: actorItem.img,
                    system: {
                        ...actorItem.system,
                        encombrement: actorItem.system.encombrement || 1,
                        bonusArmure: actorItem.system.bonusArmure || 1,
                        typeArmure: actorItem.system.typeArmure || "Légère",
                        description: actorItem.system.description || "",
                        rarete: actorItem.system.rarete || "Commune",
                        traits: actorItem.system.traits || [],
                        imperfections: actorItem.system.imperfections || [],
                        valeurOr: actorItem.system.valeurOr || "0 PO"
                    }
                };
                break;
                
            case "accessoire":
                // Déterminer quel slot d'accessoire utiliser
                const accessoire1 = this.actor.system.inventaire?.accessoire1;
                const accessoire2 = this.actor.system.inventaire?.accessoire2;
                
                if (!accessoire1) {
                    updateData["system.inventaire.accessoire1"] = {
                        id: actorItem.id,
                        name: actorItem.name,
                        img: actorItem.img,
                        system: { ...actorItem.system }
                    };
                } else if (!accessoire2) {
                    updateData["system.inventaire.accessoire2"] = {
                        id: actorItem.id,
                        name: actorItem.name,
                        img: actorItem.img,
                        system: { ...actorItem.system }
                    };
                } else {
                    ui.notifications.warn("Tous les slots d'accessoires sont occupés !");
                    return;
                }
                break;
        }
        
        if (Object.keys(updateData).length > 0) {
            try {
                await this.actor.update(updateData);
                ui.notifications.info(`${actorItem.name} équipé(e) !`);
                console.log(`✅ ${actorItem.name} équipé avec succès`);
                console.log("Données sauvegardées:", updateData);
                
                // Forcer le rechargement
                setTimeout(() => {
                    this.render(false);
                }, 100);
            } catch (error) {
                console.error("Erreur lors de la mise à jour:", error);
                ui.notifications.error("Erreur lors de l'équipement");
            }
        }
    }

    // **AJOUT : Calcul du bonus d'armure total (méthode utilitaire)**
_calculateTotalArmorBonus() {
    let totalArmor = 0;
    
    // Armure équipée
    if (this.actor.system.inventaire?.armureEquipee?.system?.bonusArmure) {
        totalArmor += parseInt(this.actor.system.inventaire.armureEquipee.system.bonusArmure) || 0;
    }
    
    // Accessoires avec bonus d'armure
    const accessoire1 = this.actor.system.inventaire?.accessoire1;
    const accessoire2 = this.actor.system.inventaire?.accessoire2;
    
    if (accessoire1?.system?.bonusArmure) {
        totalArmor += parseInt(accessoire1.system.bonusArmure) || 0;
    }
    
    if (accessoire2?.system?.bonusArmure) {
        totalArmor += parseInt(accessoire2.system.bonusArmure) || 0;
    }
    
    return totalArmor;
}

// **AJOUT : Calcul de l'encombrement total avec armures**
_calculateTotalEncumbrance() {
    let totalEncumbrance = 0;
    
    // Arme équipée
    if (this.actor.system.inventaire?.armeEquipee?.system?.encombrement) {
        totalEncumbrance += parseInt(this.actor.system.inventaire.armeEquipee.system.encombrement) || 0;
    }
    
    // Armure équipée
    if (this.actor.system.inventaire?.armureEquipee?.system?.encombrement) {
        totalEncumbrance += parseInt(this.actor.system.inventaire.armureEquipee.system.encombrement) || 0;
    }
    
    // Accessoires
    const accessoire1 = this.actor.system.inventaire?.accessoire1;
    const accessoire2 = this.actor.system.inventaire?.accessoire2;
    
    if (accessoire1?.system?.encombrement) {
        totalEncumbrance += parseInt(accessoire1.system.encombrement) || 0;
    }
    
    if (accessoire2?.system?.encombrement) {
        totalEncumbrance += parseInt(accessoire2.system.encombrement) || 0;
    }
    
    // Items dans l'inventaire
    this.actor.items.forEach(item => {
        if (item.system?.encombrement && !this._isItemEquipped(item)) {
            totalEncumbrance += parseInt(item.system.encombrement) || 0;
        }
    });
    
    return totalEncumbrance;
}

// **AJOUT : Vérifier si un item est équipé**
_isItemEquipped(item) {
    const inventaire = this.actor.system.inventaire || {};
    
    return (
        inventaire.armeEquipee?.id === item.id ||
        inventaire.armureEquipee?.id === item.id ||
        inventaire.accessoire1?.id === item.id ||
        inventaire.accessoire2?.id === item.id
    );
}

// **SYSTÈME : Méthodes du système préservées**
    async _updateObject(event, formData) {
        const expanded = foundry.utils.expandObject(formData);
        console.log("FormData expandObject :", expanded);
        await this.object.update(expanded);
    }

    async render(force=false, options={}) {
        const hasRace = this.actor.system.race;
        const voiesArcane = this.actor.system.voiesArcane || {};
        const hasFirstChoice = voiesArcane.type1 && voiesArcane.key1;
        
        console.log("DEBUG render - hasRace:", hasRace, "hasFirstChoice:", hasFirstChoice, "voiesArcane:", voiesArcane);
        
        if (!hasRace || !hasFirstChoice) {
            await this._showCreationDialog();
        }
        return super.render(force, options);
    }

    async _showCreationDialog() {
        const races = AlyriaRaces || {};
        const voies = AlyriaVoies || {};
        const arcanes = AlyriaArcane || {};

        const raceOptions = Object.entries(races).map(([key, race]) =>
            `<option value="${key}">${race.nom}</option>`
        ).join("");

        const voieOptions = Object.entries(voies).map(([key, voie]) =>
            `<option value="voie:${key}">${voie.nom}</option>`
        ).join("");
        const arcaneOptions = Object.entries(arcanes).map(([key, arcane]) =>
            `<option value="arcane:${key}">${arcane.nom}</option>`
        ).join("");

        const allVoiesOptions = Object.entries(voies).map(([key, voie]) =>
            `<option value="voie:${key}">${voie.nom} (voie)</option>`
        ).join("");

        const allArcanesOptions = Object.entries(arcanes).map(([key, arcane]) =>
            `<option value="arcane:${key}">${arcane.nom} (arcane)</option>`
        ).join("");

        let content = `
            <form>
                <div class="form-group">
                    <label>Race :</label>
                    <select name="race" required>
                        <option value="">-- Choisir --</option>
                        ${raceOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Première voie/arcane :</label>
                    <select name="voie1" required>
                        <option value="">-- Choisir --</option>
                        <optgroup label="Voies">${allVoiesOptions}</optgroup>
                        <optgroup label="Arcanes">${allArcanesOptions}</optgroup>
                    </select>
                </div>
                <div class="form-group">
                    <label>Seconde voie/arcane :</label>
                    <select name="voie2" disabled>
                        <option value="">-- Choisir --</option>
                    </select>
                </div>
            </form>
            <style>
                .form-group { margin-bottom: 10px; }
            </style>
        `;

        return new Promise(resolve => {
            let dlg;
            dlg = new Dialog({
                title: "Création du personnage",
                content,
                render: html => {
                    const $voie1 = html.find('[name="voie1"]');
                    const $voie2 = html.find('[name="voie2"]');
                    
                    $voie1.on('change', function() {
                        const value = $(this).val();
                        let options = `<option value="">-- Choisir --</option>`;
                        if (value.startsWith('voie:')) {
                            options += `<optgroup label="Voies">${voieOptions}</optgroup>`;
                            options += `<optgroup label="Arcanes">${arcaneOptions}</optgroup>`;
                        } else if (value.startsWith('arcane:')) {
                            options += `<optgroup label="Arcanes">${arcaneOptions}</optgroup>`;
                        }
                        $voie2.html(options);
                        $voie2.prop('disabled', false);
                        $voie2.find(`option[value="${value}"]`).remove();
                    });
                },
                buttons: {
                    ok: {
                        label: "Valider",
                        callback: html => {
                            const race = html.find('[name="race"]').val();
                            const voie1 = html.find('[name="voie1"]').val();
                            const voie2 = html.find('[name="voie2"]').val();
                            
                            console.log("DEBUG callback - voie1 RAW:", voie1, "voie2 RAW:", voie2);
                            
                            if (!race || !voie1) {
                                ui.notifications.warn("Vous devez choisir une race et au moins une voie ou un arcane.");
                                this._showCreationDialog();
                                return;
                            }
                            
                            console.log("DEBUG avant split - voie1:", voie1);
                            const [type1, key1] = voie1.split(":");
                            let type2 = "", key2 = "";
                            if (voie2) {
                                console.log("DEBUG avant split - voie2:", voie2);
                                [type2, key2] = voie2.split(":");
                            }
                            
                            console.log("DEBUG après split - type1:", type1, "key1:", key1, "type2:", type2, "key2:", key2);
                            
                            this.actor.update({
                                "system.race": race,
                                "system.voiesArcane": { type1, key1, type2, key2 }
                            });
                            resolve();
                        }
                    }
                },
                close: () => resolve()
            });
            dlg.render(true);
        });
    }

    // **AJOUTER CES MÉTHODES SI ELLES N'EXISTENT PAS DÉJÀ :**

    // Méthode de changement d'input
    _onInputChange(event) {
        const element = event.currentTarget;
        const field = element.name;
        const value = element.type === 'checkbox' ? element.checked : element.value;
        
        // Mise à jour automatique
        this.actor.update({[field]: value});
    }

    // Méthodes de jets de dés (si elles n'existent pas)
    _onRollAttribut(event) {
        // Implementation des jets d'attributs
        console.log("Roll attribut:", event);
    }

    _onRollCompetence(event) {
        // Implementation des jets de compétences  
        console.log("Roll competence:", event);
    }
    // Méthodes drag and drop inventory (si elles n'existent pas)
_onInventoryDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('highlight');
}

_onInventoryDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('highlight');
}

// Méthode _onInventoryDrop déjà présente dans le code...

// Méthodes slots équipement (si elles n'existent pas)
_onSlotDragover(event) {
    event.preventDefault();
    event.currentTarget.classList.add('highlight');
}

// **CORRECTION : _onWeaponOpen - Ouvrir la fiche d'arme équipée**
async _onWeaponOpen(event) {
    event.preventDefault();
    const weaponElement = event.currentTarget.closest('.weapon-compact');
    const itemId = weaponElement.dataset.itemId;
    
    console.log("Ouverture arme ID:", itemId);
    
    if (!itemId) {
        ui.notifications.error("ID d'arme manquant !");
        return;
    }
    
    // **CORRECTION : Chercher UNIQUEMENT dans l'acteur**
    const weapon = this.actor.items.get(itemId);
    
    if (weapon) {
        weapon.sheet.render(true);
        console.log("✅ Fiche arme ouverte:", weapon.name);
    } else {
        console.error("❌ Arme non trouvée:", itemId);
        ui.notifications.error("Arme non trouvée ! Elle a peut-être été supprimée.");
    }
}

// **AJOUT : _onArmorOpen - Ouvrir la fiche d'armure équipée**
async _onArmorOpen(event) {
    event.preventDefault();
    
    // **CORRECTION : Récupérer l'ID du bouton OU de l'élément parent**
    let itemId = event.currentTarget.dataset.itemId;
    if (!itemId) {
        // Fallback : chercher dans l'élément parent
        const armorElement = event.currentTarget.closest('.armor-compact');
        itemId = armorElement?.dataset.itemId;
    }
    
    console.log("Ouverture armure ID:", itemId);
    
    if (!itemId) {
        ui.notifications.error("ID d'armure manquant !");
        return;
    }
    
    // Chercher l'item dans l'acteur
    const armor = this.actor.items.get(itemId);
    
    if (armor) {
        armor.sheet.render(true);
        console.log("✅ Fiche armure ouverte:", armor.name);
    } else {
        console.error("❌ Armure non trouvée:", itemId);
        ui.notifications.error("Armure non trouvée !");
    }
}

// **AJOUT : _onArmorUnequip - Déséquiper l'armure**
async _onArmorUnequip(event) {
    event.preventDefault();
    const armorElement = event.currentTarget.closest('.armor-compact');
    const itemId = armorElement.dataset.itemId;
    
    console.log("Déséquipement armure ID:", itemId);
    
    if (!itemId) {
        ui.notifications.error("ID d'armure manquant !");
        return;
    }
    
    const equippedData = this.actor.system.inventaire.armureEquipee;
    if (equippedData) {
        await this.actor.update({
            'system.inventaire.armureEquipee': null
        });
        
        console.log("✅ Armure déséquipée:", equippedData.name);
        ui.notifications.info(`${equippedData.name} déséquipée !`);
    } else {
        ui.notifications.warn("Aucune armure à déséquiper !");
    }
}
}
