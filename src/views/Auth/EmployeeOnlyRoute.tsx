import React, { ReactElement, useEffect, useState } from 'react';
import EmployeeApi from "../../apis/employee-api";
import { useUser } from "../../contexts/UserContext";
import Unauthorized from "./Unauthorized";
import LoadingView from "../shared/LoadingView";

interface EmployeeOnlyRouteProps {
    children: ReactElement;
}

const employeeApi = new EmployeeApi();

/**
 * Wrapper component for views that require employee access to view
 * @param children - The React components to wrap
 * @constructor
 */
function EmployeeOnlyRoute({ children }: EmployeeOnlyRouteProps) : ReactElement {
    const { user } = useUser();
    const [isEmployee, setIsEmployee] = useState<boolean | undefined>(undefined);

    // Check user credentials whenever they try to view a protected page
    useEffect(() => {
        const checkEmployee = async () => {
            if (user) {
                const existingEmployee = await employeeApi.getEmployeeByName(user.name);
                if (existingEmployee !== null) {
                    setIsEmployee(true);
                    return;
                }
            }
            setIsEmployee(false);
        }
        checkEmployee();
    }, [user])

    // Show a loading state while the check is being performed
    if (isEmployee === undefined) {
        return <LoadingView color={"white"} />;
    }

    return isEmployee ? <>{children}</> : <Unauthorized />;
}

export default EmployeeOnlyRoute;