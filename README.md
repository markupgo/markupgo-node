<img src="https://assets.markupgo.com/brand/logo-violet.svg?1" width="300" style="margin: 20px auto; display: block;">

Node client for the [MarkupGo API](https://markupgo.com/).

It provides methods to generate images and PDFs from templates, URLs, or HTML.

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

## Response Types

- **ITask**
  - Represents the task details and includes information such as ID, URL, format, size, width, and height.
- **Buffer**
  - Used to handle raw binary data for image or PDF output.

## Image Conversion Methods

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
  format: "png",
  width: 800,
  height: 600,
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
  format: "jpeg",
  width: 800,
  height: 600,
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

### fromHtml

```typescript
import * as fs from "fs";

const html: string = "<html><body>Hello World</body></html>";

const imageOptions: ImageOptions = {
  format: "webp",
  width: 800,
  height: 600,
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

## Type Definitions

### Libraries

```typescript
type Libraries = {
  js: string[];
  css: string[];
};
```

### ITask

```typescript
type ITask = {
  id: string;
  url: string;
  format: "png" | "jpeg" | "webp";
  size: number;
  width: number;
  height: number;
};
```

### Cookie

```typescript
type Cookie = {
  name: string;
  value: string;
  domain: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};
```

### Size

```typescript
type Size = {
  width: number;
  height: number;
};
```

### Margins

```typescript
type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
```

### PdfProperties

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
};
```

### PdfOptions

```typescript
type PdfOptions = {
  header?: string;
  footer?: string;
  properties?: PdfProperties;
  pdfUA?: boolean;
  emulatedMediaType?: "screen" | "print";
  waitDelay?: string;
  waitForExpression?: string;
  userAgent?: string;
  extraHttpHeaders?: Record<string, string>;
  failOnHttpStatusCodes?: number[];
  failOnConsoleExceptions?: boolean;
  skipNetworkIdleEvent?: boolean;
  metadata?: Record<string, string>;
  cookies?: Cookie[];
};
```

### ImageProperties

```typescript
type ImageProperties = {
  format?: "png" | "jpeg" | "webp";
  quality?: number;
  omitBackground?: boolean;
  width?: number;
  height?: number;
  clip?: boolean;
};
```

### ImageOptions

```typescript
type ImageOptions = {
  properties?: ImageProperties;
  emulatedMediaType?: "screen" | "print";
  waitDelay?: string;
  waitForExpression?: string;
  extraHttpHeaders?: Record<string, string>;
  failOnConsoleExceptions?: boolean;
  failOnHttpStatusCodes?: number[];
  skipNetworkIdleEvent?: boolean;
  optimizeForSpeed?: boolean;
};
```

### TemplateData

```typescript
type TemplateData = {
  id: string;
  context?: Record<string, any>;
  html?: string;
  css?: string;
  libraries?: Libraries;
};
```

### Options

```typescript
type Options = {
  API_KEY: string;
};
```
