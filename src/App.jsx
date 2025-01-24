import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/molecules/ProtectedRoute/ProtectedRoute';
import { SignInContainer } from './components/organisms/Auth/signInContainer';
import { SignUpConatiner } from './components/organisms/Auth/signUpConatiner';
import { Modals } from './components/organisms/Modals/Modals';
import { Toaster } from './components/ui/toaster';
import { CombinedContextProvider } from './context/combinedContextProvider';
import { Auth } from './pages/Auth/Auth';
import { ChannelPage } from './pages/Channel/ChannelPage';
import { DmsPage } from './pages/Dm\'s Page/DmsPage';
import { Home } from './pages/Home/Home';
import { JoinPage } from './pages/JoinPage/JoinPage';
import { NotFound } from './pages/NotFound/notFound';
import Payment from './pages/Payments/Payments';
import { WorkspaceLayout } from './pages/workspace/Layout';

function App() {

  // Creating a QueryClient instance to manage React Query's cache and settings
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CombinedContextProvider>
           <Routes>
              <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
              <Route path='/auth/signin' element={<Auth> <SignInContainer/> </Auth>}/>
              <Route path='/auth/signup' element={<Auth> <SignUpConatiner/>  </Auth>}/>
              <Route path='/workspaces/:workspaceId' element={<ProtectedRoute> <WorkspaceLayout> Workspace </WorkspaceLayout> </ProtectedRoute>}/>
              <Route path='/workspaces/:workspaceId/channels/:channelId' element={<ProtectedRoute> <WorkspaceLayout> <ChannelPage /> </WorkspaceLayout> </ProtectedRoute>} />
              <Route path='/workspaces/:workspaceId/members/:memberId' element={<ProtectedRoute> <WorkspaceLayout> <DmsPage/> </WorkspaceLayout> </ProtectedRoute>} />
              <Route path='/makepayment' element={<ProtectedRoute> <Payment /> </ProtectedRoute>} />
              <Route path='/workspaces/join/:workspaceId' element={<JoinPage />} />
              <Route path='/*' element={<NotFound/>}/>
         </Routes>
         <Modals/>
        <Toaster/>
      </CombinedContextProvider>
   </QueryClientProvider>
  );
};

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