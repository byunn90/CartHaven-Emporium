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
    quantity: 0,
  },
  {
    id: 2,
    fruit: "Banana",
    price: 2,
    fruitImage: "🍌",
    quantity: 0,
  },
  {
    id: 3,
    fruit: "Tomato",
    price: 2,
    fruitImage: "🍅",
    quantity: 0,
  },
  {
    id: 4,
    fruit: "Water Melon",
    price: 3,
    fruitImage: "🍉",
    quantity: 0,
  },
];

export default function App() {
  const [customer, setCustomer] = useState(initialBasketAndCustomers);
  const [groceryList, setGroceryList] = useState(initialFruits);
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [selectPerson, setSelectedPerson] = useState(null);
  const [showTotalPrice, setShowTotalPrice] = useState(false);

  const totalPrice = groceryList.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  function handleShowGroceryList() {
    setShowGroceryList((prevShowGroceryList) => !prevShowGroceryList);
  }

  function HandleTotalPrice() {
    setShowTotalPrice((total) => !total);
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
          selectedPerson={selectPerson}
        />

        <CustomerButton onClick={handleShowGroceryList} />
      </div>
      {showGroceryList && (
        <>
          <ShowGrocerys
            groceryList={groceryList}
            setGroceryList={setGroceryList}
            selectedPerson={selectPerson}
          />
          <button className="AddToCart" onClick={HandleTotalPrice}>
            Add To Cart
          </button>
          {showTotalPrice && <h4>Your Total Cost is: ${totalPrice}</h4>}
        </>
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
          selectedPerson={selectedPerson}
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
function ShowGrocerys({ groceryList, setGroceryList }) {
  const increaseQuantity = (fruitId) => {
    const updatedList = groceryList.map((fruit) => {
      if (fruit.id === fruitId) {
        return { ...fruit, quantity: fruit.quantity + 1 };
      }
      return fruit;
    });
    setGroceryList(updatedList);
  };

  function TotalPrice() {
    const totalPrice = groceryList.reduce((acc, current) => {
      return acc + current.quantity * current.price;
    }, 0);

    console.log(totalPrice);

    return totalPrice;
  }

  const decreaseQuantity = (fruitId) => {
    const updatedList = groceryList.map((fruit) => {
      if (fruit.id === fruitId && fruit.quantity > 0) {
        return { ...fruit, quantity: fruit.quantity - 1 };
      }
      return fruit;
    });
    setGroceryList(updatedList);
  };

  return (
    <div className="grocery-list">
      {groceryList.map((item) => (
        <div key={item.id}>
          <h3>{item.fruit}</h3>
          <h2>{item.fruitImage}</h2>
          <h4>${item.price}</h4>
          <div className="fruitQuantity">
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <input type="number" value={item.quantity} readOnly />
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}
