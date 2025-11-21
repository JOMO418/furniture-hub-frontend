// Import category images
import categoryBedroom from '../assets/images/category-bedroom.jpg';
import categoryDecor from '../assets/images/category-decor.jpg';
import categoryLivingRoom from '../assets/images/category-living.jpg';
import categoryDining from '../assets/images/category-dining.jpg';
import categoryOffice from '../assets/images/category-office.jpg';
import categoryOutdoor from '../assets/images/category-outdoor.jpg';

export const categories = [
  {
    id: 1,
    name: "Living Room",
    slug: "living-room",
    image: categoryLivingRoom,
    description: "Sofas, coffee tables, and accent pieces"
  },
  {
    id: 2,
    name: "Bedroom",
    slug: "bedroom",
    image: categoryBedroom,
    description: "Beds, wardrobes, and nightstands"
  },
  {
    id: 3,
    name: "Dining Room",
    slug: "dining-room",
    image: categoryDining,
    description: "Dining tables, chairs, and storage"
  },
  {
    id: 4,
    name: "Office",
    slug: "office",
    image: categoryOffice,
    description: "Desks, chairs, and shelving"
  },
  {
    id: 5,
    name: "Outdoor",
    slug: "outdoor",
    image: categoryOutdoor,
    description: "Patio sets and outdoor lounging"
  },
  {
    id: 6,
    name: "Decor & Accessories",
    slug: "decor",
    image: categoryDecor,
    description: "Mirrors, lighting, and accents"
  }
];