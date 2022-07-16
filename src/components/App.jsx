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
    data: [],
    query: '',
    page: 1,
    status: 'idle',
    url: null,
    isModalOpen: false,
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
          this.setState({ data: [] });
          throw new Error();
        }

        this.setState(prevState => ({
          status: 'resolved',
          data: [...prevState.data, ...response.hits],
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
    this.setState({ query, page: 1, data: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  setActiveImageUrl = activeUrl => this.setState({ url: activeUrl });

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false, url: '' });

  render() {
    const { data, page, status, url } = this.state;
    const isLastPage = Math.round(data.length / resultsQuantity) < page;
    console.log(isLastPage);

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && startLoader()}
        {(status === 'rejected' && <h1> Ups... something went wrong</h1>) ||
          stopLoader()}
        {data.length > 0 && (
          <ImageGallery hits={data} onPreviewClick={this.setActiveImageUrl} />
        )}
        {url && (
          <Modal
            activeUrl={url}
            imgAlt={url}
            onOpen={this.openModal}
            onClose={this.closeModal}
          />
        )}
        {status === 'resolved' && !isLastPage && (
          <Button onClick={this.handleLoadMore} status={status} />
        )}
        <GlobalStyle />
      </Container>
    );
  }
}
