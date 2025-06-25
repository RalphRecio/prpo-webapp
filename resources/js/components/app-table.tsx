import React from 'react';

type Column = {
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
};

type AppTableProps = {
    columns: Column[];
    data: any[];
    emptyMessage?: string;
};

export function AppTable({ columns, data, emptyMessage = 'No data available' }: AppTableProps) {
    return (
        <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.length > 0 ? (
                        data.map((item, idx) => (
                            <tr key={item.id ?? idx}>
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-2 text-sm text-gray-500">
                                        {col.render ? col.render(item) : (item[col.key] ?? '')}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-2 text-center text-sm text-gray-500">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
