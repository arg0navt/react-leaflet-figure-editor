var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import * as L from "leaflet";
import Control from "@skyeer/react-leaflet-custom-control";
import { MapLayer, withLeaflet, Marker, Polygon, Circle } from "react-leaflet";
import InformationAboutPolygon from "./informationPolygon";
import InformationAboutCircle from "./informationCircle";
import InformationAboutPoint from "./informationPoint";
import AddFigureType from "./addFigureType";
import ListFigures from "./listFigures";
import { iconMarker, iconMarkerNotActive } from "./icons";
import "./index.css";
var FigureEditor = /** @class */ (function (_super) {
    __extends(FigureEditor, _super);
    function FigureEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            figureList: [],
            activeFigureID: null,
            clickActivated: true
        };
        _this.getActiveFigure = function (state) {
            return state.figureList.find(function (figure) { return figure.id === state.activeFigureID; });
        };
        _this.addFigure = function (figure) {
            return _this.setState({
                figureList: _this.state.figureList.concat([figure]),
                activeFigureID: figure.id
            }, function () { return _this.props.calbackChange(_this.state); });
        };
        _this.changeActiveFigure = function (id) {
            return _this.setState({ activeFigureID: id });
        };
        _this.addPoint = function (e) {
            if (_this.state.clickActivated) {
                _this.setState(function (prevState) {
                    var activeFigure = _this.getActiveFigure(prevState);
                    if (activeFigure) {
                        if (activeFigure.type === "Polygon") {
                            activeFigure.coordinates[0].push([e.lat, e.lng]);
                        }
                        else if (activeFigure.type === "Circle") {
                            if (activeFigure.coordinates.length) {
                                var radius = _this.countRadius(activeFigure.coordinates, [
                                    e.lat,
                                    e.lng
                                ]);
                                activeFigure.pointRadius = [e.lat, e.lng];
                                activeFigure.radius = radius;
                            }
                            else {
                                activeFigure.coordinates = [e.lat, e.lng];
                            }
                        }
                        else if (activeFigure.type === "Point") {
                            activeFigure.coordinates = [e.lat, e.lng];
                        }
                    }
                    return prevState;
                }, function () { return _this.props.calbackChange(_this.state); });
            }
        };
        _this.countRadius = function (center, point) {
            return L.latLng({ lat: center[0], lng: center[1] }).distanceTo(L.latLng({ lat: point[0], lng: point[1] }));
        };
        _this.deleteFigure = function (id) {
            _this.setState(function (prevState) {
                prevState.figureList = prevState.figureList.filter(function (item) { return item.id !== id; });
                return prevState;
            }, function () { return _this.props.calbackChange(_this.state); });
        };
        _this.deletePointPolygon = function (id, index) {
            _this.setState(function (prevState) {
                var activeFigure = _this.getActiveFigure(prevState);
                if (activeFigure && index !== null) {
                    activeFigure.coordinates[0] = activeFigure.coordinates[0].filter(function (item, indexPoint) { return indexPoint !== index; });
                }
                return prevState;
            }, function () { return _this.props.calbackChange(_this.state); });
        };
        _this.dragPointPolygon = function (id, index) { return function (e) {
            _this.setState(function (prevState) {
                var activeFigure = _this.getActiveFigure(prevState);
                if (activeFigure) {
                    prevState.clickActivated = false;
                    activeFigure.coordinates[0][index] = [e.latlng.lat, e.latlng.lng];
                }
                return prevState;
            }, function () { return _this.props.calbackChange(_this.state); });
        }; };
        _this.dragCircleCenter = function (id) { return function (e) {
            _this.setState(function (prevState) {
                var activeFigure = _this.getActiveFigure(prevState);
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
            }, function () { return _this.props.calbackChange(_this.state); });
        }; };
        _this.dragCircleRadius = function (id) { return function (e) {
            _this.setState(function (prevState) {
                var activeFigure = _this.getActiveFigure(prevState);
                if (activeFigure) {
                    var radius = _this.countRadius(activeFigure.coordinates, [
                        e.latlng.lat,
                        e.latlng.lng
                    ]);
                    activeFigure.pointRadius = [e.latlng.lat, e.latlng.lng];
                    activeFigure.radius = radius;
                }
                return prevState;
            }, function () { return _this.props.calbackChange(_this.state); });
        }; };
        _this.dragPoint = function (id) { return function (e) {
            _this.setState(function (prevState) {
                var activeFigure = _this.getActiveFigure(prevState);
                if (activeFigure) {
                    activeFigure.coordinates = [e.latlng.lat, e.latlng.lng];
                }
                return prevState;
            }, function () { return _this.props.calbackChange(_this.state); });
        }; };
        _this.renderPointsPolygon = function (id, coordinates) {
            return coordinates.map(function (point, index) { return (React.createElement(Marker, { key: id + index, position: { lat: point[0], lng: point[1] }, icon: id === _this.state.activeFigureID ? iconMarker : iconMarkerNotActive, draggable: _this.state.activeFigureID === id, onDrag: _this.dragPointPolygon(id, index) })); });
        };
        _this.renderPointsCircle = function (id, figure) {
            return [
                React.createElement(Marker, { key: id + "center", position: { lat: figure.coordinates[0], lng: figure.coordinates[1] }, icon: id === _this.state.activeFigureID ? iconMarker : iconMarkerNotActive, draggable: _this.state.activeFigureID === id, onDrag: _this.dragCircleCenter(id) }),
                React.createElement(Marker, { key: id + "radius", position: { lat: figure.pointRadius[0], lng: figure.pointRadius[1] }, icon: id === _this.state.activeFigureID ? iconMarker : iconMarkerNotActive, draggable: _this.state.activeFigureID === id, onDrag: _this.dragCircleRadius(id) })
            ];
        };
        return _this;
    }
    FigureEditor.prototype.componentDidMount = function () {
        var _this = this;
        this.props.leaflet.map.on("click", function (e) {
            console.log(e);
            _this.addPoint(e.latlng);
        });
    };
    FigureEditor.prototype.createLeafletElement = function (props) {
        return props;
    };
    FigureEditor.prototype.render = function () {
        var _this = this;
        var activeFigure = this.state.activeFigureID
            ? this.state.figureList.find(function (item) { return item.id === _this.state.activeFigureID; })
            : undefined;
        return (React.createElement("div", null,
            React.createElement(Control, { position: "topright" },
                React.createElement("div", { className: "figure-control" },
                    React.createElement("div", { className: "settings-figure-control" },
                        React.createElement(AddFigureType, { addFigure: this.addFigure }),
                        this.state.figureList.length > 0 && (React.createElement(ListFigures, { figures: this.state.figureList, activeFigureID: this.state.activeFigureID, changeActiveFigure: this.changeActiveFigure })),
                        activeFigure ? (activeFigure.type === "Polygon" ? (React.createElement(InformationAboutPolygon, { deletePointPolygon: function (id, index) {
                                return _this.deletePointPolygon(id, index);
                            }, deleteFigure: function (id) { return _this.deleteFigure(id); }, figure: activeFigure })) : activeFigure.type === "Circle" ? (React.createElement(InformationAboutCircle, { deleteFigure: function (id) { return _this.deleteFigure(id); }, figure: activeFigure })) : activeFigure.type === "Point" ? (React.createElement(InformationAboutPoint, { deleteFigure: function (id) { return _this.deleteFigure(id); }, figure: activeFigure })) : null) : null))),
            this.state.figureList.map(function (figure) {
                if (figure.type === "Polygon" && figure.coordinates[0].length >= 3) {
                    return [
                        React.createElement(Polygon, { key: figure.id, positions: figure.coordinates[0].concat([
                                figure.coordinates[0][figure.coordinates[0].length - 1]
                            ]), refs: figure.id, color: figure.id === _this.state.activeFigureID ? "red" : "blue" }),
                        _this.renderPointsPolygon(figure.id, figure.coordinates[0])
                    ];
                }
                else if (figure.type === "Circle" &&
                    figure.coordinates.length &&
                    figure.radius) {
                    return [
                        React.createElement(Circle, { key: figure.id, center: figure.coordinates, radius: figure.radius, color: figure.id === _this.state.activeFigureID ? "red" : "blue" }),
                        _this.renderPointsCircle(figure.id, figure)
                    ];
                }
                else if (figure.type === "Point" && figure.coordinates.length) {
                    return (React.createElement(Marker, { key: figure.id, position: {
                            lat: figure.coordinates[0],
                            lng: figure.coordinates[1]
                        }, icon: figure.id === _this.state.activeFigureID
                            ? iconMarker
                            : iconMarkerNotActive, draggable: _this.state.activeFigureID === figure.id, onDrag: _this.dragPoint(figure.id) }));
                }
                else {
                    return null;
                }
            })));
    };
    FigureEditor.defaultProps = {
        calbackChange: function () { }
    };
    return FigureEditor;
}(MapLayer));
export default withLeaflet(FigureEditor);
