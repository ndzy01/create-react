import * as React from 'react';
import './index.less';
import testImg from './test.png';

const App: React.FC = () => {
  return (
    <div className="app">
      hello word！
      <img src={testImg}></img>
    </div>
  );
};

export default App;
