import { Component } from 'react';
import { Notify } from 'notiflix';
import { getImages, resultsQuantity } from 'services/api';
import { GlobalStyle, Container } from './GlobalStyles';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { startLoader, stopLoader } from 'components/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    status: 'idle',
    url: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'pending' });

      try {
        const response = await getImages(query, page);

        if (response.total === 0) {
          Notify.failure('Sorry, no results matching your request', {
            clickToClose: true,
          });
          this.setState({ images: [] });
          throw new Error();
        }

        this.setState(prevState => ({
          status: 'resolved',
          images: [...prevState.images, ...response.hits],
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleSubmit = query => {
    if (query === this.state.query) {
      Notify.info('The search query does`t change', {
        clickToClose: true,
      });
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = activeUrl => this.setState({ url: activeUrl });

  closeModal = () => this.setState({ url: '' });

  render() {
    const { images, page, status, url } = this.state;
    const isLastPage = Math.round(images.length / resultsQuantity) < page;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && startLoader()}
        {(status === 'rejected' && <h1> Ups... something went wrong</h1>) ||
          stopLoader()}
        {images.length > 0 && (
          <ImageGallery hits={images} onPreviewClick={this.openModal} />
        )}
        {url && (
          <Modal activeUrl={url} imgAlt={url} onClose={this.closeModal} />
        )}
        {status === 'resolved' && !isLastPage && (
          <Button onClick={this.handleLoadMore} status={status} />
        )}
        <GlobalStyle />
      </Container>
    );
  }
}
