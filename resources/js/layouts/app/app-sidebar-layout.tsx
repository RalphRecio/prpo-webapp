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
    // const [userPermissions, setUserPermissions] = useState<string>('');

    // useEffect(() => {
    //     const fetchPermissions = async () => {
    //         const response = await axios.get('/user/permissions');

    //         setUserPermissions(response.data);
    //     };

    //     fetchPermissions();
    // }, []);

    return (
        <AppShell variant="sidebar">
            <AppSidebar userPermissions={usePermissions()} />
            <AppContent variant="sidebar" className="h-full w-full overflow-y-auto bg-blue-50">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <LoadingProvider>
                    <GlobalLoadingOverlay />
                    {children}
                </LoadingProvider>
            </AppContent>
        </AppShell>
    );
}
