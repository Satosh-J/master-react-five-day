import { FC, useState } from "react";
import EditableTableCell from "./EditableCell";

interface UserRowProps {
    user: User; // Assume UserData is the type for your user data
    onEdit: (updatedUser: User) => void;
    onDelete: (userId: ID) => void;
    onRowSelect: (user: User) => void
}

const editableFields = [
    'first_name',
    'last_name',
    'email',
    'phone',
]

const UserRow: FC<UserRowProps> = ({ user, onEdit, onDelete, onRowSelect }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleEdit = () => {
        if (isEditing) {
            // Save changes
            onEdit(editedUser);
        } else {
            // Start editing
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        // Cancel editing and revert changes
        setIsEditing(false);
        setEditedUser({ ...user });
    };

    const handleSave = () => {
        // Save changes
        console.log({
            user: editedUser
        })
        onEdit(editedUser);
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update the edited user when input changes
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleRowClicked = () => {
        onRowSelect(user)
    }


    return (
        <tr key={user.id}

        >
            <td
                style={{
                    cursor: 'pointer'
                }}
                onClick={handleRowClicked}
            >{user.id}</td>
            {editableFields.map((field) => (
                <EditableTableCell
                    key={field}
                    isEditing={isEditing}
                    name={field}
                    onChange={handleInputChange}
                    value={editedUser[field as keyof object]}
                />
            ))}
            <td
            >
                {
                    isEditing ?
                        <button onClick={handleCancel}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button> :
                        <button
                            className="btn btn-primary"
                            onClick={handleEdit}>
                            Edit
                        </button>
                }
            </td>
            <td
            >
                {
                    isEditing ?
                        <button onClick={handleSave}
                            className="btn btn-primary"
                        >Save</button> :
                        <button onClick={() => onDelete(user.id)}
                            className="btn btn-danger"
                        >Delete</button>
                }
            </td>
        </tr >
    );
};

export default UserRow;
