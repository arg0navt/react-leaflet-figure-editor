import * as React from "react";
import { IFigure, IPoint } from "./interfaces";

interface IPropsList {
  figures: IFigure[];
  focusFigure: string | null;
  changeFucusFigure: (id: string) => void;
}

interface IPropsItem {
  type: string;
  coordinates: IPoint[];
  id: string;
  focusFigure: string | null;
  changeFucusFigure: (id: string) => void;
}

export default (props: IPropsList) => (
  <div className="list-figures">
    {props.figures.map((item: IFigure) => (
      <FigureItem
        {...item}
        key={item.id}
        focusFigure={props.focusFigure}
        changeFucusFigure={props.changeFucusFigure}
      />
    ))}
  </div>
);

class FigureItem extends React.Component<IPropsItem, any> {
  changeFucusFigure = type => event => {
    this.props.changeFucusFigure(this.props.id);
  };
  public render() {
    return (
      <div
        onClick={this.changeFucusFigure(this.props.id)}
        className={`figure-item ${this.props.focusFigure === this.props.id &&
          "active"}`}
      >
        {this.props.type}
      </div>
    );
  }
}
