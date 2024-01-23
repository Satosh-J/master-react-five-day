const users = [
  {
    "id": 18,
    "first_name": "Cherlyn",
    "last_name": "Kleingrub",
    "email": "ckleingrubh@nps.gov",
    "phone": "915-736-0167",
  },
  {
    "id": 19,
    "first_name": "Stan",
    "last_name": "Aasaf",
    "email": "saasafi@gnu.org",
    "phone": "903-560-9509",
  },
  {
    "id": 20,
    "first_name": "Penelope",
    "last_name": "Raggitt",
    "email": "praggittj@mayoclinic.com",
    "phone": "563-943-2235",
  }
]
const UsersTable = () => {
  return (
    <div>
      <h1>Users</h1>
      <p>This component illustrates the utilization of component props in the React</p>
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Phone</td>
          </tr>
        </thead>
        <tbody>
          {users.map(item => (
            <tr key={`${item.id}`}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;