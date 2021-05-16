import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Details from "./components/Details";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Shipping from "./components/Shipping";
import Payment from "./components/Payment";
import Paypal from "./components/Paypal";
import Cookies from "js-cookie";
import Orders from "./components/Orders";

function App() {
  const { open } = useSelector((state) => state.model);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const usr = await Cookies.getJSON("ecom_user");
      setUser(usr);
      const crt = await Cookies.getJSON(`${usr?.email}_cart`);
      if (crt) setCart(crt);
      console.log(cart);
      if (crt) {
        let ttl = 0;
        for (let i = 0; i < crt.length; i++) {
          ttl = parseInt(crt[i].price) * parseInt(crt[i].qty) + ttl;
          console.log(ttl);
          setTotal(ttl);
        }
      }
    };
    fetch();
  }, [open]);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/orders">
            {user ? (
              <>
                <Nav />
                <Orders user={user} />
              </>
            ) : (
              <>
                <Nav />
                <Login />
              </>
            )}
          </Route>
          {user && (
            <Route path="/paypal">
              <Nav />
              <Paypal user={user} cart={cart} total={total} />
            </Route>
          )}
          <Route path="/payment">
            <Nav />
            <Payment user={user} cart={cart} total={total} />
          </Route>
          <Route path="/shipping">
            <Shipping />
          </Route>
          <Route path="/cart">
            {user ? (
              <>
                <Nav />
                <Cart user={user} cart={cart} total={total} setTotal={total} />
              </>
            ) : (
              <>
                <Nav />
                <Login />
              </>
            )}
          </Route>
          <Route path="/myproducts">
            {user ? (
              <>
                <Nav />
                <Products />
              </>
            ) : (
              <>
                <Nav />
                <Login />
              </>
            )}
          </Route>
          <Route path="/user/login">
            <Nav />
            <Login name={user?.name} mail={user?.email} />
          </Route>
          <Route path="/user/register">
            <Nav />
            <Register />
          </Route>
          <Route
            path="/product/details/:id"
            render={({ match, history }) => (
              <>
                <Details id={match.params.id} history={history} />
                <Nav />
              </>
            )}
          />
          <Route path="/">
            <Nav />
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
