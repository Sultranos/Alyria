export class ParcheminJournal {
    
    static init() {
        console.log("🗞️ Initialisation du système de parchemins pour les journaux");
        
        // Injecter les styles CSS dans le document
        this.injectStyles();
        
        // **CORRECTION : Attendre que Foundry soit prêt avant de modifier les journaux**
        Hooks.once('ready', () => {
            this.transformJournalEntries();
        });
        
        // Intercepter l'ouverture des journaux pour appliquer le style parchemin
        Hooks.on('renderJournalSheet', (app, html, data) => {
            // **NOUVEAU : Vérifier si c'est un journal Alyria**
            if (this.isAlyriaJournal(app.document)) {
                console.log("🗞️ Journal Alyria détecté, application du style parchemin...");
                setTimeout(() => {
                    this.applyParchmentStyle(html);
                }, 100);
            }
        });
    }
    
    /**
     * **NOUVELLE MÉTHODE : Vérifier si c'est un journal Alyria**
     */
    static isAlyriaJournal(journal) {
        // Vérifier le flag
        if (journal.getFlag("alyria", "parchmentStyle")) {
            console.log(`✅ Journal "${journal.name}" a le flag parchemin`);
            return true;
        }
        
        // Vérifier le dossier
        const folder = journal.folder;
        if (folder) {
            if (folder.name === "Alyria - Lore") {
                console.log(`✅ Journal "${journal.name}" dans dossier Alyria - Lore`);
                return true;
            }
            if (folder.folder && folder.folder.name === "Alyria - Lore") {
                console.log(`✅ Journal "${journal.name}" dans sous-dossier d'Alyria - Lore`);
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Injecter les styles CSS pour les parchemins
     */
    static injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* **STYLES PARCHEMIN POUR LES JOURNAUX** */
            .parchment-journal {
                background: none !important;
                border: none !important;
                position: relative;
                padding: 0 !important;
                overflow: visible !important;
            }
            
            .parchment-container {
                display: flex;
                min-height: 600px;
                position: relative;
                margin: 0;
                width: 100%;
            }
            
            .parchment-left {
                background-image: url('systems/alyria/module/data/images/icones/ParcheminGauche.png');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                width: 40px;
                min-height: 100%;
                flex-shrink: 0;
                z-index: 2;
            }
            
            .parchment-center {
                background-image: url('systems/alyria/module/data/images/icones/ParcheminCentre.png');
                background-repeat: repeat-x;
                background-size: 100% 100%;
                flex-grow: 1;
                min-height: 100%;
                padding: 40px 30px;
                position: relative;
                z-index: 1;
            }
            
            .parchment-right {
                background-image: url('systems/alyria/module/data/images/icones/ParcheminDroite.png');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                width: 40px;
                min-height: 100%;
                flex-shrink: 0;
                z-index: 2;
            }
            
            /* **CONTENU DU PARCHEMIN** */
            .parchment-content {
                color: #2c1810 !important;
                font-family: 'Cinzel', 'Georgia', serif !important;
                line-height: 1.6;
                text-align: justify;
                position: relative;
                z-index: 3;
                background: transparent !important;
            }
            
            .parchment-content h1,
            .parchment-content h2,
            .parchment-content h3,
            .parchment-content h4 {
                color: #8b4513 !important;
                text-align: center;
                margin: 20px 0 15px 0;
                text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.3);
                font-weight: bold;
            }
            
            .parchment-content h1 {
                font-size: 24px !important;
                border-bottom: 2px solid #8b4513;
                padding-bottom: 10px;
            }
            
            .parchment-content h2 {
                font-size: 20px !important;
            }
            
            .parchment-content h3 {
                font-size: 18px !important;
            }
            
            .parchment-content p {
                margin: 12px 0;
                text-indent: 20px;
                color: #2c1810 !important;
            }
            
            .parchment-content blockquote {
                border-left: 3px solid #8b4513 !important;
                padding-left: 15px;
                margin: 15px 0;
                font-style: italic;
                background: rgba(139, 69, 19, 0.05) !important;
                padding: 10px 15px;
                border-radius: 0 5px 5px 0;
            }
            
            .parchment-content ul, .parchment-content ol {
                color: #2c1810 !important;
            }
            
            .parchment-content li {
                color: #2c1810 !important;
                margin: 5px 0;
            }
            
            .parchment-content strong {
                color: #8b4513 !important;
            }
            
            .parchment-content em {
                color: #654321 !important;
            }
            
            /* **ANIMATION D'OUVERTURE** */
            .parchment-container {
                animation: unfurlParchment 1.2s ease-out forwards;
                transform-origin: top center;
            }
            
            @keyframes unfurlParchment {
                0% {
                    transform: scaleY(0.1) rotateX(90deg);
                    opacity: 0;
                }
                30% {
                    transform: scaleY(0.3) rotateX(60deg);
                    opacity: 0.3;
                }
                60% {
                    transform: scaleY(0.7) rotateX(20deg);
                    opacity: 0.7;
                }
                100% {
                    transform: scaleY(1) rotateX(0deg);
                    opacity: 1;
                }
            }
            
            /* **EFFET DE SURVOL** */
            .parchment-container:hover {
                filter: brightness(1.05) contrast(1.02);
                transition: filter 0.3s ease;
            }
            
            /* **MASQUER LES ÉLÉMENTS FOUNDRY POUR LE PARCHEMIN** */
            .parchment-journal .journal-entry-content {
                background: transparent !important;
                padding: 0 !important;
            }
            
            .parchment-journal .journal-entry-pages {
                background: transparent !important;
                padding: 0 !important;
            }
            
            .parchment-journal .journal-entry-page {
                background: transparent !important;
                padding: 0 !important;
                border: none !important;
            }
            
            .parchment-journal .journal-page-content {
                background: transparent !important;
                padding: 0 !important;
            }
            
            .parchment-journal .journal-page-header {
                display: none !important;
            }
            
            /* **ADAPTATION RESPONSIVE** */
            @media (max-width: 768px) {
                .parchment-left,
                .parchment-right {
                    width: 25px;
                }
                
                .parchment-center {
                    padding: 25px 15px;
                }
                
                .parchment-content {
                    font-size: 14px;
                }
                
                .parchment-content h1 {
                    font-size: 20px !important;
                }
                
                .parchment-content h2 {
                    font-size: 18px !important;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log("✅ Styles parchemin injectés");
    }
    
    /**
     * Transformer les entrées de journal en parchemins
     */
    static transformJournalEntries() {
        // Observer les changements dans le DOM pour capturer les nouveaux journaux
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const journalSheets = node.querySelectorAll('.journal-sheet');
                        journalSheets.forEach(sheet => {
                            if (!sheet.classList.contains('parchment-processed')) {
                                // Attendre un peu que le journal soit complètement rendu
                                setTimeout(() => {
                                    this.applyParchmentStyle($(sheet));
                                }, 200);
                            }
                        });
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    /**
     * Appliquer le style parchemin à une feuille de journal
     */
    static applyParchmentStyle(html) {
        console.log("🗞️ Application du style parchemin à un journal Alyria");
        
        // Marquer comme traité pour éviter les doublons
        html.addClass('parchment-processed parchment-journal');
        
        // **NOUVEAU : Trouver le contenu principal selon la nouvelle structure Foundry v12/v13**
        const content = html.find('.journal-page-content, .journal-entry-content .journal-entry-pages');
        
        if (content.length === 0) {
            console.warn("❌ Impossible de trouver le contenu du journal");
            console.log("Structure HTML trouvée:", html.find('.journal-entry-content').length, "éléments journal-entry-content");
            console.log("Structure HTML trouvée:", html.find('.journal-page-content').length, "éléments journal-page-content");
            return;
        }
        
        console.log(`✅ Contenu trouvé: ${content.length} éléments`);
        
        // Prendre le premier élément de contenu
        const targetContent = content.first();
        
        // Sauvegarder le contenu original
        const originalContent = targetContent.html();
        
        if (!originalContent || originalContent.trim() === '') {
            console.warn("❌ Contenu vide trouvé");
            return;
        }
        
        // Créer la structure parchemin
        const parchmentHTML = `
            <div class="parchment-container">
                <div class="parchment-left"></div>
                <div class="parchment-center">
                    <div class="parchment-content">
                        ${originalContent}
                    </div>
                </div>
                <div class="parchment-right"></div>
            </div>
        `;
        
        // Remplacer le contenu
        targetContent.html(parchmentHTML);
        
        // Ajouter des effets spéciaux
        this.addParchmentEffects(html);
        
        console.log("✅ Style parchemin appliqué avec succès");
    }
    
    /**
     * Ajouter des effets spéciaux au parchemin
     */
    static addParchmentEffects(html) {
        const parchmentContainer = html.find('.parchment-container');
        
        if (parchmentContainer.length === 0) return;
        
        // **Effet de son d'ouverture de parchemin**
        this.playParchmentSound();
        
        // **Effet de particules (optionnel)**
        setTimeout(() => {
            this.addDustParticles(parchmentContainer);
        }, 500);
        
        // **Effet de brillance periodique**
        setInterval(() => {
            this.addGlimmerEffect(parchmentContainer);
        }, 8000);
    }
    
    /**
     * Jouer un son d'ouverture de parchemin
     */
    static playParchmentSound() {
        try {
            // Son subtil de papier qui se déplie
            AudioHelper.play({
                src: "sounds/ui/drawcard.wav", // Son Foundry par défaut
                volume: 0.3,
                autoplay: true,
                loop: false
            });
        } catch (error) {
            console.log("🔇 Son parchemin non disponible");
        }
    }
    
    /**
     * Ajouter des particules de poussière
     */
    static addDustParticles(container) {
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = $(`
                <div style="
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(139, 69, 19, 0.4);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10;
                "></div>
            `);
            
            const startX = Math.random() * container.width();
            const startY = container.height() + 10;
            
            particle.css({
                left: startX + 'px',
                top: startY + 'px'
            });
            
            container.append(particle);
            
            // Animation de montée de la particule
            particle.animate({
                top: '-20px',
                opacity: 0
            }, {
                duration: 2000 + Math.random() * 1000,
                easing: 'linear',
                complete: function() {
                    particle.remove();
                }
            });
        }
    }
    
    /**
     * Ajouter un effet de brillance subtil
     */
    static addGlimmerEffect(container) {
        const glimmer = $(`
            <div style="
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg, 
                    transparent, 
                    rgba(255, 215, 0, 0.1), 
                    transparent
                );
                pointer-events: none;
                z-index: 5;
            "></div>
        `);
        
        container.css('position', 'relative').append(glimmer);
        
        glimmer.animate({
            left: '100%'
        }, {
            duration: 1500,
            easing: 'ease-in-out',
            complete: function() {
                glimmer.remove();
            }
        });
    }
    
    /**
     * Méthode utilitaire pour créer un parchemin personnalisé
     */
    static createCustomParchment(title, content, options = {}) {
        const {
            width = 600,
            height = 400,
            showToPlayers = false
        } = options;
        
        const parchmentContent = `
            <div class="parchment-container">
                <div class="parchment-left"></div>
                <div class="parchment-center">
                    <div class="parchment-content">
                        <h1>${title}</h1>
                        ${content}
                    </div>
                </div>
                <div class="parchment-right"></div>
            </div>
        `;
        
        new Dialog({
            title: "📜 " + title,
            content: parchmentContent,
            buttons: {
                close: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Fermer"
                }
            },
            render: (html) => {
                html.addClass('parchment-journal');
                this.addParchmentEffects(html);
            }
        }, {
            width: width,
            height: height,
            classes: ['parchment-journal']
        }).render(true);
        
        // Optionnel : Montrer aux joueurs
        if (showToPlayers && game.user.isGM) {
            game.socket.emit('system.alyria', {
                type: 'showParchment',
                data: { title, content, options }
            });
        }
    }
}

// **AUTO-INITIALISATION - CORRECTION**
Hooks.once('ready', () => {
    ParcheminJournal.init();
});

// **COMMANDES DE CHAT POUR LES MJ**
Hooks.on('chatMessage', (html, content, msg) => {
    if (content.startsWith('/parchemin') && game.user.isGM) {
        const args = content.split(' ');
        const title = args[1] || "Parchemin Mystérieux";
        const text = args.slice(2).join(' ') || "Contenu du parchemin...";
        
        ParcheminJournal.createCustomParchment(title, `<p>${text}</p>`, {
            showToPlayers: true
        });
        
        return false; // Empêcher l'envoi du message de chat
    }
});

console.log("🗞️ Module Parchemin Journal chargé");