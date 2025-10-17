import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers, deletePlayer } from "../redux/playerSlice";

export default function PlayerList() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.list);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  return (
    <div>
      <h2>Players</h2>
      {players.length === 0 ? (
        <p>No players found</p>
      ) : (
        <ul>
          {players.map((p) => (
            <li key={p._id}>
              {p.name} ({p.rating}) - {p.federation} &nbsp;
              <button onClick={() => dispatch(deletePlayer(p._id))}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
