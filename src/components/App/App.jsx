import { useState } from 'react';
import { useEffect } from 'react';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { SearchBar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { STATUS } from 'constance/status';
import { getImages } from '../../services/images.service';

import { AppStyle } from './App.styled';

export const App = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);

  const fetchData = async ({ pageNumber, search }) => {
    setStatus(STATUS.loading);
    try {
      const { hits } = await getImages({ page: pageNumber, q: search });
      const data = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
        id: id,
        largeImageURL: largeImageURL,
        webformatURL: webformatURL,
        tags: tags,
      }));

      setPosts(prev => [...prev, ...data]);
      setStatus(STATUS.success);
    } catch (error) {
      console.log(error);
      setStatus(STATUS.error);
    }
  };

  useEffect(() => {
    if (search === "") {
      return
    }
    fetchData({ pageNumber, search });
  }, [pageNumber, search]);

  const handleInputValue = text => {
    setSearch(text)
    setPageNumber(1)
    setPosts([])
  };

  const handleCount = () => {
    setPageNumber(prev=> prev + 1)
  };

  const handleModalOpen = image => {
    setModalOpen(true)
    setModalImg(image)
  };

  const handleModalClose = () => {
    setModalOpen(false)
  };

  return (
    <AppStyle>
      <SearchBar onSubmit={handleInputValue} />

      <ImageGallery
        images={posts}
        openModal={handleModalOpen}
        modalStatus={modalOpen}
      />
      
      {status === STATUS.loading && <Loader />}
      
      {modalOpen && (
        <Modal image={modalImg} closeModal={handleModalClose} />
      )}

      {status === STATUS.success && <Button onClick={handleCount} />}
    </AppStyle>
  );
};

