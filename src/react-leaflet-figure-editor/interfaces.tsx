export interface IFigure {
  type: string;
}

export interface IfigureEditorState {
  showAddFigureType: boolean;
  figureList: IFigure[];
}
