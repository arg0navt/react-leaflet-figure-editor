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
    const id = Math.random()
      .toString(36)
      .substr(2, 9);
    this.props.addFigure({ type, coordinates: [], id });
  };
  public render() {
    return (
      <div className="wrap-settings-type">
        <div
          key={1}
          className="settings-type"
          onClick={this.addFigure("Polygon")}
        >
          <p>Add Polygon</p>
        </div>
        <div
          key={2}
          className="settings-type"
          onClick={this.addFigure("Circle")}
        >
          <p>Add Circle</p>
        </div>
        <div
          key={3}
          className="settings-type"
          onClick={this.addFigure("Point")}
        >
          <p>Add Point</p>
        </div>
      </div>
    );
  }
}
