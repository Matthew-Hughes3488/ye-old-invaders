class GameAudio {
  private audioElement: HTMLAudioElement;
  private audioVolume: number;
  private audioIntervalId?: number = undefined;

  constructor(audioSrc: string, volume: number = 1) {
    this.audioElement = this.createAudioHTML(audioSrc);
    this.audioVolume = volume;
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

  public playAudio() {
    this.audioElement.currentTime = 0;
    this.audioElement.volume = this.audioVolume;
    this.audioElement.play();
  }

  public stopAudio() {
    this.audioElement.pause();
  }

  public setAudioVolume(volume: number) {
    this.audioVolume = volume;
  }

  public startAudioInterval(intervalNumber: number) {
    if (this.audioIntervalId === undefined) {
      this.audioIntervalId = setInterval(() => {
        this.playAudio();
      }, intervalNumber);
    }
  }

  public stopAudioInterval() {
    if (this.audioIntervalId !== undefined) {
        clearInterval(this.audioIntervalId);
        this.audioIntervalId = undefined;
    }
  }
}

export default GameAudio;

