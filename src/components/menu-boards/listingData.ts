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
    SweetTea,
    spicy,
    wok
} from '../images';

interface Listing {
    name: string;
    imageUrl: string;
    calories: number;
    specialItems: string[];
}

const listings: Record<Tabs, Listing[]> = {
    [Tabs.Entrees]: [
        { name: 'Beijing Beef', imageUrl: BeijingBeef, calories: 400, specialItems: [spicy, wok]},
        { name: 'The Original Orange Chicken', imageUrl: OrangeChicken, calories: 400, specialItems: []},
        { name: 'Kung Pao Chicken', imageUrl: KungPao, calories: 400, specialItems: [spicy, wok] },
        { name: 'Hot Ones Blazing Bourbon Chicken', imageUrl: HotOnes, calories: 400, specialItems: [spicy, wok] },
        { name: 'Honey Walnut Shrimp', imageUrl: HoneyWalnut, calories: 400, specialItems: [spicy, wok] },
        { name: 'Honey Sesame Chicken Breast', imageUrl: HoneySesame, calories: 400, specialItems: [spicy, wok] },
        { name: 'Grilled Teriyaki', imageUrl: GrilledTeriyaki, calories: 400, specialItems: [spicy, wok] },
        { name: 'Black Pepper Sirloin Steak', imageUrl: BlackPepperSteak, calories: 400, specialItems: [spicy, wok] },
        { name: 'Black Pepper Chicken', imageUrl: BlackPepperChicken, calories: 400, specialItems: [spicy, wok] },
        { name: 'Broccoli Beef', imageUrl: BroccoliBeef, calories: 400, specialItems: [spicy, wok] },
    ],
    [Tabs.Sides]: [
        { name: 'White Rice', imageUrl: WhiteRice, calories: 400, specialItems: [spicy, wok] },
        { name: 'Fried Rice', imageUrl: FriedRice, calories: 400, specialItems: [spicy, wok] },
        { name: 'Chow Mein', imageUrl: ChowMein, calories: 400, specialItems: [spicy, wok] },
        { name: 'Super Greens', imageUrl: SuperGreens, calories: 400, specialItems: [spicy, wok] },
    ],
    [Tabs.Drinks]: [
        { name: 'Dr. Pepper', imageUrl: DrPepper, calories: 400, specialItems: [spicy, wok] },
        { name: 'Pepsi', imageUrl: Pepsi, calories: 400, specialItems: [spicy, wok] },
        { name: 'Aquafina', imageUrl: Aquafina, calories: 400, specialItems: [spicy, wok] },
        { name: 'Sweet Tea', imageUrl: SweetTea, calories: 400, specialItems: [spicy, wok] },
    ],
    [Tabs.Desserts]: [
        { name: 'Mochi', imageUrl: 'https://via.placeholder.com/300', calories: 10, specialItems: [] },
    ],
};

export default listings;
