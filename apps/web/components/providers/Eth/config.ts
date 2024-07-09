import { createConfig, http } from 'wagmi'
import { zkSyncSepoliaTestnet } from 'wagmi/chains';

export const config:any = createConfig({
  transports: {
    [zkSyncSepoliaTestnet.id]: http('https://sepolia.era.zksync.dev'),
  },
  chains: [zkSyncSepoliaTestnet],
  ssr: true,
});
