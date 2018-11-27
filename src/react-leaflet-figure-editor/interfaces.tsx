export interface IFigure {
  type: string;
  coordinates: IPoint[];
  id: string;
}

export interface IfigureEditorState {
  figureList: IFigure[];
  focusFigure: string | null;
}

export interface IPoint {
  lng: number;
  lon: number;
}
