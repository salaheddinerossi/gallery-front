import {Component, Input} from '@angular/core';
import {Theme} from "../../../models/Theme";

@Component({
  selector: ' app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.css']
})
export class ThemeCardComponent {

  constructor() {
  }

  @Input() theme!: Theme;


}
