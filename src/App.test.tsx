import * as React from "react";
import FigureEditor from "./react-leaflet-figure-editor";
import AddFigureType from "./react-leaflet-figure-editor/addFigureType";
import ListFigures from "./react-leaflet-figure-editor/listFigures";
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

it("addFigureType", () => {
  const returnFigure = figure => {
    if (
      figure.type === "Polygon" ||
      figure.type === "Circle" ||
      figure.type === "LineString" ||
      figure.type === "Point"
    ) {
      if (figure.type === "Polygon") {
          delete figure.id
          expect(figure).toEqual({type: "Polygon", coordinates: [[]]})
      }
      if (figure.type === "Circle") {
        delete figure.id
        expect(figure).toEqual({type: "Circle", coordinates: [], pointRadius: [], radius: 0, properties: {radius_units: "m"}})
      }
      if (figure.type === "LineString") {
        delete figure.id
        expect(figure).toEqual({type: "LineString", coordinates: []})
      }
      if (figure.type === "Point") {
        delete figure.id
        expect(figure).toEqual({type: "Point", coordinates: []})
      }
    } else {
      expect(() => {}).toThrowError("🔥 not correct type 🔥")
    }
  };
  const wrapper = shallow(<AddFigureType addFigure={returnFigure} />);
  wrapper.find(".click-0").simulate("click");
  wrapper.find(".click-1").simulate("click");
  wrapper.find(".click-2").simulate("click");
  wrapper.find(".click-3").simulate("click");
});

it("listFigures", () => {
  const changeActiveFigure = id => {
    wrapper.setProps({activeFigureID: id})
    wrapper.update()
  }
  const wrapper = shallow(<ListFigures
    figures={[]}
    activeFigureID={null}
    changeActiveFigure={changeActiveFigure}
  />);
  wrapper.setProps({figures: [{type: "Polygon", coordinates: [[]], id: "1"}]})
  wrapper.setProps({figures: [{type: "Polygon", coordinates: [[]], id: "1"}, {type: "Polygon", coordinates: [[]], id: "2"}]})
  expect(wrapper.find('.list-figures').childAt(0).props().params).toEqual({ type: 'Polygon', coordinates: [ [] ], id: '1' })
  expect(wrapper.find('.list-figures').childAt(1).props().params).toEqual({ type: 'Polygon', coordinates: [ [] ], id: '2' })
  wrapper.setProps({activeFigureID: "1"})
  expect(wrapper.find('.list-figures').childAt(0).html()).toEqual('<div class="figure-item"><p>Polygon</p><div class="figure-item-active"></div></div>')
})