import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

export function usePaginationService(endpoint?: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handlePageChange = (page: number) => {
        fetchData(page, searchTerm);
    };

    const fetchData = async (page: number, search: string = '', filter?: any) => {
        setLoading(true);
        setSearchTerm(search);

        interface FilterItem {
            column: string;
            value?: string;
            from?: string;
            to?: string;
        }

        const filterArray: FilterItem[] = Array.isArray(filter) ? filter : [];

        const filterObj = filterArray.reduce<Record<string, string>>((acc, cur) => {
            if (cur.value !== undefined) acc[cur.column] = cur.value;
            if (cur.from !== undefined) acc[`${cur.column}_from`] = cur.from;
            if (cur.to !== undefined) acc[`${cur.column}_to`] = cur.to;
            return acc;
        }, {});

        Inertia.get(
            endpoint ? endpoint : window.location.pathname,
            { page, search, ...filterObj },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['inventory'],
                replace: true,
            },
        );
    };

    return { loading, searchTerm, setSearchTerm, fetchData, handlePageChange };
}
