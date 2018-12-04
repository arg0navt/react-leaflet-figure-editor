import * as React from "react";
import { IFigurePolygon } from "./interfaces";

export default class InformationAboutPolygon extends React.Component<
  IFigurePolygon,
  any
> {
  public render() {
    return (
      <div className="figure-info">{this.props.coordinates.length ? [
        <p key="active_points_text">Points</p>,
        <div key="active_points" className="figure-info__points">
          {this.props.coordinates[0].map((point: number[], index: number) => (
            <p key={index}>
              {point[0]}, {point[1]}
            </p>
          ))}
        </div>
      ] : (
        <p key="dont_have_active_points" style={{ marginBottom: 0 }}>
          Don't have data
        </p>
      )}</div>
    )
  }
}
