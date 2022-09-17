import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DetailPage from "./pages/detail/DetailPage";
import { routes } from "./routes";
import NotFoundPage from "./pages/notfound/NotFoundPage";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.scenario} element={<DetailPage />}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
