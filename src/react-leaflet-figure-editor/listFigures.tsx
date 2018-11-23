import * as React from "react";
import { IFigure } from "./interfaces";

interface IPropsList {
  figures: IFigure[]
}

export default (props: IPropsList)  => (
  <div className="list-figures">
    {props.figures.map((item: IFigure) => (
      <FigureItem {...item} />
    ))}
  </div>
);

class FigureItem extends React.Component<IFigure, any> {
  public render() {
    return <div className="figure-item">{this.props.type}</div>;
  }
}