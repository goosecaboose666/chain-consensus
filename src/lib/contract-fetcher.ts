import axios from 'axios';

export interface ContractSource {
  name: string;
  sourceCode: string;
  abi: string;
  compilerVersion: string;
  optimizationUsed: boolean;
  runs: number;
  constructorArguments: string;
  evmVersion: string;
  library: string;
  licenseType: string;
  proxy: boolean;
  implementation: string;
  swarmSource: string;
}

export interface FetchResult {
  success: boolean;
  data?: ContractSource;
  error?: string;
}

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

export async function fetchContractSource(address: string): Promise<FetchResult> {
  if (!address || !address.startsWith('0x') || address.length !== 42) {
    return { success: false, error: 'Invalid Ethereum address' };
  }

  if (!ETHERSCAN_API_KEY) {
    console.warn('ETHERSCAN_API_KEY is not set. API calls might fail or be rate-limited.');
  }

  try {
    const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${ETHERSCAN_API_KEY || ''}`;
    const response = await axios.get(url);
    console.log('Etherscan response status:', response.data.status);
    console.log('Etherscan response message:', response.data.message);

    if (response.data.status !== '1') {
      return { success: false, error: response.data.message || 'Failed to fetch from Etherscan' };
    }

    const result = response.data.result[0];

    if (!result.SourceCode) {
      return { success: false, error: 'Contract source code not verified on Etherscan' };
    }

    let sourceCode = result.SourceCode;

    // Etherscan returns SourceCode in different formats:
    // 1. Single file: string
    // 2. Multiple files (JSON): {{ ... }}
    // 3. Multiple files (standard JSON input): { ... }

    // Clean up double braces if present
    if (sourceCode.startsWith('{{') && sourceCode.endsWith('}}')) {
      sourceCode = sourceCode.slice(1, -1);
    }

    return {
      success: true,
      data: {
        name: result.ContractName,
        sourceCode: sourceCode,
        abi: result.ABI,
        compilerVersion: result.CompilerVersion,
        optimizationUsed: result.OptimizationUsed === '1',
        runs: parseInt(result.Runs),
        constructorArguments: result.ConstructorArguments,
        evmVersion: result.EVMVersion,
        library: result.Library,
        licenseType: result.LicenseType,
        proxy: result.Proxy === '1',
        implementation: result.Implementation,
        swarmSource: result.SwarmSource,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during fetching',
    };
  }
}
