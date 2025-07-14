import { PaginatedDt } from '@/components/paginated-dt';
import { fetchAllPurchaseRequisition } from '@/hooks/api';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseRequisition } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FcNews, FcViewDetails } from 'react-icons/fc';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Purchase Requisition',
        href: '/prpo/purchase-request',
    },
];

export default function PurchaseRequisitionAllPage() {
    const [purchaseRequisition, setPurchaseRequisition] = useState<PurchaseRequisition[]>([]);

    const [isLoading, setIsLoading] = useState(false); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetchAllPurchaseRequisition();
            setPurchaseRequisition(response.data.purchaseRequisition.data || []);
            setIsLoading(false);
            console.log(response.data.purchaseRequisition);
        };
        fetchData();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaction" />
            <div className="flex h-full flex-1 flex-col rounded-xl">
                <PaginatedDt
                    columnNames={[
                        'id',
                        'PR No',
                        'Status',

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
                            pr_no: item.pr_no,
                            status: item.status,

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
                    loading={isLoading}
                    hiddenColumns={[0]}
                    renderCell={(column, value) => {
                        if (column === 1) {
                            return <strong>{value}</strong>;
                        }
                        if (column === 2) {
                            return (
                                <strong
                                    className={`rounded-xl border border-1 px-2 py-1 ${
                                        value.toLowerCase() === 'open'
                                            ? 'bg-green-100 text-green-800'
                                            : value.toLowerCase().includes('disapprove')
                                              ? 'bg-red-100 text-xs text-red-800'
                                              : value.toLowerCase().includes('finance')
                                                ? 'bg-lime-300 text-xs text-white'
                                                : value.toLowerCase().includes('procurement')
                                                  ? 'bg-sky-500 text-xs text-white'
                                                  : 'bg-gray-200 text-xs text-gray-500'
                                    }`}
                                >
                                    {value}
                                </strong>
                            );
                        }

                        return value;
                    }}
                    actions={(purchaseReq: any) => {
                        const fullItem = purchaseRequisition?.find((item) => item.id === purchaseReq.id);

                        return [
                            {
                                type: 'link',
                                label: 'View',
                                variant: 'default',
                                icon: <FcViewDetails className="h-4 w-4" />,
                                href: `/prpo/purchase-request/details/${fullItem?.id}`,
                            },

                            ...(fullItem && fullItem.status.toLowerCase() === 'open'
                                ? [
                                      {
                                          type: 'link',
                                          label: 'Create PO',
                                          variant: 'outline',
                                          icon: <FcNews className="h-4 w-4" />,
                                          href: `/prpo/purchase-order/${fullItem.id}/view`,
                                      },
                                  ]
                                : []),
                        ];
                    }}
                />
            </div>
        </AppLayout>
    );
}
