import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../contex/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useNavigate()

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper">
                    <ul id="nav-mobile" className="right hide-on-med-and-down">


                        <li> </li>

                            <li> <a href="/" onClick={logoutHandler}> LOGOUT   </a>  </li>


                    </ul>
                </div>
            </nav>
    )

}