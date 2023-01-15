import { Component } from 'react';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { SearchBar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { STATUS } from 'constance/status';
import { getImages } from '../../services/images.service';

import { AppStyle } from './App.styled';

export class App extends Component {
  state = {
    search: '',
    posts: [],
    pageNumber: 1,
    modalOpen: false,
    modalImg: null,
    status: STATUS.idle,
  };

  componentDidUpdate(_, prevState) {
    const { pageNumber, search } = this.state;
    if (search !== prevState.search || pageNumber !== prevState.pageNumber) {
      this.fetchData({ pageNumber, search });
    }
  }

  fetchData = async ({ pageNumber, search }) => {
    this.setState({ status: STATUS.loading });
    try {
      const { hits } = await getImages({ page: pageNumber, q: search });
      const data = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
        id: id,
        largeImageURL: largeImageURL,
        webformatURL: webformatURL,
        tags: tags,
      }));

      this.setState(prevState => ({
        posts: [...prevState.posts, ...data],
        status: STATUS.success,
      }));
    } catch (error) {
      console.log(error);
      this.setState({ status: STATUS.error });
    }
  };

  handleInputValue = text => {
    this.setState({
      search: text,
      pageNumber: 1,
      posts: [],
    });
  };

  handleCount = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  handleModalOpen = image => {
    console.log(image);
    this.setState({
      modalOpen: true,
      modalImg: image,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    const { posts, modalOpen, modalImg, status } = this.state;
    return (
      <AppStyle>
        <SearchBar onSubmit={this.handleInputValue} />

        {status === STATUS.loading && <Loader />}

          <ImageGallery
            images={posts}
            openModal={this.handleModalOpen}
            modalStatus={modalOpen}
          />

        {modalOpen && (
          <Modal image={modalImg} closeModal={this.handleModalClose} />
        )}

        {status === STATUS.success && <Button onClick={this.handleCount} />}
      </AppStyle>
    );
  }
}
