# Agg-X - The First Cross-chain NFT Aggregator and credential bridge

## Inspiration
The future of the blockchain will be multi-chain. Since each blockchain is an independent data island with its own ecosystem, it’s not easy to share data or assets across them. Despite the current solutions - bridges - that bridge ERC20 assets, there is still a big gap in NFTs. NFTs due to their collectible value (e.g. PFPs, lands) and rich utilities (e.g. gaming NFTs, membership passes), have become the most important identity authentication in the digital world. If I’m a big Axie player or a huge whale that holds a lot of Apes on Ethereum, I would be willing to get the same identity recognition or respect on other chains as I have on Ethereum, or I’ll also be willing to meet other similarly like-minded NFT collectors (e.g. Bear holders on Solana) for potential synergies. And that is the main inspiration for this project.

## What it does
Agg-X is the one-stop shop solution that aggregates NFTs and bridges the identity, reputation, and accomplishments across different blockchains. It has the following three main features:

As an all-in-one NFT gallery, Agg-X will be supporting the wallet connection from Ethereum, Solana, Eluv.io, Avalanche, and Aptos simultaneously and display all your collections on ONE page. The corresponding collection points will be issued per user along with data analytics services for better NFT and investment tracking.
As a decentralized social protocol, Agg-X allows you to meet fellow collectors or game players (utility NFTs woohoo) to view their collections and accomplishments across ALL chains. Think of it as a big social platform where you can view, follow, and interact with NFT collections all over the world.
As a credit and credential issuer, Agg-X will be issuing upgradable soul-bond tokens (SBT) on each blockchain as verified credentials to recognize people’s on-chain collections or accomplishments. Later, Agg-X will also be computing rarity scores and collection points via a DAO as a DID & on-chain credit solution for unlimited future applications like an undercollateralized credit-based lending protocol.

## How we build it
- Frontend in React.JS, Javascript, Typescript, HTML, CSS, Tailwind, ChakraUI, Bootstrap4
- Backend in Express.JS, Node.JS
- Web3 service providers: web3.JS, Web3-React, ethers.JS for accessing on-chain providers and fetching user’s NFT collection data (metamask and walletconnect)
- Blockchain service providers / SDKs: @eluvio SDK for accessing and displaying video NFTs, @solana/web3.js SDK for connecting Solana Phantom wallet and fetching user’s NFT collection data
- Database: CockroachDB (a distributed SQL DB) for storing structured user information (name, email, account, password, addresses, etc.)

## Challenges we ran into
- We ran into a lot of dependency issues while building SDK packages from eluvio sdk and Chakra UI
Connect wallet on other blockchains - especially Eluv.io & Solana - since both are completely new to us
- UI/UX details and responsive design were the part we spent the most time on
- Three-person collaborating and constantly fixing the merge conflicts was also a challenge when we were working on interrelated components or updating/installing packages at the same time
- React data flow - managing complex code base as well as the front logic & data flow between different components
- Eluv.io APIs and sample code are not documented well which took us a while to understand the samples
- CockroachDB has an extensive & complicated setup that the docs do not address clearly
- Connecting our backend service (in cockroach db) and the frontend in a localhost setting was also a bit challenging as we don’t have enough bandwidth to deploy the full backend

## Accomplishments that we're proud of
- The overall idea and our degree of completion! We have delivered a fully functional demo with great UI, and the idea of having NFT Aggregator + Credential Bridge has the infinite potential to unlock more and more user interactions and activities among the entire NFT & Blockchain ecosystem!
- Our fantastic UI brings the best user experience which also fits perfectly with the crypto vibe!

## What we learned
- Extensive knowledge of Cryptocurrency and NFTs.
- Experience with different wallet connectors (metamask, walletconnect, solana/phantom, eluvio)
- Extensive growth and experience in making great & responsive UI design
- Agile development in a three-person team and great practice for resolving merge conflicts and dependency issues
- Blockchain Full-stack development & deployment

## What’s Next
- Improvements in the speed and performance of fetching and collections from user’s wallet address
- Add more blockchain support including Ploygon, Arbitrum, Optimism, etc.
- Implement the credit / accomplishment score calculating system
- Define and implement the cross-chain credential standards (e.g. a proxy standard on ETH for storing NFT credentials from other blockchains)
- DAO governance on NFT rarity calculation (like TrueFi DAO) & core collectors’ community establishments
