import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useViewportScroll, useTransform } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';

const Hero: React.FC = () => {
  const { darkMode } = useDarkMode();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const textBoxControls = useAnimation();
  const { scrollY } = useViewportScroll();
  const yTransform = useTransform(scrollY, [0, 350], [14, -300]);
  const yTransformTopImage = useTransform(scrollY, [0, 400], [0, 400]);
  const scaleTransformTopImage = useTransform(scrollY, [0, 400], [1, 0.87]);
  const yHeroTransform = useTransform(scrollY, [0, 400], [-200, -50]);
  //const yTransformTextBox = useTransform(scrollY, [250, 650], [-200, 0]);


  const topImageSrc = darkMode ? '/HeroLightTop.png' : '/HeroDarkTop.png';
  const backImageSrc = darkMode ? '/HeroLightBack.png' : '/HeroDarkBack.png';

  const texts = [
    'Hello',
    'नमस्ते',
    'ನಮಸ್ಕಾರ',
    'नमस्कार',
    'Salut',
    '你好',
    'Hola'
  ];

  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBetweenTexts = 2000;
  const delayBeforeDelete = 1000;

  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentTextIndex = loopNum % texts.length;
      const fullText = texts[currentTextIndex];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, typingIndex - 1));
        setTypingIndex(typingIndex - 1);
      } else {
        setCurrentText(fullText.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), delayBetweenTexts);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingIndex(0);
      }
    };

    const typingSpeedInterval = isDeleting ? deletingSpeed : typingSpeed;
    const typingTimeout = setTimeout(handleTyping, typingSpeedInterval);

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 1 }
          });
        } else {
          controls.start({
            y: -50,
            opacity: 0,
            transition: { duration: 1 }
          });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY.get() > 250) {
        textBoxControls.start({
            opacity: 1,
            transition: { duration: 1 }
          });
        } else {
          textBoxControls.start({
            opacity: 0,
            y: -200,
            transition: { duration: 0.5 }
          });
        }
    };

    const unsubscribeScroll = scrollY.onChange(handleScroll);

    return() => unsubscribeScroll();
}, [scrollY, textBoxControls]);

  return (
    <div>
        {/* ref={ref} removed */}
      <div className="flex items-center p-5"> 
        <div className="flex-1 relative">
          <motion.img
            key={`back-${darkMode}-backdrop`} // Ensure unique key
            src={backImageSrc}
            alt="Backdrop"
            className="w-full h-auto absolute inset-0 transform translate-x-14 translate-y-14 z-10"
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 14, x: 14 }}
            transition={{ duration: 1 }}
            style={{ y: yTransform }}
          />
          <motion.img
            key={`top-${darkMode}-hero`} // Ensure unique key
            src={topImageSrc}
            alt="Hero"
            className="w-full h-auto relative z-20"
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ y: yTransformTopImage, scale: scaleTransformTopImage }}
          />
        </div>
        <div className="flex-1 pl-8 flex flex-col justify-center items-center">
          <motion.h1
            className='hello'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            style={{ y: yTransform }}
          >
            {currentText}
          </motion.h1>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5 items-center'>
        <div className='col-span-1'></div>
        <div className='col-span-1 flex justify-start items-center'>
        <motion.div
            className="flex-1 pl-8 flex flex-col justify-end items-right top-1/2 right-10 transform -translate-y-1/2 p-5"
            initial={{ opacity: 0, y: -200 }}
            animate={textBoxControls}
            style={{ y: yHeroTransform }}
        >
            <h2 className="text-xl font-bold">Hello, I am Ansh! A Software Developer and Product Design enthusiast based in India</h2>
            <p className="mt-2">I enjoy building products and creating experiences with a human centered approach in the digital space.</p>
        </motion.div>
        </div>
      </div>
      {/* Dummy content for scrolling */}
      <div className={`h-[200vh] ${darkMode ? 'bg-gradient-to-b from-black to-gray-800' : 'bg-gradient-to-b from-white to-gray-100'}`}>
        <div className="p-5 text-center">
          <h2 className={`${darkMode ? 'text-white' : 'text-black'}`}></h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;