import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import PlayerList from "./components/PlayerList";
import AddPlayer from "./components/AddPlayer";
import Matches from "./components/Matches";
import Standings from "./components/Standings";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <NavLink to="/" className="nav-link" end>Players</NavLink>
        <NavLink to="/add" className="nav-link">Add Player</NavLink>
        <NavLink to="/matches" className="nav-link">Matches</NavLink>
        <NavLink to="/standings" className="nav-link">Standings</NavLink>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<PlayerList />} />
          <Route path="/add" element={<AddPlayer />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
