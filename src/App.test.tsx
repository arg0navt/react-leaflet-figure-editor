import * as React from "react";
import FigureEditor from "./react-leaflet-figure-editor";
import AddFigureType from "./react-leaflet-figure-editor/addFigureType";
import { Map, TileLayer } from "react-leaflet";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

configure({ adapter: new Adapter() });

it("render default", () => {
  const wrapper = shallow(
    <div>
      <Map center={[47.445745, 40.272891666666666]} zoom={10}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FigureEditor />
      </Map>
    </div>
  );
  //   const output = shallow(wrapper);
  expect(wrapper);
});

it("render addFigureType", () => {
  const returnFigure = figure => {
    if (
      figure.type === "Polygon" ||
      figure.type === "Circle" ||
      figure.type === "LineString" ||
      figure.type === "Point"
    ) {
      if (figure.type === "Polygon") {
        if (
          !(
            figure.coordinates &&
            figure.coordinates.length &&
            figure.coordinates[0].length
          )
        ) {
          expect(() => {}).toThrowError("🔥 button Polygon don't add coordinates 🔥")
        }
      }
    }
  };
  const wrapper = shallow(<AddFigureType addFigure={returnFigure} />);
  wrapper.find(".click-0").simulate("click");
  wrapper.find(".click-1").simulate("click");
  wrapper.find(".click-2").simulate("click");
  wrapper.find(".click-3").simulate("click");
});
