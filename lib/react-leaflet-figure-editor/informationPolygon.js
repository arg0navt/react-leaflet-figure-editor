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
var InformationAboutPolygon = /** @class */ (function (_super) {
    __extends(InformationAboutPolygon, _super);
    function InformationAboutPolygon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focusPoint: null
        };
        _this.changeFocusPoint = function (id) { return function (e) {
            return _this.setState({ focusPoint: id });
        }; };
        _this.deletePoint = function () { return function (e) {
            _this.props.deletePointPolygon(_this.props.figure.id, _this.state.focusPoint);
            _this.setState({ focusPoint: null });
        }; };
        _this.deleteFigure = function () { return function (e) { return _this.props.deleteFigure(_this.props.figure.id); }; };
        return _this;
    }
    InformationAboutPolygon.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "figure-info" },
            this.props.figure.coordinates.length ? ([
                React.createElement("p", { key: "active_points_text" }, "Points"),
                React.createElement("div", { key: "active_points", className: "figure-info__points" }, this.props.figure.coordinates[0].map(function (point, index) { return (React.createElement("p", { key: index, onClick: _this.changeFocusPoint(index), style: index === _this.state.focusPoint
                        ? { background: "#17c3b4" }
                        : {} },
                    point[0],
                    ", ",
                    point[1])); }))
            ]) : (React.createElement("p", { key: "dont_have_active_points", style: { marginBottom: 0 } }, "Don't have data")),
            this.state.focusPoint !== null ? (React.createElement("button", { onClick: this.deletePoint() }, "Delete figure's point")) : null,
            React.createElement("button", { onClick: this.deleteFigure() }, "Delete figure")));
    };
    return InformationAboutPolygon;
}(React.Component));
export default InformationAboutPolygon;
