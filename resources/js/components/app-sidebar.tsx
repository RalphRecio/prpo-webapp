import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { FcFolder } from 'react-icons/fc';

import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Purchase Requisition',
        href: '/prpo/purchase-request',
        icon: FcFolder,

        subItems: [],
    },
    {
        title: 'For Approval',
        href: '/',
        icon: FcFolder,

        subItems: [
            {
                title: 'Purchase Requisition',
                href: '/prpo/pending_approval',
            },
            {
                title: 'Purchase Order',
                href: '/prpo/purchase-order/pending-approval',
            },
        ],
    },
    {
        title: 'All Purchase Requisitions',
        href: '/prpo/purchase-request/all',
        icon: FcFolder,
        permissions: ['view_all_pr'],
    },
    {
        title: 'All Purchase Order',
        href: '/prpo/purchase-order/all',
        icon: FcFolder,
        permissions: ['view_all_po'],
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

    const filteredNavItems = filterNavItemsByPermissions(mainNavItems, userPermissions);

    function filterNavItemsByPermissions(items: NavItem[], userPermissions: string[]): NavItem[] {
        return items
            .filter((item) => !item.permissions || item.permissions.some((p) => userPermissions.includes(p)))
            .map((item) => ({
                ...item,
                subItems: item.subItems
                    ? item.subItems.filter((sub) => !sub.permissions || sub.permissions.some((p) => userPermissions.includes(p)))
                    : [],
            }));
    }

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
