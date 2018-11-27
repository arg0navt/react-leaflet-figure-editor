import * as React from "react";
import * as L from "leaflet";
import AddFigureType from "./addFigureType";
import ListFigures from "./listFigures";
import InformationAboutFigure from "./information";
import Control from "@skyeer/react-leaflet-custom-control";
import { IFigure, IfigureEditorState, IPoint } from "./interfaces";
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
    activeFigureID: null
  };

  componentDidMount() {
    this.props.leaflet.map.on("click", e => this.addPoint(e.latlng));
  }

  createLeafletElement(props: any): any {
    return props;
  }

  addFigure = (figure: IFigure): void =>
    this.setState({
      figureList: [...this.state.figureList, figure],
      activeFigureID: figure.id
    });

  changeActiveFigure = (id: string): void => this.setState({ activeFigureID: id });

  addPoint = (e: IPoint) : void=> {
    this.setState((prevState: IfigureEditorState) => {
      const activeFigure = prevState.figureList.find((item: IFigure) => item.id === this.state.activeFigureID);
      console.log(activeFigure);
      return prevState;
    });
  }

  public render() {
    const activeFigure = this.state.activeFigureID
      ? this.state.figureList.find(item => item.id === this.state.activeFigureID)
      : undefined;

    return (
      <Control position="topright">
        <div className="figure-control">
          <div className="settings-figure-control">
            <AddFigureType addFigure={this.addFigure} />
            {this.state.figureList.length > 0 && (
              <ListFigures
                figures={this.state.figureList}
                activeFigureID={this.state.activeFigureID}
                changeActiveFigure={this.changeActiveFigure}
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
