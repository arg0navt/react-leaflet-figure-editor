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
var AddFigureType = /** @class */ (function (_super) {
    __extends(AddFigureType, _super);
    function AddFigureType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addFigure = function (data) { return function (event) {
            data.id = Math.random()
                .toString(36)
                .substr(2, 9);
            _this.props.addFigure(data);
        }; };
        return _this;
    }
    AddFigureType.prototype.render = function () {
        return (React.createElement("div", { className: "wrap-settings-type" },
            React.createElement("div", { key: 1, className: "settings-type", onClick: this.addFigure({ type: "Polygon", coordinates: [[]] }) },
                React.createElement("p", null, "Add Polygon")),
            React.createElement("div", { key: 2, className: "settings-type", onClick: this.addFigure({ type: "Circle", coordinates: [], pointRadius: [], radius: 0, properties: { radius_units: "m" } }) },
                React.createElement("p", null, "Add Circle")),
            React.createElement("div", { key: 3, className: "settings-type", onClick: this.addFigure({ type: "Point", coordinates: [] }) },
                React.createElement("p", null, "Add Point"))));
    };
    return AddFigureType;
}(React.Component));
export default AddFigureType;
