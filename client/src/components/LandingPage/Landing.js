import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import "./landing.css";
import Navbar from '../navbar/Navbar';
import Home from '../../pages/home/Home';
import { ArtsList } from '../Arts-sidebar/ArtsList';
import Contact from '../../pages/contactus/Contactus';
import Pencil from '../../pages/pencilarts/Pencil';

export const Landing = () => {
  let { path } = useRouteMatch();

  return (
    <div className="landing" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, marginTop: "0.1rem" }}>
        <div className='sidebar' style={{ width: '20%' }}>
          <ArtsList />
        </div>
        <div className='content-section' style={{ flex: 1, height: "100%" }}>
          <Switch>
            <Route exact path={path} component={Home} />
            <Route path={`/contact`} component={Contact} />
            <Route path={`/pencilarts`} component={Pencil} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
