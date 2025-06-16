export default class AlyriaStuffSheet extends ItemSheet {
    
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["alyria", "sheet", "item"],
            width: 600,
            height: 700,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }]
        });
    }

    get template() {
        const path = "systems/alyria/templates/sheet/";
        
        // Gestion des templates par type
        switch (this.item.type) {
            case "arme":
                return `${path}arme-sheet.html`;
            case "armure":
                return `${path}armure-sheet.html`;
            case "objet":
                return `${path}objet-sheet.html`;
            case "accessoire":
                return `${path}accessoire-sheet.html`;
            case "consommable":
                return `${path}consommable-sheet.html`;
            case "item":
                // Si c'est un "item" mais avec des propriétés d'arme, utiliser le template arme
                if (this.item.system?.degats || this.item.system?.traits) {
                    return `${path}arme-sheet.html`;
                }
                return `${path}item-sheet.html`;
            default:
                return `${path}item-sheet.html`;
        }
    }

    async getData() {
        const context = await super.getData();
        const itemData = context.item;

        // Enrichir les données pour l'affichage
        context.system = itemData.system || {};
        context.flags = itemData.flags || {};

        // Détection d'arme
        const isWeapon = itemData.type === "arme" || 
                        (itemData.type === "item" && (context.system.degats || context.system.traits));

        if (isWeapon) {
            context.isWeapon = true;
            context.traits = context.system.traits || [];
            context.imperfections = context.system.imperfections || [];
            context.valeur = context.system.valeur || { formate: "0 PO", couleur: "#FFD700" };
            
            // Couleurs selon la rareté
            context.rarityColor = this._getRarityColor(context.system.rarete);
            context.rarityIcon = this._getRarityIcon(context.system.rarete);
        }

        return context;
    }

    _getRarityColor(rarete) {
        switch (rarete) {
            case "Commune": return "#9E9E9E";
            case "Rare": return "#2196F3";
            case "Epic": return "#9C27B0";
            case "Legendaire": return "#FF9800";
            default: return "#9E9E9E";
        }
    }

    _getRarityIcon(rarete) {
        switch (rarete) {
            case "Commune": return "fas fa-circle";
            case "Rare": return "fas fa-star";
            case "Epic": return "fas fa-crown";
            case "Legendaire": return "fas fa-dragon";
            default: return "fas fa-circle";
        }
    }

    activateListeners(html) {
        super.activateListeners(html);
        // Retirer les boutons de génération d'ici
    }

    _getWeaponImage(categorie) {
        const images = {
            "Mélée": "icons/weapons/swords/sword-broad-steel.webp",
            "Distance": "icons/weapons/bows/bow-recurve-wooden.webp",
            "Magie": "icons/weapons/staves/staff-ornate-blue.webp"
        };
        return images[categorie] || "icons/weapons/swords/sword-broad-steel.webp";
    }
}