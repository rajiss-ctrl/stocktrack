import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { fetchData } from "./features/product/productSlice";
import { fetchBuzData } from "./features/businessprofile/businessSlice";
import Error from "./protected-route/Error";
import db, { useAuth } from "./db/firebase";

const Layout = lazy(() => import("./outlet/Layout"));
const Home = lazy(() => import("./pages/Home"));
const UpdateStock = lazy(() => import("./pages/UpdateStock"));
const Stock = lazy(() => import("./pages/Stock"));
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
      fallback={<h1 className="text-center mt-12 text-xl">Loading...</h1>}
    >
      <div className="font-[Kumbh Sans]">
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={"reset"} element={<Reset />} />
            <Route element={<ProtectedRoute />}>
              <Route path={"updatestock"} element={<UpdateStock />} />
              <Route path={"stock"} element={<Stock />} />
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
