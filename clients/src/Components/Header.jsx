import 'react';
import video from '../Components/25.mp4';

const Header = () => {
  return (
    <div className="w-full h-auto pt-10"> {/* Add padding to distance from navbar */}
      {/* Wrapper div for the video */}
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Additional Content Div for spacing or other elements */}
      <div className="mt-10 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">Welcome to Our Website</h1>
        <p className="mt-4 text-lg">Explore amazing features with smooth video experience</p>
      </div>
    </div>
  );
};

export default Header;
