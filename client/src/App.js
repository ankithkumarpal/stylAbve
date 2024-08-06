import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Landing } from './components/LandingPage/Landing';
import { Login } from './pages/Authentication/login';
import { Signup } from './pages/Authentication/signup';
import ProfileSetting from './pages/ProfileSetting/Profilesetting';

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ToastProvider autoDismiss autoDismissTimeout={2000}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Landing} />
            <Route path="/profile-setting" component={ProfileSetting} />
          </Switch>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
