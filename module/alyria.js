import AlyriaItemSheet from ".module/sheet/AlyriaItemSheet.js";
import AlyriaActorSheet from ".module/sheet/AlyriaActorSheet.js";

Hooks.once("init", () => {
    console.log("Alyria | Initialisation du système Alyria");

    // Register the AlyriaItemSheet
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("Alyria", AlyriaItemSheet, { makeDefault: true });

    // Register the AlyriaActorSheet
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("Alyria", AlyriaActorSheet, { makeDefault: true });
    console.log("Alyria | Fiches d'acteurs et d'objets enregistrées");
  
}
);