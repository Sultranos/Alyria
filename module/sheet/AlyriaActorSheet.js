export default class AlyriaActorSheet extends ActorSheet {
    get template() {
        console.log(`Alyria | Chargement du template de la fiche d'acteur ${this.actor.data.type}-sheet`);
        return `systems/alyria/templates/sheets/${this.actor.data.type}-sheet.html`;
    }

    getData() {
        const data = super.getData();
        console.log(data);
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        // Add any additional listeners here
    }
}