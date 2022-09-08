import React, { Component } from "react";

class Joke extends Component {
  constructor(props) {
    super(props);
    // this.upVote = this.upVote.bind(this);
    // this.downVote = this.downVote.bind(this);
  }
  // upVote() {
  //   console.log(this.props)
  //   this.props.vote(this.props.id, +1);
  // }

  // downVote() {
  //   console.log(this.props)
  //   this.props.vote(this.props.id, -1);
  // }
  
  render() {
    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button >
            <i className="fas fa-thumbs-up" />
          </button>

          <button >
            <i className="fas fa-thumbs-down" />
          </button>

          {this.prop.votes}
        </div>

        <div className="Joke-text">{this.prop.text}</div>
      </div>
    );
  }
}
export default Joke;
