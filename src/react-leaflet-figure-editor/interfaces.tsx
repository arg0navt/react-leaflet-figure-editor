export interface IFigure {
  type: string;
  coordinates: IPoint[];
  id: string;
}

export interface IfigureEditorState {
  showAddFigureType: boolean;
  figureList: IFigure[];
  focusFigure: string | null;
}

export interface IPoint {
  lng: number;
  lon: number;
}
