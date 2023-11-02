import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {ImageService} from "../../services/image.service";
import {Theme} from "../../../models/Theme";
import {Image} from "../../../models/Image";

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.css']
})
export class CreateImageComponent {

  userThemes: Theme[] = []; // this should fetch themes related to the user
  selectedTheme: string = '';
  selectedImage!: File;
  image:Image={
    themeId: "",
    userId: "",
    image:"",
    image_type:""

  }


  constructor(private themeService:ThemeService, private  imageService:ImageService) {
  }

  ngOnInit(): void {
    const storedItem = localStorage.getItem('currentUser');
    const currentUser = storedItem ? JSON.parse(storedItem) : null;

    if (currentUser) {
      this.themeService.getThemesByUserId(currentUser.id).subscribe(
          themes => {
            this.userThemes = themes;
            this.image.userId=currentUser.id;
          },
          error => {
            console.error('Error fetching themes:', error);
          }
      );
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;

        const mimeType = result.split(';')[0].split(':')[1];

        if (mimeType) {
          this.image.image_type = mimeType;
        }

        this.image.image = result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onUpload() {
    // Check if there's a selected image
    if (!this.selectedImage) {
      console.error('No image selected');
      return;
    }


    this.image.themeId=this.selectedTheme;


    // Sending the payload to the server using your service
    this.imageService.createImage(this.image);
  }









}
