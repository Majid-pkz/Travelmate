import React, { useEffect, useState } from 'react';
import './Slider.css';
import Slide1 from '../../assets/slide1.jpg';
import Slide2 from '../../assets/slide2.jpg';
import Slide3 from '../../assets/slide3.jpg';
import Slide4 from '../../assets/slide4.jpg';
import Slide5 from '../../assets/slide5.jpg';

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = () => {
      const imageList = [Slide1, Slide2, Slide3, Slide4, Slide5];
      imageList.forEach((image) => {
        const img = new Image();
        img.src = image;
      });
    };

    const interval = setTimeout(() => {
      setCurrent((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 5000);

    preloadImages();
    setIsLoaded(true);

    return () => clearTimeout(interval);
  }, [current]);

  const images = [
    {
      url: Slide1,
    },
    {
      url: Slide2,
    },
    {
      url: Slide3,
    },
    {
      url: Slide4,
    },
    {
      url: Slide5,
    },
  ];

  const bgImageStyle = {
    backgroundImage: `url(${images[current].url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 'calc(100vh - 193px)',
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0, // Fade-in animation
  };

  const goToNext = (currentState) => {
    setCurrent(currentState);
  };

  return (
    <div className="container-style">
      <div style={bgImageStyle} onLoad={() => setIsLoaded(true)} />
      <div className="carousel">
        {images.map((image, currentState) => (
          <span key={currentState} onClick={() => goToNext(currentState)}></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
