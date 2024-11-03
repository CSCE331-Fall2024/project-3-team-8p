// listing-data.ts
import { Tabs } from '../../views/Customer/tabs-enum';
import {
    BeijingBeef,
    BlackPepperChicken,
    BlackPepperSteak,
    OrangeChicken,
    KungPao,
    HotOnes,
    HoneyWalnut,
    HoneySesame,
    GrilledTeriyaki,
    BroccoliBeef,
    WhiteRice,
    FriedRice,
    SuperGreens,
    ChowMein,
    Pepsi,
    DrPepper,
    Aquafina,
    SweetTea
} from '../../../public/images';

interface Listing {
    name: string;
    price: number;
    imageUrl: string;
    quantityOrdered: number;
}

const listings: Record<Tabs, Listing[]> = {
    [Tabs.Entrees]: [
        { name: 'Beijing Beef', price: 4.40, imageUrl: BeijingBeef, quantityOrdered: 0 },
        { name: 'The Original Orange Chicken', price: 4.40, imageUrl: OrangeChicken, quantityOrdered: 0 },
        { name: 'Kung Pao Chicken', price: 4.40, imageUrl: KungPao, quantityOrdered: 0 },
        { name: 'Hot Ones Blazing Bourbon Chicken', price: 4.40, imageUrl: HotOnes, quantityOrdered: 0 },
        { name: 'Honey Walnut Shrimp', price: 4.40, imageUrl: HoneyWalnut, quantityOrdered: 0 },
        { name: 'Honey Sesame Chicken Breast', price: 4.40, imageUrl: HoneySesame, quantityOrdered: 0 },
        { name: 'Grilled Teriyaki', price: 4.40, imageUrl: GrilledTeriyaki, quantityOrdered: 0 },
        { name: 'Black Pepper Sirloin Steak', price: 4.40, imageUrl: BlackPepperSteak, quantityOrdered: 0 },
        { name: 'Black Pepper Chicken', price: 4.40, imageUrl: BlackPepperChicken, quantityOrdered: 0 },
        { name: 'Broccoli Beef', price: 4.40, imageUrl: BroccoliBeef, quantityOrdered: 0 },
    ],
    [Tabs.Sides]: [
        { name: 'White Rice', price: 4.40, imageUrl: WhiteRice, quantityOrdered: 0 },
        { name: 'Fried Rice', price: 4.40, imageUrl: FriedRice, quantityOrdered: 0 },
        { name: 'Chow Mein', price: 4.40, imageUrl: ChowMein, quantityOrdered: 0 },
        { name: 'Super Greens', price: 4.40, imageUrl: SuperGreens, quantityOrdered: 0 },
    ],
    [Tabs.Drinks]: [
        { name: 'Dr. Pepper', price: 4.40, imageUrl: DrPepper, quantityOrdered: 0 },
        { name: 'Pepsi', price: 4.40, imageUrl: Pepsi, quantityOrdered: 0 },
        { name: 'Aquafina', price: 4.40, imageUrl: Aquafina, quantityOrdered: 0 },
        { name: 'Sweet Tea', price: 4.40, imageUrl: SweetTea, quantityOrdered: 0 },
    ],
    [Tabs.Desserts]: [
        { name: 'Mochi', price: 4.99, imageUrl: 'https://via.placeholder.com/300', quantityOrdered: 1 },
    ],
};

export default listings;
