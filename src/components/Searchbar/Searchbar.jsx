import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase().trim(' ') });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSearchSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            value={this.state.query}
            onChange={this.handleInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
