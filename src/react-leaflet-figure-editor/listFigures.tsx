import * as React from "react";
import { IFigure, IPoint } from "./interfaces";

interface IPropsList {
  figures: IFigure[];
  activeFigureID: string | null;
  changeActiveFigure: (id: string) => void;
}

interface IPropsItem {
  type: string;
  coordinates: IPoint[];
  id: string;
  activeFigureID: string | null;
  changeActiveFigure: (id: string) => void;
}

export default (props: IPropsList) => (
  <div className="list-figures">
    {props.figures.map((item: IFigure) => (
      <FigureItem
        {...item}
        key={item.id}
        activeFigureID={props.activeFigureID}
        changeActiveFigure={props.changeActiveFigure}
      />
    ))}
  </div>
);

class FigureItem extends React.Component<IPropsItem, any> {
  changeActiveFigure = type => event => {
    this.props.changeActiveFigure(this.props.id);
  };
  public render() {
    return (
      <div
        onClick={this.changeActiveFigure(this.props.id)}
        className={`figure-item`}
      >
        <p>{this.props.type}</p>
        {this.props.activeFigureID === this.props.id && (
          <div className="figure-item-active" />
        )}
      </div>
    );
  }
}
