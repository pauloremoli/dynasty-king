import { useEffect } from 'react';
import { useState } from 'react';

const useFadeOut = () => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
      return () => {
        setFadeOut(true);
      };
    }, []);
  

    const style = { animation: `${fadeOut ? "animate-fadeOut" : ""}` };


    return style;
};

export default useFadeOut;