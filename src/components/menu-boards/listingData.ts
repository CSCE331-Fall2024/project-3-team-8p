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
    price: number;
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
        { name: 'Beijing Beef', price: 4.40, imageUrl: BeijingBeef, allergens: [], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'The Original Orange Chicken', price: 4.40, imageUrl: OrangeChicken, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Kung Pao Chicken', price: 4.40, imageUrl: KungPao, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Hot Ones Blazing Bourbon Chicken', price: 4.40, imageUrl: HotOnes, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Honey Walnut Shrimp', price: 4.40, imageUrl: HoneyWalnut, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Honey Sesame Chicken Breast', price: 4.40, imageUrl: HoneySesame, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Grilled Teriyaki', price: 4.40, imageUrl: GrilledTeriyaki, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Black Pepper Sirloin Steak', price: 4.40, imageUrl: BlackPepperSteak, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Black Pepper Chicken', price: 4.40, imageUrl: BlackPepperChicken, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Broccoli Beef', price: 4.40, imageUrl: BroccoliBeef, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
    ],
    [Tabs.Sides]: [
        { name: 'White Rice', price: 4.40, imageUrl: WhiteRice, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Fried Rice', price: 4.40, imageUrl: FriedRice, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Chow Mein', price: 4.40, imageUrl: ChowMein, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Super Greens', price: 4.40, imageUrl: SuperGreens, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
    ],
    [Tabs.Drinks]: [
        { name: 'Dr. Pepper', price: 4.40, imageUrl: DrPepper, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Pepsi', price: 4.40, imageUrl: Pepsi, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Aquafina', price: 4.40, imageUrl: Aquafina, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
        { name: 'Sweet Tea', price: 4.40, imageUrl: SweetTea, allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: true, isSpicy: true},
    ],
    [Tabs.Desserts]: [
        { name: 'Mochi', price: 4.40, imageUrl: 'https://via.placeholder.com/300', allergens: ['soy'], calories: 400, fat: 18, protein: 25, sugar: 12, carbohydrates: 30, isPremium: false, isSpicy: true},
    ],
};

export default listings;
