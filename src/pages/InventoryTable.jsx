
import { useEffect } from 'react';
import CardPageVisits from '../components/Cards/CardPageVisits'


const InventoryTable = () => {
  useEffect(() => {
    document.title = "Stock Table"; // Set your desired page title here
  }, []); // This effect runs only once after the component mounts
  
  return (
    <>
    <div className=' py-10 w-full  md:px-5 lg:px-8'>
      <CardPageVisits/>
    </div>
    </>
  )
}

export default InventoryTable
