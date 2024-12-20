import './App.css';

import { Route, Routes } from 'react-router-dom';

import { SignInCard } from './components/organisms/Auth/signInCard';
import { SignUpCard } from './components/organisms/Auth/signUpCard';
import { Auth } from './pages/Auth/Auth';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/notFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth/signin' element={<Auth> <SignInCard/> </Auth>}/>
      <Route path='/auth/signup' element={<Auth> <SignUpCard/> </Auth>}/>
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
