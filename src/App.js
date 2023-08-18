
import './App.css';
import { Route,Routes,Link,BrowserRouter} from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { RubricQuestionaire } from './Pages/RubricQuestionaire/RubricQuestionaire';
import { CreateQuestionaire } from './Pages/CreateQuestionaire/CreateQuestionaire';
import React,{useEffect,useState,createContext} from 'react';
import { firestore,auth } from './Firebase';
import { Login } from './Pages/Login/Login';
import { Signup } from './Pages/Signup/Signup';
import { Checkin } from './Pages/Checkin/Checkin';
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
        <Link className="link" to="/Home">Home</Link>
        </div>
        <div className='linkBlock'>
        <Link className="link" to="/">Start Page</Link>
        </div>
      </nav>
    );
  }
  if(!user){
    return <Checkin/>;
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Checkin/>}/>
        <Route path="/Home" element={<Home/>}/>
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
