import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {Theme} from "../../../models/Theme";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.css']
})


export class CreateThemeComponent {
  theme: Theme = {
    name: '',
    description: '',
    userId: '',
    image:''
  };



  constructor(private themeService:ThemeService,private router:Router) {
  }

  selectedImage!: File;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        // This will contain the base64 encoded image
        this.theme.image = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onCreateTheme(){
    const storedItem = localStorage.getItem('currentUser');
    const currentUser = storedItem ? JSON.parse(storedItem) : null;

    if(this.selectedImage){
      this.theme.image;
    }
    if (currentUser) {
      this.theme.userId = currentUser.id;


      // Now call the service to create the theme
      this.themeService.createTheme(this.theme).subscribe(
          data => {
            this.router.navigate(['/'])
          },
          error => {
            console.error('Error creating theme:', error);
          }
      );
    }

  }





}
