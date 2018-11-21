import * as React from "react";
import { IFigure } from "./interfaces";

interface IAddFigureType {
  addFigure: (figure: IFigure) => void;
}

export default class AddFigureType extends React.Component<
  IAddFigureType,
  any
> {
  addFigure = type => event => {
    const id = Math.random().toString(36).substr(2, 9);
    this.props.addFigure({ type, coordinates: [], id});
  };
  public render() {
    return (
      <div className="settings-figure-control">
        <button className="settings-type" onClick={this.addFigure("Polygon")}>
          Полигон
        </button>
        <button className="settings-type" onClick={this.addFigure("Cyrcle")}>
          Круг
        </button>
        <button className="settings-type" onClick={this.addFigure("Point")}>
          Точка
        </button>
      </div>
    );
  }
}
