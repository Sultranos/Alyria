export default class AlyriaItemSheet extends ItemSheet {
    get template() {
        console.log(`Alyria | Chargement du template de la fiche d'objet ${this.item.data.type}-sheet`);
        return `systems/alyria/templates/sheet/${this.item.data.type}-sheet.html`;
    }
    getData() {
        const data = super.getData();
        console.log(data);
        return data;
    }
}