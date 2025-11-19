import { CreditPackage, Gender, UserProfile } from './types';

export const INITIAL_FREE_CHATS = 5;
export const CREDIT_COST_INR = 50;

export const CREDIT_PACKAGES: CreditPackage[] = [
  { id: 'pkg_5', credits: 5, price: 250, label: 'Starter' },
  { id: 'pkg_10', credits: 10, price: 500, label: 'Popular' },
  { id: 'pkg_20', credits: 20, price: 1000, label: 'Pro' },
];

export const INTERESTS_LIST = [
  'Coffee', 'Hiking', 'Gaming', 'Movies', 'Tech', 
  'Music', 'Art', 'Foodie', 'Travel', 'Fitness', 
  'Photography', 'Reading', 'Nightlife', 'Pets'
];

// Mock users to populate the "Nearby" feed if no real users exist
export const MOCK_USERS: UserProfile[] = [
  {
    id: 'mock_1',
    username: 'Sarah J.',
    email: 'sarah@example.com',
    gender: Gender.Female,
    age: 24,
    about: 'Love exploring new cafes and city walks. Looking for a hiking buddy!',
    interests: ['Coffee', 'Hiking', 'Photography'],
    avatarUrl: 'https://picsum.photos/seed/sarah/200/200',
    credits: 0,
    isVisible: true,
    isPaused: false,
    location: { latitude: 0, longitude: 0 }, // Will be updated relative to user
    blockedUserIds: [],
    status: 'online'
  },
  {
    id: 'mock_2',
    username: 'Mike T.',
    email: 'mike@example.com',
    gender: Gender.Male,
    age: 28,
    about: 'Tech enthusiast and gym rat. Always up for a chat about crypto or coding.',
    interests: ['Tech', 'Fitness', 'Gaming'],
    avatarUrl: 'https://picsum.photos/seed/mike/200/200',
    credits: 0,
    isVisible: true,
    isPaused: false,
    location: { latitude: 0, longitude: 0 },
    blockedUserIds: [],
    status: 'away'
  },
  {
    id: 'mock_3',
    username: 'Alex R.',
    email: 'alex@example.com',
    gender: Gender.NonBinary,
    age: 22,
    about: 'Artist living in the city. Let\'s go to a museum?',
    interests: ['Art', 'Music', 'Nightlife'],
    avatarUrl: 'https://picsum.photos/seed/alex/200/200',
    credits: 0,
    isVisible: true,
    isPaused: false,
    location: { latitude: 0, longitude: 0 },
    blockedUserIds: [],
    status: 'online'
  },
  {
    id: 'mock_4',
    username: 'Jessica W.',
    email: 'jess@example.com',
    gender: Gender.Female,
    age: 26,
    about: 'Foodie at heart. Looking for someone to try the new sushi place with.',
    interests: ['Foodie', 'Travel', 'Movies'],
    avatarUrl: 'https://picsum.photos/seed/jess/200/200',
    credits: 0,
    isVisible: true,
    isPaused: false,
    location: { latitude: 0, longitude: 0 },
    blockedUserIds: [],
    status: 'offline'
  },
   {
    id: 'mock_5',
    username: 'David B.',
    email: 'david@example.com',
    gender: Gender.Male,
    age: 30,
    about: 'Musician and dog lover. Swipe right if you like golden retrievers.',
    interests: ['Music', 'Pets', 'Reading'],
    avatarUrl: 'https://picsum.photos/seed/david/200/200',
    credits: 0,
    isVisible: true,
    isPaused: false,
    location: { latitude: 0, longitude: 0 },
    blockedUserIds: [],
    status: 'online'
  }
];