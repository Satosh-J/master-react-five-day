// UsersTable.tsx

import { useState, useEffect, useRef } from "react";
import UserRow from "./UserRow";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchFilteredPaginatedUsers, saveUser, updateUser } from "../api/users";
import Pagination from "./Pagination";
import NewUserRow from "./NewUserRow";
import { RootState } from "../store/store";


const UsersTable = () => {

  const { users, isLoading, totalCount } = useSelector((state: RootState) => state.user)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the desired number of items per page




  const dispatch = useDispatch()

  const handleUserSelect = (user: User) => {
    dispatch({ type: 'SELECT_USER', payload: user })
  }

  const [filter, setFilter] = useState('');

  const handleDelete = (id: ID) => {
    dispatch(deleteUser(id))

  }

  const handleEdit = (editedUser: User) => {
    dispatch(updateUser(editedUser))
  }

  const prevFilterRef = useRef(filter); // useRef to store the previous filter value

  useEffect(() => {
    let cancel = false;

    // Reset currentPage to 1 when the filter changes
    if (prevFilterRef.current !== filter) {
      setCurrentPage(1);
    }

    if (!cancel)
      dispatch(
        fetchFilteredPaginatedUsers(filter, currentPage, itemsPerPage)
      )

    // Update the ref with the current filter value after the fetch
    prevFilterRef.current = filter;

    return () => {
      cancel = true;
    };
  }, [currentPage, filter]);


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [isNew, setIsNew] = useState(false)
  const handleNewUserSave = (user: NewUserData) => {
    dispatch(saveUser(user))
    setIsNew(false)
  }


  return (
    <div>
      <h1>Users</h1>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <input type="text"
              value={filter}
              className="form-control my-2"
              placeholder="Search for names.."
              title="Type in a name"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end">
            <button className="btn btn-primary"
              onClick={() => setIsNew(true)}
            >Add New</button>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-12">
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
                {isNew && <NewUserRow onCancel={() => setIsNew(false)} onSave={handleNewUserSave} />}
                {isLoading ? <tr><td colSpan={6}>Loading...</td></tr> :
                  users.length > 0 ? (
                    users.map((user: User) => (
                      <UserRow
                        key={user.id}
                        user={user}
                        onRowSelect={handleUserSelect}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : null}
                {!isLoading && users.length === 0 && !isNew && <tr><td colSpan={6}>No user found</td></tr>}
              </tbody>

            </table>
            <Pagination
              itemsCount={totalCount} //New state that stores total count
              // itemsCount={filteredUsers.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default UsersTable;