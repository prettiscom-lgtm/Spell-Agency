import React from 'react';
import Hero from './Hero';
import Advantages from './Advantages';
import CoreFeatures from './CoreFeatures';
import Methodology from './Methodology';
import Benchmarks from './Benchmarks';
import TechStack from './TechStack';
import Products from './Products';

interface Props {
  onOpenConsultant: () => void;
  onChatStart: (msg: string) => void;
}

const Home: React.FC<Props> = ({ onOpenConsultant, onChatStart }) => {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero onChatStart={onChatStart} />
      <Advantages />
      <CoreFeatures />
      <Methodology />
      <Benchmarks />
      <TechStack />
      <Products />
    </div>
  );
};

export default Home;