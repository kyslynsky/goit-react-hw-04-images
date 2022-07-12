import { Component } from 'react';
import * as API from 'services/api';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';

export class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    status: 'idle',
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const response = await API.getImages(searchQuery, page);

        if (response.total === 0) {
          alert('Sorry, no results matching your request');
          throw new Error();
        }

        this.setState({
          status: 'resolved',
          data: response.hits,
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // loadImages = () => {

  // }

  render() {
    const { data, status } = this.state;

    return (
      <>
        {status === 'idle' && <p>Let`s start</p>}
        {status === 'pending' && <div>Loading...</div>}
        {status === 'rejected' && <h1>Ups...something went wrong</h1>}
        {status === 'resolved' && (
          <>
            <ul>
              <ImageGalleryItem data={data} />
            </ul>
            <Button onClick={this.handleLoadMore} status={status} />
          </>
        )}
      </>
    );
  }
}
