import React, { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./landing.css";
import Navbar from "../navbar/Navbar";
import Home from "../../pages/home/Home";
import { ArtsList } from "../Arts-sidebar/ArtsList";
import Contact from "../../pages/contactus/Contactus";
import Pencil from "../../pages/pencilarts/Pencil";
import History from "../../pages/history/History";

export const Landing = () => {
  let { path } = useRouteMatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="landing">
      <Navbar />
      <div className="main-content">
        <div className={`sidebar`}>
          <ArtsList />
        </div>
        <div className="content-section">
          <Switch>
            <Route exact path={path} component={Home} />
            <Route path={`/contact`} component={Contact} />
            <Route path={`/pencilarts`} component={Pencil} />
            <Route path={`/my-cart`} component={History}/>
          </Switch>
        </div>
      </div>
    </div>
  );
};
