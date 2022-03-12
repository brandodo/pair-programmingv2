import React from "react";
import Pokemon from "./Components/Pokemon";
import Input from "./Components/Input";
import axios from "axios";
import pokemonTheme from "./assets/sounds/Pokemon-Theme-Song.mp3";
import "./styles/App.scss";
import Giphy from "./Components/Giphy";
import bump from "./assets/sounds/bump.mp3";
import fart from "./assets/sounds/fart.mp3";
import wow from "./assets/sounds/wow.mp3";
const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search";
const GIPHY_API_KEY = "eFXa6sZe3b1BwD889es0gi4VBFlhUPAT";

class App extends React.Component {
  state = {
    image: "",
    name: "",
    otherNames: [],
    gifUrl: "",
    showPokemon: false,
    answerArray: [],
    displayGif: false,
    playAudio: false,
  };

  // get pokemon data
  async fetchData() {
    const randomNum = Math.floor(Math.random() * 898);
    const insertAt = Math.floor(Math.random() * 4);
    let rightName = "";
    let tempArr = [];

    // get main pokemon
    await axios.get(`${POKE_API_URL}${randomNum}`).then((res) => {
      this.setState({
        name: res.data.name,
        image: res.data.sprites.front_default,
      });
      rightName = res.data.name;
    });

    // get decoy answers
    for (let i = 0; i < 3; i++) {
      const newRandomNum = Math.floor(Math.random() * 898);

      if (newRandomNum !== randomNum) {
        await axios.get(`${POKE_API_URL}${newRandomNum}`).then((res) => {
          tempArr.push(res.data.name);
        });
      }
    }

    tempArr.splice(insertAt, 0, rightName);
    this.setState({ answerArray: tempArr });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    // check clicked answer and display gif
    const checkAnswer = (name) => {
      if (name === this.state.name) {
        const wowObj = new Audio(wow);
        wowObj.play();
        // right answer: get gif, show pokemon, and reset state values
        axios
          .get(`${GIPHY_API_URL}?q="happy pokemon"&api_key=${GIPHY_API_KEY}`)
          .then((res) => {
            const responseArr = res.data.data;
            const randomGif = Math.floor(Math.random() * responseArr.length);
            const giphyUrl = responseArr[randomGif].embed_url;
            this.setState({
              showPokemon: true,
              gifUrl: giphyUrl,
              displayGif: true,
            });

            setTimeout(() => {
              this.setState({
                showPokemon: false,
                otherNames: [],
                gifUrl: "",
                displayGif: false,
              });
              this.fetchData();
            }, 3000);
          });

        // wrong answer: get gif
      } else {
        const fartObj = new Audio(fart);
        fartObj.play();
        axios
          .get(`${GIPHY_API_URL}?q="sad pokemon"&api_key=${GIPHY_API_KEY}`)
          .then((res) => {
            const responseArr = res.data.data;
            const randomGif = Math.floor(Math.random() * responseArr.length);
            const giphyUrl = responseArr[randomGif].embed_url;
            this.setState({ gifUrl: giphyUrl, displayGif: true });

            setTimeout(() => {
              this.setState({ displayGif: false });
            }, 3000);
          });
      }
    };
    // const playMusic = () => {
    //   if (this.state.playAudio === false) {
    //     this.setState({ playAudio: true });
    //     const theme = new Audio(pokemonTheme);
    //     theme.loop = true;
    //     theme.play();
    //   }
    // };
    const sound = () => {
      const audioObj = new Audio(bump);
      audioObj.play();
    };
    const boxes = this.state.answerArray.map((name, index) => {
      return (
        <Input
          key={`${name}-${index}`}
          name={name}
          clickHandler={checkAnswer}
          playSound={sound}
        />
      );
    });

    return (
      <div className="App">
        <iframe src={pokemonTheme} allow="autoPlay" className="music"></iframe>
        <audio autoplay loop>
          <source src={pokemonTheme} type="audio/mp3" />
        </audio>
        <div className="background">
          <Pokemon image={this.state.image} show={this.state.showPokemon} />
        </div>
        <div className="input-container">{boxes}</div>
        <Giphy gifUrl={this.state.gifUrl} display={this.state.displayGif} />
      </div>
    );
  }
}

export default App;
