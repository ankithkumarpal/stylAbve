
import Home from './pages/home/Home';
import Pencil from './pages/pencilarts/Pencil';
import Navbar from './components/navbar/Navbar';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import Contactus from './pages/contactus/Contactus';
import Payment from './pages/payment/Payment';
import TrackOrder from './pages/trackOrder/Trackorder'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
import History from './pages/history/History';
import Admin from './pages/admin/Admin';
function App() {
  
  return (
     <Router>
        
           <Switch>
             <Route exact path="/">
                <Home/>
             </Route>
             <Route path='/pencilarts'>
                 <Pencil/>
              </Route>
             <Route path='/payment'>
                 <Payment/>
              </Route>
              <Route path='/cart/:id'>
                 <History/>
              </Route>
              <Route path='/admin/:id'>
                 <Admin/>
              </Route>
              <Route path='/trackOrder/:id'>
                 <TrackOrder/>
              </Route>
             <Route path='/login'>
                 <Login/>
              </Route>
             <Route path='/signup'>
                 <Logout/>
              </Route>
             <Route path='/contact'>
                 <Contactus/>
              </Route>
           </Switch>
    </Router>
     
  );
}

export default App;
