import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DetailPage from "./pages/detail/DetailPage";
import { routes } from "./routes";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.scenario} element={<DetailPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
