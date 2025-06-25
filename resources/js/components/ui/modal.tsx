import React from 'react';
import { Button } from '@/components/ui/button';

type ModalProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onSave?: () => void;
    saveText?: string; 
    width?: string;
    height?: string; // Add a new prop for height
    hideSaveButton?: boolean, 
};

export default function Modal({ isOpen, title, children, onClose, onSave, width = 'lg:w-[60%]' , height = 'max-h-[85vh]', saveText = 'Save', hideSaveButton = false}: ModalProps) {
    if (!isOpen) return null;

    return (
   
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/70 transition-opacity duration-300 ease-in-out">
            <div
                className={`m-transform w-full overflow-x-auto rounded bg-white p-4 shadow-lg transition-transform duration-1000 ease-in-out ${width} ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                style={{ maxHeight: height }} // Apply the height dynamically
            >
                <h2 className="mb-4 text-lg font-bold">{title}</h2>
                <div className="overflow-y-auto p-2">{children}</div>
                <div className="mt-6 flex justify-end space-x-4">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    {!hideSaveButton && onSave && ( 
                        <Button onClick={onSave}>{saveText}</Button>
                    )}
                </div>
            </div>
        </div>
    );
}