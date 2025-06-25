import { AppTable } from '@/components/app-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal from '@/components/ui/modal';

type Role = {
    name: string;
    slug: string;
    permissions?: any[];
};

type ModalRolesProps = {
    isOpen: boolean;
    onClose: () => void;
    role: Role;
};

export function ModalRoles({ isOpen, onClose, role }: ModalRolesProps) {
    if (!role) return null;

    return (
        <Modal isOpen={isOpen} title="Role Details" onClose={onClose}>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <div className="w-full max-w-sm">
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/4">
                                <Label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">Name</Label>
                            </div>
                            <div className="md:w-2/3">
                                <Input type="text" value={role.name} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-sm p-2">
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/4">
                                <Label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">Slug</Label>
                            </div>
                            <div className="md:w-2/3">
                                <Input type="text" value={role.slug} readOnly />
                            </div>
                        </div>
                    </div>
                </div>

                {role.permissions && (
                    <AppTable
                        columns={[
                            { key: 'page', label: 'Page' },
                            { key: 'can_access', label: 'Can Access' },
                        ]}
                        data={role.permissions}
                    />
                )}
            </div>
        </Modal>
    );
}
