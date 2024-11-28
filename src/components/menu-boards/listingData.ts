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
    allergens: string[];
    calories: number;
    fat: number;
    protein: number;
    sugar: number;
    carbohydrates: number;
    isPremium: boolean;
    isSpicy: boolean;
}

const listings: Record<Tabs, Listing[]> = {
    [Tabs.Entrees]: [
        { name: 'Beijing Beef', imageUrl: BeijingBeef, allergens: [], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'The Original Orange Chicken', imageUrl: OrangeChicken, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Kung Pao Chicken', imageUrl: KungPao, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Hot Ones Blazing Bourbon Chicken', imageUrl: HotOnes, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Honey Walnut Shrimp', imageUrl: HoneyWalnut, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Honey Sesame Chicken Breast', imageUrl: HoneySesame, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Grilled Teriyaki', imageUrl: GrilledTeriyaki, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Black Pepper Sirloin Steak', imageUrl: BlackPepperSteak, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Black Pepper Chicken', imageUrl: BlackPepperChicken, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Broccoli Beef', imageUrl: BroccoliBeef, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
    ],
    [Tabs.Sides]: [
        { name: 'White Rice', imageUrl: WhiteRice, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Fried Rice', imageUrl: FriedRice, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Chow Mein', imageUrl: ChowMein, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Super Greens', imageUrl: SuperGreens, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
    ],
    [Tabs.Drinks]: [
        { name: 'Dr. Pepper', imageUrl: DrPepper, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Pepsi', imageUrl: Pepsi, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Aquafina', imageUrl: Aquafina, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Sweet Tea', imageUrl: SweetTea, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
    ],
    [Tabs.Desserts]: [
        { name: 'Mochi', imageUrl: 'https://via.placeholder.com/300', allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: false, isSpicy: true},
    ],
};

export default listings;
