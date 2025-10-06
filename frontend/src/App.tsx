import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/Error";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./lib/ProtectedRoute";
import { Login } from "./pages/Login";
import { Toaster } from "sonner";
import { TimerWidgetBuilder } from "./pages/NewTimerWidget";


export const App = () => {
  return (
    <div className='font-outfit'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path='/new-widget'
          element={
            <ProtectedRoute>
              <TimerWidgetBuilder />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} /> */}
        {/* <Route path="/oauth-callback" element={<OAuthCallback />} /> */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Toaster
        richColors
        position='bottom-right'
        toastOptions={{
          style: { fontFamily: "Outfit" },
        }}
      />
    </div>
  );
};
