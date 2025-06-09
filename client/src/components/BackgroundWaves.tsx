import React from 'react';
import './waves.css'; // Подключим стили анимации

const BackgroundWaves: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-64 -z-10 overflow-hidden pointer-events-none">
      <div className="wave-wrapper">
        <svg
          className="wave-svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#a78bfa"
            fillOpacity="0.5"
            d="M0,64L60,101.3C120,139,240,213,360,224C480,235,600,181,720,154.7C840,128,960,128,1080,117.3C1200,107,1320,85,1380,74.7L1440,64V320H0Z"
          />
        </svg>
        <svg
          className="wave-svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#a78bfa"
            fillOpacity="0.5"
            d="M0,64L60,101.3C120,139,240,213,360,224C480,235,600,181,720,154.7C840,128,960,128,1080,117.3C1200,107,1320,85,1380,74.7L1440,64V320H0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundWaves;
