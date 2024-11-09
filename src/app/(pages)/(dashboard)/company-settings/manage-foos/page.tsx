"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import {
  CiCircleChevUp,
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';
import Button from '@mui/material/Button';
import { Loader } from "@/app/components/Maps/MapComponent"

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


const fields = [
  { label: "First Name", name: "fname", type: "text" },
  { label: "Middle Name", name: "mname", type: "text" },
  { label: "Last Name", name: "lname", type: "text" },
  { label: "Email", name: "email", type: "text" },
  { label: "Username", name: "username", type: "text" },
  { label: "Date Registered", name: "date_registered", type: "text" },
];

const MyGrid = ({ entities, searchQuery }: { entities: Entity[], searchQuery: string }) => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [endpoint, setEndpoint] = useState<"users/edit" | "users/delete" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [sortBy, setSortBy] = useState<keyof Entity | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedEntities = entities.sort((a, b) => {
      if (!sortBy) return 0;
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (column: keyof Entity) => {
    if (sortBy === column) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleModalToggle = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const openModal = (entity: Entity, type: "edit" | "delete", endpoint: "users/edit" | "users/delete") => {
    setSelectedEntity(entity);
    setEndpoint(endpoint);
    setModalType(type); // Set the modal type
    setIsModalOpen(true);
  };

  const headers = [
    { name: 'ID', key: 'pk' as keyof Entity },
    { name: 'Name', key: 'lname' as keyof Entity },
    { name: 'Email', key: 'email' as keyof Entity },
    { name: 'Username', key: 'username' as keyof Entity },
    { name: 'Date Added', key: 'date_registered' as keyof Entity },
    { name: 'Last Login', key: null },
    { name: 'Actions', key: null },
  ];

  return (
    <>
      <table>
        <thead className='font-source_sans_pro'>
          <tr>
            {headers.map((header) => (
              <th className="p-4" key={header.name}>
                {header.name}
                {header.key && (
                  <button className='ml-1' onClick={() => handleSort(header.key!)}>
                    {sortBy === header.key ? (
                      sortOrder === 'asc' ? <CiCircleChevDown /> : <CiCircleChevUp />
                    ) : (
                      <CiCircleChevDown />
                    )}
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='font-ptsans'>
          {sortedEntities.map((entity) => (
            <tr key={entity.email}>
              <td className='p-4'>{entity.pk}</td>
              <td className='p-4'>{entity.name}</td>
              <td className='p-4'>{entity.email}</td>
              <td className='p-4'>{entity.username}</td>
              <td className='p-4'>{entity.date_registered}</td>
              <td className='p-4'>{entity.last_login}</td>
              <td><Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit", "users/edit")}><div className="button-content">
                <CiEdit size={24} />
              </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete", "users/delete")}><div className="button-content">
                  <CiTrash size={24} />
                </div></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedEntity && (
        <Modal
          onToggle={handleModalToggle}
          endpoint={endpoint}
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/foo/${searchQuery}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/users/foo?page=${page}&limit=10`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch entities: ${response.statusText}`);
        }
        const data = await response.json();

        // Check if 'results' exists and is an array
        if (data.results && Array.isArray(data.results)) {
          // Map through the data to add the 'name' property
          const updatedData = data.results.map((entity: Entity) => ({
            ...entity,
            name: generateName(entity),
          }));

          setEntities(updatedData);
          setTotalPages(data.total_pages);
        } else {
          console.error('Expected an array in data.results');
          setEntities([]); // Clear entities if data structure is unexpected
        }
      } catch (error) {
        console.error('Error fetching entities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, [page, searchQuery]);

  return (
    <>
      {loading && <Loader />}
      
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
          <SearchBar setSearchQuery={setSearchQuery} />
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <MyGrid entities={entities} searchQuery={searchQuery} />
          </div>
        </div>

        <div className="pagination flex justify-between mt-4">
          {page > 1 && (
            <button
              className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white"
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>
          )}
          <span>Page {page}</span>
          {page < totalPages && (
            <button
              className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white"
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}

