
import './App.css';
import { Route,Routes,Link,BrowserRouter } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { RubricQuestionaire } from './Pages/RubricQuestionaire/RubricQuestionaire';
function App() {
  function Navbar(){
    return (
      <nav>
        <div className='link'>
        <Link to="/"/>
        </div>

      </nav>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/RubricQuestionaire" element={<RubricQuestionaire/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
