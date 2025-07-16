Hooks.once("ready", async () => {
  // Ne joue la vidéo qu'une fois par session/utilisateur
  if (await game.user.getFlag("alyria", "introPlayed")) return;

  // Crée un overlay plein écran
  const videoOverlay = document.createElement("div");
  videoOverlay.id = "alyria-intro-video-overlay";
  videoOverlay.style.position = "fixed";
  videoOverlay.style.top = "0";
  videoOverlay.style.left = "0";
  videoOverlay.style.width = "100vw";
  videoOverlay.style.height = "100vh";
  videoOverlay.style.background = "black";
  videoOverlay.style.zIndex = "99999";
  videoOverlay.style.display = "flex";
  videoOverlay.style.alignItems = "center";
  videoOverlay.style.justifyContent = "center";

  // Crée la vidéo
  const video = document.createElement("video");
  video.src = "systems/alyria/module/data/video/intro.mp4";
  video.autoplay = true;
  video.controls = false;
  video.style.width = "100vw";
  video.style.height = "100vh";
  video.style.objectFit = "cover";
  video.style.background = "black";

  videoOverlay.appendChild(video);
  document.body.appendChild(videoOverlay);

  // Quand la vidéo se termine, retire l'overlay et va à la page d'accueil
  video.onended = async () => {
    videoOverlay.remove();
    await game.user.setFlag("alyria", "introPlayed", true);
    // Redirige vers la page d'accueil (chat par défaut)
    if (ui.sidebar) ui.sidebar.activateTab("chat");
  };

  // Permettre de skipper la vidéo au clic
  videoOverlay.addEventListener("click", async () => {
    video.pause();
    videoOverlay.remove();
    await game.user.setFlag("alyria", "introPlayed", true);
    if (ui.sidebar) ui.sidebar.activateTab("chat");
  });
});