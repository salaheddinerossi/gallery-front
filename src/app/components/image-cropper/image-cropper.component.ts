import { Component } from '@angular/core';
import {ImageService} from "../../services/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../../../models/Image";

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent {
    croppedImage: string | null = null;  // to store the cropped image


    imageSrc: string = '';

    image:Image={
    id:0,
    image:"",
    userId:"",
    themeId:"",
    image_type:""

  };
  imageId?:string | null;



  constructor(private imageService:ImageService,private route:ActivatedRoute) {
  }

  ngOnInit(){
    this.imageId = this.route.snapshot.paramMap.get('imageId');
    if(this.imageId){
      this.fetchImageFromServer(this.imageId)
    }
  }


  fetchImageFromServer(imageId?: string): void {
    this.imageService.getImageById(imageId)
        .subscribe(response => {

          this.image.id=response.id;
          this.image.image=response.image;
          this.image.userId=response.user_id;
          this.image.themeId=response.theme_id;
          this.image.image_type=response.image_type;
          this.imageSrc=response.image;


        });
  }


    imageCropped(event: any): void {
        const blob: Blob = event.blob;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                this.croppedImage = reader.result;
            } else {
                console.error('Failed to get a string for the cropped image.');
            }
        };
    }


    imageLoaded(): void {
        // Do something after the image is loaded, e.g., show a message or perform some initial setup
        console.log('Image loaded');
    }

    cropperReady(): void {
        // Do something when the cropper is ready, e.g., set initial crop position
        console.log('Cropper ready');
    }

    loadImageFailed(): void {
        // Handle the error, e.g., show an error message to the user
        console.error('Load image failed');
    }

    submitCroppedImage(){
        if (this.croppedImage != null) {
            this.image.image = this.croppedImage;
            this.imageService.createImage(this.image);
        }
    }

    handelUpdate(){
        if (this.croppedImage != null) {
            this.image.image = this.croppedImage;
            this.imageService.updateImage(this.image);
        }
    }





}
