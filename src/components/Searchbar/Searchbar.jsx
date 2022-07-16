import { Component } from 'react';
import { Notify } from 'notiflix';
import { GoSearch } from 'react-icons/go';
import {
  Header,
  Searchform,
  SearchButton,
  BtnIco,
  Input,
} from './Searchbar.styled';

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
      <Header>
        <Searchform onSubmit={this.handleSearchSubmit}>
          <SearchButton type="submit">
            <BtnIco>
              <GoSearch />
            </BtnIco>
          </SearchButton>

          <Input
            value={this.state.query}
            onChange={this.handleInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Searchform>
      </Header>
    );
  }
}
