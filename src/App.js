
import './App.css';
import { Route,Routes,Link,BrowserRouter } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { RubricQuestionaire } from './Pages/RubricQuestionaire/RubricQuestionaire';
import { CreateQuestionaire } from './Pages/CreateQuestionaire/CreateQuestionaire';
function App() {
  function Navbar(){
    return (
      <nav id="navBar">
        <div className='linkBlock'>
        <Link className="link" to="/">Home</Link>
        </div>

      </nav>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/RubricQuestionaire" element={<RubricQuestionaire/>}/>
        <Route path="/CreateQuestionaire" element={<CreateQuestionaire/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
