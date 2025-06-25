import React from 'react';

interface AppModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({ isOpen, onClose, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div className="border-sm fixed inset-0 z-50 m-4 flex items-center justify-center border">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Receive Item</h2>
                {/* <p className="mb-4">Please confirm that you want to receive the selected item(s).</p> */}

                {children}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppModal;
