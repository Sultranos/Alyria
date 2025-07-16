import { AlyriaRaces } from "./data/AlyriaRace.js";
import { AlyriaVoies } from './data/AlyriaVoies.js';
import { AlyriaArcane } from './data/AlyriaArcanes.js';
import { talentStatistique } from './data/talents.js';
import { talentCombat } from './data/talents.js';
import { talentUtilitaire } from './data/talents.js';
import { talentCreation } from './data/talents.js';
import { TalentFonctions } from "./data/talentFonctions.js";

export class CharacterProgression {
    
    // **SAUVEGARDE : Système de données temporaires**
    static _tempCreationData = null;

    static _saveTempData(data) {
        CharacterProgression._tempCreationData = foundry.utils.deepClone(data);
        console.log("💾 Données temporaires sauvegardées:", CharacterProgression._tempCreationData);
    }

    static _loadTempData() {
        return CharacterProgression._tempCreationData ? foundry.utils.deepClone(CharacterProgression._tempCreationData) : null;
    }

    static _clearTempData() {
        CharacterProgression._tempCreationData = null;
        console.log("🗑️ Données temporaires effacées");
    }

    // **CRÉATION DE PERSONNAGE : Dialogue initial**
    static async showCreationDialog(actor, restoreData = null) {
        const races = AlyriaRaces || {};
        const voies = AlyriaVoies || {};
        const arcanes = AlyriaArcane || {};

        const raceOptions = Object.entries(races).map(([key, race]) =>
            `<option value="${key}" ${restoreData?.race === key ? 'selected' : ''}>${race.nom}</option>`
        ).join("");

        const allVoiesOptions = Object.entries(voies).map(([key, voie]) =>
            `<option value="voie:${key}" ${restoreData?.type1 === 'voie' && restoreData?.key1 === key ? 'selected' : ''}>${voie.nom} (voie)</option>`
        ).join("");

        const allArcanesOptions = Object.entries(arcanes).map(([key, arcane]) =>
            `<option value="arcane:${key}" ${restoreData?.type1 === 'arcane' && restoreData?.key1 === key ? 'selected' : ''}>${arcane.nom} (arcane)</option>`
        ).join("");

        const content = `
            <form class="character-creation-form">
                <h2>🎭 Création de Personnage</h2>
                
                ${restoreData ? `
                    <div class="restore-notice">
                        <p>📋 <strong>Données restaurées !</strong> Vos sélections précédentes ont été récupérées.</p>
                    </div>
                ` : ''}
                
                <div class="form-group">
                    <label>🧬 Race :</label>
                    <select name="race" required>
                        <option value="">-- Choisir une race --</option>
                        ${raceOptions}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>⚔️ Première voie/arcane :</label>
                    <select name="voie1" required>
                        <option value="">-- Choisir --</option>
                        <optgroup label="Voies">${allVoiesOptions}</optgroup>
                        <optgroup label="Arcanes">${allArcanesOptions}</optgroup>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>🔮 Seconde voie/arcane (optionnel) :</label>
                    <select name="voie2">
                        <option value="">-- Aucune (spécialisation) --</option>
                    </select>
                </div>
                
                <div class="creation-info">
                    <p><strong>💡 Spécialisation :</strong> Choisir une seule voie/arcane donne des bonus supplémentaires</p>
                    <p><strong>🎯 Double voie :</strong> Plus de polyvalence mais moins de bonus spécialisés</p>
                </div>
            </form>
            
            <style>
                .character-creation-form { 
                    padding: 10px;
                    min-width: 600px; /* 25% wider than default ~500px */
                }
                .form-group { margin-bottom: 15px; }
                .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
                .form-group select { width: 100%; padding: 5px; }
                .creation-info { 
                    background: rgba(0,100,200,0.1); 
                    padding: 10px; 
                    border-radius: 5px; 
                    margin-top: 15px;
                    font-size: 12px;
                }
                .restore-notice {
                    background: rgba(76, 175, 80, 0.2);
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 15px;
                    border-left: 4px solid #4CAF50;
                }
            </style>
        `;

        return new Promise(resolve => {
            new Dialog({
                title: "Création de Personnage",
                content,
                render: html => {
                    CharacterProgression._setupCreationListeners(html, voies, arcanes);
                    
                    // **RESTAURER la seconde voie si nécessaire**
                    if (restoreData?.type2 && restoreData?.key2) {
                        setTimeout(() => {
                            const voie1Value = `${restoreData.type1}:${restoreData.key1}`;
                            html.find('[name="voie1"]').val(voie1Value).trigger('change');
                            
                            setTimeout(() => {
                                const voie2Value = `${restoreData.type2}:${restoreData.key2}`;
                                html.find('[name="voie2"]').val(voie2Value);
                            }, 100);
                        }, 50);
                    }
                },
                buttons: {
                    next: {
                        icon: '<i class="fas fa-arrow-right"></i>',
                        label: "Suivant : Caractéristiques",
                        callback: html => {
                            const formData = CharacterProgression._getCreationFormData(html);
                            if (formData) {
                                // **CORRECTION : Utiliser le bon nom de méthode**
                                CharacterProgression._saveTempData(formData);
                                CharacterProgression.showMajorAttributesDialog(actor, formData).then(resolve);

                            } else {
                                ui.notifications.warn("Veuillez remplir tous les champs obligatoires.");
                            }
                        }
                    },
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Annuler",
                        callback: () => {
                            CharacterProgression._clearTempData();
                        }
                    }
                },
                default: "next"
            }).render(true);
        });
    }

    // **CRÉATION : Listeners pour les sélecteurs**
    static _setupCreationListeners(html, voies, arcanes) {
        const $voie1 = html.find('[name="voie1"]');
        const $voie2 = html.find('[name="voie2"]');
        
        $voie1.on('change', function() {
            const value = $(this).val();
            let options = `<option value="">-- Aucune (spécialisation) --</option>`;
            
            if (value.startsWith('voie:')) {
                // Si voie choisie, proposer les arcanes
                const arcaneOptions = Object.entries(arcanes).map(([key, arcane]) =>
                    `<option value="arcane:${key}">${arcane.nom} (arcane)</option>`
                ).join("");
                options += `<optgroup label="Arcanes">${arcaneOptions}</optgroup>`;
                
                // Et les autres voies
                const autresVoies = Object.entries(voies)
                    .filter(([key]) => `voie:${key}` !== value)
                    .map(([key, voie]) => `<option value="voie:${key}">${voie.nom} (voie)</option>`)
                    .join("");
                options += `<optgroup label="Autres Voies">${autresVoies}</optgroup>`;
                
            } else if (value.startsWith('arcane:')) {
                // Si arcane choisie, proposer les voies
                const voieOptions = Object.entries(voies).map(([key, voie]) =>
                    `<option value="voie:${key}">${voie.nom} (voie)</option>`
                ).join("");
                options += `<optgroup label="Voies">${voieOptions}</optgroup>`;
                
                // Et les autres arcanes
                const autresArcanes = Object.entries(arcanes)
                    .filter(([key]) => `arcane:${key}` !== value)
                    .map(([key, arcane]) => `<option value="arcane:${key}">${arcane.nom} (arcane)</option>`)
                    .join("");
                options += `<optgroup label="Autres Arcanes">${autresArcanes}</optgroup>`;
            }
            
            $voie2.html(options);
        });
    }

    // **CRÉATION : Récupérer les données du formulaire**
    static _getCreationFormData(html) {
        const race = html.find('[name="race"]').val();
        const voie1 = html.find('[name="voie1"]').val();
        const voie2 = html.find('[name="voie2"]').val();
        
        if (!race || !voie1) return null;
        
        const [type1, key1] = voie1.split(":");
        let type2 = "", key2 = "";
        if (voie2) {
            [type2, key2] = voie2.split(":");
        }
        
        return { race, type1, key1, type2, key2 };
    }

    // **TALENTS : Dialogue de sélection des talents**
    static async showTalentSelectionDialog(actor, creationData) {
        const availableTalents = CharacterProgression._getAvailableTalents(creationData, 1);
        const isSpecialized = !creationData.type2; // Spécialisé si pas de seconde voie
        const isDoubleVoie = !!creationData.type2;
        
        // **Organiser les talents par type**
        const talentsByType = {
            race: availableTalents.filter(t => t.type === "race"),
            voie: availableTalents.filter(t => t.type === "voie"),
            arcane: availableTalents.filter(t => t.type === "arcane")
        };
        
        // **Section des talents de race**
        const raceTalentSection = talentsByType.race.map(talent => 
            `<div class="talent-option race-talent">
                <input type="checkbox" name="selectedTalents" value="${talent.id}" id="${talent.id}" checked disabled>
                <label for="${talent.id}">
                    <strong>${talent.name}</strong> <em>(${talent.source})</em>
                    <p class="talent-description">${talent.description}</p>
                    ${talent.effet ? `<p class="talent-benediction"><strong>Effet:</strong> ${talent.effet}</p>` : ''}
                </label>
            </div>`
        ).join("");
        
        // **Section des talents de voie/arcane**
        const pathTalentOptions = [...talentsByType.voie, ...talentsByType.arcane].map(talent => 
            `<div class="talent-option">
                <input type="radio" name="selectedPathTalent" value="${talent.id}" id="${talent.id}">
                <label for="${talent.id}">
                    <strong>${talent.name}</strong> <em>(${talent.source})</em>
                    <p class="talent-description">${talent.description}</p>
                    ${talent.benediction ? `<p class="talent-benediction"><strong>Effet:</strong> ${talent.benediction}</p>` : ''}
                </label>
            </div>`
        ).join("");

        // **Section des talents historiques**
        const talentHistoriqueOptions = talentCreation.talentHistorique.talents.map(talent =>
            `<div class="talent-option">
                <input type="checkbox" name="selectedHistoricalTalents" value="historique:${talent.nom}" id="hist_${talent.nom.replace(/\s+/g, '_')}">
                <label for="hist_${talent.nom.replace(/\s+/g, '_')}">
                    <strong>${talent.nom}</strong> <em>(Talent Historique)</em>
                    <p class="talent-description">${talent.description}</p>
                    <p class="talent-benediction"><strong>Effet:</strong> ${talent.benediction}</p>
                </label>
            </div>`
        ).join("");

        const content = `
            <form class="talent-selection-form">
                <h2>🎯 Sélection des Talents - Niveau 1</h2>
                
                ${isSpecialized ? 
                    `<div class="specialization-bonus">
                        <h3>✨ Spécialisation</h3>
                        <p>Vous bénéficiez de bonus pour vous être spécialisé dans une seule voie/arcane !</p>
                    </div>` : 
                    `<div class="dual-path-info">
                        <h3>⚖️ Double Voie/Arcane</h3>
                        <p><strong>Important :</strong> Vous devez choisir UN SEUL talent de voie/arcane parmi ceux disponibles.</p>
                    </div>`
                }
                
                <div class="talent-categories">
                    ${raceTalentSection ? `
                        <h3>🧬 Talent de Race (Automatique)</h3>
                        <div class="talent-list race-talents">
                            ${raceTalentSection}
                        </div>
                    ` : ''}
                    
                    <h3>🏛️ Talent de Voie/Arcane (Niveau 1) ${isDoubleVoie ? '- CHOISIR UN SEUL' : ''}</h3>
                    <div class="talent-list path-talents">
                        ${pathTalentOptions}
                    </div>
                    
                    <h3>📜 Talents Historiques (Optionnels)</h3>
                    <div class="talent-list historical-talents">
                        ${talentHistoriqueOptions}
                    </div>
                </div>
            </form>
            
            <style>
                .talent-selection-form { 
                    padding: 10px; 
                    max-height: 600px; 
                    overflow-y: auto;
                    min-width: 600px; 
                }
                .specialization-bonus { background: rgba(255,215,0,0.1); padding: 10px; border-radius: 5px; margin-bottom: 15px; }
                .dual-path-info { background: rgba(255,140,0,0.1); padding: 10px; border-radius: 5px; margin-bottom: 15px; }
                .dual-path-info strong { color: #ff8c00; }
                .talent-categories h3 { color: #4a4a4a; border-bottom: 2px solid #ddd; padding-bottom: 5px; margin-top: 20px; }
                .talent-list { margin-bottom: 20px;}
                .talent-option { margin-bottom: 15px;  background: rgba(200, 143, 0, 0.1); border-color:rgb(175, 119, 76); padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
                .talent-option:hover { background: rgba(0,0,0,0.05); }
                .talent-option.race-talent { background: rgba(0,200,0,0.1); border-color: #4CAF50; }
                .talent-option input[type="radio"]:checked + label,
                .talent-option input[type="checkbox"]:checked + label { font-weight: bold; }
                .talent-description { font-style: italic; margin: 5px 0; font-size: 12px; }
                .talent-benediction { color:rgb(203, 210, 203); font-size: 11px; margin: 5px 0; }
            </style>
        `;

        return new Promise(resolve => {
            new Dialog({
                title: "Sélection des Talents",
                content,
                render: html => {
                    // **RESTAURER les sélections de talents si elles existent**
                    if (creationData.selectedTalents) {
                        // Talent de voie/arcane
                        if (creationData.selectedTalents.path) {
                            html.find(`[name="selectedPathTalent"][value="${creationData.selectedTalents.path}"]`).prop('checked', true);
                        }
                        
                        // Talents historiques
                        if (creationData.selectedTalents.historical) {
                            creationData.selectedTalents.historical.forEach(talentId => {
                                html.find(`[name="selectedHistoricalTalents"][value="${talentId}"]`).prop('checked', true);
                            });
                        }
                    }
                },
                buttons: {
                    back: {
                        icon: '<i class="fas fa-arrow-left"></i>',
                        label: "Retour",
                        callback: () => {
                            const tempData = CharacterProgression._loadTempData();
                            CharacterProgression.showMinorAttributesDialog(actor, tempData).then(resolve);
                        }
                    },
                    next: {
                        icon: '<i class="fas fa-arrow-right"></i>',
                        label: "Suivant : Sorts",
                        callback: html => {
                            const selectedPathTalent = html.find('[name="selectedPathTalent"]:checked').val();
                            const selectedHistoricalTalents = html.find('[name="selectedHistoricalTalents"]:checked').map(function() {
                                return $(this).val();
                            }).get();
                            const raceTalents = html.find('[name="selectedTalents"]:checked').map(function() {
                                return $(this).val();
                            }).get();
                            
                            if (!selectedHistoricalTalents || selectedHistoricalTalents.length === 0) {
                                ui.notifications.warn("Veuillez sélectionner au moins un talent historique.");
                                return;
                            }
                            if (!selectedPathTalent) {
                                ui.notifications.warn("Veuillez sélectionner un talent de voie/arcane.");
                                return;
                            }
                            
                            creationData.selectedTalents = {
                                race: raceTalents,
                                path: selectedPathTalent,
                                historical: selectedHistoricalTalents
                            };
                            
                            // **SAUVEGARDER les données mises à jour**
                            CharacterProgression._saveTempData(creationData);
                            CharacterProgression.showSpellSelectionDialog(actor, creationData).then(resolve);
                        }
                    }
                },
                default: "next"
            }).render(true);
        });
    }

    // **SORTS : Dialogue de sélection des sorts**
    static async showSpellSelectionDialog(actor, creationData) {
        const availableSpells = CharacterProgression._getAvailableSpells(creationData, 1);
        const maxSpells = CharacterProgression._getMaxSpellsForLevel(1, creationData); // **4 sorts au niveau 1**
        
        // Grouper par source
        const spellsBySource = {};
        availableSpells.forEach(spell => {
            if (!spellsBySource[spell.source]) {
                spellsBySource[spell.source] = [];
            }
            spellsBySource[spell.source].push(spell);
        });

        const spellSections = Object.entries(spellsBySource).map(([source, spells]) => {
            const spellOptions = CharacterProgression._generateSpellOptions(spells);
            
            return `
                <div class="spell-source-section">
                    <h3>📚 ${source}</h3>
                    <div class="spell-list">
                        ${spellOptions}
                    </div>
                </div>
            `;
        }).join("");

        const content = `
            <form class="spell-selection-form">
                <h2>🔮 Sélection des Sorts - Niveau 1</h2>
                
                <div class="spell-info">
                    <p><strong>Sorts à sélectionner :</strong> <span id="spell-counter">0</span> / ${maxSpells}</p>
                    <p><em>Vous commencez avec 4 sorts. Vous en gagnerez 4 supplémentaires à chaque niveau.</em></p>
                </div>
                
                <div class="spell-categories">
                    ${spellSections}
                </div>
            </form>
            
            <style>
                .spell-selection-form { 
                    padding: 10px; 
                    max-height: 600px; 
                    overflow-y: auto;
                    min-width: 600px; /* 25% wider */
                }
                .spell-info { 
                    background: rgba(100,0,200,0.1); 
                    padding: 10px; 
                    border-radius: 5px; 
                    margin-bottom: 15px; 
                }
                .spell-source-section { margin-bottom: 20px; }
                .spell-source-section h3 { color: #4a4a4a; border-bottom: 2px solid #ddd; padding-bottom: 5px; }
                .spell-option { margin-bottom: 12px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
                .spell-option:hover { background: rgba(0,0,0,0.05); }
                .spell-option input[type="checkbox"]:checked + label { font-weight: bold; background: rgba(0,200,0,0.1); }
                .spell-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
                .spell-cost { color: #8b4513; font-weight: bold; }
                .spell-details { display: flex; gap: 10px; font-size: 11px; color: #666; margin-bottom: 5px; }
                .spell-details span { background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 3px; }
                .spell-description { font-style: italic; margin: 5px 0; font-size: 12px; }
                .spell-benediction { color: #006400; font-size: 11px; margin: 5px 0; }
                #spell-counter { font-weight: bold; color: #d9534f; }
            </style>
        `;

        return new Promise(resolve => {
            new Dialog({
                title: "Sélection des Sorts",
                content,
                render: html => {
                    CharacterProgression._setupSpellCounterListeners(html, maxSpells);
                    
                    // **RESTAURER les sorts sélectionnés si ils existent**
                    if (creationData.selectedSpells) {
                        creationData.selectedSpells.forEach(spellId => {
                            html.find(`[name="selectedSpells"][value="${spellId}"]`).prop('checked', true);
                        });
                        
                        // Mettre à jour le compteur
                        const selectedCount = html.find('[name="selectedSpells"]:checked').length;
                        html.find('#spell-counter').text(selectedCount);
                    }
                },
                buttons: {
                    back: {
                        icon: '<i class="fas fa-arrow-left"></i>',
                        label: "Retour",
                        callback: () => {
                            const tempData = CharacterProgression._loadTempData();
                            CharacterProgression.showTalentSelectionDialog(actor, tempData).then(resolve);
                        }
                    },
                    finish: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Finaliser la Création",
                        callback: html => {
                            const selectedSpells = Array.from(html.find('[name="selectedSpells"]:checked')).map(cb => cb.value);
                            if (selectedSpells.length !== maxSpells) {
                                ui.notifications.warn(`Vous devez sélectionner exactement ${maxSpells} sorts.`);
                            } else {
                                creationData.selectedSpells = selectedSpells;
                                
                                // **FINALISER et nettoyer les données temporaires**
                                CharacterProgression.finalizeCharacterCreation(actor, creationData).then(() => {
                                    CharacterProgression._clearTempData();
                                    resolve();
                                });
                            }
                        }
                    }
                },
                default: "finish"
            }).render(true);
        });
    }

    // **FINALISATION : Appliquer toutes les sélections**
    static async finalizeCharacterCreation(actor, creationData) {
        try {
            const updateData = {
                "system.race": creationData.race,
                "system.voiesArcane": {
                    type1: creationData.type1,
                    key1: creationData.key1,
                    type2: creationData.type2,
                    key2: creationData.key2
                },
                "system.niveauJoueur": 1,
                "system.rang": "Novice"
            };

            // Caractéristiques majeures
            if (creationData.majorAttributes) {
                Object.entries(creationData.majorAttributes).forEach(([attr, value]) => {
                    updateData[`system.majeures.${attr}.repartition`] = value;
                });
            }

            // **CORRECTION : Caractéristiques mineures avec répartition seulement**
            if (creationData.minorAttributes) {
                Object.entries(creationData.minorAttributes.repartition).forEach(([attr, repartitionValue]) => {
                    updateData[`system.mineures.${attr}.repartition`] = repartitionValue;
                });
            }

            // **CORRIGER : Appliquer les talents sélectionnés**
            if (creationData.selectedTalents) {
                const talents = [];
                
                // Talents de race (1 seul, pas de tableau)
                if (creationData.selectedTalents?.race && creationData.selectedTalents.race.length > 0) {
                    const raceTalentId = creationData.selectedTalents.race[0]; // Premier uniquement
                    const cleanTalentId = raceTalentId.replace(/^race:[^:]+:/, '');
                    
                    talents.push({
                        nom: cleanTalentId,
                        source: "race",
                        niveau: 1,
                        effet: CharacterProgression._getRaceTalentbenediction(creationData.race, cleanTalentId)
                    });
                }
                
                // Talents de voie/arcane (1 seul)
                if (creationData.selectedTalents?.path) {
                    const pathTalentId = creationData.selectedTalents.path;
                    const cleanTalentId = pathTalentId.replace(/^(voie|arcane):[^:]+:/, '');
                    
                    talents.push({
                        nom: cleanTalentId,
                        source: creationData.type1 === "voie" ? "voie" : "arcane",
                        niveau: 1,
                        effet: CharacterProgression._getPathTalentbenediction(creationData, cleanTalentId)
                    });
                }
                
                // Talents historiques
                if (creationData.selectedTalents?.historical && creationData.selectedTalents.historical.length > 0) {
                    creationData.selectedTalents.historical.forEach(historicalTalentId => {
                        const cleanTalentId = historicalTalentId.replace(/^historique:/, '');
                        
                        talents.push({
                            nom: cleanTalentId,
                            source: "historique",
                            niveau: 1,
                            effet: CharacterProgression._getHistoricalTalentbenediction(cleanTalentId)
                        });
                    });
                }
                
                updateData["system.talents"] = talents;
            }

            // **CORRECTION : Sauvegarder les sorts sélectionnés**
            if (creationData.selectedSpells && creationData.selectedSpells.length > 0) {
                updateData["system.sortsChoisis"] = creationData.selectedSpells.map(spellId => ({
                    id: spellId,
                    niveau: 1,
                    rang: "Novice",
                    source: "création"
                }));
                updateData["system.nbSortsAChoisir"] = 0; // Plus de sorts à choisir après création
            }

            await actor.update(updateData);
            
            // **7. APPLIQUER LES FONCTIONS DES TALENTS**
                if (creationData.selectedTalents) {
                    const talentsToApply = [];
                    
                    // Préparer les talents pour l'application des fonctions
                    if (creationData.selectedTalents.historical) {
                        creationData.selectedTalents.historical.forEach(historicalTalentId => {
                            const cleanTalentId = historicalTalentId.replace(/^historique:/, '');
                            talentsToApply.push({
                                nom: cleanTalentId,
                                source: "historique",
                                niveau: 1
                            });
                        });
                    }
                    
                    if (creationData.selectedTalents.path) {
                        const pathTalentId = creationData.selectedTalents.path;
                        const [talentSource, talentPath, ...talentNameParts] = pathTalentId.split(':');
                        const talentName = talentNameParts.join(':');
                        
                        talentsToApply.push({
                            nom: talentName,
                            source: talentSource,
                            niveau: 1
                        });
                    }
                    
                    // Appliquer les fonctions des talents
                    await CharacterProgression._applyTalentFunctions(actor, talentsToApply);
                }

ui.notifications.info("✨ Personnage créé avec succès !");
            
            ChatMessage.create({
                user: game.user.id,
                speaker: ChatMessage.getSpeaker({actor: actor}),
                content: `
                    <h3>🎭 Nouveau Personnage Créé !</h3>
                    <p><strong>Race :</strong> ${AlyriaRaces[creationData.race]?.nom}</p>
                    <p><strong>Voie/Arcane :</strong> ${CharacterProgression._getPathName(creationData.type1, creationData.key1)}</p>
                    ${creationData.type2 ? `<p><strong>Seconde :</strong> ${CharacterProgression._getPathName(creationData.type2, creationData.key2)}</p>` : ''}
                    <p><strong>Niveau :</strong> 1 (Novice)</p>
                    <p><strong>Points de caractéristiques :</strong> Majeures et mineures répartis</p>
                `
            });
            
        } catch (error) {
            console.error("Erreur lors de la finalisation:", error);
            ui.notifications.error("Erreur lors de la création du personnage !");
        }
    }

    // **MONTÉE DE NIVEAU : Dialogue principal**
    static async showLevelUpDialog(actor) {
        const currentLevel = actor.system.niveauJoueur || 1;
        const newLevel = currentLevel + 1;
        
        console.log(`🆙 Montée de niveau ${currentLevel} → ${newLevel}`);
        
        // Préparer les données de création pour la montée de niveau
        const levelUpData = {
            level: newLevel,
            isLevelUp: true,
            race: actor.system.race,
            type1: actor.system.voiesArcane?.type1,
            key1: actor.system.voiesArcane?.key1,
            type2: actor.system.voiesArcane?.type2,
            key2: actor.system.voiesArcane?.key2
        };
        
        // Sauvegarder temporairement
        CharacterProgression._saveTempData(levelUpData);
        
        // Commencer par les caractéristiques majeures
        return CharacterProgression.showLevelUpMajorDialog(actor, levelUpData);
    }

    // **NOUVELLE MÉTHODE : Dialogue des majeures pour montée de niveau**
    static async showLevelUpMajorDialog(actor, levelUpData) {
        const majeurAttributes = [
            { id: "force", label: "Force", description: "Puissance physique et capacité de porter" },
            { id: "dexterite", label: "Dextérité", description: "Agilité et précision des mouvements" },
            { id: "constitution", label: "Constitution", description: "Résistance et endurance physique" },
            { id: "intelligence", label: "Intelligence", description: "Capacité d'apprentissage et de raisonnement" },
            { id: "sagesse", label: "Sagesse", description: "Perception et intuition" },
            { id: "charisme", label: "Charisme", description: "Force de personnalité et leadership" },
            { id: "defense", label: "Défense", description: "Capacité à bloquer et esquiver" },
            { id: "chance", label: "Chance", description: "Fortune et coups critiques" }
        ];

        const attributeRows = majeurAttributes.map(attr => {
            // **CORRECTION : GARDER les valeurs négatives (malus raciaux/voie)**
            const currentValue = actor.system.majeures?.[attr.id]?.totale || 0;
            
            return `<div class="major-attribute-item">
                <div class="major-attribute-info">
                    <label for="${attr.id}">${attr.label}</label>
                    <p class="major-attribute-description">${attr.description}</p>
                    <div class="current-value">Actuel: ${currentValue}</div>
                </div>
                <div class="major-attribute-controls">
                    <span class="current-display">${currentValue}</span>
                    <span class="plus-sign">+</span>
                    <button type="button" class="major-attr-decrease" data-attr="${attr.id}">-</button>
                    <input type="number" 
                           class="levelup-points"
                           id="${attr.id}" 
                           data-attr="${attr.id}" 
                           data-current="${currentValue}"
                           value="0" 
                           min="0" 
                           max="3">
                    <button type="button" class="major-attr-increase" data-attr="${attr.id}">+</button>
                    <span class="equals-sign">=</span>
                    <span class="total-value">${currentValue}</span>
                </div>
            </div>`
        }).join("");

        const content = `
            <form class="levelup-major-form">
                <h2>⬆️ Montée de Niveau ${levelUpData.level}</h2>
                <h3>💪 Répartition des Caractéristiques Majeures</h3>
                
                <div class="levelup-points-info">
                    <p><strong>Points à répartir :</strong> <span id="levelup-major-remaining">3</span> / 3</p>
                    <p><em>Vous gagnez 3 points de caractéristiques majeures à chaque niveau</em></p>
                </div>
                
                <div class="major-attributes-list">
                    ${attributeRows}
                </div>
            </form>
            
            ${CharacterProgression._getLevelUpMajorCSS()}
        `;

        return new Promise(resolve => {
            new Dialog({
                title: `Montée de Niveau ${levelUpData.level} - Majeures`,
                content,
                render: html => {
                    CharacterProgression._setupLevelUpMajorListeners(html);
                },
                buttons: {
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Annuler",
                        callback: () => {
                            CharacterProgression._clearTempData();
                        }
                    },
                    next: {
                        icon: '<i class="fas fa-arrow-right"></i>',
                        label: "Suivant : Mineures",
                        callback: html => {
                            const remainingPoints = parseInt(html.find('#levelup-major-remaining').text());
                            if (remainingPoints !== 0) {
                                ui.notifications.warn("Vous devez utiliser tous vos points avant de continuer !");
                                return;
                            }
                            
                            const majorData = CharacterProgression._getLevelUpMajorData(html);
                            levelUpData.majorAttributesGain = majorData;
                            
                            CharacterProgression._saveTempData(levelUpData);
                            CharacterProgression.showLevelUpMinorDialog(actor, levelUpData).then(resolve);
                        }
                    }
                },
                default: "next"
            }).render(true);
        });
    }

    // **NOUVELLE MÉTHODE : Dialogue des mineures pour montée de niveau**
    static async showLevelUpMinorDialog(actor, levelUpData) {
        const minorAttributes = [
            { id: "monde", label: "Monde", description: "Connaissance du monde et de ses cultures" },
            { id: "mystique", label: "Mystique", description: "Compréhension des forces occultes" },
            { id: "nature", label: "Nature", description: "Connaissance de la faune et flore" },
            { id: "sacré", label: "Sacré", description: "Connaissance des divinités et rituels" },
            { id: "robustesse", label: "Robustesse", description: "Résistance aux maladies et poisons" },
            { id: "calme", label: "Calme", description: "Maîtrise de soi et résistance mentale" },
            { id: "marchandage", label: "Marchandage", description: "Art de négocier et commercer" },
            { id: "persuasion", label: "Persuasion", description: "Capacité à convaincre autrui" },
            { id: "artmusique", label: "Art & Musique", description: "Talents artistiques et musicaux" },
            { id: "commandement", label: "Commandement", description: "Capacité à diriger et motiver" },
            { id: "acrobatie", label: "Acrobatie", description: "Agilité et mouvements complexes" },
            { id: "discretion", label: "Discrétion", description: "Art de se cacher et se mouvoir silencieusement" },
            { id: "adresse", label: "Adresse", description: "Dextérité manuelle et précision" },
            { id: "artisanat", label: "Artisanat", description: "Création et réparation d'objets" },
            { id: "hasard", label: "Hasard", description: "Chance aux jeux et coïncidences" },
            { id: "athlétisme", label: "Athlétisme", description: "Prouesses physiques et sportives" },
            { id: "puissance", label: "Puissance", description: "Force brute et capacité de destruction" },
            { id: "intimidation", label: "Intimidation", description: "Capacité à inspirer la peur" },
            { id: "perception", label: "Perception", description: "Acuité des sens et observation" },
            { id: "perceptionmagique", label: "Perception Magique", description: "Détection des énergies magiques" },
            { id: "medecine", label: "Médecine", description: "Soins et connaissance anatomique" },
            { id: "intuition", label: "Intuition", description: "Instinct et pressentiments" }
        ];

        const attributeRows = minorAttributes.map(attr => {
            const currentValue = actor.system.mineures?.[attr.id]?.totale || 0;
            // **SUPPRESSION : Plus de limite à 30, seuls les 30 points à répartir comptent**
            
            return `<div class="minor-attribute-item">
                <div class="minor-attribute-info">
                    <label for="${attr.id}">${attr.label}</label>
                    <p class="minor-attribute-description">${attr.description}</p>
                    <div class="current-value">Actuel: ${currentValue}</div>
                </div>
                <div class="minor-attribute-controls">
                    <span class="current-display">${currentValue}</span>
                    <span class="plus-sign">+</span>
                    <button type="button" class="minor-attr-decrease" data-attr="${attr.id}">-</button>
                    <input type="number" 
                           class="levelup-points"
                           id="${attr.id}" 
                           data-attr="${attr.id}" 
                           data-current="${currentValue}"
                           value="0" 
                           min="0" 
                           max="30">
                    <button type="button" class="minor-attr-increase" data-attr="${attr.id}">+</button>
                    <span class="equals-sign">=</span>
                    <span class="total-value">${currentValue}</span>
                </div>
            </div>`
        }).join("");

        const content = `
            <form class="levelup-minor-form">
                <h2>⬆️ Montée de Niveau ${levelUpData.level}</h2>
                <h3>🎯 Répartition des Caractéristiques Mineures</h3>
                
                <div class="levelup-points-info">
                    <p><strong>Points à répartir :</strong> <span id="levelup-minor-remaining">30</span> / 30</p>
                    <p><em>Vous gagnez 30 points de caractéristiques mineures à chaque niveau</em></p>
                </div>
                
                <div class="minor-attributes-list">
                    ${attributeRows}
                </div>
            </form>
            
            ${CharacterProgression._getLevelUpMinorCSS()}
        `;

        return new Promise(resolve => {
            new Dialog({
                title: `Montée de Niveau ${levelUpData.level} - Mineures`,
                content,
                render: html => {
                    CharacterProgression._setupLevelUpMinorListeners(html);
                },
                buttons: {
                    back: {
                        icon: '<i class="fas fa-arrow-left"></i>',
                        label: "Retour",
                        callback: () => {
                            const tempData = CharacterProgression._loadTempData();
                            CharacterProgression.showLevelUpMajorDialog(actor, tempData).then(resolve);
                        }
                    },
                    next: {
                        icon: '<i class="fas fa-arrow-right"></i>',
                        label: "Suivant : Talents",
                        callback: html => {
                            const remainingPoints = parseInt(html.find('#levelup-minor-remaining').text());
                            if (remainingPoints !== 0) {
                                ui.notifications.warn("Vous devez utiliser tous vos points avant de continuer !");
                                return;
                            }
                            
                            const minorData = CharacterProgression._getLevelUpMinorData(html);
                            levelUpData.minorAttributesGain = minorData;
                            
                            CharacterProgression._saveTempData(levelUpData);
                            CharacterProgression.showLevelUpTalentDialog(actor, levelUpData).then(resolve);
                        }
                    }
                },
                default: "next"
            }).render(true);
        });
    }

    // **NOUVELLE MÉTHODE : Dialogue des sorts pour montée de niveau**
static async showLevelUpTalentDialog(actor, levelUpData) {
    const availableTalents = CharacterProgression._getAvailableTalents(levelUpData, levelUpData.level);
    const isSpecialized = !levelUpData.type2; // Mono-voie
    const isDoubleVoie = !!levelUpData.type2; // Double voie
    const isEvenLevel = levelUpData.level % 2 === 0; // Niveaux pairs
    
    console.log(`🆙 Montée de niveau ${levelUpData.level} - Talents disponibles :`, availableTalents);
    console.log(`📊 Niveau pair: ${isEvenLevel}, Spécialisé: ${isSpecialized}`);
    
    // Organiser les talents par type
    const talentsByType = {
        voie: availableTalents.filter(t => t.type === "voie"),
        arcane: availableTalents.filter(t => t.type === "arcane")
    };
    
    // **CORRECTION : Talents généraux pour les niveaux pairs EN BONUS**
    if (isEvenLevel) {
        talentsByType.general = CharacterProgression._getGeneralTalents(actor);
        console.log(`🎯 Talents généraux niveau ${levelUpData.level} (BONUS):`, talentsByType.general);
    }
    
    let content = "";
    
    // **SPÉCIALISÉ (Mono-voie) : Talent automatique + talent général si niveau pair**
    if (isSpecialized) {
        const autoTalent = [...talentsByType.voie, ...talentsByType.arcane]
            .find(t => t.level === levelUpData.level);
            
        if (autoTalent) {
            // **NOUVEAU : Si niveau pair, ajouter la sélection de talent général**
            const generalTalentSection = isEvenLevel && talentsByType.general?.length > 0 ? `
                <h3>🏆 Talent Général Bonus (Niveau Pair)</h3>
                <div class="talent-list general-talents">
                    ${talentsByType.general.map(talent => 
                        `<div class="talent-option">
                            <input type="radio" name="selectedGeneralTalent" value="${talent.id}" id="general_${talent.id}">
                            <label for="general_${talent.id}">
                                <div class="talent-header">
                                    <strong>${talent.name}</strong>
                                    <span class="talent-type">Talent Général</span>
                                </div>
                                <p class="talent-source"><em>(${talent.source})</em></p>
                                <p class="talent-description">${talent.description}</p>
                                ${talent.prerequis ? `<p class="talent-prerequis"><strong>Prérequis:</strong> ${talent.prerequis}</p>` : ''}
                            </label>
                        </div>`
                    ).join("")}
                </div>
            ` : '';

            content = `
                <form class="levelup-talent-form">
                    <h2>⬆️ Montée de Niveau ${levelUpData.level}</h2>
                    <h3>🎯 Talents de Niveau ${levelUpData.level}</h3>
                    
                    <div class="auto-talent-info">
                        <p><strong>✨ Avantage de la spécialisation :</strong></p>
                        <p>Vous obtenez automatiquement le talent de niveau ${levelUpData.level} de votre voie/arcane !</p>
                        ${isEvenLevel ? '<p><strong>🌟 Bonus niveau pair :</strong> Vous gagnez AUSSI un talent général !</p>' : ''}
                    </div>
                    
                    <div class="auto-talent-display">
                        <h3>🏛️ Talent Automatique (Spécialisation)</h3>
                        <div class="talent-option auto-selected">
                            <div class="talent-header">
                                <strong>${autoTalent.name}</strong>
                                <span class="auto-badge">AUTOMATIQUE</span>
                            </div>
                            <p class="talent-source"><em>(${autoTalent.source})</em></p>
                            <p class="talent-description">${autoTalent.description}</p>
                        </div>
                    </div>
                    
                    ${generalTalentSection}
                    
                    <input type="hidden" name="autoTalent" value="${autoTalent.id}">
                </form>
                
                <style>
                    .auto-talent-info {
                        background: rgba(76, 175, 80, 0.1);
                        padding: 15px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                        border-left: 4px solid #4CAF50;
                        min-width: 600px;
                        font-size: 16px;
                    }
                    .auto-talent-display {
                        margin: 20px 0;
                    }
                    .talent-option.auto-selected {
                        background: rgba(76, 175, 80, 0.1);
                        border: 2px solid #4CAF50;
                        padding: 15px;
                        border-radius: 5px;
                        font-size: 15px;
                        margin-bottom: 15px;
                    }
                    .talent-option {
                        margin-bottom: 15px;
                        background: rgba(255, 193, 7, 0.1);
                        border: 1px solid #FFC107;
                        padding: 15px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .talent-option:hover { 
                        background: rgba(0,0,0,0.05); 
                    }
                    .talent-option input[type="radio"]:checked + label { 
                        font-weight: bold; 
                    }
                    .auto-badge {
                        background: #4CAF50;
                        color: white;
                        padding: 2px 8px;
                        border-radius: 3px;
                        font-size: 13px;
                        font-weight: bold;
                    }
                    .talent-type {
                        background: #FF9800;
                        color: white;
                        padding: 2px 8px;
                        border-radius: 3px;
                        font-size: 12px;
                    }
                    .talent-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        font-size: 18px;
                    }
                    .talent-source {
                        color: #666;
                        font-size: 14px;
                        margin: 5px 0;
                    }
                    .talent-description {
                        font-style: italic;
                        margin: 10px 0;
                        font-size: 14px;
                    }
                    .talent-prerequis {
                        color: #666;
                        font-size: 12px;
                        margin: 5px 0;
                    }
                    h3 {
                        color: #4a4a4a; 
                        border-bottom: 2px solid #ddd; 
                        padding-bottom: 5px; 
                        margin-top: 20px;
                    }
                </style>
            `;
            
            // **SAUVEGARDER le talent automatique**
            levelUpData.selectedTalent = autoTalent.id;
            
        } else {
            content = `
                <div class="no-talent-available">
                    <h2>⬆️ Montée de Niveau ${levelUpData.level}</h2>
                    <p>Aucun nouveau talent disponible à ce niveau.</p>
                </div>
            `;
        }
        
    } else {
        // **DOUBLE VOIE : Choisir UN talent de voie/arcane + talent général si niveau pair**
        const pathTalentOptions = [...talentsByType.voie, ...talentsByType.arcane]
            .filter(t => t.level === levelUpData.level)
            .map(talent => 
                `<div class="talent-option">
                    <input type="radio" name="selectedTalent" value="${talent.id}" id="${talent.id}">
                    <label for="${talent.id}">
                        <div class="talent-header">
                            <strong>${talent.name}</strong>
                            <span class="talent-level">Niveau ${talent.level}</span>
                        </div>
                        <p class="talent-source"><em>(${talent.source})</em></p>
                        <p class="talent-description">${talent.description}</p>
                    </label>
                </div>`
            ).join("");

        const generalTalentSection = isEvenLevel && talentsByType.general?.length > 0 ? `
            <h3>🏆 Talent Général Bonus (Niveau Pair)</h3>
            <div class="talent-list general-talents">
                ${talentsByType.general.map(talent => 
                    `<div class="talent-option">
                        <input type="radio" name="selectedGeneralTalent" value="${talent.id}" id="general_${talent.id}">
                        <label for="general_${talent.id}">
                            <div class="talent-header">
                                <strong>${talent.name}</strong>
                                <span class="talent-type">Talent Général</span>
                            </div>
                            <p class="talent-source"><em>(${talent.source})</em></p>
                            <p class="talent-description">${talent.description}</p>
                            ${talent.prerequis ? `<p class="talent-prerequis"><strong>Prérequis:</strong> ${talent.prerequis}</p>` : ''}
                        </label>
                    </div>`
                ).join("")}
            </div>
        ` : '';

        content = `
            <form class="levelup-talent-form">
                <h2>⬆️ Montée de Niveau ${levelUpData.level}</h2>
                <h3>🎯 Sélection de Talent</h3>
                
                <div class="dual-path-info">
                    <h3>⚖️ Double Voie/Arcane</h3>
                    <p><strong>Important :</strong> Vous devez choisir UN talent parmi ceux disponibles.</p>
                    ${isEvenLevel ? '<p><strong>🌟 Bonus niveau pair :</strong> Vous gagnez AUSSI un talent général !</p>' : ''}
                </div>
                
                <div class="talent-categories">
                    <h3>🏛️ Talents de Voie/Arcane (Niveau ${levelUpData.level}) - OBLIGATOIRE</h3>
                    <div class="talent-list path-talents">
                        ${pathTalentOptions}
                    </div>
                    
                    ${generalTalentSection}
                </div>
            </form>
            
            <style>
                .levelup-talent-form { 
                    padding: 15px; 
                    max-height: 600px; 
                    overflow-y: auto;
                    min-width: 600px; 
                }
                .dual-path-info { 
                    background: rgba(255,140,0,0.1); 
                    padding: 15px; 
                    border-radius: 5px; 
                    margin-bottom: 20px; 
                    border-left: 4px solid #FF8C00;
                }
                .talent-categories h3 { 
                    color: #4a4a4a; 
                    border-bottom: 2px solid #ddd; 
                    padding-bottom: 5px; 
                    margin-top: 20px; 
                }
                .talent-option { 
                    margin-bottom: 15px;  
                    background: rgba(200, 143, 0, 0.1); 
                    border-color:rgb(175, 119, 76); 
                    padding: 15px; 
                    border: 1px solid #ddd; 
                    border-radius: 5px; 
                    cursor: pointer;
                }
                .talent-option:hover { 
                    background: rgba(0,0,0,0.05); 
                }
                .talent-option input[type="radio"]:checked + label { 
                    font-weight: bold; 
                }
                .talent-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .talent-type {
                    background: #FF9800;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 3px;
                    font-size: 12px;
                }
                .talent-level {
                    background: #2196F3;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 3px;
                    font-size: 12px;
                }
                .talent-description { 
                    font-style: italic; 
                    margin: 5px 0; 
                    font-size: 14px; 
                }
                .talent-prerequis {
                    color: #666;
                    font-size: 12px;
                    margin: 5px 0;
                }
                /* Différencier visuellement les talents généraux */
                .general-talents .talent-option {
                    background: rgba(255, 193, 7, 0.1);
                    border-color: #FFC107;
                }
            </style>
        `;
    }

    return new Promise(resolve => {
        new Dialog({
            title: `Montée de Niveau ${levelUpData.level} - Talents`,
            content,
            buttons: {
                back: {
                    icon: '<i class="fas fa-arrow-left"></i>',
                    label: "Retour",
                    callback: () => {
                        const tempData = CharacterProgression._loadTempData();
                        CharacterProgression.showLevelUpMinorDialog(actor, tempData).then(resolve);
                    }
                },
                next: {
                    icon: '<i class="fas fa-arrow-right"></i>',
                    label: "Suivant : Sorts",
                    callback: html => {
                        // **POUR DOUBLE VOIE : Vérifier qu'un talent de voie/arcane est sélectionné**
                        if (isDoubleVoie) {
                            const selectedTalent = html.find('[name="selectedTalent"]:checked').val();
                            if (!selectedTalent) {
                                ui.notifications.warn("Veuillez sélectionner un talent de voie/arcane !");
                                return;
                            }
                            levelUpData.selectedTalent = selectedTalent;
                        }
                        
                        // **POUR NIVEAU PAIR : Vérifier qu'un talent général est sélectionné**
                        if (isEvenLevel && talentsByType.general?.length > 0) {
                            const selectedGeneralTalent = html.find('[name="selectedGeneralTalent"]:checked').val();
                            if (!selectedGeneralTalent) {
                                ui.notifications.warn("Veuillez sélectionner un talent général (bonus niveau pair) !");
                                return;
                            }
                            levelUpData.selectedGeneralTalent = selectedGeneralTalent;
                        }
                        
                        // Pour mono-voie, le talent est déjà sauvegardé
                        
                        CharacterProgression._saveTempData(levelUpData);
                        CharacterProgression.showLevelUpSpellDialog(actor, levelUpData).then(resolve);
                    }
                }
            },
            default: "next"
        }).render(true);
    });
}

// **AJOUT : Méthode manquante showLevelUpSpellDialog**
static async showLevelUpSpellDialog(actor, levelUpData) {
    const availableSpells = CharacterProgression._getAvailableSpells(levelUpData, levelUpData.level, actor);
    const maxSpells = CharacterProgression._getMaxSpellsForLevel(levelUpData.level, levelUpData);
    
    console.log("🔮 Sorts disponibles pour niveau", levelUpData.level, ":", availableSpells);
    
    // Grouper par source
    const spellsBySource = {};
    availableSpells.forEach(spell => {
        if (!spellsBySource[spell.source]) {
            spellsBySource[spell.source] = [];
        }
        spellsBySource[spell.source].push(spell);
    });

    const spellSections = Object.entries(spellsBySource).map(([source, spells]) => {
        const spellOptions = CharacterProgression._generateSpellOptions(spells);
        
        return `
            <div class="spell-source-section">
                <h3>📚 ${source}</h3>
                <div class="spell-list">
                    ${spellOptions}
                </div>
            </div>
        `;
    }).join("");

    const content = `
        <form class="levelup-spell-form">
            <h2>⬆️ Montée de Niveau ${levelUpData.level}</h2>
            <h3>🔮 Sélection des Sorts</h3>
            
            <div class="spell-info">
                <p><strong>Sorts à sélectionner :</strong> <span id="spell-counter">0</span> / ${maxSpells}</p>
                <p><em>Vous gagnez ${maxSpells} nouveaux sorts à chaque niveau.</em></p>
            </div>
            
            <div class="spell-categories">
                ${spellSections}
            </div>
        </form>
        
        <style>
            .levelup-spell-form { 
                padding: 15px; 
                max-height: 600px; 
                overflow-y: auto;
                min-width: 600px; 
            }
            .spell-info { 
                background: rgba(100,0,200,0.1); 
                padding: 10px; 
                border-radius: 5px; 
                margin-bottom: 15px; 
            }
            .spell-source-section { margin-bottom: 20px; }
            .spell-source-section h3 { 
                color: #4a4a4a; 
                border-bottom: 2px solid #ddd; 
                padding-bottom: 5px; 
            }
            .spell-option { 
                margin-bottom: 12px; 
                padding: 10px; 
                border: 1px solid #ddd; 
                border-radius: 5px; 
                cursor: pointer;
            }
            .spell-option:hover { 
                background: rgba(0,0,0,0.05); 
            }
            .spell-option input[type="checkbox"]:checked + label { 
                font-weight: bold; 
                background: rgba(0,200,0,0.1); 
            }
            .spell-header { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                margin-bottom: 5px; 
            }
            .spell-cost { 
                color: #8b4513; 
                font-weight: bold; 
            }
            .spell-details { 
                display: flex; 
                gap: 10px; 
                font-size: 11px; 
                color: #666; 
                margin-bottom: 5px; 
            }
            .spell-details span { 
                background: rgba(0,0,0,0.1); 
                padding: 2px 6px; 
                border-radius: 3px; 
            }
            .spell-description { 
                font-style: italic; 
                margin: 5px 0; 
                font-size: 12px; 
            }
            .spell-benediction { 
                color: #006400; 
                font-size: 11px; 
                margin: 5px 0; 
            }
            #spell-counter { 
                font-weight: bold; 
                color: #d9534f; 
            }
        </style>
    `;

    return new Promise(resolve => {
        new Dialog({
            title: `Montée de Niveau ${levelUpData.level} - Sorts`,
            content,
            render: html => {
                CharacterProgression._setupSpellCounterListeners(html, maxSpells);
                
                // **RESTAURER les sorts sélectionnés si ils existent**
                if (levelUpData.selectedSpells) {
                    levelUpData.selectedSpells.forEach(spellId => {
                        html.find(`[name="selectedSpells"][value="${spellId}"]`).prop('checked', true);
                    });
                    
                    // Mettre à jour le compteur
                    const selectedCount = html.find('[name="selectedSpells"]:checked').length;
                    html.find('#spell-counter').text(selectedCount);
                }
            },
            buttons: {
                back: {
                    icon: '<i class="fas fa-arrow-left"></i>',
                    label: "Retour",
                    callback: () => {
                        const tempData = CharacterProgression._loadTempData();
                        CharacterProgression.showLevelUpTalentDialog(actor, tempData).then(resolve);
                    }
                },
                finish: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Finaliser la Montée de Niveau",
                    callback: html => {
                        const selectedSpells = Array.from(html.find('[name="selectedSpells"]:checked')).map(cb => cb.value);
                        
                        if (selectedSpells.length !== maxSpells) {
                            ui.notifications.warn(`Vous devez sélectionner exactement ${maxSpells} sorts.`);
                            return;
                        }
                        
                        levelUpData.selectedSpells = selectedSpells;
                        
                        // **FINALISER et nettoyer les données temporaires**
                        CharacterProgression.finalizeLevelUp(actor, levelUpData).then(() => {
                            CharacterProgression._clearTempData();
                            resolve();
                        });
                    }
                }
            },
            default: "finish"
        }).render(true);
    });
}

static async finalizeLevelUp(actor, levelUpData) {
    try {
        const updateData = {};
        
        // **1-5. Code existant inchangé...**
        updateData["system.niveauJoueur"] = levelUpData.level;
        updateData["system.rang"] = CharacterProgression._getLevelRank(levelUpData.level);
        
        // **MAJEURES et MINEURES** (code existant)
        if (levelUpData.majorAttributesGain) {
            Object.entries(levelUpData.majorAttributesGain).forEach(([attr, gain]) => {
                if (gain > 0) {
                    updateData[`system.majeures.${attr}.repartition`] = (actor.system.majeures[attr]?.repartition || 0) + gain;
                }
            });
        }
        
        if (levelUpData.minorAttributesGain) {
            Object.entries(levelUpData.minorAttributesGain).forEach(([attr, gain]) => {
                if (gain > 0) {
                    updateData[`system.mineures.${attr}.repartition`] = (actor.system.mineures[attr]?.repartition || 0) + gain;
                }
            });
        }
        
        // **6. CORRECTION : APPLIQUER LES DEUX TALENTS (voie/arcane + général)**
        const currentTalents = actor.system.talents || [];
        const newTalents = [...currentTalents];
        
        // **TALENT DE VOIE/ARCANE (toujours présent)**
        if (levelUpData.selectedTalent) {
            const pathTalent = CharacterProgression._createTalentFromId(levelUpData.selectedTalent, levelUpData.level);
            if (pathTalent) {
                newTalents.push(pathTalent);
                console.log("✅ Talent de voie/arcane ajouté:", pathTalent);
            }
        }
        
        // **TALENT GÉNÉRAL (si niveau pair)**
        if (levelUpData.selectedGeneralTalent) {
            const generalTalent = CharacterProgression._createTalentFromId(levelUpData.selectedGeneralTalent, levelUpData.level);
            if (generalTalent) {
                newTalents.push(generalTalent);
                console.log("✅ Talent général ajouté:", generalTalent);
                
                // **CORRECTION : Appliquer immédiatement les bonus du talent général**
                await CharacterProgression._applyGeneralTalentBonus(actor, generalTalent, updateData);
            }
        }
        
        updateData["system.talents"] = newTalents;
        
        // **7. SORTS** (code existant)
        if (levelUpData.selectedSpells && levelUpData.selectedSpells.length > 0) {
            const currentSpells = actor.system.sortsChoisis || [];
            const newSpells = levelUpData.selectedSpells.map(spellId => ({
                id: spellId,
                niveau: levelUpData.level,
                rang: CharacterProgression._getLevelRank(levelUpData.level),
                source: "level_up"
            }));
            
            updateData["system.sortsChoisis"] = [...currentSpells, ...newSpells];
        }
        
        // **8. APPLIQUER LES CHANGEMENTS BASIQUES**
        await actor.update(updateData);
        
        // **9. APPLIQUER LES FONCTIONS DES NOUVEAUX TALENTS**
        const talentsToApply = [];
        
        if (levelUpData.selectedTalent) {
            const pathTalentData = CharacterProgression._parseTalentForFunction(levelUpData.selectedTalent, levelUpData.level);
            if (pathTalentData) {
                talentsToApply.push(pathTalentData);
            }
        }
        
        if (levelUpData.selectedGeneralTalent) {
            const generalTalentData = CharacterProgression._parseTalentForFunction(levelUpData.selectedGeneralTalent, levelUpData.level);
            if (generalTalentData) {
                talentsToApply.push(generalTalentData);
            }
        }
        
        if (talentsToApply.length > 0) {
            await CharacterProgression._applyTalentFunctions(actor, talentsToApply);
        }
        
        // **10. MESSAGES**
        const talentCount = (levelUpData.selectedTalent ? 1 : 0) + (levelUpData.selectedGeneralTalent ? 1 : 0);
        
        ui.notifications.info(`✨ ${actor.name} a atteint le niveau ${levelUpData.level} !`);
        
        ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({actor: actor}),
            content: `
                <h3>⬆️ Montée de Niveau !</h3>
                <p><strong>${actor.name}</strong> atteint le niveau <strong>${levelUpData.level}</strong> !</p>
                <p><strong>Nouveau rang :</strong> ${CharacterProgression._getLevelRank(levelUpData.level)}</p>
                <p><strong>Points de caractéristiques :</strong> +3 majeures, +30 mineures</p>
                <p><strong>Nouveaux talents :</strong> ${talentCount} ${levelUpData.level % 2 === 0 ? '(dont 1 bonus niveau pair)' : ''}</p>
                <p><strong>Nouveaux sorts :</strong> +${levelUpData.selectedSpells?.length || 0}</p>
            `
        });
        
        console.log("✅ Montée de niveau finalisée:", levelUpData);
        
    } catch (error) {
        console.error("❌ Erreur lors de la montée de niveau:", error);
        ui.notifications.error("Erreur lors de la montée de niveau !");
    }
}

// **NOUVELLE MÉTHODE HELPER**
// **CORRECTION : _createTalentFromId pour les talents généraux**
static _createTalentFromId(talentId, level) {
    console.log("🔧 _createTalentFromId appelé avec:", talentId, "niveau:", level);
    
    const talentParts = talentId.split(':');
    const talentSource = talentParts[0];
    const talentPath = talentParts[1];
    const talentName = talentParts[2] || talentParts[1];
    
    console.log("📋 Parties du talent:", { talentSource, talentPath, talentName });
    
    let talentDescription = "Description non trouvée";
    let nomTalent = talentName;
    let talentEffet = null; // **NOUVEAU : Conserver la structure complète**
    
    if (talentSource === "voie") {
    // Chercher dans AlyriaVoies
    const voie = AlyriaVoies?.[talentPath];
    const talentsArray = voie?.talentVoie?.talents || [];
    if (talentsArray.length) {
        const talent = talentsArray.find(t => t.nom === talentName);
        if (talent) {
            talentDescription = talent.description || talent.effet || "Talent de voie";
            talentEffet = talent.effets || null;
        }
    }

    } else if (talentSource === "arcane") {
    // Chercher dans AlyriaArcane
    const arcane = AlyriaArcane?.[talentPath];
    // Correction : talents dans arcane.talentArcane.talents
    const talentsArray = arcane?.talentArcane?.talents || [];
    if (talentsArray.length) {
        const talent = talentsArray.find(t => t.nom === talentName);
        if (talent) {
            talentDescription = talent.description || talent.effet || "Talent d'arcane";
            talentEffet = talent.effets || null;
        }
    }
} else if (talentSource === "statistique") {
        const talent = talentStatistique[talentPath];
        if (talent) {
            nomTalent = talent.nom || talentPath;
            // **CORRECTION : Gérer la description ET l'effet séparément**
            talentDescription = talent.description || `Talent statistique: ${talent.nom}`;
            talentEffet = talent.effets || talent.effet; // **Conserver la structure complète**
        }
    } else if (talentSource === "combat") {
        const talent = talentCombat[talentPath];
        if (talent) {
            nomTalent = talent.nom || talentPath;
            talentDescription = talent.description || `Talent de combat: ${talent.nom}`;
            talentEffet = talent.effets || talent.effet;
        }
    } else if (talentSource === "utilitaire") {
        const talent = talentUtilitaire[talentPath];
        if (talent) {
            nomTalent = talent.nom || talentPath;
            talentDescription = talent.description || `Talent utilitaire: ${talent.nom}`;
            talentEffet = talent.effets || talent.effet;
        }
    } else if (talentSource === "general") {
        console.log("🎯 Traitement talent général, talentPath:", talentPath);
        
        const generalTalentData = CharacterProgression._findGeneralTalent(talentPath);
        console.log("📖 Données talent général trouvées:", generalTalentData);
        
        if (generalTalentData) {
            nomTalent = generalTalentData.nom || talentPath;
            talentDescription = generalTalentData.description || `Talent général: ${generalTalentData.nom}`;
            talentEffet = generalTalentData.effets || generalTalentData.effet;
        }
    }
    
    // **CORRECTION : Construire le talent avec la structure appropriée**
    const talent = {
        nom: nomTalent,
        source: talentSource,
        niveau: level,
        // **Pour l'affichage : utiliser la description textuelle**
        effet: talentDescription,
        // **Pour les fonctions : conserver la structure complète si elle existe**
        ...(talentEffet && typeof talentEffet === 'object' ? { effets: talentEffet } : {})
    };
    
    console.log("🎁 Talent créé:", talent);
    return talent;
}

// **CORRECTION : _findGeneralTalent avec plus de debugging**
static _findGeneralTalent(talentId) {
    console.log("🔍 _findGeneralTalent appelé avec:", talentId);
    
    // **MÉTHODE 1 : Chercher par clé directe**
    if (talentStatistique && talentStatistique[talentId]) {
        console.log("✅ Talent trouvé dans talentStatistique par clé:", talentStatistique[talentId]);
        return talentStatistique[talentId];
    }
    
    if (talentCombat && talentCombat[talentId]) {
        console.log("✅ Talent trouvé dans talentCombat par clé:", talentCombat[talentId]);
        return talentCombat[talentId];
    }
    
    if (talentUtilitaire && talentUtilitaire[talentId]) {
        console.log("✅ Talent trouvé dans talentUtilitaire par clé:", talentUtilitaire[talentId]);
        return talentUtilitaire[talentId];
    }
    
    // **MÉTHODE 2 : Chercher par nom si la clé ne marche pas**
    const searchName = talentId.toLowerCase();
    
    // Chercher dans talentStatistique par nom
    for (const [key, talent] of Object.entries(talentStatistique || {})) {
        if (talent.nom && talent.nom.toLowerCase().replace(/\s+/g, '') === searchName) {
            console.log("✅ Talent statistique trouvé par nom:", talent);
            return talent;
        }
    }
    
    // Chercher dans talentCombat par nom
    for (const [key, talent] of Object.entries(talentCombat || {})) {
        if (talent.nom && talent.nom.toLowerCase().replace(/\s+/g, '') === searchName) {
            console.log("✅ Talent combat trouvé par nom:", talent);
            return talent;
        }
    }
    
    // Chercher dans talentUtilitaire par nom
    for (const [key, talent] of Object.entries(talentUtilitaire || {})) {
        if (talent.nom && talent.nom.toLowerCase().replace(/\s+/g, '') === searchName) {
            console.log("✅ Talent utilitaire trouvé par nom:", talent);
            return talent;
        }
    }
    
    console.log("❌ Talent général non trouvé:", talentId);
    return null;
}

    // **MÉTHODES UTILITAIRES POUR LA MONTÉE DE NIVEAU**

    static _setupLevelUpMajorListeners(html) {
        const pointsCounter = html.find('#levelup-major-remaining');
        let remainingPoints = 3;

        function updateUI() {
            pointsCounter.text(remainingPoints);
            
            // **CORRECTION : Utiliser totale pour les calculs**
            html.find('input[data-attr]').each(function() {
                const $input = $(this);
                const attr = $input.data('attr');
                const currentValue = parseInt($input.data('current')) || 0;
                const gainValue = parseInt($input.val()) || 0;
                const totalValue = currentValue + gainValue;
                
                // **Mettre à jour l'affichage du total**
                $input.closest('.major-attribute-controls').find('.total-value').text(totalValue);
                
                // **Mettre à jour aussi la valeur actuelle**
                $input.closest('.major-attribute-controls').find('.current-display').text(currentValue);
            });
            
            // Gérer les boutons d'augmentation
            html.find('.major-attr-increase').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentGain = parseInt($input.val()) || 0;
                
                $btn.prop('disabled', remainingPoints <= 0 || currentGain >= 3);
            });
            
            // Gérer les boutons de diminution
            html.find('.major-attr-decrease').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentGain = parseInt($input.val()) || 0;
                
                $btn.prop('disabled', currentGain <= 0);
            });
            
            // Colorer le compteur selon les points restants
            if (remainingPoints === 0) {
                pointsCounter.css('color', '#4CAF50');
            } else if (remainingPoints < 0) {
                pointsCounter.css('color', '#f44336'); // Rouge si négatif
            } else {
                pointsCounter.css('color', '#FF9800');
            }
        }

        // **VALIDATION stricte des inputs manuels**
        html.find('input[data-attr]').on('input', function() {
            const $input = $(this);
            const newValue = parseInt($input.val()) || 0;
            const maxValue = 3;
            
            // Forcer les limites par attribut
            if (newValue > maxValue) {
                $input.val(maxValue);
            }
            if (newValue < 0) {
                $input.val(0);
            }
            
            // Recalculer les points restants en fonction du total utilisé
            let totalUsed = 0;
            html.find('input[data-attr]').each(function() {
                totalUsed += parseInt($(this).val()) || 0;
            });
            
            // **VALIDATION GLOBALE : Ne pas dépasser 3 points au total**
            if (totalUsed > 3) {
                // Réduire la valeur actuelle pour ne pas dépasser le total
                const excess = totalUsed - 3;
                const currentVal = parseInt($input.val()) || 0;
                $input.val(Math.max(0, currentVal - excess));
                
                // Recalculer après ajustement
                totalUsed = 0;
                html.find('input[data-attr]').each(function() {
                    totalUsed += parseInt($(this).val()) || 0;
                });
            }
            
            remainingPoints = Math.max(0, 3 - totalUsed);
            updateUI();
        });

        // Boutons d'augmentation
        html.find('.major-attr-increase').click(function() {
            const attr = $(this).data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentGain = parseInt($input.val()) || 0;
            
            if (remainingPoints > 0 && currentGain < 3) {
                $input.val(currentGain + 1);
                remainingPoints--;
                updateUI();
            }
        });

        // Boutons de diminution
        html.find('.major-attr-decrease').click(function() {
            const attr = $(this).data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentGain = parseInt($input.val()) || 0;
            
            if (currentGain > 0) {
                $input.val(currentGain - 1);
                remainingPoints++;
                updateUI();
            }
        });

        // **Initialiser l'affichage**
        updateUI();
    }

static async _applyGeneralTalentBonus(actor, talent, updateData) {
    console.log("🎯 Application bonus talent général:", talent.nom);
    
    // **Récupérer les données complètes du talent**
    const talentId = `${talent.source}:${talent.nom.toLowerCase().replace(/\s+/g, '')}`;
    const fullTalentData = CharacterProgression._findGeneralTalent(talent.nom.toLowerCase().replace(/\s+/g, ''));
    
    if (!fullTalentData || !fullTalentData.effets) {
        console.log("❌ Pas de bonus à appliquer pour ce talent");
        return;
    }
    
    console.log("📊 Effets du talent:", fullTalentData.effets);
    
    // **APPLIQUER LES BONUS MAJEURES**
    if (fullTalentData.effets.majeure) {
        Object.entries(fullTalentData.effets.majeure).forEach(([stat, bonus]) => {
            const currentTalentBonus = actor.system.majeures[stat.toLowerCase()]?.talents || 0;
            const newTalentBonus = currentTalentBonus + bonus;
            updateData[`system.majeures.${stat.toLowerCase()}.talents`] = newTalentBonus;
            console.log(`✅ Majeure ${stat}: +${bonus} (total talents: ${newTalentBonus})`);
        });
    }
    
    // **APPLIQUER LES BONUS MINEURES**
    if (fullTalentData.effets.mineure) {
        Object.entries(fullTalentData.effets.mineure).forEach(([stat, bonus]) => {
            const currentTalentBonus = actor.system.mineures[stat.toLowerCase()]?.talents || 0;
            const newTalentBonus = currentTalentBonus + bonus;
            updateData[`system.mineures.${stat.toLowerCase()}.talents`] = newTalentBonus;
            console.log(`✅ Mineure ${stat}: +${bonus} (total talents: ${newTalentBonus})`);
        });
    }
    
    console.log("🎉 Bonus du talent général appliqués");
}


    static _setupLevelUpMinorListeners(html) {
        const pointsCounter = html.find('#levelup-minor-remaining');
        let remainingPoints = 30;

        function updateUI() {
            pointsCounter.text(remainingPoints);
            
            html.find('input[data-attr]').each(function() {
                const $input = $(this);
                const attr = $input.data('attr');
                const currentValue = parseInt($input.data('current')) || 0;
                const gainValue = parseInt($input.val()) || 0;
                const totalValue = currentValue + gainValue;
                
                $input.closest('.minor-attribute-controls').find('.total-value').text(totalValue);
                $input.closest('.minor-attribute-controls').find('.current-display').text(currentValue);
            });
            
            // Gérer les boutons d'augmentation
            html.find('.minor-attr-increase').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentGain = parseInt($input.val()) || 0;
                
                // **SUPPRESSION : Plus de limite maxGain, seulement 30 points max par attribut et points restants**
                $btn.prop('disabled', remainingPoints <= 0 || currentGain >= 30);
            });
            
            // Gérer les boutons de diminution
            html.find('.minor-attr-decrease').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentGain = parseInt($input.val()) || 0;
                
                $btn.prop('disabled', currentGain <= 0);
            });
            
            // Colorer le compteur selon les points restants
            if (remainingPoints === 0) {
                pointsCounter.css('color', '#4CAF50');
            } else if (remainingPoints < 0) {
                pointsCounter.css('color', '#f44336');
            } else {
                pointsCounter.css('color', '#FF9800');
            }
        }

        // **VALIDATION stricte des inputs manuels**
        html.find('input[data-attr]').on('input', function() {
            const $input = $(this);
            const newValue = parseInt($input.val()) || 0;
            
            // **CORRECTION : Limite individuelle à 30 points par attribut maximum**
            if (newValue > 30) {
                $input.val(30);
            }
            if (newValue < 0) {
                $input.val(0);
            }
            
            // Recalculer les points restants en fonction du total utilisé
            let totalUsed = 0;
            html.find('input[data-attr]').each(function() {
                totalUsed += parseInt($(this).val()) || 0;
            });
            
            // **VALIDATION GLOBALE : Ne pas dépasser 30 points au total à répartir**
            if (totalUsed > 30) {
                const excess = totalUsed - 30;
                const currentVal = parseInt($input.val()) || 0;
                $input.val(Math.max(0, currentVal - excess));
                
                // Recalculer après ajustement
                totalUsed = 0;
                html.find('input[data-attr]').each(function() {
                    totalUsed += parseInt($(this).val()) || 0;
                });
            }
            
            remainingPoints = Math.max(0, 30 - totalUsed);
            updateUI();
        });

        // Boutons d'augmentation
        html.find('.minor-attr-increase').click(function() {
            const attr = $(this).data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentGain = parseInt($input.val()) || 0;
            
            // **CORRECTION : Limite individuelle à 30 points max par gain**
            if (remainingPoints > 0 && currentGain < 30) {
                $input.val(currentGain + 1);
                remainingPoints--;
                updateUI();
            }
        });

        // Boutons de diminution
        html.find('.minor-attr-decrease').click(function() {
            const attr = $(this).data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentGain = parseInt($input.val()) || 0;
            
            if (currentGain > 0) {
                $input.val(currentGain - 1);
                remainingPoints++;
                updateUI();
            }
        });

        // **Initialiser l'affichage**
        updateUI();
    }

    static _getLevelUpMajorData(html) {
        const data = {};
        html.find('input[data-attr]').each(function() {
            const $input = $(this);
            const attr = $input.data('attr');
            // **CORRECTION : Ne sauvegarder QUE la valeur ajoutée (répartition), pas le total**
            const addedValue = parseInt($input.val()) || 0;
            data[attr] = addedValue; // Seulement les points ajoutés, pas base + ajouté
        });
        return data;
    }

    static _getLevelUpMinorData(html) {
        const data = {};
        html.find('input[data-attr]').each(function() {
            const attr = $(this).data('attr');
            const value = parseInt($(this).val()) || 0;
            data[attr] = value;
        });
        return data;
    }

    static _getLevelUpMajorCSS() {
        return `
            <style>
                .levelup-major-form { 
                    padding: 15px; 
                    max-height: 600px; 
                    overflow-y: auto;
                    min-width: 600px; /* 25% wider than default ~600px */
                }
                .levelup-points-info { 
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 12px; 
                    border-radius: 5px; 
                    margin-bottom: 20px; 
                    text-align: center;
                }
                #levelup-major-remaining { 
                    font-weight: bold; 
                    color: #4CAF50; 
                    font-size: 18px;
                }
                .major-attributes-list { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 12px; 
                }
                .major-attribute-item { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 12px; 
                    border: 1px solid #ddd; 
                    border-radius: 5px; 
                    background: rgba(255,255,255,0.5);
                }
                .major-attribute-info { 
                    flex: 1; 
                    margin-right: 15px; 
                }
                .major-attribute-info label { 
                    font-weight: bold; 
                    color: #333; 
                }
                .major-attribute-description { 
                    font-size: 12px; 
                    color: #666; 
                    font-style: italic; 
                }
                .current-value { 
                    font-size: 11px; 
                    color: #2196F3; 
                    font-weight: bold; 
                }
                .major-attribute-controls { 
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    min-width: 320px;
                }
                .current-display {
                    min-width: 35px; 
                    text-align: center;
                    background: rgba(33, 150, 243, 0.1); 
                    padding: 6px 8px; 
                    border-radius: 4px;
                    border: 1px solid rgba(33, 150, 243, 0.3);
                }
                .levelup-points {
                    width: 50px !important; 
                    text-align: center !important; 
                    border: 1px solid #ccc !important; 
                    border-radius: 3px !important; 
                    padding: 6px !important; 
                    font-weight: bold !important;
                    background: rgba(255, 193, 7, 0.1) !important; 
                    color: #FF8C00 !important;
                    font-size: 14px !important;
                }
                .total-value {
                    font-weight: bold; 
                    color: #4CAF50; 
                    min-width: 35px; 
                    text-align: center;
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 6px 8px; 
                    border-radius: 4px;
                    border: 1px solid rgba(76, 175, 80, 0.3);
                    font-size: 16px !important;
                }
                .plus-sign, .equals-sign { 
                    font-weight: bold; 
                    color: #666; 
                    font-size: 16px; 
                }
                .major-attr-decrease, .major-attr-increase { 
                    width: 34px; 
                    height: 34px; 
                    border: 1px solid #ccc; 
                    background: #f5f5f5; 
                    border-radius: 3px; 
                    cursor: pointer; 
                    font-weight: bold;
                    font-size: 16px;
                }
                .major-attr-decrease:hover, .major-attr-increase:hover { 
                    background: #e0e0e0; 
                }
                .major-attr-decrease:disabled, .major-attr-increase:disabled { 
                    opacity: 0.5; 
                    cursor: not-allowed; 
                }
            </style>
        `;
    }

    static _getLevelUpMinorCSS() {
        return `
            <style>
                .levelup-minor-form { 
                    padding: 15px; 
                    max-height: 600px; 
                    overflow-y: auto;
                    min-width: 600px;
                }
                .levelup-points-info { 
                    background: rgba(156, 39, 176, 0.1); 
                    padding: 12px; 
                    border-radius: 5px; 
                    margin-bottom: 20px; 
                    text-align: center;
                }
                #levelup-minor-remaining { 
                    font-weight: bold; 
                    color: #9C27B0; 
                    font-size: 18px;
                }
                .minor-attributes-list { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 12px; 
                }
                .minor-attribute-item { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 12px; 
                    border: 1px solid #ddd; 
                    border-radius: 5px; 
                    background: rgba(255,255,255,0.5);
                }
                .minor-attribute-info { 
                    flex: 1; 
                    margin-right: 15px; 
                }
                .minor-attribute-info label { 
                    font-weight: bold; 
                    color: #333; 
                }
                .minor-attribute-description { 
                    font-size: 12px; 
                    color: #666; 
                    font-style: italic; 
                }
                .current-value { 
                    font-size: 11px; 
                    color: #2196F3; 
                    font-weight: bold; 
                }
                .minor-attribute-controls { 
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    min-width: 320px;
                }
                .current-display {
                    font-weight: bold; 
                    color: #2196F3; 
                    min-width: 35px; 
                    text-align: center;
                    background: rgba(33, 150, 243, 0.1); 
                    padding: 6px 8px; 
                    border-radius: 4px;
                    border: 1px solid rgba(33, 150, 243, 0.3);
                }
                .levelup-points {
                    width: 50px !important; 
                    text-align: center !important; 
                    border: 1px solid #ccc !important; 
                    border-radius: 3px !important; 
                    padding: 6px !important; 
                    font-weight: bold !important;
                    background: rgba(255, 193, 7, 0.1) !important; 
                    color: #FF8C00 !important;
                    font-size: 14px !important;
                }
                .total-value {
                    font-weight: bold; 
                    color: #4CAF50; 
                    min-width: 35px; 
                    text-align: center;
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 6px 8px; 
                    border-radius: 4px;
                    border: 1px solid rgba(76, 175, 80, 0.3);
                    font-size: 16px !important;
                }
                /* SUPPRESSION de .max-indicator car plus de limite */
                .plus-sign, .equals-sign { 
                    font-weight: bold; 
                    color: #666; 
                    font-size: 16px; 
                }
                .minor-attr-decrease, .minor-attr-increase { 
                    width: 34px; 
                    height: 34px; 
                    border: 1px solid #ccc; 
                    background: #f5f5f5; 
                    border-radius: 3px; 
                    cursor: pointer; 
                    font-weight: bold;
                    font-size: 16px;
                }
                .minor-attr-decrease:hover, .minor-attr-increase:hover { 
                    background: #e0e0e0; 
                }
                .minor-attr-decrease:disabled, .minor-attr-increase:disabled { 
                    opacity: 0.5; 
                    cursor: not-allowed; 
                }
            </style>
        `;
    }

    static _getAvailableTalents(creationData, level) {
        const availableTalents = [];
    
    // Talents de race
    const race = AlyriaRaces[creationData.race];
    if (race?.talentRace) {
        // **CORRECTION : Gestion correcte du format talentRace**
        let raceTalentName = "";
        let raceTalentDescription = "";
        
        if (typeof race.talentRace === "string") {
            raceTalentName = race.talentRace;
        } else if (typeof race.talentRace === "object" && race.talentRace.nom) {
            raceTalentName = race.talentRace.nom;
        } else {
            console.warn("⚠️ Format talentRace non reconnu:", race.talentRace);
            raceTalentName = "Talent de Race";
        }
        
        raceTalentDescription = race.competenceRaciale || race.description?.[0] || "Talent racial";
        
        availableTalents.push({
            id: `race:${creationData.race}:${raceTalentName}`, 
            name: raceTalentName, 
            description: raceTalentDescription,
            type: "race",
            source: race.nom,
            level: 1
        });
    }
    
    // Talents de voie/arcane principale
    if (creationData.type1 === "voie") {
        const voie1 = AlyriaVoies[creationData.key1];
        
        if (voie1?.talentVoie?.talents) {
            voie1.talentVoie.talents
                .filter(talent => talent.niveauJoueur <= level)
                .forEach(talent => {
                    availableTalents.push({
                        id: `voie:${creationData.key1}:${talent.nom}`,
                        name: talent.nom,
                        description: talent.description,
                        effet: talent.description,
                        type: "voie",
                        source: voie1.nom,
                        level: talent.niveauJoueur
                    });
                });
        }
    } else if (creationData.type1 === "arcane") {
        const arcane1 = AlyriaArcane[creationData.key1];
        
        if (arcane1?.talentArcane?.talents) {
            arcane1.talentArcane.talents
                .filter(talent => talent.niveauJoueur <= level)
                .forEach(talent => {
                    availableTalents.push({
                        id: `arcane:${creationData.key1}:${talent.nom}`,
                        name: talent.nom,
                        description: talent.description,
                        effet: talent.description,
                        type: "arcane",
                        source: arcane1.nom,
                        level: talent.niveauJoueur
                    });
                });
        }
    }
    
    // **CORRECTION : Talents de voie/arcane secondaire**
    if (creationData.key2) {
        if (creationData.type2 === "voie") {
            const voie2 = AlyriaVoies[creationData.key2];
            if (voie2?.talentVoie?.talents) {
                voie2.talentVoie.talents
                    .filter(talent => talent.niveauJoueur <= level)
                    .forEach(talent => {
                        availableTalents.push({
                            id: `voie:${creationData.key2}:${talent.nom}`,
                            name: talent.nom,
                            description: talent.description,
                            effet: talent.description,
                            type: "voie",
                            source: voie2.nom,
                            level: talent.niveauJoueur
                        });
                    });
            }
        } else if (creationData.type2 === "arcane") {
            const arcane2 = AlyriaArcane[creationData.key2];
            if (arcane2?.talentArcane?.talents) {
                arcane2.talentArcane.talents
                    .filter(talent => talent.niveauJoueur <= level)
                    .forEach(talent => {
                        availableTalents.push({
                            id: `arcane:${creationData.key2}:${talent.nom}`,
                            name: talent.nom,
                            description: talent.description,
                            effet: talent.description, // <-- AJOUTE CETTE LIGNE
                            type: "arcane",
                            source: arcane2.nom,
                            level: talent.niveauJoueur
                        });
                    });
            }
        }
    }
    
    return availableTalents;
}
    
static _getSpellsForRank(sortData, rang) {
    if (!sortData || !rang) {
        console.log("❌ Pas de sortData ou rang:", sortData, rang);
        return [];
    }
    
    console.log("🔍 Structure sortData complète:", JSON.stringify(sortData, null, 2));
    console.log("🎯 Rang demandé:", rang);
    
    // **CORRECTION : Gestion des variations d'orthographe/accents**
    const spellsByRank = {
        "Novice": sortData.sortNovice || sortData.Novice || [],
        "Confirmé": sortData.sortConfirme || sortData.sortConfirme || sortData.Confirme || sortData["Confirmé"] || [],
        "Expert": sortData.sortExpert || sortData.Expert || [],
        "Maître": sortData.sortMaitre || sortData.sortMaitre || sortData.Maitre || sortData["Maître"] || []
    };
    
    console.log("🔍 Mapping des rangs:", spellsByRank);
    
    const spells = spellsByRank[rang] || [];
    console.log(`📚 Sorts trouvés pour ${rang}:`, spells.length, "sorts");
    
    // **DEBUG : Afficher quelques sorts pour vérification**
    if (spells.length > 0) {
        console.log("🎯 Premiers sorts:", spells.slice(0, 3).map(s => s.nom));
    }
    
    return spells;
}

    static _getLevelRank(level) {
        if (level <= 3) return "Novice";
        if (level <= 6) return "Confirmé";
        if (level <= 9) return "Expert";
        return "Maître";
    }

    static _getPathName(type, key) {
        if (type === "voie") {
            return AlyriaVoies[key]?.nom || key;
        } else if (type === "arcane") {
            return AlyriaArcane[key]?.nom || key;
        }
        return key;
    }

    static _getRaceTalentbenediction(raceKey, talentName) {
        const race = AlyriaRaces[raceKey];
        return race?.competenceRaciale || "Talent racial";
    }

    static _getPathTalentbenediction(creationData, talentName) {
        if (creationData.type1 === "voie") {
            const voie = AlyriaVoies[creationData.key1];
            const talent = voie?.talentVoie?.talents?.find(t => t.nom === talentName);
            return talent?.description || "Talent de voie";
        } else if (creationData.type1 === "arcane") {
            const arcane = AlyriaArcane[creationData.key1];
            const talent = arcane?.talentArcane?.talents?.find(t => t.nom === talentName);
            return talent?.description || "Talent d'arcane";
        }
        return "Talent de voie/arcane";
    }

    static _getHistoricalTalentbenediction(talentName) {
        const talent = talentCreation.talentHistorique.talents.find(t => t.nom === talentName);
        return talent?.benediction || "Talent historique";
    }

static _getMaxSpellsForLevel(level, creationData) {
    // Mono-voie/arcane : 4 jusqu'au 9, puis 1 au 10
    // Double voie/arcane : 4 à la création, puis 3 jusqu'au 9, puis 1 au 10
    const isDouble = !!creationData.type2;
    if (level === 1) return 4;
    if (level >= 10) return 1;
    return isDouble ? 3 : 4;
}

    static _generateSpellOptions(spells) {
        return spells.map(spell => `
            <div class="spell-option">
                <input type="checkbox" name="selectedSpells" value="${spell.id}" id="${spell.id.replace(/[^a-zA-Z0-9]/g, '_')}">
                <label for="${spell.id.replace(/[^a-zA-Z0-9]/g, '_')}">
                    <div class="spell-header">
                        <strong>${spell.nom}</strong>
                        <span class="spell-cost">${spell.Psy} PSY</span>
                    </div>
                    <div class="spell-details">
                        <span>${spell.niveau} Niveau</span>
                        <span>${spell.rang} Rang</span>
                    </div>
                    <p class="spell-description">${spell.description}</p>
                    ${spell.benediction ? `<p class="spell-benediction"><strong>Effet:</strong> ${spell.benediction}</p>` : ''}
                </label>
            </div>`
        ).join("");
    }

static _getAvailableSpells(creationData, level, actor = null) {
    const availableSpells = [];
    const rang = CharacterProgression._getLevelRank(level);
    const seenSpells = new Set(); // Pour éviter les doublons
    
    console.log("🔮 === DEBUT RECHERCHE SORTS ===");
    console.log("🔮 Niveau:", level, "rang:", rang);
    console.log("📋 CreationData complète:", JSON.stringify(creationData, null, 2));
    
    // **NOUVEAU : Récupérer les sorts déjà choisis par l'acteur**
    const alreadyChosenSpells = new Set();
    if (actor && actor.system.sortsChoisis) {
        actor.system.sortsChoisis.forEach(sort => {
            if (sort.id) {
                alreadyChosenSpells.add(sort.id);
                console.log("🚫 Sort déjà choisi:", sort.id);
            }
        });
    }
    console.log(`📊 Sorts déjà choisis: ${alreadyChosenSpells.size} sorts`);
    
    // **VOIE/ARCANE PRINCIPALE (type1/key1)**
    console.log("🎯 === TRAITEMENT VOIE/ARCANE PRINCIPALE ===");
    console.log("Type1:", creationData.type1, "Key1:", creationData.key1);
    
    if (creationData.type1 === "voie") {
        const voie1 = AlyriaVoies[creationData.key1];
        console.log("🏛️ Voie 1 trouvée:", voie1?.nom);
        
        if (voie1?.sortVoie) {
            const spells = CharacterProgression._getSpellsForRank(voie1.sortVoie, rang);
            console.log("✨ Sorts voie 1 récupérés:", spells.length, "sorts");
            
            spells.forEach(spell => {
                const spellKey = `${spell.nom}-${voie1.nom}`;
                const spellId = `voie:${creationData.key1}:${spell.nom}`;
                
                // **NOUVEAU : Vérifier si le sort n'est pas déjà choisi**
                if (!seenSpells.has(spellKey) && !alreadyChosenSpells.has(spellId)) {
                    const spellWithId = {
                        ...spell,
                        id: spellId,
                        source: `${voie1.nom} (Voie)`,
                        type: "voie"
                    };
                    availableSpells.push(spellWithId);
                    seenSpells.add(spellKey);
                    console.log("➕ Sort ajouté:", spell.nom, "de", voie1.nom);
                } else if (alreadyChosenSpells.has(spellId)) {
                    console.log("🚫 Sort filtré (déjà choisi):", spell.nom, "de", voie1.nom);
                }
            });
        }
    } else if (creationData.type1 === "arcane") {
        const arcane1 = AlyriaArcane[creationData.key1];
        console.log("🔮 Arcane 1 trouvée:", arcane1?.nom);
        
        if (arcane1?.sortArcane) {
            const spells = CharacterProgression._getSpellsForRank(arcane1.sortArcane, rang);
            console.log("✨ Sorts arcane 1 récupérés:", spells.length, "sorts");
            
            spells.forEach(spell => {
                const spellKey = `${spell.nom}-${arcane1.nom}`;
                const spellId = `arcane:${creationData.key1}:${spell.nom}`;
                
                // **NOUVEAU : Vérifier si le sort n'est pas déjà choisi**
                if (!seenSpells.has(spellKey) && !alreadyChosenSpells.has(spellId)) {
                    const spellWithId = {
                        ...spell,
                        id: spellId,
                        source: `${arcane1.nom} (Arcane)`,
                        type: "arcane"
                    };
                    availableSpells.push(spellWithId);
                    seenSpells.add(spellKey);
                    console.log("➕ Sort ajouté:", spell.nom, "de", arcane1.nom);
                } else if (alreadyChosenSpells.has(spellId)) {
                    console.log("🚫 Sort filtré (déjà choisi):", spell.nom, "de", arcane1.nom);
                }
            });
        }
    }
    
    // **VOIE/ARCANE SECONDAIRE (même logique avec déduplication)**
    console.log("🎯 === TRAITEMENT VOIE/ARCANE SECONDAIRE ===");
    
    if (creationData.key2 && creationData.type2) {
        if (creationData.type2 === "voie") {
            const voie2 = AlyriaVoies[creationData.key2];
            console.log("🏛️ Voie 2 trouvée:", voie2?.nom);
            
            if (voie2?.sortVoie) {
                const spells = CharacterProgression._getSpellsForRank(voie2.sortVoie, rang);
                console.log("✨ Sorts voie 2 récupérés:", spells.length, "sorts");
                
                spells.forEach(spell => {
                    const spellKey = `${spell.nom}-${voie2.nom}`;
                    const spellId = `voie:${creationData.key2}:${spell.nom}`;
                    
                    // **NOUVEAU : Vérifier si le sort n'est pas déjà choisi**
                    if (!seenSpells.has(spellKey) && !alreadyChosenSpells.has(spellId)) {
                        const spellWithId = {
                            ...spell,
                            id: spellId,
                            source: `${voie2.nom} (Voie)`,
                            type: "voie"
                        };
                        availableSpells.push(spellWithId);
                        seenSpells.add(spellKey);
                        console.log("➕ Sort ajouté (voie 2):", spell.nom, "de", voie2.nom);
                    } else if (alreadyChosenSpells.has(spellId)) {
                        console.log("🚫 Sort filtré (déjà choisi, voie 2):", spell.nom, "de", voie2.nom);
                    }
                });
            }
        } else if (creationData.type2 === "arcane") {
            const arcane2 = AlyriaArcane[creationData.key2];
            console.log("🔮 Arcane 2 trouvée:", arcane2?.nom);
            
            if (arcane2?.sortArcane) {
                const spells = CharacterProgression._getSpellsForRank(arcane2.sortArcane, rang);
                console.log("✨ Sorts arcane 2 récupérés:", spells.length, "sorts");
                
                spells.forEach(spell => {
                    const spellKey = `${spell.nom}-${arcane2.nom}`;
                    const spellId = `arcane:${creationData.key2}:${spell.nom}`;
                    
                    // **NOUVEAU : Vérifier si le sort n'est pas déjà choisi**
                    if (!seenSpells.has(spellKey) && !alreadyChosenSpells.has(spellId)) {
                        const spellWithId = {
                            ...spell,
                            id: spellId,
                            source: `${arcane2.nom} (Arcane)`,
                            type: "arcane"
                        };
                        availableSpells.push(spellWithId);
                        seenSpells.add(spellKey);
                        console.log("➕ Sort ajouté (arcane 2):", spell.nom, "de", arcane2.nom);
                    } else if (alreadyChosenSpells.has(spellId)) {
                        console.log("🚫 Sort filtré (déjà choisi, arcane 2):", spell.nom, "de", arcane2.nom);
                    }
                });
            }
        }
    }
    
    console.log("📊 === RÉSUMÉ FINAL ===");
    console.log("📊 Total sorts disponibles (après filtrage):", availableSpells.length);
    console.log("📊 Sorts filtrés:", alreadyChosenSpells.size);
    console.log("📊 Sources des sorts:", [...new Set(availableSpells.map(s => s.source))]);
    
    return availableSpells;
}
    
    static _setupSpellCounterListeners(html, maxSpells) {
        const spellCheckboxes = html.find('[name="selectedSpells"]');
        const spellCounter = html.find('#spell-counter');
        
        spellCheckboxes.on('change', function() {
            const selectedCount = html.find('[name="selectedSpells"]:checked').length;
            spellCounter.text(selectedCount);
            
            // Désactiver les autres checkboxes si on atteint le maximum
            if (selectedCount >= maxSpells) {
                spellCheckboxes.not(':checked').prop('disabled', true);
                spellCounter.css('color', '#4CAF50');
            } else {
                spellCheckboxes.prop('disabled', false);
                spellCounter.css('color', '#d9534f');
            }
        });
    }

    // **CORRIGER la méthode _applyCharacterCreation (vers la fin du fichier) :**

    static async _applyCharacterCreation(actor, creationData) {
        const updateData = {};
        
        // **1. APPLIQUER LA RACE ET VOIES/ARCANE**
        updateData["system.race"] = creationData.race;
        updateData["system.voiesArcane"] = {
            type1: creationData.type1,
            key1: creationData.key1,
            type2: creationData.type2,
            key2: creationData.key2
        };
        
        // **2. CARACTÉRISTIQUES MAJEURES : Répartition automatique**
        const majorAttributes = ["force", "dexterite", "constitution", "intelligence", "sagesse", "charisme"];
        const defaultMajorValue = 8;
        
        majorAttributes.forEach(attr => {
            updateData[`system.majeures.${attr}.repartition`] = defaultMajorValue;
        });
        
        // **3. CARACTÉRISTIQUES MINEURES : Répartition automatique**
        const minorAttributes = [
            "monde", "mystique", "nature", "sacré", "robustesse", "calme", 
            "marchandage", "persuasion", "artmusique", "commandement", 
            "acrobatie", "discretion", "adresse", "artisanat", "hasard", 
            "athlétisme", "puissance", "intimidation", "perception", 
            "perceptionmagique", "medecine", "intuition"
        ];
        
        minorAttributes.forEach(attr => {
            updateData[`system.mineures.${attr}.repartition`] = 0;
        });
        
        // **CORRECTION : Améliorer la sauvegarde des talents**
        const talents = [];
        
        // **TALENT DE RACE - CORRECTION COMPLÈTE**
        const race = AlyriaRaces[creationData.race];
        if (race?.talentRace) {
            // **VÉRIFIER le type de talentRace**
            let nomTalent = "";
            let effetTalent = "";
            
            if (typeof race.talentRace === "string") {
                nomTalent = race.talentRace;
                effetTalent = race.competenceRaciale || race.description?.[0] || "Talent racial";
            } else if (typeof race.talentRace === "object" && race.talentRace.nom) {
                nomTalent = race.talentRace.nom;
                effetTalent = race.talentRace.description || race.competenceRaciale || "Talent racial";
            } else {
                console.warn("⚠️ Format de talentRace non reconnu:", race.talentRace);
                nomTalent = "Talent de race";
                effetTalent = race.competenceRaciale || "Talent racial";
            }
            
            talents.push({
                nom: nomTalent,
                source: "race",
                niveau: 1,
                effet: effetTalent
            });
        }
        
        // **TALENT HISTORIQUE - CORRECTION**
        if (creationData.selectedTalents?.historical && creationData.selectedTalents.historical.length > 0) {
            creationData.selectedTalents.historical.forEach(historicalTalentId => {
                const cleanTalentId = historicalTalentId.replace(/^historique:/, '');
                const talent = talentCreation.talentHistorique.talents.find(t => t.nom === cleanTalentId);
                
                talents.push({
                    nom: cleanTalentId,
                    source: "historique",
                    niveau: 1,
                    effet: talent?.benediction || "Talent historique"
                });
            });
        }
        
        // **TALENT DE VOIE/ARCANE NIVEAU 1 - CORRECTION**
        if (creationData.selectedTalents?.path) {
            const pathTalentId = creationData.selectedTalents.path;
            const [talentSource, talentPath, ...talentNameParts] = pathTalentId.split(':');
            const talentName = talentNameParts.join(':'); // Au cas où le nom contient des ":"
            
            let talentDescription = "Talent de voie/arcane";
            
            if (talentSource === "voie") {
                const voie = AlyriaVoies[talentPath];
                const talent = voie?.talentVoie?.talents?.find(t => t.nom === talentName);
                talentDescription = talent?.description || "Talent de voie";
            } else if (talentSource === "arcane") {
                const arcane = AlyriaArcane[talentPath];
                const talent = arcane?.talentArcane?.talents?.find(t => t.nom === talentName);
                talentDescription = talent?.description || "Talent d'arcane";
            }
            
            talents.push({
                nom: talentName,
                source: talentSource,
                niveau: 1,
                effet: talentDescription
            });
        }
        
        updateData["system.talents"] = talents;
        
        // **4. SORTS : Initialiser les sorts connus à vide**
        updateData["system.sortsChoisis"] = [];
        updateData["system.nbSortsAChoisir"] = 4; // 4 sorts à choisir au niveau 1
        
        // **5. APPLIQUER LES CHANGEMENTS**
        await actor.update(updateData);
        
        // **6. NOTIFICATION**
        ui.notifications.info(`🎉 Personnage ${actor.name} créé avec succès !`);
    }

    // **MÉTHODE MANQUANTE : Caractéristiques majeures de création**
    static async showMajorAttributesDialog(actor, creationData) {
        // Rediriger directement vers les mineures puis les talents
        return CharacterProgression.showMinorAttributesDialog(actor, creationData);
    }

    // **MÉTHODE MANQUANTE : Caractéristiques mineures de création**
    static async showMinorAttributesDialog(actor, creationData) {
        // Rediriger directement vers les talents
        return CharacterProgression.showTalentSelectionDialog(actor, creationData);
    }



        // **MÉTHODE RESTAURÉE : Caractéristiques majeures de création**
    static async showMajorAttributesDialog(actor, creationData) {
        // Calculer les valeurs de base (race + voie1)
        const race = AlyriaRaces[creationData.race];
        const voie1 = creationData.type1 === "voie" ? AlyriaVoies[creationData.key1] : AlyriaArcane[creationData.key1];
        
        const majeurAttributes = [
            { id: "force", label: "Force", description: "Puissance physique et capacité de porter" },
            { id: "dexterite", label: "Dextérité", description: "Agilité et précision des mouvements" },
            { id: "constitution", label: "Constitution", description: "Résistance et endurance physique" },
            { id: "intelligence", label: "Intelligence", description: "Capacité d'apprentissage et de raisonnement" },
            { id: "sagesse", label: "Sagesse", description: "Perception et intuition" },
            { id: "charisme", label: "Charisme", description: "Force de personnalité et leadership" },
            { id: "defense", label: "Défense", description: "Capacité à bloquer et esquiver" },
            { id: "chance", label: "Chance", description: "Fortune et coups critiques" }
        ];
    
        // Calculer les bonus de base
        const baseValues = {};
        majeurAttributes.forEach(attr => {
            const raceBonus = race?.majeures?.[attr.id] || 0;
            const voieBonus = voie1?.majeures?.[attr.id] || 0;
            baseValues[attr.id] = raceBonus + voieBonus;
        });
    
        // Points à répartir : 13 si mono ou bi voie/arcane
        const pointsToDistribute = 3;
    
        const attributeRows = majeurAttributes.map(attr => {
            const baseValue = baseValues[attr.id];
            
            return `<div class="major-attribute-item">
                <div class="major-attribute-info">
                    <label for="${attr.id}">${attr.label}</label>
                    <p class="major-attribute-description">${attr.description}</p>
                    <div class="base-value">Base: ${baseValue} (race + voie)</div>
                </div>
                <div class="major-attribute-controls">
                    <span class="base-display">${baseValue}</span>
                    <span class="plus-sign">+</span>
                    <button type="button" class="major-attr-decrease" data-attr="${attr.id}">-</button>
                    <input type="number" 
                           class="creation-points"
                           id="${attr.id}" 
                           data-attr="${attr.id}" 
                           data-base="${baseValue}"
                           value="0" 
                           min="0" 
                           max="13">
                    <button type="button" class="major-attr-increase" data-attr="${attr.id}">+</button>
                    <span class="equals-sign">=</span>
                    <span class="total-value">${baseValue}</span>
                </div>
            </div>`
        }).join("");
    
        const content = `
            <form class="creation-major-form">
                <h2>🎭 Création de Personnage</h2>
                <h3>💪 Répartition des Caractéristiques Majeures</h3>
                
                <div class="creation-points-info">
                    <p><strong>Points à répartir :</strong> <span id="creation-major-remaining">${pointsToDistribute}</span> / ${pointsToDistribute}</p>
                    <p><em>Voudisposez de 3 points a répartir ou vous le souhaitez</em></p>
                </div>
                
                <div class="major-attributes-list">
                    ${attributeRows}
                </div>
            </form>
            
            <style>
                .creation-major-form { 
                    padding: 15px; 
                    max-height: 600px; 
                    overflow-y: auto;
                    min-width: 650px;
                }
                .creation-points-info { 
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 12px; 
                    border-radius: 5px; 
                    margin-bottom: 20px; 
                    text-align: center;
                }
                #creation-major-remaining { 
                    font-weight: bold; 
                    color: #4CAF50; 
                    font-size: 18px;
                }
                .major-attributes-list { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 12px; 
                }
                .major-attribute-item { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 12px; 
                    border: 1px solid #ddd; 
                    border-radius: 5px; 
                    background: rgba(255,255,255,0.5);
                }
                .major-attribute-info { 
                    flex: 1; 
                    margin-right: 15px; 
                }
                .major-attribute-info label { 
                    font-weight: bold; 
                    color: #333; 
                }
                .major-attribute-description { 
                    font-size: 12px; 
                    color: #666; 
                    font-style: italic; 
                }
                .base-value { 
                    font-size: 11px; 
                    color: #2196F3; 
                    font-weight: bold; 
                }
                .major-attribute-controls { 
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    min-width: 320px;
                }
                .base-display {
                    min-width: 35px; 
                    text-align: center;
                    background: rgba(33, 150, 243, 0.1); 
                    padding: 6px 8px; 
                    border-radius: 4px;
                    border: 1px solid rgba(33, 150, 243, 0.3);
                }
                .creation-points {
                    width: 50px !important; 
                    text-align: center !important; 
                    border: 1px solid #ccc !important; 
                    border-radius: 3px !important; 
                    padding: 6px !important; 
                    font-weight: bold !important;
                    background: rgba(255, 193, 7, 0.1) !important; 
                    color: #FF8C00 !important;
                    font-size: 14px !important;
                }
                .total-value {
                    font-weight: bold; 
                    color: #4CAF50; 
                    min-width: 35px; 
                    text-align: center;
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 6px 8px; 
                    border-radius: 4px;
                    border: 1px solid rgba(76, 175, 80, 0.3);
                    font-size: 16px !important;
                }
                .plus-sign, .equals-sign { 
                    font-weight: bold; 
                    color: #666; 
                    font-size: 16px; 
                }
                .major-attr-decrease, .major-attr-increase { 
                    width: 34px; 
                    height: 34px; 
                    border: 1px solid #ccc; 
                    background: #f5f5f5; 
                    border-radius: 3px; 
                    cursor: pointer; 
                    font-weight: bold;
                    font-size: 16px;
                }
                .major-attr-decrease:hover, .major-attr-increase:hover { 
                    background: #e0e0e0; 
                }
                .major-attr-decrease:disabled, .major-attr-increase:disabled { 
                    opacity: 0.5; 
                    cursor: not-allowed; 
                }
            </style>
        `;
    
        return new Promise(resolve => {
            new Dialog({
                title: "Création - Caractéristiques Majeures",
                content,
                render: html => {
                    CharacterProgression._setupCreationMajorListeners(html, pointsToDistribute);
                },
                buttons: {
                    back: {
                        icon: '<i class="fas fa-arrow-left"></i>',
                        label: "Retour",
                        callback: () => {
                            CharacterProgression.showCreationDialog(actor, creationData).then(resolve);
                        }
                    },
                    next: {
                        icon: '<i class="fas fa-arrow-right"></i>',
                        label: "Suivant : Mineures",
                        callback: html => {
                            const remainingPoints = parseInt(html.find('#creation-major-remaining').text());
                            if (remainingPoints !== 0) {
                                ui.notifications.warn("Vous devez utiliser tous vos points !");
                                return;
                            }
                            
                            const majorData = CharacterProgression._getCreationMajorData(html);
                            creationData.majorAttributes = majorData;
                            
                            CharacterProgression._saveTempData(creationData);
                            CharacterProgression.showMinorAttributesDialog(actor, creationData).then(resolve);
                        }
                    }
                },
                default: "next"
            }).render(true);
        });
    }
    
    // **MÉTHODE RESTAURÉE : Caractéristiques mineures de création**
    static async showMinorAttributesDialog(actor, creationData) {
        const minorAttributes = [
            { id: "monde", label: "Monde", description: "Connaissance du monde et de ses cultures" },
            { id: "mystique", label: "Mystique", description: "Compréhension des forces occultes" },
            { id: "nature", label: "Nature", description: "Connaissance de la faune et flore" },
            { id: "sacré", label: "Sacré", description: "Connaissance des divinités et rituels" },
            { id: "robustesse", label: "Robustesse", description: "Résistance aux maladies et poisons" },
            { id: "calme", label: "Calme", description: "Maîtrise de soi et résistance mentale" },
            { id: "marchandage", label: "Marchandage", description: "Art de négocier et commercer" },
            { id: "persuasion", label: "Persuasion", description: "Capacité à convaincre autrui" },
            { id: "artmusique", label: "Art & Musique", description: "Talents artistiques et musicaux" },
            { id: "commandement", label: "Commandement", description: "Capacité à diriger et motiver" },
            { id: "acrobatie", label: "Acrobatie", description: "Agilité et mouvements complexes" },
            { id: "discretion", label: "Discrétion", description: "Art de se cacher et se mouvoir silencieusement" },
            { id: "adresse", label: "Adresse", description: "Dextérité manuelle et précision" },
            { id: "artisanat", label: "Artisanat", description: "Création et réparation d'objets" },
            { id: "hasard", label: "Hasard", description: "Chance aux jeux et coïncidences" },
            { id: "athlétisme", label: "Athlétisme", description: "Prouesses physiques et sportives" },
            { id: "puissance", label: "Puissance", description: "Force brute et capacité de destruction" },
            { id: "intimidation", label: "Intimidation", description: "Capacité à inspirer la peur" },
            { id: "perception", label: "Perception", description: "Acuité des sens et observation" },
            { id: "perceptionmagique", label: "Perception Magique", description: "Détection des énergies magiques" },
            { id: "medecine", label: "Médecine", description: "Soins et connaissance anatomique" },
            { id: "intuition", label: "Intuition", description: "Instinct et pressentiments" }
        ];
    
        const pointsToDistribute = 220;
    
        const attributeRows = minorAttributes.map(attr => {
            return `<div class="minor-attribute-item">
                        <div class="minor-attribute-info">
                            <label for="${attr.id}">${attr.label}</label>
                            <p class="minor-attribute-description">${attr.description}</p>
                            <div class="base-value">Base: 0</div>
                        </div>
                        <div class="minor-attribute-controls">
                            <span class="base-display">0</span>
                            <span class="plus-sign">+</span>
                            <button type="button" class="minor-attr-decrease" data-attr="${attr.id}">-</button>
                            <input type="number" 
                                class="creation-points"
                                id="${attr.id}" 
                                data-attr="${attr.id}" 
                                data-base="0"
                                value="5" 
                                min="0" 
                                max="30">
                            <button type="button" class="minor-attr-increase" data-attr="${attr.id}">+</button>
                            <span class="equals-sign">=</span>
                            <span class="total-value">5</span>
                        </div>
                    </div>`
                }).join("");
    
       const content = `
    <form class="creation-minor-form">
        <h2>🎭 Création de Personnage</h2>
        <h3>🎯 Répartition des Caractéristiques Mineures</h3>
        
        <div class="creation-points-info">
                    <p><strong>Points à répartir :</strong> <span id="creation-minor-remaining">${pointsToDistribute - (minorAttributes.length * 5)}</span> / ${pointsToDistribute}</p>
                    <p><em>Minimum 5 partout, Maximum 30 à la création</em></p>
                    <p><em>Les stats à 0 utiliseront des points du total</em></p>
                </div>
        
        <div class="minor-attributes-list">
            ${attributeRows}
        </div>
    </form>
    
    <style>
        .creation-minor-form { 
            padding: 15px; 
            max-height: 600px; 
            overflow-y: auto;
            min-width: 650px;
        }
        .creation-points-info { 
            background: rgba(156, 39, 176, 0.1); 
            padding: 12px; 
            border-radius: 5px; 
            margin-bottom: 20px; 
            text-align: center;
        }
        #creation-minor-remaining { 
            font-weight: bold; 
            color: #9C27B0; 
            font-size: 18px;
        }
        .minor-attributes-list { 
            display: flex; 
            flex-direction: column; 
            gap: 12px; 
        }
        .minor-attribute-item { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 12px; 
            border: 1px solid #ddd; 
            border-radius: 5px; 
            background: rgba(255,255,255,0.5);
        }
        .minor-attribute-info { 
            flex: 1; 
            margin-right: 15px; 
        }
        .minor-attribute-info label { 
            font-weight: bold; 
            color: #333; 
        }
        .minor-attribute-description { 
            font-size: 12px; 
            color: #666; 
            font-style: italic; 
        }
        .base-value { 
            font-size: 11px; 
            color: #2196F3; 
            font-weight: bold; 
        }
        
        .minor-attribute-controls { 
            display: flex; 
            align-items: center; 
            gap: 8px; 
            min-width: 320px; /* **MÊME LARGEUR que les majeures** */
        }
        .base-display { /* **AJOUT : Même style que les majeures** */
            min-width: 35px; 
            text-align: center;
            background: rgba(33, 150, 243, 0.1); 
            padding: 6px 8px; 
            border-radius: 4px;
            border: 1px solid rgba(33, 150, 243, 0.3);
        }
        
        .creation-points {
            width: 50px !important; 
            text-align: center !important; 
            border: 1px solid #ccc !important; 
            border-radius: 3px !important; 
            padding: 6px !important; 
            font-weight: bold !important;
            background: rgba(255, 193, 7, 0.1) !important; 
            color: #FF8C00 !important;
            font-size: 14px !important;
        }
        .total-value {
            font-weight: bold; 
            color: #4CAF50; 
            min-width: 35px; 
            text-align: center;
            background: rgba(76, 175, 80, 0.1); 
            padding: 6px 8px; 
            border-radius: 4px;
            border: 1px solid rgba(76, 175, 80, 0.3);
            font-size: 16px !important;
        }
        .plus-sign, .equals-sign { 
            font-weight: bold; 
            color: #666; 
            font-size: 16px; 
        }
        .minor-attr-decrease, .minor-attr-increase { 
            width: 34px; 
            height: 34px; 
            border: 1px solid #ccc; 
            background: #f5f5f5; 
            border-radius: 3px; 
            cursor: pointer; 
            font-weight: bold;
            font-size: 16px;
        }
        .minor-attr-decrease:hover, .minor-attr-increase:hover { 
            background: #e0e0e0; 
        }
        .minor-attr-decrease:disabled, .minor-attr-increase:disabled { 
            opacity: 0.5; 
            cursor: not-allowed; 
        }
    </style>
`;
    
        return new Promise(resolve => {
            new Dialog({
                title: "Création - Caractéristiques Mineures",
                content,
                render: html => {
                    CharacterProgression._setupCreationMinorListeners(html, pointsToDistribute, minorAttributes.length);
                },
                buttons: {
                    back: {
                        icon: '<i class="fas fa-arrow-left"></i>',
                        label: "Retour",
                        callback: () => {
                            const tempData = CharacterProgression._loadTempData();
                            CharacterProgression.showMajorAttributesDialog(actor, tempData).then(resolve);
                        }
                    },
                    next: {
                        icon: '<i class="fas fa-arrow-right"></i>',
                        label: "Suivant : Talents",
                        callback: html => {
                            const remainingPoints = parseInt(html.find('#creation-minor-remaining').text());
                            if (remainingPoints !== 0) {
                                ui.notifications.warn("Vous devez utiliser tous vos points !");
                                return;
                            }
                            
                            const minorData = CharacterProgression._getCreationMinorData(html);
                            creationData.minorAttributes = { repartition: minorData };
                            
                            CharacterProgression._saveTempData(creationData);
                            CharacterProgression.showTalentSelectionDialog(actor, creationData).then(resolve);
                        }
                    }
                },
                default: "next"
            }).render(true);
        });
    }
    
    // **MÉTHODES HELPER POUR LA CRÉATION**
    
    static _setupCreationMajorListeners(html, totalPoints) {
        const pointsCounter = html.find('#creation-major-remaining');
        let remainingPoints = totalPoints;
    
        function updateUI() {
            pointsCounter.text(remainingPoints);
            
            html.find('input[data-attr]').each(function() {
                const $input = $(this);
                const attr = $input.data('attr');
                const baseValue = parseInt($input.data('base')) || 0;
                const addedValue = parseInt($input.val()) || 0;
                const totalValue = baseValue + addedValue;
                
                $input.closest('.major-attribute-controls').find('.total-value').text(totalValue);
            });
            
            // Gérer les boutons
            html.find('.major-attr-increase').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentAdded = parseInt($input.val()) || 0;
                
                $btn.prop('disabled', remainingPoints <= 0 || currentAdded >= totalPoints);
            });
            
            html.find('.major-attr-decrease').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentAdded = parseInt($input.val()) || 0;
                
                $btn.prop('disabled', currentAdded <= 0);
            });
            
            if (remainingPoints === 0) {
                pointsCounter.css('color', '#4CAF50');
            } else {
                pointsCounter.css('color', '#FF9800');
            }
        }
    
        // Input validation
        html.find('input[data-attr]').on('input', function() {
            const $input = $(this);
            const newValue = parseInt($input.val()) || 0;
            
            if (newValue > totalPoints) $input.val(totalPoints);
            if (newValue < 0) $input.val(0);
            
            let totalUsed = 0;
            html.find('input[data-attr]').each(function() {
                totalUsed += parseInt($(this).val()) || 0;
            });
    
            if (totalUsed > totalPoints) {
                const excess = totalUsed - totalPoints;
                const currentVal = parseInt($input.val()) || 0;
                $input.val(Math.max(0, currentVal - excess));
                
                totalUsed = 0;
                html.find('input[data-attr]').each(function() {
                    totalUsed += parseInt($(this).val()) || 0;
                });
            }
            
            remainingPoints = Math.max(0, totalPoints - totalUsed);
            updateUI();
        });
    
        // Boutons
        html.find('.major-attr-increase').click(function() {
            const attr = $(this).data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentAdded = parseInt($input.val()) || 0;
            
            if (remainingPoints > 0 && currentAdded < totalPoints) {
                $input.val(currentAdded + 1);
                remainingPoints--;
                updateUI();
            }
        });
    
        html.find('.major-attr-decrease').click(function() {
            const attr = $(this).data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentAdded = parseInt($input.val()) || 0;
            
            if (currentAdded > 0) {
                $input.val(currentAdded - 1);
                remainingPoints++;
                updateUI();
            }
        });
    
        updateUI();
    }
    
// **MODIFICATION : _setupCreationMinorListeners pour ressembler aux majeures**

static _setupCreationMinorListeners(html, totalPoints, numAttributes) {
    const pointsCounter = html.find('#creation-minor-remaining');
    let remainingPoints = totalPoints - (numAttributes * 5); // 220 - (22 * 5) = 110 points restants

    function updateUI() {
        pointsCounter.text(remainingPoints);

        // **MISE À JOUR des totaux comme dans les majeures**
        html.find('input[data-attr]').each(function() {
            const $input = $(this);
            const attr = $input.data('attr');
            const baseValue = parseInt($input.data('base')) || 0; // **COMME LES MAJEURES**
            const addedValue = parseInt($input.val()) || 0;
            const totalValue = baseValue + addedValue;
            
            // **Mettre à jour l'affichage du total**
            $input.closest('.minor-attribute-controls').find('.total-value').text(totalValue);
            
            // **Mettre à jour aussi la valeur de base**
            $input.closest('.minor-attribute-controls').find('.base-display').text(baseValue);
        });
        
        // Gérer les boutons d'augmentation
        html.find('.minor-attr-increase').each(function() {
            const $btn = $(this);
            const attr = $btn.data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentAdded = parseInt($input.val()) || 0;
            
            $btn.prop('disabled', remainingPoints <= 0 || currentAdded >= 30);
        });
        
        // Gérer les boutons de diminution
        html.find('.minor-attr-decrease').each(function() {
            const $btn = $(this);
            const attr = $btn.data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentAdded = parseInt($input.val()) || 0;
            
            $btn.prop('disabled', currentAdded <= 0);
        });
        
        // Colorer le compteur selon les points restants
        if (remainingPoints === 0) {
            pointsCounter.css('color', '#4CAF50');
        } else if (remainingPoints < 0) {
            pointsCounter.css('color', '#f44336');
        } else {
            pointsCounter.css('color', '#FF9800');
        }
    }

    // **Input validation (identique aux majeures)**
    html.find('input[data-attr]').on('input', function() {
        const $input = $(this);
        const newValue = parseInt($input.val()) || 0;
        
        // **CORRECTION : Limite individuelle à 30 points par attribut maximum**
        if (newValue > 30) {
            $input.val(30);
        }
        if (newValue < 0) {
            $input.val(0);
        }
        
        let totalUsed = 0;
        html.find('input[data-attr]').each(function() {
            totalUsed += parseInt($(this).val()) || 0;
        });
        
        if (totalUsed > totalPoints) {
            const excess = totalUsed - totalPoints;
            const currentVal = parseInt($input.val()) || 0;
            $input.val(Math.max(0, currentVal - excess));
            
            // Recalculer après ajustement
            totalUsed = 0;
            html.find('input[data-attr]').each(function() {
                totalUsed += parseInt($(this).val()) || 0;
            });
        }
        
        remainingPoints = Math.max(0, totalPoints - totalUsed);
        updateUI();
    });

    // **Boutons (identiques aux majeures)**
    html.find('.minor-attr-increase').click(function() {
        const attr = $(this).data('attr');
        const $input = html.find(`input[data-attr="${attr}"]`);
        const currentAdded = parseInt($input.val()) || 0;
        
        if (remainingPoints > 0 && currentAdded < 30) {
            $input.val(currentAdded + 1);
            remainingPoints--;
            updateUI();
        }
    });

    html.find('.minor-attr-decrease').click(function() {
        const attr = $(this).data('attr');
        const $input = html.find(`input[data-attr="${attr}"]`);
        const currentAdded = parseInt($input.val()) || 0;
        
        if (currentAdded > 0) {
            $input.val(currentAdded - 1);
            remainingPoints++;
            updateUI();
        }
    });

    // **Initialiser l'affichage**
    updateUI();
}
    
    static _getCreationMajorData(html) {
        const data = {};
        html.find('input[data-attr]').each(function() {
            const $input = $(this);
            const attr = $input.data('attr');
            // **CORRECTION : Ne sauvegarder QUE la valeur ajoutée (répartition), pas le total**
            const addedValue = parseInt($input.val()) || 0;
            data[attr] = addedValue; // Seulement les points ajoutés, pas base + ajouté
        });
        return data;
    }
    
    static _getCreationMinorData(html) {
        const data = {};
        html.find('input[data-attr]').each(function() {
            const attr = $(this).data('attr');
            const value = parseInt($(this).val()) || 0;
            data[attr] = value;
        });
        return data;
    }

        // **AJOUT UNIQUEMENT : Ajouter ces 3 nouvelles méthodes après vos méthodes existantes**
    
    // **NOUVELLE MÉTHODE : Récupérer les talents généraux disponibles**
static _getGeneralTalents(actor) {
    const generalTalents = [];
    const actorSystem = actor.system;
    
    // **RÉCUPÉRER les talents déjà acquis par l'acteur**
    const acquiredTalents = actor.system.talents || [];
    const acquiredTalentNames = acquiredTalents.map(t => t.nom.toLowerCase());
    
    console.log("🔍 Talents déjà acquis:", acquiredTalentNames);
    
    // **TALENTS STATISTIQUES**
    Object.entries(talentStatistique).forEach(([key, talent]) => {
        // **VÉRIFIER si le talent n'est pas déjà acquis**
        if (acquiredTalentNames.includes(talent.nom.toLowerCase())) {
            console.log(`🚫 Talent statistique déjà acquis: ${talent.nom}`);
            return;
        }
        
        // **VÉRIFIER les prérequis**
        if (!CharacterProgression._checkTalentPrerequisites(talent, actorSystem)) {
            console.log(`❌ Prérequis non remplis pour: ${talent.nom} (${talent.prerequis})`);
            return;
        }
        
        generalTalents.push({
            id: `statistique:${key}`,
            name: talent.nom,
            source: "Talent Statistique",
            description: talent.description,
            prerequis: talent.prerequis,
            type: "statistique"
        });
        
        console.log(`✅ Talent statistique disponible: ${talent.nom}`);
    });
    
    // **TALENTS DE COMBAT**
    Object.entries(talentCombat).forEach(([key, talent]) => {
        // **VÉRIFIER si le talent n'est pas déjà acquis**
        if (acquiredTalentNames.includes(talent.nom.toLowerCase())) {
            console.log(`🚫 Talent combat déjà acquis: ${talent.nom}`);
            return;
        }
        
        // **VÉRIFIER les prérequis**
        if (!CharacterProgression._checkTalentPrerequisites(talent, actorSystem)) {
            console.log(`❌ Prérequis non remplis pour: ${talent.nom} (${talent.prerequis})`);
            return;
        }
        
        generalTalents.push({
            id: `combat:${key}`,
            name: talent.nom,
            source: "Talent de Combat",
            description: talent.description,
            prerequis: talent.prerequis,
            type: "combat"
        });
        
        console.log(`✅ Talent combat disponible: ${talent.nom}`);
    });
    
    // **TALENTS UTILITAIRES**
    Object.entries(talentUtilitaire).forEach(([key, talent]) => {
        // **VÉRIFIER si le talent n'est pas déjà acquis**
        if (acquiredTalentNames.includes(talent.nom.toLowerCase())) {
            console.log(`🚫 Talent utilitaire déjà acquis: ${talent.nom}`);
            return;
        }
        
        // **VÉRIFIER les prérequis**
        if (!CharacterProgression._checkTalentPrerequisites(talent, actorSystem)) {
            console.log(`❌ Prérequis non remplis pour: ${talent.nom} (${talent.prerequis})`);
            return;
        }
        
        generalTalents.push({
            id: `utilitaire:${key}`,
            name: talent.nom,
            source: "Talent Utilitaire",
            description: talent.description,
            prerequis: talent.prerequis,
            type: "utilitaire"
        });
        
        console.log(`✅ Talent utilitaire disponible: ${talent.nom}`);
    });
    
    console.log("🎯 Talents généraux disponibles:", generalTalents.length, "talents");
    return generalTalents;
}
    
    // **NOUVELLE MÉTHODE : Vérifier les prérequis d'un talent**
static _checkTalentPrerequisites(talent, actorSystem) {
    const prerequis = talent.prerequis;
    
    if (!prerequis || prerequis === "Aucun" || prerequis === "Aucun.") {
        return true;
    }
    
    console.log(`🔍 Vérification prérequis pour ${talent.nom}: "${prerequis}"`);
    
    // **PRÉREQUIS : Force > X**
    const forceMatch = prerequis.match(/Force\s*>\s*(\d+)/i);
    if (forceMatch) {
        const requiredForce = parseInt(forceMatch[1]);
        const currentForce = actorSystem.majeures.force?.totale || 0;
        const result = currentForce > requiredForce;
        console.log(`⚡ Force: ${currentForce} > ${requiredForce} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Constitution > X**
    const constitutionMatch = prerequis.match(/Constitution\s*>\s*(\d+)/i);
    if (constitutionMatch) {
        const requiredConstitution = parseInt(constitutionMatch[1]);
        const currentConstitution = actorSystem.majeures.constitution?.totale || 0;
        const result = currentConstitution > requiredConstitution;
        console.log(`🛡️ Constitution: ${currentConstitution} > ${requiredConstitution} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Dextérité > X**
    const dexteriteMatch = prerequis.match(/Dext[eé]rit[eé]\s*>\s*(\d+)/i);
    if (dexteriteMatch) {
        const requiredDexterite = parseInt(dexteriteMatch[1]);
        const currentDexterite = actorSystem.majeures.dexterite?.totale || 0;
        const result = currentDexterite > requiredDexterite;
        console.log(`🤸 Dextérité: ${currentDexterite} > ${requiredDexterite} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Intelligence > X**
    const intelligenceMatch = prerequis.match(/Intelligence\s*>\s*(\d+)/i);
    if (intelligenceMatch) {
        const requiredIntelligence = parseInt(intelligenceMatch[1]);
        const currentIntelligence = actorSystem.majeures.intelligence?.totale || 0;
        const result = currentIntelligence > requiredIntelligence;
        console.log(`🧠 Intelligence: ${currentIntelligence} > ${requiredIntelligence} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Charisme > X**
    const charismeMatch = prerequis.match(/Charisme\s*>\s*(\d+)/i);
    if (charismeMatch) {
        const requiredCharisme = parseInt(charismeMatch[1]);
        const currentCharisme = actorSystem.majeures.charisme?.totale || 0;
        const result = currentCharisme > requiredCharisme;
        console.log(`✨ Charisme: ${currentCharisme} > ${requiredCharisme} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Défense > X**
    const defenseMatch = prerequis.match(/D[eé]fense\s*>\s*(\d+)/i);
    if (defenseMatch) {
        const requiredDefense = parseInt(defenseMatch[1]);
        const currentDefense = actorSystem.majeures.defense?.totale || 0;
        const result = currentDefense > requiredDefense;
        console.log(`🛡️ Défense: ${currentDefense} > ${requiredDefense} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Chance > X**
    const chanceMatch = prerequis.match(/Chance\s*>\s*(\d+)/i);
    if (chanceMatch) {
        const requiredChance = parseInt(chanceMatch[1]);
        const currentChance = actorSystem.majeures.chance?.totale || 0;
        const result = currentChance > requiredChance;
        console.log(`🍀 Chance: ${currentChance} > ${requiredChance} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Sagesse > X**
    const sagesseMatch = prerequis.match(/Sagesse\s*>\s*(\d+)/i);
    if (sagesseMatch) {
        const requiredSagesse = parseInt(sagesseMatch[1]);
        const currentSagesse = actorSystem.majeures.sagesse?.totale || 0;
        const result = currentSagesse > requiredSagesse;
        console.log(`🔮 Sagesse: ${currentSagesse} > ${requiredSagesse} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Niveau du personnage > X**
    const niveauMatch = prerequis.match(/Niveau du personnage\s*>\s*(\d+)/i);
    if (niveauMatch) {
        const requiredLevel = parseInt(niveauMatch[1]);
        const currentLevel = actorSystem.niveauJoueur || 1;
        const result = currentLevel > requiredLevel;
        console.log(`📈 Niveau: ${currentLevel} > ${requiredLevel} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Statistique mineure > X**
    const perceptionMatch = prerequis.match(/Perception\s*(?:OU|ou)?\s*Perception magique\s*>\s*(\d+)/i);
    if (perceptionMatch) {
        const requiredValue = parseInt(perceptionMatch[1]);
        const perception = actorSystem.mineures.perception?.totale || 0;
        const perceptionMagique = actorSystem.mineures.perceptionmagique?.totale || 0;
        const result = perception > requiredValue || perceptionMagique > requiredValue;
        console.log(`👁️ Perception: ${perception} > ${requiredValue} OU Perception magique: ${perceptionMagique} > ${requiredValue} ? ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Talent déjà acquis (ex: "« Musculature » obtenu")**
    const talentMatch = prerequis.match(/«\s*([^»]+)\s*»\s*obtenu/i);
    if (talentMatch) {
        const requiredTalentName = talentMatch[1].trim().toLowerCase();
        const acquiredTalents = actorSystem.talents || [];
        const hasTalent = acquiredTalents.some(t => t.nom.toLowerCase().includes(requiredTalentName));
        console.log(`🎯 Talent requis "${requiredTalentName}" acquis ? ${hasTalent}`);
        return hasTalent;
    }
    
    // **PRÉREQUIS : Conditions multiples avec ET**
    if (prerequis.includes(" et ")) {
        const conditions = prerequis.split(" et ");
        const results = conditions.map(condition => {
            const conditionTalent = { prerequis: condition.trim() };
            return CharacterProgression._checkTalentPrerequisites(conditionTalent, actorSystem);
        });
        const result = results.every(r => r);
        console.log(`🔗 Conditions multiples (ET): ${result}`);
        return result;
    }
    
    // **PRÉREQUIS : Conditions multiples avec OU**
    if (prerequis.includes(" OU ") || prerequis.includes(" ou ")) {
        const conditions = prerequis.split(/ OU | ou /i);
        const results = conditions.map(condition => {
            const conditionTalent = { prerequis: condition.trim() };
            return CharacterProgression._checkTalentPrerequisites(conditionTalent, actorSystem);
        });
        const result = results.some(r => r);
        console.log(`🔀 Conditions multiples (OU): ${result}`);
        return result;
    }
    
    // **FALLBACK : Si pattern non reconnu, autoriser le talent**
    console.warn(`⚠️ Prérequis non reconnu pour ${talent.nom}: "${prerequis}"`);
    return true;
}
    
    // **EXTENSION de _processTalentSelection pour les talents généraux**
    // (Ajouter ces cases dans votre méthode existante ou créer cette nouvelle version)
    static _processTalentSelection(talentId, level) {
        const [talentType, talentKey] = talentId.split(':');
        
        switch (talentType) {
            case "statistique":
                const statTalent = talentStatistique[talentKey];
                return {
                    nom: statTalent.nom,
                    source: "Talent Statistique",
                    niveau: level,
                    effet: statTalent.effets
                };
                
            case "combat":
                const combatTalent = talentCombat[talentKey];
                return {
                    nom: combatTalent.nom,
                    source: "Talent Combat",
                    niveau: level,
                    effet: combatTalent.effets
                };
                
            case "utilitaire":
                const utilitaireTalent = talentUtilitaire[talentKey];
                return {
                    nom: utilitaireTalent.nom,
                    source: "Talent Utilitaire",
                    niveau: level,
                    effet: utilitaireTalent.effets
                };
                
            default:
                // Traitement existant pour les autres types
                return {
                    nom: talentKey,
                    source: talentType,
                    niveau: level,
                    effet: "Talent de voie/arcane"
                };
        }
    }

    
static async _applyTalentFunctions(actor, selectedTalents) {
    console.log("🎯 Application des fonctions de talents:", selectedTalents);
    
    // Import avec le bon chemin
    const { TalentFonctions } = await import('./data/talentFonctions.js');
    console.log("✅ TalentFonctions importé avec succès");
    
    for (const talent of selectedTalents) {
        console.log("🔍 Traitement du talent:", talent);
        
        let functionName = "inconnue";
        
        try {
            // 1. RÉCUPÉRER LES DONNÉES COMPLÈTES DU TALENT
            const fullTalentData = await CharacterProgression._getFullTalentData(talent);
            
            if (!fullTalentData) {
                console.warn(`⚠️ Données du talent non trouvées: ${talent.nom}`);
                continue;
            }
            
            console.log("📋 Données complètes du talent:", fullTalentData);
            functionName = fullTalentData.fonction || "aucune";
            console.log("🔧 Fonction détectée:", functionName);
            
            // 2. APPLIQUER LA FONCTION SI ELLE EXISTE
            if (functionName && functionName !== "aucune" && TalentFonctions[functionName]) {
                console.log(`🚀 Application de la fonction: ${functionName}`);
                
                switch (functionName) {
                    case "bonusIndirectCaracteristique":
                        await TalentFonctions[functionName](actor, fullTalentData, fullTalentData.parametres || {});
                        break;
                        
                    case "bonusDirectPlusConditionnel":
                    case "ajoutDirectPlusConditionnel":
                        await TalentFonctions[functionName](actor, fullTalentData, fullTalentData.effets || {});
                        break;
                        
                    case "jetAvecBonusSituationnel":
                        await TalentFonctions[functionName](actor, fullTalentData, fullTalentData.parametres || {});
                        break;
                        
                    case "repartitionCaracteristiquesMineures":
                    case "repartitionStatistiqueMineure":
                        const pointsMineurs = fullTalentData.pointsToDistribute || 
                                             fullTalentData.effets?.mineure?.Intelligence || 
                                             (fullTalentData.effets?.mineure ? Object.values(fullTalentData.effets.mineure).reduce((a, b) => a + b, 0) : 15);
                        await TalentFonctions.repartitionCaracteristiquesMineures(actor, fullTalentData, pointsMineurs);
                        break;
                        
                    case "repartitionCaracteristiquesMajeures":
                        const pointsMajeurs = fullTalentData.pointsToDistribute || 2;
                        await TalentFonctions[functionName](actor, fullTalentData, pointsMajeurs);
                        break;
                        
                    case "ajoutDirectCaracteristique":
                    case "ajoutDirectCaracteristiques":
                        await TalentFonctions.ajoutDirectCaracteristique(actor, fullTalentData);
                        break;

                    case "ajoutMajeureAuxMineures":
                        console.log("🔍 Talent avant appel:", fullTalentData);
                        console.log("🔍 Parametres disponibles:", fullTalentData.parametres);
                        await TalentFonctions.ajoutMajeureAuxMineures(actor, fullTalentData, fullTalentData.parametres || {});
                        break;
                        
                    default:
                        if (typeof TalentFonctions[functionName] === "function") {
                            const params = fullTalentData.parametres || fullTalentData.effets || {};
                            await TalentFonctions[functionName](actor, fullTalentData, params);
                        } else {
                            console.warn(`⚠️ Fonction ${functionName} non trouvée dans TalentFonctions`);
                        }
                        break;
                }
                
                console.log(`✅ Fonction ${functionName} appliquée avec succès`);
            } else {
                console.log(`ℹ️ Pas de fonction à appliquer pour: ${fullTalentData.nom} (fonction: ${functionName})`);
            }
            
        } catch (error) {
            console.error(`❌ Erreur lors de l'application de ${functionName}:`, error);
            ui.notifications.warn(`Erreur avec le talent "${talent.nom}" (fonction: ${functionName})`);
        }
    }
    
    console.log("✅ Application des talents terminée");
}
// **CORRECTION COMPLÈTE : _getFullTalentData dans character-progression.js**
static async _getFullTalentData(talentSelection) {
    const { nom, source, niveau } = talentSelection;
    
    console.log("🔍 Recherche du talent:", nom, "source:", source, "niveau:", niveau);
    
    try {
        let fullTalentData = null;
        
        if (source === "historique") {
            const { talentCreation } = await import('./data/talents.js');
            const historiqueTalent = talentCreation.talentHistorique.talents.find(t => t.nom === nom);
            if (historiqueTalent) {
                console.log("✅ Talent historique trouvé:", historiqueTalent);
                return {
                    nom: historiqueTalent.nom || nom,
                    source: source,
                    niveau: niveau,
                    description: historiqueTalent.description,
                    effets: historiqueTalent.effets,
                    fonction: historiqueTalent.fonction,
                    parametres: historiqueTalent.parametres,
                    prerequis: historiqueTalent.prerequis
                };
            }
            
        } else if (source === "voie") {
            const { AlyriaVoies } = await import('./data/AlyriaVoies.js');
            console.log("📚 AlyriaVoies chargées:", Object.keys(AlyriaVoies));
            
            for (const voieKey in AlyriaVoies) {
                const voie = AlyriaVoies[voieKey];
                if (voie.talentVoie?.talents) {
                    const talent = voie.talentVoie.talents.find(t => 
                        t.nom === nom && t.niveauJoueur === niveau
                    );
                    if (talent) {
                        console.log("✅ Talent de voie trouvé:", talent);
                        return {
                            nom: talent.nom || nom,
                            source: source,
                            niveau: niveau,
                            description: talent.description,
                            effets: talent.effets || talent.effet,
                            fonction: talent.fonction,
                            parametres: talent.parametres,
                            prerequis: talent.prerequis
                        };
                    }
                }
            }
            
        } else if (source === "arcane") {
            const { AlyriaArcane } = await import('./data/AlyriaArcanes.js');
            console.log("🔮 AlyriaArcane chargées:", Object.keys(AlyriaArcane));
            
            for (const arcaneKey in AlyriaArcane) {
                const arcane = AlyriaArcane[arcaneKey];
                console.log(`🔍 Vérification arcane ${arcaneKey}:`, arcane.nom);
                
                if (arcane.talentArcane?.talents) {
                    console.log(`📋 Talents disponibles dans ${arcaneKey}:`, 
                        arcane.talentArcane.talents.map(t => `${t.nom} (N${t.niveauJoueur}) - Fonction: ${t.fonction || 'AUCUNE'}`)
                    );
                    
                    const talent = arcane.talentArcane.talents.find(t => 
                        t.nom === nom && t.niveauJoueur === niveau
                    );
                    if (talent) {
                        console.log("✅ Talent d'arcane trouvé:", talent);
                        console.log("🔧 Fonction du talent:", talent.fonction);
                        return {
                            nom: talent.nom || nom,
                            source: source,
                            niveau: niveau,
                            description: talent.description,
                            effets: talent.effets || talent.effet,
                            fonction: talent.fonction,
                            parametres: talent.parametres,
                            prerequis: talent.prerequis
                        };
                    }
                }
            }
            
        } else if (source === "statistique") {
            console.log("🔍 Recherche talent statistique:", nom);
            
            // **IMPORT des talents statistiques**
            const { talentStatistique } = await import('./data/talents.js');
            console.log("📋 Talents statistiques disponibles:", Object.keys(talentStatistique));
            
            // **MÉTHODE 1 : Chercher directement par clé (nom en minuscules sans espaces)**
            const talentKey = nom.toLowerCase().replace(/\s+/g, '');
            if (talentStatistique[talentKey]) {
                console.log("✅ Talent statistique trouvé par clé:", talentStatistique[talentKey]);
                fullTalentData = talentStatistique[talentKey];
            }
            
            // **MÉTHODE 2 : Chercher par nom exact dans les propriétés**
            if (!fullTalentData) {
                for (const [key, talent] of Object.entries(talentStatistique)) {
                    if (talent.nom && talent.nom.toLowerCase() === nom.toLowerCase()) {
                        console.log(`✅ Talent statistique trouvé par nom: ${key}`, talent);
                        fullTalentData = talent;
                        break;
                    }
                }
            }
            
            // **MÉTHODE 3 : Chercher par similitude (enlever espaces, accents, etc.)**
            if (!fullTalentData) {
                const normalizedSearchName = nom.toLowerCase()
                    .replace(/\s+/g, '')
                    .replace(/[àáâãäå]/g, 'a')
                    .replace(/[èéêë]/g, 'e')
                    .replace(/[ìíîï]/g, 'i')
                    .replace(/[òóôõö]/g, 'o')
                    .replace(/[ùúûü]/g, 'u')
                    .replace(/[ç]/g, 'c');
                
                for (const [key, talent] of Object.entries(talentStatistique)) {
                    const normalizedTalentName = (talent.nom || key).toLowerCase()
                        .replace(/\s+/g, '')
                        .replace(/[àáâãäå]/g, 'a')
                        .replace(/[èéêë]/g, 'e')
                        .replace(/[ìíîï]/g, 'i')
                        .replace(/[òóôõö]/g, 'o')
                        .replace(/[ùúûü]/g, 'u')
                        .replace(/[ç]/g, 'c');
                    
                    if (normalizedTalentName === normalizedSearchName) {
                        console.log(`✅ Talent statistique trouvé par similitude: ${key}`, talent);
                        fullTalentData = talent;
                        break;
                    }
                }
            }
            
            if (fullTalentData) {
                return {
                    nom: fullTalentData.nom || nom,
                    source: source,
                    niveau: niveau,
                    description: fullTalentData.description,
                    effets: fullTalentData.effets,
                    fonction: fullTalentData.fonction,
                    parametres: fullTalentData.parametres,
                    prerequis: fullTalentData.prerequis
                };
            }
            
            console.log("❌ Talent statistique non trouvé:", nom);
            
        } else if (source === "combat") {
            console.log("🔍 Recherche talent combat:", nom);
            
            // **IMPORT des talents de combat**
            const { talentCombat } = await import('./data/talents.js');
            console.log("📋 Talents combat disponibles:", Object.keys(talentCombat));
            
            // **Même logique que pour les talents statistiques**
            const talentKey = nom.toLowerCase().replace(/\s+/g, '');
            if (talentCombat[talentKey]) {
                console.log("✅ Talent combat trouvé par clé:", talentCombat[talentKey]);
                fullTalentData = talentCombat[talentKey];
            }
            
            if (!fullTalentData) {
                for (const [key, talent] of Object.entries(talentCombat)) {
                    if (talent.nom && talent.nom.toLowerCase() === nom.toLowerCase()) {
                        console.log(`✅ Talent combat trouvé par nom: ${key}`, talent);
                        fullTalentData = talent;
                        break;
                    }
                }
            }
            
            if (fullTalentData) {
                return {
                    nom: fullTalentData.nom || nom,
                    source: source,
                    niveau: niveau,
                    description: fullTalentData.description,
                    effets: fullTalentData.effets,
                    fonction: fullTalentData.fonction,
                    parametres: fullTalentData.parametres,
                    prerequis: fullTalentData.prerequis
                };
            }
            
            console.log("❌ Talent combat non trouvé:", nom);
            
        } else if (source === "utilitaire") {
            console.log("🔍 Recherche talent utilitaire:", nom);
            
            // **IMPORT des talents utilitaires**
            const { talentUtilitaire } = await import('./data/talents.js');
            console.log("📋 Talents utilitaires disponibles:", Object.keys(talentUtilitaire));
            
            // **Même logique**
            const talentKey = nom.toLowerCase().replace(/\s+/g, '');
            if (talentUtilitaire[talentKey]) {
                console.log("✅ Talent utilitaire trouvé par clé:", talentUtilitaire[talentKey]);
                fullTalentData = talentUtilitaire[talentKey];
            }
            
            if (!fullTalentData) {
                for (const [key, talent] of Object.entries(talentUtilitaire)) {
                    if (talent.nom && talent.nom.toLowerCase() === nom.toLowerCase()) {
                        console.log(`✅ Talent utilitaire trouvé par nom: ${key}`, talent);
                        fullTalentData = talent;
                        break;
                    }
                }
            }
            
            if (fullTalentData) {
                return {
                    nom: fullTalentData.nom || nom,
                    source: source,
                    niveau: niveau,
                    description: fullTalentData.description,
                    effets: fullTalentData.effets,
                    fonction: fullTalentData.fonction,
                    parametres: fullTalentData.parametres,
                    prerequis: fullTalentData.prerequis
                };
            }
            
            console.log("❌ Talent utilitaire non trouvé:", nom);
            
        } else if (source === "race") {
            console.log("🏃 Talent racial détecté:", nom);
            return {
                nom: nom,
                source: source,
                niveau: niveau,
                description: "Talent racial",
                fonction: null,
                effets: "Talent racial",
                parametres: {},
                prerequis: "Aucun"
            };
        }
        
        console.warn("❌ Talent non trouvé:", nom, "niveau", niveau, "dans source:", source);
        return null;
        
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des données de talent:", error);
        return null;
    }
} 

 /* Appliquer la fonction d'un seul talent*/

static async _applySingleTalentFunction(actor, talentId, level) {
    console.log(`🔧 Application fonction talent: ${talentId} (niveau ${level})`);
    
    try {
        // **PARSER l'ID du talent**
        const talentData = CharacterProgression._parseTalentId(talentId);
        
        if (!talentData) {
            console.warn(`⚠️ Impossible de parser le talent: ${talentId}`);
            return;
        }
        
        // **RÉCUPÉRER les données complètes du talent**
        const fullTalentData = CharacterProgression._getFullTalentData(talentData);
        
        if (!fullTalentData) {
            console.warn(`⚠️ Données de talent non trouvées: ${talentId}`);
            return;
        }
        
        // **APPLIQUER la fonction si elle existe**
        if (fullTalentData.fonction) {
            console.log(`🎯 Exécution fonction: ${fullTalentData.fonction}`);
            
            switch (fullTalentData.fonction) {
                case "repartitionCaracteristiquesMajeures":
                    const pointsMajeures = fullTalentData.points || fullTalentData.parametres?.points || 2;
                    await TalentFonctions.repartitionCaracteristiquesMajeures(actor, fullTalentData, pointsMajeures);
                    break;
                    
                case "repartitionCaracteristiquesMineurs":
                    const pointsMineurs = fullTalentData.points || fullTalentData.parametres?.points || 15;
                    await TalentFonctions.repartitionCaracteristiquesMineures(actor, fullTalentData, pointsMineurs);
                    break;
                    
                case "ajoutDirectCaracteristiques":
                    const bonus = fullTalentData.bonus || fullTalentData.parametres?.bonus || {};
                    await TalentFonctions.ajoutDirectCaracteristiques(actor, fullTalentData, bonus);
                    break;
                    
                default:
                    console.warn(`⚠️ Fonction de talent non reconnue: ${fullTalentData.fonction}`);
                    break;
            }
        } else {
            console.log(`ℹ️ Talent sans fonction: ${talentId}`);
        }
        
    } catch (error) {
        console.error(`❌ Erreur application talent ${talentId}:`, error);
        ui.notifications.error(`Erreur lors de l'application du talent !`);
    }
}


// **CORRECTION : _parseTalentForFunction dans character-progression.js**
static _parseTalentForFunction(talentId, level) {
    const talentParts = talentId.split(':');
    const talentSource = talentParts[0];
    const talentPath = talentParts[1];
    const talentName = talentParts[2] || talentParts[1];
    
    console.log("🔧 _parseTalentForFunction:", { talentSource, talentPath, talentName });
    
    // **CORRECTION : Récupérer le vrai nom depuis les données**
    let realTalentName = talentName;
    let fullTalentData = null;
    
    if (talentSource === "statistique") {
        // **Chercher le talent par la clé et récupérer son vrai nom**
        if (window.talentStatistique && window.talentStatistique[talentPath]) {
            fullTalentData = window.talentStatistique[talentPath];
            realTalentName = fullTalentData.nom || talentName;
        }
    } else if (talentSource === "combat") {
        if (window.talentCombat && window.talentCombat[talentPath]) {
            fullTalentData = window.talentCombat[talentPath];
            realTalentName = fullTalentData.nom || talentName;
        }
    } else if (talentSource === "utilitaire") {
        if (window.talentUtilitaire && window.talentUtilitaire[talentPath]) {
            fullTalentData = window.talentUtilitaire[talentPath];
            realTalentName = fullTalentData.nom || talentName;
        }
    }
    
    const result = {
        nom: realTalentName,
        source: talentSource,
        niveau: level,
        type: talentSource,
        ...(fullTalentData ? { 
            effets: fullTalentData.effets,
            description: fullTalentData.description,
            fonction: fullTalentData.fonction,
            parametres: fullTalentData.parametres
        } : {})
    };
    
    console.log("🎁 Talent parsé:", result);
    return result;
}

}