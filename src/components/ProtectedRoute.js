// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// // этот компонент принимает другой компонент в качестве пропса
// // он также может взять неограниченное число пропсов и передать их новому компоненту
// const ProtectedRoute = ({ component: Component, ...props }) => {
//   console.log(props.loggedIn)

//   console.log(props.loggedIn)
//   return (
//     <Route>
//       {() =>
//         props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
//       }
//     </Route>
//   );
// };

// export default ProtectedRoute;


import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {
      () => (props.loggedIn ? <Component {...props} /> : <Redirect to='/signin' />)
    }
  </Route>
);

export default ProtectedRoute;
