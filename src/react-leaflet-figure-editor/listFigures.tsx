import * as React from "react";
import { IFigure, IPoint } from "./interfaces";

interface IPropsList {
  figures: IFigure[];
  focusFigure: string | null;
}

interface IPropsItem {
  type: string;
  coordinates: IPoint[];
  id: string;
  focusFigure: string | null;
}

export default (props: IPropsList) => (
  <div className="list-figures">
    {props.figures.map((item: IFigure) => (
      <FigureItem {...item} focusFigure={props.focusFigure} />
    ))}
  </div>
);

class FigureItem extends React.Component<IPropsItem, any> {
  public render() {
    return (
      <div
        className={`figure-item ${this.props.focusFigure === this.props.id &&
          "active"}`}
      >
        {this.props.type}
      </div>
    );
  }
}
