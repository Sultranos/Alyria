import { AlyriaRaces } from "../data/AlyriaRace.js";
import { AlyriaVoies } from "../data/AlyriaVoies.js";
import { AlyriaArcane } from "../data/AlyriaArcanes.js";

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
        html.find('.biography-bubble .bubble-title').click(function() {
            const content = $(this).siblings('.bubble-content');
            content.toggleClass('hidden');
            $(this).find('.toggle-icon').toggleClass('expanded');
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

  // Récupération race
  const raceKey = data.actor.system.race;
  const raceData = AlyriaRaces?.[raceKey] ?? {};
  data.selectedRace = {
    nom: raceData.nom || "Non définie",
    description: raceData.description || [],
    talentRace: raceData.talentRace || {}
  };

  // Récupération voies/arcanes
  const voiesArcane = data.actor.system.voiesArcane || {};
  const { type1, key1, type2, key2 } = voiesArcane;

  // Reset
  data.selectedVoie = null;
  data.selectedArcana = null;
  data.selectedSecondVoie = null;
  data.selectedSecondArcana = null;

  // Première sélection
  if (type1 === "voie" && key1) {
    const voie = AlyriaVoies?.[key1] ?? {};
    let image = voie.image;
    if (!image && key1) {
      const fileName = key1.charAt(0).toUpperCase() + key1.slice(1).toLowerCase();
      image = `systems/alyria/module/data/images/voies/${fileName}.jpg`;
    }
    data.selectedVoie = {
      nom: voie.nom || "",
      image: image || "",
      description: voie.description || [],
      talents: voie.talentVoie?.talents || [],
      mecanique: voie.mecanique || [],
      type: "voie"
    };
  } else if (type1 === "arcane" && key1) {
    const arcane = AlyriaArcane?.[key1] ?? {};
    let image = arcane.image;
    if (!image && key1) {
      const fileName = key1.charAt(0).toUpperCase() + key1.slice(1).toLowerCase();
      image = `systems/alyria/module/data/images/arcanes/${fileName}.jpg`;
    }
    data.selectedArcana = {
      nom: arcane.nom || "",
      image: image || "",
      description: arcane.description || [],
      talents: arcane.talentVoie?.talents || [],
      mecanique: arcane.mecanique || [],
      type: "arcane"
    };
  }

  // Seconde sélection
  if (type2 === "voie" && key2) {
    const voie = AlyriaVoies?.[key2] ?? {};
    let image = voie.image;
    if (!image && key2) {
      const fileName = key2.charAt(0).toUpperCase() + key2.slice(1).toLowerCase();
      image = `systems/alyria/module/data/images/voies/${fileName}.jpg`;
    }
    data.selectedSecondVoie = {
      nom: voie.nom || "",
      image: image || "",
      description: voie.description || [],
      talents: voie.talentVoie?.talents || [],
      mecanique: voie.mecanique || [],
      type: "voie"
    };
  } else if (type2 === "arcane" && key2) {
    const arcane = AlyriaArcane?.[key2] ?? {};
    let image = arcane.image;
    if (!image && key2) {
      const fileName = key2.charAt(0).toUpperCase() + key2.slice(1).toLowerCase();
      image = `systems/alyria/module/data/images/arcanes/${fileName}.jpg`;
    }
    data.selectedSecondArcana = {
      nom: arcane.nom || "",
      image: image || "",
      description: arcane.description || [],
      talents: arcane.talentVoie?.talents || [],
      mecanique: arcane.mecanique || [],
      type: "arcane"
    };
  }

  return data;
}
    async _updateObject(event, formData) {
  // Cette ligne reconstruit l'objet complet à partir des champs du formulaire
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
  // Prépare les listes
  const races = AlyriaRaces || {};
  // Si AlyriaVoies ne contient QUE des voies
  const voies = AlyriaVoies || {};
  // CORRECTION ICI - Filtrer depuis AlyriaArcane, pas AlyriaVoies
  const arcanes = AlyriaArcane || {};


  // Génère les options HTML
  const raceOptions = Object.entries(races).map(([key, race]) =>
    `<option value="${key}">${race.nom}</option>`
  ).join("");

  const voieOptions = Object.entries(voies).map(([key, voie]) =>
    `<option value="voie:${key}">${voie.nom}</option>`
  ).join("");
  const arcaneOptions = Object.entries(arcanes).map(([key, arcane]) =>
    `<option value="arcane:${key}">${arcane.nom}</option>`
  ).join("");

  // Génère les options HTML combinées
const allVoiesOptions = Object.entries(voies).map(([key, voie]) =>
  `<option value="voie:${key}">${voie.nom} (voie)</option>`
).join("");

const allArcanesOptions = Object.entries(arcanes).map(([key, arcane]) =>
  `<option value="arcane:${key}">${arcane.nom} (arcane)</option>`
).join("");

const allOptions = allVoiesOptions + allArcanesOptions;

// Affiche le dialog
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

  // Affiche le dialog et gère la logique dynamique côté JS
  return new Promise(resolve => {
    let dlg;
    dlg = new Dialog({
      title: "Création du personnage",
      content,
      render: html => {
        const $voie1 = html.find('[name="voie1"]');
        const $voie2 = html.find('[name="voie2"]');
        
        // Redéfinir les options ici
        const voieOptions = Object.entries(voies).map(([key, voie]) =>
          `<option value="voie:${key}">${voie.nom}</option>`
        ).join("");
        const arcaneOptions = Object.entries(arcanes).map(([key, arcane]) =>
          `<option value="arcane:${key}">${arcane.nom}</option>`
        ).join("");
        
        // Quand on change la première voie/arcane
        $voie1.on('change', function() {
          const value = $(this).val();
          let options = `<option value="">-- Choisir --</option>`;
          if (value.startsWith('voie:')) {
            // Si voie, on peut choisir une autre voie ou une arcane
            options += `<optgroup label="Voies">${voieOptions}</optgroup>`;
            options += `<optgroup label="Arcanes">${arcaneOptions}</optgroup>`;
          } else if (value.startsWith('arcane:')) {
            // Si arcane, on ne peut choisir qu'une autre arcane
            options += `<optgroup label="Arcanes">${arcaneOptions}</optgroup>`;
          }
          $voie2.html(options);
          $voie2.prop('disabled', false);
          // Empêche de sélectionner deux fois la même voie/arcane
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
}}
