import { PaginatedDt } from '@/components/paginated-dt';
import { fetchPendingPurchaseRequisition } from '@/hooks/api';
import { usePaginationService } from '@/hooks/use-pagination-service';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseRequisition } from '@/types';
import { Head } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'For Approval',
        href: '/prpo/pending_approval',
    },
    {
        title: 'PR for Approval',
        href: '/prpo/pending_approval',
    },
];

export default function PendingApproval() {
    // const { pendingForApproval } = usePage<{ pendingForApproval: PurchaseRequisition }>().props;

    const [purchaseRequisition, setPurchaseRequisition] = useState<PurchaseRequisition[]>([]);

    const { loading, fetchData, handlePageChange } = usePaginationService('');
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPendingPurchaseRequisition();

            console.log(response.data);
            setPurchaseRequisition(response.data.purchaseRequisition.data || []);
            console.log(response.data.purchaseRequisition);
        };
        fetchData();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pending for Approval" />

            <div className="flex h-full flex-1 flex-col rounded-xl">
                <PaginatedDt
                    columnNames={[
                        'id',
                        'Status',
                        'PR No',
                        'Requestor',
                        'Date Issue',
                        'Date Needed',
                        // 'Business Unit',
                        // 'Department',
                        'Product End User',
                        'Classification',
                        'Remarks',
                    ]}
                    items={
                        purchaseRequisition?.map((item) => ({
                            id: item.id,
                            status: item.status,
                            pr_no: item.pr_no,
                            requestor_id: `${item.requestor.fname} ${item.requestor.lname}`,
                            date_issue: item.date_issue,
                            date_needed: item.date_needed,
                            // bu_id: item.bu.name || '',
                            // department_id: item.department.name,
                            prod_end_user: item.prod_end_user,
                            classification_id: item.classification.name,
                            remarks: item.remarks,
                        })) ?? []
                    }
                    checkBox={false}
                    data={purchaseRequisition}
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
                        const fullItem = purchaseRequisition.find((item) => item.id === purchasePo.id);
                        return [
                            {
                                type: 'link',
                                label: 'View',
                                variant: 'default',
                                icon: <Edit className="h-4 w-4" />,
                                href: `/prpo/purchase-request/details/${fullItem?.id}`,
                            },
                        ];
                    }}
                />
            </div>
        </AppLayout>
    );
}
