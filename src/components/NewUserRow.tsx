import { FC, useState } from "react";
import EditableTableCell from "./EditableCell";

interface NewUserRowProps {
  onSave: (newUser: NewUserData) => void;
  onCancel: () => void;
}

const editableFields = [
  'first_name',
  'last_name',
  'email',
  'phone',
]

const newUser = {
  first_name: '',
  last_name: '',
  email: '',
  phone: ''
}

const NewUserRow: FC<NewUserRowProps> = ({ onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState(newUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the edited user when input changes
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <tr>
      <td />
      {
        editableFields.map((field) => (
          <EditableTableCell
            key={field}
            isEditing={true}
            name={field}
            onChange={handleInputChange}
            value={editedUser[field as keyof object]}
          />
        ))
      }
      <td>
        <button onClick={() => onSave(editedUser)}
          className="btn btn-success"
        >Save</button>
      </td>
      <td>
        <button
          onClick={onCancel}
          className="btn btn-secondary"
        >Cancel</button>
      </td>
    </tr>
  );
};

export default NewUserRow;
