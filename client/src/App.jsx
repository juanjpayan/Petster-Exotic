import React from 'react';
import ScrollToTop from './ScrollToTop';
import Nav from './Navbar/Nav';
import Landing from './Landing Page/Landing';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Login/RegisterPage';
import AccountPage from './Account/AccountPage';
import LocationSearchPage from './SearchMap/LocationSearchPage';
import SearchPage from './SearchMap/SearchPage';
import UserProfilePage from './Profiles/UserProfile/UserProfilePage';
import PetProfilePage from './Profiles/PetProfile/PetProfilePage';
import SecureRoute from './Routes/SecureRoute';
import ForgetPassword from './Login/ForgetPassword';
import LoggedInRoute from './Routes/LoggedInRoute';
import UpdatePassword from './Login/UpdatePassword';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VideoChat from './VideoChat/VideoChat';
import AboutUs from './About/AboutUs';

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <ScrollToTop />
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/map" component={LocationSearchPage} />
          <Route exact path="/userprofile/:id" component={UserProfilePage} />
          <Route exact path="/petprofile/:id" component={PetProfilePage} />
          <Route exact path="/password" component={ForgetPassword} />
          <Route exact path="/update-password" component={UpdatePassword} />
          <Route exact path="/videochat" component={VideoChat} />
          <Route exact path="/about-us" component={AboutUs} />
          <LoggedInRoute exact path="/login" component={LoginPage} />
          <LoggedInRoute exact path="/register" component={RegisterPage} />
          <SecureRoute exact path="/account" component={AccountPage} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
};

export default App;
