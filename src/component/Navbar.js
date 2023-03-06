import React, { Component } from 'react'
import Navitems from './Navitems'
import AuthContext from '../services/auth-context';
import { getUser } from '../services/authorize';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'NavItemActive':''
        }
    }
    render() {
        return (
            <AuthContext.Consumer>

            {({ loggedIn, setLoggedIn }) => (
            <nav width="20vw">
                <ul>
                    <Navitems item="Home" tolink="/"></Navitems>
                    <Navitems item="About" tolink="/about"></Navitems>
                    <Navitems item="Devices" tolink="/hardware"></Navitems>
                    {(loggedIn || getUser()) ? (<Navitems item="Logout" tolink="/logout"></Navitems>) 
                    : (<Navitems item="Login" tolink="/login"></Navitems>)}
                </ul>     
            </nav>
            )}
            </AuthContext.Consumer>
        )
    }

}

export default Navbar;