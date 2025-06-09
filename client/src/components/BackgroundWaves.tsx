import React from 'react';

export const BackgroundWaves: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-auto animate-wave"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#a78bfa" /* фиолетовая */
          fillOpacity="0.4"
          d="M0,64L60,101.3C120,139,240,213,360,224C480,235,600,181,720,154.7C840,128,960,128,1080,117.3C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
        <path
          fill="#c4b5fd"
          fillOpacity="0.3"
          d="M0,96L60,117.3C120,139,240,181,360,170.7C480,160,600,96,720,69.3C840,43,960,53,1080,80C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default BackgroundWaves;
