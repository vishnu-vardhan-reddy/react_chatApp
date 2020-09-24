import React , {useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import {BrowserRouter as Router ,Switch , Route} from "react-router-dom"
import Login from './Login'
import { useStateValue } from './StateProvider';
import Media from 'react-media'

function App() {

  const [{ user } , dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ?(
        <Login />
      ) : (
        <div className="app_body">
          
        <Router>
          {/* <Media query='(max-width:800px)'>
            {matches => {
              return <Sidebar />
            }}
          </Media> */}
        
        <Switch>
           <Route path="/rooms/:roomId"> 

           <Media query='(min-width:800px)'>
             {matches =>{
               return   matches ? (<> <Sidebar /> <Chat /> </>) : <Chat />
             }}
           </Media>
          </Route>
          <Route path="/">
            <Media query='(min-width:800px)'>
            {matches => {
              return matches ? (<> <Sidebar /> <Chat/> </>) : <Sidebar/>
            }}
          </Media>
          </Route>
        </Switch>
      </Router>
      
    </div>
      )}
    

    </div>
  );
}

export default App;
