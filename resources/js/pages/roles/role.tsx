import { PaginatedDt } from '@/components/paginated-dt';
import { usePaginationService } from '@/hooks/use-pagination-service';
import AppLayout from '@/layouts/app-layout';
import { ModalRoles } from '@/pages/roles/modals/modal-roles';
import { type BreadcrumbItem, Paginated, Role } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function RoleList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);

    const { roles } = usePage<{ roles: Paginated<Role> }>().props;

    const { fetchData, loading, handlePageChange } = usePaginationService();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            {isModalOpen && selectedTransaction && (
                <ModalRoles role={selectedTransaction} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                <PaginatedDt
                    loading={loading}
                    columnNames={['ID', 'Name', 'Slug', 'Date Created', 'Permission']}
                    items={roles.data.map((role) => ({
                        id: role.id,
                        name: role.name,
                        slug: role.slug,
                        created_at: role.created_at,
                        permissions: role.permissions,
                    }))}
                    hiddenColumns={[4]}
                    data={roles}
                    handlePageChange={handlePageChange}
                    fetchData={fetchData}
                    canAdd={true}
                    canDelete={true}
                    // canEdit={true}
                    inputableCol={[
                        { label: 'Name', name: 'name', type: 'text' },
                        { label: 'Slug', name: 'slug', type: 'text' },
                    ]}
                    actions={[
                        {
                            type: 'button',
                            label: 'View',
                            variant: 'default',
                            icon: <Edit className="h-4 w-4" />,
                            onClick: (selectedItem: any) => {
                                console.log('Selected Item:', selectedItem);
                                setSelectedTransaction(selectedItem);
                                setIsModalOpen(true);
                            },
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
