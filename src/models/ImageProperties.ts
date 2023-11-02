export interface ImageProperties {
  dominant_colors: {
    [key: string]: number[];
  };
  histogram_colors: {
    red: number[];
    green: number[];
    blue: number[];
  };
}
