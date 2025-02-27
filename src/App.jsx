import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/molecules/ProtectedRoute/ProtectedRoute';
import { ForgotPassword } from './components/organisms/Auth/forgotPassword';
import { ResetPassword } from './components/organisms/Auth/ResetPassword';
import { SignInContainer } from './components/organisms/Auth/signInContainer';
import { SignUpConatiner } from './components/organisms/Auth/signUpConatiner';
import { Modals } from './components/organisms/Modals/Modals';
import { Toaster } from './components/ui/toaster';
import { CombinedContext_Provider } from './context/CombinedContext/CombinedContext';
import { Auth } from './pages/Auth/Auth';
import { ChannelPage } from './pages/Channel/ChannelPage';
import { DmsPage } from './pages/Dm\'s Page/DmsPage';
import { Home } from './pages/Home/Home';
import { JoinPage } from './pages/JoinPage/JoinPage';
import { NotFound } from './pages/NotFound/notFound';
import Payment from './pages/Payments/PaymentsPage';
import { WelcomePage } from './pages/Welcome/Welcome';
import { WorkspaceLayout } from './pages/workspace/Layout';
import { WorkspacePage } from './pages/workspace/WorkspacePage';

function App() {

  // Creating a QueryClient instance to manage React Query's cache and settings
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CombinedContext_Provider>
           <Routes>
              <Route path='/' element={ <WelcomePage /> }/>
              <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
              <Route path='/auth/signin' element={<Auth> <SignInContainer/> </Auth>}/>
              <Route path='/auth/signup' element={<Auth> <SignUpConatiner/>  </Auth>}/>
              <Route path='/auth/forgot-password' element={ <ForgotPassword /> }/>
              <Route path='/reset-password' element={ <ResetPassword /> }/>
              <Route path='/workspaces/:workspaceId' element={<ProtectedRoute> <WorkspaceLayout> <WorkspacePage /> </WorkspaceLayout> </ProtectedRoute>}/>
              <Route path='/workspaces/:workspaceId/channels/:channelId' element={<ProtectedRoute> <WorkspaceLayout> <ChannelPage /> </WorkspaceLayout> </ProtectedRoute>} />
              <Route path='/workspaces/:workspaceId/members/:memberId' element={<ProtectedRoute> <WorkspaceLayout> <DmsPage/> </WorkspaceLayout> </ProtectedRoute>} />
              <Route path='/makepayment' element={<ProtectedRoute> <Payment /> </ProtectedRoute>} />
              <Route path='/workspaces/join/:workspaceId' element={<JoinPage />} />
              <Route path='/*' element={<NotFound/>}/>
         </Routes>
         <Modals/>
        <Toaster/>
      </CombinedContext_Provider>
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