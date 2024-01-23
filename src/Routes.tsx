import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { WelcomePage } from './pages/Welcome';
import App from './App';
import UsersPage from './pages/Users';
import AboutPage from './pages/About';
import { ErrorPage } from './pages/Error';
import { lazy, Suspense } from 'react';
const AdminPage = lazy(() => import('./pages/Admin'))

const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <WelcomePage />,
            },
            {
                path: 'welcome',
                element: <WelcomePage />,
            },
            {
                path: 'users',
                element: <UsersPage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'admin',
                element: (
                    <Suspense
                        fallback={
                            <p>Loading ...</p>
                        }
                    >
                        <AdminPage />
                    </Suspense>
                )
            },
        ]
    },
]);

export function Routes() {
    return <RouterProvider router={router} />;
}