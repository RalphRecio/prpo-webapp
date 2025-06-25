import { PaginatedDt } from '@/components/paginated-dt';
import { usePaginationService } from '@/hooks/use-pagination-service';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Paginated, PurchaseRequisition, Transactions } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Edit, Loader, Plus } from 'lucide-react';
import { useState } from 'react';

const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transaction',
        href: '/transactions',
    },
];

export default function PurchaseRequisitionPage() {
    const { purchaseRequisition } = usePage<{ purchaseRequisition: Paginated<PurchaseRequisition> }>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transactions | null>(null);
    const [grNo, setGrNo] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleApprove = async () => {
        if (!selectedTransaction) {
            console.error('No transaction selected for approval.');
            return;
        }

        setIsLoading(true);

        const response = await axios.post(`/inbound/transaction/approve/${selectedTransaction.id}`, {
            gr_no: grNo,
        });

        if (response) {
            Inertia.reload({ only: ['transactions'] });
        }
    };
    const { loading, fetchData, handlePageChange } = usePaginationService('');
    const capitalizeFirstLetter = (str: string) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    function handleClick(event: React.MouseEvent<Element, MouseEvent>): void {
        event.preventDefault();

        Inertia.visit('/prpo/create_pr');
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaction" />
            <div className="flex h-full flex-1 flex-col rounded-xl">
                <div className="overflow-x-auto bg-white">
                    <PaginatedDt
                        columnNames={[
                            'id',
                            'Status',
                            'Requestor',
                            'Date Issue',
                            'Date Needed',
                            'BU',
                            'Department',
                            'Product End User',
                            'Classification',
                            'Remarks',
                        ]}
                        items={purchaseRequisition.data.map((item) => ({
                            id: item.id,
                            status: item.status,
                            requestor_id: item.requestor_id,
                            date_issue: item.date_issue,
                            date_needed: item.date_needed,
                            bu_id: item.bu.name || '',
                            department_id: item.department.name,
                            prod_end_user: item.prod_end_user,
                            classification_id: item.classification.name,
                            remarks: item.remarks,
                        }))}
                        checkBox={false}
                        data={purchaseRequisition}
                        loading={loading}
                        hiddenColumns={[0]}
                        handlePageChange={handlePageChange}
                        renderCell={(column, value) => {
                            if (column === 1) {
                                return (
                                    <strong
                                        className={`rounded-xl border border-1 px-2 py-1 ${
                                            value == 0 ? 'bg-gray-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {value}
                                    </strong>
                                );
                            }

                            return value;
                        }}
                        headerActions={[
                            <Link
                                href="/prpo/create_pr"
                                className="inline-flex items-center rounded-md bg-blue-500 px-2 text-center text-white hover:bg-blue-600"
                                onClick={handleClick}
                            >
                                {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />} New PR
                            </Link>,
                        ]}
                        fetchData={fetchData}
                        actions={[
                            {
                                type: 'button',
                                label: 'View',
                                variant: 'default',
                                icon: <Edit className="h-4 w-4" />,
                                onClick: (purchaseReq: any) => {
                                    const fullItem = purchaseRequisition.data.find((item) => item.id === purchaseReq.id);
                                    if (fullItem) {
                                        Inertia.visit(`/prpo/purchase-request/details/${fullItem.id}`);
                                    } else {
                                        console.error('Item not found');
                                    }
                                },
                            },
                            {
                                type: 'button',
                                label: 'Create PO',
                                variant: 'default',
                                icon: <Edit className="h-4 w-4" />,
                                onClick: (purchaseReq: any) => {
                                    const fullItem = purchaseRequisition.data.find((item) => item.id === purchaseReq.id);
                                    if (fullItem) {
                                        Inertia.visit(`/prpo/purchase-order/${fullItem.id}`);
                                    } else {
                                        console.error('Item not found');
                                    }
                                },
                            },
                        ]}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
