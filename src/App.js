import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersList />
                </PrivateRoute>
              }
            />
          </Routes>
        
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
