import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';

// import { Container } from './styles';

interface IModalProps {
  isOpen: boolean;
  children?: any;
  toggleModal: () => void;
  selectedProductId: string;
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '72%',
    height: '73%',
  }
};

Modal.setAppElement('#root')

const ProductModal: React.FC<IModalProps> = ({
  children,
  isOpen,
  toggleModal,
  selectedProductId,
  // setBarbers,
  // setSelectedBarber,
}) => {
  var subtitle: any;
  const [modalIsOpen,setIsOpen] = useState(false);

  useEffect(() => {
    api.get(`products/${selectedProductId}`).then(response => {
      console.log(response);
    })
  }, [selectedProductId]);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={toggleModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
  );
}

export default ProductModal;