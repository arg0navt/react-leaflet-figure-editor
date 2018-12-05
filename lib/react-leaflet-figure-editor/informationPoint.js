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
var InformationAboutPoint = /** @class */ (function (_super) {
    __extends(InformationAboutPoint, _super);
    function InformationAboutPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deleteFigure = function () { return function (e) {
            return _this.props.deleteFigure(_this.props.figure.id);
        }; };
        return _this;
    }
    InformationAboutPoint.prototype.render = function () {
        return (React.createElement("div", { className: "figure-info" },
            this.props.figure.coordinates.length ? (React.createElement("p", { key: "active_points_text" },
                "Point:",
                React.createElement("span", null,
                    this.props.figure.coordinates[0],
                    ",",
                    " ",
                    this.props.figure.coordinates[1]))) : (React.createElement("p", { key: "dont_have_active_points", style: { marginBottom: 0 } }, "Don't have data")),
            React.createElement("button", { onClick: this.deleteFigure() }, "Delete figure")));
    };
    return InformationAboutPoint;
}(React.Component));
export default InformationAboutPoint;
