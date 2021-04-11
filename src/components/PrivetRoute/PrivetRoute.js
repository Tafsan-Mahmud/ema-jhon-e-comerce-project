import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContex } from '../../App';

const PrivetRoute = ({children , ...rest}) => {
    const [logedInUser , setLogedInUser] = useContext(userContex);
    return (
        <Route
      {...rest}
      render={({ location }) =>
        (logedInUser.email || sessionStorage.getItem('token')) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};



export default PrivetRoute;