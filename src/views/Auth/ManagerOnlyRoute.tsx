import React, { ReactElement, useEffect, useState } from 'react';
import { useUser } from "../../contexts/UserContext";
import EmployeeApi from "../../apis/employee-api";
import Unauthorized from "./Unauthorized";
import LoadingView from "../shared/LoadingView";

interface ManagerOnlyRouteProps {
    children: ReactElement;
}

const employeeApi = new EmployeeApi();

/**
 * Wrapper component for views that require manager access to view
 * @param children - The React components to wrap
 * @constructor
 */
function ManagerOnlyRoute({ children }: ManagerOnlyRouteProps) : ReactElement {
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

export default ManagerOnlyRoute;