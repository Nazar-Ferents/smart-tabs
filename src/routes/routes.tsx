import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import TabPage from "../pages/TabPage.tsx";



export const routes = createBrowserRouter([

    {path:'/',element:<MainLayout/>,
    children:[
        {path:'dashboard',element:<TabPage/>},
        {path:'banking',element:<TabPage/>},
        {path:'telefonie',element:<TabPage/>},
        {path:'accounting',element:<TabPage/>},
        {path:'verkauf',element:<TabPage/>},
        {path:'statistik',element:<TabPage/>},
        {path:'post-office',element:<TabPage/>},
        {path:'administration',element:<TabPage/>},
        {path:'help',element:<TabPage/>},
        {path:'warenbestand',element:<TabPage/>},
        {path:'auswahllisten',element:<TabPage/>},
        {path:'einkauf',element:<TabPage/>},
        {path:'rechn',element:<TabPage/>},


    ]
    }
])