import { createBrowserRouter } from "react-router-dom";
import Shop from "./Shop";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import ProductListPage from "./pages/ProductListPage/ProductListPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <ShopApplicationWrapper />,
      children:[
        {
            path:"/",
            element:<Shop />
        },
        {
            path:"/women",
            element:<ProductListPage categoryType={'WOMEN'}/>,
        },
        {
          path:"/men",
          element:<ProductListPage categoryType={'MEN'}/>,
      }
      ]
    }
  ]);