import * as React from "react";
import { IPoint } from "./interfaces";

interface IProps {
  type: string;
  coordinates: IPoint[];
  id: string;
}

export default class InformationAboutFigure extends React.Component<
  IProps,
  any
> {
  public render() {
    return (
      <div className="figure-info">
        <p>Доступные точки</p>
        <div className="figure-info__points">
          {this.props.coordinates.map((point: IPoint, index: number) => (
            <p key={index}>
              {point.lat}, {point.lng}
            </p>
          ))}
        </div>
      </div>
    );
  }
}
