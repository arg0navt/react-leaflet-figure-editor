import * as React from "react";
import AddFigureType from "./addFigureType";
import ListFigures from "./listFigures";
import { IFigure, IfigureEditorState } from "./interfaces";

const SettingIcon = () => (
  <svg
    enableBackground="new 0 0 32 32"
    id="Editable-line"
    version="1.1"
    viewBox="0 0 32 32"
  >
    <circle
      cx="16"
      cy="16"
      fill="none"
      id="XMLID_224_"
      r="4"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <path
      d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z  "
      fill="none"
      id="XMLID_242_"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
  </svg>
);

export default class FigureEditor extends React.Component<
  any,
  IfigureEditorState
> {
  state: IfigureEditorState = {
    showAddFigureType: false,
    figureList: []
  };

  toggleSettings = () =>
    this.setState({ showAddFigureType: !this.state.showAddFigureType });

  addFigure = (figure: IFigure): void =>
    this.setState({ figureList: [...this.state.figureList, figure] });

  render() {
    return (
      <div className="figure-control">
        <div className="wrap-figure-control">
          <button className="settings-button" onClick={this.toggleSettings}>
            <SettingIcon />
          </button>
        </div>
        {this.state.showAddFigureType ? (
          <AddFigureType addFigure={this.addFigure} />
        ) : null}
        {this.state.figureList.length ? (
          <ListFigures figures={this.state.figureList} />
        ) : null}
      </div>
    );
  }
}
