import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const PermissionContext = createContext<string[]>([]);

// Provider component
export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
    const [permissions, setPermissions] = useState<string[]>([]);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                // Check if permissions are already cached in localStorage
                const cachedPermissions = localStorage.getItem('permissions');
                if (cachedPermissions) {
                    setPermissions(JSON.parse(cachedPermissions));
                } else {
                    // Fetch permissions from the API if not cached
                    const response = await axios.get('/user/permissions');
                    if (response) {
                        setPermissions(response.data);

                        localStorage.setItem('permissions', JSON.stringify(response.data));
                    }
                }
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        };

        fetchPermissions();
    }, []); // Runs only once when the component mounts

    return <PermissionContext.Provider value={permissions}>{children}</PermissionContext.Provider>;
};

// Hook to use permissions
export const usePermissions = () => useContext(PermissionContext);
