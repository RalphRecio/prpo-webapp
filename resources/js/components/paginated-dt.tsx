// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import Swal from 'sweetalert2';

type Item = {
    id: number;
    [key: string]: any;
};

type Action =
    | {
          type: 'button';
          label: string;
          variant: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost';
          onClick: (item: any) => void;
          icon?: React.ReactNode;
      }
    | {
          type: 'link';
          label: string;
          href: string;
          icon?: React.ReactNode;
      };

export type PaginatedDtProps = {
    items: Item[];
    columnNames: string[];
    canAdd?: boolean;
    canDelete?: boolean;
    canEdit?: boolean;
    checkBox?: boolean;
    inputableCol?: Array<{ label: string; name: string; type: string; options?: Array<{ label: string; value: string }> }>;
    actions?: ((item: Item) => Action[]) | Action[];
    headerActions?: React.ReactNode;
    renderCell?: (column: number, value: any, row: any) => React.ReactNode;
    isDateColumn?: (col: string, idx: number) => boolean;
    itemsPerPage?: number; // Optional: to control items per page
    loading?: boolean;
    hiddenColumns?: number[];
};

export function PaginatedDt({
    columnNames,
    canAdd,
    canDelete,
    canEdit,
    checkBox = true,
    actions,
    items,
    renderCell,
    isDateColumn,
    loading = true,
    headerActions,
    itemsPerPage = 5, // Default to 10 items per page
    hiddenColumns = [],
    ...props
}: PaginatedDtProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredItems, setFilteredItems] = useState<Item[]>(items);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter items based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = items.filter((item) =>
                Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(items);
        }
    }, [searchTerm, items]);

    // Calculate the items to be displayed based on the current page and itemsPerPage
    const paginateItems = (items: Item[], page: number, itemsPerPage: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    const currentItems = paginateItems(filteredItems, currentPage, itemsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Render page numbers for pagination
    const renderPageNumbers = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 rounded-md border px-3 py-1 ${currentPage === i ? 'bg-gray-200' : 'bg-white'} text-sm font-medium text-gray-700 hover:bg-gray-50`}
                >
                    {i}
                </button>,
            );
        }

        return pageNumbers;
    };

    const handleDelete = async (item: any) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            // You can remove the item from the state here if necessary
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The item has been deleted.',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div className="m-4 overflow-x-auto bg-white">
            <div className="relative m-4" {...props}>
                <div className="mb-2 flex flex-col">
                    <div className="flex w-full flex-row items-center justify-between">
                        <div className="flex flex-row gap-1">
                            {/* <Button title="Refresh" variant={'secondary'} onClick={() => fetchData(data.current_page, searchTerm, filters)}>
                                <FcSynchronize />
                            </Button> */}
                            {/* <Button title="Export to Excel">
                            <FileSpreadsheet />
                        </Button> */}

                            {headerActions}
                        </div>

                        <div className="flex w-full max-w-md flex-row items-center md:w-auto md:min-w-[200px]">
                            <Input
                                type="text"
                                placeholder="Search across all columns"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground block h-9 w-full min-w-0 rounded-l-md border bg-transparent px-3 py-1 outline-none md:text-sm"
                                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                            />
                            <button
                                type="button"
                                onClick={() => handlePageChange(1)}
                                className="flex h-9 items-center justify-center rounded-r-md border border-l-0 px-4 py-1.5 text-white transition hover:bg-gray-100"
                                style={{ minWidth: '44px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            >
                                <FcSearch />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr className="font-bold">
                                    {checkBox && (
                                        <th className="pl-2 text-center whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={currentItems.length > 0 && currentItems.every((item) => item.selected)}
                                                onChange={(e) => {
                                                    // Handle checkbox selection logic here
                                                }}
                                                className="focus:ring-slate-750 h-4 w-4 border-gray-300 accent-slate-800 focus:ring-1"
                                            />
                                        </th>
                                    )}
                                    {columnNames.map((column, index) =>
                                        hiddenColumns.includes(index) ? null : (
                                            <th
                                                key={column}
                                                className="cursor-pointer px-6 py-3 text-left text-xs tracking-wider whitespace-nowrap text-gray-500 uppercase select-none"
                                                // onClick={() => handleSort(column)}
                                            >
                                                <span className="flex items-center gap-1">
                                                    {column.toUpperCase()}
                                                    {/* {sortColumn === column && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>} */}
                                                </span>
                                            </th>
                                        ),
                                    )}
                                    {((actions && (typeof actions === 'function' || actions.length > 0)) || canDelete || canEdit) && (
                                        <th className="w-24 bg-gray-100 px-6 py-3 text-left text-xs font-medium tracking-wider whitespace-nowrap text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white text-sm text-red-900">
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {checkBox && (
                                                <td className="pl-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.selected || false}
                                                        onChange={(e) => {
                                                            // Handle checkbox toggle logic here
                                                        }}
                                                        className="h-4 w-4 rounded border-gray-950 accent-slate-900 focus:border-gray-950 focus:ring-3 focus:ring-slate-500"
                                                    />
                                                </td>
                                            )}
                                            {Object.values(item).map((value, colIndex) =>
                                                hiddenColumns.includes(colIndex) ? null : (
                                                    <td key={colIndex} className="px-6 py-4 text-xs whitespace-nowrap text-gray-500">
                                                        {renderCell ? (
                                                            renderCell(colIndex, value, item) // Use custom render function if provided
                                                        ) : typeof value === 'object' && value !== null ? (
                                                            <span>{JSON.stringify(value)}1</span> // Handle nested objects
                                                        ) : (
                                                            <span>{String(value || '-')}</span>
                                                        )}
                                                    </td>
                                                ),
                                            )}
                                            {(((actions && typeof actions === 'function' ? actions(item) : actions) ?? []).length > 0 ||
                                                canDelete ||
                                                canEdit) && (
                                                <td className="item-center flex flex-col gap-2 bg-white px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {(typeof actions === 'function' ? actions(item) : actions)?.map((action, actionIndex) => {
                                                        if (action.type === 'link') {
                                                            return (
                                                                <Link
                                                                    key={actionIndex}
                                                                    href={action.href}
                                                                    className="mx-1 inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-center text-xs font-bold text-gray-800 hover:bg-gray-200"
                                                                >
                                                                    {action.icon && <span className="mr-2">{action.icon}</span>}
                                                                    <span>{action.label}</span>
                                                                </Link>
                                                            );
                                                        } else {
                                                            return (
                                                                <button
                                                                    key={actionIndex}
                                                                    onClick={() => action.onClick(item)}
                                                                    className="mx-1 inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-center text-xs font-bold text-gray-800 hover:bg-gray-200"
                                                                >
                                                                    {action.icon && <span className="mr-2">{action.icon}</span>}
                                                                    <span>{action.label}</span>
                                                                </button>
                                                            );
                                                        }
                                                    })}
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columnNames.length + 1} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No transactions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="m-4 flex items-center justify-end">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <div className="mx-2 flex">{renderPageNumbers()}</div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-black/50" style={{ backdropFilter: 'blur(2px)' }}>
                        <div className="flex flex-col items-center">
                            <svg
                                className="mb-4 h-12 w-12 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            <span className="text-lg font-semibold text-white">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
