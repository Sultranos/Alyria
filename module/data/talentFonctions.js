/**
 * Classe pour les fonctions d'effets de talents
 */
export class TalentFonctions {

static async repartitionCaracteristiquesMajeures(actor, talentData, pointsToDistribute = 2) {
    console.log(`🎯 Déclenchement répartition caractéristiques majeures pour: ${talentData.nom}`);
    
    const tousLesAttributes = [
        { id: "force", label: "Force", description: "Puissance physique et capacité de porter" },
        { id: "dexterite", label: "Dextérité", description: "Agilité et précision des mouvements" },
        { id: "constitution", label: "Constitution", description: "Résistance et endurance physique" },
        { id: "intelligence", label: "Intelligence", description: "Capacité d'apprentissage et de raisonnement" },
        { id: "sagesse", label: "Sagesse", description: "Perception et intuition" },
        { id: "charisme", label: "Charisme", description: "Force de personnalité et leadership" },
        { id: "defense", label: "Défense", description: "Capacité à bloquer et esquiver" },
        { id: "chance", label: "Chance", description: "Fortune et coups critiques" }
    ];

    // **NOUVEAU : Gérer les restrictions**
    let majeurAttributes = tousLesAttributes;
    let restrictionMessage = "";
    
    if (talentData.restriction && Array.isArray(talentData.restriction)) {
        majeurAttributes = tousLesAttributes.filter(attr => 
            talentData.restriction.includes(attr.id)
        );
        
        const restrictionLabels = majeurAttributes.map(attr => attr.label).join(", ");
        restrictionMessage = `<p class="restriction-info"><strong>🎯 Restriction :</strong> Vous ne pouvez améliorer que : ${restrictionLabels}</p>`;
        
        console.log(`🚫 Restriction appliquée:`, talentData.restriction);
    } else if (talentData.parametres?.restriction && Array.isArray(talentData.parametres.restriction)) {
        majeurAttributes = tousLesAttributes.filter(attr => 
            talentData.parametres.restriction.includes(attr.id)
        );
        
        const restrictionLabels = majeurAttributes.map(attr => attr.label).join(", ");
        restrictionMessage = `<p class="restriction-info"><strong>🎯 Restriction :</strong> Vous ne pouvez améliorer que : ${restrictionLabels}</p>`;
        
        console.log(`🚫 Restriction appliquée:`, talentData.parametres.restriction);
    }

    const attributeRows = majeurAttributes.map(attr => {
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
                       class="talent-points"
                       id="${attr.id}" 
                       data-attr="${attr.id}" 
                       data-current="${currentValue}"
                       value="0" 
                       min="0" 
                       max="${pointsToDistribute}">
                <button type="button" class="major-attr-increase" data-attr="${attr.id}">+</button>
                <span class="equals-sign">=</span>
                <span class="total-value">${currentValue}</span>
            </div>
        </div>`
    }).join("");

    const content = `
        <form class="talent-major-form">
            <h2>🎯 Application du Talent</h2>
            <h3>💪 ${talentData.nom}</h3>
            
            <div class="talent-description">
                <p><strong>Effet :</strong> ${talentData.effet}</p>
                <p><em>Répartissez ${pointsToDistribute} point(s) de caractéristiques majeures</em></p>
                ${restrictionMessage} <!-- **NOUVEAU : Affichage des restrictions** -->
            </div>
            
            <div class="talent-points-info">
                <p><strong>Points à répartir :</strong> <span id="talent-major-remaining">${pointsToDistribute}</span> / ${pointsToDistribute}</p>
            </div>
            
            <div class="major-attributes-list">
                ${attributeRows}
            </div>
        </form>
        
        <style>
            .talent-major-form { 
                padding: 15px; 
                max-height: 600px; 
                overflow-y: auto;
                min-width: 650px;
                font-size: 16px;
            }
            .talent-description {
                background: rgba(156, 39, 176, 0.1);
                padding: 12px;
                border-radius: 5px;
                margin-bottom: 20px;
                border-left: 4px solid #9C27B0;
                font-size: 17px;
            }
            
            /* **NOUVEAU : Style pour les restrictions** */
            .restriction-info {
                background: rgba(255, 140, 0, 0.1) !important;
                border: 1px solid #FF8C00 !important;
                border-radius: 4px !important;
                padding: 10px !important;
                margin: 10px 0 !important;
                color: #D2691E !important;
                font-weight: bold !important;
                font-size: 16px !important;
            }
            
            .talent-points-info { 
                background: rgba(76, 175, 80, 0.1); 
                padding: 12px; 
                border-radius: 5px; 
                margin-bottom: 20px; 
                text-align: center;
                font-size: 17px;
            }
            #talent-major-remaining { 
                font-weight: bold; 
                color: #4CAF50; 
                font-size: 19px;
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
                font-size: 17px;
            }
            .major-attribute-description { 
                font-size: 15px;
                color: #666; 
                font-style: italic; 
            }
            .current-value { 
                font-size: 14px;
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
                font-size: 16px;
            }
            .talent-points {
                width: 50px !important; 
                text-align: center !important; 
                border: 1px solid #ccc !important; 
                border-radius: 3px !important; 
                padding: 6px !important; 
                font-weight: bold !important;
                background: rgba(156, 39, 176, 0.1) !important; 
                color: #9C27B0 !important;
                font-size: 17px !important;
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
                font-size: 19px !important;
            }
            .plus-sign, .equals-sign { 
                font-weight: bold; 
                color: #666; 
                font-size: 19px;
            }
            .major-attr-decrease, .major-attr-increase { 
                width: 34px; 
                height: 34px; 
                border: 1px solid #ccc; 
                background: #f5f5f5; 
                border-radius: 3px; 
                cursor: pointer; 
                font-weight: bold;
                font-size: 19px;
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
                title: `Talent: ${talentData.nom}`,
                content,
                render: html => {
                    TalentFonctions._setupTalentMajorListeners(html, pointsToDistribute);
                },
                buttons: {
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Annuler",
                        callback: () => resolve(null)
                    },
                    apply: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Appliquer le Talent",
                        callback: html => {
                            const remainingPoints = parseInt(html.find('#talent-major-remaining').text());
                            if (remainingPoints !== 0) {
                                ui.notifications.warn("Vous devez utiliser tous vos points !");
                                return;
                            }
                            
                            const attributeData = TalentFonctions._getTalentMajorData(html);
                            
                            // **APPLIQUER DIRECTEMENT dans system.majeures[attribut].talents**
                            TalentFonctions._applyTalentToAttributes(actor, talentData, attributeData)
                                .then(success => {
                                    if (success) {
                                        resolve(attributeData);
                                    } else {
                                        resolve(null);
                                    }
                                });
                        }
                    }
                },
                default: "apply"
            }, {
                width: 700,
                height: 650
            }).render(true);
        });
    }

static async repartitionCaracteristiquesMineures(actor, talentData, pointsToDistribute = 15) {
        console.log(`🎯 Déclenchement répartition caractéristiques mineures pour: ${talentData.nom}`);
        
        const tousLesAttributsMineurs = [
             
            // Intelligence
            { id: "connaissanceMonde", label: "Connaissance monde", description: "Savoir général et culture", categorie: "Intelligence" },
            { id: "connaissanceNature", label: "Connaissance nature", description: "Faune, flore et environnement", categorie: "Intelligence" },
            { id: "connaissanceSacree", label: "Connaissance sacrée", description: "Religion et divinités", categorie: "Intelligence" },
            { id: "connaissanceMystique", label: "Connaissance mystique", description: "Magie et mystères", categorie: "Intelligence" },
            
            // Défense
            { id: "robustesse", label: "Robustesse", description: "Résistance aux maladies et à la fatigue", categorie: "Défense" },
            { id: "survie", label: "Survie", description: "Adaptation aux environnements hostiles", categorie: "Défense" },          
            { id: "calme", label: "Calme", description: "Résister au stress et à la pression", categorie: "Défense" },
            
            // Charisme
            { id: "persuaderTromper", label: "Persuader/Tromper", description: "Convaincre et manipuler", categorie: "Charisme" },
            { id: "commandement", label: "Commandement", description: "Diriger et inspirer les autres", categorie: "Charisme" },
            { id: "artMusique", label: "Art et Musique", description: "Expression artistique", categorie: "Charisme" },
            { id: "marchandage", label: "Marchandage", description: "Négocier et commercer", categorie: "Charisme" },
            
            // Dextérité
            { id: "acrobatie", label: "Acrobatie", description: "Équilibre et agilité corporelle", categorie: "Dextérité" },
            { id: "adresse", label: "Adresse", description: "Manipulation fine et dextérité manuelle", categorie: "Dextérité" },
            { id: "discretion", label: "Discrétion", description: "Se cacher et passer inaperçu", categorie: "Dextérité" },
            { id: "artisanat", label: "Artisanat", description: "Création et fabrication d'objets", categorie: "Dextérité" },

            // Force
            { id: "puissance", label: "Puissance", description: "Capacité à porter et frapper fort", categorie: "Force" },
            { id: "athletisme", label: "Athlétisme", description: "Performances physiques et endurance", categorie: "Force" },
            { id: "intimidation", label: "Intimidation", description: "Impressionner et faire peur", categorie: "Force" },
            
            // Chance
            { id: "hasard", label: "Hasard", description: "Coups de chance et fortune", categorie: "Chance" },

            // Sagesse
            { id: "perception", label: "Perception", description: "Observer et détecter", categorie: "Sagesse" },
            { id: "perceptionMagique", label: "Perception magique", description: "Détecter la magie et les auras", categorie: "Sagesse" },
            { id: "intuition", label: "Intuition", description: "Pressentir et deviner", categorie: "Sagesse" },
            { id: "medecine", label: "Médecine", description: "Soigner et diagnostiquer", categorie: "Sagesse" },
            
        ];

        // **Gérer les restrictions par catégorie ou par attributs spécifiques**
        let mineurAttributes = tousLesAttributsMineurs;
        let restrictionMessage = "";
        
        if (talentData.restriction && Array.isArray(talentData.restriction)) {
            // Restriction par attributs spécifiques
            mineurAttributes = tousLesAttributsMineurs.filter(attr => 
                talentData.restriction.includes(attr.id)
            );
            
            const restrictionLabels = mineurAttributes.map(attr => attr.label).join(", ");
            restrictionMessage = `<p class="restriction-info"><strong>🎯 Restriction :</strong> Vous ne pouvez améliorer que : ${restrictionLabels}</p>`;
            
        } else if (talentData.categories && Array.isArray(talentData.categories)) {
            // Restriction par catégories de caractéristiques majeures
            mineurAttributes = tousLesAttributsMineurs.filter(attr => 
                talentData.categories.includes(attr.categorie.toLowerCase())
            );
            
            const categoriesLabels = talentData.categories.join(", ");
            restrictionMessage = `<p class="restriction-info"><strong>🎯 Restriction par catégorie :</strong> ${categoriesLabels}</p>`;
        }

        // **Grouper par catégorie pour l'affichage**
        const attributesParCategorie = {};
        mineurAttributes.forEach(attr => {
            if (!attributesParCategorie[attr.categorie]) {
                attributesParCategorie[attr.categorie] = [];
            }
            attributesParCategorie[attr.categorie].push(attr);
        });

        const categoriesSections = Object.entries(attributesParCategorie).map(([categorie, attributes]) => {
            const attributeRows = attributes.map(attr => {
                const currentValue = actor.system.mineures?.[attr.id]?.totale || 0;
                
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
                               class="talent-points"
                               id="${attr.id}" 
                               data-attr="${attr.id}" 
                               data-current="${currentValue}"
                               value="0" 
                               min="0" 
                               max="${pointsToDistribute}">
                        <button type="button" class="minor-attr-increase" data-attr="${attr.id}">+</button>
                        <span class="equals-sign">=</span>
                        <span class="total-value">${currentValue}</span>
                    </div>
                </div>`;
            }).join("");

            return `
                <div class="minor-category-section">
                    <h4 class="category-header">💎 ${categorie}</h4>
                    <div class="minor-attributes-group">
                        ${attributeRows}
                    </div>
                </div>
            `;
        }).join("");

        const content = `
            <form class="talent-minor-form">
                <h2>🎯 Application du Talent</h2>
                <h3>🔧 ${talentData.nom}</h3>
                
                <div class="talent-description">
                    <p><strong>Effet :</strong> ${talentData.effet}</p>
                    <p><em>Répartissez ${pointsToDistribute} point(s) de caractéristiques mineures</em></p>
                    ${restrictionMessage}
                </div>
                
                <div class="talent-points-info">
                    <p><strong>Points à répartir :</strong> <span id="talent-minor-remaining">${pointsToDistribute}</span> / ${pointsToDistribute}</p>
                </div>
                
                <div class="minor-categories-container">
                    ${categoriesSections}
                </div>
            </form>
            
            <style>
                .talent-minor-form { 
                    padding: 15px; 
                    max-height: 650px; 
                    overflow-y: auto;
                    min-width: 700px;
                    font-size: 15px;
                }
                .talent-description {
                    background: rgba(3, 169, 244, 0.1);
                    padding: 12px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    border-left: 4px solid #03A9F4;
                    font-size: 16px;
                }
                .restriction-info {
                    background: rgba(255, 140, 0, 0.1) !important;
                    border: 1px solid #FF8C00 !important;
                    border-radius: 4px !important;
                    padding: 10px !important;
                    margin: 10px 0 !important;
                    color: #D2691E !important;
                    font-weight: bold !important;
                    font-size: 15px !important;
                }
                .talent-points-info { 
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 12px; 
                    border-radius: 5px; 
                    margin-bottom: 20px; 
                    text-align: center;
                    font-size: 16px;
                }
                #talent-minor-remaining { 
                    font-weight: bold; 
                    color: #4CAF50; 
                    font-size: 18px;
                }
                .minor-categories-container {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .minor-category-section {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 15px;
                    background: rgba(250, 250, 250, 0.5);
                }
                .category-header {
                    margin: 0 0 15px 0;
                    color: #03A9F4;
                    border-bottom: 2px solid #03A9F4;
                    padding-bottom: 5px;
                    font-size: 17px;
                }
                .minor-attributes-group { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 10px; 
                }
                .minor-attribute-item { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 10px; 
                    border: 1px solid #ccc; 
                    border-radius: 4px; 
                    background: rgba(255,255,255,0.7);
                }
                .minor-attribute-info { 
                    flex: 1; 
                    margin-right: 15px; 
                }
                .minor-attribute-info label { 
                    font-weight: bold; 
                    color: #333; 
                    font-size: 15px;
                }
                .minor-attribute-description { 
                    font-size: 13px;
                    color: #666; 
                    font-style: italic; 
                    margin: 2px 0;
                }
                .current-value { 
                    font-size: 13px;
                    color: #03A9F4; 
                    font-weight: bold; 
                }
                .minor-attribute-controls { 
                    display: flex; 
                    align-items: center; 
                    gap: 6px; 
                    min-width: 280px;
                }
                .current-display {
                    min-width: 30px; 
                    text-align: center;
                    background: rgba(3, 169, 244, 0.1); 
                    padding: 4px 6px; 
                    border-radius: 3px;
                    border: 1px solid rgba(3, 169, 244, 0.3);
                    font-size: 14px;
                }
                .talent-points {
                    width: 45px !important; 
                    text-align: center !important; 
                    border: 1px solid #ccc !important; 
                    border-radius: 3px !important; 
                    padding: 4px !important; 
                    font-weight: bold !important;
                    background: rgba(3, 169, 244, 0.1) !important; 
                    color: #03A9F4 !important;
                    font-size: 15px !important;
                }
                .total-value {
                    font-weight: bold; 
                    color: #4CAF50; 
                    min-width: 30px; 
                    text-align: center;
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 4px 6px; 
                    border-radius: 3px;
                    border: 1px solid rgba(76, 175, 80, 0.3);
                    font-size: 16px !important;
                }
                .plus-sign, .equals-sign { 
                    font-weight: bold; 
                    color: #666; 
                    font-size: 16px;
                }
                .minor-attr-decrease, .minor-attr-increase { 
                    width: 30px; 
                    height: 30px; 
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
                title: `Talent: ${talentData.nom}`,
                content,
                render: html => {
                    TalentFonctions._setupTalentMinorListeners(html, pointsToDistribute);
                },
                buttons: {
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Annuler",
                        callback: () => resolve(null)
                    },
                    apply: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Appliquer le Talent",
                        callback: html => {
                            const remainingPoints = parseInt(html.find('#talent-minor-remaining').text());
                            if (remainingPoints !== 0) {
                                ui.notifications.warn("Vous devez utiliser tous vos points !");
                                return;
                            }
                            
                            const attributeData = TalentFonctions._getTalentMinorData(html);
                            
                            TalentFonctions._applyTalentToMinorAttributes(actor, talentData, attributeData)
                                .then(success => {
                                    if (success) {
                                        resolve(attributeData);
                                    } else {
                                        resolve(null);
                                    }
                                });
                        }
                    }
                },
                default: "apply"
            }, {
                width: 750,
                height: 700
            }).render(true);
        });
    }
    
static async repartitionCaracteristiquesMineurs(actor, talentData, pointsToDistribute = 15) {
    console.log(`🔗 Redirection repartitionCaracteristiquesMineurs → repartitionCaracteristiquesMineures`);
    
    // **REDIRIGER vers la fonction existante avec "s"**
    return await TalentFonctions.repartitionCaracteristiquesMineures(actor, talentData, pointsToDistribute);
    }
    // **NOUVELLE FONCTION : Ajouter directement des valeurs aux caractéristiques**
static async ajoutDirectCaracteristiques(actor, talentData, bonus = {}) {
        console.log(`🎯 Application directe de bonus pour: ${talentData.nom}`, bonus);
        
        try {
            const updateData = {};
            let messageDetails = [];
            
            // **TRAITER LES MAJEURES**
            if (bonus.majeures) {
                Object.entries(bonus.majeures).forEach(([attr, bonus]) => {
                    if (bonus > 0) {
                        const currentTalentBonus = actor.system.majeures[attr]?.talents || 0;
                        updateData[`system.majeures.${attr}.talents`] = currentTalentBonus + bonus;
                        messageDetails.push(`+${bonus} ${attr.charAt(0).toUpperCase() + attr.slice(1)}`);
                        console.log(`✅ Majeure ${attr}: +${bonus} → ${currentTalentBonus + bonus} (talents)`);
                    }
                });
            }
            
            // **TRAITER LES MINEURES**
            if (bonus.mineures) {
                Object.entries(bonus.mineures).forEach(([attr, bonus]) => {
                    if (bonus > 0) {
                        const currentTalentBonus = actor.system.mineures[attr]?.talents || 0;
                        updateData[`system.mineures.${attr}.talents`] = currentTalentBonus + bonus;
                        messageDetails.push(`+${bonus} ${attr.charAt(0).toUpperCase() + attr.slice(1)}`);
                        console.log(`✅ Mineure ${attr}: +${bonus} → ${currentTalentBonus + bonus} (talents)`);
                    }
                });
            }
            
            // **APPLIQUER LES CHANGEMENTS**
            if (Object.keys(updateData).length > 0) {
                await actor.update(updateData);
                
                const bonusApplied = messageDetails.join(', ');
                ui.notifications.success(`✨ Talent "${talentData.nom}" appliqué : ${bonusApplied} !`);
                
                console.log("✅ Bonus directs appliqués avec succès");
                return true;
            } else {
                console.log("ℹ️ Aucun bonus à appliquer");
                return false;
            }
            
        } catch (error) {
            console.error("❌ Erreur lors de l'application des bonus directs:", error);
            ui.notifications.error("Erreur lors de l'application du talent !");
            return false;
        }
    }
    // **MÉTHODES UTILITAIRES pour les caractéristiques mineures**   
static async _applyTalentToMinorAttributes(actor, talentData, attributeData) {
        console.log(`🎯 Application des points mineurs de talent:`, talentData.nom, attributeData);
        
        const updateData = {};
        
        Object.entries(attributeData).forEach(([attr, value]) => {
            if (value > 0) {
                const currentTalentBonus = actor.system.mineures[attr]?.talents || 0;
                updateData[`system.mineures.${attr}.talents`] = currentTalentBonus + value;
                console.log(`✅ ${attr}: +${value} → ${currentTalentBonus + value} (talents)`);
            }
        });
        try {
            await actor.update(updateData);
            
            const pointsApplied = Object.entries(attributeData)
                .filter(([attr, value]) => value > 0)
                .map(([attr, value]) => `+${value} ${attr.charAt(0).toUpperCase() + attr.slice(1)}`)
                .join(', ');
                
            ui.notifications.success(`✨ Talent "${talentData.nom}" appliqué : ${pointsApplied} !`);
            
            console.log("✅ Talent mineur appliqué avec succès");
            return true;
            
        } catch (error) {
            console.error("❌ Erreur lors de l'application du talent mineur:", error);
            ui.notifications.error("Erreur lors de l'application du talent !");
            return false;
        }
    }

static _setupTalentMinorListeners(html, totalPoints) {
        const pointsCounter = html.find('#talent-minor-remaining');
        let remainingPoints = totalPoints;

        function updateUI() {
            pointsCounter.text(remainingPoints);

            // **Mise à jour des totaux**
            html.find('input[data-attr]').each(function() {
                const $input = $(this);
                const attr = $input.data('attr');
                const currentValue = parseInt($input.data('current')) || 0;
                const addedValue = parseInt($input.val()) || 0;
                const totalValue = currentValue + addedValue;
                
                $input.closest('.minor-attribute-controls').find('.total-value').text(totalValue);
                $input.closest('.minor-attribute-controls').find('.current-display').text(currentValue);
            });
            
            // Gérer les boutons d'augmentation
            html.find('.minor-attr-increase').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentAdded = parseInt($input.val()) || 0;
                
                $btn.prop('disabled', remainingPoints <= 0 || currentAdded >= totalPoints);
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

        // **Input validation**
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

        // **Boutons d'augmentation**
        html.find('.minor-attr-increase').click(function() {
            const attr = $(this).data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentAdded = parseInt($input.val()) || 0;
            
            if (remainingPoints > 0 && currentAdded < totalPoints) {
                $input.val(currentAdded + 1);
                remainingPoints--;
                updateUI();
            }
        });

        // **Boutons de diminution**
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

static _getTalentMinorData(html) {
        const data = {};
        
        html.find('input[data-attr]').each(function() {
            const attr = $(this).data('attr');
            const value = parseInt($(this).val()) || 0;
            if (value > 0) {
                data[attr] = value;
            }
        });
        
        return data;
    }

static async _applyTalentToAttributes(actor, talentData, attributeData) {
        console.log(`🎯 Application des points de talent:`, talentData.nom, attributeData);
        
        const updateData = {};
        
        // **APPLIQUER dans system.majeures[attribut].talents**
        Object.entries(attributeData).forEach(([attr, value]) => {
            if (value > 0) {
                const currentTalentBonus = actor.system.majeures[attr]?.talents || 0;
                updateData[`system.majeures.${attr}.talents`] = currentTalentBonus + value;
                console.log(`✅ ${attr}: +${value} → ${currentTalentBonus + value} (talents)`);
            }
        });
        
        try {
            await actor.update(updateData);
            
            // **Message de succès détaillé**
            const pointsApplied = Object.entries(attributeData)
                .filter(([attr, value]) => value > 0)
                .map(([attr, value]) => `+${value} ${attr.charAt(0).toUpperCase() + attr.slice(1)}`)
                .join(', ');
                
            ui.notifications.success(`✨ Talent "${talentData.nom}" appliqué : ${pointsApplied} !`);
            
            console.log("✅ Talent appliqué avec succès");
            return true;
            
        } catch (error) {
            console.error("❌ Erreur lors de l'application du talent:", error);
            ui.notifications.error("Erreur lors de l'application du talent !");
            return false;
        }
    }

static _setupTalentMajorListeners(html, totalPoints) {
        const pointsCounter = html.find('#talent-major-remaining');
        let remainingPoints = totalPoints;

        function updateUI() {
            pointsCounter.text(remainingPoints);

            // **Mise à jour des totaux**
            html.find('input[data-attr]').each(function() {
                const $input = $(this);
                const attr = $input.data('attr');
                const currentValue = parseInt($input.data('current')) || 0;
                const addedValue = parseInt($input.val()) || 0;
                const totalValue = currentValue + addedValue;
                
                $input.closest('.major-attribute-controls').find('.total-value').text(totalValue);
                $input.closest('.major-attribute-controls').find('.current-display').text(currentValue);
            });
            
            // Gérer les boutons d'augmentation
            html.find('.major-attr-increase').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentAdded = parseInt($input.val()) || 0;
                
                $btn.prop('disabled', remainingPoints <= 0 || currentAdded >= totalPoints);
            });
            
            // Gérer les boutons de diminution
            html.find('.major-attr-decrease').each(function() {
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

        // **Input validation**
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

        // **Boutons d'augmentation**
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

        // **Boutons de diminution**
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

        // **Initialiser l'affichage**
        updateUI();
    }

static _getTalentMajorData(html) {
        const data = {};
        
        html.find('input[data-attr]').each(function() {
            const attr = $(this).data('attr');
            const value = parseInt($(this).val()) || 0;
            if (value > 0) {
                data[attr] = value;
            }
        });
        
        return data;
    }
    // **NOUVELLE FONCTION : Jet avec bonus situationnel**
static async jetAvecBonusSituationnel(actor, talentData, parametres = {}) {
    console.log(`🎯 Jet avec bonus situationnel pour: ${talentData.nom}`, parametres);
    
    const {
        caracteristique,
        bonus = 0,
        condition = "Condition spéciale",
        description = ""
    } = parametres;
    
    if (!caracteristique) {
        ui.notifications.error("Caractéristique non définie pour le bonus situationnel !");
        return;
    }
    
    // **NOUVEAU : Détecter le type de bonus (numérique, avantage, désavantage)**
    let bonusType = "numerique";
    let bonusValue = bonus;
    let rollMechanic = "normal";
    
    if (typeof bonus === "string") {
        const bonusLower = bonus.toLowerCase();
        if (bonusLower === "avantage") {
            bonusType = "avantage";
            bonusValue = 0;
            rollMechanic = "avantage";
        } else if (bonusLower === "désavantage" || bonusLower === "desavantage") {
            bonusType = "désavantage";
            bonusValue = 0;
            rollMechanic = "désavantage";
        }
    }
    
    // **Récupérer la valeur actuelle de la caractéristique**
    const caracValue = actor.system.mineures?.[caracteristique]?.totale || 0;
    const baseTouch = caracValue;
    const finalTouch = caracValue + bonusValue;
    
    // **NOUVEAU : Messages selon le type de bonus**
    let bonusDisplay = "";
    let mechanicExplanation = "";
    
    switch (bonusType) {
        case "avantage":
            bonusDisplay = `<span class="advantage-text">🎯 AVANTAGE</span>`;
            mechanicExplanation = "Lance 2 dés et garde le meilleur résultat";
            break;
        case "désavantage":
            bonusDisplay = `<span class="disadvantage-text">⚠️ DÉSAVANTAGE</span>`;
            mechanicExplanation = "Lance 2 dés et garde le moins bon résultat";
            break;
        default:
            bonusDisplay = `<span class="bonus-value">+${bonusValue}%</span>`;
            mechanicExplanation = `Bonus numérique de +${bonusValue}%`;
            break;
    }
    
    const content = `
        <form class="situational-bonus-form">
            <h2>🎯 ${talentData.nom}</h2>
            <h3>🎲 Jet avec Bonus Situationnel</h3>
                            
            <div class="condition-info">
                <h4>📋 Condition d'application</h4>
                <p><strong>Talent :</strong> ${talentData.nom}</p>
                <p><strong>Effet :</strong> ${talentData.effet}</p>
            </div>
            
            <div class="roll-info">
                <h4>🎲 Détails du jet</h4>
                <div class="characteristic-display">
                    <span class="carac-name">${TalentFonctions._getCaracteristiqueLabel(caracteristique)}</span>
                    <span class="carac-value">${caracValue}</span>
                </div>
                
                <div class="bonus-calculation">
                    <div class="situational-bonus">
                        <span>Type de bonus :</span>
                        ${bonusDisplay}
                    </div>
                    <div class="mechanic-explanation">
                        <span><strong>Mécanique :</strong></span>
                        <span class="mechanic-text">${mechanicExplanation}</span>
                    </div>
                    <div class="total-touch">
                        <span><strong>Seuil de réussite :</strong></span>
                        <span class="final-touch"><strong>${finalTouch}%</strong></span>
                    </div>
                </div>
            </div>
            
            <div class="custom-bonus-section">
                <label for="custom-bonus">Bonus supplémentaire (optionnel) :</label>
                <input type="number" id="custom-bonus" name="customBonus" value="0" min="-50" max="50" step="1">
                <small>Permet d'ajouter un bonus/malus temporaire</small>
            </div>
        </form>
        
        <style>
            .situational-bonus-form { 
                padding: 15px; 
                min-width: 500px;
                font-size: 15px;
            }
            .condition-info {
                background: rgba(255, 140, 0, 0.1);
                padding: 12px;
                border-radius: 5px;
                margin-bottom: 15px;
                border-left: 4px solid #FF8C00;
            }
            .roll-info {
                background: rgba(33, 150, 243, 0.1);
                padding: 12px;
                border-radius: 5px;
                margin-bottom: 15px;
                border-left: 4px solid #2196F3;
            }
            .characteristic-display {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                padding: 8px;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 4px;
            }
            .carac-name {
                font-weight: bold;
                color: #333;
            }
            .carac-value {
                font-size: 18px;
                font-weight: bold;
                color: #2196F3;
            }
            .bonus-calculation {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .situational-bonus, .mechanic-explanation, .total-touch {
                display: flex;
                justify-content: space-between;
                padding: 4px 8px;
            }
            .situational-bonus {
                background: rgba(76, 175, 80, 0.1);
                border-radius: 3px;
            }
            .mechanic-explanation {
                background: rgba(156, 39, 176, 0.1);
                border-radius: 3px;
            }
            .total-touch {
                background: rgba(255, 193, 7, 0.1);
                border-radius: 3px;
                border: 1px solid #FFC107;
            }
            
            /* **NOUVEAU : Styles pour Avantage/Désavantage** */
            .advantage-text {
                color: #4CAF50;
                font-weight: bold;
                font-size: 16px;
                text-shadow: 0 1px 2px rgba(76, 175, 80, 0.3);
            }
            .disadvantage-text {
                color: #f44336;
                font-weight: bold;
                font-size: 16px;
                text-shadow: 0 1px 2px rgba(244, 67, 54, 0.3);
            }
            .bonus-value { 
                color: #4CAF50; 
                font-weight: bold; 
            }
            .mechanic-text {
                font-style: italic;
                color: #7B1FA2;
            }
            .final-touch { 
                color: #FF9800; 
                font-weight: bold; 
                font-size: 16px; 
            }
            
            .custom-bonus-section {
                background: rgba(158, 158, 158, 0.1);
                padding: 10px;
                border-radius: 5px;
                margin-top: 15px;
            }
            .custom-bonus-section label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            .custom-bonus-section input {
                width: 80px;
                text-align: center;
                padding: 4px;
                border: 1px solid #ccc;
                border-radius: 3px;
            }
            .custom-bonus-section small {
                display: block;
                color: #666;
                margin-top: 5px;
                font-style: italic;
            }
        </style>
    `;
    
    return new Promise(resolve => {
        new Dialog({
            title: `Jet avec Bonus : ${TalentFonctions._getCaracteristiqueLabel(caracteristique)}`,
            content,
            render: html => {
                // **Mise à jour dynamique du calcul**
                html.find('#custom-bonus').on('input', function() {
                    const customBonus = parseInt($(this).val()) || 0;
                    const newFinalTouch = baseTouch + bonusValue + customBonus;
                    html.find('.final-touch').text(`${newFinalTouch}%`);
                    
                    // **Changer la couleur selon le bonus/malus**
                    const finalTouchElement = html.find('.final-touch');
                    if (customBonus > 0) {
                        finalTouchElement.css('color', '#4CAF50');
                    } else if (customBonus < 0) {
                        finalTouchElement.css('color', '#f44336');
                    } else {
                        finalTouchElement.css('color', '#FF9800');
                    }
                });
            },
            buttons: {
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Annuler",
                    callback: () => resolve(null)
                },
                roll: {
                    icon: '<i class="fas fa-dice-d20"></i>',
                    label: "Effectuer le Jet",
                    callback: html => {
                        const customBonus = parseInt(html.find('#custom-bonus').val()) || 0;
                        const finalThreshold = baseTouch + bonusValue + customBonus;
                        
                        TalentFonctions._executeSituationalRoll(
                            actor, 
                            talentData, 
                            caracteristique, 
                            caracValue, 
                            rollMechanic,
                            bonusType,
                            bonusValue + customBonus, 
                            finalThreshold, 
                            condition
                        ).then(resolve);
                    }
                }
            },
            default: "roll"
        }, {
            width: 550,
            height: 600
        }).render(true);
    });
    }
    // **NOUVELLE MÉTHODE MODIFIÉE : Exécuter le jet situationnel avec Avantage/Désavantage**
static async _executeSituationalRoll(actor, talentData, caracteristique, caracValue, rollMechanic, bonusType, totalBonus, finalTouch, condition) {
    console.log(`🎲 Jet situationnel: ${caracteristique} avec ${rollMechanic} (${finalTouch}% seuil)`);
    
    let roll1, roll2, rollTotal, rollDetails;
    
    // **NOUVEAU : Gestion des différents types de jets**
    switch (rollMechanic) {
        case "avantage":
            roll1 = new Roll("1d100");
            roll2 = new Roll("1d100");
            await roll1.evaluate();
            await roll2.evaluate();
            
            rollTotal = Math.min(roll1.total, roll2.total); // Prendre le meilleur (plus petit)
            rollDetails = `🎯 Avantage: ${roll1.total} et ${roll2.total} → **${rollTotal}** (meilleur)`;
            break;
            
        case "désavantage":
            roll1 = new Roll("1d100");
            roll2 = new Roll("1d100");
            await roll1.evaluate();
            await roll2.evaluate();
            
            rollTotal = Math.max(roll1.total, roll2.total); // Prendre le pire (plus grand)
            rollDetails = `⚠️ Désavantage: ${roll1.total} et ${roll2.total} → **${rollTotal}** (pire)`;
            break;
            
        default: // normal
            const roll = new Roll("1d100");
            await roll.evaluate();
            rollTotal = roll.total;
            rollDetails = `🎲 Jet normal: **${rollTotal}**`;
            break;
    }
    
    const success = rollTotal <= finalTouch;
    const criticalSuccess = rollTotal <= 5; // Toujours 5% pour les mineures
    const criticalFailure = rollTotal >= 96;
    
    let resultText = "";
    let resultClass = "";
    
    if (criticalSuccess) {
        resultText = "🌟 **SUCCÈS CRITIQUE !** 🌟";
        resultClass = "success-critical";
    } else if (criticalFailure) {
        resultText = "💥 **ÉCHEC CRITIQUE !** 💥";
        resultClass = "failure-critical";
    } else if (success) {
        resultText = "✅ **Succès**";
        resultClass = "success";
    } else {
        resultText = "❌ **Échec**";
        resultClass = "failure";
    }
    
    // **Construire le message de chat détaillé**
    const characLabel = TalentFonctions._getCaracteristiqueLabel(caracteristique);
    
    // **NOUVEAU : Affichage différent selon le type de bonus**
    let bonusDisplayChat = "";
    switch (bonusType) {
        case "avantage":
            bonusDisplayChat = `<div class="bonus-info advantage-bonus">
                <strong>🎯 Avantage :</strong> Lance 2 dés, garde le meilleur
            </div>`;
            break;
        case "désavantage":
            bonusDisplayChat = `<div class="bonus-info disadvantage-bonus">
                <strong>⚠️ Désavantage :</strong> Lance 2 dés, garde le pire
            </div>`;
            break;
        default:
            bonusDisplayChat = `<div class="bonus-info">
                <strong>Bonus situationnel :</strong> +${totalBonus}%
            </div>`;
            break;
    }
    
    const chatContent = `
        <div class="situational-roll-message">
            <h3>🎯 ${actor.name} - Jet avec Bonus Situationnel</h3>
            
            <div class="talent-used">
                <strong>Talent utilisé :</strong> ${talentData.nom}
            </div>
            
            <div class="condition-applied">
                <strong>Condition :</strong> <em>${condition}</em>
            </div>
            
            <div class="roll-breakdown">
                <div class="characteristic-info">
                    <strong>Caractéristique :</strong> ${characLabel} (${caracValue})
                </div>
                ${bonusDisplayChat}
                <div class="final-chance">
                    <strong>Seuil final :</strong> ${finalTouch}%
                </div>
            </div>
            
            <div class="dice-details">
                ${rollDetails}
            </div>
            
            <div class="roll-result ${resultClass}">
                <div class="success-status">
                    ${resultText}
                </div>
            </div>
        </div>
        
        <style>
            .situational-roll-message {
                padding: 12px;
                border-radius: 8px;
                background: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(33, 150, 243, 0.1));
                border-left: 4px solid #9C27B0;
                font-family: Arial, sans-serif;
            }
            .talent-used {
                background: rgba(156, 39, 176, 0.15);
                padding: 6px 10px;
                border-radius: 4px;
                margin: 8px 0;
                color: #7B1FA2;
            }
            .condition-applied {
                background: rgba(255, 140, 0, 0.15);
                padding: 6px 10px;
                border-radius: 4px;
                margin: 8px 0;
                color: #F57C00;
            }
            .roll-breakdown {
                background: rgba(33, 150, 243, 0.1);
                padding: 10px;
                border-radius: 4px;
                margin: 8px 0;
            }
            .roll-breakdown > div {
                margin: 4px 0;
            }
            
            /* **NOUVEAU : Styles pour les bonus spéciaux** */
            .advantage-bonus {
                background: rgba(76, 175, 80, 0.15);
                border-left: 3px solid #4CAF50;
                padding-left: 8px;
                color: #2E7D32;
            }
            .disadvantage-bonus {
                background: rgba(244, 67, 54, 0.15);
                border-left: 3px solid #f44336;
                padding-left: 8px;
                color: #C62828;
            }
            
            .dice-details {
                background: rgba(96, 125, 139, 0.1);
                padding: 8px;
                border-radius: 4px;
                margin: 8px 0;
                font-weight: bold;
                text-align: center;
                border: 1px solid rgba(96, 125, 139, 0.3);
            }
            
            .roll-result {
                padding: 10px;
                border-radius: 6px;
                margin-top: 10px;
                text-align: center;
                font-weight: bold;
            }
            .roll-result.success-critical {
                background: rgba(76, 175, 80, 0.2);
                border: 2px solid #4CAF50;
                color: #2E7D32;
            }
            .roll-result.success {
                background: rgba(139, 195, 74, 0.2);
                border: 2px solid #8BC34A;
                color: #558B2F;
            }
            .roll-result.failure {
                background: rgba(255, 152, 0, 0.2);
                border: 2px solid #FF9800;
                color: #E65100;
            }
            .roll-result.failure-critical {
                background: rgba(244, 67, 54, 0.2);
                border: 2px solid #f44336;
                color: #C62828;
            }
            .success-status {
                font-size: 18px;
            }
        </style>
    `;
    
    // **Envoyer le message avec l'animation du dé appropriée**
    const finalRoll = roll1 || new Roll(`${rollTotal}`);
    await finalRoll.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({actor: actor}),
        content: chatContent,
        sound: "sounds/dice.wav"
    });
    
    // **Notification**
    const notifType = success ? "info" : "warn";
    ui.notifications[notifType](resultText.replace(/\*\*/g, '').replace(/🌟|💥|✅|❌/g, ''));
    
    console.log("✅ Jet situationnel effectué avec succès");
    return { success, criticalSuccess, criticalFailure, rollTotal, finalTouch, rollMechanic };
    }
    // **NOUVELLE MÉTHODE : Obtenir le label d'une caractéristique**
static _getCaracteristiqueLabel(caracteristique) {
        // **NOUVEAU : Gérer le cas où caracteristique est un array**
    if (Array.isArray(caracteristique)) {
        return caracteristique.map(carac => TalentFonctions._getCaracteristiqueLabel(carac)).join(', ');
    }
    
    // **CORRECTION : Gérer le cas où caracteristique n'est pas une string**
    if (typeof caracteristique !== 'string') {
        console.warn("⚠️ Caractéristique non-string:", caracteristique);
        return String(caracteristique);
    }
    
        const labels = {
            // Intelligence
            "connaissanceMonde": "monde",
            "connaissanceNature": "nature", 
            "connaissanceSacree": "sacré",
            "connaissanceMystique": "mystique",
            "Monde": "monde",
            "Nature": "nature",
            "Sacré": "sacré",
            "Mystique": "mystique",
            
            // Défense
            "robustesse": "Robustesse",
            "calme": "Calme",
            
            // Charisme
            "commandement": "Commandement",
            "marchandage": "Marchandage",
            "persuasion": "Persuader/Tromper",
            "artmusique": "Art et Musique",
            
            // Dextérité
            "acrobatie": "Acrobatie",
            "adresse": "Adresse",
            "discretion": "Discrétion",
            "artisanat": "Artisanat",
            
            // Force
            "puissance": "Puissance",
            "athletisme": "Athlétisme",
            "intimidation": "Intimidation",
            "athlétisme": "Athlétisme",
            
            // Chance
            "hasard": "Hasard",
            
            
            // Sagesse
            "perception": "Perception",
            "perceptionMagique": "Perception Magique",
            "medecine": "Médecine",
            "Perceptionmagique": "Perception Magique",
            "intuition": "Intuition",
        };
    
    const normalized = caracteristique.toLowerCase().trim();
    return labels[normalized] || caracteristique.charAt(0).toUpperCase() + caracteristique.slice(1);
    }
    // **NOUVELLE MÉTHODE : Calculer la touche à partir d'une valeur de caractéristique**
static _getToucheValue(caracValue) {
        // **Même logique que dans AlyriaActor.js**
        let totalToucheBonus = 0;
        if (caracValue > 0) { 
            const phase1Points = Math.min(caracValue, 10);
            totalToucheBonus += phase1Points * 5;
        }
        if (caracValue > 10) {
            const phase2Points = Math.min(caracValue - 10, 5);
            totalToucheBonus += phase2Points * 3;
        }
        if (caracValue > 15) {
            const phase3Points = Math.min(caracValue - 15, 5);
            totalToucheBonus += phase3Points * 2;
        }
        if (caracValue > 20) {
            const phase4Points = Math.min(caracValue - 20, 10);
            totalToucheBonus += phase4Points * 1;
        }
        return totalToucheBonus;
    }
    // **NOUVELLE FONCTION : Bonus direct + conditionnel**
static async bonusDirectPlusConditionnel(actor, talentData, parametres = {}) {
    console.log(`🎯 Application bonus direct + conditionnel pour: ${talentData.nom}`, parametres);
    
    try {
        // **1. APPLIQUER LES BONUS DIRECTS (si présents)**
        if (parametres.bonus) {
            await TalentFonctions.ajoutDirectCaracteristiques(actor, talentData, parametres.bonus);
        }
        
        // **2. CRÉER LE TALENT CONDITIONNEL**
        const conditionalTalent = {
            nom: talentData.nom,
            caracteristique: parametres.caracteristique, // **GARDER tel quel (array ou string)**
            bonus: parametres.bonusConditionnel === "Avantage" ? "Avantage" : (parseInt(parametres.bonusConditionnel) || 0),
            condition: parametres.condition || "Condition spéciale",
            description: parametres.description || talentData.description || "Bonus conditionnel",
            source: "talent"
        };
        
        // **3. SAUVEGARDER DANS LES FLAGS**
        const existingConditionalTalents = actor.getFlag("alyria", "conditionalTalents") || [];
        
        // Vérifier si ce talent conditionnel existe déjà
        const existingIndex = existingConditionalTalents.findIndex(ct => ct.nom === talentData.nom);
        
        if (existingIndex >= 0) {
            existingConditionalTalents[existingIndex] = conditionalTalent;
        } else {
            existingConditionalTalents.push(conditionalTalent);
        }
        
        await actor.setFlag("alyria", "conditionalTalents", existingConditionalTalents);
        
        console.log("✅ Capacité conditionnelle enregistrée:", conditionalTalent);
        
        // **4. MESSAGE DE SUCCÈS DÉTAILLÉ**
        let messageDetails = [];
        
        // Bonus directs
        if (parametres.bonus?.majeures) {
            Object.entries(parametres.bonus.majeures).forEach(([attr, bonus]) => {
                if (bonus > 0) {
                    messageDetails.push(`+${bonus} ${attr.charAt(0).toUpperCase() + attr.slice(1)}`);
                }
            });
        }
        
        if (parametres.bonus?.mineures) {
            Object.entries(parametres.bonus.mineures).forEach(([attr, bonus]) => {
                if (bonus > 0) {
                    const caracLabel = TalentFonctions._getCaracteristiqueLabel(attr);
                    messageDetails.push(`+${bonus} ${caracLabel}`);
                }
            });
        }
        
        // Bonus conditionnel
        if (parametres.caracteristique && parametres.bonusConditionnel) {
            const caracteristiqueLabel = TalentFonctions._getCaracteristiqueLabel(parametres.caracteristique);
            messageDetails.push(`${parametres.bonusConditionnel} en ${caracteristiqueLabel} (conditionnel)`);
        }
        
        const appliedEffects = messageDetails.join(', ');
        ui.notifications.success(`✨ Talent "${talentData.nom}" appliqué : ${appliedEffects} !`);
        
        // **5. AFFICHER L'AIDE POUR LES BONUS CONDITIONNELS**
        if (parametres.caracteristique && parametres.bonusConditionnel) {
            setTimeout(() => {
                TalentFonctions._showConditionalTalentHelp({
                    nom: talentData.nom,
                    bonusConditionnel: {
                        caracteristique: parametres.caracteristique,
                        bonus: parametres.bonusConditionnel,
                        condition: parametres.condition || "Condition spéciale",
                        description: parametres.description
                    }
                });
            }, 1500);
        }
        
        return true;
        
    } catch (error) {
        console.error("❌ Erreur lors de l'application de bonusDirectPlusConditionnel:", error);
        ui.notifications.error(`Erreur lors de l'application du talent ${talentData.nom}`);
        return false;
    }
}
    // **MÉTHODE D'AIDE : Afficher comment utiliser les bonus conditionnels**
static _showConditionalTalentHelp(talentData) {
        const caracLabel = TalentFonctions._getCaracteristiqueLabel(talentData.bonusConditionnel.caracteristique);
        
        const content = `
            <div class="conditional-talent-help">
                <h3>🎯 Talent Conditionnel Activé</h3>
                <h4>📋 ${talentData.nom}</h4>
                
                <div class="help-content">
                    <p><strong>Bonus permanent appliqué !</strong></p>
                    
                    <div class="conditional-info">
                        <h4>🎲 Utilisation du bonus conditionnel :</h4>
                        <p><strong>Caractéristique :</strong> ${caracLabel}</p>
                        <p><strong>Bonus :</strong> +${talentData.bonusConditionnel.bonus}</p>
                        <p><strong>Condition :</strong> <em>${talentData.bonusConditionnel.condition}</em></p>
                    </div>
                    
                    <div class="usage-instructions">
                        <h4>📖 Comment l'utiliser :</h4>
                        <ol>
                            <li>Faites un jet normal de ${caracLabel}</li>
                            <li>Si la condition s'applique, ajoutez +${talentData.bonusConditionnel.bonus} au seuil</li>
                            <li>Ou utilisez le bouton "Jet avec Talent" sur la fiche personnage</li>
                        </ol>
                    </div>
                    
                    <div class="note">
                        <p><strong>💡 Note :</strong> Ce bonus n'est pas automatique, il doit être appliqué manuellement quand la condition est remplie.</p>
                    </div>
                </div>
            </div>
            
            <style>
                .conditional-talent-help {
                    padding: 15px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(33, 150, 243, 0.1));
                    border-left: 4px solid #9C27B0;
                    font-size: 14px;
                    min-height: 450px;
                }
                .conditional-info {
                    background: rgba(255, 140, 0, 0.1);
                    padding: 10px;
                    border-radius: 5px;
                    margin: 10px 0;
                    border-left: 3px solid #FF8C00;
                }
                .usage-instructions {
                    background: rgba(76, 175, 80, 0.1);
                    padding: 10px;
                    border-radius: 5px;
                    margin: 10px 0;
                    border-left: 3px solid #4CAF50;
                }
                .usage-instructions ol {
                    margin: 8px 0 8px 20px;
                }
                .note {
                    background: rgba(158, 158, 158, 0.1);
                    padding: 8px;
                    border-radius: 4px;
                    margin-top: 10px;
                    font-style: italic;
                }
            </style>
        `;
        
        new Dialog({
            title: "Talent Conditionnel",
            content,
            buttons: {
                understood: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Compris !",
                    callback: () => {}
                }
            }
        }, {
            width: 500,
            height: 400
        }).render(true);
    }
    // **NOUVELLE CLASSE : TalentFonctions**
static async repartitionCaracteristiquesMineurs(actor, talentData, pointsToDistribute = 15) {
    console.log(`🔗 Redirection repartitionCaracteristiquesMineurs → repartitionCaracteristiquesMineures`);
    
    // **REDIRIGER vers la fonction existante avec "s"**
    return await TalentFonctions.repartitionCaracteristiquesMineures(actor, talentData, pointsToDistribute);
    }
    // **AJOUTER ICI - MÉTHODE ALIAS POUR LES TALENTS HISTORIQUES :**
static async ajoutDirectCaracteristique(actor, talentData) {
    console.log(`🔗 Redirection ajoutDirectCaracteristique → ajoutDirectCaracteristiques`);
    console.log(`🔍 Structure du talent:`, talentData);
    
    // **Adapter les données du talent**
    let bonus = {};
    
    // **GÉRER LES DEUX FORMATS : "effets" (historiques) et "effet" (voies/arcanes)**
    const effetsData = talentData.effets;
    
    if (effetsData?.mineure || effetsData?.mineures) {
        bonus.mineures = {};
        const mineureData = effetsData.mineure || effetsData.mineures;
        
        Object.entries(mineureData).forEach(([key, value]) => {
            // **Conversion des noms de caractéristiques**
            const keyMapping = {
                "Medecine": "medecine",
                "Calme": "calme",
                "Charisme": "charisme"
            };
            const mappedKey = keyMapping[key] || key.toLowerCase();
            bonus.mineures[mappedKey] = value;
        });
        
        console.log(`✅ Bonus mineures détectés:`, bonus.mineures);
    }
    
    if (effetsData?.majeure || effetsData?.majeures) {
        bonus.majeures = {};
        const majeureData = effetsData.majeure || effetsData.majeures;
        
        Object.entries(majeureData).forEach(([key, value]) => {
            const mappedKey = key.toLowerCase();
            bonus.majeures[mappedKey] = value;
        });
        
        console.log(`✅ Bonus majeures détectés:`, bonus.majeures);
    }
    
    console.log(`🎯 Bonus final pour ${talentData.nom}:`, bonus);
    
    // **Rediriger vers la fonction existante**
    return await TalentFonctions.ajoutDirectCaracteristiques(actor, talentData, bonus);
    }
    // **NOUVELLE FONCTION : Bonus indirect avec choix du joueur**
// **FONCTION COMPLÈTE : Bonus indirect avec choix du joueur**
static async bonusIndirectCaracteristique(actor, talentData, parametres = {}) {
    console.log(`🎯 Application bonus indirect pour: ${talentData.nom}`, parametres);
    
    try {
        // **ÉTAPE 1 : Appliquer d'abord les bonus directs (si présents)**
        if (parametres.bonus) {
            console.log("🎯 Application des bonus directs:", parametres.bonus);
            await TalentFonctions.ajoutDirectCaracteristiques(actor, talentData, parametres.bonus);
        }
        
        // **ÉTAPE 2 : EXTRAIRE LES PARAMÈTRES pour les choix**
        const {
            majeures = null,
            mineures = null,
            pointsToDistribute = 1
        } = parametres;
        
        // **VÉRIFIER qu'il y a au moins un type de choix**
        if (!majeures && !mineures) {
            console.log("ℹ️ Aucun choix à faire, seulement des bonus directs");
            return true; // Pas d'erreur si seulement des bonus directs
        }
        
        // **DÉFINIR LES CARACTÉRISTIQUES DISPONIBLES POUR LE CHOIX**
        let availableAttributes = [];
        let totalPointsToDistribute = 0;
        
        // **TRAITER LES MAJEURES**
        if (majeures) {
            if (typeof majeures === 'number') {
                // Format: majeures: 2 (toutes les majeures, 2 points)
                totalPointsToDistribute = majeures;
                availableAttributes.push(...[
                    { id: "force", label: "Force", type: "majeure", description: "Puissance physique et capacité de porter" },
                    { id: "dexterite", label: "Dextérité", type: "majeure", description: "Agilité et précision des mouvements" },
                    { id: "constitution", label: "Constitution", type: "majeure", description: "Résistance et endurance physique" },
                    { id: "intelligence", label: "Intelligence", type: "majeure", description: "Capacité d'apprentissage et de raisonnement" },
                    { id: "sagesse", label: "Sagesse", type: "majeure", description: "Perception et intuition" },
                    { id: "charisme", label: "Charisme", type: "majeure", description: "Force de personnalité et leadership" },
                    { id: "defense", label: "Défense", type: "majeure", description: "Capacité à bloquer et esquiver" },
                    { id: "chance", label: "Chance", type: "majeure", description: "Fortune et coups critiques" }
                ]);
            } else if (typeof majeures === 'object' && majeures.stats && majeures.points) {
                // Format: majeures: { stats: ["Force", "Dextérité"], points: 2 }
                totalPointsToDistribute = majeures.points;
                const statsMapMajeures = {
                    "force": { id: "force", label: "Force", description: "Puissance physique et capacité de porter" },
                    "dextérité": { id: "dexterite", label: "Dextérité", description: "Agilité et précision des mouvements" },
                    "dexterite": { id: "dexterite", label: "Dextérité", description: "Agilité et précision des mouvements" },
                    "constitution": { id: "constitution", label: "Constitution", description: "Résistance et endurance physique" },
                    "intelligence": { id: "intelligence", label: "Intelligence", description: "Capacité d'apprentissage et de raisonnement" },
                    "sagesse": { id: "sagesse", label: "Sagesse", description: "Perception et intuition" },
                    "charisme": { id: "charisme", label: "Charisme", description: "Force de personnalité et leadership" },
                    "défense": { id: "defense", label: "Défense", description: "Capacité à bloquer et esquiver" },
                    "defense": { id: "defense", label: "Défense", description: "Capacité à bloquer et esquiver" },
                    "chance": { id: "chance", label: "Chance", description: "Fortune et coups critiques" }
                };
                
                majeures.stats.forEach(statName => {
                    const statKey = statName.toLowerCase();
                    if (statsMapMajeures[statKey]) {
                        availableAttributes.push({
                            ...statsMapMajeures[statKey],
                            type: "majeure"
                        });
                    }
                });
            }
        }
        
        // **TRAITER LES MINEURES (le cas d'Histoire de Paysan)**
        if (mineures) {
            if (typeof mineures === 'number') {
                // Format: mineures: 10 (toutes les mineures, 10 points)
                totalPointsToDistribute = mineures;
                availableAttributes.push(...[
                    // Intelligence
                    { id: "connaissanceMonde", label: "Connaissance Monde", type: "mineure", description: "Savoir général et culture" },
                    { id: "connaissanceNature", label: "Connaissance Nature", type: "mineure", description: "Faune, flore et environnement" },
                    { id: "connaissanceSacree", label: "Connaissance Sacrée", type: "mineure", description: "Religion et divinités" },
                    { id: "connaissanceMystique", label: "Connaissance Mystique", type: "mineure", description: "Magie et mystères" },
                    
                    // Défense
                    { id: "robustesse", label: "Robustesse", type: "mineure", description: "Résistance aux maladies et à la fatigue" },
                    { id: "survie", label: "Survie", type: "mineure", description: "Adaptation aux environnements hostiles" },
                    { id: "calme", label: "Calme", type: "mineure", description: "Résister au stress et à la pression" },
                    
                    // Charisme
                    { id: "persuaderTromper", label: "Persuader/Tromper", type: "mineure", description: "Convaincre et manipuler" },
                    { id: "commandement", label: "Commandement", type: "mineure", description: "Diriger et inspirer les autres" },
                    { id: "artMusique", label: "Art et Musique", type: "mineure", description: "Expression artistique" },
                    { id: "marchandage", label: "Marchandage", type: "mineure", description: "Négocier et commercer" },
                    
                    // Dextérité
                    { id: "acrobatie", label: "Acrobatie", type: "mineure", description: "Équilibre et agilité corporelle" },
                    { id: "adresse", label: "Adresse", type: "mineure", description: "Manipulation fine et dextérité manuelle" },
                    { id: "discretion", label: "Discrétion", type: "mineure", description: "Se cacher et passer inaperçu" },
                    { id: "artisanat", label: "Artisanat", type: "mineure", description: "Création et fabrication d'objets" },

                    // Force
                    { id: "puissance", label: "Puissance", type: "mineure", description: "Capacité à porter et frapper fort" },
                    { id: "athletisme", label: "Athlétisme", type: "mineure", description: "Performances physiques et endurance" },
                    { id: "intimidation", label: "Intimidation", type: "mineure", description: "Impressionner et faire peur" },
                    
                    // Chance
                    { id: "hasard", label: "Hasard", type: "mineure", description: "Coups de chance et fortune" },
                    { id: "intuition", label: "Intuition", type: "mineure", description: "Pressentir et deviner" },

                    // Sagesse
                    { id: "perception", label: "Perception", type: "mineure", description: "Observer et détecter" },
                    { id: "perceptionMagique", label: "Perception Magique", type: "mineure", description: "Détecter la magie et les auras" },
                    { id: "medecine", label: "Médecine", type: "mineure", description: "Soigner et diagnostiquer" }
                ]);
            } else if (typeof mineures === 'object' && mineures.stats && mineures.points) {
                // Format: mineures: { stats: ["nature", "survie", "puissance", "athletisme", "adresse", "artisanat"], points: 10 }
                totalPointsToDistribute = mineures.points;
                const statsMapMineures = {
                    // **MAPPING POUR HISTOIRE DE PAYSAN**
                    "nature": { id: "connaissanceNature", label: "Connaissance Nature", description: "Faune, flore et environnement" },
                    "connaissance nature": { id: "connaissanceNature", label: "Connaissance Nature", description: "Faune, flore et environnement" },
                    "survie": { id: "survie", label: "Survie", description: "Adaptation aux environnements hostiles" },
                    "puissance": { id: "puissance", label: "Puissance", description: "Capacité à porter et frapper fort" },
                    "athletisme": { id: "athletisme", label: "Athlétisme", description: "Performances physiques et endurance" },
                    "athlétisme": { id: "athletisme", label: "Athlétisme", description: "Performances physiques et endurance" },
                    "adresse": { id: "adresse", label: "Adresse", description: "Manipulation fine et dextérité manuelle" },
                    "artisanat": { id: "artisanat", label: "Artisanat", description: "Création et fabrication d'objets" },
                    
                    // **AUTRES MAPPINGS POSSIBLES**
                    "monde": { id: "connaissanceMonde", label: "Connaissance Monde", description: "Savoir général et culture" },
                    "connaissance monde": { id: "connaissanceMonde", label: "Connaissance Monde", description: "Savoir général et culture" },
                    "sacré": { id: "connaissanceSacree", label: "Connaissance Sacrée", description: "Religion et divinités" },
                    "sacre": { id: "connaissanceSacree", label: "Connaissance Sacrée", description: "Religion et divinités" },
                    "mystique": { id: "connaissanceMystique", label: "Connaissance Mystique", description: "Magie et mystères" },
                    "robustesse": { id: "robustesse", label: "Robustesse", description: "Résistance aux maladies et à la fatigue" },
                    "calme": { id: "calme", label: "Calme", description: "Résister au stress et à la pression" },
                    "persuasion": { id: "persuaderTromper", label: "Persuader/Tromper", description: "Convaincre et manipuler" },
                    "commandement": { id: "commandement", label: "Commandement", description: "Diriger et inspirer les autres" },
                    "artmusique": { id: "artMusique", label: "Art et Musique", description: "Expression artistique" },
                    "art et musique": { id: "artMusique", label: "Art et Musique", description: "Expression artistique" },
                    "marchandage": { id: "marchandage", label: "Marchandage", description: "Négocier et commercer" },
                    "acrobatie": { id: "acrobatie", label: "Acrobatie", description: "Équilibre et agilité corporelle" },
                    "discretion": { id: "discretion", label: "Discrétion", description: "Se cacher et passer inaperçu" },
                    "intimidation": { id: "intimidation", label: "Intimidation", description: "Impressionner et faire peur" },
                    "hasard": { id: "hasard", label: "Hasard", description: "Coups de chance et fortune" },
                    "intuition": { id: "intuition", label: "Intuition", description: "Pressentir et deviner" },
                    "perception": { id: "perception", label: "Perception", description: "Observer et détecter" },
                    "perceptionmagique": { id: "perceptionMagique", label: "Perception Magique", description: "Détecter la magie et les auras" },
                    "perception magique": { id: "perceptionMagique", label: "Perception Magique", description: "Détecter la magie et les auras" },
                    "medecine": { id: "medecine", label: "Médecine", description: "Soigner et diagnostiquer" },
                    "médecine": { id: "medecine", label: "Médecine", description: "Soigner et diagnostiquer" }
                };
                
                mineures.stats.forEach(statName => {
                    const statKey = statName.toLowerCase();
                    if (statsMapMineures[statKey]) {
                        availableAttributes.push({
                            ...statsMapMineures[statKey],
                            type: "mineure"
                        });
                    }
                });
            }
        }
        
        // **FALLBACK : Si points pas défini, utiliser le paramètre global**
        if (totalPointsToDistribute === 0) {
            totalPointsToDistribute = pointsToDistribute;
        }
        
        console.log("📊 Attributs disponibles pour choix:", availableAttributes);
        console.log("🎯 Points à distribuer:", totalPointsToDistribute);
        
        if (availableAttributes.length === 0) {
            console.log("ℹ️ Aucun choix à faire, seulement des bonus directs");
            return true;
        }
        
        // **AFFICHER LE DIALOGUE DE CHOIX**
        const selectedAttributes = await TalentFonctions._showIndirectBonusDialog(
            actor, 
            talentData, 
            availableAttributes, 
            totalPointsToDistribute
        );
        
        if (selectedAttributes) {
            // **APPLIQUER LES BONUS CHOISIS**
            return await TalentFonctions._applyIndirectBonus(actor, talentData, selectedAttributes);
        } else {
            console.log("❌ Aucune sélection effectuée");
            return false;
        }
        
    } catch (error) {
        console.error("❌ Erreur lors de l'application du bonus indirect:", error);
        ui.notifications.error("Erreur lors de l'application du talent !");
        return false;
    }
    }    
    // **NOUVELLE MÉTHODE : Dialogue de sélection pour bonus indirect**
static async _showIndirectBonusDialog(actor, talentData, availableAttributes, totalPoints) {
        // **Grouper par type**
        const attributesByType = {
            majeure: availableAttributes.filter(attr => attr.type === "majeure"),
            mineure: availableAttributes.filter(attr => attr.type === "mineure")
        };
        
        // **Générer les sections par type**
        const attributeSections = Object.entries(attributesByType).map(([type, attributes]) => {
            if (attributes.length === 0) return "";
            
            const attributeRows = attributes.map(attr => {
                const currentValue = type === "majeure" ? 
                    (actor.system.majeures?.[attr.id]?.totale || 0) :
                    (actor.system.mineures?.[attr.id]?.totale || 0);
                
                return `<div class="indirect-attribute-item">
                    <div class="indirect-attribute-info">
                        <label for="${attr.id}">${attr.label}</label>
                        <p class="indirect-attribute-description">${attr.description}</p>
                        <div class="current-value">Actuel: ${currentValue}</div>
                    </div>
                    <div class="indirect-attribute-controls">
                        <span class="current-display">${currentValue}</span>
                        <span class="plus-sign">+</span>
                        <button type="button" class="indirect-attr-decrease" data-attr="${attr.id}" data-type="${type}">-</button>
                        <input type="number" 
                               class="indirect-points"
                               id="${attr.id}" 
                               data-attr="${attr.id}" 
                               data-type="${type}"
                               data-current="${currentValue}"
                               value="0" 
                               min="0" 
                               max="${totalPoints}">
                        <button type="button" class="indirect-attr-increase" data-attr="${attr.id}" data-type="${type}">+</button>
                        <span class="equals-sign">=</span>
                        <span class="total-value">${currentValue}</span>
                    </div>
                </div>`;
            }).join("");
    
            const typeLabel = type === "majeure" ? "💪 Caractéristiques Majeures" : "🔧 Caractéristiques Mineures";
            const typeColor = type === "majeure" ? "#9C27B0" : "#03A9F4";
            
            return `
                <div class="indirect-type-section">
                    <h4 class="type-header" style="color: ${typeColor}; border-bottom-color: ${typeColor};">${typeLabel}</h4>
                    <div class="indirect-attributes-group">
                        ${attributeRows}
                    </div>
                </div>
            `;
        }).join("");
    
        const content = `
            <form class="talent-indirect-form">
                <h2>🎯 Application du Talent</h2>
                <h3>⚖️ ${talentData.nom}</h3>
                
                <div class="talent-description">
                    <p><strong>Effet :</strong> ${talentData.effet}</p>
                    <p><em>Répartissez ${totalPoints} point(s) parmi les caractéristiques disponibles</em></p>
                    <p class="choice-info"><strong>💡 Vous avez le choix :</strong> Concentrez vos points ou répartissez-les selon votre stratégie !</p>
                </div>
                
                <div class="talent-points-info">
                    <p><strong>Points à répartir :</strong> <span id="talent-indirect-remaining">${totalPoints}</span> / ${totalPoints}</p>
                </div>
                
                <div class="indirect-attributes-container">
                    ${attributeSections}
                </div>
            </form>
            
            <style>
                .talent-indirect-form { 
                    padding: 15px; 
                    max-height: 650px; 
                    overflow-y: auto;
                    min-width: 700px;
                    font-size: 15px;
                }
                .talent-description {
                    background: rgba(255, 193, 7, 0.1);
                    padding: 12px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    border-left: 4px solid #FFC107;
                    font-size: 16px;
                }
                .choice-info {
                    background: rgba(76, 175, 80, 0.1);
                    padding: 8px;
                    border-radius: 4px;
                    margin-top: 8px;
                    color: #2E7D32;
                    font-weight: bold;
                }
                .talent-points-info { 
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 12px; 
                    border-radius: 5px; 
                    margin-bottom: 20px; 
                    text-align: center;
                    font-size: 16px;
                }
                #talent-indirect-remaining { 
                    font-weight: bold; 
                    color: #4CAF50; 
                    font-size: 18px;
                }
                .indirect-attributes-container {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .indirect-type-section {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 15px;
                    background: rgba(250, 250, 250, 0.5);
                }
                .type-header {
                    margin: 0 0 15px 0;
                    border-bottom: 2px solid;
                    padding-bottom: 5px;
                    font-size: 17px;
                }
                .indirect-attributes-group { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 10px; 
                }
                .indirect-attribute-item { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 10px; 
                    border: 1px solid #ccc; 
                    border-radius: 4px; 
                    background: rgba(255,255,255,0.7);
                }
                .indirect-attribute-info { 
                    flex: 1; 
                    margin-right: 15px; 
                }
                .indirect-attribute-info label { 
                    font-weight: bold; 
                    color: #333; 
                    font-size: 15px;
                }
                .indirect-attribute-description { 
                    font-size: 13px;
                    color: #666; 
                    font-style: italic; 
                    margin: 2px 0;
                }
                .current-value { 
                    font-size: 13px;
                    color: #FF9800; 
                    font-weight: bold; 
                }
                .indirect-attribute-controls { 
                    display: flex; 
                    align-items: center; 
                    gap: 6px; 
                    min-width: 280px;
                }
                .current-display {
                    min-width: 30px; 
                    text-align: center;
                    background: rgba(255, 152, 0, 0.1); 
                    padding: 4px 6px; 
                    border-radius: 3px;
                    border: 1px solid rgba(255, 152, 0, 0.3);
                    font-size: 14px;
                }
                .indirect-points {
                    width: 45px !important; 
                    text-align: center !important; 
                    border: 1px solid #ccc !important; 
                    border-radius: 3px !important; 
                    padding: 4px !important; 
                    font-weight: bold !important;
                    background: rgba(255, 193, 7, 0.1) !important; 
                    color: #FF8F00 !important;
                    font-size: 15px !important;
                }
                .total-value {
                    font-weight: bold; 
                    color: #4CAF50; 
                    min-width: 30px; 
                    text-align: center;
                    background: rgba(76, 175, 80, 0.1); 
                    padding: 4px 6px; 
                    border-radius: 3px;
                    border: 1px solid rgba(76, 175, 80, 0.3);
                    font-size: 16px !important;
                }
                .plus-sign, .equals-sign { 
                    font-weight: bold; 
                    color: #666; 
                    font-size: 16px;
                }
                .indirect-attr-decrease, .indirect-attr-increase { 
                    width: 30px; 
                    height: 30px; 
                    border: 1px solid #ccc; 
                    background: #f5f5f5; 
                    border-radius: 3px; 
                    cursor: pointer; 
                    font-weight: bold;
                    font-size: 16px;
                }
                .indirect-attr-decrease:hover, .indirect-attr-increase:hover { 
                    background: #e0e0e0; 
                }
                .indirect-attr-decrease:disabled, .indirect-attr-increase:disabled { 
                    opacity: 0.5; 
                    cursor: not-allowed; 
                }
            </style>
        `;
    
        return new Promise(resolve => {
            new Dialog({
                title: `Talent: ${talentData.nom}`,
                content,
                render: html => {
                    TalentFonctions._setupIndirectBonusListeners(html, totalPoints);
                },
                buttons: {
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Annuler",
                        callback: () => resolve(null)
                    },
                    apply: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Appliquer le Talent",
                        callback: html => {
                            const remainingPoints = parseInt(html.find('#talent-indirect-remaining').text());
                            if (remainingPoints !== 0) {
                                ui.notifications.warn("Vous devez utiliser tous vos points !");
                                return;
                            }
                            
                            const attributeData = TalentFonctions._getIndirectBonusData(html);
                            resolve(attributeData);
                        }
                    }
                },
                default: "apply"
            }, {
                width: 750,
                height: 700
            }).render(true);
        });
    }    
    // **NOUVELLE MÉTHODE : Gestion des listeners pour bonus indirect**
static _setupIndirectBonusListeners(html, totalPoints) {
        const pointsCounter = html.find('#talent-indirect-remaining');
        let remainingPoints = totalPoints;
    
        function updateUI() {
            pointsCounter.text(remainingPoints);
    
            // **Mise à jour des totaux**
            html.find('input[data-attr]').each(function() {
                const $input = $(this);
                const attr = $input.data('attr');
                const currentValue = parseInt($input.data('current')) || 0;
                const addedValue = parseInt($input.val()) || 0;
                const totalValue = currentValue + addedValue;
                
                $input.closest('.indirect-attribute-controls').find('.total-value').text(totalValue);
                $input.closest('.indirect-attribute-controls').find('.current-display').text(currentValue);
            });
            
            // Gérer les boutons d'augmentation
            html.find('.indirect-attr-increase').each(function() {
                const $btn = $(this);
                const attr = $btn.data('attr');
                const $input = html.find(`input[data-attr="${attr}"]`);
                const currentAdded = parseInt($input.val()) || 0;
                
                $btn.prop('disabled', remainingPoints <= 0 || currentAdded >= totalPoints);
            });
            
            // Gérer les boutons de diminution
            html.find('.indirect-attr-decrease').each(function() {
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
    
        // **Input validation**
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
    
        // **Boutons d'augmentation**
        html.find('.indirect-attr-increase').click(function() {
            const attr = $(this).data('attr');
            const $input = html.find(`input[data-attr="${attr}"]`);
            const currentAdded = parseInt($input.val()) || 0;
            
            if (remainingPoints > 0 && currentAdded < totalPoints) {
                $input.val(currentAdded + 1);
                remainingPoints--;
                updateUI();
            }
        });
    
        // **Boutons de diminution**
        html.find('.indirect-attr-decrease').click(function() {
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
    // **NOUVELLE MÉTHODE : Récupérer les données du bonus indirect**
static _getIndirectBonusData(html) {
        const data = {
            majeures: {},
            mineures: {}
        };
        
        html.find('input[data-attr]').each(function() {
            const attr = $(this).data('attr');
            const type = $(this).data('type');
            const value = parseInt($(this).val()) || 0;
            
            if (value > 0) {
                data[type === "majeure" ? "majeures" : "mineures"][attr] = value;
            }
        });
        
        return data;
    }    
    // **NOUVELLE MÉTHODE : Appliquer le bonus indirect**
static async _applyIndirectBonus(actor, talentData, bonusData) {
        console.log(`🎯 Application des bonus indirects pour:`, talentData.nom, bonusData);
        
        try {
            const updateData = {};
            let messageDetails = [];
            
            // **APPLIQUER LES MAJEURES**
            if (bonusData.majeures && Object.keys(bonusData.majeures).length > 0) {
                Object.entries(bonusData.majeures).forEach(([attr, value]) => {
                    if (value > 0) {
                        const currentTalentBonus = actor.system.majeures[attr]?.talents || 0;
                        updateData[`system.majeures.${attr}.talents`] = currentTalentBonus + value;
                        messageDetails.push(`+${value} ${attr.charAt(0).toUpperCase() + attr.slice(1)}`);
                        console.log(`✅ Majeure ${attr}: +${value} → ${currentTalentBonus + value} (talents)`);
                    }
                });
            }
            
            // **APPLIQUER LES MINEURES**
            if (bonusData.mineures && Object.keys(bonusData.mineures).length > 0) {
                Object.entries(bonusData.mineures).forEach(([attr, value]) => {
                    if (value > 0) {
                        const currentTalentBonus = actor.system.mineures[attr]?.talents || 0;
                        updateData[`system.mineures.${attr}.talents`] = currentTalentBonus + value;
                        const caracLabel = TalentFonctions._getCaracteristiqueLabel(attr);
                        messageDetails.push(`+${value} ${caracLabel}`);
                        console.log(`✅ Mineure ${attr}: +${value} → ${currentTalentBonus + value} (talents)`);
                    }
                });
            }
            
            // **APPLIQUER LES CHANGEMENTS**
            if (Object.keys(updateData).length > 0) {
                await actor.update(updateData);
                
                const bonusApplied = messageDetails.join(', ');
                ui.notifications.success(`✨ Talent "${talentData.nom}" appliqué : ${bonusApplied} !`);
                
                console.log("✅ Bonus indirects appliqués avec succès");
                return true;
            } else {
                console.log("ℹ️ Aucun bonus à appliquer");
                ui.notifications.warn("Aucun point n'a été distribué !");
                return false;
            }
            
        } catch (error) {
            console.error("❌ Erreur lors de l'application des bonus indirects:", error);
            ui.notifications.error("Erreur lors de l'application du talent !");
            return false;
        }
    }    
    // **NOUVELLE MÉTHODE ALIAS : Pour compatibilité avec l'ancien nom**
static async bonusIndirectCaracteristiques(actor, talentData, parametres = {}) {
        console.log(`🔗 Redirection bonusIndirectCaracteristiques → bonusIndirectCaracteristique`);
        return await TalentFonctions.bonusIndirectCaracteristique(actor, talentData, parametres);
    }
/** NOUVELLE FONCTION : Ajouter une majeure au calcul d'une ou plusieurs mineures*/
static async ajoutMajeureAuxMineures(actor, talentData, parametres = {}) {
    console.log(`🎯 Ajout majeure aux mineures pour: ${talentData.nom}`, parametres);
    
    const {
        majeureSource,     // La majeure à ajouter (ex: "force")
        cibleType,         // "specifique" ou "categorie"
        cibleMineure,      // Si spécifique: nom de la mineure (ex: "intimidation")
        cibleCategorie     // Si catégorie: nom de la majeure tutrice (ex: "intelligence")
    } = parametres;
    
    if (!majeureSource) {
        ui.notifications.error("Majeure source non définie !");
        return false;
    }
    
    if (!cibleType || (cibleType === "specifique" && !cibleMineure) || (cibleType === "categorie" && !cibleCategorie)) {
        ui.notifications.error("Cible non correctement définie !");
        return false;
    }
    
    try {
        // **Récupérer les caractéristiques mineures concernées**
        let mineuresConcernees = [];
        
        if (cibleType === "specifique") {
            // Cas spécifique : une seule mineure (ex: charisme ajouté à intimidation)
            mineuresConcernees = [cibleMineure];
        } else if (cibleType === "categorie") {
            // Cas catégorie : toutes les mineures sous la tutelle d'une majeure (ex: force ajoutée aux jets d'intelligence)
            mineuresConcernees = TalentFonctions._getMineuressousCategorie(cibleCategorie);
        }
        
        console.log("📊 Mineures concernées:", mineuresConcernees);
        
        if (mineuresConcernees.length === 0) {
            ui.notifications.error("Aucune caractéristique mineure trouvée !");
            return false;
        }
        
        // **Récupérer la valeur actuelle de la majeure source (valeur complète)**
        const majeureValue = actor.system.majeures?.[majeureSource]?.totale || 0;
        
        console.log(`🔍 Valeur de ${majeureSource}: ${majeureValue}`);
        
        // **Appliquer directement la valeur complète dans le champ talents**
        const updateData = {};
        
        mineuresConcernees.forEach(mineure => {
            const currentTalents = actor.system.mineures[mineure]?.talents || 0;
            updateData[`system.mineures.${mineure}.talents`] = currentTalents + majeureValue;
            
            console.log(`  → ${mineure}: talents ${currentTalents} + ${majeureValue} = ${currentTalents + majeureValue}`);
        });
        
        // **Sauvegarder la configuration dans les flags pour un suivi (optionnel)**
        const existingBonusConfig = actor.getFlag("alyria", "majeureAuxMineuresApplied") || [];
        
        const newBonusConfig = {
            talentNom: talentData.nom,
            majeureSource: majeureSource,
            cibleType: cibleType,
            cibleMineure: cibleMineure,
            cibleCategorie: cibleCategorie,
            mineuresConcernees: mineuresConcernees,
            bonusApplique: majeureValue,
            dateApplication: new Date().toISOString()
        };
        
        // Vérifier si ce talent existe déjà
        const existingIndex = existingBonusConfig.findIndex(config => config.talentNom === talentData.nom);
        
        if (existingIndex >= 0) {
            existingBonusConfig[existingIndex] = newBonusConfig;
        } else {
            existingBonusConfig.push(newBonusConfig);
        }
        
        await actor.setFlag("alyria", "majeureAuxMineuresApplied", existingBonusConfig);
        
        // **Appliquer les changements**
        await actor.update(updateData);
        
        // **Message de succès**
        const majeureLabel = TalentFonctions._getCaracteristiqueLabel(majeureSource);
        let cibleDescription = "";
        
        if (cibleType === "specifique") {
            cibleDescription = TalentFonctions._getCaracteristiqueLabel(cibleMineure);
        } else {
            const categorieLabel = TalentFonctions._getCaracteristiqueLabel(cibleCategorie);
            cibleDescription = `toutes les mineures associées à ${categorieLabel}`;
        }
        
        ui.notifications.success(
            `✨ Talent "${talentData.nom}" appliqué : +${majeureValue} de ${majeureLabel} ajouté à ${cibleDescription} !`
        );
        
        console.log("✅ Bonus majeure aux mineures appliqué avec succès");
        return true;
        
    } catch (error) {
        console.error("❌ Erreur lors de l'application du bonus majeure aux mineures:", error);
        ui.notifications.error("Erreur lors de l'application du talent !");
        return false;
    }
}
/** MÉTHODE HELPER : Obtenir les mineures sous la tutelle d'une majeure */
static _getMineuressousCategorie(majeure) {
    const categoriesMapping = {
        "defense": ["robustesse", "calme"],
        "charisme": ["marchandage", "persuasion", "artMusique", "commandement"],
        "dexterite": ["acrobatie", "discretion", "adresse", "artisanat"],
        "force": ["puissance", "intimidation", "athletisme"],
        "sagesse": ["perception", "perceptionMagique", "medecine", "intuition"],
        "chance": ["hasard"],
        "intelligence": ["monde", "mystique", "nature", "sacré"],
        "constitution": [] // Constitution n'a pas de mineures associées dans le système actuel
    };
    
    return categoriesMapping[majeure.toLowerCase()] || [];
}
static async _recalculateMineuressWithMajeureBonuses(actor) {
    console.log("🔄 Recalcul des mineures avec bonus de majeures");
    
    const bonusConfigs = actor.getFlag("alyria", "majeureAuxMineuresApplied") || [];
    
    if (bonusConfigs.length === 0) {
        console.log("📊 Aucun bonus majeure->mineure configuré");
        return;
    }
    
    const updateData = {};
    
    // **Pour chaque configuration de bonus**
    bonusConfigs.forEach(config => {
        const majeureValue = actor.system.majeures?.[config.majeureSource]?.totale || 0;
        const nouveauBonus = majeureValue;
        const ancienBonus = config.bonusApplique || 0;
        
        console.log(`📊 ${config.talentNom}: ${config.majeureSource} ${ancienBonus} → ${nouveauBonus}`);
        
        // **Calculer la différence et l'appliquer**
        const difference = nouveauBonus - ancienBonus;
        
        if (difference !== 0) {
            config.mineuresConcernees.forEach(mineure => {
                const currentTalents = actor.system.mineures[mineure]?.talents || 0;
                updateData[`system.mineures.${mineure}.talents`] = currentTalents + difference;
                
                console.log(`  → ${mineure}: talents ${currentTalents} + ${difference} = ${currentTalents + difference}`);
            });
            
            // **Mettre à jour la configuration**
            config.bonusApplique = nouveauBonus;
        }
    });
    
    // **Appliquer les changements**
    if (Object.keys(updateData).length > 0) {
        await actor.setFlag("alyria", "majeureAuxMineuresApplied", bonusConfigs);
        await actor.update(updateData);
        console.log("✅ Bonus de majeures aux mineures recalculés");
    }
}
// **AJOUT : Gestion du talent Spécialiste dans talentFonctions.js**
static async appliquerSpecialiste(actor, talentData) {
    console.log("🎯 Application du talent Spécialiste");
    
    // **Récupérer les stats mineures > 50**
    const availableStats = [];
    const attributsMineurs = [
        "monde", "mystique", "nature", "sacré", "robustesse", "calme",
        "marchandage", "persuasion", "artmusique", "commandement", "acrobatie",
        "discretion", "adresse", "artisanat", "hasard", "athlétisme",
        "puissance", "intimidation", "perception", "perceptionmagique", "medecine",
        "intuition"
    ];
    
    attributsMineurs.forEach(stat => {
        const statValue = actor.system.mineures[stat]?.totale || 0;
        if (statValue > 50) {
            availableStats.push({
                key: stat,
                label: TalentFonctions._getMinorStatLabel(stat),
                value: statValue
            });
        }
    });
    
    if (availableStats.length < 2) {
        ui.notifications.error("Vous devez avoir au moins 2 statistiques mineures > 50 pour choisir ce talent !");
        return false;
    }
    
    // **Dialogue de sélection**
    const selectedStats = await TalentFonctions._showSpecialisteDialog(availableStats);
    
    if (!selectedStats || selectedStats.length !== 2) {
        ui.notifications.info("Sélection annulée");
        return false;
    }
    
    // **Créer le talent conditionnel**
    const conditionalTalent = {
        nom: "Spécialiste",
        caracteristiques: selectedStats,
        bonus: "Avantage",
        condition: `Stats ${selectedStats.join(' et ')} > 50`,
        description: `Avantage sur les jets de ${selectedStats.map(s => TalentFonctions._getMinorStatLabel(s)).join(' et ')}`
    };
    
    // **Sauvegarder le talent conditionnel**
    const existingConditionalTalents = actor.getFlag("alyria", "conditionalTalents") || [];
    existingConditionalTalents.push(conditionalTalent);
    
    await actor.setFlag("alyria", "conditionalTalents", existingConditionalTalents);
    
    ui.notifications.info(`Talent Spécialiste configuré pour ${selectedStats.map(s => TalentFonctions._getMinorStatLabel(s)).join(' et ')} !`);
    return true;
}
// **HELPER : Dialogue de sélection pour Spécialiste**
static async _showSpecialisteDialog(availableStats) {
    const content = `
        <form class="specialiste-form">
            <h3>🎯 Talent Spécialiste</h3>
            <p>Choisissez <strong>2 statistiques mineures</strong> pour lesquelles vous aurez un avantage sur les jets :</p>
            
            <div class="stats-selection">
                ${availableStats.map(stat => `
                    <div class="stat-option">
                        <input type="checkbox" name="selectedStats" value="${stat.key}" id="stat_${stat.key}">
                        <label for="stat_${stat.key}">
                            <strong>${stat.label}</strong> (${stat.value})
                        </label>
                    </div>
                `).join('')}
            </div>
            
            <div class="selection-counter">
                <p>Sélectionnées : <span id="selected-count">0</span> / 2</p>
            </div>
        </form>
        
        <style>
            .specialiste-form { padding: 15px; }
            .stats-selection { max-height: 300px; overflow-y: auto; margin: 15px 0; }
            .stat-option { 
                margin: 8px 0; 
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .stat-option:hover { background: rgba(0,0,0,0.05); }
            .stat-option input:checked + label { font-weight: bold; color: #4CAF50; }
            .selection-counter { 
                background: rgba(0,0,0,0.05); 
                padding: 10px; 
                border-radius: 4px; 
                text-align: center;
            }
            #selected-count { font-weight: bold; color: #2196F3; }
        </style>
    `;
    
    return new Promise(resolve => {
        new Dialog({
            title: "Talent Spécialiste",
            content: content,
            buttons: {
                confirm: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Confirmer",
                    callback: (html) => {
                        const selected = [];
                        html.find('input[name="selectedStats"]:checked').each(function() {
                            selected.push(this.value);
                        });
                        resolve(selected.length === 2 ? selected : null);
                    }
                },
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Annuler",
                    callback: () => resolve(null)
                }
            },
            render: (html) => {
                // **Limiter la sélection à 2**
                html.find('input[name="selectedStats"]').on('change', function() {
                    const checked = html.find('input[name="selectedStats"]:checked');
                    const count = checked.length;
                    
                    html.find('#selected-count').text(count);
                    
                    if (count >= 2) {
                        html.find('input[name="selectedStats"]:not(:checked)').prop('disabled', true);
                    } else {
                        html.find('input[name="selectedStats"]').prop('disabled', false);
                    }
                    
                    // **Activer/désactiver le bouton confirmer**
                    const confirmBtn = html.find('.dialog-button.confirm');
                    if (count === 2) {
                        confirmBtn.prop('disabled', false);
                    } else {
                        confirmBtn.prop('disabled', true);
                    }
                });
                
                // **Désactiver le bouton confirmer au début**
                html.find('.dialog-button.confirm').prop('disabled', true);
            },
            default: "confirm"
        }).render(true);
    });
}
// **HELPER : Labels des stats mineures**
static _getMinorStatLabel(stat) {
    const labels = {
        "monde": "Connaissance du Monde",
        "mystique": "Connaissance Mystique", 
        "nature": "Connaissance Nature",
        "sacré": "Connaissance Sacrée",
        "robustesse": "Robustesse",
        "calme": "Calme",
        "marchandage": "Marchandage",
        "persuasion": "Persuader/Tromper",
        "artmusique": "Art et Musique",
        "commandement": "Commandement",
        "acrobatie": "Acrobatie",
        "discretion": "Discrétion",
        "adresse": "Adresse",
        "artisanat": "Artisanat",
        "hasard": "Hasard",
        "athlétisme": "Athlétisme",
        "puissance": "Puissance",
        "intimidation": "Intimidation",
        "perception": "Perception",
        "perceptionmagique": "Perception Magique",
        "medecine": "Médecine",
        "intuition": "Intuition"
    };
    
    return labels[stat] || stat;
}

// **CORRECTION : Dans talentFonctions.js - Ajouter le cas Spécialiste**
static async appliquerTalent(actor, talentData, talentName) {
    if (!talentData || !talentData.fonction) {
        console.warn("❌ Données de talent invalides:", talentName);
        return false;
    }

    console.log(`🎯 Application du talent: ${talentName}`, talentData);

    try {
        switch (talentData.fonction) {
            case "ajoutDirectCaracteristique":
                return await TalentFonctions.ajoutDirectCaracteristique(actor, talentData.effets, talentName);
                
            case "bonusIndirectCaracteristique":
                return await TalentFonctions.bonusIndirectCaracteristique(actor, talentData.parametres, talentName);
                
            case "repartitionCaracteristiquesMineures":
                return await TalentFonctions.repartitionCaracteristiquesMineures(actor, talentData.effets, talentName);
                
            case "ajoutMajeureAuxMineures":
                return await TalentFonctions.ajoutMajeureAuxMineures(actor, talentData.parametres, talentName);
                
            case "bonusDirectPlusConditionnel":
                return await TalentFonctions.bonusDirectPlusConditionnel(actor, talentData.effets || talentData.parametres, talentName);
                
            // **NOUVEAU : Gestion spéciale pour Spécialiste**
            case "specialiste":
                return await TalentFonctions.appliquerSpecialiste(actor, talentData);
                
            default:
                // **FALLBACK : Tentative d'application par nom de talent**
                if (talentName.toLowerCase() === "spécialiste" || talentName.toLowerCase() === "specialiste") {
                    return await TalentFonctions.appliquerSpecialiste(actor, talentData);
                }
                
                console.warn(`⚠️ Fonction de talent non reconnue: ${talentData.fonction} pour ${talentName}`);
                return false;
        }
    } catch (error) {
        console.error(`❌ Erreur lors de l'application du talent ${talentName}:`, error);
        return false;
    }
}

}

