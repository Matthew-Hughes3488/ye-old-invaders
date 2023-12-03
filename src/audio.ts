class GameAudio {
  private audioElement: HTMLAudioElement;
  private audioIntervalId?: number;
  private audioVolume: number = 1;

  constructor(audioSrc: string) {
    this.audioElement = this.createAudioHTML(audioSrc);
    this.addToHTML();
  }

  private createAudioHTML(audioSrc: string): HTMLAudioElement {
    const audioElement = document.createElement("audio");
    audioElement.src = audioSrc;
    return audioElement;
  }

  private addToHTML() {
    document.body.appendChild(this.audioElement);
  }

  public playAudio(intervalNumber: number = 0) {
    this.audioElement.volume = this.audioVolume;
    this.audioElement.play();
  }

  public stopAudio() {
    this.audioElement.pause();
  }

  public setAudioVolume(volume: number) {
    this.audioVolume = volume;
  }

  public startAudioInterval(intervalNumber: number) {}

  public stopAudioInterval() {}
}
