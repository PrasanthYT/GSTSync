import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/Signup';
import PageTitle from './Components/PageTitle';
import Input from './pages/Authentication/Input';
import './index.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | GSTsync - GST Management" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | GSTsync - GST Management" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/inputpage"
          element={
            <>
              <PageTitle title="Input | GSTsync - GST Management" />
              <Input />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
