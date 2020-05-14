import React from 'react';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from './auth';

export class AuthRequired extends React.Component {
    constructor(props) {

        super(props);


        this.session = isLoggedIn()
        console.log(this.props)
        // if (typeof props.redirectTo !== 'undefined') {

        //     cookies.set(
        //         'authRedirectTo',
        //         props.redirectTo,
        //         {
        //             path: '/',
        //             expires: new Date(Date.now() + 10000)
        //         });
        // }
    }
    render() {
        if (!this.session.auth) {

            return (<Redirect to="/admin/sub-admin-login" />);

        } else {
            return (this.props.orRender);
        }
    }
}
export default AuthRequired;