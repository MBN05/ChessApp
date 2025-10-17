import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlayer } from "../redux/playerSlice";
import { useNavigate } from "react-router-dom";

export default function AddPlayer() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [federation, setFederation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addPlayer({ name, rating: Number(rating), federation }));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Player</h2>
      <input
        type="text"
        placeholder="Player Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        required
        onChange={(e) => setRating(e.target.value)}
      />
      <input
        type="text"
        placeholder="Federation"
        value={federation}
        required
        onChange={(e) => setFederation(e.target.value)}
      />
      <button type="submit">Add Player</button>
    </form>
  );
}
