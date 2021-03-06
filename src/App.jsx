import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { TripProvider } from './context/TripProvider';
import { UserProvider } from './context/UserProvider';
import AboutUs from './views/About Us/AboutUs';
import Login from './views/Auth/Login';
import PlanPage from './views/Plan/PlanPage';
import Trips from './views/Trips/Trips';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <UserProvider>
          <TripProvider>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/aboutus">
                <AboutUs />
              </Route>
              <Route path="/trips">
                <Trips />
              </Route>
              <PrivateRoute path="/plan/:id">
                <PlanPage />
              </PrivateRoute>
            </Switch>
          </TripProvider>
        </UserProvider>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
