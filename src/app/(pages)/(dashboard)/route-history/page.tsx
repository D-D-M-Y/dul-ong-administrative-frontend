import React, { useEffect, useState } from 'react';
import { Loader  } from '@/app/components/Loading';
import RouteGrid from '@/app/components/Griddata/RouteGrid';
import Paginator from '@/app/ui/tables/paginator';

export default async function Page(props:{
  searchParams?: Promise<{
    page?: string;
  }>
}) {

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const fetchEntities = async (): Promise<{entities: RouteEntity[], totalPages: number}> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/route_history`);
      if (!response.ok) {
        throw new Error(`Failed to fetch entities: ${response.statusText}`);
      }
      const data = await response.json();
      
      return {entities: data.results, totalPages: data.total_pages}
    } catch (error) {
      throw new Error(`Error fetching entitites`)
    }
  };
  
  const {entities, totalPages} = await fetchEntities();
  return (
    <div>
      {/* Header */}
      <div>
        <h1 className='font-bold'>
          Customer Data
        </h1>

        {/* Folder */}
        <div className="customborder-active font-source_sans_pro">
          <h2>Manage Routes</h2>
        </div>


        {/* Body */}
        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          {/* <SearchBar query={searchQuery} setQuery={setSearchQuery} /> */}
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <RouteGrid entities={entities}/>
          </div>
        </div>
      </div>
      <Paginator totalPages={totalPages} currentPage={currentPage}/>
    </div>
  );
}
