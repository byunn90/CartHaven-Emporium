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
];

const initialFruits = [
  {
    id: 1,
    fruit: "Apple",
    price: 1,
    fruitImage: "🍏",
  },
  {
    id: 2,
    fruit: "Banana",
    price: 2,
    fruitImage: "🍌",
  },
  {
    id: 3,
    fruit: "Tomato",
    price: 1,
    fruitImage: "🍅",
  },
  {
    id: 4,
    fruit: "Orange",
    price: 1.5,
    fruitImage: "🍊",
  },
  {
    id: 5,
    fruit: "Grapes",
    price: 3,
    fruitImage: "🍇",
  },
  {
    id: 6,
    fruit: "Strawberry",
    price: 2.5,
    fruitImage: "🍓",
  },
  {
    id: 7,
    fruit: "Watermelon",
    price: 4,
    fruitImage: "🍉",
  },
  {
    id: 8,
    fruit: "Pineapple",
    price: 3.5,
    fruitImage: "🍍",
  },
  {
    id: 9,
    fruit: "Kiwi",
    price: 2,
    fruitImage: "🥝",
  },
  {
    id: 10,
    fruit: "Mango",
    price: 2.8,
    fruitImage: "🥭",
  },
];

export default function App() {
  const [customer, setCustomer] = useState(initialBasketAndCustomers);
  const [groceryList, setgroceryList] = useState(initialFruits);
  const [showAddToList, setshowAddToList] = useState(false);

  function handleShowList() {
    // Toggle button to show list
    setshowAddToList((show) => !show);
  }

  function CustomerButton({ onClick }) {
    return (
      <button className="button" onClick={onClick}>
        Go Shopping
      </button>
    );
  }

  return (
    <div className="sidebar">
      <ShowListPeople customer={customer} />
      <showGrocerys groceryList={groceryList} />
      <CustomerButton />
    </div>
  );
}

function Person({ customer }) {
  return (
    <div>
      <li>
        <h3>{customer.name}</h3>
        <img src={customer.image}></img>
      </li>
    </div>
  );
}
function ListGrocerys({ groceryList }) {
  return (
    <ul>
      <h3></h3>
      <img></img>
    </ul>
  );
}

function ShowListPeople({ customer }) {
  return (
    <ul>
      {customer.map((customers) => (
        <Person customer={customers} key={customers.id} />
      ))}
    </ul>
  );
}

function showGrocerys({ groceryList }) {
  return (
    <ul>
      {groceryList.map((groceryList) => (
        <ListGrocerys listOfFruits={groceryList} key={groceryList.id} />
      ))}
    </ul>
  );
}
