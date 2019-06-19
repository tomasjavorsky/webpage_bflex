import React from 'react';
import './App.css';

function App() {
  return (
    <div className={"App"}>

      {/*Header*/}
      <div className={"header"}>
        <h1>Bflex, s.r.o.</h1>
        <p>Predaj a technické poradenstvo</p>
      </div>

      {/*Navigation Bar*/}
      <div className={"navbar"}>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
      </div>

      {/*Content*/}
      <div className={"row"}>

        <div className={"left-panel"}>
          <ul>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
          </ul>
        </div>

        <div className={'main'}>
          <h2>TITLE HEADING</h2>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco.</p>
        </div>
      </div>

      {/*Footer*/}
      <div class="footer">
        <p>Footer</p>
      </div>
    </div>
  );
}

export default App;
