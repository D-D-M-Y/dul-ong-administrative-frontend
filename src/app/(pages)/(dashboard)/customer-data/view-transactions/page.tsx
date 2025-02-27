import Link from 'next/link';
import TransactionGrid from '@/app/components/Griddata/TransactionGrid';
import Paginator from '@/app/ui/tables/paginator';

export default async function Page(props:{
  searchParams?: Promise<{
    page?: string;
  }>
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const fetchEntities = async (): Promise<{entities: TransactionEntity[], totalPages: number}> => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/view?page=${currentPage}&limit=10`);
      if (!response.ok) {
        throw new Error(`Failed to fetch entities: ${response.statusText}`);
      }
      const data = await response.json();
      return {entities: data.results, totalPages: data.total_pages};
    } catch (error) {
      throw new Error(`Error fetching entities`);
    } finally {
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
        <div className="flex items-baseline">
          <div className="customborder-link">
            <Link href="/customer-data">
              <h2>Manage Customers</h2>
            </Link>          </div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages">
              <h2>Manage Packages</h2>
            </Link>
          </div>
          <div className="customborder-active">
            <h2>View Transactions</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/new-package">
              <h2>New Package</h2>
            </Link>
          </div>
        </div>


        {/* Body */}
        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          {/* <SearchBar query={searchQuery} setQuery={setSearchQuery} /> */}
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <TransactionGrid entities={entities}/>
          </div>
        </div>
      </div>
      <Paginator totalPages={totalPages} currentPage={currentPage}/>
    </div>
  );
}
