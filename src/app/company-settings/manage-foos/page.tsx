import React from 'react'; 
import Link from 'next/link';

interface Entity {
  name: string;
  email: string;
  username: string;
  dateAdded: Date;
  lastLogin: Date;
  editIcon: string;
  deleteIcon: string;
}

const entities: Entity[] = [
  // Populate entity data here
{ name: "Agustine Exmundo", 
  email: "agustine.exmundo@lsprovider.com.ph", 
  username: "aexmundo", 
  dateAdded: new Date(), 
  lastLogin: new Date(), 
  editIcon: "/icons/edit.svg", 
  deleteIcon: "/icons/trash.svg"},
{ name: "Adam Chan", 
  email: "adam.chan@lsprovider.com.ph", 
  username: "achan", 
  dateAdded: new Date(), 
  lastLogin: new Date(), 
  editIcon: "/icons/edit.svg", 
  deleteIcon: "/icons/trash.svg"}  
  // ... more entities
];

const MyGrid = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Date Added</th>
          <th>Last Login</th>
          <th>Edit</th>
          <th>Delete</th>
          {/* Add table headers if needed */}
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => (
          <tr key={entity.email}>
            <td>{entity.name}</td>
            <td>{entity.email}</td>
            <td>{entity.username}</td>
            <td>{entity.dateAdded.toLocaleDateString()}</td>
            <td>{entity.lastLogin.toLocaleDateString()}</td>
            <td className="icon-cell">
              {entity.editIcon && (
                <img src={entity.editIcon} alt="Edit" width="20" height="20" />
              )}
            </td>
            <td  >
              {entity.deleteIcon && (
                <img src={entity.deleteIcon} alt="Delete" width="20" height="20" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Page() {
  return (
    <div>
      {/* Header */}
      <div>
        <h1 className='font-bold'>
          Company Settings
        </h1>

        {/* Folder */}
        <div className="flex items-baseline"> 
          <div className="customborder-link">
            <Link href="/company-settings">
              <h2>Manage Admins</h2>
            </Link>
          </div>
          <div className="customborder-active">
              <h2>Manage FOOs</h2>
          </div>
        </div>

        {/* Body */}
        <div className="customborder-body">
          <div className="p-5"> 
          <div className="grid table">
            <MyGrid />
            </div>
            </div>
          </div>
        </div>
      </div>
  );
}
