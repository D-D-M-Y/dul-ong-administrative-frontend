import Link from 'next/link';

import SearchBar from '@/app/ui/tables/searchbar';
import CustomerGrid from '@/app/components/Griddata/CustomerGrid';
import Paginator from '@/app/ui/tables/paginator';

export default async function Page(props:{
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {
  // const [entities, setEntities] = useState<CustomerEntity[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  // const [loading, setLoading] = useState(true);

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;


  const fetchEntities = async (): Promise<{entities: CustomerEntity[], totalPages: number}> => {
    try {
      const endpoint = query
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/customer_data/search/${query}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/customer_data?page=${currentPage}&limit=10`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch entities: ${response.statusText}`);
      }

      const data = await response.json();

      return {entities: data.results, totalPages: data.total_pages}
    } catch (error) {
      throw new Error(`Error fetching entities`);
    } 
  };

    const {entities, totalPages} = await fetchEntities();

  return (
    <>
      <div>
        <h1 className='font-roboto font-bold'>Customer Data</h1>

        <div className="flex items-baseline">
          <div className="customborder-active"><h2>Manage Customers</h2></div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages"><h2>Manage Packages</h2></Link>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/view-transactions"><h2>View Transactions</h2></Link>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/new-package"><h2>New Package</h2></Link>
          </div>
        </div>

        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          <SearchBar />
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <CustomerGrid entities={entities} />
          </div>
        </div>

        <Paginator totalPages={totalPages} currentPage={currentPage}/>
      </div>
    </>
  );
}
