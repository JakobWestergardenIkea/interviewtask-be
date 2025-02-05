import { promises as fs } from 'fs';
import axios from 'axios';

const baseApiUrl = 'http://localhost:3002/';

async function readFileAndPost(filePath: string, api: string) {
  const apiUrl = baseApiUrl + api;
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const items = data
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const postPromises = items.map((item) =>
      axios
        .post(apiUrl, { name: item })
        .then(() => {
          console.log(`Successfully posted ${item}`);
        })
        .catch((error) => {
          console.error(`Failed to post ${item}:`, error);
        }),
    );

    await Promise.all(postPromises);
  } catch (error) {
    console.error(`Failed to post to ${apiUrl}.`, error);
  }
}

async function main() {
  await Promise.all([
    readFileAndPost('./load_database/colour.txt', 'colours'),
    readFileAndPost('./load_database/product-type.txt', 'product-types'),
  ]);

  console.log('Database loading complete.');
}

main().catch((error) => console.error('Error in loading database:', error));
