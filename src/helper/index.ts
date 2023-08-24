import { Shop } from '../hooks/useVenders';
import { faker } from '@faker-js/faker';

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateFullAddress() {
  return `${faker.location.county()} ${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`;
}

function generateShop() {
  const id = faker.database.mongodbObjectId();
  const name = faker.company.name();
  const location = generateFullAddress();
  const image = faker.image.urlPicsumPhotos();

  return {
    id,
    name,
    location,
    image
  };
}

export function generateShops(count: number = 100): Shop[] {
  const fakeShops = faker.helpers.multiple(generateShop, { count: count });

  return fakeShops;
}
