import { FC } from "react";

interface UserRowProps {
  name: string
  value: string
  onChange: (e: any) => void
  isEditing: boolean
}

const tdStyle = {
  border: '1px solid #cccccc',
  textAlign: 'left',
  padding: '10px'
}

const EditableTableCell: FC<UserRowProps> = ({ name, value, onChange, isEditing = false }) => {


  return (
    <td
      style={tdStyle}
    >
      {isEditing ? (
        <input
          type="text"
          name={name}
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
