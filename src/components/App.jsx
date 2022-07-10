import { Component } from 'react';
import { Searchbar } from 'components/Searchbar';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
  };

  render() {
    return (
      <Searchbar />
    )
  }
}
