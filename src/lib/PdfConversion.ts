import { API_URL } from 'contants';
import { $Fetch, ofetch } from 'ofetch';
import { ITask, MarkdownOptions, TemplateData } from 'types';

export type Cookie = {
  name: string;
  value: string;
  domain: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export type Size = {
  width?: number;
  height?: number;
}

export type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export type PdfProperties = {
  singlePage?: boolean;
  size?: Size;
  margins?: Margins;
  preferCssPageSize?: boolean;
  printBackground?: boolean;
  omitBackground?: boolean;
  landscape?: boolean;
  scale?: number;
  nativePageRanges?: {
    from: number;
    to: number;
  };
}

export type PdfOptions = {
  header?: string;
  footer?: string;
  properties?: PdfProperties;
  pdfUA?: boolean;
  emulatedMediaType?: 'screen' | 'print';
  waitDelay?: string;
  waitForExpression?: string;
  userAgent?: string;
  extraHttpHeaders?: Record<string, string>;
  failOnHttpStatusCodes?: number[];
  failOnConsoleExceptions?: boolean;
  skipNetworkIdleEvent?: boolean;
  metadata?: Record<string, string>;
  cookies?: Cookie[];
}




export class PdfConversion {
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
      return this.ofetchJson('/pdf', { method: 'POST', body }) as Promise<ITask>
    }

    const buffer = () => {
      return this.ofetchBuffer('/pdf', { method: 'POST', body }) as Promise<ArrayBuffer>
    }

    return {
      json,
      buffer
    }
  }

  fromTemplate = (data: TemplateData, options?: PdfOptions) => {
    const body = {
      source: {
        type: 'template',
        data
      },
      options
    }
    return this.generateResponse(body)
  }

  fromUrl = (url: string, options?: PdfOptions) => {
    const body = {
      source: {
        type: 'url',
        data: url
      },
      options
    }
    return this.generateResponse(body)
  }

  fromHtml = (html: string, options?: PdfOptions) => {
    const body = {
      source: {
        type: 'html',
        data: html
      },
      options
    }

   return this.generateResponse(body)
  }

  fromMarkdown = (input: MarkdownOptions, options?: PdfOptions) => {
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