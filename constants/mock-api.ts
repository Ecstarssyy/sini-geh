////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter"; // For filtering
import { faker } from "@faker-js/faker";

// Define the shape of User data

type Gender = "male" | "female";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude: number;
  latitude: number;
  gender: Gender;
  date_of_birth: string;
  job: string;
  profile_picture: string;
};

// Mock user data store
export const fakeUsers = {
  records: [] as User[], // Holds the list of user objects

  // Initialize with sample data
  initialize() {
    const sampleUsers: User[] = [];
    function generateRandomUserData(id: number): User {
      const genders = ["male", "female"];
      const jobs = [
        "Software Engineer",
        "Data Scientist",
        "Marketing Manager",
        "Graphic Designer",
        "Sales Manager",
        "Product Manager",
      ];
      const cities = [
        "San Francisco",
        "New York City",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
        "Austin",
        "Jacksonville",
      ];
      const states = [
        "California",
        "New York",
        "Texas",
        "Florida",
        "Illinois",
        "Pennsylvania",
        "Ohio",
        "Georgia",
        "North Carolina",
        "Michigan",
      ];

      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: `${faker.internet.email()}`,
        phone: `001-${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 10000)}`,
        street: `${Math.floor(
          Math.random() * 1000
        )} ${faker.location.street()}`,
        city: faker.helpers.arrayElement(cities),
        state: faker.helpers.arrayElement(states),
        country: "USA",
        zipcode: faker.location.zipCode(),
        longitude: faker.location.longitude(),
        latitude: faker.location.latitude(),
        gender: faker.helpers.arrayElement(genders) as Gender,
        date_of_birth: faker.date
          .between({ from: "1980-01-01", to: "2000-01-01" })
          .toISOString()
          .split("T")[0],
        job: faker.helpers.arrayElement(jobs),
        profile_picture: `https://api.slingacademy.com/public/sample-users/${id}.png`,
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleUsers.push(generateRandomUserData(i));
    }

    this.records = sampleUsers;
  },

  // Get all users with optional gender filtering and search
  async getAll({
    genders = [],
    search,
  }: {
    genders?: string[];
    search?: string;
  }) {
    let users = [...this.records];

    // Filter users based on selected genders
    if (genders.length > 0) {
      users = users.filter((user) => genders.includes(user.gender));
    }

    // Search functionality across multiple fields
    if (search) {
      users = matchSorter(users, search, {
        keys: [
          "first_name",
          "last_name",
          "email",
          "job",
          "city",
          "street",
          "state",
          "country",
        ],
      });
    }

    return users;
  },

  // Get paginated results with optional gender filtering and search
  async getUsers({
    page = 1,
    limit = 10,
    genders,
    search,
  }: {
    page?: number;
    limit?: number;
    genders?: string;
    search?: string;
  }) {
    const gendersArray = genders ? genders.split(".") : [];
    const allUsers = await this.getAll({ genders: gendersArray, search });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers,
    };
  },
};

// Initialize sample users
fakeUsers.initialize();

// Define the shape of Product data
export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        "Electronics",
        "Furniture",
        "Clothing",
        "Toys",
        "Groceries",
        "Books",
        "Jewelry",
        "Beauty Products",
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: "2022-01-01", to: "2023-12-31" })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString(),
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search,
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ["name", "description", "category"],
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search,
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    const categoriesArray = categories ? categories.split(".") : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search,
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts,
    };
  },
};

// Initialize sample products
fakeProducts.initialize();

// Define the shape of Kuliner data
export type Kuliner = {
  id: number;
  name: string;
  qualityRating: number;
  priceRating: number;
  description: string;
  address: string;
  workingHours: {
    start: string;
    stop: string;
  };
  workingDays: string;
  gmapsLink: string;
  imageUrls: string[];
  createdAt: string;
};

// Mock kuliner data store
export const fakeKuliner = {
  records: [] as Kuliner[], // Holds the list of kuliner objects

  // Initialize with sample data
  initialize() {
    const sampleKuliner: Kuliner[] = [];
    function generateRandomKulinerData(id: number): Kuliner {
      const workingHours = {
        start: `${faker.number.int({ min: 6, max: 10 })}:00`, // Random start time between 6:00 - 10:00
        stop: `${faker.number.int({ min: 18, max: 22 })}:00`, // Random stop time between 18:00 - 22:00
      };

      return {
        id,
        name: faker.company.name(),
        qualityRating: faker.number.int({ min: 1, max: 5 }),
        priceRating: faker.number.int({ min: 1, max: 5 }),
        description: faker.commerce.productDescription(),
        address: faker.location.streetAddress(),
        workingHours,
        workingDays: "Monday-Saturday",
        gmapsLink: faker.internet.url(),
        imageUrls: [
          `https://api.slingacademy.com/public/sample-images/${id}.jpg`,
        ],
        createdAt: faker.date.past().toISOString(),
      };
    }

    // Generate 20 sample kuliner records
    for (let i = 1; i <= 20; i++) {
      sampleKuliner.push(generateRandomKulinerData(i));
    }

    this.records = sampleKuliner;
  },

  // Get all kuliner data with optional search
  async getAll({ search }: { search?: string }) {
    let kuliner = [...this.records];

    // Search functionality across multiple fields
    if (search) {
      kuliner = matchSorter(kuliner, search, {
        keys: ["name", "description", "address"],
      });
    }

    return kuliner;
  },

  // Get paginated results with optional search
  async getKuliner({
    page = 1,
    limit = 10,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const allKuliner = await this.getAll({ search });
    const totalKuliner = allKuliner.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedKuliner = allKuliner.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();
    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample kuliner data for testing and learning purposes",
      total_kuliner: totalKuliner,
      offset,
      limit,
      kuliner: paginatedKuliner,
    };
  },
};

// Initialize sample kuliner records
fakeKuliner.initialize();
