export interface IFigure {
  type: string;
  coordinates: IPoint[];
  id: string;
}

export interface IfigureEditorState {
  figureList: IFigure[];
  activeFigureID: string | null;
}

export interface IPoint {
  lat: number;
  lng: number;
}
