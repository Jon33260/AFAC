// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

// Import pages
import ArtworkPage from "./pages/ArtworkPage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

/* ************************************************************************* */
import {
  getAllArtwork,
  getArtworkById,
  getCategory,
  getUserById,
} from "./services/requests";

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const [artworks, category] = await Promise.all([
            getAllArtwork(),
            getCategory(),
          ]);
          return { artworks, category };
        },
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        loader: ({ params }) => getUserById(Number(params.id)),
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth",
        element: <Signup />,
      },
      {
        path: "/artwork/:id",
        element: <ArtworkPage />,
        loader: ({ params }) => getArtworkById(Number(params.id)),
        errorElement: <ErrorPage />,
      },
    ],
  },

  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
