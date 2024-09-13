import { ImageConversion } from "lib/ImageConversion";
import { OfficeConversion } from "lib/OfficeConversion";
import { PdfConversion } from "lib/PdfConversion";

type Options = {
  API_KEY: string;
};

export default class MarkupGo {
  API_KEY: string;
  pdf: PdfConversion;
  image: ImageConversion;
  office: OfficeConversion;

  constructor(options: Options) {
    this.API_KEY = options.API_KEY;
    this.image = new ImageConversion(this.API_KEY)
    this.pdf = new PdfConversion(this.API_KEY)
    this.office = new OfficeConversion(this.API_KEY)
  }
}


export type { ImageOptions, ImageProperties } from "lib/ImageConversion";
export type { Cookie, Margins, PdfOptions, PdfProperties, Size } from "lib/PdfConversion";
export type { OfficeProperties, OfficeToPdfOptions, PathLikeOrReadStream } from "lib/OfficeConversion";
export type * from "types";