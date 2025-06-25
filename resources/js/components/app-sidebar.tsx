import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder } from 'lucide-react';
import { useState } from 'react';

import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'PRPO',
        href: '/',
        icon: Folder,
        permissions: ['view_prpo'],
        subItems: [
            {
                title: 'My Purchase Request',
                href: '/prpo/purchase-request',
                permissions: ['view_my_pr'],
            },
            {
                title: 'Pending for Approval',
                href: '/prpo/pending_approval',
                permissions: ['view_pending_approval'],
            },
            {
                title: 'All Purchase Requests',
                href: '/prpo/purchase-request/all',
                permissions: ['view_all_pr'],
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'WMS 1.0.0',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar({ userPermissions }: { userPermissions: string[] }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const hasPermission = (requiredPermissions?: string[]) => {
        if (!requiredPermissions) return true;
        return requiredPermissions.some((permission) => userPermissions.includes(permission));
    };

    const exemptedMenus = ['Pending for Approval', 'My Purchase Request'];

    const filteredNavItems = mainNavItems
        .map((item: any) => {
            const filteredSubItems = item.subItems?.filter(
                (subItem: any) => exemptedMenus.includes(subItem.title) || hasPermission(subItem.permissions),
            );

            if (filteredSubItems?.length || hasPermission(item.permissions)) {
                return { ...item, subItems: filteredSubItems };
            }

            return null;
        })
        .filter(Boolean);

    return (
        <Sidebar collapsible="icon" variant="inset" className={` ${isCollapsed ? 'collapsed' : ''}`}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} /> {/* Pass filtered items */}
            </SidebarContent>

            {/* <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter> */}
        </Sidebar>
    );
}
