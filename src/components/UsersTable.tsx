// UsersTable.tsx

import { useState, useEffect } from "react";
import UserRow from "./UserRow";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';


const UsersTable = () => {

  const { users }: { users: User[] } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handleUserSelect = (user: User) => {
    dispatch({ type: 'SELECT_USER', payload: user })
  }

  const [filter, setFilter] = useState('');

  const handleDelete = (id: ID) => {
    console.log('Delete: ', id)
  }

  const handleEdit = (id: ID) => {
    console.log('Edit: ', id)
  }
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulating asynchronous data fetching
    const fetchData = async () => {
      try {
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Filtering logic (simulated API response)
        const filteredData = users.filter((user) => {
          return Object.values(user).some((value) =>
            value.toString().toLowerCase().includes(filter.toLowerCase())
          );
        });

        // Update state with filtered data
        setFilteredUsers(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData when the filter or users change
    fetchData();
  }, [filter, users]);

  return (
    <div>
      <h1>Users</h1>
      <input type="text"
        value={filter}
        className="form-control my-2"
        placeholder="Search for names.."
        title="Type in a name"
        onChange={(e) => setFilter(e.target.value)}
      />

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <UserRow
              onRowSelect={handleUserSelect}
              key={user.id}
              user={user}
              onEdit={() => handleEdit(user.id)}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;