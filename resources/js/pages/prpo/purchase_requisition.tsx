import { DialogAlert } from '@/components/dialogAlert';
import { PaginatedDt } from '@/components/paginated-dt';
import { fetchPurchaseRequisition } from '@/hooks/api';
import { usePaginationService } from '@/hooks/use-pagination-service';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PurchaseRequisition } from '@/types';
import { useAuthId } from '@/util/util';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FcFullTrash, FcPlus, FcViewDetails } from 'react-icons/fc';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Requisition',
        href: '/prpo/purchase-request',
    },
];

export default function PurchaseRequisitionPage() {
    const [purchaseRequisition, setPurchaseRequisition] = useState<PurchaseRequisition[]>([]);

    const { loading, fetchData, handlePageChange } = usePaginationService('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [prId, setPrId] = useState<number | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPurchaseRequisition();
            setPurchaseRequisition(response.data.purchaseRequisition.data || []);
            console.log(response.data.purchaseRequisition);
        };
        fetchData();
    }, []);

    const confirmDelete = async () => {
        setDialogOpen(false);

        try {
            const response = await axios.delete(`/prpo/purchase-request/delete/${prId}`);
            Swal.fire('Success!', 'Purchase Request Deleted.', 'success');
            setPurchaseRequisition(response.data.purchaseRequisition.data || []);
        } catch (e) {
            Swal.fire('Error!', 'Failed to delete Purchase Request.', 'error');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaction" />
            <div className="flex h-full flex-1 flex-col rounded-xl">
                <div className="m-4 overflow-x-auto bg-white">
                    <PaginatedDt
                        loading={loading}
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
                        loading={loading}
                        hiddenColumns={[0]}
                        handlePageChange={handlePageChange}
                        renderCell={(column, value) => {
                            if (column === 1) {
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
                        headerActions={[
                            <Link
                                href="/prpo/create_pr"
                                className="animate inline-flex items-center rounded-md bg-gray-100 px-2 text-center text-sm font-bold text-gray-800 hover:bg-gray-200"
                                // onClick={handleClick}
                            >
                                {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <FcPlus className="mr-2 h-4 w-4" />} New Purchase
                                Request
                            </Link>,
                        ]}
                        fetchData={fetchData}
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

                                ...(fullItem &&
                                (fullItem.status === 'For approval of IT Manager' || fullItem.status === 'For approval of Immediate Head') &&
                                Number(fullItem.requestor_id) === Number(useAuthId())
                                    ? [
                                          {
                                              type: 'button',
                                              label: 'Delete',
                                              variant: 'outline',
                                              icon: <FcFullTrash className="h-4 w-4" />,
                                              onClick: () => {
                                                  setDialogOpen(true);
                                                  setPrId(fullItem?.id);
                                              },
                                          },
                                      ]
                                    : []),
                            ];
                        }}
                    />
                </div>

                <div className="hidden">
                    <DialogAlert
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                        title="Delete Purchase Request"
                        body="Are you  sure, you want to delete this item?"
                        buttonName="Delete"
                        remarkFields={false}
                        handleSubmit={confirmDelete}
                        loading={false}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
