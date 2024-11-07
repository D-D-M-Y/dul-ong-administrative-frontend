"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import {
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';
import Button from '@mui/material/Button';

interface Entity {
  pk: number;
  fname: string;
  mname: string;
  lname: string;
  name: string;
  email: string;
  username: string;
  date_registered: string;
  last_login: string;
}

function generateName(entity: Entity): string {
  return entity.fname + ' ' + entity.mname + ' ' + entity.lname;
}

const entities: Entity[] = [];

async function fetchEntities() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/foo`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entities: ${response.statusText}`);
    }
    const data = await response.json();
    data.forEach((entity: Entity) => {
      entity.name = generateName(entity);
    });
    entities.push(...data);
  } catch (error) {
    console.error('Error fetching entities:', error);
  }
}

fetchEntities().then(() => {
  console.log(entities);
});

const fields = [
  { label: "First Name", name: "fname", type: "text" },
  { label: "Middle Name", name: "mname", type: "text" },
  { label: "Last Name", name: "lname", type: "text" },
  { label: "Email", name: "email", type: "text" },
  { label: "Username", name: "username", type: "text" },
  { label: "Date Registered", name: "date_registered", type: "text" },
  { label: "Last Login", name: "last_login", type: "text" },
];

const MyGrid = ({ entities, searchQuery }: { entities: Entity[], searchQuery: string }) => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleModalToggle = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const openModal = (entity: Entity, type: "edit" | "delete") => {
    setSelectedEntity(entity);
    setModalType(type); // Set the modal type
    setIsModalOpen(true);
  };
  const headers = [
    { name: 'ID' },
    { name: 'Name' },
    { name: 'Email' },
    { name: 'Username' },
    { name: 'Date Added' },
    { name: 'Last Login' },
    { name: 'Actions' },
  ];

  return (
    <>
      <table>
        <thead className='font-source_sans_pro'>
          <tr>
            {headers.map((header) => (
              <th className="p-4" key={header.name}>
                {header.name}
                {header.name !== 'Actions' && (
                  <button className='ml-1'> <CiCircleChevDown /></button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='font-ptsans'>
          {filteredEntities.map((entity) => (
            <tr key={entity.email}>
              <td className='p-4'>{entity.pk}</td>
              <td className='p-4'>{entity.name}</td>
              <td className='p-4'>{entity.email}</td>
              <td className='p-4'>{entity.username}</td>
              <td className='p-4'>{entity.date_registered}</td>
              <td className='p-4'>{entity.last_login}</td>
              <td><Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit")}><div className="button-content">
                <CiEdit size={24} />
              </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete")}><div className="button-content">
                  <CiTrash size={24} />
                </div></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedEntity && (
        <Modal
          onToggle={handleModalToggle}
          selectedEntity={selectedEntity}
          modalType={modalType}
          fields={fields}
        />
      )}
    </>
  );
};

export default function Page() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/foo');
        if (!response.ok) {
          throw new Error(`Failed to fetch entities: ${response.statusText}`);
        }
        const data = await response.json();

        // Map through the data to add the 'name' property
        const updatedData = data.map((entity: Entity) => ({
          ...entity,
          name: generateName(entity),
        }));

        setEntities(updatedData); // Update entities with names included
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntities();
  }, []);

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className='font-bold font-roboto'>
          Company Settings
        </h1>

        {/* Folder */}
        <div className="flex items-baseline font-source_sans_pro">
          <div className="customborder-link">
            <Link href="/company-settings">
              <h2>Manage Admins</h2>
            </Link>
          </div>
          <div className="customborder-active">
            <h2>Manage FOOs</h2>
          </div>
          <div className="customborder-link">
            <Link href="/company-settings/add-vehicle">
              <h2>Add Vehicle</h2>
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <MyGrid entities={entities} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}

