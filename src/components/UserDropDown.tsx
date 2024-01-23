import { useState } from 'react';
import { Link } from 'react-router-dom';


const MENU_ITEMS = [
    {
        id: 'list',
        to: '/',
        label: 'List'
    },
    {
        id: 'role',
        to: '/role',
        label: 'Roles'
    },
    {
        id: 'license',
        to: '/license',
        label: 'License'
    },
]

export const UserDropDown = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
            <button onClick={handleOpen}
                className='btn btn-secondary dropdown-toggle w-100'
                type='button'
            >Select</button>
            <div className={`w-100 dropdown-menu ${open ? 'show' : ''}`}>
                {
                    MENU_ITEMS.map((item) => (
                        <Link
                            to={item.to}
                            className='dropdown-item'
                            children={item.label}
                            key={item.id}
                        />
                        // <Link to={item.to} className='dropdown-item active' children={item.label} />
                    ))
                }
            </div>
        </div>
    );
}

export default UserDropDown