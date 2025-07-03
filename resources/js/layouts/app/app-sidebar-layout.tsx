import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { usePermissions } from '../../../context/PermissionContext';

import { GlobalLoadingOverlay } from '@/components/Loading-overlay';
import { LoadingProvider } from '../../../context/LoadingContext';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar userPermissions={usePermissions()} />
            <AppContent variant="sidebar" className="h-full w-full overflow-y-auto bg-gray-100">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <LoadingProvider>
                    <GlobalLoadingOverlay />
                    {children}
                </LoadingProvider>
            </AppContent>
        </AppShell>
    );
}
