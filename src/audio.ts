class GameAudio {
  private audioElement: HTMLAudioElement;
  private audioIntervalId?: number = undefined;
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

  public playAudio() {
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
    if (this.audioIntervalId !== undefined) {
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

type gameAudioType = {
  name : string
  audio : GameAudio
}

export default GameAudio;

