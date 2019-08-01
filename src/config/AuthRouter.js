import React,{ Component } from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import {userData} from '../libraries';
import store  from '../store/store';
import { setCurrentUser } from '../actions/authentication';
import { history } from '../store/history';

class Authentication extends Component{
    
    render(){
        debugger;
        const auth = () => {
            let user = userData();
            if( user && user.data && user.data.token){
                return true;
            }
            else{
                return false;
            } 
        }

        let { children,location } = this.props;
        if(auth() || location.pathname == process.env.PUBLIC_URL+'/login' || location.pathname == process.env.PUBLIC_URL+'/resetPassword'){
            if(location.pathname == process.env.PUBLIC_URL+'/login' || location.pathname == process.env.PUBLIC_URL+'/resetPassword'){
                localStorage.clear();
                store.dispatch(setCurrentUser({}));
                history.push('/login');
            }
            
            return (<Route render={ ()=> children }></Route>)
        }else{
            localStorage.clear();
            return (
                <Redirect to= {process.env.PUBLIC_URL+'/login'} />
            )
        }
    }
}

export const AuthRouter =  withRouter(Authentication);

