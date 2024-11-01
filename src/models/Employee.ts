import CardItem from "./interfaces/CardItem";

export default class Employee implements CardItem {
    private readonly _employeeId: string;
    private readonly _isManager: boolean;
    private readonly _name: string;

    constructor(employeeId: string, name: string, isManager: boolean) {
        this._employeeId = employeeId;
        this._name = name;
        this._isManager = isManager;
    }

    get id() {
        return this._employeeId;
    }

    get itemName() {
        return this._name;
    }

    get employeeId() {
        return this._employeeId;
    }

    get isManager() {
        return this._isManager;
    }

    get name() {
        return this._name;
    }
}