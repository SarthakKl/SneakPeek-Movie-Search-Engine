import React from 'react'
import warningImg from '../../assets/warning.png'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function ErrorModal({error, setError}) {
  return (
    <Modal
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={error}
        scrollable={false}
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                <img src = {warningImg} className='warning-icon' alt=''/>
                <span>Error</span>
            </Modal.Title> 
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'auto'}}>
            {error}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>setError('')} variant='danger'>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ErrorModal