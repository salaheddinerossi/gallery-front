import { Component } from '@angular/core';
import {ImageService} from "../../services/image.service";
import {ActivatedRoute} from "@angular/router";
import {Image} from "../../../models/Image";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {

  themeId: string | null = null;
  images: Image | any = [];



  constructor(private imageSerivce:ImageService,private route:ActivatedRoute) {
  }

  ngOnInit(){

    this.themeId = this.route.snapshot.paramMap.get('themeId');

    if (this.themeId) {
      this.fetchImagesForTheme(this.themeId);
    }

  }

  fetchImagesForTheme(themeId: string) {
    this.imageSerivce.getImagesByTheme(themeId).subscribe(images => {
      this.images = images;
    }, error => {
      console.error('Error fetching images:', error);
    });
  }
  handleDownloadInParent(imageId?:number){
    this.imageSerivce.downloadImage(imageId);
  }

  handelDeleteInParent(imageId?:number){
    this.imageSerivce.deleteImage(imageId);
  }



}
