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
