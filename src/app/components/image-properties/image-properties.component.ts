import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {ActivatedRoute, CanActivate} from "@angular/router";

@Component({
  selector: 'app-image-properties',
  templateUrl: './image-properties.component.html',
  styleUrls: ['./image-properties.component.css']
})
export class ImagePropertiesComponent implements OnInit{

  public barChartData: any[] = [];
  public barChartLabels: string[] = Array.from({length: 256}, (_, i) => i.toString());
  public barChartOptions: any = {
    responsive: true
  };
  public barChartColors: any[] = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'blue' }
  ];


  public barChartLegend = true;
  public barChartType = 'bar';
  public dominantColors: string[] = [];



  constructor(private imageService:ImageService,private route:ActivatedRoute) {

  }



  ngOnInit(){

    const imageId = this.route.snapshot.paramMap.get('imageId');
    const data = this.imageService.getImageProperties(imageId).subscribe(
      data => {
        this.barChartData = [
          { data: data.histogram_colors.red, label: 'Red',backgroundColor:["red"] },
          { data: data.histogram_colors.green, label: 'Green',backgroundColor:["green"] },
          { data: data.histogram_colors.blue, label: 'Blue',backgroundColor:["blue"] }
        ];
        for (let i = 0; i < 5; i++) {
          this.dominantColors.push(`rgb(${data.dominant_colors[`color${i}`].join(",")})`);
        }
      })
  }

}
