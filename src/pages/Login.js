import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, VStack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../AuthContext";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
  
    const handleSubmit = async () => {
      try {
        const response = await axios.post("https://reqres.in/api/login", {
          email,
          password,
        });
        login(response.data.token);
        toast({ title: "Login successful", status: "success" });
        navigate("/users");
      } catch (error) {
        localStorage.removeItem("token");
        toast({ title: "Login failed", status: "error" });
      }
    };
  
    return (
      <Box maxW="md" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md">
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">Login</Text>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSubmit}>
            Login
          </Button>
        </VStack>
      </Box>
    );
  };
  
  export default Login;
  