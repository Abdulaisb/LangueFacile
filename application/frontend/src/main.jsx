import React from 'react'
import ReactDOM from 'react-dom/client'
import Reader from './Reader.jsx'
import Navbar  from './navbar.jsx';
import Footer from './footer.jsx';
import './index.css';

const App = () => ( 
  <div className=''>
    <Navbar/>
    <Reader/>
    <Footer/>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
