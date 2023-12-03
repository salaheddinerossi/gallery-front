import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {ActivatedRoute, CanActivate} from "@angular/router";
import {ChartOptions, ChartType} from 'chart.js';

@Component({
  selector: 'app-image-properties',
  templateUrl: './image-properties.component.html',
  styleUrls: ['./image-properties.component.css']
})

export class ImagePropertiesComponent implements OnInit{
    public lineChartType: ChartType = 'line';
    public lineChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true
            }
        },
        elements: {
            line: {
                tension: 0.4 // This makes the line curved. Set to 0 for straight lines.
            },
            point: {
                radius: 0 // Hide points
            }
        }
    };


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

  public moments:[] = [];

  constructor(private imageService:ImageService,private route:ActivatedRoute) {

  }

    public getColorClass(index: number): string {
        const classes = ['bg-primary', 'bg-success', 'bg-danger'];
        return classes[index % classes.length];
    }


    public getObjectKeys(obj: any): string[] {
        return Object.keys(obj);
    }




    ngOnInit(){

    const imageId = this.route.snapshot.paramMap.get('imageId');
    const data = this.imageService.getImageProperties(imageId).subscribe(
      data => {
        this.moments=data.color_moments;
        console.log(data)
        this.barChartData = [
            { data: data.histogram_colors.red, label: 'Red', borderColor: 'red', fill: false, steppedLine: true },
            { data: data.histogram_colors.green, label: 'Green', borderColor: 'green', fill: false, steppedLine: true },
            { data: data.histogram_colors.blue, label: 'Blue', borderColor: 'blue', fill: false, steppedLine: true },
        ];
        for (let i = 0; i < 5; i++) {
          this.dominantColors.push(`rgb(${data.dominant_colors[`color${i}`].join(",")})`);
        }
      })
  }

}
