import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Home, Pastes, ViewPaste } from "./components";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

          <Route
            path="/pastes"
            element={
              <div className="w-full h-full flex flex-col">
                <Navbar />
                <Pastes />
              </div>
            }
          />

          <Route
            path="/pastes/:id"
            element={
              <div className="w-full h-full flex flex-col">
                <Navbar />
                <ViewPaste />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
