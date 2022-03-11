import React, { Component } from "react";

export default class Pokemon extends Component {
  render() {
    return (
      <div className="pokemonImg">
        <img src={this.props.image} />
      </div>
    );
  }
}
