import { FC } from "react";

interface UserRowProps {
  name: string
  value: string
  onChange: (e: any) => void
  isEditing: boolean
}

const EditableTableCell: FC<UserRowProps> = ({ name, value, onChange, isEditing = false }) => {


  return (
    <td className={isEditing ? 'editing' : ''}
    >
      {isEditing ? (
        <input
          type="text"
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
        />
      ) : (
        value
      )}
    </td>
  );
};

export default EditableTableCell;
