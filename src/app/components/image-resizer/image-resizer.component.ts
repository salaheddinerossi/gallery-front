import { Component, OnInit } from '@angular/core';
import { ImageService } from "../../services/image.service";
import { ActivatedRoute } from "@angular/router";
import { Image } from "../../../models/Image";

@Component({
  selector: 'app-image-resizer',
  templateUrl: './image-resizer.component.html',
  styleUrls: ['./image-resizer.component.css']
})
export class ImageResizerComponent implements OnInit {

  image: Image = {
    id: 0,
    image: "",
    userId: "",
    themeId: "",
    image_type: "",
    scale: 1  // Default scale value
  };

  scaleFactor: number | undefined  = 1;  // Default scale

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const imageId = this.route.snapshot.paramMap.get('imageId');
    if (imageId) {
      this.fetchImageFromServer(imageId);
    }
  }

  fetchImageFromServer(imageId: string): void {
    this.imageService.getImageById(imageId)
        .subscribe(response => {

          console.log(response)
          this.image.id=response.id;
          this.image.image=response.image;
          this.image.userId=response.user_id;
          this.image.themeId=response.theme_id;
          this.image.image_type=response.image_type;
          this.image.scale=response.scale;

          this.scaleFactor = this.image.scale;
          console.log(this.image)
        });
  }

  applyScale() {
    if (this.image.image) {
      const img = new Image();
      img.src = this.image.image;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (typeof this.scaleFactor !== 'undefined') {
          const newWidth = img.width * this.scaleFactor;
          const newHeight = img.height * this.scaleFactor;

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx!.drawImage(img, 0, 0, newWidth, newHeight);

          const scaledImageSrc = canvas.toDataURL('image/jpeg');

          this.image.image = scaledImageSrc;
          this.image.scale = this.scaleFactor;


        } else {
          console.error('Scale factor is undefined.');
        }

      };
    }
  }

  saveChanges() {
    this.imageService.updateImage(this.image)
  }
}
