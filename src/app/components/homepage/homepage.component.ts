import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {Theme} from "../../../models/Theme";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  themes: Theme[] = [];


  constructor(private themeService:ThemeService) {
  }

  ngOnInit(): void {
    const storedItem = localStorage.getItem('currentUser');
    const currentUser = storedItem ? JSON.parse(storedItem) : null;

    if (currentUser) {
      this.themeService.getThemesByUserId(currentUser.id).subscribe(
          themes => {
            this.themes = themes;
          },
          error => {
            console.error('Error fetching themes:', error);
          }
      );
    }
  }


}
