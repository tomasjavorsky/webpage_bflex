import React from 'react';
import './App.css';
import Header         from './Components/Header/Header';
import Footer         from './Components/Footer/Footer';
import Navbar         from './Components/Navbar/Navbar';
import LeftPanel      from './Components/LeftPanel/LeftPanel';
import MainContainer  from './Components/MainContainer/MainContainer';

function App() {
  return (
    <div className={"App"}>
      <Header />
      <Navbar />
      <div className={"row"}>
        <LeftPanel />
        <MainContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
