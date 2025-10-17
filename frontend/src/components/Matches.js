import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayer } from "../redux/playerSlice";

export default function Matches() {
  const players = useSelector((state) => state.players.list);
  const dispatch = useDispatch();

  const pairPlayers = (players) => {
    const pairs = [];
    const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);
    let i = 0;
    while (i < sortedPlayers.length) {
      if (i + 1 < sortedPlayers.length) {
        pairs.push([sortedPlayers[i], sortedPlayers[i + 1]]);
        i += 2;
      } else {
        pairs.push([sortedPlayers[i], { _id: null, name: "BYE", rating: "-", federation: "-", score: 1 }]);
        i++;
      }
    }
    return pairs;
  };

  const pairs = pairPlayers(players);

  // Store local score input for each player by id: {playerId: score}
  const [scores, setScores] = useState({});

  const handleScoreChange = (playerId, value) => {
    setScores({ ...scores, [playerId]: Number(value) });
  };

  const submitScores = (playerId) => {
    if (scores[playerId] !== undefined) {
      // Dispatch update action
      dispatch(updatePlayer({ id: playerId, data: { score: scores[playerId] } }));
    }
  };

  return (
    <div>
      <h2>Pairings & Results</h2>
      {pairs.length === 0 && <p>No players to pair.</p>}
      <ul className="match-list">
        {pairs.map(([p1, p2], idx) => (
          <li key={idx} className="match-pair">
            <div>
              <strong>{p1.name}</strong> ({p1.rating}) &nbsp;
              {p1._id && (
                <>
                  <select
                    value={scores[p1._id] ?? ""}
                    onChange={(e) => handleScoreChange(p1._id, e.target.value)}
                  >
                    <option value="" disabled>
                      Result
                    </option>
                    <option value={1}>Win (1)</option>
                    <option value={0.5}>Draw (0.5)</option>
                    <option value={0}>Loss (0)</option>
                  </select>
                  <button onClick={() => submitScores(p1._id)}>Submit</button>
                </>
              )}
            </div>
            <div>
              vs
            </div>
            <div>
              <strong>{p2.name}</strong> ({p2.rating}) &nbsp;
              {p2._id ? (
                <>
                  <select
                    value={scores[p2._id] ?? ""}
                    onChange={(e) => handleScoreChange(p2._id, e.target.value)}
                  >
                    <option value="" disabled>
                      Result
                    </option>
                    <option value={1}>Win (1)</option>
                    <option value={0.5}>Draw (0.5)</option>
                    <option value={0}>Loss (0)</option>
                  </select>
                  <button onClick={() => submitScores(p2._id)}>Submit</button>
                </>
              ) : (
                <span>BYE (1 point)</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
