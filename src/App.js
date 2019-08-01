import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { Translation,Constant } from './constants';
import LocalizedStrings from 'react-localization';

import 'bootstrap/dist/css/bootstrap.min.css';
import  { Routes }  from './config';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}


class App extends Component {

  componentWillMount(){
    this.fetchLanguageJson();
  }

  fetchLanguageJson = () =>{
    window.strings = new LocalizedStrings(Translation);
    window.constant = new LocalizedStrings(Constant);
    this.setState({loaded : true})
  }

  render() {
    return (
        // <Router>
        //     <div>
        //       <Navbar />
        //         <Route exact path="/" component={ Login } />
        //         <div className="container">
        //           {/* <Route exact path="/register" component={ Register } /> */}
        //           {/* <Route exact path="/login" component={ Login } /> */}
        //         </div>
        //     </div>
        //   </Router>
        
        <div>
          {/* <LoaderBar isLoggedin={true}></LoaderBar> */}
          {
            this.state.loaded ? <Routes></Routes> : 'Loading ...'
          }

          {/* <Routes></Routes> */}
        </div>
        
    );
  }
}

export default App;