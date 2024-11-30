import CardItem from "./interfaces/CardItem";
import EmployeeDict from "./dict-types/EmployeeDict";

export default class Employee implements CardItem {
    private readonly _employeeId: string;
    private readonly _isManager: boolean;
    private readonly _name: string;

    // Used to map from Axios response objects
    static fromDict(dict: EmployeeDict): Employee {
        return new Employee(
            dict.employeeId,
            dict.name,
            dict.isManager
        );
    }

    constructor(employeeId: string, name: string, isManager: boolean) {
        this._employeeId = employeeId;
        this._name = name;
        this._isManager = isManager;
    }

    get id(): string {
        return this._employeeId;
    }

    get itemName(): string {
        return this._name;
    }

    get employeeId(): string {
        return this._employeeId;
    }

    get isManager(): boolean {
        return this._isManager;
    }

    get name(): string {
        return this._name;
    }

    toDict(): EmployeeDict {
        return {
            employeeId: this._employeeId,
            name: this._name,
            isManager: this._isManager,
        };
    }
}