import * as React from "react";
import { IFigurePolygon, ICircle } from "./interfaces";

interface IPropsList {
  figures: (IFigurePolygon | ICircle)[];
  activeFigureID: string | null;
  changeActiveFigure: (id: string) => void;
}

interface IPropsItem {
  params: IFigurePolygon | ICircle;
  activeFigureID: string | null;
  changeActiveFigure: (id: string) => void;
}

export default (props: IPropsList) => (
  <div className="list-figures">
    {props.figures.map((item: IFigurePolygon| ICircle) => (
      <FigureItem
        params={item}
        key={item.id}
        activeFigureID={props.activeFigureID}
        changeActiveFigure={props.changeActiveFigure}
      />
    ))}
  </div>
);

class FigureItem extends React.Component<IPropsItem, any> {
  changeActiveFigure = type => event => {
    this.props.changeActiveFigure(this.props.params.id);
  };
  public render() {
    return (
      <div
        onClick={this.changeActiveFigure(this.props.params.id)}
        className={`figure-item`}
      >
        <p>{this.props.params.type}</p>
        {this.props.activeFigureID === this.props.params.id && (
          <div className="figure-item-active" />
        )}
      </div>
    );
  }
}