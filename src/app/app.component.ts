import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './upload-audio/upload-audio.component';
import { AudioListComponent } from './audio-list/audio-list.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Important for Angular 19
  imports: [
    CommonModule,
    HttpClientModule, // ✅ Add this so services can use HttpClient
    UploadComponent,
    AudioListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // ✅ Correct property name
})
export class AppComponent {
  title = 'audio-text-converter-frontend';
}
