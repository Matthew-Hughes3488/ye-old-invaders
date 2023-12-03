class GameAudio {
  private audioElement: HTMLAudioElement;
  private audioIntervalId?: number;

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
    this.audioElement.play();
  }

  public stopAudio() {
    this.audioElement.pause();
  }

  setAudioVolume(volume: number) {}

  public startAudioInterval(intervalNumber: number) {}

  public stopAudioInterval() {}
}
