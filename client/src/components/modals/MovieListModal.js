import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useContext } from 'react'
import { LikedMovieContext,  } from '../../App';
import './MovieListModal.css'
import {DownloadPdf} from '../../utils/DownloadPdf'

import MovieListCard from '../homepage/MovieListCard';
import LikedMovieList from '../homepage/LikedMovieList';

const MovieListModal = (props)=> {
  
  const data = useContext(LikedMovieContext);
  const downloadHandler = ()=>{
    props.onHide();
    DownloadPdf(data);    
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='style-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          My Movie List
        </Modal.Title>
      </Modal.Header>

      {/* create a componenet for showing movie list */}
      <Modal.Body className='modal-body'>
        <LikedMovieList/>
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={downloadHandler}>Download List</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MovieListModal