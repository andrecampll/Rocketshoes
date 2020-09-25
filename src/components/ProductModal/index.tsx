import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import api from '../../services/api';
import Loader from 'react-loader-spinner';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../utils/format';

import { Container } from './styles';

interface IModalProps {
  isOpen: boolean;
  children?: any;
  toggleModal: () => void;
  selectedProductId: string;
  handleAddProduct: (id: number) => void;
}

interface IProduct {
  id: number;
  image: string;
  price: number;
  title: string;
  priceFormatted: string;
  loading: boolean;
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
  handleAddProduct,
}) => {
  var subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>({} as IProduct);

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get(`products/${selectedProductId}`);

      setProduct({
        ...response.data,
        priceFormatted: formatPrice(response.data.price),
        loading: false,
      });
    }

    loadProduct();
  }, [selectedProductId]);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  const amount = useSelector((state: any) =>
    state.cart.reduce((sumAmount: any, product: any) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Container>
          <img src={product.image} />

          <aside>

            <div>
              <h1
                key={product.id}
              >
                {product.title}
              </h1>

              <h2>{product.priceFormatted}</h2>

            </div>
            <button type="button" onClick={() => handleAddProduct(product.id)}>
              {product.loading ? (
                <Loader type="Oval" color="#FFF" height={16} width={24} />
              ) : (
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {amount[product.id] || 0}
                </div>
              )}

              <span>ADD TO CART</span>
            </button>
          </aside>
        </Container>
      </Modal>
  );
}

export default ProductModal;