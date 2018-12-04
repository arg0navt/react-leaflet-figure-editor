import * as React from "react";
import * as L from "leaflet";
import Control from "@skyeer/react-leaflet-custom-control";
import { MapLayer, withLeaflet, Marker, Polygon, Circle } from "react-leaflet";
import {
  IFigurePolygon,
  ICircle,
  IfigureEditorState,
  IPoint
} from "./interfaces";
import InformationAboutPolygon from "./informationPolygon";
import InformationAboutCircle from "./informationCircle";
import InformationAboutPoint from "./informationPoint";
import AddFigureType from "./addFigureType";
import ListFigures from "./listFigures";
import { iconMarker, iconMarkerNotActive } from "./icons";

declare module "react-leaflet" {
  const withLeaflet: <T>(component: T) => T;
  interface ILeafletContext {
    map?: L.Map;
  }
}

class FigureEditor extends MapLayer<any> {
  static defaultProps = {
    calbackChange: () => {}
  }

  state: IfigureEditorState = {
    figureList: [],
    activeFigureID: null,
    clickActivated: true
  };

  componentDidMount() {
    this.props.leaflet.map.on("click", e => {
      console.log(e);
      this.addPoint(e.latlng);
    });
  }

  createLeafletElement(props: any): any {
    return props;
  }

  getActiveFigure = (
    state: IfigureEditorState
  ): IFigurePolygon | ICircle | undefined => {
    return state.figureList.find(
      (figure: IFigurePolygon | ICircle) => figure.id === state.activeFigureID
    );
  };

  addFigure = (figure: IFigurePolygon | ICircle): void =>
    this.setState({
      figureList: [...this.state.figureList, figure],
      activeFigureID: figure.id
    }, () => this.props.calbackChange(this.state));

  changeActiveFigure = (id: string): void =>
    this.setState({ activeFigureID: id });

  addPoint = (e: IPoint): void => {
    if (this.state.clickActivated) {
      this.setState(
        (prevState: IfigureEditorState): IfigureEditorState => {
          const activeFigure: any = this.getActiveFigure(prevState);
          if (activeFigure) {
            if (activeFigure.type === "Polygon") {
              activeFigure.coordinates[0].push([e.lat, e.lng]);
            } else if (activeFigure.type === "Circle") {
              if (activeFigure.coordinates.length) {
                const radius = this.countRadius(activeFigure.coordinates, [
                  e.lat,
                  e.lng
                ]);
                activeFigure.pointRadius = [e.lat, e.lng];
                activeFigure.radius = radius;
              } else {
                activeFigure.coordinates = [e.lat, e.lng];
              }
            } else if (activeFigure.type === "Point") {
              activeFigure.coordinates = [e.lat, e.lng];
            }
          }
          return prevState;
        }, () => this.props.calbackChange(this.state)
      );
    }
  };

  countRadius = (center: number[], point: number[]): number => {
    return L.latLng({ lat: center[0], lng: center[1] }).distanceTo(
      L.latLng({ lat: point[0], lng: point[1] })
    );
  };

  deleteFigure = (id: string) => {
    this.setState(
      (prevState: IfigureEditorState): IfigureEditorState => {
        prevState.figureList = prevState.figureList.filter(
          item => item.id !== id
        );
        return prevState;
      }, () => this.props.calbackChange(this.state)
    );
  };

  deletePointPolygon = (id: string, index: number | null) => {
    this.setState(
      (prevState: IfigureEditorState): IfigureEditorState => {
        const activeFigure: any = this.getActiveFigure(prevState);
        if (activeFigure && index !== null) {
          activeFigure.coordinates[0] = activeFigure.coordinates[0].filter(
            (item, indexPoint) => indexPoint !== index
          );
        }
        return prevState;
      }, () => this.props.calbackChange(this.state)
    );
  };

  dragPointPolygon = (id: string, index: number) => (e: any) => {
    this.setState((prevState: IfigureEditorState): IfigureEditorState => {
      const activeFigure: any = this.getActiveFigure(prevState);
      if (activeFigure) {
        prevState.clickActivated = false;
        activeFigure.coordinates[0][index] = [e.latlng.lat, e.latlng.lng];
      }
      return prevState;
    }, () => this.props.calbackChange(this.state));
  };

  dragCircleCenter = (id: string) => (e: any) => {
    this.setState(
      (prevState: IfigureEditorState): IfigureEditorState => {
        const activeFigure: any = this.getActiveFigure(prevState);
        if (activeFigure) {
          activeFigure.pointRadius = [
            activeFigure.pointRadius[0] -
              (activeFigure.coordinates[0] - e.latlng.lat),
            activeFigure.pointRadius[1] -
              (activeFigure.coordinates[1] - e.latlng.lng)
          ];
          activeFigure.coordinates = [e.latlng.lat, e.latlng.lng];
        }
        return prevState;
      }, () => this.props.calbackChange(this.state)
    );
  };

  dragCircleRadius = (id: string) => (e: any) => {
    this.setState(
      (prevState: IfigureEditorState): IfigureEditorState => {
        const activeFigure: any = this.getActiveFigure(prevState);
        if (activeFigure) {
          const radius = this.countRadius(activeFigure.coordinates, [
            e.latlng.lat,
            e.latlng.lng
          ]);
          activeFigure.pointRadius = [e.latlng.lat, e.latlng.lng];
          activeFigure.radius = radius;
        }
        return prevState;
      }, () => this.props.calbackChange(this.state)
    );
  };

  dragPoint = (id: string) => (e: any) => {
    this.setState(
      (prevState: IfigureEditorState): IfigureEditorState => {
        const activeFigure: any = this.getActiveFigure(prevState);
        if (activeFigure) {
          activeFigure.coordinates = [e.latlng.lat, e.latlng.lng];
        }
        return prevState;
      }, () => this.props.calbackChange(this.state)
    );
  };

  renderPointsPolygon = (id: string, coordinates: number[][]) => {
    return coordinates.map((point: number[], index: number) => (
      <Marker
        key={id + index}
        position={{ lat: point[0], lng: point[1] }}
        icon={
          id === this.state.activeFigureID ? iconMarker : iconMarkerNotActive
        }
        draggable={this.state.activeFigureID === id}
        onDrag={this.dragPointPolygon(id, index)}
      />
    ));
  };

  renderPointsCircle = (id: string, figure: any) => {
    return [
      <Marker
        key={id + "center"}
        position={{ lat: figure.coordinates[0], lng: figure.coordinates[1] }}
        icon={
          id === this.state.activeFigureID ? iconMarker : iconMarkerNotActive
        }
        draggable={this.state.activeFigureID === id}
        onDrag={this.dragCircleCenter(id)}
      />,
      <Marker
        key={id + "radius"}
        position={{ lat: figure.pointRadius[0], lng: figure.pointRadius[1] }}
        icon={
          id === this.state.activeFigureID ? iconMarker : iconMarkerNotActive
        }
        draggable={this.state.activeFigureID === id}
        onDrag={this.dragCircleRadius(id)}
      />
    ];
  };

  public render() {
    const activeFigure: any = this.state.activeFigureID
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
              {activeFigure ? (
                activeFigure.type === "Polygon" ? (
                  <InformationAboutPolygon
                    deletePointPolygon={(id: string, index: number | null) =>
                      this.deletePointPolygon(id, index)
                    }
                    deleteFigure={(id: string) => this.deleteFigure(id)}
                    figure={activeFigure}
                  />
                ) : activeFigure.type === "Circle" ? (
                  <InformationAboutCircle
                    deleteFigure={(id: string) => this.deleteFigure(id)}
                    figure={activeFigure}
                  />
                ) : activeFigure.type === "Point" ? (
                  <InformationAboutPoint
                    deleteFigure={(id: string) => this.deleteFigure(id)}
                    figure={activeFigure}
                  />
                ) : null
              ) : null}
            </div>
          </div>
        </Control>
        {this.state.figureList.map((figure: any) => {
          if (figure.type === "Polygon" && figure.coordinates[0].length >= 3) {
            return [
              <Polygon
                key={figure.id}
                positions={[
                  ...figure.coordinates[0],
                  figure.coordinates[0][figure.coordinates[0].length - 1]
                ]}
                refs={figure.id}
                color={figure.id === this.state.activeFigureID ? "red" : "blue"}
              />,
              this.renderPointsPolygon(figure.id, figure.coordinates[0])
            ];
          } else if (
            figure.type === "Circle" &&
            figure.coordinates.length &&
            figure.radius
          ) {
            return [
              <Circle
                key={figure.id}
                center={figure.coordinates}
                radius={figure.radius}
                color={figure.id === this.state.activeFigureID ? "red" : "blue"}
              />,
              this.renderPointsCircle(figure.id, figure)
            ];
          } else if (figure.type === "Point" && figure.coordinates.length) {
            return (
              <Marker
                key={figure.id}
                position={{
                  lat: figure.coordinates[0],
                  lng: figure.coordinates[1]
                }}
                icon={
                  figure.id === this.state.activeFigureID
                    ? iconMarker
                    : iconMarkerNotActive
                }
                draggable={this.state.activeFigureID === figure.id}
                onDrag={this.dragPoint(figure.id)}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default withLeaflet(FigureEditor);
