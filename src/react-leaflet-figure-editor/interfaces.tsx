export interface IFigure {
  type: string;
  coordinates: IPoint[];
  id: string;
}

export interface IfigureEditorState {
  figureList: IFigure[];
  activeFigureID: string | null;
  clickActivated: boolean;
}

export interface IPoint {
  lat: number;
  lng: number;
}
