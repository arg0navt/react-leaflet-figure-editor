import * as React from "react";
import { IFigurePolygon, ICircle } from "./interfaces";

interface IAddFigureType {
  addFigure: (figure: IFigurePolygon| ICircle) => void;
}

export default class AddFigureType extends React.Component<
  IAddFigureType,
  any
> {
  addFigure = data => event => {
    data.id = Math.random()
      .toString(36)
      .substr(2, 9);
    this.props.addFigure(data);
  };
  public render() {
    return (
      <div className="wrap-settings-type">
        <div
          key={1}
          className="settings-type"
          onClick={this.addFigure({type: "Polygon", coordinates: [[]]})}
        >
          <p>Add Polygon</p>
        </div>
        <div
          key={2}
          className="settings-type"
          onClick={this.addFigure({type: "Circle", coordinates: [], radius: 0, properties: {radius_units: "km"}})}
        >
          <p>Add Circle</p>
        </div>
        <div
          key={3}
          className="settings-type"
        >
          <p>Add Point</p>
        </div>
      </div>
    );
  }
}
