import React, { Component } from "react";

export default class Coininfo extends Component {
  constructor(props) {
    super(props);

    this.state = { name: this.props.coin.name };
    this.handleCoinInput = this.handleCoinInput.bind(this);
  }

  handleCoinInput(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>{this.props.coin.name}</h1>
        <input type="text" onChange={e => this.handleCoinInput(e)} />
        <button
          onClick={() =>
            this.props.updateCoin(this.props.index, this.state.name)
          }
        >
          NICKNAME COIN
        </button>
        <button onClick={() => this.props.deleteCoin(this.props.index)}>
          DELETE COIN
        </button>
      </div>
    );
  }
}