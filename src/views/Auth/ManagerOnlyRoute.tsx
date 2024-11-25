import React, { ReactElement, useEffect, useState } from 'react';
import { useUser } from "../../contexts/UserContext";
import EmployeeApi from "../../apis/employee-api";
import Unauthorized from "./Unauthorized";

interface EmployeeOnlyRouteProps {
    children: ReactElement;
}

const employeeApi = new EmployeeApi();

// Wrapper for views that require authentication
function EmployeeOnlyRoute({ children }: EmployeeOnlyRouteProps) : ReactElement {
    const { user } = useUser();
    const [isManager, setIsManager] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const checkEmployee = async () => {
            if (user) {
                const existingEmployee = await employeeApi.getEmployeeByName(user.name);
                if (existingEmployee !== null) {
                    setIsManager(existingEmployee.isManager);
                    return;
                }
            }
            setIsManager(false);
        }
        checkEmployee();
    }, [user])

    // Show a loading state while the check is being performed
    if (isManager === undefined) {
        return <div>Loading...</div>;
    }

    return isManager ? <>{children}</> : <Unauthorized />;
}

export default EmployeeOnlyRoute;