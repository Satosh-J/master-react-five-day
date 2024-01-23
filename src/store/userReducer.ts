import { DELETE_USER_ASYNC, GET_USERS_ASYNC, SAVE_USER_ASYNC, UPDATE_USER_ASYNC } from "./actions";

interface ActionType {
  type: string;
  payload: any; // Adjust the type according to your actual payload structure,
  actualAction: any
}

type State = {
  selectedUser?: User,
  users: User[],
  totalCount: number
  isLoading: boolean
};

const initialState: State = {
  selectedUser: undefined,
  users: [],
  totalCount: 0,
  isLoading: false
};


const userReducer = (
  state = initialState,
  action: ActionType
): State => {

  switch (action.type) {

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload
      }

    case UPDATE_USER_ASYNC.PENDING:
    case SAVE_USER_ASYNC.PENDING:
    case GET_USERS_ASYNC.PENDING:
    case DELETE_USER_ASYNC.PENDING:
      return {
        ...state,
        isLoading: true
      }

    case SAVE_USER_ASYNC.REJECTED:
    case UPDATE_USER_ASYNC.REJECTED:
    case GET_USERS_ASYNC.REJECTED:
    case DELETE_USER_ASYNC.REJECTED:
      return {
        ...state,
        isLoading: false
      }

    case DELETE_USER_ASYNC.FULFILLED:

      const id = action.actualAction.payload.data
      return {
        ...state,
        isLoading: false,
        users: [...state.users.filter(item => item.id !== id)]
      }

    case SAVE_USER_ASYNC.FULFILLED:
      const newUser = action.payload.data
      return {
        ...state,
        users: [newUser, ...state.users],
        isLoading: false
      }

    case UPDATE_USER_ASYNC.FULFILLED:
      const updatedUser = action.payload.data
      const updatedUsers = state.users.map((user: User) => {
        if (user.id === updatedUser.id) {
          return { ...user, ...updatedUser }
        } else return user
      })

      return {
        ...state,
        users: updatedUsers,
        isLoading: false
      }


    case GET_USERS_ASYNC.FULFILLED:

      const response = action.payload

      const totalCount = parseInt(response.headers.get('x-total-count') || '0', 10);

      return {
        ...state,
        users: response.data,
        totalCount,
        isLoading: false
      }
    default:
      return state;
  }
};

export default userReducer