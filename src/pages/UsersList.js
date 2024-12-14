import React, { useEffect, useState } from "react";
import { Box, Button, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const UsersList = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async (page) => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    setUsers(response.data.data);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <Box p="6">
      <SimpleGrid columns={3} spacing={4}>
        {users.map((user) => (
          <VStack key={user.id} p="4" boxShadow="md" borderRadius="md">
            <Image src={user.avatar} alt={user.first_name} borderRadius="full" />
            <Text fontWeight="bold">
              {user.first_name} {user.last_name}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
      <Box mt="4" textAlign="center">
        <Button
          colorScheme="blue"
          mr="2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button colorScheme="blue" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UsersList;
