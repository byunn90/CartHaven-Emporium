import { useState } from "react";
import "./index.css";
import { Alert } from "bootstrap";
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
    price: 2,
    fruitImage: "🍅",
  },
  {
    id: 4,
    fruit: "Water Melon",
    price: 3,
    fruitImage: "🍉",
  },
];

export default function App() {
  const [customer, setCustomer] = useState(initialBasketAndCustomers);
  const [groceryList, setGroceryList] = useState(initialFruits);
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [selectPerson, setSelectedPerson] = useState(null);
  const [fruitQuantity, setFruitQuantity] = useState(0);
  const [cart, setCart] = useState({});

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
  function onClick() {
    alert("Please return the stolen good");
  }
  function AddToCart({ onClick }) {
    return (
      <button className="AddToCart" onClick={onClick}>
        Add To Cart
      </button>
    );
  }
  return (
    <div className="app">
      <div className="sidebar">
        <ShowListPeople
          customer={customer}
          onSelect={PersonSelected}
          selectedPerson={selectPerson}
        />

        <CustomerButton onClick={handleShowGroceryList} />
      </div>

      {showGroceryList && (
        <div>
          <div className="grocery-list">
            <ShowGrocerys
              fruitQuantity={fruitQuantity}
              setFruitQuantity={setFruitQuantity}
              groceryList={groceryList}
              selectedPerson={selectPerson}
              customer={customer}
            />
            <AddToCart onClick={onClick} />
          </div>
        </div>
      )}
    </div>
  );
}

function ShowListPeople({ customer, onSelect, selectedPerson }) {
  return (
    <div className="Person">
      {customer.map((customer) => (
        <Person
          key={customer.id}
          customer={customer}
          onSelect={onSelect}
          selectedPerson={selectedPerson} // Pass this to each Person
        />
      ))}
    </div>
  );
}
function Person({ customer, onSelect, setSelectedPerson }) {
  // Check if this customer is the selected one
  const isSelected = setSelectedPerson?.id === customer.id;

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
function ShowGrocerys({
  groceryList,
  selectedPerson,
  fruitQuantity,
  setFruitQuantity,
}) {
  function IncreaseQuantity(fruitId) {
    setFruitQuantity((prevQuantities) => ({
      ...prevQuantities,
      [fruitId]: (prevQuantities[fruitId] || 0) + 1,
    }));
  }

  function DecreaseQuantity(fruitId) {
    setFruitQuantity((prevQuantities) => ({
      ...prevQuantities,
      [fruitId]: Math.max(0, (prevQuantities[fruitId] || 0) - 1),
    }));
  }

  return (
    <div className="grocery-list">
      {groceryList.map((item) => (
        <div key={item.id}>
          <h3>{item.fruit}</h3>
          <h2>{item.fruitImage}</h2>
          <h4>${item.price}</h4>
          <h4>{item.price}</h4>
          <div className="fruitQuantity">
            <button onClick={() => DecreaseQuantity(item.id)}>-</button>
            <input type="number" value={fruitQuantity[item.id] || 0} readOnly />
            <button onClick={() => IncreaseQuantity(item.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}
