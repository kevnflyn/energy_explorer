import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DetailPage, { loader } from "./pages/detail/DetailPage";
import { routes } from "./routes";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.detail} element={<DetailPage />} />
        <Route path={routes.details} element={<DetailPage />} loader={loader} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
