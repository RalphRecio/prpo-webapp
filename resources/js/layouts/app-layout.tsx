import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { PermissionProvider } from '../../context/PermissionContext';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <PermissionProvider>
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className="h-full bg-blue-50">
                <div className="flex h-screen flex-col"> {children}</div>
            </div>
        </AppLayoutTemplate>
    </PermissionProvider>
);
