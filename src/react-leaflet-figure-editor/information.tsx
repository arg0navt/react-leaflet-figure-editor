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
          <p>47.52274353504067, 39.034456014633186</p>
          <p>47.50790335690073, 40.22097945213318</p>
          <p>47.52274353504067, 39.034456014633186</p>
          <p>47.50790335690073, 40.22097945213318</p>
          <p>47.52274353504067, 39.034456014633186</p>
          <p>47.50790335690073, 40.22097945213318</p>
          <p>47.52274353504067, 39.034456014633186</p>
          <p>47.50790335690073, 40.22097945213318</p>
        </div>
      </div>
    );
  }
}
