export async function getUsers() {
  const response = await fetch(
    'http://localhost:5000/users'
  );
  const body = await response.json()
  return body;
}

// http://localhost:5000/users?q=el&_page=1&_limit=4
export async function fetchFilteredPaginatedUsers(query: string, pageNumber: number, itemsPerPage: number) {
  const apiUrl = `http://localhost:5000/users?q=${query}&_page=${pageNumber}&_limit=${itemsPerPage}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch paginated users. Status: ${response.status}`);
    }

    // Extract the total count from the 'X-Total-Count' header
    const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);

    // Parse the JSON response
    const users = await response.json();

    // Return an object containing both users and total count
    return { users, totalCount };
  } catch (error: any) {
    console.error('Error fetching paginated users:', error.message);
    throw error; // Re-throw the error for handling at the calling code
  }
}

export async function saveUser(
  newUserData: NewUserData
) {
  const response = await fetch(
    'http://localhost:5000/users',
    {
      method: 'POST',
      body: JSON.stringify(newUserData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const body = (await response.json()) as SavedUserData;
  return { ...newUserData, ...body };
}


export async function updateUser(user: User) {
  const response = await fetch(`http://localhost:5000/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`);
  }

  const updatedUser: User = await response.json();
  return updatedUser;
}

export async function deleteUser(id: ID) {
  const response = await fetch(`http://localhost:5000/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.statusText}`);
  }

  return true;
}