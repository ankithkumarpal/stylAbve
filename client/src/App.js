import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Landing } from './components/LandingPage/Landing';
import { Login } from './pages/Authentication/login';
import { Signup } from './pages/Authentication/signup';
import ResetPassword from './pages/Authentication/ResetPassword';
import { PaymentProvider } from './context/PaymentContext';
import PaymentSuccessPage from './components/PaymentGateway/PaymentSuccess';

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ToastProvider autoDismiss autoDismissTimeout={2000}>
              <PaymentProvider>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/reset-password" component={ResetPassword} />
                        <Route  path="/success" component={PaymentSuccessPage} />
                        {/* <Route exact path="/failure" component={FailurePage} /> */}
                        <Route path="/" component={Landing} />
                    </Switch>
                </Router>
              </PaymentProvider>
            </ToastProvider>
        </div>
    );
}

export default App;
