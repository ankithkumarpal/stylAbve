
import Home from './pages/home/Home';
import Pencil from './pages/pencilarts/Pencil';
import Contactus from './pages/contactus/Contactus';
import Payment from './pages/payment/Payment';
import TrackOrder from './pages/trackOrder/Trackorder'
import AuthLogin from './pages/Authentication/authLogin'
import AuthSignUp from './pages/Authentication/authSignUp'
import Product  from './pages/Add-Product/add-product'
import { ToastProvider } from 'react-toast-notifications';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import History from './pages/history/History';


function App() {
  return ( 
   <ToastProvider autoDismiss autoDismissTimeout={2000}>
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
              <Route path='/cart'>
                 <History/>
              </Route>
              <Route path='/admin/:id'>
                 <Product/>
              </Route>
              <Route path='/trackOrder/:id'>
                 <TrackOrder/>
              </Route>
             <Route path='/login'>
               <AuthLogin/>
              </Route>
             <Route path='/signup'>
               <AuthSignUp/>
              </Route>
             <Route path='/contact'>
                 <Contactus/>
              </Route>
           </Switch>
    </Router>
 </ToastProvider>
  );
}

export default App;
