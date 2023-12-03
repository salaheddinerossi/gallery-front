import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Image} from "../../models/Image";
import {Router} from "@angular/router";
import {ImageProperties} from "../../models/ImageProperties";
import {Comparison} from "../../models/Comparison";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient,private router:Router) { }

  private getAuthHeaders(): HttpHeaders {
    const value:string = localStorage.getItem('currentUser') as string;
    const currentUser  = JSON.parse(value);
    const token = currentUser ? currentUser.token : '';
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }
  private baseURL = 'http://localhost:3000/images/';

  createImage(image:Image){
    return this.http.post(`${this.baseURL}upload`, image,{headers:this.getAuthHeaders()}).subscribe(
        data => {
          this.router.navigate([`/theme/${image.themeId}`])
        },
        error => {
          console.error('Error creating image:', error);
        }
    );
  }

  getImagesByTheme(themeId:string){
    return this.http.get(`${this.baseURL}${themeId}`,{headers:this.getAuthHeaders()})
  }

  downloadImage(imageId?: number) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseURL}download/${imageId}`, { headers: headers, responseType: 'blob' })
      .toPromise()
      .then((blob:Blob | any) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const extension = blob.type.split('/')[1];
        a.download = `image.${extension}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('There was an error during the download:', error);
      });


  }

  deleteImage(imageId?:number){
      return this.http.delete(`${this.baseURL}delete/${imageId}`,{headers:this.getAuthHeaders()}).subscribe(response => {
          console.log('Image deleted:', response);
          location.reload();
      }, error => {
          console.error('Error deleting image:', error);
      });
  }

  getImageById(imageId?:string){

      return this.http.get<any>(`${this.baseURL}image/${imageId}`,{headers:this.getAuthHeaders()  })

  }

  updateImage(image:Image){
    return this.http.put(`${this.baseURL}update/${image.id}`,{image},{headers:this.getAuthHeaders()}).subscribe(
        data => {
            this.router.navigate([`/theme/${image.themeId}`])
        },
        error => {
            console.error('Error creating image:', error);
        }
    );
  }

  getImageProperties(imageId?: string | null){
    return this.http.get<ImageProperties>(`${this.baseURL}properties/${imageId}`,{headers: this.getAuthHeaders()})
  }

  getSimlialrImages(imageId?: string | null){
    return this.http.get<Comparison>(`${this.baseURL}similarity/${imageId}`,{headers: this.getAuthHeaders()})

  }

  improveSimilarity(comparison:Comparison){
    return this.http.post<Comparison>(`${this.baseURL}improve_similarity`,{comparison:comparison},{headers: this.getAuthHeaders()})

  }


}
