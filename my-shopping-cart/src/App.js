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
  const [customerCarts, setCustomerCarts] = useState({});

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
          selectedPerson={selectPerson} // Make sure this matches what's expected in ShowListPeople
        />

        <CustomerButton onClick={handleShowGroceryList} />
      </div>

      {showGroceryList && (
        <div className="grocery-list">
          <ShowGrocerys
            groceryList={groceryList}
            selectedPerson={selectPerson} // Corrected from selectPerson to selectedPerson
            addToCustomerCart={addToCustomerCart}
          />
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
function Person({ customer, onSelect, selectedPerson }) {
  // Check if this customer is the selected one
  const isSelected = selectedPerson?.id === customer.id;

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
function ShowGrocerys({ groceryList, selectedPerson, addToCustomerCart }) {
  // Assuming each addition is a single quantity
  const handleAddToCart = (fruitId) => {
    if (!selectedPerson) {
      alert("Please select a customer first.");
      return;
    }
    addToCustomerCart(selectedPerson.id, fruitId, 1); // Add 1 quantity of the fruit
  };

  return (
    <div>
      {groceryList.map((groceryItem) => (
        <div key={groceryItem.id}>
          <ListGrocerys groceryList={groceryItem} />
          <div className="shopping-cart-btn">
            <button onClick={() => handleAddToCart(groceryItem.id)}>
              Add to Basket 🛒
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function addToCustomerCart(
  customerId,
  fruitId,
  quantityToAdd,
  setCustomerCarts
) {
  setCustomerCarts((prevCarts) => {});
}
