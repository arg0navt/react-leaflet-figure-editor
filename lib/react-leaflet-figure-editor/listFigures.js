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
export default (function (props) { return (React.createElement("div", { className: "list-figures" }, props.figures.map(function (item) { return (React.createElement(FigureItem, { params: item, key: item.id, activeFigureID: props.activeFigureID, changeActiveFigure: props.changeActiveFigure })); }))); });
var FigureItem = /** @class */ (function (_super) {
    __extends(FigureItem, _super);
    function FigureItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.changeActiveFigure = function (type) { return function (event) {
            _this.props.changeActiveFigure(_this.props.params.id);
        }; };
        return _this;
    }
    FigureItem.prototype.render = function () {
        return (React.createElement("div", { onClick: this.changeActiveFigure(this.props.params.id), className: "figure-item" },
            React.createElement("p", null, this.props.params.type),
            this.props.activeFigureID === this.props.params.id && (React.createElement("div", { className: "figure-item-active" }))));
    };
    return FigureItem;
}(React.Component));
