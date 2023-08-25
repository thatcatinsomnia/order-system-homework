import { Vender } from '../hooks/useVenders';
import { faker } from '@faker-js/faker';

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateFullAddress() {
  return `${faker.location.county()} ${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`;
}

function generateVender() {
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

export function generateVenders(count: number = 100): Vender[] {
  const fakeVenders = faker.helpers.multiple(generateVender, { count: count });

  return fakeVenders;
}
