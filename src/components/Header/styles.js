import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;

  img {
    @media (max-width: 293px) {
      width: 100%;
    }
  }

  @media (max-width: 370px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    height: 100%;
    margin-bottom: 30px; 
  }
`;

export const Cart = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  @media (max-width: 466px) {
    flex-direction: column;
    justify-content: space-between;
  }

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 370px) {
    margin-left: auto;
  }

  div {
    text-align: right;
    margin-right: 10px;
    color: #fff;

    @media (max-width: 370px) {
      margin-top: 20px;
    }

    strong {
      @media (max-width: 466px) {
        display: none;
      }
    }

    span {
      @media (max-width: 466px) {
        display: none;
      }
    }

    /* &:hover {
      color: #7159c1;
    } */
  }
  strong {
    display: block;
    color: #fff
  }

  span {
    font-size: 12px;
    color: #999;
  }
`;
