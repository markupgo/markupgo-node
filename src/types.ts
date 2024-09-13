export type Libraries = {
  js: string[],
  css: string[]
};

export type ITask = {
  id: string;
  url: string;
  format: 'png' | 'jpeg' | 'webp'
  size: number;
  width: number;
  height: number;
}

export type TemplateData = {
  id: string;
  context?: Record<string, any>;
  html?: string;
  css?: string;
  libraries?: Libraries;
}

export type MarkdownOptions = {
  markdown: string;
  css?: string;
  dark?: boolean;
  padding?: number;
}