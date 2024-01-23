import { DELETE_USER, GET_USERS, SAVE_USER, UPDATE_USER } from "../store/actions";


const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const MODE = import.meta.env.MODE;
console.log({
  MODE
})


export async function getUsers() {
  const response = await fetch(
    'http://localhost:5000/users'
  );
  const body = await response.json()
  return body;
}

export function fetchFilteredPaginatedUsers(query: string, pageNumber: number, itemsPerPage: number) {
  const apiUrl = `${BASE_API_URL}/users?q=${query}&_page=${pageNumber}&_limit=${itemsPerPage}`;

  const payload = {
    action: GET_USERS,
    method: 'GET',
    url: apiUrl,
  };
  return { type: 'API_INVOCATION', payload };
}


export function saveUser(
  newUserData: NewUserData
) {
  const apiUrl = `${BASE_API_URL}/users`;

  const payload = {
    action: SAVE_USER,
    method: 'POST',
    url: apiUrl,
    data: newUserData
  };
  return { type: 'API_INVOCATION', payload };
}



export function updateUser(user: User) {
  const apiUrl = `${BASE_API_URL}/users/${user.id}`;

  const payload = {
    action: UPDATE_USER,
    method: 'PUT',
    url: apiUrl,
    data: user
  };
  return { type: 'API_INVOCATION', payload };

}

export function deleteUser(id: ID) {
  const apiUrl = `${BASE_API_URL}/users/${id}`;

  const payload = {
    action: DELETE_USER,
    method: 'DELETE',
    url: apiUrl,
    data: id
  };
  return { type: 'API_INVOCATION', payload };
}