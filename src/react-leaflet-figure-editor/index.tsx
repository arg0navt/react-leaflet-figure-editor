import * as React from "react";
import * as L from "leaflet";
import AddFigureType from "./addFigureType";
import ListFigures from "./listFigures";
import InformationAboutFigure from "./information";
import Control from "@skyeer/react-leaflet-custom-control";
import { IFigure, IfigureEditorState } from "./interfaces";
import { MapLayer, withLeaflet } from "react-leaflet";

declare module "react-leaflet" {
  const withLeaflet: <T>(component: T) => T;
  interface ILeafletContext {
    map?: L.Map;
  }
}

class FigureEditor extends MapLayer<any> {
  state: IfigureEditorState = {
    figureList: [],
    focusFigure: null
  };

  addFigure = (figure: IFigure): void =>
    this.setState({
      figureList: [...this.state.figureList, figure],
      focusFigure: figure.id
    });

  changeFucusFigure = (id: string): void => this.setState({ focusFigure: id });

  componentDidMount() {
    this.props.leaflet.map.on("click", e => console.log(e));
  }

  createLeafletElement(props: any): any {
    return props;
  }

  public render() {
    const activeFigure = this.state.focusFigure
      ? this.state.figureList.find(item => item.id === this.state.focusFigure)
      : undefined;

    return (
      <Control position="topright">
        <div className="figure-control">
          <div className="settings-figure-control">
            <AddFigureType addFigure={this.addFigure} />
            {this.state.figureList.length > 0 && (
              <ListFigures
                figures={this.state.figureList}
                focusFigure={this.state.focusFigure}
                changeFucusFigure={this.changeFucusFigure}
              />
            )}
            {activeFigure && <InformationAboutFigure {...activeFigure} />}
          </div>
        </div>
      </Control>
    );
  }
}

export default withLeaflet(FigureEditor);
