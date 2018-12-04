import * as React from "react";
import { IPointGeo } from "./interfaces";

export default class InformationAboutPoint extends React.Component<
  IPointGeo,
  any
> {
  public render() {
    return (
      <div className="figure-info">
        {this.props.coordinates.length ? (
          <p key="active_points_text">
            Point:
            <span>
              {this.props.coordinates[0]}, {this.props.coordinates[1]}
            </span>
          </p>
        ) : (
          <p key="dont_have_active_points" style={{ marginBottom: 0 }}>
            Don't have data
          </p>
        )}
      </div>
    );
  }
}
