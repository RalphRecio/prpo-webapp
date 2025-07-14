import { PaginatedDt } from '@/components/paginated-dt';
import { fetchAllPurchaseOrders } from '@/hooks/api';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseOrder } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FcViewDetails } from 'react-icons/fc';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Purchase Order',
        href: '/prpo/purchase-order/all',
    },
];

export default function PurchaseOrderAll() {
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

    const [isLoading, setIsLoading] = useState(false); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetchAllPurchaseOrders();
            setPurchaseOrders(response.data.purchaseOrders.data || []);
            setIsLoading(false);
            console.log(response.data.purchaseOrders);
        };
        fetchData();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pending for Approval" />

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
                loading={isLoading}
                renderCell={(column, value) => {
                    if (column === 1) {
                        return (
                            <strong
                                className={`rounded-xl border border-1 px-2 py-1 ${
                                    value === 'open'
                                        ? 'bg-green-100 text-green-800'
                                        : value.toLowerCase().includes('disapprove')
                                          ? 'bg-red-100 text-xs text-red-800'
                                          : value.toLowerCase().includes('completed')
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-200 text-xs text-gray-500'
                                }`}
                            >
                                {value}
                            </strong>
                        );
                    }

                    return value;
                }}
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
        </AppLayout>
    );
}
