import * as React from "react";
import * as L from "leaflet";
import Control from "@skyeer/react-leaflet-custom-control";
import { MapLayer, withLeaflet, Polygon, Marker } from "react-leaflet";
import { IFigure, IfigureEditorState, IPoint } from "./interfaces";
import InformationAboutFigure from "./information";
import AddFigureType from "./addFigureType";
import ListFigures from "./listFigures";
import { iconMarker } from "./icons";

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

  changeActiveFigure = (id: string): void =>
    this.setState({ activeFigureID: id });

  addPoint = (e: IPoint): void => {
    this.setState((prevState: IfigureEditorState) => {
      const activeFigure: IFigure | undefined = prevState.figureList.find(
        (item: IFigure) => item.id === this.state.activeFigureID
      );
      if (activeFigure) {
        if (activeFigure.type === "Polygon") {
          activeFigure.coordinates.push({ lat: e.lat, lng: e.lng });
        }
      }
      return prevState;
    });
  };

  renderPointsPolyline = (id: string, coordinates: IPoint[]) => {
    return coordinates.map((point: IPoint, index: number) => (
      <Marker
        key={id + point.lat + point.lng + index}
        position={point}
        icon={iconMarker}
      />
    ));
  };

  public render() {
    const activeFigure = this.state.activeFigureID
      ? this.state.figureList.find(
          item => item.id === this.state.activeFigureID
        )
      : undefined;
    return (
      <div>
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
        {this.state.figureList.map((figure: IFigure) => {
          if (figure.type === "Polygon" && figure.coordinates.length >= 3) {
            return [
              <Polygon
                key={figure.id}
                positions={[...figure.coordinates, figure.coordinates[0]]}
                refs={figure.id}
                color={"red"}
              />,
              this.renderPointsPolyline(figure.id, figure.coordinates)
            ];
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default withLeaflet(FigureEditor);
