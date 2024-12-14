import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Image,
    SimpleGrid,
    Text,
    VStack,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Spinner,
} from "@chakra-ui/react";
import axios from "axios";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const toast = useToast();

    const fetchUsers = async (page) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
            setUsers(response.data.data);
            setNumberOfPages(response.data.total_pages);
        } catch (error) {
            toast({ title: "Error fetching users", status: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
            toast({ title: "User deleted successfully", status: "success" });
        } catch (error) {
            toast({ title: "Error deleting user", status: "error" });
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setIsEditing(true);
    };

    const handleUpdateUser = async () => {
        try {
            //put ACTUALLY works and returns the updated value of the particular user
            const response = await axios.put(`https://reqres.in/api/users/${editingUser.id}`, {
                first_name: editingUser.first_name,
                last_name: editingUser.last_name,
                email: editingUser.email,
            });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editingUser.id ? { ...user, ...response.data } : user
                )
            );
            toast({ title: "User updated successfully", status: "success" });
            setIsEditing(false);
        } catch (error) {
            toast({ title: "Error updating user", status: "error" });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser((prev) => ({ ...prev, [name]: value }));
    };

    const backHandler = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const nextHandler = () => {
        if (page <= numberOfPages - 1) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    return (
        <Box p="6">
            {isLoading ? (
                <Spinner size="xl" />
            ) : (
                <div>
                    <SimpleGrid columns={3} spacing={4}>
                        {users.map((user) => (
                            <VStack key={user.id} p="4" boxShadow="md" borderRadius="md">
                                <Image src={user.avatar} alt={user.first_name} borderRadius="full" />
                                <Text fontWeight="bold">
                                    {user.first_name} {user.last_name}
                                </Text>
                                <Text>{user.email}</Text>
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={() => handleEditClick(user)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </VStack>
                        ))}
                    </SimpleGrid>
                    <Box mt="4" textAlign="center">
                        <Button
                            colorScheme="blue"
                            mr="2"
                            onClick={backHandler}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={nextHandler}
                            disabled={page === numberOfPages}
                        >
                            Next
                        </Button>
                    </Box>
                </div>
            )}

            {/* Edit Modal */}
            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                name="first_name"
                                value={editingUser?.first_name || "" }
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                name="last_name"
                                value={editingUser?.last_name || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name="email"
                                value={editingUser?.email || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr="3" onClick={handleUpdateUser}>
                            Save
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default UsersList;
