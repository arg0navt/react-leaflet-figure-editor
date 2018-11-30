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
  renderInfoPolyline = () => {
    if (this.props.coordinates.length) {
      return [
        <p key="active_points_text">Доступные точки</p>,
        <div key="active_points" className="figure-info__points">
          {this.props.coordinates.map((point: IPoint, index: number) => (
            <p key={index}>
              {point.lat}, {point.lng}
            </p>
          ))}
        </div>
      ];
    } else {
      return (
        <p key="dont_have_active_points" style={{ marginBottom: 0 }}>
          Нет активных точек
        </p>
      );
    }
  };
  renderInfoCircle = () => (
    <div className="circle-info">
      <p className="circle-info__text">Center: <span>47.72730507058479, 40.22782981395722</span></p>
      <p className="circle-info__text">Radius: <span>200 meters</span></p>
    </div>
  );

  public render() {
    return (
      <div className="figure-info">
        {this.props.type === "Polygon" ? this.renderInfoPolyline() : this.props.type === "Circle" ? this.renderInfoCircle() : null}
      </div>
    );
  }
}
