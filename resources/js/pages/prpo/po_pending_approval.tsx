import { PaginatedDt } from '@/components/paginated-dt';
import { usePaginationService } from '@/hooks/use-pagination-service';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Paginated, PurchaseOrder } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'For Approval',
        href: '/prpo/po_pending_approval',
    },
    {
        title: 'PO for Approval',
        href: '/prpo/po_pending_approval',
    },
];

export default function PoPendingApproval() {
    const { purchaseOrders } = usePage<{ purchaseOrders: Paginated<PurchaseOrder> }>().props;

    const { loading, fetchData, handlePageChange } = usePaginationService('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pending for Approval" />
            <div className="flex h-full flex-1 flex-col rounded-xl">
                <div className="overflow-x-auto bg-white">
                    <PaginatedDt
                        columnNames={['id', 'PO No.', 'Requested By']}
                        items={purchaseOrders.map((item: any) => ({
                            id: item.id,
                            po_no: item.purchase_request.pr_no,
                            requested_by: item.requested_by,
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
                        // actions={(purchasePo: any) => {
                        //     const fullItem = pendingForApproval.data.find((item) => item.id === purchasePo.id);
                        //     return [
                        //         {
                        //             type: 'link',
                        //             label: 'View',
                        //             variant: 'default',
                        //             icon: <Edit className="h-4 w-4" />,
                        //             href: `/prpo/purchase-request/details/${fullItem?.id}`,
                        //         },
                        //     ];
                        // }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
