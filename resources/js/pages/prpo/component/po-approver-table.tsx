import { usePage } from '@inertiajs/react';
import axios from 'axios';

import { SharedData, User } from '@/types';
import { useEffect, useState } from 'react';

interface DataTableProps extends React.ComponentProps<'div'> {
    itRelated: number;
}

interface Approver {
    id: number;
    approver_name: string | null;
    job_title: string;
    approver_type: string;
    approver_status: string;
    approver_level: string;
}

export default function PoApproverTable({ itRelated }: DataTableProps) {
    const page = usePage<SharedData & { auth: { user: User } }>();
    const [approvers, setApprovers] = useState<Approver[]>([]);
    const { auth } = page.props;

    useEffect(() => {
        axios.get(`approvers/${auth.user.bu_id}`).then((res) => {
            setApprovers(res.data);
        });
    }, [auth.user.bu_id]);

    return (
        <div className="flex w-full gap-4 rounded bg-white p-4 shadow">
            <table className="min-w-full divide-y divide-gray-200 rounded border text-sm text-gray-500">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Prepared By</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Reviewed By</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Approved By</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                        <td className="w-1/3 justify-center px-4 py-2 text-center align-top">{`${auth.user.fname} ${auth.user.mname} ${auth.user.lname}`}</td>
                        <td className="w-1/3 px-4 py-2 align-top">
                            <div className="flex flex-col text-center">
                                <span className="font-bold">Pending</span>
                                <span>Alethea Pablo</span>
                                <span className="text-sm text-gray-600">HRA Manager</span>
                            </div>
                        </td>
                        <td className="w-1/3 px-4 py-2 align-top">
                            <div className="flex flex-col text-center">
                                <span className="font-bold">Pending</span>
                                <span>Eva Aquino</span>
                                <span className="text-sm text-gray-600">President</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
