import { Component } from 'react';
import { Notify } from 'notiflix';
import * as API from 'services/api';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { startLoader, stopLoader } from 'components/Loader';

export class App extends Component {
  state = {
    data: [],
    query: '',
    page: 1,
    status: 'idle',
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'pending' });

      try {
        const response = await API.getImages(query, page);

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
        this.setState({ error, status: 'rejected' });
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

  render() {
    const { data, query, page, status } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'idle' && <p>Let`s start</p>}
        {status === 'pending' && startLoader()}
        {(status === 'rejected' && <h1>Ups... something went wrong</h1>) ||
          stopLoader()}
        {data.length > 0 && <ImageGallery hits={data} />}
        {data.length > 0 && (
          <Button onClick={this.handleLoadMore} status={status} />
        )}
      </div>
    );
  }
}
