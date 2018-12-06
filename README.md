<h1 align="center" size="40">React-leaflet-figure-editor</h1>

<div align="center">
  
[![Build Status](https://travis-ci.org/argonavt11/react-leaflet-figure-editor.svg?branch=master)](https://travis-ci.org/argonavt11/react-leaflet-figure-editor)
[![CircleCI](https://circleci.com/gh/argonavt11/react-leaflet-figure-editor.svg?style=svg)](https://circleci.com/gh/argonavt11)

![](https://github.com/argonavt11/react-leaflet-figure-editor/blob/master/public/demo.gif?raw=true)

</div>

---

#### Install

```sh
npm install react-leaflet-figure-editor
yarn add react-leaflet-figure-editor
```
---
```javascript
import React from "react";
import FigureEditor from "react-leaflet-figure-editor";
import { Map, TileLayer } from "react-leaflet";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Map center={[47.445745, 40.272891666666666]} zoom={10} ref="map">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FigureEditor />
        </Map>
      </div>
    );
  }
}

export default App;

```

| Prop             | Type     | Default           | Description                                                                                                                                                                                |
| --------------- | ------- | ---------------- | ------------------------------------------------------------- |
| calbackChange    | Function    | () => {}    | Called after change figures                                                                                                                                                        |
