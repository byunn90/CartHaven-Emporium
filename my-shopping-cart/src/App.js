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
    quantity: 0, // Initial quantity set to 0
  },
  {
    id: 2,
    fruit: "Banana",
    price: 2,
    fruitImage: "🍌",
    quantity: 0, // Initial quantity set to 0
  },
  {
    id: 3,
    fruit: "Tomato",
    price: 2,
    fruitImage: "🍅",
    quantity: 0, // Initial quantity set to 0
  },
  {
    id: 4,
    fruit: "Water Melon",
    price: 3,
    fruitImage: "🍉",
    quantity: 0, // Initial quantity set to 0
  },
];

export default function App() {
  const [customer, setCustomer] = useState(initialBasketAndCustomers);
  const [groceryList, setGroceryList] = useState(initialFruits);
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [selectPerson, setSelectedPerson] = useState(null);
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
    alert("Thanks for Shopping at our Store! ☺");
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
              groceryList={groceryList}
              setGroceryList={setGroceryList}
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
  setGroceryList,
  selectedPerson,
  onClick,
}) {
  // Function to increase the quantity of a specific fruit
  const increaseQuantity = (fruitId) => {
    // Update the groceryList state with the new quantity for the selected fruit
    const updatedList = groceryList.map((fruit) => {
      if (fruit.id === fruitId) {
        return { ...fruit, quantity: fruit.quantity + 1 };
      }
      return fruit;
    });
    setGroceryList(updatedList);
  };

  function TotalPrice() {
    // Calculate the total price
    const totalPrice = groceryList.reduce((acc, current) => {
      return acc + current.quantity * current.price;
    }, 0); // Start accumulating from 0

    // Log the total price
    console.log(totalPrice);

    // Optionally, if you want to show the total price on the UI,
    // you might consider returning this value or using another state to manage it.
    return totalPrice;
  }
  // Optionally, a function to decrease the quantity, ensuring it doesn't go below 0
  const decreaseQuantity = (fruitId) => {
    const updatedList = groceryList.map((fruit) => {
      if (fruit.id === fruitId && fruit.quantity > 0) {
        return { ...fruit, quantity: fruit.quantity - 1 };
      }
      return fruit;
    });
    setGroceryList(updatedList);
  };
  const totalPrice = groceryList.reduce((acc, current) => {
    return acc + current.quantity * current.price;
  }, 0);

  // Display each fruit with its details and controls to adjust quantity
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
      <onClick onClick={TotalPrice}>show me</onClick>
      <h4>total Price: $ {totalPrice}</h4>
    </div>
  );
}
