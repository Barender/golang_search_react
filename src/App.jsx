import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import routes from "./layouts/routes";

const App = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {routes.map((route, idx) => {
                    return (
                        <Route
                            key={idx}
                            path={route.path}
                            element={<route.component />}
                        />
                    );
                })}
            </Route>
        </Routes>
    );
};

export default App;
