
import './App.css';
import { Route,Routes,Link,BrowserRouter } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { RubricQuestionaire } from './Pages/RubricQuestionaire/RubricQuestionaire';
import { CreateQuestionaire } from './Pages/CreateQuestionaire/CreateQuestionaire';
import React,{useEffect,useState,createContext} from 'react';
import { firestore,auth } from './Firebase';
import { Login } from './Pages/Login/Login';
import { Signup } from './Pages/Signup/Signup';
export const Context=createContext();
function App() {
  let [user,setUser]=useState(undefined);
  useEffect(
    ()=>{
      let authListener=onAuthStateChanged(auth,(user)=>{
        if(user){
        setUser(user.uid);
      }
    });
      return ()=>authListener;
    }
    ,[]);
    let contextData={userId:user};
  function Navbar(){
    return (
      <nav id="navBar">
        <div className='linkBlock'>
        <Link className="link" to="/">Home</Link>
        </div>
        <div className='linkBlock'>
        <Link className="link" to="/login">Login</Link>
        </div>
        <div className='linkBlock'>
        <Link className="link" to="/Signup">Sign Up</Link>
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
        <Route path="/CreateQuestionaire" element={<Context.Provider value={contextData}><CreateQuestionaire/></Context.Provider>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
