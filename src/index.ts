import { ImageConversion } from "lib/ImageConversion";
import { PdfConversion } from "lib/PdfConversion";

type Options = {
  API_KEY: string;
};

export default class MarkupGo {
  API_KEY: string;
  pdf: PdfConversion;
  image: ImageConversion;
  
  constructor(options: Options) {
    this.API_KEY = options.API_KEY;
    this.image =  new ImageConversion(this.API_KEY)
    this.pdf =  new PdfConversion(this.API_KEY)
  }
}
