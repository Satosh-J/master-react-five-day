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

type State = {
  selectedUser?: User,
  users: User[],
};

interface ActionType {
  type: string;
  payload: any; // Adjust the type according to your actual payload structure
}


const initialState: State = {
  selectedUser: undefined,
  users: users,
};


const userReducer = (
  state = initialState,
  action: ActionType
) => {

  switch (action.type) {

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload
      }

    default:
      return state;
  }
};

export default userReducer