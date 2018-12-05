import * as React from "react";
import { IPointGeo } from "./interfaces";

export default class InformationAboutPoint extends React.Component<
  {
    deleteFigure: (id: string) => void;
    figure: IPointGeo;
  },
  any
> {
  deleteFigure = () => (e: any) =>
    this.props.deleteFigure(this.props.figure.id);
  public render() {
    return (
      <div className="figure-info">
        {this.props.figure.coordinates.length ? (
          <p key="active_points_text">
            Point:
            <span>
              {this.props.figure.coordinates[0]},{" "}
              {this.props.figure.coordinates[1]}
            </span>
          </p>
        ) : (
          <p key="dont_have_active_points" style={{ marginBottom: 0 }}>
            Don't have data
          </p>
        )}
        <button onClick={this.deleteFigure()}>Delete figure</button>
      </div>
    );
  }
}
