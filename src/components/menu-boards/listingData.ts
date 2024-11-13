// listingData.ts
import { Tabs } from './TabsEnum';
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
} from '../images';

interface Listing {
    name: string;
    imageUrl: string;
    calories: number;
}

const listings: Record<Tabs, Listing[]> = {
    [Tabs.Entrees]: [
        { name: 'Beijing Beef', imageUrl: BeijingBeef, calories: 400},
        { name: 'The Original Orange Chicken', imageUrl: OrangeChicken, calories: 400 },
        { name: 'Kung Pao Chicken', imageUrl: KungPao, calories: 400 },
        { name: 'Hot Ones Blazing Bourbon Chicken', imageUrl: HotOnes, calories: 400 },
        { name: 'Honey Walnut Shrimp', imageUrl: HoneyWalnut, calories: 400 },
        { name: 'Honey Sesame Chicken Breast', imageUrl: HoneySesame, calories: 400 },
        { name: 'Grilled Teriyaki', imageUrl: GrilledTeriyaki, calories: 400 },
        { name: 'Black Pepper Sirloin Steak', imageUrl: BlackPepperSteak, calories: 400 },
        { name: 'Black Pepper Chicken', imageUrl: BlackPepperChicken, calories: 400 },
        { name: 'Broccoli Beef', imageUrl: BroccoliBeef, calories: 400 },
    ],
    [Tabs.Sides]: [
        { name: 'White Rice', imageUrl: WhiteRice, calories: 400 },
        { name: 'Fried Rice', imageUrl: FriedRice, calories: 400 },
        { name: 'Chow Mein', imageUrl: ChowMein, calories: 400 },
        { name: 'Super Greens', imageUrl: SuperGreens, calories: 400 },
    ],
    [Tabs.Drinks]: [
        { name: 'Dr. Pepper', imageUrl: DrPepper, calories: 400 },
        { name: 'Pepsi', imageUrl: Pepsi, calories: 400 },
        { name: 'Aquafina', imageUrl: Aquafina, calories: 400 },
        { name: 'Sweet Tea', imageUrl: SweetTea, calories: 400 },
    ],
    [Tabs.Desserts]: [
        { name: 'Mochi', imageUrl: 'https://via.placeholder.com/300', calories: 10 },
    ],
};

export default listings;
