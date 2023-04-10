import React, { createContext, CSSProperties } from 'react';
import { useProduct } from '../hooks';
import { InitialValues, OnChangeArgs, Product, ProductCardHandlers, ProductContextProps } from '../interfaces';
import styles from '../styles/styles.module.css';

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export interface Props {
  product:    Product;
  children: ( args: ProductCardHandlers ) => JSX.Element;
  className?: string;
  style?:     CSSProperties;
  value?:     number;
  onChange?:  ( args: OnChangeArgs ) => void;
  initialValues?: InitialValues;
}

export const ProductCard = ({ product, children, className, style, onChange, value, initialValues }: Props) => {

  const { counter, increaseBy, maxCount, isMaxCountReached, reset } = useProduct({ onChange, product, init: value, initialValues });

  return (
    <Provider value={{
      counter,
      increaseBy,
      product,
      maxCount
    }}>
      <div className={ `${ styles.productCard } ${ className }` } style={ style }>
        { children({
          count: counter,
          isMaxCountReached,
          maxCount,
          product,
          increaseBy,
          reset,
        }) }
      </div>
    </Provider>
  )
}