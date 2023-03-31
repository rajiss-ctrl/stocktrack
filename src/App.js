import {Routes,Route, useNavigate} from 'react-router-dom'
import Layout from './outlet/Layout';
import Home from './pages/Home';
import UpdateStock from './pages/UpdateStock';
import Stock from './pages/Stock';
import { useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './db/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './features/product/productSlice';
import Dashboard from './pages/Dashboard';
import BusinessProfile from './pages/BusinessProfile';
import ProtectedRoute from './protected-route/ProtectedRoute';
import Error from './protected-route/Error';
import { fetchBuzData } from './features/businessprofile/businessSlice';
import Editbuz from './pages/pages-components/Editbuz';


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)

// stock Data
useEffect(() => {
    if (!user.id) return navigate('/');

    try {
      const qRef= collection(db, 'stock')
      const q = query(qRef,where('user_id', '==', user.id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const stock = [];
        querySnapshot.forEach((doc) => {
            stock.push({...doc.data(), id:doc.id});
        });
        if (stock.length > 0 ) {
          console.log(stock)
          dispatch(fetchData(stock))
        }
      });
      return () => unsubscribe();
    }
    catch (error) {
      console.log(error);
    }
  }, [navigate, user.id]);

  // business profile data
  useEffect(() => {
    if (!user.id) return navigate('/');

    try {
      const qRef= collection(db, 'businesses')
      const q = query(qRef,where('user_id', '==', user.id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const buz = [];
        querySnapshot.forEach((doc) => {
            buz.push({...doc.data(), id:doc.id});
        });
        if (buz.length > 0 ) {
          dispatch(fetchBuzData(buz))
        }
      });
      return () => unsubscribe();
    }
    catch (error) {
      console.log(error);
    }
  }, [ user.id]);


  return (
    <div className=" h-[100%]">
       <Routes>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path={'updatestock'} element={<UpdateStock/>}/>
            <Route path={'stock'} element={<Stock/>}/>
          <Route path={'dashboard'} element={<Dashboard/>}>
              <Route path={'businessprofile'} element={<BusinessProfile/>}/>
          </Route>
        </Route>
                  {/*All*/}
        <Route path={'*'} element={<Error/>}/>
        </Route>
      </Routes>

</div>
  );
}

export default App;
