import AlyriaItemSheet from "./sheet/AlyriaItemSheet.js";
import AlyriaActorSheet from "./sheet/AlyriaActorSheet.js";
import AlyriaActor from "./AlyriaActor.js";

Hooks.once("init", () => {
    console.log("Alyria | Initialisation du système Alyria");

    // Register the AlyriaItemSheet
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("alyria", AlyriaItemSheet, { makeDefault: true });

    // Register the AlyriaActorSheet
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("alyria", AlyriaActorSheet, { makeDefault: true });

    // Enregistre la classe d'acteur personnalisée pour le type "Joueur"
    CONFIG.Actor.documentClass = AlyriaActor; 
    
    CONFIG.Actor.Joueur = CONFIG.Actor.Joueur || {};
    CONFIG.Actor.Joueur.documentClass = AlyriaActor;

    console.log("Alyria | Fiches d'acteurs et d'objets enregistrées");
});

Handlebars.registerHelper('includes', function(array, value) {
  return Array.isArray(array) && array.includes(value);
});