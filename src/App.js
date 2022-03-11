import React from "react";
import "./styles/App.scss";
import Pokemon from "./Components/Pokemon";
import Input from "./Components/Input";
import axios from "axios";
class App extends React.Component {
  state = {
    image: "",
    name: "",
  };
  componentDidMount() {
    let randomNum = Math.floor(Math.random() * 898);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`).then((res) => {
      this.setState({ image: res.data.sprites.front_default });
      console.log(res);
    });
  }
  render() {
    return (
      <div className="App">
        <Pokemon image={this.state.image} />
        <Input />
      </div>
    );
  }
}

export default App;
