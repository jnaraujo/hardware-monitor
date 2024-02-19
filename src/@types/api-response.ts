export interface ApiResponse {
  id: number;
  Text: string;
  Children: Children[];
  Min: string;
  Value: string;
  Max: string;
  ImageURL: string;
}

export interface Children {
  id: number;
  Text: string;
  Children: Children2[];
  Min: string;
  Value: string;
  Max: string;
  ImageURL: string;
}

export interface Children2 {
  id: number;
  Text: string;
  Children: Children3[];
  Min: string;
  Value: string;
  Max: string;
  ImageURL: string;
}

export interface Children3 {
  id: number;
  Text: string;
  Children: Children4[];
  Min: string;
  Value: string;
  Max: string;
  ImageURL: string;
}

export interface Children4 {
  id: number;
  Text: string;
  Children: Children5[];
  Min: string;
  Value: string;
  Max: string;
  ImageURL: string;
}

export interface Children5 {
  id: number;
  Text: string;
  Children: any[];
  Min: string;
  Value: string;
  Max: string;
  ImageURL: string;
}
