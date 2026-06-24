import { fetchContractSource } from '../src/lib/contract-fetcher';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log('Main function started');
  const address = process.argv[2] || '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // WETH
  console.log(`Fetching contract source for ${address}...`);

  try {
    const result = await fetchContractSource(address);
    console.log('fetchContractSource call completed');

    if (result.success) {
      console.log('Success!');
      console.log(`Contract Name: ${result.data?.name}`);
      console.log(`ABI length: ${result.data?.abi.length}`);
      console.log(`Source Code length: ${result.data?.sourceCode.length}`);
      console.log('Source Code preview:');
      console.log(result.data?.sourceCode.substring(0, 200) + '...');
    } else {
      console.error('Failed:', result.error);
    }
  } catch (err) {
    console.error('Caught error in main:', err);
  }
}

main();
