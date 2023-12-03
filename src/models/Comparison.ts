import {Image} from "./Image";

export interface Comparison{
  selected_image:Image,
  similar_images:Image[],
  seuil?:number
}
