import React from 'react';
import ReactDOM from 'react-dom';

const TypesOfFruit = () => {
    return (
      <div>
        <h2>Fruits:</h2>
        <ul>
          <li>Apples</li>
          <li>Blueberries</li>
          <li>Strawberries</li>
          <li>Bananas</li>
        </ul>
      </div>
    );
  };
  
  const Fruits = () => {
    return (
      <div>
        { /* change code below this line */ }
          <TypesOfFruit/>
        { /* change code above this line */ }
      </div>
    );
  };
  
  class TypesOfFood extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <h1>Player:</h1>
          { /* change code below this line */ }
            <Fruits/>
          { /* change code above this line */ }
        </div>
      );
    }
  };
  ReactDOM.render(<TypesOfFood/>,document.getElementById("player1"));  
  ReactDOM.render(<TypesOfFood/>,document.getElementById("player2"));