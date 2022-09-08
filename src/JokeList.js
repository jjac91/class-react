import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";

class JokeList extends Component {
  static defaultProps = { jokesToGet: 10 };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };

    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length < this.props.jokesToGet) this.getJokes();
  }
  componentDidUpdate() {
    if (this.state.jokes.length < this.props.jokesToGet) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = this.state.jokes;
      let seenJokes = new Set(jokes.map((j) => j.id));

      while (jokes.length < this.props.jokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { status, ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
        console.log(jokes[0])
        this.setState(jokes[0] );
        console.log(this.state.jokes)
      }
    } catch (e) {
      console.log(e);
    }
  }
  generateNewJokes() {
    this.setState({ jokes: [] });
  }
  vote(id, delta) {
    this.setState((state) => ({
      jokes: state.jokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      ),
    }));
  }

  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>

        {sortedJokes.map((j) => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={this.vote}
          />
        ))}

        {sortedJokes.length < this.props.jokesToGet ? (
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
        ) : null}
      </div>
    );
  }
}
export default JokeList;
