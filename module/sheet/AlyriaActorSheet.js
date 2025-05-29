import { AlyriaRaces } from "../data/AlyriaRace.js";
import { AlyriaVoies } from "../data/AlyriaVoies.js";

export default class AlyriaActorSheet extends ActorSheet {
    get template() {
        console.log(`Alyria | Chargement du template de la fiche d'objet ${this.actor.type}-sheet`);
        return `systems/alyria/templates/sheet/${this.actor.type}-sheet.html`;
    }
    getData() {
        const data = super.getData();
        data.races = AlyriaRaces;
        data.voies = AlyriaVoies;
        // Pour debug, tu peux faire :
        console.log("AlyriaActorSheet data:", data);
        return data;
    }
    activateListeners(html) {
        super.activateListeners(html);

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
    }

