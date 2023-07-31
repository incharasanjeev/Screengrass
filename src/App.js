
import './App.css';
import Home from './screens/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './screens/SignUp';
import Login from './screens/Login'
import ItemListing from './screens/ItemListing';
import States from './components/States';
import Update from './screens/Update';



function App() {

  const router = createBrowserRouter([
   {path:"/", element: <Home/>},
   {path:"/SignUp", element: <SignUp />},
   {path:"/Login", element: <Login />},
   {path:"/item", element: <ItemListing />},
   {path:"/updateTask/:id", element:<Update />}
  ])
  

  return (
    <States>
    <div className="App">
       <RouterProvider router={router} />
    </div>
    </States>
  
  );
}

export default App;