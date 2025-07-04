import { AlyriaRaces } from "../data/AlyriaRace.js";
import { AlyriaVoies } from "../data/AlyriaVoies.js";
import { AlyriaArcane } from "../data/AlyriaArcanes.js";
import { InventoryManager } from "../Inventaire.js";
import { CharacterProgression } from "../character-progression.js";

export default class AlyriaActorSheet extends ActorSheet {
    
    // **AJOUTER dans le constructeur ou au début de la classe :**
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
    const { actor } = this;
    const system = actor.system; // **CORRECTION : Utiliser actor.system au lieu de actorData**

    // Enrichir les données pour l'affichage
    context.system = actor.system || {}; // **CORRECTION : actor.system au lieu de actorData.system**
    context.flags = actor.flags || {};   // **CORRECTION : actor.flags au lieu de actorData.flags**

    // **CORRECTION : Inventaire asynchrone**
    context.inventaire = this._prepareInventoryData();
    // In your getData() method, add this line:
    context.rankImagePath = `systems/alyria/module/data/images/icones/${context.system.rang || 'Novice'}.png`;

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
        
        
        if (equippedArmor) {
            // Enrichir TOUTES les données nécessaires
            context.system.inventaire.armureEquipee = {
                ...this.actor.system.inventaire.armureEquipee, // Garder les données existantes
                ...equippedArmor.toObject(), // Ajouter toutes les données de l'item
                rarityColor: this._getRarityColor(equippedArmor.system.rarete || "Commune"),
                rarityIcon: this._getRarityIcon(equippedArmor.system.rarete || "Commune"),
                traits: equippedArmor.system.traits || [],
                imperfections: equippedArmor.system.imperfections || []
            };
            
            console.log("✅ Armure équipée 🛡️ :", context.system.inventaire.armureEquipee, "ID:", context.system.inventaire.armureEquipee.id);
        } else {
            console.log("❌ Armure équipée non trouvée dans les items");
            // Nettoyer la référence si l'item n'existe plus
            context.system.inventaire.armureEquipee = null;
        }
    } else {
        console.log("🛡️ Aucune armure équipée");
    }

    // **RACES/VOIES : Code existant préservé**
    context.selectedRace = this._prepareRaceData(context.system.race);
    this._prepareVoiesArcanes(context);

    // **AJOUTER : Données de l'historique**
if (system.historique) {
    context.selectedHistorique = this._prepareHistoriqueData(system.historique);
}
    

    // **CORRECTION COMPLÈTE : Ajout des stats majeures aux mineures**
    // **CORRIGER la fonction d'association des stats majeures**
    const attributsMineurs = [
        'monde', 'mystique', 'nature', 'sacré', 'robustesse', 'calme',
        'marchandage', 'persuasion', 'artmusique', 'commandement',
        'acrobatie', 'discretion', 'adresse', 'artisanat', 'hasard',
        'athlétisme', 'puissance', 'intimidation', 'perception',
        'perceptionmagique', 'medecine', 'intuition'
    ];

    attributsMineurs.forEach(attribut => {
        // Calculer la valeur de la stat majeure associée
        let majeureAssociee = 0;
        
        if (["robustesse", "calme"].includes(attribut)) {
            majeureAssociee = system.majeures.defense.totale || 0;
        }
        else if (["marchandage", "persuasion", "artmusique", "commandement"].includes(attribut)) {
            majeureAssociee = system.majeures.charisme.totale || 0;
        }
        else if (["acrobatie", "discretion", "artisanat", "adresse"].includes(attribut)) {
            majeureAssociee = system.majeures.dexterite.totale || 0;
        }
        else if (["puissance", "intimidation", "athlétisme"].includes(attribut)) {
            majeureAssociee = system.majeures.force.totale || 0;
        }
        else if (["perception", "perceptionmagique", "intuition", "medecine"].includes(attribut)) {
            majeureAssociee = system.majeures.sagesse.totale || 0;
        }
        else if (["hasard"].includes(attribut)) {
            majeureAssociee = system.majeures.chance.totale || 0;
        }
        else if (["monde", "mystique", "nature", "sacré"].includes(attribut)) {
            majeureAssociee = system.majeures.intelligence.totale || 0;
        }

        // Garder les valeurs existantes
        const creation = system.mineures[attribut]?.creation || 0;
        
        const repartition = system.mineures[attribut]?.repartition || 0;
        const equipement = system.mineures[attribut]?.equipement || 0;
        const talents = system.mineures[attribut]?.talents || 0;
        const bonus = system.mineures[attribut]?.bonus || 0;
        
        // Mettre à jour avec la stat majeure
        system.mineures[attribut] = {
            creation: creation,
            repartition: repartition,
            equipement: equipement,
            talents: talents,
            bonus: bonus,
            majeureAssocie: majeureAssociee,
            totale: creation + repartition + equipement + talents + bonus + majeureAssociee
        };
    });

    // **FORCER la mise à jour du contexte avec les nouvelles valeurs**
    attributsMineurs.forEach(attribut => {
        // ... calculs existants ...
        
        // **FORCER la mise à jour dans le contexte**
        if (!context.system.mineures) context.system.mineures = {};
        context.system.mineures[attribut] = system.mineures[attribut];
    });


    // **NOUVEAU : Préparer les sorts pour l'affichage**
    context.sortsChoisis = (system.sortsChoisis || []).map(sort => {
        // Extraire le nom depuis l'ID
        const nomSort = sort.id ? sort.id.split(':').pop() : 'Sort inconnu';
        
        return {
            id: sort.id,
            displayName: nomSort, // Pour {{sort.displayName}}
            Touche: sort.rang, // Pour {{sort.Touche}} 
            Psy: sort.niveau, // Pour {{sort.Psy}}
            Action: sort.source, // Pour {{sort.Action}}
            Distance: "Variable", // Pour {{sort.Distance}}
            Zone: "Variable", // Pour {{sort.Zone}}
            rang: sort.rang, // Pour data-rang et les couleurs
            level: sort.rang, // Pour {{sort.level}}
            description: `Sort de rang ${sort.rang} (niveau ${sort.niveau})`
        };
    });
        
        context.sortsChoisis = this._prepareSortsChoisis();
    
    // **SUPPRIMER l'ancien code qui ne marche pas :**
    // context.sortsChoisis = (system.sortsChoisis || []).map(sort => { ... });
    
    context.sortsDisponibles = CharacterProgression._getAvailableSpellsForLevelUp ? 
        CharacterProgression._getAvailableSpellsForLevelUp(actor) : 
        [];
        
    context.nbSortsRestants = system.nbSortsAChoisir || 0;

    return context;
    }

    // **HELPER : Préparer les données de race**
    _prepareRaceData(raceKey) {
        const raceData = AlyriaRaces?.[raceKey] ?? {};
        
        return {
            nom: raceData.nom || "Non définie",
            description: raceData.description || [],
            // **CORRECTION : Utiliser le nom du talent racial au lieu de l'objet entier**
            talentRace: raceData.talentRace?.nom || raceData.talentRace || "Aucun talent de race",
            // **CORRECTION : Utiliser la description du talent racial**
            competenceRaciale: raceData.talentRace?.description || 
                              raceData.talentRace?.effet ||
                              raceData.competenceRaciale || 
                              "Description du talent racial non disponible"
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
            talentVoie: voie.talentVoie || { talents: [] },
            sortileges: voie.sortileges || [],
            // **CORRECTION : Essayer plusieurs noms possibles**
            mecanique: voie.mecanique || voie.mecaniques || voie.mécanique || voie.mecaniqueVoie || []
        };
    }

    // **HELPER : Préparer les données d'arcane**
    _prepareArcaneData(arcaneKey) {
        const arcane = AlyriaArcane?.[arcaneKey];
        if (!arcane) return null;
        
        return {
            nom: arcane.nom || arcaneKey,
            description: arcane.description || [],
            // **CORRECTION : Utiliser talentArcane.talents au lieu de talentsArcane**
            talentArcane: arcane.talentArcane || { talents: [] },
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

    static async _registerHandlebarsHelpers() {
    // Helper pour convertir en minuscules
    Handlebars.registerHelper('toLowerCase', function(str) {
        return str ? str.toLowerCase() : '';
    });
    
    // Helper pour comparer les valeurs
    Handlebars.registerHelper('eq', function(a, b) {
        return a === b;
    });
}

activateListeners(html) {
    super.activateListeners(html);
    
    // **NAVIGATION ET JETS DE DÉS**
    html.find('.sheet-navigation .item').click(this._onTabClick.bind(this));
    html.find('.rollable-dice').click(this._onRollCharacteristic.bind(this));
    
    // **COMBAT**
    html.find('.combat-action-btn[data-action="block"]').click(this._onBlockAction.bind(this));
    html.find('.combat-action-btn[data-action="attack"]').click(this._onAttackAction.bind(this));
    
    // **RÉCUPÉRATION ET LEVEL UP**
    html.find('.recovery-button, .open-recovery-dialog').click(this._onOpenRecoveryDialog.bind(this));
    html.find('.level-up-btn, .level-display-btn').click(this._onLevelUp.bind(this));
    
    // **DRAG & DROP INVENTAIRE**
    html.find('.inventory-drop-zone').on('drop', this._onInventoryDrop.bind(this));
    html.find('.inventory-drop-zone').on('dragover', this._onInventoryDragOver.bind(this));
    html.find('.inventory-drop-zone').on('dragleave', this._onInventoryDragLeave.bind(this));
    
    // **DRAG & DROP ÉQUIPEMENT**
    html.find('.item-slot').on('drop', this._onEquipmentSlotDrop.bind(this));
    html.find('.item-slot').on('dragover', this._onEquipmentSlotDragOver.bind(this));
    html.find('.item-slot').on('dragleave', this._onEquipmentSlotDragLeave.bind(this));
    
    // **ACTIONS D'ITEMS GÉNÉRIQUES**
    html.find('.item-equip').click(this._onItemEquip.bind(this));
    html.find('.item-remove').click(this._onItemRemove.bind(this));
    html.find('.item-open, .item-edit').click(this._onItemOpen.bind(this));
    
    // **ÉQUIPEMENTS SPÉCIFIQUES - ARMES**
    html.find('.weapon-open, .weapon-edit, .arme-open').click(this._onWeaponOpen.bind(this));
    html.find('.weapon-unequip, .arme-unequip').click(this._onWeaponUnequip.bind(this));
    
    // **NOUVEAUX SÉLECTEURS : Pour l'équipement affiché**
    html.find('.equipped-weapon .weapon-name, .equipped-weapon .item-name').click(this._onWeaponOpen.bind(this));
    html.find('.equipped-armor .armor-name, .equipped-armor .item-name').click(this._onArmorOpen.bind(this));
    html.find('.equipped-accessory .accessory-name, .equipped-accessory .item-name').click(this._onItemOpen.bind(this));
    
    // **ACTIONS D'ARMURES**
    html.find('.armor-open, .armure-open').click(this._onArmorOpen.bind(this));
    html.find('.armor-unequip, .armure-unequip').click(this._onArmorUnequip.bind(this));
    
        // **AJOUT : ACTIONS D'ACCESSOIRES**
    html.find('.accessory-open, .accessoire-open').click(this._onAccessoryOpen.bind(this));
    html.find('.accessory-unequip, .accessoire-unequip').click(this._onAccessoryUnequip.bind(this));
    
    // **AJOUT : Listeners génériques pour tous les équipements**
    html.find('.equipped-accessory .accessory-name, .equipped-accessory .item-name').click(this._onAccessoryOpen.bind(this));
    html.find('.accessory-compact .accessory-name').click(this._onAccessoryOpen.bind(this));
   
    // **DÉSÉQUIPEMENT GÉNÉRIQUE**
    html.find('.item-unequip').click(this._onUnequipItem.bind(this));
    
    // **SORTS**
    html.find('.sort-icon-square, .sort-cast-button').click(this._onCastSpell.bind(this));
    html.find('.sort-expand-btn').click(this._onToggleSortDetails.bind(this));
    
    // **BULLES BIOGRAPHIQUES**
    html.find('.biography-bubble .bubble-title').off('click').on('click', (event) => {
        event.preventDefault();
        const title = event.currentTarget;
        const bubble = $(title).closest('.biography-bubble');
        const content = bubble.find('.bubble-content');
        const icon = $(title).find('.toggle-icon');
        
        if (content.hasClass('hidden')) {
            content.removeClass('hidden');
            icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else {
            content.addClass('hidden');
            icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });
    
    // **DRAG START**
    if (this._onDragStart) {
        html.find('.inventory-item[draggable="true"], .item[draggable="true"]').on('dragstart', this._onDragStart.bind(this));
    }
    
    console.log("✅ Tous les listeners activés correctement");
}
    // **AJOUTER : Méthode _onWeaponUnequip qui manque peut-être**
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

    // **CORRECTION : Déterminer si c'est une caractéristique majeure ou mineure**
    const majeuresKeys = ['force', 'dexterite', 'constitution', 'intelligence', 'sagesse', 'charisme', 'defense', 'chance'];
    const isMajeure = majeuresKeys.includes(characteristicName.toLowerCase());
    
    // **CORRECTION : Critique différencié selon le type**
    const toucheCritique = isMajeure ? 
        (this.actor.system.toucheChance || 5) :  // Majeures : toucheChance variable
        5;                                        // Mineures : 5% fixe

    // **DEBUG : Afficher les informations**
    console.log(`🎲 Jet de ${characteristicName} - Type: ${isMajeure ? 'Majeure' : 'Mineure'} - Critique: ${toucheCritique}%`);

    const roll = new Roll("1d100");
    await roll.evaluate();
    const rollTotal = roll.total;

    let flavor = `🎲 **Jet de ${characteristicName}** ${isMajeure ? '(Majeure)' : '(Mineure)'} (Seuil: ${targetValue}%, Critique: ${toucheCritique}%)`;
    
    // Déterminer le résultat
    let resultClass = "";
    let resultText = "";
    
    const echecCritiqueSeuil = 96; // 96, 97, 98, 99, 100

    if (rollTotal <= toucheCritique) {
        resultClass = "success-critical";
        resultText = "🌟 **SUCCÈS CRITIQUE !** 🌟";
        flavor += `\n<span style="color: blue; font-weight: bold;">${resultText}</span>`;
    } else if (rollTotal >= echecCritiqueSeuil) {
        resultClass = "failure-critical";
        resultText = "💥 **ÉCHEC CRITIQUE !**";
        flavor += `\n<span style="color: red; font-weight: bold;">${resultText}</span>`;
    } else if (rollTotal <= targetValue) {
        resultClass = "success";
        resultText = "✅ **SUCCÈS !**";
        flavor += `\n<span style="color: green; font-weight: bold;">${resultText}</span>`;
    } else {
        resultClass = "failure";
        resultText = "❌ **ÉCHEC !**";
        flavor += `\n<span style="color: orange; font-weight: bold;">${resultText}</span>`;
    }

    // **UTILISER roll.toMessage() pour avoir l'animation des dés**
    await roll.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        flavor: flavor
    });
}

// **NOUVELLE MÉTHODE : Démarrer le drag (simple)**
_onDragStart(event) {
    const itemId = event.currentTarget.dataset.itemId;
    const itemType = event.currentTarget.dataset.itemType;
    const encombrement = event.currentTarget.dataset.encombrement || "1";
    const slotIndex = event.currentTarget.dataset.slotIndex || "0";
    
    const dragData = {
        type: "InventoryItem",
        itemId: itemId,
        itemType: itemType,
        encombrement: parseInt(encombrement),
        originalIndex: parseInt(slotIndex),
        actorId: this.actor.id
    };
    
    event.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    console.log("🎯 Drag started:", dragData);
}

// **AJOUTER : Méthode de navigation des onglets**
_onTabClick(event) {
    event.preventDefault();
    const clickedTab = event.currentTarget;
    const targetTab = clickedTab.dataset.tab;
    
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
        
    } else {
        console.error("❌ Onglet non trouvé:", targetTab);
    }
}

// **AJOUTER : Méthode pour les bulles biographiques**
_onBubbleToggle(event) {
    event.preventDefault();
    const bubbleTitle = event.currentTarget;
    const bubble = bubbleTitle.closest('.biography-bubble');
    
    if (!bubble) {
        console.error("❌ Élément bulle non trouvé");
        return;
    }
    
    const content = bubble.querySelector('.bubble-content');
    const icon = bubbleTitle.querySelector('.toggle-icon');
    
    if (!content) {
        console.error("❌ Contenu de bulle non trouvé");
        return;
    }
    
    if (!icon) {
        console.error("❌ Icône de toggle non trouvée");
        return;
    }
    
    console.log("🎭 Toggle bulle:", bubbleTitle.textContent);
    
    // Toggle le contenu
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


// **MODIFICATION de _onInventoryDrop existant**
async _onInventoryDrop(event) {
    event.preventDefault();
    
    try {
        const dragData = event.originalEvent.dataTransfer.getData('text/plain');
        const data = JSON.parse(dragData);
        
        if (data.type === "Item") {
            const item = await fromUuid(data.uuid);
            if (item) {
                console.log("📦 Drop item externe:", item.name);
                const success = await InventoryManager.addItemToInventory(this.actor, item);
                if (success) {
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
    
    let itemId = event.currentTarget.dataset.itemId;
    let equipType = event.currentTarget.dataset.equipType;
    
    // **RÉCUPÉRATION D'ID EXISTANTE...**
    if (!itemId) {
        const itemContainer = event.currentTarget.closest('[data-item-id]');
        if (itemContainer) {
            itemId = itemContainer.dataset.itemId;
            console.log("🔧 ID récupéré depuis parent proche:", itemId);
        }
    }
    
    // ... autres méthodes de récupération ...
    
    console.log(`🎯 Équipement de l'item ${itemId} en tant que ${equipType}`);
    
    if (!itemId || !equipType) {
        console.error("❌ Données manquantes:", { itemId, equipType });
        ui.notifications.error("Données d'équipement manquantes !");
        return;
    }
    
    // **Vérifier que l'item existe**
    const item = this.actor.items.get(itemId);
    if (!item) {
        ui.notifications.error("Objet non trouvé !");
        console.error("❌ Item non trouvé:", itemId);
        return;
    }
    
    // **CORRECTION : Gestion des accessoires avec vérification de l'état réel**
    let finalEquipType = equipType;
    if (equipType === "accessoire") {
        const inventory = this.actor.system.inventaire || {};
        
        // **VÉRIFICATION RÉELLE des slots d'accessoires**
        const slot1Item = inventory.accessoire1;
        const slot2Item = inventory.accessoire2;
        
       
        // **Vérifier si les items équipés existent vraiment**
        const slot1Valid = slot1Item && this.actor.items.get(slot1Item.id);
        const slot2Valid = slot2Item && this.actor.items.get(slot2Item.id);
        
      
        // **NETTOYER les références fantômes si nécessaire**
        if (slot1Item && !slot1Valid) {
            console.log("🧹 Nettoyage slot 1 fantôme:", slot1Item.name);
            await this.actor.update({ "system.inventaire.accessoire1": null });
            inventory.accessoire1 = null;
        }
        
        if (slot2Item && !slot2Valid) {
            console.log("🧹 Nettoyage slot 2 fantôme:", slot2Item.name);
            await this.actor.update({ "system.inventaire.accessoire2": null });
            inventory.accessoire2 = null;
        }
        
        // **Déterminer le slot à utiliser APRÈS nettoyage**
        if (!inventory.accessoire1) {
            finalEquipType = "accessoire1";
            console.log("✅ Utilisation du slot 1");
        } else if (!inventory.accessoire2) {
            finalEquipType = "accessoire2";
            console.log("✅ Utilisation du slot 2");
        } else {
            // Les deux slots sont vraiment occupés
            const slot1Name = inventory.accessoire1.name || "Accessoire 1";
            const slot2Name = inventory.accessoire2.name || "Accessoire 2";
            
            const choice = await Dialog.confirm({
                title: "Remplacer un accessoire ?",
                content: `
                    <div style="margin-bottom: 15px;">
                        <p>Les deux slots d'accessoires sont occupés :</p>
                        <ul>
                            <li><strong>Slot 1 :</strong> ${slot1Name}</li>
                            <li><strong>Slot 2 :</strong> ${slot2Name}</li>
                        </ul>
                        <p>Quel accessoire voulez-vous remplacer ?</p>
                    </div>
                `,
                yes: () => true,
                no: () => false,
                defaultYes: false
            }, {
                title: "Choisir le slot",
                yes: "Remplacer Slot 1",
                no: "Remplacer Slot 2"
            });
            finalEquipType = choice ? "accessoire1" : "accessoire2";
            console.log(`🔄 Remplacement choisi: ${finalEquipType}`);
        }
    }
    
    console.log(`🔧 Type final d'équipement: ${finalEquipType}`);
    
    const success = await InventoryManager.equipItemFromInventory(this.actor, itemId, finalEquipType);
    if (success) {
        this.render(false);
    }
}

    async _onItemRemove(event) {
        event.preventDefault();
        const itemId = event.currentTarget.dataset.itemId;
        
        // **Récupérer le nom de l'item pour la confirmation**
        const item = this.actor.items.get(itemId);
        const itemName = item ? item.name : 'cet objet';
        
        const confirm = await Dialog.confirm({
            title: "Supprimer l'objet",
            content: `<p>Êtes-vous sûr de vouloir supprimer <strong>${itemName}</strong> ?</p>`,
            yes: () => true,
            no: () => false
        });
        
        if (!confirm) return;
        
        const success = await InventoryManager.removeItemFromInventory(this.actor, itemId);
        if (success) {
            this.render(false);
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
                message += `➕ ${bonus}\n`;
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

        // **NOUVELLE MÉTHODE : _onAccessoryOpen - Ouvrir la fiche d'accessoire équipé**
    async _onAccessoryOpen(event) {
        event.preventDefault();
        
        let itemId = null;
        let foundAccessory = null;
        
        // **MÉTHODE 1 : ID sur le bouton directement**
        itemId = event.currentTarget.dataset.itemId;
        
        // **MÉTHODE 2 : ID sur l'élément parent**
        if (!itemId) {
            const accessoryElement = event.currentTarget.closest('[data-item-id]');
            itemId = accessoryElement?.dataset.itemId;
        }
        
        // **MÉTHODE 3 : ID depuis l'inventaire si pas trouvé**
        if (!itemId) {
            const inventaire = this.actor.system.inventaire;
            const accessoire1 = inventaire?.accessoire1;
            const accessoire2 = inventaire?.accessoire2;
            
            // **Essayer de deviner quel accessoire on veut ouvrir**
            const slotIndex = event.currentTarget.dataset.slotIndex || 
                             event.currentTarget.closest('[data-slot-index]')?.dataset.slotIndex;
            
            if (slotIndex === "1" && accessoire1?.id) {
                itemId = accessoire1.id;
                console.log("🔧 ID récupéré depuis accessoire1:", itemId);
            } else if (slotIndex === "2" && accessoire2?.id) {
                itemId = accessoire2.id;
                console.log("🔧 ID récupéré depuis accessoire2:", itemId);
            } else if (accessoire1?.id) {
                // Fallback sur le premier accessoire
                itemId = accessoire1.id;
                console.log("🔧 ID récupéré depuis accessoire1 (fallback):", itemId);
            } else if (accessoire2?.id) {
                itemId = accessoire2.id;
                console.log("🔧 ID récupéré depuis accessoire2 (fallback):", itemId);
            }
        }
        
        console.log("🔍 Recherche accessoire avec ID:", itemId);
        
        // **TENTATIVE 1 : Chercher par ID**
        if (itemId) {
            foundAccessory = this.actor.items.get(itemId);
            if (foundAccessory) {
                console.log("✅ Accessoire trouvé par ID:", foundAccessory.name);
            } else {
                console.log("❌ Accessoire non trouvé par ID, tentative par nom...");
            }
        }
        
        // **TENTATIVE 2 : Fallback par nom si ID ne marche pas**
        if (!foundAccessory) {
            const inventaire = this.actor.system.inventaire;
            const accessoire1 = inventaire?.accessoire1;
            const accessoire2 = inventaire?.accessoire2;
            
            let accessoryName = null;
            if (accessoire1?.name) {
                accessoryName = accessoire1.name;
            } else if (accessoire2?.name) {
                accessoryName = accessoire2.name;
            }
            
            if (accessoryName) {
                foundAccessory = this.actor.items.find(item => 
                    item.type === "accessoire" && item.name === accessoryName
                );
                
                if (foundAccessory) {
                    console.log("✅ Accessoire trouvé par nom:", foundAccessory.name);
                }
            }
        }
        
        // **TENTATIVE 3 : Prendre le premier accessoire disponible**
        if (!foundAccessory) {
            const availableAccessories = this.actor.items.filter(item => item.type === "accessoire");
            if (availableAccessories.length > 0) {
                foundAccessory = availableAccessories[0];
                console.log("🔧 Fallback: premier accessoire disponible:", foundAccessory.name);
            }
        }
        
        // **OUVRIR LA FICHE**
        if (foundAccessory) {
            foundAccessory.sheet.render(true);
            console.log("✅ Fiche accessoire ouverte:", foundAccessory.name);
        } else {
            console.error("❌ Aucun accessoire trouvé");
            console.log("📋 Items disponibles:", this.actor.items.contents.map(i => `${i.name} (${i.id})`));
            ui.notifications.error("Aucun accessoire disponible !");
        }
    }
    
    // **NOUVELLE MÉTHODE : _onAccessoryUnequip - Déséquiper un accessoire**
    async _onAccessoryUnequip(event) {
        event.preventDefault();
        
        // **Récupérer le type d'équipement depuis le bouton**
        let equipType = event.currentTarget.dataset.equipType;
        
        // **Si pas trouvé, essayer de deviner depuis l'élément parent**
        if (!equipType) {
            const accessoryElement = event.currentTarget.closest('[data-slot-index]');
            const slotIndex = accessoryElement?.dataset.slotIndex;
            
            if (slotIndex === "1") {
                equipType = "accessoire1";
            } else if (slotIndex === "2") {
                equipType = "accessoire2";
            }
        }
        
        // **Fallback : chercher dans l'inventaire**
        if (!equipType) {
            const accessoryElement = event.currentTarget.closest('.accessory-compact');
            const itemId = accessoryElement?.dataset.itemId;
            
            if (itemId) {
                const inventaire = this.actor.system.inventaire;
                
                // Déterminer quel slot contient cet item
                if (inventaire.accessoire1?.id === itemId) {
                    equipType = "accessoire1";
                } else if (inventaire.accessoire2?.id === itemId) {
                    equipType = "accessoire2";
                }
            }
        }
        
        console.log("🔧 Déséquipement accessoire:", equipType);
        
        if (!equipType) {
            ui.notifications.error("Impossible de déterminer quel accessoire déséquiper !");
            return;
        }
        
        // **Récupérer les données de l'accessoire équipé**
        const inventaire = this.actor.system.inventaire;
        const equippedData = inventaire[equipType];
        
        if (equippedData) {
            await this.actor.update({
                [`system.inventaire.${equipType}`]: null
            });
            
            console.log("✅ Accessoire déséquipé:", equippedData.name);
            ui.notifications.info(`${equippedData.name} déséquipé !`);
            
            // **Refresh la feuille**
            this.render(false);
        } else {
            ui.notifications.warn("Aucun accessoire à déséquiper dans ce slot !");
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
        const slotVariant = slot.dataset.slotVariant; // 'secondaire' pour arme secondaire
        const slotIndex = slot.dataset.slotIndex; // '1' ou '2' pour accessoires
        
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
        
        if (!hasRace || !hasFirstChoice) {
            await this._showCreationDialog();
        }
        return super.render(force, options);
    }

async _showCreationDialog() {
    return CharacterProgression.showCreationDialog(this.actor);
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
    
    let itemId = null;
    let foundWeapon = null;
    
    // **MÉTHODE 1 : ID sur le bouton directement**
    itemId = event.currentTarget.dataset.itemId;
    
    // **MÉTHODE 2 : ID sur l'élément parent**
    if (!itemId) {
        const weaponElement = event.currentTarget.closest('[data-item-id]');
        itemId = weaponElement?.dataset.itemId;
    }
    
    // **MÉTHODE 3 : ID depuis l'inventaire**
    if (!itemId) {
        const inventaire = this.actor.system.inventaire;
        const armeEquipee = inventaire?.armeEquipee;
        const arme = inventaire?.arme;
        
        if (armeEquipee?.id) {
            itemId = armeEquipee.id;
            console.log("🔧 ID récupéré depuis armeEquipee:", itemId);
        } else if (arme?.id) {
            itemId = arme.id;
            console.log("🔧 ID récupéré depuis arme:", itemId);
        }
    }
    
    console.log("🔍 Recherche arme avec ID:", itemId);
    
    // **TENTATIVE 1 : Chercher par ID**
    if (itemId) {
        foundWeapon = this.actor.items.get(itemId);
        if (foundWeapon) {
            console.log("✅ Arme trouvée par ID:", foundWeapon.name);
        } else {
            console.log("❌ Arme non trouvée par ID, tentative par nom...");
        }
    }
    
    // **TENTATIVE 2 : Fallback par nom si ID ne marche pas**
    if (!foundWeapon) {
        const inventaire = this.actor.system.inventaire;
        const armeEquipee = inventaire?.armeEquipee;
        const arme = inventaire?.arme;
        
        let weaponName = null;
        if (armeEquipee?.name) {
            weaponName = armeEquipee.name;
        } else if (arme?.name) {
            weaponName = arme.name;
        }
        
        if (weaponName) {
            foundWeapon = this.actor.items.find(item => 
                item.type === "arme" && item.name === weaponName
            );
            
            if (foundWeapon) {
                console.log("✅ Arme trouvée par nom:", foundWeapon.name, "ID réel:", foundWeapon.id);
                
                // **CORRECTION AUTOMATIQUE : Mettre à jour l'ID dans l'inventaire**
                await this._fixWeaponIdMismatch(foundWeapon);
            }
        }
    }
    
    // **TENTATIVE 3 : Prendre la première arme disponible**
    if (!foundWeapon) {
        const availableWeapons = this.actor.items.filter(item => item.type === "arme");
        if (availableWeapons.length > 0) {
            foundWeapon = availableWeapons[0];
            console.log("🔧 Fallback: première arme disponible:", foundWeapon.name);
        }
    }
    
    // **OUVRIR LA FICHE**
    if (foundWeapon) {
        foundWeapon.sheet.render(true);
        console.log("✅ Fiche arme ouverte:", foundWeapon.name);
    } else {
        console.error("❌ Aucune arme trouvée");
        console.log("📋 Items disponibles:", this.actor.items.contents.map(i => `${i.name} (${i.id})`));
        ui.notifications.error("Aucune arme disponible !");
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

// **AJOUTER cette méthode pour préparer les données historiques**
_prepareHistoriqueData(historiqueKey) {
    
    const historiqueData = AlyriaHistorique?.[historiqueKey] ?? {};
   
    return {
        nom: historiqueData.nom || "Non défini",
        description: historiqueData.description || "Aucune description",
        talents: historiqueData.talents || []
    };
}

// **NOUVEAU : Méthode pour lancer un sort**
async _onCastSpell(event) {
    event.preventDefault();
    event.stopPropagation(); // Empêcher l'expansion
    
    const sortId = event.currentTarget.dataset.sortAction;
    
    if (!sortId) {
        ui.notifications.warn("Aucune action de sort définie.");
        return;
    }
    
    console.log("🔮 Lancement du sort:", sortId);
    
    // **CORRECTION : Utiliser _getSortData au lieu de CharacterProgression._getSpellDetails**
    const sortDetails = this._getSortData(sortId);
    
    if (!sortDetails) {
        ui.notifications.error("Détails du sort non trouvés !");
        console.error("❌ Sort non trouvé:", sortId);
        return;
    }
    
    // Vérifier les points de psyché
    const psyCost = parseInt(sortDetails.Psy) || 0;
    const currentPsy = this.actor.system.pointsPsyque.actuels;
    
    if (currentPsy < psyCost) {
        ui.notifications.warn(`Pas assez de points de Psyché ! Coût: ${psyCost}, Disponible: ${currentPsy}`);
        return;
    }
    
    // Animation de l'icône
    const icon = event.currentTarget;
    icon.style.transform = 'scale(1.3) rotate(360deg)';
    setTimeout(() => {
        icon.style.transform = '';
    }, 500);
    
    // **DIALOGUE DE LANCEMENT**
    this._showSpellCastDialog(sortDetails);
}

async _onLevelUp(event) {
    event.preventDefault();
    const actor = this.actor;
    
    // Vérifier si le personnage peut monter de niveau
    if (!actor.system.niveauJoueur) {
        ui.notifications.warn("Ce personnage n'a pas de niveau défini !");
        return;
    }
    
    // Lancer le processus de montée de niveau
    await CharacterProgression.showLevelUpDialog(actor);
}

// **NOUVEAU : Méthode pour la sélection de sorts en montée de niveau**
async _onSpellSelectionChange(event) {
    // À implémenter pour la montée de niveau
    console.log("Sélection de sort changée:", event.currentTarget.value);
}

// **CORRECTION ligne 1427 - Il y a une accolade en trop :**
_onToggleSortDetails(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const cartouche = event.currentTarget.closest('.sort-cartouche');
    const details = cartouche.querySelector('.sort-details');
    const expandBtn = cartouche.querySelector('.sort-expand-btn i');
    
    // Toggle l'affichage
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        cartouche.classList.add('expanded');
    } else {
        details.classList.add('hidden');
        cartouche.classList.remove('expanded');
    }
}

// **NOUVELLE MÉTHODE : Expansion/réduction des sorts**
async _onSortToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    const cartouche = button.closest('.sort-cartouche');
    const details = cartouche.querySelector('.sort-details');
    const icon = button.querySelector('i');
    
    if (cartouche.classList.contains('expanded')) {
        // Réduire
        cartouche.classList.remove('expanded');
        details.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Étendre
        cartouche.classList.add('expanded');
        details.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    }
}

// **NOUVELLE MÉTHODE : Lancement de sort**
async _onSortCast(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const element = event.currentTarget;
    const sortAction = element.dataset.sortAction;
    
    if (!sortAction) {
        ui.notifications.warn("Aucune action de sort définie.");
        return;
    }
    
    console.log("🔮 Lancement du sort:", sortAction);
    
    // **RÉCUPÉRER les données du sort**
    const sortData = this._getSortData(sortAction);
    if (!sortData) {
        ui.notifications.error("Sort introuvable !");
        return;
    }
    
    // **VÉRIFIER les PSY**
    const psyCost = parseInt(sortData.Psy) || 0;
    const currentPsy = this.actor.system.pointsPsyque?.actuels || 0;
    
    if (currentPsy < psyCost) {
        ui.notifications.warn(`Pas assez de PSY ! Coût: ${psyCost}, Disponible: ${currentPsy}`);
        return;
    }
    
    // **DIALOGUE DE LANCEMENT**
    this._showSpellCastDialog(sortData);
}

// **NOUVELLE MÉTHODE : Récupérer les données d'un sort**
_getSortData(sortId) {
    
    // Format ID: "voie:nomVoie:nomSort" ou "arcane:nomArcane:nomSort"
    const [sourceType, sourceKey, ...sortNameParts] = sortId.split(':');
    const sortName = sortNameParts.join(':'); // Au cas où le nom contient des ":"
    
    console.log("📋 Parsing:", { sourceType, sourceKey, sortName });
    
    if (sourceType === "voie") {
        const voieData = AlyriaVoies?.[sourceKey];
        if (voieData?.sortVoie) {
            // Chercher dans tous les niveaux de sorts
            const allSorts = [
                ...(Object.values(voieData.sortVoie.sortNovice || {})),
                ...(Object.values(voieData.sortVoie.sortConfirme || {})),
                ...(Object.values(voieData.sortVoie.sortExpert || {})),
                ...(Object.values(voieData.sortVoie.sortMaitre || {}))
            ];
            
            const sortFound = allSorts.find(sort => sort.nom === sortName);
            if (sortFound) {
                console.log("✅ Sort trouvé dans voie:", sortFound);
                return sortFound;
            }
        }
    } else if (sourceType === "arcane") {
        const arcaneData = AlyriaArcane?.[sourceKey];
        if (arcaneData?.sortArcane) {
            // Chercher dans tous les niveaux de sorts
            const allSorts = [
                ...(Object.values(arcaneData.sortArcane.sortNovice || {})),
                ...(Object.values(arcaneData.sortArcane.sortConfirme || {})),
                ...(Object.values(arcaneData.sortArcane.sortExpert || {})),
                ...(Object.values(arcaneData.sortArcane.sortMaitre || {}))
            ];
            
            const sortFound = allSorts.find(sort => sort.nom === sortName);
            if (sortFound) {
                console.log("✅ Sort trouvé dans arcane:", sortFound);
                return sortFound;
            }
        }
    }
    
    console.warn("❌ Sort non trouvé:", sortId);
    return null;
}

// **NOUVELLE MÉTHODE : Dialogue de lancement de sort**
async _showSpellCastDialog(sortData) {
    const content = `
        <div class="spell-cast-dialog">
            <h3>🔮 Lancer un Sort</h3>
            
            <div class="spell-info">
                <h4>${sortData.nom}</h4>
                <p><strong>Coût :</strong> ${sortData.Psy} PSY</p>
                <p><strong>Touche :</strong> ${sortData.Touche}</p>
                <p><strong>Distance :</strong> ${sortData.Distance}</p>
                <p><strong>Zone :</strong> ${sortData.Zone}</p>
            </div>
            
            <div class="spell-description">
                <p>${sortData.description}</p>
            </div>
            
            <div class="spell-roll-options">
                <label>
                    <input type="checkbox" name="rollDice" checked>
                    Effectuer un jet de dés (${sortData.Touche})
                </label>
            </div>
        </div>
        
        <style>
            .spell-cast-dialog { padding: 15px; }
            .spell-info { 
                background: rgba(100,0,200,0.1); 
                padding: 10px; 
                border-radius: 5px; 
                margin-bottom: 15px; 
            }
            .spell-description { 
                font-style: italic; 
                margin-bottom: 15px; 
                padding: 10px;
                background: rgba(0,0,0,0.05);
                border-radius: 5px;
            }
            .spell-roll-options label {
                display: flex;
                align-items: center;
                gap: 8px;
            }
        </style>
    `;
    
    return new Promise(resolve => {
        new Dialog({
            title: `Lancer : ${sortData.nom}`,
            content,
            buttons: {
                cast: {
                    icon: '<i class="fas fa-magic"></i>',
                    label: "Lancer le Sort",
                    callback: html => {
                        const shouldRoll = html.find('[name="rollDice"]').is(':checked');
                        this._executeSortCast(sortData, shouldRoll);
                        resolve();
                    }
                },
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Annuler",
                    callback: () => resolve()
                }
            },
            default: "cast"
        }).render(true);
    });
}

// **NOUVELLE MÉTHODE : Exécuter le lancement**
async _executeSortCast(sortData, shouldRoll) {
    const psyCost = parseInt(sortData.Psy) || 0;
    
    // **DÉDUIRE LES PSY**
    const currentPsy = this.actor.system.pointsPsyque?.actuels || 0;
    const newPsy = Math.max(0, currentPsy - psyCost);
    
    await this.actor.update({
        "system.pointsPsyque.actuels": newPsy
    });
    
    // **MESSAGE DE CHAT**
    let chatContent = `
        <div class="spell-cast-message">
            <h3>🔮 ${this.actor.name} lance ${sortData.nom}</h3>
            <p><strong>Coût :</strong> ${psyCost} PSY (${currentPsy} → ${newPsy})</p>
            <p><strong>Description :</strong> ${sortData.description}</p>
        </div>
    `;
    
    // **JET DE DÉS SI DEMANDÉ**
    if (shouldRoll && sortData.Touche && sortData.Touche !== "automatique") {
        const toucheValue = this._getToucheValue(sortData.Touche);
        if (toucheValue > 0) {
            const roll = new Roll("1d100");
            await roll.evaluate();
            
            const success = roll.total <= toucheValue;
            const criticalSuccess = roll.total <= 5;
            const criticalFailure = roll.total >= 96;
            
            let resultText = "";
            if (criticalSuccess) {
                resultText = "🎯 **RÉUSSITE CRITIQUE !**";
            } else if (success) {
                resultText = "✅ **Réussite**";
            } else if (criticalFailure) {
                resultText = "💥 **ÉCHEC CRITIQUE !**";
            } else {
                resultText = "❌ **Échec**";
            }
            
            chatContent += `
                <div class="spell-roll-result">
                    <p><strong>Jet :</strong> ${roll.total} / ${toucheValue} (${sortData.Touche})</p>
                    <p>${resultText}</p>
                </div>
            `;
        }
    }
    
    // **CRÉER LE MESSAGE**
    ChatMessage.create({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        content: chatContent,
        sound: "sounds/dice.wav"
    });
    
    ui.notifications.info(`Sort ${sortData.nom} lancé !`);
}

// **NOUVELLE MÉTHODE : Récupérer la valeur de touche**
_getToucheValue(toucheString) {
    if (!toucheString || toucheString === "automatique") return 0;
    
    // **GESTION des touches multiples comme "charisme/sagesse"**
    const touches = toucheString.toLowerCase().split('/');
    let maxValue = 0;
    
    touches.forEach(touche => {
        const value = this.actor.system[`touche${touche.charAt(0).toUpperCase() + touche.slice(1)}`] || 0;
        maxValue = Math.max(maxValue, value);
    });
    
    return maxValue;
}


// **HELPER : Préparer la liste des sorts choisis**
_prepareSortsChoisis() {
    const sortsChoisis = [];
    const system = this.actor.system;
    
    // **CORRECTION : Utiliser system.sortsChoisis au lieu de récupérer tous les sorts disponibles**
    const sortsChoisisData = system.sortsChoisis || [];
    
 
    
    // Pour chaque sort choisi, récupérer ses détails complets
    sortsChoisisData.forEach(sortChoisi => {
        const sortDetails = this._getSortDetails(sortChoisi.id);
        
        if (sortDetails) {
            sortsChoisis.push({
                ...sortDetails,
                id: sortChoisi.id,
                niveau: sortChoisi.rang || sortChoisi.niveau || "Novice",
                source: sortChoisi.source || "unknown",
                type: sortChoisi.type || "unknown"
            });
        } else {
            console.warn("⚠️ Détails non trouvés pour le sort:", sortChoisi.id);
            // Fallback avec les données minimales
            sortsChoisis.push({
                nom: sortChoisi.id.split(':').pop() || "Sort inconnu",
                id: sortChoisi.id,
                niveau: sortChoisi.rang || sortChoisi.niveau || "Novice",
                source: sortChoisi.source || "unknown",
                type: sortChoisi.type || "unknown",
                Psy: 1,
                Action: "Variable",
                Distance: "Variable",
                Zone: "Variable",
                Touche: "Variable",
                description: "Description non disponible"
            });
        }
    });
    
    console.log("📚 Sorts choisis finaux:", sortsChoisis);
    return sortsChoisis;
}

// **NOUVELLE MÉTHODE : Récupérer les détails d'un sort par son ID**
_getSortDetails(sortId) {
    
    // Format ID: "voie:nomVoie:nomSort" ou "arcane:nomArcane:nomSort"
    const [sourceType, sourceKey, ...sortNameParts] = sortId.split(':');
    const sortName = sortNameParts.join(''); // Au cas où le nom contient des ":"
    
    
    
    if (sourceType === "voie") {
        const voieData = AlyriaVoies?.[sourceKey];
        if (voieData?.sortVoie) {
            // Chercher dans tous les niveaux de sorts
            const allSorts = [
                ...(Object.values(voieData.sortVoie.sortNovice || {})),
                ...(Object.values(voieData.sortVoie.sortConfirme || {})),
                ...(Object.values(voieData.sortVoie.sortExpert || {})),
                ...(Object.values(voieData.sortVoie.sortMaitre || {}))
            ];
            
            const sortFound = allSorts.find(sort => sort.nom === sortName);
            if (sortFound) {
               
                return sortFound;
            }
        }
    } else if (sourceType === "arcane") {
        const arcaneData = AlyriaArcane?.[sourceKey];
        if (arcaneData?.sortArcane) {
            // Chercher dans tous les niveaux de sorts
            const allSorts = [
                ...(Object.values(arcaneData.sortArcane.sortNovice || {})),
                ...(Object.values(arcaneData.sortArcane.sortConfirme || {})),
                ...(Object.values(arcaneData.sortArcane.sortExpert || {})),
                ...(Object.values(arcaneData.sortArcane.sortMaitre || {}))
            ];
            
            const sortFound = allSorts.find(sort => sort.nom === sortName);
            if (sortFound) {
               
                return sortFound;
            }
        }
    }
    
    console.warn("❌ Sort non trouvé:", sortId);
    return null;
}
// **NOUVEAU : Méthode d'attaque**
async _onBlockAction(event) {
    event.preventDefault();
    
    // Vérifier si le bouton est désactivé
    if (event.currentTarget.classList.contains('disabled')) {
        ui.notifications.warn("Impossible de bloquer : défense trop faible !");
        return;
    }
    
    const defenseValue = this.actor.system.toucheDefense || 0;
    
    if (defenseValue <= 0) {
        ui.notifications.warn("Impossible de bloquer : aucune défense !");
        return;
    }
    
    console.log(`🛡️ Tentative de blocage - Seuil: ${defenseValue}%`);
    
    // Animation du bouton
    const button = event.currentTarget;
    button.classList.add('casting');
    setTimeout(() => button.classList.remove('casting'), 600);
    
    // Effectuer le jet de dé
    const roll = new Roll("1d100");
    await roll.evaluate();
    
    const success = roll.total <= defenseValue;
    const criticalSuccess = roll.total <= 5;
    const criticalFailure = roll.total >= 96;
    
    let resultText = "";
    let resultClass = "";
    
    if (criticalSuccess) {
        resultText = "🌟 **BLOCAGE CRITIQUE !** 🌟";
        resultClass = "success-critical";
    } else if (criticalFailure) {
        resultText = "💥 **ÉCHEC CRITIQUE !**";
        resultClass = "failure-critical";
    } else if (success) {
        resultText = "✅ **Blocage réussi !**";
        resultClass = "success";
    } else {
        resultText = "❌ **Blocage raté !**";
        resultClass = "failure";
    }
    
    // Créer le message de chat
    const chatContent = `
        <div class="combat-action-message block-message">
            <h3>🛡️ ${this.actor.name} tente un blocage</h3>
            <div class="roll-result ${resultClass}">
                <p><strong>Jet :</strong> ${roll.total} / ${defenseValue} (Défense)</p>
                <p>${resultText}</p>
            </div>
        </div>
        
        <style>
            .combat-action-message {
                padding:  10px;
                border-radius: 8px;
                background: rgba(33, 150, 243, 0.1);
                border-left: 4px solid #2196F3;
            }
            .roll-result.success-critical { color: #4CAF50; font-weight: bold; }
            .roll-result.success { color: #8BC34A; }
            .roll-result.failure { color: #FF9800; }
            .roll-result.failure-critical { color: #f44336; font-weight: bold; }
        </style>
    `;
    
    // Envoyer le message
    await roll.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        content: chatContent,
        sound: "sounds/dice.wav"
    });
    
    // Notification
    const notifType = success ? "info" : "warn";
    ui.notifications[notifType](resultText.replace(/\*\*/g, '').replace(/🌟|💥|✅|❌/g, ''));
}

// **NOUVEAU : Méthode d'attaque**
async _onAttackAction(event) {
    event.preventDefault();
    
    // Vérifier si le bouton est désactivé
    if (event.currentTarget.classList.contains('disabled')) {
        ui.notifications.warn("Impossible d'attaquer : aucune arme équipée !");
        return;
    }
    
    const armeEquipee = this.actor.system.inventaire?.armeEquipee;
    
    if (!armeEquipee) {
        ui.notifications.warn("Impossible d'attaquer : aucune arme équipée !");
        return;
    }
    
    // Récupérer la stat de touche de l'arme
    const toucheWeapon = armeEquipee.system?.touche || "Force";
    const toucheValue = this._getToucheValue(toucheWeapon);
    const toucheChance = this.actor.system.toucheChance || { Value: 0 };
    if (toucheValue <= 0) {
        ui.notifications.warn(`Impossible d'attaquer : stat ${toucheWeapon} trop faible !`);
        return;
    }
    
    console.log(`⚔️ Attaque avec ${armeEquipee.name} - Touche: ${toucheWeapon} (${toucheValue}%)`);
    
    // Animation du bouton
    const button = event.currentTarget;
    button.classList.add('casting');
    setTimeout(() => button.classList.remove('casting'), 600);
    
    // Effectuer le jet de dé
    const roll = new Roll("1d100");
    await roll.evaluate();
    
    const success = roll.total <= toucheValue;
    const criticalSuccess = roll.total <= toucheChance;
    const criticalFailure = roll.total >= 96;
    
    let resultText = "";
    let resultClass = "";
    let damageRoll = null;
    //let totalDamage = (damageRoll.total)  + (armeEquipee.system?.bonus) + (this.actor.system?.bonusDegats);
    

if (criticalSuccess) {
    resultText = "🌟 **ATTAQUE CRITIQUE !** 🌟";
    resultClass = "success-critical";
    
    // **NOUVEAU : Critique = Max du dé + nouveau roll**
    const damageFormula = armeEquipee.system?.degats || "1d6";
    
    // Extraire le type de dé (ex: "1d6" -> "d6", "2d8" -> "d8")
    const diceMatch = damageFormula.match(/(\d*)d(\d+)/);
    if (diceMatch) {
        const numberOfDice = parseInt(diceMatch[1]) || 1;
        const diceSize = parseInt(diceMatch[2]);
        
        // Calculer le maximum du dé original
        const maxDamage = numberOfDice * diceSize;
        
        // Faire un nouveau roll avec le même dé
        const bonusRoll = new Roll(damageFormula);
        await bonusRoll.evaluate();
        
        // Créer un roll "artificiel" qui combine max + nouveau roll
        const totalCriticalDamage = maxDamage + bonusRoll.total;
        
        // Créer un roll factice pour l'affichage
        damageRoll = {
            total: totalCriticalDamage,
            terms: [
                { results: [{ result: maxDamage }] }, // Max du dé
                { operator: '+' },
                { results: bonusRoll.terms[0].results } // Nouveau roll
            ],
            formula: `${maxDamage} (max) + ${damageFormula}`,
            dice: bonusRoll.dice
        };
        
        console.log(`💥 Critique: ${maxDamage} (max de ${damageFormula}) + ${bonusRoll.total} (nouveau roll) = ${totalCriticalDamage}`);
    } else {
        // Fallback si on ne peut pas parser la formule
        damageRoll = new Roll(`(${damageFormula}) * 2`);
        await damageRoll.evaluate();
    }
    } else if (criticalFailure) {
        resultText = "💥 **ÉCHEC CRITIQUE !**";
        resultClass = "failure-critical";
    } else if (success) {
        resultText = "✅ **Attaque réussie !**";
        resultClass = "success";
        // Dégâts normaux
        const damageFormula = (armeEquipee.system?.degats)|| "1d6";
        damageRoll = new Roll(damageFormula);
        await damageRoll.evaluate();
    } else {
        resultText = "❌ **Attaque ratée !**";
        resultClass = "failure";
    }
    
    // Construire le message de chat
    let chatContent = `
        <div class="combat-action-message attack-message">
            <h3>⚔️ ${this.actor.name} attaque avec ${armeEquipee.name}</h3>
            <div class="weapon-info">
                <p><strong>Arme :</strong> ${armeEquipee.name} (${armeEquipee.system?.degats || "1d6"})</p>
                <p><strong>Touche :</strong> ${toucheWeapon}</p>
            </div>
            <div class="roll-result ${resultClass}">
                <p><strong>Jet d'attaque :</strong> ${roll.total} / ${toucheValue}</p>
                <p>${resultText}</p>
            </div>
    `;
    
        if (damageRoll) {
    // **NOUVEAU : Calculer les dégâts totaux avec tous les bonus**
    const weaponBonus = this.actor.system.inventaire.armeEquipee.system.bonusDegats || 0;
    const characterBonus = this.actor.system.bonusDegats || 0;
    const totalDamage = (damageRoll.total) + (weaponBonus) + (characterBonus);
    
    console.log(`💥 Calcul dégâts: ${damageRoll.total} (dé) + ${this.actor.system.inventaire.armeEquipee.system.bonusDegats} (arme) + ${this.actor.system.bonusDegats} (perso) = ${totalDamage}`);
    
    chatContent += `
        <div class="damage-result">
            ${damageRoll.total > 0 ? `<p><strong> Dégâts de l'arme :</strong> ${damageRoll.formula}</p>` : ''}
            <p><strong>Dégâts de base :</strong> ${damageRoll.total}</p>
            ${weaponBonus > 0 ? `<p><strong>Bonus arme :</strong> +${weaponBonus}</p>` : ''}
            ${characterBonus > 0 ? `<p><strong>Bonus personnage :</strong> +${characterBonus}</p>` : ''}
            <p><strong>Dégâts totaux :</strong> <span class="total-damage">${totalDamage}</span></p>
        </div>
    `;
} else {
    // Pas de dégâts si l'attaque échoue
    const totalDamage = 0;
}
    chatContent += `
        </div>
        
        <style>
        .attack-message {
            padding: 10px;
            border-radius: 8px;
            background: rgba(244, 67, 54, 0.1);
            border-left: 4px solid #f44336;
        }
        .weapon-info {
            background: rgba(0, 0, 0, 0.05);
            padding: 8px;
            border-radius: 4px;
            margin: 8px 0;
            font-size: 12px;
        }
        .damage-result {
            background: rgba(255, 152, 0, 0.2);
            padding: 8px;
            border-radius: 4px;
            margin-top: 8px;
            font-weight: bold;
            color: #E65100;
        }
        .total-damage {
            font-size: 16px;
            color: #D32F2F;
            font-weight: bold;
            background: rgba(255, 255, 255, 0.8);
            padding: 2px 6px;
            border-radius: 3px;
        }
        .roll-result.success-critical { color: #4CAF50; font-weight: bold; }
        .roll-result.success { color: #8BC34A; }
        .roll-result.failure { color: #FF9800; }
        .roll-result.failure-critical { color: #f44336; font-weight: bold; }
    </style>
    `;
    
    // Envoyer le message d'attaque
    await roll.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        content: chatContent,
        sound: "sounds/dice.wav"
    });
    
    // Envoyer le message de dégâts séparément si nécessaire
    if (damageRoll) {
        await damageRoll.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({actor: this.actor}),
            flavor: `🗡️ Dégâts de ${armeEquipee.name}${criticalSuccess ? ' (Critique)' : ''}`
        });
    }
    
    // Notification
    const weaponBonus = this.actor.system.inventaire.armeEquipee.system.bonusDegats || 0;
    const characterBonus = this.actor.system.bonusDegats || 0;
    const totalDamage = (damageRoll.total) + (weaponBonus) + (characterBonus); 
    const notifType = success ? "info" : "warn";
    let notifMessage = resultText.replace(/\*\*/g, '').replace(/🌟|💥|✅|❌/g, '');
    if (damageRoll && totalDamage > 0) {
        notifMessage += ` - ${totalDamage} dégâts totaux !`;
    }
    ui.notifications[notifType](notifMessage);
}


    async _onUnequipItem(event) {
    event.preventDefault();
    const equipType = event.currentTarget.dataset.equipType;
    
    if (equipType) {
        await InventoryManager.unequipItem(this.actor, equipType);
        this.render(false);
    }
}
// **NOUVEAU : Gestion du drop dans les slots d'équipement**
async _onEquipmentSlotDrop(event) {
    event.preventDefault();
    const slot = event.currentTarget;
    const slotType = slot.dataset.slotType;
    const slotVariant = slot.dataset.slotVariant; // 'secondaire' pour arme secondaire
    const slotIndex = slot.dataset.slotIndex; // '1' ou '2' pour accessoires
    
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
            
            // **Vérifier le type si possible**
            if (item.type !== slotType) {
                ui.notifications.error(`Impossible d'équiper un ${item.type} dans un slot ${slotType} !`);
                return;
            }
            
            // **Vérifications spécifiques aux armes**
            if (slotType === "arme") {
                const currentMainWeapon = this.actor.system.inventaire?.armeEquipee;
                
                if (slotVariant === "secondaire") {
                    // **Arme secondaire : vérifier qu'aucune arme 2 mains n'est équipée**
                    if (currentMainWeapon && currentMainWeapon.system?.mains === 2) {
                        ui.notifications.error("Impossible d'équiper une arme secondaire avec une arme à 2 mains !");
                        return;
                    }
                    
                    // **Vérifier que l'arme secondaire n'est pas à 2 mains**
                    if (item.system?.mains === 2) {
                        ui.notifications.error("Une arme à 2 mains ne peut pas être équipée en secondaire !");
                        return;
                    }
                } else {
                    // **Arme principale : si c'est une arme 2 mains, déséquiper l'arme secondaire**
                    if (item.system?.mains === 2) {
                        const currentSecondaryWeapon = this.actor.system.inventaire?.armeSecondaireEquipee;
                        if (currentSecondaryWeapon) {
                            await InventoryManager.unequipItem(this.actor, "armeSecondaireEquipee");
                            ui.notifications.info("Arme secondaire déséquipée automatiquement (arme 2 mains)");
                        }
                    }
                }
            }
            
            // **Vérifications spécifiques aux accessoires**
            if (slotType === "accessoire" && slotIndex === "2") {
                if (!this.actor.system.hasAccessoiristeTalent) {
                    ui.notifications.error("Le talent 'Accessoiriste' est requis pour équiper un second accessoire !");
                    return;
                }
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
            
            // **ÉTAPE 2 : Déterminer le type d'équipement**
            let equipType = slotType;
            if (slotType === "arme" && slotVariant === "secondaire") {
                equipType = "armeSecondaireEquipee"; // **CORRECTION : nom complet**
            } else if (slotType === "accessoire") {
                equipType = slotIndex === "2" ? "accessoire2" : "accessoire1";
            }
            
            const equipSuccess = await InventoryManager.equipItemFromInventory(this.actor, item.id, equipType);
            if (equipSuccess) {
                this.render(false);
                ui.notifications.info(`${item.name} équipé !`);
            }
            
        } else if (data.type === "InventoryItem") {
            // **Drop interne : équiper depuis l'inventaire**
            let equipType = slotType;
            if (slotType === "arme" && slotVariant === "secondaire") {
                equipType = "armeSecondaireEquipee"; // **CORRECTION : nom complet**
            } else if (slotType === "accessoire") {
                equipType = slotIndex === "2" ? "accessoire2" : "accessoire1";
            }
            
            const equipSuccess = await InventoryManager.equipItemFromInventory(this.actor, data.itemId, equipType);
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

// **CORRECTION COMPLÈTE : _onItemEquip avec récupération d'ID améliorée**
async _onItemEquip(event) {
    event.preventDefault();
    
    let itemId = event.currentTarget.dataset.itemId;
    let equipType = event.currentTarget.dataset.equipType;
    
    // **MÉTHODE 1 : Chercher dans l'élément parent proche**
    if (!itemId) {
        const itemContainer = event.currentTarget.closest('[data-item-id]');
        if (itemContainer) {
            itemId = itemContainer.dataset.itemId;
            console.log("🔧 ID récupéré depuis parent proche:", itemId);
        }
    }
    
    // **MÉTHODE 2 : Chercher dans .inventory-item parent**
    if (!itemId) {
        const inventoryItem = event.currentTarget.closest('.inventory-item');
        if (inventoryItem) {
            itemId = inventoryItem.dataset.itemId;
            console.log("🔧 ID récupéré depuis .inventory-item:", itemId);
        }
    }
    
    // **MÉTHODE 3 : Chercher dans .item parent**
    if (!itemId) {
        const itemElement = event.currentTarget.closest('.item');
        if (itemElement) {
            itemId = itemElement.dataset.itemId;
            console.log("🔧 ID récupéré depuis .item:", itemId);
        }
    }
    
    // **MÉTHODE 4 : Chercher dans n'importe quel parent avec data-item-id**
    if (!itemId) {
        let parent = event.currentTarget.parentElement;
        while (parent && !itemId) {
            if (parent.dataset && parent.dataset.itemId) {
                itemId = parent.dataset.itemId;
                console.log("🔧 ID récupéré depuis parent:", parent.className, itemId);
                break;
            }
            parent = parent.parentElement;
        }
    }
    
    console.log(`🎯 Équipement de l'item ${itemId} en tant que ${equipType}`);
    
    if (!itemId || !equipType) {
        console.error("❌ Données manquantes:", { itemId, equipType });
        console.error("❌ Dataset du bouton:", event.currentTarget.dataset);
        console.error("❌ HTML du bouton:", event.currentTarget.outerHTML);
        console.error("❌ Éléments parents:", event.currentTarget.closest('[data-item-id]'));
        ui.notifications.error("Données d'équipement manquantes !");
        return;
    }
    
    // **Vérifier que l'item existe**
    const item = this.actor.items.get(itemId);
    if (!item) {
        ui.notifications.error("Objet non trouvé !");
        console.error("❌ Item non trouvé:", itemId);
        return;
    }
    
    // **Gestion spéciale pour les accessoires**
    let finalEquipType = equipType;
    if (equipType === "accessoire") {
        const inventory = this.actor.system.inventaire || InventoryManager.initializeInventory();
        
        const slot1Occupied = inventory.accessoire1 !== null;
        const slot2Occupied = inventory.accessoire2 !== null;
        
        if (!slot1Occupied) {
            finalEquipType = "accessoire1";
        } else if (!slot2Occupied) {
            finalEquipType = "accessoire2";
        } else {
            // Demander quel slot remplacer
            const choice = await Dialog.confirm({
                title: "Remplacer un accessoire ?",
                content: `<p>Les deux slots d'accessoires sont occupés.</p>
                         <p>Cliquez sur Oui pour remplacer le slot 1, Non pour le slot 2.</p>`,
                yes: () => true,
                no: () => false
            });
            finalEquipType = choice ? "accessoire1" : "accessoire2";
        }
    }
    
    console.log(`🔧 Type final d'équipement: ${finalEquipType}`);
    
    const success = await InventoryManager.equipItemFromInventory(this.actor, itemId, finalEquipType);
    if (success) {
        this.render(false);
    }
}

// **AJOUT dans AlyriaActorSheet.js - Méthode helper pour afficher le détail DSB**
_getDSBDetails() {
    const system = this.actor.system;
    let details = [];
    
    // Stats majeures (paliers de 6)
    const statsMajeures = [
        { key: 'force', label: 'Force' },
        { key: 'dexterite', label: 'Dextérité' },
        { key: 'sagesse', label: 'Sagesse' },
        { key: 'intelligence', label: 'Intelligence' },
        { key: 'charisme', label: 'Charisme' }
    ];
    
    statsMajeures.forEach(stat => {
        const valeur = system.majeures[stat.key]?.totale || 0;
        const dsb = Math.floor(valeur / 6);
        if (dsb > 0) {
            details.push(`${stat.label}: ${valeur} (+${dsb})`);
        }
    });
    
    // Chance (paliers de 4)
    const chanceValue = system.majeures.chance?.totale || 0;
    const dsbChance = Math.floor(chanceValue / 4);
    if (dsbChance > 0) {
        details.push(`Chance: ${chanceValue} (+${dsbChance})`);
    }
    
    return details.join(', ') || 'Aucun bonus';
} 

// **AJOUT DE LA MÉTHODE MANQUANTE : _onItemOpen**
async _onItemOpen(event) {
    event.preventDefault();
    
    let itemId = event.currentTarget.dataset.itemId;
    
    // **MÊME LOGIQUE DE RÉCUPÉRATION**
    if (!itemId) {
        const itemContainer = event.currentTarget.closest('[data-item-id]');
        if (itemContainer) {
            itemId = itemContainer.dataset.itemId;
            console.log("🔧 ID récupéré depuis parent proche:", itemId);
        }
    }
    
    if (!itemId) {
        const inventoryItem = event.currentTarget.closest('.inventory-item');
        if (inventoryItem) {
            itemId = inventoryItem.dataset.itemId;
            console.log("🔧 ID récupéré depuis .inventory-item:", itemId);
        }
    }
    
    if (!itemId) {
        const itemElement = event.currentTarget.closest('.item');
        if (itemElement) {
            itemId = itemElement.dataset.itemId;
            console.log("🔧 ID récupéré depuis .item:", itemId);
        }
    }
    
    if (!itemId) {
        let parent = event.currentTarget.parentElement;
        while (parent && !itemId) {
            if (parent.dataset && parent.dataset.itemId) {
                itemId = parent.dataset.itemId;
                console.log("🔧 ID récupéré depuis parent:", parent.className, itemId);
                break;
            }
            parent = parent.parentElement;
        }
    }
    
    console.log("📖 Ouverture item ID:", itemId);
    
    if (!itemId) {
        console.error("❌ ID d'item manquant");
        console.error("❌ HTML du bouton:", event.currentTarget.outerHTML);
        ui.notifications.error("ID d'item manquant !");
        return;
    }
    
    // Chercher l'item dans l'acteur
    const item = this.actor.items.get(itemId);
    
    if (item) {
        item.sheet.render(true);
        console.log("✅ Fiche item ouverte:", item.name);
    } else {
        console.error("❌ Item non trouvé:", itemId);
        ui.notifications.error("Item non trouvé !");
    }
}

// **NOUVEAU : _onUnequipItem générique**
async _onUnequipItem(event) {
    event.preventDefault();
    const equipType = event.currentTarget.dataset.equipType;
    
    console.log("🔧 Déséquipement:", equipType);
    
    if (!equipType) {
        ui.notifications.error("Type d'équipement manquant !");
        return;
    }
    
    const success = await InventoryManager.unequipItem(this.actor, equipType);
    if (success) {
        this.render(false);
        ui.notifications.info("Item déséquipé !");
    }
}

// **CORRECTION : _onItemRemove avec récupération d'ID améliorée**
async _onItemRemove(event) {
    event.preventDefault();
    
    let itemId = event.currentTarget.dataset.itemId;
    
    // **MÊME LOGIQUE DE RÉCUPÉRATION QUE _onItemEquip**
    if (!itemId) {
        const itemContainer = event.currentTarget.closest('[data-item-id]');
        if (itemContainer) {
            itemId = itemContainer.dataset.itemId;
            console.log("🔧 ID récupéré depuis parent proche:", itemId);
        }
    }
    
    if (!itemId) {
        const inventoryItem = event.currentTarget.closest('.inventory-item');
        if (inventoryItem) {
            itemId = inventoryItem.dataset.itemId;
            console.log("🔧 ID récupéré depuis .inventory-item:", itemId);
        }
    }
    
    if (!itemId) {
        const itemElement = event.currentTarget.closest('.item');
        if (itemElement) {
            itemId = itemElement.dataset.itemId;
            console.log("🔧 ID récupéré depuis .item:", itemId);
        }
    }
    
    if (!itemId) {
        let parent = event.currentTarget.parentElement;
        while (parent && !itemId) {
            if (parent.dataset && parent.dataset.itemId) {
                itemId = parent.dataset.itemId;
                console.log("🔧 ID récupéré depuis parent:", parent.className, itemId);
                break;
            }
            parent = parent.parentElement;
        }
    }
    
    console.log("🗑️ Suppression item ID:", itemId);
    
    if (!itemId) {
        console.error("❌ ID d'item manquant");
        console.error("❌ HTML du bouton:", event.currentTarget.outerHTML);
        ui.notifications.error("ID d'item manquant !");
        return;
    }
    
    // **Récupérer le nom de l'item pour la confirmation**
    const item = this.actor.items.get(itemId);
    const itemName = item ? item.name : 'cet objet';
    
    const confirm = await Dialog.confirm({
        title: "Supprimer l'objet",
        content: `<p>Êtes-vous sûr de vouloir supprimer <strong>${itemName}</strong> ?</p>`,
        yes: () => true,
        no: () => false
    });
    
    if (!confirm) return;
    
    const success = await InventoryManager.removeItemFromInventory(this.actor, itemId);
    if (success) {
        this.render(false);
        ui.notifications.info(`${itemName} supprimé !`);
    }
}

// **CORRECTION : _onInventoryDragOver (méthode existe déjà mais mal nommée)**
_onInventoryDragOver(event) {
    event.preventDefault();
    const slot = event.currentTarget;
    slot.classList.add('highlight');
}

_onInventoryDragLeave(event) {
    const slot = event.currentTarget;
    slot.classList.remove('highlight', 'invalid');
}

// **AJOUT dans AlyriaActorSheet.js - Méthode helper pour afficher les détails de bonus**
_getTraitBonusesTooltip(attribut, type) {
    const system = this.actor.system;
    const data = type === 'majeure' ? system.majeures[attribut] : system.mineures[attribut];
    
    if (!data || !data.equipement || data.equipement === 0) {
        return '';
    }
    
    let tooltip = `Bonus d'équipement: +${data.equipement}`;
    
    // **Ajouter les détails des traits si possible**
    const inventory = system.inventaire || {};
    const traitSources = [];
    
    // Vérifier arme principale
    if (inventory.armeEquipee?.system?.traits) {
        inventory.armeEquipee.system.traits.forEach(trait => {
            if (this._traitAffectsAttribute(trait, attribut)) {
                traitSources.push(`${inventory.armeEquipee.name}: ${trait.nom || trait}`);
            }
        });
    }
    
    // Vérifier armure
    if (inventory.armureEquipee?.system?.traits) {
        inventory.armureEquipee.system.traits.forEach(trait => {
            if (this._traitAffectsAttribute(trait, attribut)) {
                traitSources.push(`${inventory.armureEquipee.name}: ${trait.nom || trait}`);
            }
        });
    }
    
    // Ajouter accessoires
    [inventory.accessoire1, inventory.accessoire2].forEach((accessoire, index) => {
        if (accessoire?.system?.traits) {
            accessoire.system.traits.forEach(trait => {
                if (this._traitAffectsAttribute(trait, attribut)) {
                    traitSources.push(`${accessoire.name}: ${trait.nom || trait}`);
                }
            });
        }
    });
    
    if (traitSources.length > 0) {
        tooltip += '\nSources: ' + traitSources.join(', ');
    }
    
    return tooltip;
}

// **Helper pour vérifier si un trait affecte un attribut**
_traitAffectsAttribute(trait, attribut) {
    const traitName = (trait.nom || trait.name || trait).toLowerCase();
    
    // **Mapping des traits vers les attributs qu'ils affectent**
    const traitToAttributeMap = {
        'habile': ['dexterite'],
        'perspicace': ['sagesse'],
        'costaud': ['force', 'constitution'],
        'joli': ['charisme'],
        'solide': ['defense'],
        'chanceux': ['chance'],
        'malin': ['intelligence'],
        'acrobatique': ['dexterite'],
        'ingénieux': ['sagesse'],
        'puissant': ['force'],
        'splendide': ['charisme'],
        'incassable': ['defense'],
        'veinard': ['chance'],
        // ... ajouter d'autres mappings selon les besoins
    };
    
    const affectedAttributes = traitToAttributeMap[traitName] || [];
    return affectedAttributes.includes(attribut);
}

// **CORRECTION : _prepareInventoryData avec couleurs/icônes de rareté**
_prepareInventoryData() {
    const inventory = this.actor.system.inventaire || {};
    
    return {
        items: this.actor.items.map(item => {
            const itemObj = item.toObject();
            return {
                ...itemObj,
                id: itemObj._id,
                itemId: itemObj._id,
                rarityColor: this._getRarityColor(itemObj.system?.rarete || "Commune"),
                rarityIcon: this._getRarityIcon(itemObj.system?.rarete || "Commune"),
                isEquipped: this._isItemEquipped(item)
            };
        }),
        
        // **UNIFORMISATION : Toujours utiliser les mêmes noms de propriétés**
        armeEquipee: inventory.armeEquipee || inventory.arme || null,
        armeSecondaireEquipee: inventory.armeSecondaireEquipee || inventory.armeSecondaire || null,
        armureEquipee: inventory.armureEquipee || inventory.armure || null,
        accessoire1: inventory.accessoire1 || inventory.accessoire1Equipee || null,
        accessoire2: inventory.accessoire2 || inventory.accessoire2Equipee || null
    };
}

// **AJOUT : Méthodes de combat manquantes**
async _onBlockAction(event) {
    event.preventDefault();
    
    // Vérifier si le bouton est désactivé
    if (event.currentTarget.classList.contains('disabled')) {
        ui.notifications.warn("Impossible de bloquer : défense trop faible !");
        return;
    }
    
    const defenseValue = this.actor.system.toucheDefense || 0;
    
    if (defenseValue <= 0) {
        ui.notifications.warn("Impossible de bloquer : aucune défense !");
        return;
    }
    
    console.log(`🛡️ Tentative de blocage - Seuil: ${defenseValue}%`);
    
    // Animation du bouton
    const button = event.currentTarget;
    button.classList.add('casting');
    setTimeout(() => button.classList.remove('casting'), 600);
    
    // Effectuer le jet de dé
    const roll = new Roll("1d100");
    await roll.evaluate();
    
    const success = roll.total <= defenseValue;
    const criticalSuccess = roll.total <= 5;
    const criticalFailure = roll.total >= 96;
    
    let resultText = "";
    let resultClass = "";
    
    if (criticalSuccess) {
        resultText = "🌟 **BLOCAGE CRITIQUE !** 🌟";
        resultClass = "success-critical";
    } else if (criticalFailure) {
        resultText = "💥 **ÉCHEC CRITIQUE !**";
        resultClass = "failure-critical";
    } else if (success) {
        resultText = "✅ **Blocage réussi !**";
        resultClass = "success";
    } else {
        resultText = "❌ **Blocage raté !**";
        resultClass = "failure";
    }
    
    // Créer le message de chat
    const chatContent = `
        <div class="combat-action-message block-message">
            <h3>🛡️ ${this.actor.name} tente un blocage</h3>
            <div class="roll-result ${resultClass}">
                <p><strong>Jet :</strong> ${roll.total} / ${defenseValue} (Défense)</p>
                <p>${resultText}</p>
            </div>
        </div>
        
        <style>
            .combat-action-message {
                padding:  10px;
                border-radius: 8px;
                background: rgba(33, 150, 243, 0.1);
                border-left: 4px solid #2196F3;
            }
            .roll-result.success-critical { color: #4CAF50; font-weight: bold; }
            .roll-result.success { color: #8BC34A; }
            .roll-result.failure { color: #FF9800; }
            .roll-result.failure-critical { color: #f44336; font-weight: bold; }
        </style>
    `;
    
    // Envoyer le message
    await roll.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        content: chatContent,
        sound: "sounds/dice.wav"
    });
    
    // Notification
    const notifType = success ? "info" : "warn";
    ui.notifications[notifType](resultText.replace(/\*\*/g, '').replace(/🌟|💥|✅|❌/g, ''));
}

async _onAttackAction(event) {
    event.preventDefault();
    
    // Vérifier si le bouton est désactivé
    if (event.currentTarget.classList.contains('disabled')) {
        ui.notifications.warn("Impossible d'attaquer : aucune arme équipée !");
        return;
    }
    
    const armeEquipee = this.actor.system.inventaire?.armeEquipee;
    
    if (!armeEquipee) {
        ui.notifications.warn("Impossible d'attaquer : aucune arme équipée !");
        return;
    }
    
    // Récupérer la stat de touche de l'arme
    const toucheWeapon = armeEquipee.system?.touche || "Force";
    const toucheValue = this._getToucheValue(toucheWeapon);
    const toucheChance = this.actor.system.toucheChance || { Value: 0 };
    if (toucheValue <= 0) {
        ui.notifications.warn(`Impossible d'attaquer : stat ${toucheWeapon} trop faible !`);
        return;
    }
    
    console.log(`⚔️ Attaque avec ${armeEquipee.name} - Touche: ${toucheWeapon} (${toucheValue}%)`);
    
    // Animation du bouton
    const button = event.currentTarget;
    button.classList.add('casting');
    setTimeout(() => button.classList.remove('casting'), 600);
    
    // Effectuer le jet de dé
    const roll = new Roll("1d100");
    await roll.evaluate();
    
    const success = roll.total <= toucheValue;
    const criticalSuccess = roll.total <= toucheChance;
    const criticalFailure = roll.total >= 96;
    
    let resultText = "";
    let resultClass = "";
    let damageRoll = null;
    //let totalDamage = (damageRoll.total)  + (armeEquipee.system?.bonus) + (this.actor.system?.bonusDegats);
    

if (criticalSuccess) {
    resultText = "🌟 **ATTAQUE CRITIQUE !** 🌟";
    resultClass = "success-critical";
    
    // **NOUVEAU : Critique = Max du dé + nouveau roll**
    const damageFormula = armeEquipee.system?.degats || "1d6";
    
    // Extraire le type de dé (ex: "1d6" -> "d6", "2d8" -> "d8")
    const diceMatch = damageFormula.match(/(\d*)d(\d+)/);
    if (diceMatch) {
        const numberOfDice = parseInt(diceMatch[1]) || 1;
        const diceSize = parseInt(diceMatch[2]);
        
        // Calculer le maximum du dé original
        const maxDamage = numberOfDice * diceSize;
        
        // Faire un nouveau roll avec le même dé
        const bonusRoll = new Roll(damageFormula);
        await bonusRoll.evaluate();
        
        // Créer un roll "artificiel" qui combine max + nouveau roll
        const totalCriticalDamage = maxDamage + bonusRoll.total;
        
        // Créer un roll factice pour l'affichage
        damageRoll = {
            total: totalCriticalDamage,
            terms: [
                { results: [{ result: maxDamage }] }, // Max du dé
                { operator: '+' },
                { results: bonusRoll.terms[0].results } // Nouveau roll
            ],
            formula: `${maxDamage} (max) + ${damageFormula}`,
            dice: bonusRoll.dice
        };
        
        console.log(`💥 Critique: ${maxDamage} (max de ${damageFormula}) + ${bonusRoll.total} (nouveau roll) = ${totalCriticalDamage}`);
    } else {
        // Fallback si on ne peut pas parser la formule
        damageRoll = new Roll(`(${damageFormula}) * 2`);
        await damageRoll.evaluate();
    }
    } else if (criticalFailure) {
        resultText = "💥 **ÉCHEC CRITIQUE !**";
        resultClass = "failure-critical";
    } else if (success) {
        resultText = "✅ **Attaque réussie !**";
        resultClass = "success";
        // Dégâts normaux
        const damageFormula = (armeEquipee.system?.degats)|| "1d6";
        damageRoll = new Roll(damageFormula);
        await damageRoll.evaluate();
    } else {
        resultText = "❌ **Attaque ratée !**";
        resultClass = "failure";
    }
    
    // Construire le message de chat
    let chatContent = `
        <div class="combat-action-message attack-message">
            <h3>⚔️ ${this.actor.name} attaque avec ${armeEquipee.name}</h3>
            <div class="weapon-info">
                <p><strong>Arme :</strong> ${armeEquipee.name} (${armeEquipee.system?.degats || "1d6"})</p>
                <p><strong>Touche :</strong> ${toucheWeapon}</p>
            </div>
            <div class="roll-result ${resultClass}">
                <p><strong>Jet d'attaque :</strong> ${roll.total} / ${toucheValue}</p>
                <p>${resultText}</p>
            </div>
    `;
    
        if (damageRoll) {
    // **NOUVEAU : Calculer les dégâts totaux avec tous les bonus**
    const weaponBonus = this.actor.system.inventaire.armeEquipee.system.bonusDegats || 0;
    const characterBonus = this.actor.system.bonusDegats || 0;
    const totalDamage = (damageRoll.total) + (weaponBonus) + (characterBonus);
    
    console.log(`💥 Calcul dégâts: ${damageRoll.total} (dé) + ${this.actor.system.inventaire.armeEquipee.system.bonusDegats} (arme) + ${this.actor.system.bonusDegats} (perso) = ${totalDamage}`);
    
    chatContent += `
        <div class="damage-result">
            ${damageRoll.total > 0 ? `<p><strong> Dégâts de l'arme :</strong> ${damageRoll.formula}</p>` : ''}
            <p><strong>Dégâts de base :</strong> ${damageRoll.total}</p>
            ${weaponBonus > 0 ? `<p><strong>Bonus arme :</strong> +${weaponBonus}</p>` : ''}
            ${characterBonus > 0 ? `<p><strong>Bonus personnage :</strong> +${characterBonus}</p>` : ''}
            <p><strong>Dégâts totaux :</strong> <span class="total-damage">${totalDamage}</span></p>
        </div>
    `;
} else {
    // Pas de dégâts si l'attaque échoue
    const totalDamage = 0;
}
    chatContent += `
        </div>
        
        <style>
        .attack-message {
            padding: 10px;
            border-radius: 8px;
            background: rgba(244, 67, 54, 0.1);
            border-left: 4px solid #f44336;
        }
        .weapon-info {
            background: rgba(0, 0, 0, 0.05);
            padding: 8px;
            border-radius: 4px;
            margin: 8px 0;
            font-size: 12px;
        }
        .damage-result {
            background: rgba(255, 152, 0, 0.2);
            padding: 8px;
            border-radius: 4px;
            margin-top: 8px;
            font-weight: bold;
            color: #E65100;
        }
        .total-damage {
            font-size: 16px;
            color: #D32F2F;
            font-weight: bold;
            background: rgba(255, 255, 255, 0.8);
            padding: 2px 6px;
            border-radius: 3px;
        }
        .roll-result.success-critical { color: #4CAF50; font-weight: bold; }
        .roll-result.success { color: #8BC34A; }
        .roll-result.failure { color: #FF9800; }
        .roll-result.failure-critical { color: #f44336; font-weight: bold; }
    </style>
    `;
    
    // Envoyer le message d'attaque
    await roll.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        content: chatContent,
        sound: "sounds/dice.wav"
    });
    
    // Envoyer le message de dégâts séparément si nécessaire
    if (damageRoll) {
        await damageRoll.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({actor: this.actor}),
            flavor: `🗡️ Dégâts de ${armeEquipee.name}${criticalSuccess ? ' (Critique)' : ''}`
        });
    }
    
    // Notification
    const weaponBonus = this.actor.system.inventaire.armeEquipee.system.bonusDegats || 0;
    const characterBonus = this.actor.system.bonusDegats || 0;
    const totalDamage = (damageRoll.total) + (weaponBonus) + (characterBonus); 
    const notifType = success ? "info" : "warn";
    let notifMessage = resultText.replace(/\*\*/g, '').replace(/🌟|💥|✅|❌/g, '');
    if (damageRoll && totalDamage > 0) {
        notifMessage += ` - ${totalDamage} dégâts totaux !`;
    }
    ui.notifications[notifType](notifMessage);
}

// **NOUVELLE MÉTHODE : Corriger automatiquement les IDs désynchronisés**
async _fixWeaponIdMismatch(correctWeapon) {
    console.log("🔧 Correction automatique de l'ID d'arme");
    
    const inventaire = this.actor.system.inventaire;
    const updateData = {};
    
    // **Corriger l'arme dans armeEquipee**
    if (inventaire.armeEquipee && inventaire.armeEquipee.name === correctWeapon.name) {
        updateData["system.inventaire.armeEquipee.id"] = correctWeapon.id;
        console.log("🔧 Correction armeEquipee ID:", inventaire.armeEquipee.id, "→", correctWeapon.id);
    }
    
    // **Corriger l'arme dans arme**
    if (inventaire.arme && inventaire.arme.name === correctWeapon.name) {
        updateData["system.inventaire.arme.id"] = correctWeapon.id;
        console.log("🔧 Correction arme ID:", inventaire.arme.id, "→", correctWeapon.id);
    }
    
    if (Object.keys(updateData).length > 0) {
        try {
            await this.actor.update(updateData);
            console.log("✅ IDs corrigés automatiquement");
            ui.notifications.info("IDs d'équipement corrigés automatiquement");
        } catch (error) {
            console.error("❌ Erreur lors de la correction:", error);
        }
    }
}

}