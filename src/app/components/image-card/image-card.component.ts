import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Image} from "../../../models/Image";

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent {
  @Input() img!:Image;
  @Output() downloadEvent = new EventEmitter<any>();
  @Output() deleteEvent=new EventEmitter<any>();

  handleDownload(imageId?:number) {
    this.downloadEvent.emit(imageId);
  }

  handelDelete(imageId?:number){
    this.deleteEvent.emit(imageId);
  }


}
