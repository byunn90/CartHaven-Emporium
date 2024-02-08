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
    fruit: "Water Melon",
    price: 1,
    fruitImage: "🍉",
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
          selectedPerson={selectPerson}
        />

        <CustomerButton onClick={handleShowGroceryList} />
      </div>

      {showGroceryList && (
        <div className="grocery-list">
          <ShowGrocerys
            groceryList={groceryList}
            selectedPerson={selectPerson}
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
  const [cart, setCart] = useState({});

  const increaseQuantityFruit = () => {
    setFruitQuaintity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantityFruit = () => {
    setFruitQuaintity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleQuantityChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      setFruitQuaintity(newValue);
    }
  };

  const addToCart = () => {
    const newItem = {
      ...groceryList,
      quantity: fruitQuainty,
      totalPrice: groceryList.price * fruitQuainty,
    };
    setCart((prevCart) => {
      // If the item already exists, update its quantity and totalPrice
      if (prevCart[groceryList.id]) {
        const updatedItem = {
          ...newItem,
          quantity: prevCart[groceryList.id].quantity + newItem.quantity,
          totalPrice: prevCart[groceryList.id].totalPrice + newItem.totalPrice,
        };
        return { ...prevCart, [groceryList.id]: updatedItem };
      }
      // If the item is new, add it directly
      return { ...prevCart, [groceryList.id]: newItem };
    });
    // Optionally reset quantity after adding to cart
    setFruitQuaintity(1);
  };

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
          <input
            className="interchange"
            type="number"
            value={fruitQuainty}
            onChange={handleQuantityChange}
          />
          <button className="quantity-button" onClick={increaseQuantityFruit}>
            {">"}
          </button>
        </div>
        <button onClick={addToCart}>Add to Cart 🛒</button>
      </label>

      {/* For demonstration: Displaying a summary of the cart */}
      <div className="cart-summary">
        <h4>Cart Summary:</h4>
        {Object.values(cart).map((item) => (
          <div key={item.id}>
            {item.fruit} - Quantity: {item.quantity}, Total: $
            {item.totalPrice.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
}
function ShowGrocerys({ groceryList }) {
  return (
    <div>
      {groceryList.map((groceryItem) => (
        <div key={groceryItem.id}>
          <ListGrocerys
            groceryList={groceryItem}
            fruitQuainty={1} // Assuming starting quantity
            setFruitQuaintity={() => {}} // Assuming function for demonstration
          />
        </div>
      ))}
    </div>
  );
}
