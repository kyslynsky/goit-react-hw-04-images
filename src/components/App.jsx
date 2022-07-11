import { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query, page } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchQuery={query} page={page} />
      </div>
    );
  }
}
