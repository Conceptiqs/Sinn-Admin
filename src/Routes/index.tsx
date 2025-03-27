// import Cookies from "js-cookie";
// import { createBrowserRouter, Navigate } from "react-router-dom";
// import {
// //   Builder,
// //   Clients,
//   Dashboard,
// //   Leads,
//   Login,
// //   MyProfile,
// //   NotFound,
// //   Notifications,
// //   Projects,
// //   ProjectsDetails,
// //   Users,
// //   Content,
// //   Integration,
// } from "../Pages/Exports";
// import Layout from "../components/Layout";

// // Check if user is authenticated
// const isAuthenticated = () => {
//   const accessToken = Cookies.get("access_token");
//   return accessToken ? true : false;
// };

// // Check if the user is an admin
// const isAdmin = () => {
//   return Cookies.get("user_type") === "admin";
// };

// // Protected Route Component to manage authentication and role-based access
// // const ProtectedRoute = ({ component, componentType }: any) => {
// //   const isAuth = isAuthenticated();
// //   const userIsAdmin = isAdmin();

// //   if (isAuth) {
// //     if (componentType === "login") {
// //       return <Navigate to="/dashboard" replace />;
// //     }

// //     if (userIsAdmin) {
// //       // Admin can access all routes
// //       return component;
// //     }

// //     // Non-admin users are redirected to the login page
// //     return <Navigate to="/login" replace />;
// //   } else {
// //     // User is not authenticated
// //     Cookies.remove("access_token");
// //     localStorage.clear();
// //     if (componentType === "login") {
// //       return component;
// //     } else {
// //       return <Navigate to="/login" replace />;
// //     }
// //   }
// // };

// // Define routes for the app
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Navigate to="/login" replace />,
//     // errorElement: <NotFound />, // Custom 404 page
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     element: <Layout children={undefined} />,
//     children: [
//       {
//         path: "/dashboard",
//         // Directly render the Dashboard component without ProtectedRoute
//         element: <Dashboard />,
//       },
//     //   {
//     //     path: "/clients",
//     //     element: <ProtectedRoute componentType={"clients"} component={<Clients />} />,
//     //   },
//     //   {
//     //     path: "/clients/:type",
//     //     element: <ProtectedRoute componentType={"clients"} component={<Clients />} />,
//     //   },
//     //   {
//     //     path: "/leads",
//     //     element: <ProtectedRoute componentType={"leads"} component={<Leads />} />,
//     //   },
//     //   {
//     //     path: "/builders",
//     //     element: <ProtectedRoute componentType={"builders"} component={<Builder />} />,
//     //   },
//     //   {
//     //     path: "/projects",
//     //     element: <ProtectedRoute componentType={"projects"} component={<Projects />} />,
//     //   },
//     //   {
//     //     path: "/projects/:id",
//     //     element: <ProtectedRoute componentType={"projects_details"} component={<ProjectsDetails />} />,
//     //   },
//     //   {
//     //     path: "/profile",
//     //     element: <ProtectedRoute componentType={"profile"} component={<MyProfile />} />,
//     //   },
//     //   {
//     //     path: "/notifications",
//     //     element: <ProtectedRoute componentType={"admin_notifications"} component={<Notifications />} />,
//     //   },
//     //   // Admin-Only Routes
//     //   {
//     //     path: "/users",
//     //     element: <ProtectedRoute componentType={"admin_users"} component={<Users />} />,
//     //   },
//     //   {
//     //     path: "/content",
//     //     element: <ProtectedRoute componentType={"content"} component={<Content />} />,
//     //   },
//     //   {
//     //     path: "/content/:type",
//     //     element: <ProtectedRoute componentType={"content"} component={<Content />} />,
//     //   },
//     //   {
//     //     path: "/integrations",
//     //     element: <ProtectedRoute componentType={"integration"} component={<Integration />} />,
//     //   },
//     ],
//   },
//   {
//     path: "*",
//     // element: <NotFound />, // Catch-all for undefined routes
//   },
// ]);

// export default router;





import Cookies from "js-cookie";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import {
  Dashboard,
  Login,
  Doctors,
  Customers,
  Approvals,
  Services,
  Renewals,
  Cms,
  UserManagement,
  RoleManagement,
  Notifications,
  DoctorDetails,
  // MyProfile,
  // NotFound,
  // Notifications,
  // Projects,
  // ProjectsDetails,
  // Users,
  // Content,
  // Integration,
} from "../Pages/Exports";
import Layout from "../components/Layout";

// Check if user is authenticated
const isAuthenticated = () => {
  const accessToken = Cookies.get("access_token");
  return accessToken ? true : false;
};

// Check if the user is an admin
const isAdmin = () => {
  return Cookies.get("user_type") === "admin";
};

// Protected Route Component to manage authentication and role-based access
const ProtectedRoute = ({ component }: any) => {
  const isAuth = isAuthenticated();
  const userIsAdmin = isAdmin();

  if (isAuth && userIsAdmin) {
    return component;  // Render the component if authenticated and admin
  } else if (isAuth) {
    return <Navigate to="/dashboard" replace />; // Redirect non-admin to dashboard
  } else {
    Cookies.remove("access_token");
    localStorage.clear();
    return <Navigate to="/login" replace />; // Redirect unauthenticated users to login
  }
};

// Define routes for the app
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <Layout />, // Apply Layout for all nested routes
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/doctors",
        element: <Doctors />, // Replace with the actual Doctors component
      },
      {
        path: "/doctor/:id",
        element: <DoctorDetails />, // Added DoctorDetails inside the /doctors route
      },
      {
        path: "/customers",
        element: <Customers />, // Replace with the actual Customers component
      },
      {
        path: "/approvals",
        element: <Approvals />, // Replace with the actual Approvals component
      },
      {
        path: "/services",
        element: <Services />, // Replace with the actual Services component
      },
      {
        path: "/renewals",
        element: <Renewals />, // Replace with the actual Renewals component
      },
      {
        path: "/cms",
        element: <Cms />, // Replace with the actual CMS component
      },
      {
        path: "/roles/user-management",
        element: <UserManagement />, // User Management Page
      },
      {
        path: "/roles/role-management",
        element: <RoleManagement />, // Role Management Page
      },
      {
        path: "/notification",
        element: <Notifications />, // Replace with the actual Notification component
      },
    ],
  },  
  {
    path: "*",
    // element: <NotFound />,  // Custom 404 page
  },
]);

export default router;
