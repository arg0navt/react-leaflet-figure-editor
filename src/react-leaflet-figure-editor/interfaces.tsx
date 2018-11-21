export interface IFigure {
  type: string;
  coordinates: IPoint[];
  id: string;
}

export interface IfigureEditorState {
  showAddFigureType: boolean;
  figureList: IFigure[];
}

export interface IPoint {
  lng: number;
  lon: number;
}
