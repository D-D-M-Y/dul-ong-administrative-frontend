import NavLinks from '@/app/ui/dashboard/nav-links';
import '@/app/ui/global.css'
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white rounded-md">
      <div className="flex items-end rounded-md bg-white-600 p-4 items-center">
      <img src='/dulong.svg' className="h-full w-full" />   
      </div>
      <div className="flex font-roboto justify-center mb-5">  
      <img src="/filler-image.jpg" alt="Filler Image" className="mr-2 h-8 w-8 rounded-md "/>
        <span style={{ fontWeight: 'bold', fontSize: '24px' }}> 
          Allana, D.
        </span>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}