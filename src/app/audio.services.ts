import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({providedIn:'root'})


export class Services{
private apiUrl = 'http://localhost:5000';
audioUrl?:string;
constructor(private httpClient:HttpClient){}

uploadAudio(file:File){
const formData = new FormData();
formData.append('file',file);
return this.httpClient.post(`${this.apiUrl}/upload-audio`, formData);
}

loadAudioList():Observable<any[]>{
console.log("request has been send");     
return this.httpClient.get<any[]>(`${this.apiUrl}/audio-list`); 
}

getAudiobyId(id: string) {
return this.httpClient.get(`${this.apiUrl}/audio/${id}`, {responseType: 'blob'} );
}

deleteAudiobyId(id:string){ 
return this.httpClient.delete(`${this.apiUrl}/delete-audio/${id}`);
}

getTranscription(id:string){
return this.httpClient.post(`${this.apiUrl}/transcribe/${id}`,{});
}

}


