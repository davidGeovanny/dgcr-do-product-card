import { useEffect, useRef, useState } from 'react';
import { Product, OnChangeArgs } from '../interfaces';
import { InitialValues } from '../interfaces/interfaces';

interface Props {
  init?:          number;
  product:        Product;
  onChange?:      ( args: OnChangeArgs ) => void;
  initialValues?: InitialValues;
}

export const useProduct = ({ onChange, product, init = 0, initialValues }: Props) => {

  const [ counter, setCounter ] = useState<number>( initialValues?.count || init );
  const isMounted = useRef( false );
  
  const increaseBy = ( value: number ) => {
    
    let newValue = Math.max( counter + value, 0 );
    if ( initialValues?.maxCount )
      newValue = Math.min( newValue, initialValues.maxCount );

    setCounter( newValue );
    
    onChange && onChange({ count: newValue, product });
  }

  const reset = () => {
    setCounter( initialValues?.count || init );
  }

  useEffect(() => {
    if ( !isMounted.current ) return;
    setCounter( init );
  }, [ init ]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  return {
    counter,
    isMaxCountReached: !!initialValues?.maxCount && counter === initialValues.maxCount,
    maxCount: initialValues?.maxCount,
    increaseBy,
    reset,
  };
}