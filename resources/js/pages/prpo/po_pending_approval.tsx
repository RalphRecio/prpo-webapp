import { PaginatedDt } from '@/components/paginated-dt';
import { fetchPurchaseOrders } from '@/hooks/api';
import { usePaginationService } from '@/hooks/use-pagination-service';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseOrder } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FcViewDetails } from 'react-icons/fc';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'For Approval',
        href: '/prpo/po_pending_approval',
    },
    {
        title: 'Purchase Order',
        href: '/prpo/po_pending_approval',
    },
];

export default function PoPendingApproval() {
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

    const { loading, fetchData, handlePageChange } = usePaginationService('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPurchaseOrders();
            setPurchaseOrders(response.data.purchaseOrders.data || []);
            console.log(response.data.purchaseOrders);
        };
        fetchData();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pending for Approval" />
            <div className="flex h-full flex-1 flex-col rounded-xl">
                <PaginatedDt
                    columnNames={['id', 'Status', 'PO No.', 'PR No.', 'Buyer', 'Requested By']}
                    items={purchaseOrders.map((item: any) => ({
                        id: item.id,
                        status: item.status,
                        po_no: item.po_no,
                        pr_no: item.purchase_request.pr_no,
                        buyer: item.buyer,
                        requested_by: `${item.prepared_by.fname} ${item.prepared_by.lname}`,
                    }))}
                    checkBox={false}
                    data={purchaseOrders}
                    hiddenColumns={[0]}
                    loading={loading}
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
                    fetchData={fetchData}
                    actions={(purchasePo: any) => {
                        const fullItem = purchaseOrders.find((item) => item.id === purchasePo.id);
                        return [
                            {
                                type: 'link',
                                label: 'View',
                                variant: 'default',
                                icon: <FcViewDetails className="h-4 w-4" />,
                                href: `/prpo/purchase-order/view-pending-approval/${fullItem?.id}`,
                            },
                        ];
                    }}
                />
            </div>
        </AppLayout>
    );
}
