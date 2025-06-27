export default class AlyriaItemSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["alyria", "sheet", "item"],
            width: 600,
            height: 700,
            tabs: []
        });
    }

    get template() {
        console.log(`Alyria | Chargement du template de la fiche d'objet ${this.item.type}-sheet`);
        return `systems/alyria/templates/sheet/${this.item.type}-sheet.html`;
    }
    
    async getData(options) {
        const context = await super.getData(options);
        
        // **DEBUG : Afficher toutes les données disponibles**
        console.log("=== DEBUGGING ITEM SHEET COMPLET ===");
        console.log("Context complet:", context);
        console.log("Item complet:", this.item);
        console.log("System complet:", this.item.system);
        console.log("Description:", this.item.system.description);
        console.log("Traits:", this.item.system.traits);
        console.log("Imperfections:", this.item.system.imperfections);
        console.log("===================================");
        
        // Couleurs et icônes
        const rarity = this.item.system.rarete || 'Commune';
        context.rarityColor = this._getRarityColor(rarity);
        context.rarityIcon = this._getRarityIcon(rarity);
        
        return context;
    }

    _getRarityColor(rarity) {
        const colors = {
            'Commune': '#9E9E9E',
            'Rare': '#2196F3', 
            'Epic': '#9C27B0',
            'Legendaire': '#FF9800'
        };
        return colors[rarity] || '#9E9E9E';
    }

    _getRarityIcon(rarity) {
        const icons = {
            'Commune': 'fas fa-circle',
            'Rare': 'fas fa-gem',
            'Epic': 'fas fa-crown',
            'Legendaire': 'fas fa-drag'
        };
        return icons[rarity] || 'fas fa-circle';
    }
}