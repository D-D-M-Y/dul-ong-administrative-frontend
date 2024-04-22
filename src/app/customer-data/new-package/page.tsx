import React from 'react'; 
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      {/* Header */}
      <div>
        <h1 style = {{fontWeight: 'bold'}}>
          Customer Data
        </h1>

        {/* Folder */}
        <div className="flex items-baseline"> 
          <div className="customborder-link">
            <Link href="/customer-data">
              <h2>Manage Customers</h2>
            </Link>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages">
              <h2>Manage Packages</h2>
            </Link>
          </div>
          <div className="customborder-active">
              <h2>New Package</h2>
          </div>
        </div>
        

        {/* Body */}
        <div className="customborder-body">
          <div className="p-5"> 
            <div className="grid table">
              <div className = "p-5">
                  Insert Form Data
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
