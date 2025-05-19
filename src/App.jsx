import './App.css';
import HomePage from './components/Pages/HomePage';
import SignUp from './components/Pages/SignUp';
import ErrorPage from './components/Pages/ErrorPage';
import Main from './components/Pages/Main';
import SignInOrSignUp from './components/Pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='/homepage' element={<Main/>} />
        <Route path='/signin' element={<SignInOrSignUp/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
