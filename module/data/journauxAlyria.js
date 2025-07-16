export class JournauxAlyria {
    
    static async init() {
        console.log("📖 Initialisation des journaux d'Alyria");
        
        // Attendre que Foundry soit prêt
        Hooks.once('ready', async () => {
            await this.createDefaultJournals();
            
            // **NOUVEAU : Forcer l'application du style parchemin après création**
            setTimeout(() => {
                this.applyParchmentToExistingJournals();
            }, 1000);
        });
    }
    
    /**
     * **NOUVELLE MÉTHODE : Appliquer le style parchemin aux journaux existants**
     */
    static applyParchmentToExistingJournals() {
        console.log("🗞️ Application du style parchemin aux journaux Alyria existants");
        
        // Trouver tous les journaux Alyria
        const alyriaJournals = game.journal.filter(j => {
            const folder = j.folder;
            return folder && (
                folder.name === "Alyria - Lore" ||
                (folder.folder && folder.folder.name === "Alyria - Lore")
            );
        });
        
        console.log(`📚 ${alyriaJournals.length} journaux Alyria trouvés`);
        
        // Marquer ces journaux pour le style parchemin
        alyriaJournals.forEach(journal => {
            if (!journal.getFlag("alyria", "parchmentStyle")) {
                journal.setFlag("alyria", "parchmentStyle", true);
                console.log(`✅ Journal "${journal.name}" marqué pour style parchemin`);
            }
        });
    }
    
    /**
     * Créer tous les journaux par défaut
     */
    static async createDefaultJournals() {
        console.log("📚 Création des journaux par défaut...");
        
        // **ÉTAPE 1 : Créer le dossier principal**
        let alyriaFolder = game.folders.find(f => f.name === "Alyria - Lore" && f.type === "JournalEntry");
        if (!alyriaFolder) {
            try {
                alyriaFolder = await Folder.create({
                    name: "Alyria - Lore",
                    type: "JournalEntry",
                    color: "#8b4513",
                    sort: 0
                });
                console.log("📁 Dossier 'Alyria - Lore' créé");
            } catch (error) {
                console.error("❌ Erreur création dossier Alyria - Lore:", error);
                return;
            }
        }
        
        // **ÉTAPE 2 : Créer les sous-dossiers**
        const subFolders = await this.createSubFolders(alyriaFolder);
        
        // **ÉTAPE 3 : Créer tous les journaux**
        const journalsToCreate = await this.getJournalDefinitions(); // AJOUT DU AWAIT ICI
        let createdCount = 0;
        let existingCount = 0;
        
        for (const journalDef of journalsToCreate) {
            const existingJournal = game.journal.find(j => j.name === journalDef.name);
            
            if (!existingJournal) {
                try {
                    const folderToUse = subFolders[journalDef.folder] || alyriaFolder;
                    
                    const journalData = {
                        name: journalDef.name,
                        folder: folderToUse.id,
                        pages: [{
                            name: journalDef.name,
                            type: "text",
                            text: {
                                content: journalDef.content,
                                format: 1 // HTML
                            }
                        }],
                        // **NOUVEAU : Marquer directement pour le style parchemin**
                        flags: {
                            alyria: {
                                parchmentStyle: true
                            }
                        }
                    };
                    
                    await JournalEntry.create(journalData);
                    console.log(`✅ Journal créé: "${journalDef.name}"`);
                    createdCount++;
                    
                } catch (error) {
                    console.error(`❌ Erreur création journal "${journalDef.name}":`, error);
                }
            } else {
                // **NOUVEAU : Marquer les journaux existants**
                if (!existingJournal.getFlag("alyria", "parchmentStyle")) {
                    await existingJournal.setFlag("alyria", "parchmentStyle", true);
                }
                
                existingCount++;
            }
        }
        
        // **RÉSUMÉ**
        console.log(`📊 Résumé création journaux:`);
        console.log(`   - Créés: ${createdCount}`);
        console.log(`   - Existants: ${existingCount}`);
        console.log(`   - Total: ${journalsToCreate.length}`);
        
        if (createdCount > 0) {
            ui.notifications.success(`${createdCount} nouveaux journaux créés !`);
        }
    }
    
    /**
     * Obtenir la couleur d'un dossier selon son nom
     */
    static getFolderColor(folderName) {
        const colors = {
            "Races": "#ff6b35",
            "Lieux": "#4ecdc4", 
            "Histoire": "#45b7d1",
            "Divinités": "#f9ca24",
            "Organisations": "#6c5ce7",
            "Voies": "#9b59b6",
            "Arcanes": "#e74c3c"
        };
        return colors[folderName] || "#8b4513";
    }

    /**
     * Générateur de contenu pour les races depuis AlyriaRace.js
     */
    static generateRaceContent(raceData) {
        const descriptions = Array.isArray(raceData.description) 
            ? raceData.description.map(desc => `<p>${desc}</p>`).join('\n')
            : `<p>${raceData.description}</p>`;

        // Gestion des talents multiples (comme pour les Néréides)
        let talentsHtml = '';
        if (Array.isArray(raceData.talentRace)) {
            talentsHtml = raceData.talentRace.map(talent => `
                <h3>Talent Racial : ${talent.nom}</h3>
                <blockquote>${talent.effet}</blockquote>
            `).join('');
        } else {
            talentsHtml = `
                <h3>Talent Racial : ${raceData.talentRace.nom}</h3>
                <blockquote>${raceData.talentRace.effet}</blockquote>
            `;
        }

        // Génération des bonus de caractéristiques majeures
        const majuresHtml = Object.entries(raceData.majeures)
            .filter(([key, value]) => value !== 0)
            .map(([key, value]) => {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                const sign = value > 0 ? '+' : '';
                return `<li><strong>${capitalizedKey} :</strong> ${sign}${value}</li>`;
            }).join('');

        // Génération des bonus de compétences mineures
        const minureHtml = Object.entries(raceData.mineures)
            .filter(([key, value]) => value !== 0)
            .map(([key, value]) => {
                const competenceNames = {
                    monde: "Connaissance du Monde",
                    mystique: "Connaissance Mystique", 
                    nature: "Connaissance de la Nature",
                    sacré: "Connaissance Sacrée",
                    robustesse: "Robustesse",
                    calme: "Calme",
                    marchandage: "Marchandage",
                    persuasion: "Persuader/Tromper",
                    artmusique: "Art et Musique",
                    commandement: "Commandement",
                    acrobatie: "Acrobatie",
                    discretion: "Discrétion",
                    adresse: "Adresse",
                    artisanat: "Artisanat",
                    hasard: "Hasard",
                    athlétisme: "Athlétisme",
                    puissance: "Puissance",
                    intimidation: "Intimidation",
                    perception: "Perception",
                    perceptionmagique: "Perception Magique",
                    medecine: "Médecine",
                    intuition: "Intuition"
                };
                
                const name = competenceNames[key] || key;
                const sign = value > 0 ? '+' : '';
                return `<li><strong>${name} :</strong> ${sign}${value}</li>`;
            }).join('');

        return `
            <h2>Description</h2>
            ${descriptions}

            <h2>Capacités Raciales</h2>
            ${talentsHtml}

            <h3>Compétence Raciale : ${raceData.competenceRace.nom}</h3>
            <blockquote>${raceData.competenceRace.effet}</blockquote>

            <h2>Bonus Raciaux</h2>
            
            ${majuresHtml ? `
            <h3>Caractéristiques Majeures</h3>
            <ul>${majuresHtml}</ul>
            ` : ''}

            ${minureHtml ? `
            <h3>Compétences Mineures</h3>
            <ul>${minureHtml}</ul>
            ` : ''}

            <hr>
            <p><em>« ${raceData.citation || 'Les traditions de ce peuple restent à découvrir.'} »</em></p>
        `;
    }

    /**
     * Générateur de contenu pour les voies
     */
    static generateVoieContent(voieData) {
        // Gestion de la description (array ou string)
        const descriptions = Array.isArray(voieData.description) 
            ? voieData.description.map(desc => `<p>${desc}</p>`).join('\n')
            : `<p>${voieData.description}</p>`;

        // Génération des bonus de caractéristiques majeures
        const majuresHtml = Object.entries(voieData.majeures || {})
            .filter(([key, value]) => value !== 0)
            .map(([key, value]) => {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                const sign = value > 0 ? '+' : '';
                return `<li><strong>${capitalizedKey} :</strong> ${sign}${value}</li>`;
            }).join('');

        // Génération des bonus de compétences mineures
        const minuresHtml = Object.entries(voieData.mineures || {})
            .filter(([key, value]) => value !== 0)
            .map(([key, value]) => {
                const competenceNames = {
                    monde: "Connaissance du Monde",
                    mystique: "Connaissance Mystique", 
                    nature: "Connaissance de la Nature",
                    sacré: "Connaissance Sacrée",
                    robustesse: "Robustesse",
                    calme: "Calme",
                    marchandage: "Marchandage",
                    persuasion: "Persuader/Tromper",
                    artmusique: "Art et Musique",
                    commandement: "Commandement",
                    acrobatie: "Acrobatie",
                    discretion: "Discrétion",
                    adresse: "Adresse",
                    artisanat: "Artisanat",
                    hasard: "Hasard",
                    athletisme: "Athlétisme",
                    puissance: "Puissance",
                    intimidation: "Intimidation",
                    perception: "Perception",
                    perceptionmagique: "Perception Magique",
                    medecine: "Médecine",
                    intuition: "Intuition"
                };
                
                const name = competenceNames[key] || key;
                const sign = value > 0 ? '+' : '';
                return `<li><strong>${name} :</strong> ${sign}${value}</li>`;
            }).join('');

        // Génération des mécaniques
        const mecaniquesHtml = Array.isArray(voieData.mecanique) 
            ? voieData.mecanique.map(meca => `<li>${meca}</li>`).join('')
            : '';

        // Génération des talents de voie
        let talentsHtml = '';
        if (voieData.talentVoie && voieData.talentVoie.talents) {
            talentsHtml = voieData.talentVoie.talents.map(talent => `
                <h4>${talent.nom} (Niveau Joueur ${talent.niveauJoueur})</h4>
                <blockquote>
                    <p><strong>Description :</strong> ${talent.description}</p>
                    ${talent.prerequis && talent.prerequis.length > 0 ? 
                        `<p><strong>Prérequis :</strong> ${talent.prerequis.join(', ')}</p>` : ''}
                    ${talent.effet && Object.keys(talent.effet).length > 0 ? 
                        `<p><strong>Effet :</strong> ${JSON.stringify(talent.effet)}</p>` : ''}
                </blockquote>
            `).join('');
        }

        // Génération des sorts de voie
        let sortsHtml = '';
        if (voieData.sortVoie && voieData.sortVoie.sorts) {
            sortsHtml = voieData.sortVoie.sorts.map(sort => `
                <h4>${sort.nom} (Niveau ${sort.niveau})</h4>
                <blockquote>
                    <p><strong>Description :</strong> ${sort.description}</p>
                    <p><strong>Coût :</strong> ${sort.cout}</p>
                    <p><strong>Portée :</strong> ${sort.portee}</p>
                    <p><strong>Durée :</strong> ${sort.duree}</p>
                    <p><strong>Effet :</strong> ${sort.effet}</p>
                </blockquote>
            `).join('');
        }

        return `
            <h2>Description</h2>
            ${descriptions}

            ${mecaniquesHtml ? `
            <h2>Mécaniques Spéciales</h2>
            <ul>${mecaniquesHtml}</ul>
            ` : ''}

            <h2>Bonus de la Voie</h2>
            
            ${majuresHtml ? `
            <h3>Caractéristiques Majeures</h3>
            <ul>${majuresHtml}</ul>
            ` : ''}

            ${minuresHtml ? `
            <h3>Compétences Mineures</h3>
            <ul>${minuresHtml}</ul>
            ` : ''}

            ${talentsHtml ? `
            <h2>Talents de Voie</h2>
            ${talentsHtml}
            ` : ''}

            ${sortsHtml ? `
            <h2>Sorts de Voie</h2>
            ${sortsHtml}
            ` : ''}

            <hr>
            <p><em>« ${voieData.citation || 'Les secrets de cette voie restent à découvrir.'} »</em></p>
        `;
    }

    /**
     * Générateur de contenu pour les arcanes
     */
    static generateArcaneContent(arcaneData) {
        // SUPPRESSION de la ligne problématique qui redéfinit arcane
        // const arcane = AlyriaArcane.getArcane(arcane.nom); // CETTE LIGNE ÉTAIT LE PROBLÈME
        
        // Gestion de la description (array ou string)
        const descriptions = Array.isArray(arcaneData.description) 
            ? arcaneData.description.map(desc => `<p>${desc}</p>`).join('\n')
            : `<p>${arcaneData.description}</p>`;

        // Génération des mécaniques
        const mecaniquesHtml = Array.isArray(arcaneData.mecanique) 
            ? arcaneData.mecanique.map(meca => `<li>${meca}</li>`).join('')
            : '';

        // Génération des talents d'arcane
        let talentsHtml = '';
        if (arcaneData.talentArcane && arcaneData.talentArcane.talents) {
            talentsHtml = arcaneData.talentArcane.talents.map(talent => `
                <h4>${talent.nom} (Niveau Joueur ${talent.niveauJoueur})</h4>
                <blockquote>
                    <p><strong>Description :</strong> ${talent.description}</p>
                    ${talent.prerequis && talent.prerequis.length > 0 ? 
                        `<p><strong>Prérequis :</strong> ${talent.prerequis.join(', ')}</p>` : ''}
                    ${talent.effet && Object.keys(talent.effet).length > 0 ? 
                        `<p><strong>Effet :</strong> ${JSON.stringify(talent.effet)}</p>` : ''}
                </blockquote>
            `).join('');
        }

        // Génération des sorts d'arcane
        let sortsHtml = '';
        if (arcaneData.sortArcane && arcaneData.sortArcane.sorts) {
            sortsHtml = arcaneData.sortArcane.sorts.map(sort => `
                <h4>${sort.nom} (Cercle ${sort.cercle})</h4>
                <blockquote>
                    <p><strong>Description :</strong> ${sort.description}</p>
                    <p><strong>Coût PSY :</strong> ${sort.cout}</p>
                    <p><strong>Portée :</strong> ${sort.portee}</p>
                    <p><strong>Durée :</strong> ${sort.duree}</p>
                    <p><strong>Composantes :</strong> ${sort.composantes}</p>
                    <p><strong>Effet :</strong> ${sort.effet}</p>
                </blockquote>
            `).join('');
        }

        return `
            <h2>Description</h2>
            ${descriptions}

             ${mecaniquesHtml ? `
            <h3>Mécaniques Spéciales</h3>
            <ul>${mecaniquesHtml}</ul>
            ` : ''}

             <h2>Bonus de l'Arcane</h2>
            <h3>Bonus aux Caractéristiques</h3>
            <p><strong>Majeurs :</strong> ${arcaneData.majeures}</p>
            <p><strong>Mineurs :</strong> ${arcaneData.mineures}</p>


            <h2>Talents d'Arcane</h2>
            ${talentsHtml}

                      
            ${sortsHtml ? `
            <h2>Sorts d'Arcane</h2>
            ${sortsHtml}
            ` : ''}

            <hr>
            <p><em>« ${arcaneData.citation || 'Les mystères de cet arcane restent à découvrir.'} »</em></p>
        `;
    }

    /**
     * Créer des journaux depuis des données importées
     */
    static async createJournalsFromData(dataObject, folder, contentGenerator) {
        const journals = [];
        
        // Si les fichiers de données existent, les utiliser
        try {
            if (dataObject && Object.keys(dataObject).length > 0) {
                for (const [key, data] of Object.entries(dataObject)) {
                    journals.push({
                        name: data.nom || data.name || key,
                        folder: folder,
                        content: contentGenerator(data)
                    });
                }
            }
        } catch (error) {
            console.warn(`Erreur lors du traitement des données pour ${folder}:`, error);
        }
        
        return journals;
    }

    /**
     * Mettre à jour les sous-dossiers avec les nouveaux types
     */
    static async createSubFolders(parentFolder) {
        const folders = {};
        const subFolderNames = ["Races", "Lieux", "Histoire", "Divinités", "Organisations", "Voies", "Arcanes"];
        
        for (const folderName of subFolderNames) {
            let existingFolder = game.folders.find(f => 
                f.name === folderName && 
                f.type === "JournalEntry" && 
                f.folder?.id === parentFolder.id
            );
            
            if (!existingFolder) {
                try {
                    existingFolder = await Folder.create({
                        name: folderName,
                        type: "JournalEntry",
                        folder: parentFolder.id,
                        color: this.getFolderColor(folderName),
                        sort: subFolderNames.indexOf(folderName)
                    });
                    console.log(`📁 Sous-dossier créé: ${folderName}`);
                } catch (error) {
                    console.error(`❌ Erreur création sous-dossier ${folderName}:`, error);
                    continue;
                }
            }
            folders[folderName] = existingFolder;
        }
        
        return folders;
    }
    
    /**
     * Définir tous les journaux à créer
     */
    static async getJournalDefinitions() {
        let generatedJournals = [];

        // **GÉNÉRER LES RACES DEPUIS AlyriaRaces**
        try {
            const { AlyriaRaces } = await import('./AlyriaRace.js');
            const raceJournals = await this.createJournalsFromData(
                AlyriaRaces, 
                "Races", 
                this.generateRaceContent
            );
            generatedJournals.push(...raceJournals);
            console.log(`✅ ${raceJournals.length} races générées depuis AlyriaRace.js`);
        } catch (error) {
            console.warn("⚠️ Impossible de charger AlyriaRace.js:", error);
        }

        // **GÉNÉRER LES VOIES DEPUIS AlyriaVoies**
        try {
            const { AlyriaVoies } = await import('./AlyriaVoies.js');
            if (AlyriaVoies && Object.keys(AlyriaVoies).length > 0) {
                const voieJournals = await this.createJournalsFromData(
                    AlyriaVoies, 
                    "Voies", 
                    this.generateVoieContent
                );
                generatedJournals.push(...voieJournals);
                console.log(`✅ ${voieJournals.length} voies générées depuis AlyriaVoies.js`);
            }
        } catch (error) {
            console.warn("⚠️ Erreur lors du chargement des voies:", error);
        }

        // **GÉNÉRER LES ARCANES DEPUIS AlyriaArcanes**
        try {
            const { AlyriaArcane } = await import('./AlyriaArcanes.js');
            if (AlyriaArcane && Object.keys(AlyriaArcane).length > 0) {
                const arcaneJournals = await this.createJournalsFromData(
                    AlyriaArcane, 
                    "Arcanes", 
                    this.generateArcaneContent
                );
                generatedJournals.push(...arcaneJournals);
                console.log(`✅ ${arcaneJournals.length} arcanes générés depuis AlyriaArcanes.js`);
            }
        } catch (error) {
            console.warn("⚠️ AlyriaArcanes.js vide ou inexistant");
        }

        // **JOURNAUX MANUELS EXISTANTS**
        const manualJournals = [
            {
                name: "Bienvenue à Alyria",
                folder: "Histoire",
                content: `
                    <h1>Bienvenue dans les Chroniques d'Alyria</h1>
                    
                    <p>Bienvenue, aventurier, dans le monde fantastique d'Alyria !</p>
                    
                    <h2>Qu'est-ce qu'Alyria ?</h2>
                    <p>Alyria est un monde de fantasy où magie, politique et aventure se mélangent dans un univers riche et complexe.</p>
                    
                    <h2>Navigation</h2>
                    <p>Ce compendium contient toutes les informations nécessaires pour comprendre le monde :</p>
                    <ul>
                    <li><strong>Races :</strong> Descriptions des différentes races jouables</li>
                    <li><strong>Lieux :</strong> Géographie et villes importantes</li>
                    <li><strong>Histoire :</strong> Chronologie des événements marquants</li>
                    <li><strong>Divinités :</strong> Panthéon et religions</li>
                    <li><strong>Organizations :</strong> Guildes, ordres et factions</li>
                    <li><strong>Voies :</strong> Chemins de développement des personnages</li>
                    <li><strong>Arcanes :</strong> Arts magiques et sortilèges</li>
                    </ul>
                    
                    <p><em>Bonne exploration !</em></p>
                `
            }
        ];

        return [...generatedJournals, ...manualJournals];
    }
}