import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import AddBooks from "./screens/manageBooks/addBooks";
import EditBooks from "./screens/manageBooks/editBooks";
import IssueNewBook from "./screens/issueNewBook";
import IssuedBooks from "./screens/issuedBooks";
import Category from "./screens/categories";
import AddUsers from "./screens/manageUsers/addUsers";
import ViewUsers from "./screens/manageUsers/viewUsers";
import Settings from "./screens/settings";
import NotFound from "./screens/NotFound";
const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <BrowserRouter>
      <Navbar open={open} />
      <div className={open ? "static opened" : "static"}>
        <Header open={open} setOpen={setOpen} />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/books/add" element={<AddBooks />} />
            <Route path="/books/edit" element={<EditBooks />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/issuedbooks" element={<IssuedBooks />} />
            <Route path="/issuenewbook" element={<IssueNewBook />} />
            <Route path="/users/view" element={<ViewUsers />} />
            <Route path="/users/add" element={<AddUsers />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
