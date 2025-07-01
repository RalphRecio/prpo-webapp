import { useLoading } from '../../context/LoadingContext';

export function GlobalLoadingOverlay() {
    const { loading } = useLoading();
    if (!loading) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-black/50" style={{ backdropFilter: 'blur(2px)' }}>
            <div className="flex flex-col items-center">
                <svg className="mb-4 h-12 w-12 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className="text-lg font-semibold text-white">Loading...</span>
            </div>
        </div>
    );
}
