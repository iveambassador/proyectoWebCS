import React, { Component } from "react";
import Pie from "./charts/pie";
import Bar from "./charts/bar";
import Tabla from "./charts/tabla";

export default class home extends Component {
  render() {
    return (
      <div>
        <Tabla />
        <Pie />
        <Bar />
      </div>
    );
  }
}
