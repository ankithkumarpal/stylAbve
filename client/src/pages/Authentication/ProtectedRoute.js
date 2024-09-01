import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken, getUser } from '../../services/routpath';

function ProtectedRoute({ component: Component, ...rest }) {

    return (
    <Route
      {...rest}
      render={(props) =>
        getAccessToken() !==null ? (
          <Component {...props}/>
        ) : (
          <Redirect to="/login"/>
        )
      }
    />
  );
}

export default ProtectedRoute;
