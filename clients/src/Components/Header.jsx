
import { useState, useEffect } from 'react';
import video from '../Components/25.mp4';

const Header = () => {
  const career = [
    "100% Eggless Cake's",
    "We Not Serve Cakes",
    "We Serve Happiness",
    "Making A Trust in Our Customners Heart Since 5 Year's",
    "We Are Available Here To Make Smile in Your Face ",
    "Happy Bakery Product's "
  ];

  const [careerIndex, setCareerIndex] = useState(0);   // State for the career index
  const [characterIndex, setCharacterIndex] = useState(0);   // State for character index
  const [currentText, setCurrentText] = useState("");   // State to hold the current text being displayed

  useEffect(() => {
    const timer = setTimeout(() => {
      // Update the character index to simulate typing effect
      setCharacterIndex((prev) => prev + 1);
    }, 200); // Typing speed

    // Check if we have typed the full word
    if (characterIndex === career[careerIndex].length) {
      // Move to the next career item
      setCareerIndex((prev) => (prev + 1) % career.length);
      setCharacterIndex(0);
    }

    return () => clearTimeout(timer);  // Clean up the timeout when component unmounts
  }, [characterIndex, careerIndex]);

  // Update the current text being displayed based on career and character indices
  useEffect(() => {
    setCurrentText(career[careerIndex].slice(0, characterIndex));
  }, [characterIndex, careerIndex]);

  return (
    <div className="relative w-full h-auto pt-10">
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

        {/* Text Animation Positioned in the Middle of the Video */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold ">
            Mama Baker : {currentText}
          </h1>
        </div>
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
