import { AlyriaRaces } from "../data/AlyriaRace.js";
import { AlyriaVoies } from "../data/AlyriaVoies.js";

export default class AlyriaActorSheet extends ActorSheet {
    get template() {
        console.log(`Alyria | Chargement du template de la fiche d'objet ${this.actor.type}-sheet`);
        return `systems/alyria/templates/sheet/${this.actor.type}-sheet.html`;
    }

    activateListeners(html) {
        super.activateListeners(html);
          html.find('.sheet-navigation .item').click(ev => {
            const li = $(ev.currentTarget);
            const tab = li.data("tab"); // Récupère la valeur de data-tab

            
            html.find('.sheet-navigation .item').removeClass('active');
            html.find('.sheet-content .tab').removeClass('active');

            
            li.addClass('active');
            html.find(`.sheet-content .tab[data-tab="${tab}"]`).addClass('active');

         });
        html.find('.rollable-dice').click(this._onRollCharacteristic.bind(this));
    
        html.find('input[name="sortsChoisis"]').on('change', ev => {
            const checked = html.find('input[name="sortsChoisis"]:checked')
            .map((i, el) => el.value).get();

            const nbMax = this.actor.system.nbSortsAChoisir;
            if (checked.length > nbMax) {
                ui.notifications.warn(`Vous ne pouvez choisir que ${nbMax} sorts.`);
                ev.target.checked = false;
            return;
            }

            this.actor.update({ "system.sortsChoisis": checked });
        });
        }

        async _onRollCharacteristic(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;
        
        // Récupérer la valeur de la touche et le nom de la caractéristique
        const targetValue = parseInt(dataset.dice, 10);
        const characteristicName = dataset.label;

        // Récupérer la chance critique de l'acteur (vous devez avoir cette fonction dans votre système)
        // Assurez-vous que getBonustoucheCritique est accessible ou calculé ici
        const actorData = this.actor.system;
        const toucheCritique = this.actor.system.toucheCritique; // Ou appelez getBonustoucheCritique(actorData.majeures.chance); si c'est une fonction de calcul

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




    async getData(options) {
        const data = await super.getData(options);
        data.races = AlyriaRaces;
        data.voies = AlyriaVoies;
        data.system = this.actor.system;
        console.log("AlyriaActorSheet data:", data); // <-- Ajoute ce log ici
        return data;
            }
    async _updateObject(event, formData) {
  // Cette ligne reconstruit l'objet complet à partir des champs du formulaire
  const expanded = foundry.utils.expandObject(formData);
  console.log("FormData expandObject :", expanded);
  await this.object.update(expanded);
}
    }

