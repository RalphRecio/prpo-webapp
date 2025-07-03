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

export default function ApproverTable({ itRelated }: DataTableProps) {
    const page = usePage<SharedData & { auth: { user: User } }>();
    const [approvers, setApprovers] = useState<Approver[]>([]);
    const { auth } = page.props;

    useEffect(() => {
        axios.get(`approvers/${auth.user.bu_id}`).then((res) => {
            setApprovers(res.data);
        });
    }, [auth.user.bu_id]);

    return (
        <div className="flex w-full gap-4 rounded bg-white">
            <table className="min-w-full divide-y divide-gray-200 rounded text-sm text-gray-800">
                <thead className="bg-white">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Requested By:</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">For IT Related Request</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Immediate Supervisor</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                        <td className="px-4 py-2 align-top">{`${auth.user.fname} ${auth.user.mname} ${auth.user.lname}`}</td>
                        {<td className="px-4 py-2 align-top">{itRelated == 1 ? 'Jerald Paghangaan' : ''}</td>}
                        <td className="px-4 py-2 align-top">
                            {`${auth.user.immediate_head?.fname} ${auth.user.immediate_head?.mname ?? ''} ${auth.user.immediate_head?.lname}`}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
