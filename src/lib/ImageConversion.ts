import { API_URL } from 'contants';
import { $Fetch, ofetch } from 'ofetch';
import { ITask, MarkdownOptions, TemplateData } from 'types';

export type ImageProperties = {
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number;
  omitBackground?: boolean;
  width?: number;
  height?: number;
  clip?: boolean;
}

export type ImageOptions = {
  properties?: ImageProperties;
  emulatedMediaType?: 'screen' | 'print';
  waitDelay?: string;
  waitForExpression?: string;
  extraHttpHeaders?: Record<string, string>;
  failOnConsoleExceptions?: boolean;
  failOnHttpStatusCodes?: number[];
  skipNetworkIdleEvent?: boolean;
  optimizeForSpeed?: boolean;
}

export class ImageConversion {
  private API_KEY: string;
  private ofetchJson: $Fetch;
  private ofetchBuffer: $Fetch;

  constructor(API_KEY: string) {
    this.API_KEY = API_KEY;

    this.ofetchJson = ofetch.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
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

  private generateResponse = (body: any) => {
    const json = () => {
      return this.ofetchJson('/image/json', { method: 'POST', body }) as Promise<ITask>
    }

    const buffer = () => {
      return this.ofetchBuffer('/image/buffer', { method: 'POST', body }) as Promise<ArrayBuffer>
    }

    return {
      json,
      buffer
    }
  }

  fromTemplate = (data: TemplateData, options?: ImageOptions) => {
    const body = {
      source: {
        type: 'template',
        data
      },
      options
    }
    return this.generateResponse(body)
  }

  fromUrl = (url: string, options?: ImageOptions) => {
    const body = {
      source: {
        type: 'url',
        data: url
      },
      options
    }
    return this.generateResponse(body)
  }

  fromHtml = (html: string, options?: ImageOptions) => {
    const body = {
      source: {
        type: 'html',
        data: html
      },
      options
    }

   return this.generateResponse(body)
  }

  fromMarkdown = (input: MarkdownOptions, options?: ImageOptions) => {
    const body = {
      source: {
        type: 'markdown',
        data: {
          markdown: input.markdown,
          css: input.css,
          dark: input.dark,
          padding: input.padding
        }
      },
      options
    }

    return this.generateResponse(body)
  }
}