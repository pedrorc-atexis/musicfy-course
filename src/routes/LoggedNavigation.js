import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoggedLayout } from "../Layout";
import { Home, Artist, Artists, Album, Albums, Profile } from "../pages";

export function LoggedNavigation() {
  return (
    <BrowserRouter>
      <LoggedLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/artists" element={<Artists />}></Route>
          <Route path="/artist/:id" element={<Artist />}></Route>
          <Route path="/albums" element={<Albums />}></Route>
          <Route path="/album/:id" element={<Album />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </LoggedLayout>
    </BrowserRouter>
  );
}
