export interface IFigurePolygon {
  id: string;
  type: string;
  coordinates: number[][][];
}

export interface ICircle {
  id: string;
  type: string;
  coordinates: number[];
  pointRadius: number[];
  radius: number;
  properties: {
    radius_units: string;
  }
}

export interface IfigureEditorState {
  figureList: (IFigurePolygon | ICircle)[];
  activeFigureID: string | null;
}

export interface IPoint {
  lat: number;
  lng: number;
}

export interface IPointGeo {
  id: string;
  type: string;
  coordinates: number[];
}

export interface ILineString {
  id: string;
  type: string;
  coordinates: number[][];
}
