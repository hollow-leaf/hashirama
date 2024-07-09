import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const walletConnectProjectId: string = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '330c035d80580970f3b5d53256331d89';
const providerKey: string = process.env.NEXT_PUBLIC_ALCHEMY_ID || '';

export const config:any = getDefaultConfig({
  transports: {
    [sepolia.id]: http(providerKey),
  },
    appName: 'My-first-dapp',
    projectId: walletConnectProjectId,
    chains: [sepolia],
    ssr: true,
  });
