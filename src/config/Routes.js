import React, { Component } from 'react'; 
import { BrowserRouter as Router, Switch , Route, Redirect} from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import ReduxToastr from 'react-redux-toastr';
import { AuthRouter, BaseContainer,routesPath  } from '.';
import { PrivateRoute  } from '../components/PrivateRoute';
import  Login from '../components/Login';
import  Home  from '../components/Home';

export class Routes extends Component {   
    render(){
        return (
            <div>
                <ReduxToastr
                    timeOut={2000}
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    preventDuplicates
                    progressBar={false}/>
                <Router>
                    <AuthRouter routes={routesPath}>
                        <BaseContainer>  
                            <Switch>
                                {/* {console.log(renderRoutes(routesPath))} */}
                                 {renderRoutes(routesPath)}
                            </Switch>
                        </BaseContainer>  
                        {/* <Switch>
                            <Redirect from="/" to="/login"/>
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/home" component={Home} />
                        </Switch> */}
                    </AuthRouter>      
                </Router>
            </div>
        )
    }
}

