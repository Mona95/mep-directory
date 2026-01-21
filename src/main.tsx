import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.js';
import { IranCampaignPage } from './pages/IranCampaignPage.js';
import { CampaignPage } from './pages/CampaignPage.js';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/iran',
        element: <IranCampaignPage />,
    },
    {
        path: '/rojava',
        element: (
            <CampaignPage
                campaignId="rojava"
                title="Rojava / Kurdistan Campaign"
                description="Stand with the Kurdish people in Syria facing attacks. Urge EU Parliament members to take action."
            />
        ),
    },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
