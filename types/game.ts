// types/game.ts
export interface Game {
  id: string;
  title: string;
  createdAt?: string;
  category?: string[];
  type?: string;
  os?: string[] | string;
  img?: string;
  description?: string;
  developer?: string;
  publisher?: string;
  version?: string;
  screenshots?: string[];
  download?: {
    Windows?: {
      Pixeldrain?: string;
      Gofile?: string;
      WorkUpload?: string;
    };
    Android?: {
      Pixeldrain?: string;
      Gofile?: string;
      WorkUpload?: string;
    };
  };
  languages?: string[];
}