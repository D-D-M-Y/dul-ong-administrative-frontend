import React from 'react'; 

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
  { name: "John Doe", email: "john.doe@example.com", username: "johndoe", dateAdded: new Date(), lastLogin: new Date(), editIcon: "/icons/edit.svg", deleteIcon: "/icons/trash.svg"}
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
            <td className="icon-cell">
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
        <h1 style = {{fontWeight: 'bold'}}>
          Company Settings
        </h1>

        {/* Folder */}
        <div className="customborder-link">
          <h2 className="pl-5 pr-5">Manage Admins</h2>
        </div>

        {/* Body */}
        <div className="customborder-body">
          <div className="grid">
            <MyGrid />
            </div>
          </div>
        </div>
      </div>
  );
}
