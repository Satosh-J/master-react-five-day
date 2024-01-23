import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';

type State = {
  selectedUser?: User,
  users: User[],
};


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


const initialState: State = {
  selectedUser: undefined,
  users: users,
};

type Action = {
  type: 'SELECT_USER',
  user: User
}


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SELECT_USER":
      return { ...state, selectedUser: action.user };
    default:
      return state;
  }
}

type UserContextType = State & {
  dispatch: React.Dispatch<Action>,
};

const UserContext = createContext<UserContextType>({
  ...initialState,
  dispatch: () => { },
});

type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const [{ selectedUser }, dispatch] =
    useReducer(reducer, initialState);
  return (
    <UserContext.Provider
      value={{
        selectedUser,
        users,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);