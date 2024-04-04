import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { fetchData } from "./features/product/productSlice";
import { fetchBuzData } from "./features/businessprofile/businessSlice";
import Error from "./protected-route/Error";
import db, { useAuth } from "./db/firebase";


import Index from "./pages/signin-signup/Index";
import Loading from './assets/img/loading-state.svg'
import InventoryTable from "./pages/InventoryTable";
const Layout = lazy(() => import("./outlet/Layout"));
const Home = lazy(() => import("./pages/Home"));
const UpdateStock = lazy(() => import("./pages/UpdateStock"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BusinessProfile = lazy(() => import("./pages/BusinessProfile"));
const ProtectedRoute = lazy(() => import("./protected-route/ProtectedRoute"));
const Reset = lazy(() => import("./pages/pages-components/Reset"));

function App() {
  const dispatch = useDispatch();

  const currentUser = useAuth();

  // stock Data
  useEffect(() => {
    // if (!user.id) return navigate("/");

    try {
      const qRef = collection(db, "stock");
      const q = query(qRef, where("user_id", "==", currentUser?.uid));
      // console.log(q);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const stock = [];
        querySnapshot.forEach((doc) => {
          stock.push({ ...doc.data(), id: doc.id });
        });
        if (stock.length > 0) {
          // console.log(stock);

          dispatch(fetchData(stock));
        }
      });
      return () => unsubscribe();
    } catch (error) {
      // alert(error);
    }
  }, [currentUser?.uid]);

  // business profile data
  useEffect(() => {
    // if (!user.id) return navigate("/");

    try {
      const qRef = collection(db, "businesses");
      const q = query(qRef, where("user_id", "==", currentUser?.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const buz = [];
        querySnapshot.forEach((doc) => {
          buz.push({ ...doc.data(), id: doc.id });
        });
        if (buz.length > 0) {
          dispatch(fetchBuzData(buz));
        }
      });
      return () => unsubscribe();
    } catch (error) {
      // alert(error);
    }
  }, [currentUser?.uid]);

  return (
    <Suspense
      fallback={
      <div className="h-screen flex justify-center items-center">
        <img className="w-20" src={Loading} alt="stocktrack loading" />
      </div>}
    >
      <div className="font-[Kumbh Sans] tracking-tight md:tracking-wide lg:tracking-widest">
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={'index'} element={<Index />} />
            <Route path={"reset"} element={<Reset />} />
            <Route element={<ProtectedRoute />}>
              <Route path={"updatestock"} element={<UpdateStock />} />
            <Route path={'inventorytable'} element={<InventoryTable />} />
            <Route path={'businessprofile'} element={<BusinessProfile />} />
              <Route path={"dashboard"} element={<Dashboard />}>
                <Route path={"businessprofile"} element={<BusinessProfile />} />
              </Route>
            </Route>
            {/*All*/}
            <Route path={"*"} element={<Error />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
