import React from "react";
import { useEffect } from "react";
import {BrowserRouter as Router, Routes, useNavigate , Route} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {

        return (
            <Routes>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>

                <Route path="/create" exact>
                    <CreatePage/>
                </Route>

                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>

                <Route path="/create" render={() => <Redirect to="/create" />} />
            </Routes>
    )
    }
    return (
        <Routes>
            <Route path="/" exact>
                <AuthPage/>
            </Route>

            <Route path="/" render={() => <Redirect to="/" />} />
        </Routes>


)
}