import * as React from "react";
import { ILineString } from "./interfaces";

export default class InformationAboutLineString extends React.Component<
  {
    deleteFigure: (id: string) => void;
    figure: ILineString;
  },
  any
> {
  deleteFigure = () => (e: any) =>
    this.props.deleteFigure(this.props.figure.id);
  public render() {
    return (
      <div className="figure-info">
        {this.props.figure.coordinates.length ? (
          [
            this.props.figure.coordinates[0] ? (
              <p key="active_points_first">
                First point:
                <span>
                  {this.props.figure.coordinates[0][0]},{" "}
                  {this.props.figure.coordinates[0][1]}
                </span>
              </p>
            ) : null,
            this.props.figure.coordinates[1] ? (
              <p key="active_points_second">
                Second point:
                <span>
                  {this.props.figure.coordinates[1][0]},{" "}
                  {this.props.figure.coordinates[1][1]}
                </span>
              </p>
            ) : null
          ]
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
