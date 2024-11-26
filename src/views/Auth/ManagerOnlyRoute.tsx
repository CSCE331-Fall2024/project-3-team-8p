import React, { ReactElement, useEffect, useState } from 'react';
import { useUser } from "../../contexts/UserContext";
import EmployeeApi from "../../apis/employee-api";
import Unauthorized from "./Unauthorized";
import LoadingView from "../shared/LoadingView";

interface EmployeeOnlyRouteProps {
    children: ReactElement;
}

const employeeApi = new EmployeeApi();

// Wrapper for views that require authentication
function EmployeeOnlyRoute({ children }: EmployeeOnlyRouteProps) : ReactElement {
    const { user } = useUser();
    const [isManager, setIsManager] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const checkManagerAccess = async () => {
            if (user) {
                const existingEmployee = await employeeApi.getEmployeeByName(user.name);
                if (existingEmployee !== null) {
                    setIsManager(existingEmployee.isManager);
                    return;
                }
            }
            setIsManager(false);
        }
        checkManagerAccess();
    }, [user])

    // Show a loading state while the check is being performed
    if (isManager === undefined) {
        return <LoadingView color={"white"} />;
    }

    return isManager ? <>{children}</> : <Unauthorized />;
}

export default EmployeeOnlyRoute;