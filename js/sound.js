export function sound() {
    sound = document.createElement("audio");
    sound.src = './music/crunch.wav';
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    this.play = () => {
        sound.play();
    }
    this.stop = () => {
        sound.pause();
    }
}