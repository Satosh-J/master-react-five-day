import { FC, useState, useEffect } from "react";
import UserRow from "./UserRow";

interface UsersTableProps {
  users: User[]
}


const inputStyle = {
  width: '100%',
  fontSize: '16px',
  padding: '10px',
  border: '1px solid #ddd',
  marginBottom: '5px'
}

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%'
}

const thStyle = {
  border: '1px solid #cccccc',
  textAlign: 'left',
  padding: '10px'
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
    >
      <h1>Users</h1>
      <input type="text"
        value={filter}
        style={inputStyle}
        placeholder="Search for names.."
        title="Type in a name"
        onChange={(e) => setFilter(e.target.value)}
      />

      <table
        style={tableStyle}
      >
        <thead>
          <tr >
            <th style={thStyle}>No</th>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th colSpan={2} style={thStyle}>Actions</th>
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