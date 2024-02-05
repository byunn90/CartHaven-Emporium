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
];

export default function App() {
  const [customer, setCustomer] = useState(initialBasketAndCustomers);
  const [groceryList, setGroceryList] = useState(initialFruits);
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [selectPerson, setSelectedPerson] = useState(null);

  function handleShowGroceryList() {
    setShowGroceryList((prevShowGroceryList) => !prevShowGroceryList);
  }

  function CustomerButton({ onClick }) {
    return (
      <button className="button" onClick={onClick}>
        {showGroceryList ? "Hide Grocery List" : "Show Grocery List"}
      </button>
    );
  }

  function PersonSelected(customer) {
    setSelectedPerson((cur) => {
      console.log(customer);
      return cur?.id === customer.id ? null : customer;
    });
  }
  return (
    <div className="app">
      <div className="sidebar">
        <ShowListPeople
          customer={customer}
          onSelect={PersonSelected}
          selectPerson={selectPerson}
        />

        <CustomerButton onClick={handleShowGroceryList} />
      </div>

      {showGroceryList && (
        <div className="grocery-list">
          <ShowGrocerys groceryList={groceryList} />
        </div>
      )}
    </div>
  );
}

function ShowListPeople({ customer, onSelect }) {
  return (
    <div className="Person">
      {customer.map((customer) => (
        <Person key={customer.id} customer={customer} onSelect={onSelect} />
      ))}
    </div>
  );
}
function Person({ customer, onSelect, setSelectedPerson }) {
  const isSelected = setSelectedPerson?.id === customer.id;
  console.log(isSelected);

  return (
    <div className={`person-container ${isSelected ? "selected" : ""}`}>
      <div className="person-details">
        <h3>{customer.name}</h3>
        <img src={customer.image} alt={customer.name} />
        <h3>Balance: ${customer.balance}</h3>
      </div>
      <button className="select" onClick={() => onSelect(customer)}>
        {isSelected ? "Deselect" : "Select"}
      </button>
    </div>
  );
}
function ListGrocerys({ groceryList }) {
  const [fruitQuainty, setFruitQuaintity] = useState(1);

  function increaseQuantityFruit() {
    if (fruitQuainty < 0) return;
    setFruitQuaintity((prevQuantity) => prevQuantity + 1);
  }
  function decreaseQuantityFruit() {
    setFruitQuaintity((prevQuantity) => prevQuantity - 1);
    if (fruitQuainty <= 0) setFruitQuaintity(0);
  }

  return (
    <div className="form-split-bill">
      <label>
        <h3>{groceryList.fruit}</h3>
        <h3>{groceryList.fruitImage}</h3>
        <h3>${groceryList.price * fruitQuainty}</h3>

        <div className="quantity-container">
          <button className="quantity-button" onClick={decreaseQuantityFruit}>
            {"<"}
          </button>
          <input className="interchange" value={fruitQuainty} readOnly />
          <button className="quantity-button" onClick={increaseQuantityFruit}>
            {">"}
          </button>
        </div>
      </label>
    </div>
  );
}

function ShowGrocerys({ groceryList }) {
  return (
    <div>
      {groceryList.map((groceryItem) => (
        <ListGrocerys groceryList={groceryItem} key={groceryItem.id} />
      ))}
      <div className="shopping-cart-btn">
        <button>Add to Basket 🛒</button>
      </div>
    </div>
  );
}
