import logo from './logo.svg';
import Path from './path.js'
import { BrowserRouter as Router  , Routes, Route,Redirect  } from 'react-router-dom';
import './App.css';

function App() {
  return (
  <Router>
    <Routes>
      <Route exact path = '/' element = {<Path/>}/>
        </Routes>
        </Router>
  );
}

export default App;
