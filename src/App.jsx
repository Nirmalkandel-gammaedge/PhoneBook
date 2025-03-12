import ContactList from "./components/ContactList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import Body from "./components/Body";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:name" element={<EditContact />} />
        <Route path="/contacts/:name" element={<AddContact />} />
        {/* Fallback Route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
