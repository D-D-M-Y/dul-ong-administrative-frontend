'use client';

import {
  CiCircleChevUp,
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";

import React, { useState } from 'react';

import Modal from '@/app/components/Modal/ActionModal.js';

import Button from '@mui/material/Button';

const PackageGrid = ({ entities, fields }: { entities: PackageEntity[], fields:any }) => {
  const [selectedEntity, setSelectedEntity] = useState<PackageEntity | null>(null);
  const [endpoint, setEndpoint] = useState<"packages/edit" | "packages/delete" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  type SortBy = keyof PackageEntity | 'transactionid.payment_method' | 'transactionid.status';
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  
  const sortedEntities = entities.sort((a, b) => {
    if (!sortBy) return 0;
  
    let aValue, bValue;
  
    if (sortBy === 'transactionid.payment_method') {
      aValue = a.transactionid.payment_method;
      bValue = b.transactionid.payment_method;
    } else if (sortBy === 'transactionid.status') {
      aValue = a.transactionid.status;
      bValue = b.transactionid.status;
    } else {
      aValue = a[sortBy];
      bValue = b[sortBy];
    }
  
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  

  const handleModalToggle = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const openModal = (entity: PackageEntity, type: "edit" | "delete", endpoint: "packages/edit" | "packages/delete") => {
    setSelectedEntity(entity);
    setEndpoint(endpoint);
    setModalType(type); // Set the modal type
    setIsModalOpen(true);
  };

  const headers = [
    { name: 'Package ID', key: 'pk' as keyof PackageEntity },
    { name: 'Name', key: 'name' as keyof PackageEntity },
    { name: 'Size', key: 'size' as keyof PackageEntity },
    { name: 'Costs', key: 'cost' as keyof PackageEntity },
    { name: 'Amount', key: 'amount' as keyof PackageEntity },
    { name: 'Payment Method', key: 'transactionid.payment_method' as keyof PackageEntity },
    { name: 'Status', key: 'transactionid.status' as keyof PackageEntity },
    { name: 'Actions', key: null },
  ];


  return (
    <>
      <table>
        <thead className="font-source_sans_pro">
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
        <tbody className="font-ptsans" >
          {sortedEntities.map((entity) => (
            <tr key={entity.pk}>
              <td className='p-4'>{entity.pk}</td>
              <td className='p-4'>{entity.name}</td>
              <td className='p-4'>{entity.size}</td>
              <td className='p-4'>{entity.cost}</td>
              <td className='p-4'>{entity.amount}</td>
              <td className='p-4'>{entity.transactionid.payment_method}</td>
              <td className='p-4'>{entity.transactionid.status}</td>
              <td> <Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit", "packages/edit")}><div className="button-content">
                <CiEdit size={24} />
              </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete", "packages/delete")}><div className="button-content">
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

export default PackageGrid;