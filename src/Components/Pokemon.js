import React, { Component } from "react";

export default class Pokemon extends Component {
  render() {
    return (
      <div className="imgContainer">
        <img
          className={
            this.props.show ? "pokemonImg pokemonImg--show" : "pokemonImg"
          }
          src={this.props.image}
          draggable="false"
        />
      </div>
    );
  }
}
