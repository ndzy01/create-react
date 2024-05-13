import * as React from 'react';
import '@/index.css';
import Login from './components/Login';
import { Home } from '@/pages';

const App: React.FC = () => {
  return (
    <>
      <div className="fixed bottom-4 left-0 w-8 h-8 mx-4 z-[9999] bg-green-500 rounded-full flex justify-center items-center">
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden">sm</div>
        <div className="hidden md:block lg:hidden">md</div>
        <div className="hidden lg:block xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div>

      <Login />
      <Home />
    </>
  );
};

export default App;
