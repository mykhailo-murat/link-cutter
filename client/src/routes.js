import React from "react";
import {useEffect} from "react";
import {BrowserRouter, Routes, useNavigate, Route, Navigate} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

import { StaticRouter } from "react-router-dom/server";

function Redirect({to}) {
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
                <Route path="/links" element={<LinksPage/>}/>
                <Route path="/create" element={<CreatePage/>}/>
                <Route path="/detail/:id" element={<DetailPage/>}/>
                <Route path="*" element={<Navigate replace to="/create" />} />
            </Routes>

        )
    }
    return (

        <Routes>
            <Route path="/" element={<AuthPage/>}/>

            {/*//new ver 6.0 ^*/}
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>

    )
}