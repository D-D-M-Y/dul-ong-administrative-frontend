'use client';

import Modal from '@/app/components/Modal/ActionModal.js';
import {
  CiCircleChevUp,
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";

import React, { useState } from 'react';
import Button from '@mui/material/Button';



  const FooFields = [
    { label: "First Name", name: "fname", type: "text" },
    { label: "Middle Name", name: "mname", type: "text" },
    { label: "Last Name", name: "lname", type: "text" },
    { label: "Email", name: "email", type: "text" },
    { label: "Username", name: "username", type: "text" },
    { label: "Date Registered", name: "date_registered", type: "text" },
  ];

const FooGrid = ({ entities}: { entities: FooEntity[]}) => {
    const [selectedEntity, setSelectedEntity] = useState<FooEntity | null>(null);
    const [endpoint, setEndpoint] = useState<"users/edit" | "users/delete" | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
    const [sortBy, setSortBy] = useState<keyof FooEntity | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
    const sortedEntities = entities.sort((a, b) => {
        if (!sortBy) return 0;
        const aValue = a[sortBy];
        const bValue = b[sortBy];
  
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  
    const handleSort = (column: keyof FooEntity) => {
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
  
    const openModal = (entity: FooEntity, type: "edit" | "delete", endpoint: "users/edit" | "users/delete") => {
      setSelectedEntity(entity);
      setEndpoint(endpoint);
      setModalType(type); // Set the modal type
      setIsModalOpen(true);
    };
  
    const headers = [
      { name: 'ID', key: 'pk' as keyof FooEntity },
      { name: 'Name', key: 'lname' as keyof FooEntity },
      { name: 'Email', key: 'email' as keyof FooEntity },
      { name: 'Username', key: 'username' as keyof FooEntity },
      { name: 'Date Added', key: 'date_registered' as keyof FooEntity },
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
            fields={FooFields}
          />
        )}
      </>
    );
  };

export default FooGrid;