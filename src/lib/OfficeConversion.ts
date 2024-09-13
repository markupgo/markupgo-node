import { API_URL } from 'contants';
import { $Fetch, ofetch } from 'ofetch';
import { ITask } from 'types';
import { constants, promises, readFileSync, ReadStream } from 'fs';
import path from 'path';
import jsonToFormData from '@ajoelp/json-to-formdata';


export type OfficeProperties = {
  landscape?: boolean;
  nativePageRanges?: {
    from: number;
    to: number;
  };
  exportFormFields?: boolean;
  singlePageSheets?: boolean;
  allowDuplicateFieldNames?: boolean;
  exportBookmarks?: boolean;
  exportBookmarksToPdfDestination?: boolean;
  exportPlaceholders?: boolean;
  exportNotes?: boolean;
  exportNotesPages?: boolean;
  exportOnlyNotesPages?: boolean;
  exportNotesInMargin?: boolean;
  convertOooTargetToPdfTarget?: boolean;
  exportLinksRelativeFsys?: boolean;
  exportHiddenSlides?: boolean;
  skipEmptyPages?: boolean;
  addOriginalDocumentAsStream?: boolean;
}

export type OfficeToPdfOptions = {
  properties?: OfficeProperties;
  pdfUA?: boolean;
  merge?: boolean;
  metadata?: any;
  losslessImageCompression?: boolean;
  reduceImageResolution?: boolean;
  quality?: number;
  maxImageResolution?: 75 | 150 | 300 | 600 | 1200;
}

type FileInfo = {
  data: Buffer | ReadStream;
  filename: string;
};

export type PathLikeOrReadStream = string | FileInfo;

export class OfficeConversion {
  private API_KEY: string;
  private ofetchJson: $Fetch;
  private ofetchBuffer: $Fetch;

  constructor(API_KEY: string) {
    this.API_KEY = API_KEY;

    this.ofetchJson = ofetch.create({
      baseURL: API_URL,
      headers: {
        'x-api-key': this.API_KEY,
      }
    });

    this.ofetchBuffer = ofetch.create({
      baseURL: API_URL,
      headers: {
        'x-api-key': this.API_KEY,
      },
      responseType: 'arrayBuffer'
    });
  }



  private static async getFileInfo(file: PathLikeOrReadStream) {
    if (typeof file === 'string') {
      await promises.access(file, constants.R_OK);
      const buffer = readFileSync(file);

      return new File([buffer], path.basename(file));
    } else {

      let buffer: Buffer;

      if (file.data instanceof ReadStream) {
        buffer = readFileSync(file.data.path);
      }
      else {
        buffer = file.data;
      }

      return new File([buffer], file.filename);
    }
  }

  private generatePayload = async (files: PathLikeOrReadStream[], options?: OfficeToPdfOptions) => {
    const formData = new FormData();

    const filesPromises = files.map(async (file) => {
      const fileInfo = await OfficeConversion.getFileInfo(file);

      formData.append('files', fileInfo);
    });


    await Promise.all(filesPromises);

    return jsonToFormData(options, {}, formData);
  }

  private generateResponse = (files: PathLikeOrReadStream[], options?: OfficeToPdfOptions) => {
    const json = async () => {
      const body = await this.generatePayload(files, options);
      return this.ofetchJson('/office/convert', { method: 'POST', body }) as Promise<ITask>
    }

    const buffer = async () => {
      const body = await this.generatePayload(files, options);
      return this.ofetchBuffer('/office/convert/buffer', { method: 'POST', body }) as Promise<ArrayBuffer>
    }

    return {
      json,
      buffer
    }
  }

  convert = (files: PathLikeOrReadStream[], options?: OfficeToPdfOptions) => {
    return this.generateResponse(files, options)
  }
}