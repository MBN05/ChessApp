import React from "react";
import { useSelector } from "react-redux";

export default function Standings() {
  const players = useSelector((state) => state.players.list);

  // Sort by score desc, then rating desc
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.score === a.score) return b.rating - a.rating;
    return b.score - a.score;
  });

  return (
    <div>
      <h2>Final Standings</h2>
      {sortedPlayers.length === 0 && <p>No players yet.</p>}
      <table className="standings-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Federation</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.rating}</td>
              <td>{p.federation}</td>
              <td>{p.score ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
