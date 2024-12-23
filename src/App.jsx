import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { SignInContainer } from './components/organisms/Auth/signInContainer';
import { SignUpConatiner } from './components/organisms/Auth/signUpConatiner';
import { Auth } from './pages/Auth/Auth';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/notFound';

function App() {

  // Creating a QueryClient instance to manage React Query's cache and settings
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth/signin' element={<Auth> <SignInContainer/> </Auth>}/>
        <Route path='/auth/signup' element={<Auth> <SignUpConatiner/>  </Auth>}/>
        <Route path='/*' element={<NotFound/>}/>
     </Routes>
   </QueryClientProvider>
  
  );
}

export default App;

/*
Explanation =>
  
QueryClient:  
          *  This is an instance provided by React Query, which is a powerful library for managing server state in React applications.
* The QueryClient handles caching, fetching, and updating of data for components that utilize React Query hooks like useQuery or useMutation.

QueryClientProvider:
                 * This is a context provider that wraps your application (or parts of it) to supply the queryClient instance.
* Components inside the QueryClientProvider can then use React Query hooks to interact with the queryClient.

Purpose in Code:
              It enables efficient data fetching, caching, and state management for components 
 like Home, SignInCard, and SignUpCard that may need server-side data.

 */