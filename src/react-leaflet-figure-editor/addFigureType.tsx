import * as React from "react";
import {IFigure} from "./interfaces";

interface IAddFigureType {
  addFigure: (figure: IFigure) => void;
}

export default class AddFigureType extends React.Component<IAddFigureType, any> {
    public render() {
        return(
          <div className="settings-figure-control">
            <button className="settings-type">Полигон</button>
            <button className="settings-type">Круг</button>
            <button className="settings-type">Точка</button>
          </div>
        );
    }
}