import * as React from "react";
import { ICircle } from "./interfaces";

export default class InformationAboutCircle extends React.Component<
  ICircle,
  any
> {
  public render() {
    return (
      <div className="figure-info">
        {this.props.coordinates.length ? (
          [
            <p key="active_points_text">Center: <span>{this.props.coordinates[0]}, {this.props.coordinates[1]}</span></p>,
            <p key="active_points_text">Radius: <span>{this.props.radius.toFixed(2)}</span></p>,
          ]
        ) : (
          <p key="dont_have_active_points" style={{ marginBottom: 0 }}>
            Don't have data
          </p>
        )}
      </div>
    );
  }
}
