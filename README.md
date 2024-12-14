# The application is deployed here
https://employwise-assignment-8liy.onrender.com


# User Management Application

This project is a React-based user management application with features for login, fetching user data, viewing, editing, and deleting users. 
The endpoint for authentication is called using POST and the token received is stored in localStorage, I have implemented an AuthContext for providing the login function, logout function and the value of the token. If there is a token only then we go to the `<UsersList/>` otherwise we `<Navigate to="/login"/>`

## Features

### 1. **Authentication**
- Users can log in by providing their email and password.
- Authentication is validated using a POST request:
  - **Endpoint**: `POST https://reqres.in/api/login`
  - **Request Body**:
    ```json
    {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "QpwL5tke4Pnpja7X4"
    }
    ```
- The token is stored in `localStorage` for persistent sessions.

### 2. **Protected Routes**
- Users can only access the `/users` route if they are authenticated.
- Unauthenticated users are redirected to the `/login` page.
- Token validation is performed for every route.

### 3. **User List**
- Displays a paginated list of users fetched from an API.
  - **Endpoint**: `GET https://reqres.in/api/users?page={page}`

### 4. **Edit User**
- Clicking "Edit" on a user card opens a modal with a pre-filled form to update user details.
- Allows editing `first_name`, `last_name`, and `email`.
- Updates are sent via:
  - **Endpoint**: `PUT https://reqres.in/api/users/{id}`
  - **Request Body**:
    ```json
    {
      "first_name": "UpdatedName",
      "last_name": "UpdatedLastName",
      "email": "updated.email@example.com"
    }
    ```

### 5. **Delete User**
- Clicking "Delete" removes the user from the list.
- Deletion is performed via:
  - **Endpoint**: `DELETE https://reqres.in/api/users/{id}`

### 6. **UI Feedback**
- Success or error messages are displayed as TOASTS using `Chakra UI`'s `useToast`.

---