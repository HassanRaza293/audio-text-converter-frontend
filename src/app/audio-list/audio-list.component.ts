import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Services } from '../audio.services';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioLyricsComponent } from '../audio-lyrics/audio-lyrics.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-audio-list',
  imports: [NgFor, FormsModule, AudioLyricsComponent],
  templateUrl: './audio-list.component.html',
  styleUrl: './audio-list.component.scss',
})
export class AudioListComponent {
  constructor(
    private audioServices: Services,
    private offcanvasService: NgbOffcanvas,
  ) {}

  selectedFile: File | undefined;
  uploadMessage = '';
  extension? = '';
  audioList: any = [];
  currentAudio?: HTMLAudioElement;
  transcriptSegments: { start: number; end: number; text: string }[] = [];
  currentLine = '';
  isTranscribing = false;
  transcribe:string = '';

  ngOnInit(): void {
    this.loadAudioList();
  }
  playAudio(content: TemplateRef<any>, id:string) {

    this.audioServices.getTranscription(id).subscribe(
      (res:any)=>{
        this.transcribe  = res.transcription;

      }
    );

    this.offcanvasService.open(content, {
    position: 'end',
    backdrop: true,
    scroll: false,
    panelClass: 'lyrics-canvas-panel'

    });
  }

  loadAudioList() {
    return this.audioServices.loadAudioList().subscribe({
      next: (response: any) => {
        ((this.audioList = [...response]), console.log(this.audioList));
      },
    });
  }

  onTimeUpdate(currentTime: number) {
    console.log('Current time:', currentTime);
    const seg = this.transcriptSegments.find(
      (s) => currentTime >= s.start && currentTime < s.end,
    );
    this.currentLine = seg ? seg.text : '';
  }

  onDelete(id: string) {
    return this.audioServices.deleteAudiobyId(id).subscribe({
      next: () => {
        this.loadAudioList();
      },
    });
  }

  close(){
    this.offcanvasService.dismiss();

  }
  }

