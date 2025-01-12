import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroImg, smallHeroVideo, heroVideo } from '../utils';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

  const handelVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      handelVideoSrcSet();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 });
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative flex flex-col items-center justify-center">
      <div className="h-auto w-full flex-center flex-col mb-4">
        <p id="hero" className="hero-title text-white">
          iPhone 15 Pro
        </p>
      </div>
      <div className="md:w-10/12 w-9/12 flex justify-center items-center mb-8">
        <video className="pointer-events-none" autoPlay muted playsInline key={videoSrc}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* CTA section below the video */}
      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-xl">
          Buy
        </a>
        <p className="font-normal text-xl text-white mt-4">
          From $199/month or $999
        </p>
      </div>
    </section>
  );
};

export default Hero;
