import { Component } from 'react';
import { Notify } from 'notiflix';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim(' ') === '') {
      Notify.warning('There is nothing to find', {
        clickToClose: true,
      });
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
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
