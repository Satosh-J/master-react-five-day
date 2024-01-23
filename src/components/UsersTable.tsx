/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useState, useEffect } from "react";
import UserRow from "./UserRow";

interface UsersTableProps {
  users: User[]
}


const UsersTable: FC<UsersTableProps> = ({ users }) => {

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
    <div
      css={css`
      table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
      }

      td,
      th {
          border: 1px solid #cccccc;
          text-align: left;
          padding: 10px;
      }

      tr:nth-child(even) {
          background-color: #dddddd;
      }
    `}
    >
      <h1>Users</h1>
      <input type="text"
        value={filter}
        css={css`
        width: 100%;
        font-size: 16px;
        padding: 10px;
        border: 1px solid #ddd;
        margin-bottom: 5px;
        `}
        placeholder="Search for names.."
        title="Type in a name"
        onChange={(e) => setFilter(e.target.value)}
      />

      <table>
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