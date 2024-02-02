import { useState } from "react";
import "./index.css";
// array Objects
const initialBasketAndCustomers = [
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
  const [customer, setCustomer] = useState(initialBasketAndCustomers);

  return (
    <div>
      <ShowListPeople customer={customer} />
    </div>
  );
}

function Friend({ customer }) {
  return (
    <div>
      <li>
        <img src={customer.image}></img>
        <h3>{customer.name}</h3>
      </li>
    </div>
  );
}
function ShowListPeople({ customer }) {
  return (
    <ul>
      {customer.map((customer) => (
        <Friend customer={customer} key={customer.id} />
      ))}
    </ul>
  );
}
