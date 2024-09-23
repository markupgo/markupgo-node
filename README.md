<img src="https://assets.markupgo.com/brand/logo-violet.svg?1" width="300" style="margin: 20px auto; display: block;">

Node client for the [MarkupGo API](https://markupgo.com/).

It provides methods to generate images and PDFs from templates, URLs, or HTML. It also supports converting over 130 document formats to PDF, including `.docx`, `.xlsx`, `.pptx`, and more.

## Installation

To install the library, use npm or yarn:

```bash
npm install markupgo-node
```

or

```bash
yarn add markupgo-node
```

## Initialization

To use `MarkupGo`, you need to initialize it with your API key:

```typescript
import MarkupGo from "markupgo-node";

const markupgo = new MarkupGo({
  API_KEY: "your_api_key_here",
});
```

## Overview of Classes

- **ImageConversion**
  - Provides methods to generate images from templates, URLs, or HTML strings.
- **PdfConversion**
  - Provides methods to generate PDFs from templates, URLs, or HTML strings. 
- **OfficeConversion**
  - Provides methods to convert over 130 document formats to PDF, including `.docx`, `.xlsx`, `.pptx`, and more. It supports merging multiple files into a single PDF.

## Response Types

- **ITask**
  - Represents the task details and includes information such as ID, URL, format, size, width, and height.
- **Buffer**
  - Used to handle raw binary data for image or PDF output.

## Image Conversion Methods

The **Image Conversion API** enables the generation of images from templates, URLs, or HTML strings. It supports various image formats, including PNG, JPEG, and WebP, and provides options to customize the output.

Please refer to the [Image API documentation](https://markupgo.com/docs/api/image) for more information.

### fromTemplate

```typescript
import * as fs from "fs";

const templateData: TemplateData = {
  id: PODCAST_TEMPLATE_ID,
  context: { 
    title: 'Episode 1',
    description: 'We talk about stuff and things, tune in!'
  }
};

const imageOptions: ImageOptions = {
  properties: {
    format: "png",
    width: 800,
    height: 600,
  }
};

markupgo.image.fromTemplate(templateData, imageOptions).json()
.then((task) => {
  console.log(task);
});

markupgo.image.fromTemplate(templateData, imageOptions).buffer()
.then((buffer) => {
  fs.writeFileSync("output.png", Buffer.from(buffer));
});
```

### fromUrl

```typescript
import * as fs from "fs";

const url: string = "https://example.com";

const imageOptions: ImageOptions = {
 properties: {
    format: "jpeg",
    width: 800,
    height: 600,
    clip: true,
  }
};

markupgo.image.fromUrl(url, imageOptions).json()
.then((task) => {
  console.log(task);
});

markupgo.image.fromUrl(url, imageOptions).buffer()
.then((buffer) => {
  fs.writeFileSync("output.jpg", Buffer.from(buffer));
});
```

::content-alert{type="warning"}
  Heads up!

  For the URL source (fromUrl method), the **clip** option will clip the image to the specified **width** and **height**. If false, the **height** will be ignored. For other conversion types, you don't need to set the **clip** option to force the image to be clipped.
::

### fromHtml

```typescript
import * as fs from "fs";

const html: string = "<html><body>Hello World</body></html>";

const imageOptions: ImageOptions = {
  properties: {
    format: "webp",
    width: 800,
    height: 600,
  }
};

markupgo.image.fromHtml(html, imageOptions).json()
.then((task) => {
  console.log(task);
});

markupgo.image.fromHtml(html, imageOptions).buffer()
.then((buffer) => {
  fs.writeFileSync("output.webp", Buffer.from(buffer));
});
```

### fromMarkdown

```typescript
import * as fs from "fs";

const input: MarkdownInput = {
  markdown: "# Hello World",
  css: "h1 { color: #f2f2f2; }",
  dark: true,
  padding: 45,
}

const imageOptions: ImageOptions = {
  properties: {
    format: "png",
    width: 800,
    height: 600,
  }
};

markupgo.image.fromMarkdown(input, imageOptions).json()
.then((task) => {
  console.log(task);
});

markupgo.image.fromMarkdown(input, imageOptions).buffer()
.then((buffer) => {
  fs.writeFileSync("output.png", Buffer.from(buffer));
});

```

## PDF Conversion Methods

Generate PDFs from URLs, HTML, and templates. Please refer to the [PDF API documentation](https://markupgo.com/docs/api/pdf) for more information.

### fromTemplate

```typescript
import * as fs from "fs";

const templateData: TemplateData = {
  id: PODCAST_TEMPLATE_ID,
  context: { 
    title: 'Episode 1',
    description: 'We talk about stuff and things, tune in!'
  }
};

const pdfOptions: PdfOptions = {
  properties: {
    printBackground: true,
    landscape: true,
  },
};

markupgo.pdf.fromTemplate(templateData, pdfOptions).json()
.then((task) => {
  console.log(task);
});

markupgo.pdf.fromTemplate(templateData, pdfOptions).buffer()
.then((buffer) => {
  fs.writeFileSync("output.pdf", Buffer.from(buffer));
});
```

### fromUrl

```typescript
import * as fs from "fs";

const url: string = "https://example.com";

const pdfOptions: PdfOptions = {
  properties: {
    printBackground: true,
    landscape: true,
  },
};

markupgo.pdf.fromUrl(url, pdfOptions).json()
.then((task) => {
  console.log(task);
});

markupgo.pdf.fromUrl(url, pdfOptions).buffer()
.then((buffer) => {
  fs.writeFileSync("output.pdf", Buffer.from(buffer));
});
```

### fromHtml

```typescript
import * as fs from "fs";

const html: string = "<html><body>Hello World</body></html>";

const pdfOptions: PdfOptions = {
  properties: {
    printBackground: true,
    landscape: true,
  },
};

markupgo.pdf.fromHtml(html, pdfOptions).json()
.then((task) => {
  console.log(task);
});

markupgo.pdf.fromHtml(html, pdfOptions).buffer()
.then((buffer) => {
  fs.writeFileSync("output.pdf", Buffer.from(buffer));
});
```

### fromMarkdown

```typescript
import * as fs from "fs";

const input: MarkdownInput = {
  markdown: "# Hello World",
  css: "h1 { color: #f2f2f2; }",
  dark: true,
  padding: 45,
}

const pdfOptions: PdfOptions = {
  properties: {
    singlePage: true, // Best way to render all content in a single page
  },
};

markupgo.pdf.fromMarkdown(input, pdfOptions).json()
.then((task) => {
  console.log(task);
});

markupgo.pdf.fromMarkdown(input, pdfOptions).buffer()
.then((buffer) => {
  fs.writeFileSync("output.pdf", Buffer.from(buffer));
});
```

## Office to PDF Conversion

The **Office to PDF API** enables seamless conversion of over 130 document formats to PDF, including `.docx`, `.xlsx`, `.pptx`, and more. Whether you need high-quality conversions, custom PDF properties, or to merge multiple files, this API simplifies the process.

Please refer to the [Office to PDF API documentation](https://markupgo.com/docs/api/office-to-pdf) for more information for supported formats, options, limits, and more.

### Examples

### Convert a `.docx` File to PDF

```typescript
import { type PathLikeOrReadStream } from "markupgo-node";
import fs from "fs";

const buffer = fs.readFileSync("./src/playground/test.docx");

const files = [
  {
    data: buffer,
    filename: "test.docx",
  },
  "./src/playground/report.xlsx",
] as PathLikeOrReadStream[];

markupgo.office.convert(files).json().then((task) => {
  console.log(task);
});

// OR
markupgo.office.convert(files).buffer().then((buffer) => {
  fs.writeFileSync("output.pdf", Buffer.from(buffer));
});
```

### Convert Multiple Files to PDF with Merging

The `merge` option must be set to `true` to merge multiple files into a single PDF.

```typescript
import { type PathLikeOrReadStream } from "markupgo-node";
import fs from "fs";

const buffer = fs.readFileSync("./src/playground/test.docx");

const files = [
  {
    data: buffer,
    filename: "test.docx",
  },
  "./src/playground/report.xlsx",
] as PathLikeOrReadStream[];

const options: OfficeToPdfOptions = {
  merge: true,
};

markupgo.office.convert(files, options).json().then((task) => {
  console.log(task);
});
// OR
markupgo.office.convert(files, options).buffer().then((buffer) => {
  fs.writeFileSync("output.pdf", Buffer.from(buffer));
});

```

### Convert a `.docx` File to PDF with Custom Options

```typescript
import { type PathLikeOrReadStream } from "markupgo-node";
import fs from "fs";

const buffer = fs.readFileSync("./src/playground/test.docx");

const files = [
  {
    data: buffer,
    filename: "test.docx",
  },
  "./src/playground/report.xlsx",
] as PathLikeOrReadStream[];

const options: OfficeToPdfOptions = {
  properties: {
    landscape: true,
    printBackground: true,
  }
};

markupgo.office.convert(files, options).json().then((task) => {
  console.log(task);
});
// OR
markupgo.office.convert(files, options).buffer().then((buffer) => {
  fs.writeFileSync("output.pdf", Buffer.from(buffer));
});

```

## Troubleshooting for Office to PDF Conversion

If you encounter issues, check for the following:

- **File too large:** Ensure your file size does not exceed the maximum limit.
- **Unsupported file types:** Double-check that the file format is supported by referring to the [supported formats](https://markupgo.com/docs/api/office-to-pdf#full-list-of-supported-formats).
- **Invalid API key:** Verify your API key is valid and has the correct permissions.


## Types

### Image

<details>
  <summary>Common Types</summary>
  
  ```typescript
  type ImageProperties = {
    format?: 'png' | 'jpeg' | 'webp';
    quality?: number;
    omitBackground?: boolean;
    width?: number;
    height?: number;
    clip?: boolean;
  }
  
  type ImageOptions = {
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

  type ITask = {
    id: string;
    url: string;
    format: 'png' | 'jpeg' | 'webp'
    size: number;
    width: number;
    height: number;
  }
  ```
</details>

<details>
<summary>fromTemplate</summary>

```typescript
fromTemplate(data: TemplateData, options?: ImageOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}

type TemplateData = {
  id: string;
  context?: Record<string, any>;
  html?: string;
  css?: string;
  libraries?: Record<string, string>[];
  autoHeight?: boolean;
}
```
</details>

<details>
<summary>fromUrl</summary>

```typescript
fromUrl(url: string, options?: ImageOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}
```
</details>

<details>
<summary>fromHtml</summary>

```typescript
fromHtml(html: string, options?: ImageOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}
```
</details>

<details>
<summary>fromMarkdown</summary>

```typescript
fromMarkdown(input: MarkdownInput, options?: ImageOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}

type MarkdownInput = {
  markdown: string;
  css?: string;
  dark?: boolean;
  padding?: number;
}
```
</details>


### Pdf

<details>
  <summary>Common Types</summary>
  
  ```typescript
  type PdfProperties = {
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

  type PdfOptions = {
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

  type Cookie = {
    name: string;
    value: string;
    domain: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  }

  type Size = {
    width?: number;
    height?: number;
  }

  type Margins = {
    top: number;
    bottom: number;
    left: number;
    right: number;
  }
  ```
</details>

<details>
<summary>fromTemplate</summary>
```typescript
fromTemplate(data: TemplateData, options?: PdfOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}

type TemplateData = {
  id: string;
  context?: Record<string, any>;
  html?: string;
  css?: string;
  libraries?: Record<string, string>[];
}

```
</details>

<details>
<summary>fromUrl</summary>

```typescript
fromUrl(url: string, options?: PdfOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}
```
</details>

<details>
<summary>fromHtml</summary>

```typescript
fromHtml(html: string, options?: PdfOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}
```
</details>

<details>
<summary>fromMarkdown</summary>

```typescript
fromMarkdown(input: MarkdownOptions, options?: PdfOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}

type MarkdownOptions = {
  markdown: string;
  css?: string;
  dark?: boolean;
  padding?: number;
}
```
</details>


### Office to PDF

<details>
  <summary>Common Types</summary>
  
  ```typescript
  type OfficeProperties = {
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

  type OfficeToPdfOptions = {
    properties?: OfficeProperties;
    pdfUA?: boolean;
    merge?: boolean;
    metadata?: any;
    losslessImageCompression?: boolean;
    reduceImageResolution?: boolean;
    quality?: number;
    maxImageResolution?: 75 | 150 | 300 | 600 | 1200;
  }
  ```
</details>

<details>
<summary>convert</summary>

```typescript
convert(files: PathLikeOrReadStream[], options?: OfficeToPdfOptions): {
  json: () => Promise<ITask>;
  buffer: () => Promise<ArrayBuffer>;
}

type PathLikeOrReadStream = string | FileInfo;

type FileInfo = {
  data: Buffer | ReadStream;
  filename: string;
}
  
```
</details>

  ### Contributors

  <img src="https://markupgo.com/github/markupgo/markupgo-node/contributors?count=0&circleSize=32&circleRadius=32&center=true" width="100%" /> 
  
  ### Contributors

  <img src="https://markupgo.com/github/markupgo/markupgo-node/contributors?count=0&circleSize=32&circleRadius=32&center=true" width="100%" /> 
  
  ### Contributors

  <img src="https://markupgo.com/github/markupgo/markupgo-node/contributors?count=0&circleSize=32&circleRadius=32&center=true" width="100%" /> 
  