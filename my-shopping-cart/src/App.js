import { useState } from "react";
import "./index.css";
// array Objects
const initialBasketAndFriend = [
  {
    id: 118836,
    name: "Kayhan",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: 200,
  },
  {
    id: 933372,
    name: "Busra",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 100,
  },
  {
    id: 399476,
    name: "Noah",
    image: "https://i.pravatar.cc/48?u=399476",
    balance: 50,
  },
  {
    id: 499476,
    name: "Ava",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  /// Fruits
  {
    id: 334411,
    fruit: "apple",
    price: 1,
    image: "🍏",
  },
  {
    id: 335512,
    fruit: "Banana",
    price: 2,
    image: "🍌",
  },
  {
    id: 336613,
    fruit: "Tomato",
    price: 1,
    image: "🍅",
  },
];

export default function App() {
  function buttonToggler() {
    setShowCart((show) => !show);
  }

  function button() {
    <div className="button">
      <button></button>
    </div>;
  }
  return (
    <div>
      <h1>Test21</h1>
    </div>
  );
}
