import { Component } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { Services } from '../audio.services';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload',
  templateUrl: './upload-audio.component.html',
  styleUrls: ['./upload-audio.component.scss'],
  imports: [NgIf,FormsModule]
})
export class UploadComponent {
  selectedFile: File | undefined;
  uploadMessage = '';
  extension? = '';
  audioList:any= [];
  currentAudio: HTMLAudioElement | null = null;
  
  
  
constructor(private audioServices:Services, private httpClient:HttpClient ){}

  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.extension = this.selectedFile?.name?.split(".").pop();
  if (this.selectedFile && this.extension == "mp3") {
        this.uploadMessage = `${this.selectedFile.name}" uploaded successfully.`;
    }
    else{
      this.uploadMessage = "Please enter the correct file here";
    }

  }
  onUpload() {    
      if (!this.selectedFile) return;
      console.log("file send");
      this.audioServices.uploadAudio(this.selectedFile).subscribe({
      next:(res)=>{
        console.log("Uploaded Successfully", res)
      },
      error:(err) => {
      console.error('Upload error:', err);
      this.uploadMessage = 'Upload failed!';
    }
      })  
  }


}



