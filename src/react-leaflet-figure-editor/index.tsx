import * as React from "react";
import * as L from "leaflet";
import Control from "@skyeer/react-leaflet-custom-control";
import { MapLayer, withLeaflet, Polygon, Marker } from "react-leaflet";
import {debounce} from "lodash";
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
    activeFigureID: null,
    clickActivated: true,
  };

  componentDidMount() {
    this.props.leaflet.map.on("click", e => {
      this.addPoint(e.latlng);
    });
  }

  createLeafletElement(props: any): any {
    return props;
  }

  getActiveFigure = (state: IfigureEditorState): IFigure | undefined => {
    return state.figureList.find(
      (figure: IFigure) => figure.id === state.activeFigureID
    );
  };

  addFigure = (figure: IFigure): void =>
    this.setState({
      figureList: [...this.state.figureList, figure],
      activeFigureID: figure.id
    });

  changeActiveFigure = (id: string): void =>
    this.setState({ activeFigureID: id });

  addPoint = (e: IPoint): void => {
    if (this.state.clickActivated) {
      this.setState(
        (prevState: IfigureEditorState): IfigureEditorState => {
          const activeFigure: IFigure | undefined = this.getActiveFigure(
            prevState
          );
          if (activeFigure) {
            if (activeFigure.type === "Polygon") {
              activeFigure.coordinates.push({ lat: e.lat, lng: e.lng });
            }
          }
          return prevState;
        }
      );
    }
  };

  dragPointPolygon = (id: string, index: number) => (e: any) => {
    this.setState(
      (prevState: IfigureEditorState): IfigureEditorState => {
        const activeFigure: IFigure | undefined = this.getActiveFigure(
          prevState
        );
        if (activeFigure) {
          prevState.clickActivated = false;
          activeFigure.coordinates[index].lat = e.latlng.lat;
          activeFigure.coordinates[index].lng = e.latlng.lng;
        }
        return prevState;
      }, debounce(() => this.setState({clickActivated: true}), 2000)
    );
  };

  renderPointsPolygon = (id: string, coordinates: IPoint[]) => {
    return coordinates.map((point: IPoint, index: number) => (
      <Marker
        key={id + index}
        position={point}
        icon={iconMarker}
        draggable={this.state.activeFigureID === id}
        onDrag={this.dragPointPolygon(id, index)}
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
              this.renderPointsPolygon(figure.id, figure.coordinates)
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
