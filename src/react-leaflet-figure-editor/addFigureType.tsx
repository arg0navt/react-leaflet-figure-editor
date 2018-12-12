import * as React from "react";
import { IFigurePolygon, ICircle, IPoint, ILineString } from "./interfaces";

interface IAddFigureType {
  addFigure: (figure: IFigurePolygon| ICircle | IPoint | ILineString) => void;
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
          className="settings-type click-0"
          onClick={this.addFigure({type: "Polygon", coordinates: [[]]})}
        >
          <p>Add Polygon</p>
        </div>
        <div
          key={2}
          className="settings-type click-1"
          onClick={this.addFigure({type: "Circle", coordinates: [], pointRadius: [], radius: 0, properties: {radius_units: "m"}})}
        >
          <p>Add Circle</p>
        </div>
        <div
          key={3}
          className="settings-type click-2"
          onClick={this.addFigure({type: "LineString", coordinates: []})}
        >
          <p>Add LineString</p>
        </div>
        <div
          key={4}
          className="settings-type click-3"
          onClick={this.addFigure({type: "Point", coordinates: []})}
        >
          <p>Add Point</p>
        </div>
      </div>
    );
  }
}
