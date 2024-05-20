import React from 'react'
import ReactDOM from 'react-dom/client'
import Reader from './Reader.jsx'
import './index.css';

const App = () => (
  <Reader/>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
