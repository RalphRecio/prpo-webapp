import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [collapsedItems, setCollapsedItems] = useState<{ [key: string]: boolean }>({});

    const toggleCollapse = (title: string) => {
        setCollapsedItems((prevState) => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-gray-900">Menu</SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {item.subItems && item.subItems.length > 0 ? (
                            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                                <div
                                    className="flex w-full items-center justify-between text-gray-900"
                                    onClick={() => toggleCollapse(item.title)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="flex items-center">
                                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                        <span>{item.title}</span>
                                    </div>
                                    <span>
                                        {collapsedItems[item.title] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                    </span>
                                </div>
                            </SidebarMenuButton>
                        ) : (
                            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                                <Link href={item.href} prefetch className="flex w-full items-center">
                                    {item.icon && <item.icon className="h-4 w-4" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                        {item.subItems && item.subItems.length > 0 && collapsedItems[item.title] && (
                            <SidebarMenu className="text-gray-800">
                                {item.subItems.map((subItem) => (
                                    <SidebarMenuItem key={subItem.title}>
                                        <SidebarMenuButton asChild isActive={subItem.href === page.url} tooltip={{ children: subItem.title }}>
                                            <Link href={subItem.href} prefetch>
                                                {subItem.icon && <subItem.icon />}
                                                <span>{subItem.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
