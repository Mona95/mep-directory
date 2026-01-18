import type { PoliticalGroup, GroupInfo } from '../types';

// Political group metadata
export const GROUP_INFO: Record<PoliticalGroup, GroupInfo> = {
    'EPP': {
        name: "European People's Party",
        color: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    'S&D': {
        name: 'Socialists & Democrats',
        color: 'bg-red-100 text-red-800 border-red-200',
    },
    'Renew': {
        name: 'Renew Europe',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    'Greens/EFA': {
        name: 'Greens/European Free Alliance',
        color: 'bg-green-100 text-green-800 border-green-200',
    },
    'ECR': {
        name: 'European Conservatives and Reformists',
        color: 'bg-sky-100 text-sky-800 border-sky-200',
    },
    'PfE': {
        name: 'Patriots for Europe',
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    'The Left': {
        name: 'The Left in the European Parliament',
        color: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    'ESN': {
        name: 'Europe of Sovereign Nations',
        color: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    'NI': {
        name: 'Non-Inscrits (Non-attached)',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
    },
};

export const TOTAL_MEP_SEATS = 720;
export const PARLIAMENT_TERM = '10th European Parliament (2024-2029)';