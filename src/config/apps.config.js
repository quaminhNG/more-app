import { lazy } from 'react';

export const appsConfig = [
    {
        id: 'kanban',
        name: 'CRM Master',
        description: 'Quản lý Hệ thống (CRM).',
        color: 'from-blue-600 to-indigo-700',
        path: '/kanban',
        component: lazy(() => import('../apps/kanban-board/App')),
        icon: '📋',
    },
];
