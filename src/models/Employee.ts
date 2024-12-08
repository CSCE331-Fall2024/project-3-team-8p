import CardItem from "./interfaces/CardItem";
import EmployeeDict from "./dict-types/EmployeeDict";

/**
 * Model for an employee
 */
export default class Employee implements CardItem {
    /**
     * The employee's ID
     * @private
     */
    private readonly _employeeId: string;
    /**
     * Boolean indicating whether the employee is a manager
     * @private
     */
    private readonly _isManager: boolean;
    /**
     * The employee's name
     * @private
     */
    private readonly _name: string;

    /**
     * Maps from an {@linkcode EmployeeDict} to an {@linkcode Employee}
     * @param dict - The {@linkcode EmployeeDict} containing employee data
     * @returns A new {@linkcode Employee} instance
     */
    static fromDict(dict: EmployeeDict): Employee {
        return new Employee(
            dict.employeeId,
            dict.name,
            dict.isManager
        );
    }

    /**
     * Constructs a new {@linkcode Employee}
     * @param employeeId - The employee's ID
     * @param name - The employee's name
     * @param isManager - The employee's manager status
     */
    constructor(employeeId: string, name: string, isManager: boolean) {
        this._employeeId = employeeId;
        this._name = name;
        this._isManager = isManager;
    }

    /**
     * Gets the employee's ID
     * @returns The employee's ID
     */
    get id(): string {
        return this._employeeId;
    }

    /**
     * Gets the employee's name for display purposes
     * @returns The employee's name
     */
    get itemName(): string {
        return this._name;
    }

    /**
     * Gets the employee's ID
     * @returns The employee's ID
     */
    get employeeId(): string {
        return this._employeeId;
    }

    /**
     * Gets the employee's manager status
     * @returns `true` if the employee is a manager, `false` otherwise
     */
    get isManager(): boolean {
        return this._isManager;
    }

    /**
     * Gets the employee's name
     * @returns The employee's name
     */
    get name(): string {
        return this._name;
    }

    /**
     * Converts the employee instance to a dictionary format
     * @returns An {@linkcode EmployeeDict} representation of the employee
     */
    toDict(): EmployeeDict {
        return {
            employeeId: this._employeeId,
            name: this._name,
            isManager: this._isManager,
        };
    }
}
