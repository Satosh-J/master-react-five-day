type User = {
    id: ID
    first_name: string
    last_name: string
    email: string
    phone: string
}

type ID = number | string

type NewUserData = {
    first_name: string
    last_name: string
    email: string
    phone: string
}

type SavedUserData = {
    id: number
}