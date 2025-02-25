import "./App.css";
import { Route } from "react-router";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

