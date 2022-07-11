import { Component } from 'react';
import * as API from 'services/api';

export class ImageGallery extends Component {
  state = {
    data: [],
    status: 'idle',
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.props;

    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const response = await API.getImages(searchQuery, page);

        if (response.total === 0) {
          alert('Sorry, no results matching your request');
          throw new Error();
        }

        this.setState({ status: 'resolved', data: response.hits });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  render() {
    const { data, status } = this.state;
    if (status === 'idle') {
      return <p>Let`s start</p>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'rejected') {
      return <h1>Ups...something went wrong</h1>;
    }

    if (status === 'resolved') {
      return (
        <ul>
          {data.map(element => (
            <li key={element.id}>
              <img src={element.webformatURL} alt={element.tags} />
            </li>
          ))}
        </ul>
      );
    }
  }
}
