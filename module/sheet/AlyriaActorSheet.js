export default class AlyriaActorSheet extends ActorSheet {
    get template() {
        console.log(`Alyria | Chargement du template de la fiche d'objet ${this.actor.type}-sheet`);
        return `systems/alyria/templates/sheet/${this.actor.type}-sheet.html`;
    }
    getData() {
        const data = super.getData();
        // Pour debug, tu peux faire :
        console.log("AlyriaActorSheet data:", data);
        return data;
    }
    activateListeners(html) {
        super.activateListeners(html);
        // Add any additional listeners here
    }
}
