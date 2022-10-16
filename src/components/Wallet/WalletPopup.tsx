import {
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { injected, walletconnect } from "../Hooks/connectors";
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { ethers, Signer } from "ethers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// import { ElvWalletClient } from "@eluvio/elv-client-js/src/walletClient";
import { MarketplaceLoader } from "./MarketplaceLoader.js";
const marketplaceParams = MarketplaceLoader.parseMarketplaceParams();

const mode = "staging";
const network = "main";
const walletAppUrl = "https://core.test.contentfabric.io/wallet";
declare var window: any;

export enum WalletConnector {
  MetaMask = "MetaMask",
  WalletConnect = "WalletConnect",
}

export interface UserWalletProps {
  navBar?: boolean;
  id: number;
}

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: ()=>Promise<void>;
  on: (event: PhantomEvent, callback: (args:any)=>void) => void;
  isPhantom: boolean;
}

type WindowWithSolana = Window & { 
  solana?: PhantomProvider;
}

export default function WalletPopup({ id, navBar = false }: UserWalletProps) {
  const context = useWeb3React();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [thisConnected, setThisConnected] = useState(false);
  const [selectedConnector, setSelectedConnector] =
    useState<WalletConnector | null>(
      window.localStorage.getItem("wallectConnector") as WalletConnector,
    );
  const { library, account, active, activate, chainId, error, deactivate } =
    context;
  const toast = useToast();
  const [ walletAvail, setWalletAvail ] = useState(false);
  const [ provider, setProvider ] = useState<PhantomProvider | null>(null);
  const [ connected, setConnected ] = useState(false);
  const [ pubKey, setPubKey ] = useState<PublicKey | null>(null);
  const [walletClient, setWalletClient] = useState<any>(null);
	// useEffect(() => {
	// 	ElvWalletClient.Initialize("").then((client:any) => {
	// 		client.walletAppUrl = walletAppUrl;

	// 		window.client = client;

	// 		// Replace CanSign method to force popup flow for personal sign with custodial wallet user
	// 		client.CanSign = () =>
	// 			client.loggedIn &&
	// 			client.UserInfo().walletName.toLowerCase() === "metamask";

	// 		setWalletClient(client);
	// 	});
	// }, []);

  useEffect(()=>{
    if ("solana" in window) {
        const solWindow = window as WindowWithSolana;
        if (solWindow?.solana?.isPhantom) {
            setProvider(solWindow.solana);
            setWalletAvail(true);
            // Attemp an eager connection
            solWindow.solana.connect({ onlyIfTrusted: true });
        }
    }
  }, []);

  useEffect(() => {
    if (!selectedConnector) {
      return;
    }
    try {
      var wallets = JSON.parse(window.localStorage.getItem("connectedWallets"));
      for (var wallet of wallets) {
        if (wallet === id) setThisConnected(true);
      }
    } catch {
      window.localStorage.setItem("connectedWallets", "[]");
    }
    if (selectedConnector === WalletConnector.MetaMask) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true);
        }
      });
    }
  }, [activate]);

  useEffect( () => {
    provider?.on("connect", (publicKey: PublicKey)=>{ 
        console.log(`connect event: ${publicKey}`);
        setConnected(true); 
        setPubKey(publicKey);
    });
    provider?.on("disconnect", ()=>{ 
        console.log("disconnect event");
        setConnected(false); 
        setPubKey(null);
    });

  }, [provider]);

  const availableWallets = [
    ["MetaMask", "Wallet Connect"],
    ["Phantom", "Sollet"],
    ["Connect Eluvio"],
    ["MetaMask", "AVAX Wallet"],
    ["Martian", "Petra", "Fewcha"],
  ];

  const handleChangeAccount = () => {
    deactivate();
    window.localStorage.removeItem("wallectConnector");
    setIsOpen(true);
  };

  const handleDisconnect = () => {
    deactivate();
    window.localStorage.removeItem("wallectConnector");
    navigate("/");
  };

  const handleSwitchNetwork = async (networkId: number) => {
    try {
      if ((window as any).web3?.currentProvider) {
        await (window as any).web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${networkId.toString(16)}` }],
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message
          ? `${error.message.substring(0, 120)}...`
          : "Please switch to etherum mainnet to proceed the payment",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  };

  const handleActivate = (wallectConnector: WalletConnector | null) => {
    window.localStorage.setItem(
      "wallectConnector",
      wallectConnector || WalletConnector.MetaMask,
    );
    setSelectedConnector(wallectConnector);
    console.log(wallectConnector);
    activate(
      wallectConnector === WalletConnector.WalletConnect
        ? walletconnect
        : injected,
    );
    if (isOpen) navigate("/explore-1");
    setIsOpen(false);
  };

  const connectHandler = async (id: number, wallet_n: string) => {
    if (wallet_n === "MetaMask") {
      await signInMetaMask();
    } else if (wallet_n === "Phantom") {
      await signInPhantom();
    } else if (wallet_n === "Connect Eluvio"){
      await signInEluvio();
    }
      toast({
        title: "Connected!",
        description: `Successfully connected ${wallet_n}!`,
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    if (wallet_n === "MetaMask") {
      signInMetaMask();
    } else if (wallet_n === "Phantom") {
      console.log("Sign in Phantom")
      signInPhantom();
    }

    var wallets = [];
    try {
      wallets = JSON.parse(window.localStorage.getItem("connectedWallets"));
      for (var wallet of wallets) {
        if (wallet === id) setThisConnected(true);
      }
    } catch {
      window.localStorage.setItem("connectedWallets", "[]");
    }
    setIsOpen(false);

    // wallets.push(id);
    setThisConnected(true);
    window.localStorage.setItem("connectedWallets", JSON.stringify(wallets));
  };

  const disconnectHandler = (id: number) => {
    toast({
      title: "Disconnected!",
      description: `Wallet successfully disconnected!`,
      status: "success",
      duration: 2000,
      isClosable: false,
    });
    var wallets;
    try {
      wallets = JSON.parse(window.localStorage.getItem("connectedWallets"));
      for (var wallet of wallets) {
        if (wallet === id) setThisConnected(true);
      }
    } catch {
      window.localStorage.setItem("connectedWallets", "[]");
    }
    for (var i = 0; i < wallets.length; i++) {
      if (wallets[i] === id) wallets.splice(i, 1);
    }
    setThisConnected(false);
    window.localStorage.setItem("connectedWallets", JSON.stringify(wallets));
  };

  const signInMetaMask = async () => {
    console.log("sign in metamask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    const EthersProvider = new ethers.providers.Web3Provider(
      window.ethereum,
    ) as any;
  };

  const signInPhantom = async () => {
    console.log("Phantom handler")
    console.log(`connect handler`);
    console.log(provider)
    provider?.connect()
    .catch((err) => { console.error("connect ERROR:", err); });
  };

  const signInEluvio = async () => {
    console.log("Eluvio handler");
    console.log(`connect handler`);
    if (walletClient) {
      await walletClient.LogIn({
        method: "popup",
        callbackUrl: window.location.href,
        marketplaceParams,
        clearLogin: true,
      });
    }
    
 
  };

  const signOutEluvio = async () => {
    if (walletClient) {
      await walletClient.LogOut();
    }
    
  };
  

  const signOutMetaMask = () => {
    setDefaultAccount(null);
  };

  const signOutPhantom = () => {
    setDefaultAccount(null);
    console.log("disconnect handler");
    provider?.disconnect()
    .catch((err) => {console.error("disconnect ERROR:", err); });
  };

  const accountChangedHandler = (newAccount: React.SetStateAction<null>) => {
    setDefaultAccount(newAccount);
  };

  return (
    <Box>
      <ul className="navbar-nav action">
        <li className="nav-item ml-3">
          {thisConnected ? (
            <button
              className="btn ml-lg-auto btn-bordered-white"
              onClick={() => disconnectHandler(id)}
            >
              <i className="icon-wallet mr-md-2" />
              Disconnect Wallet
            </button>
          ) : (
            <button
              className="btn ml-lg-auto btn-bordered-white"
              onClick={() => setIsOpen(true)}
            >
              <i className="icon-wallet mr-md-2" />
              Wallet Connect
            </button>
          )}
        </li>
      </ul>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="ghost">
        <ModalOverlay />
        <ModalContent
          alignSelf={"center"}
          boxShadow={"2xl"}
          borderRadius={"20px"}
          px={1}
          pt={1}
          pb={1}
          w={"full"}
        >
          <div className="cardd single-wallet">
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">Connact a Wallet</h3>
              <p>
                Connect with one of our available wallet providers or create a
                new one
              </p>
            </div>
            <Stack mt={4} spacing={4}>
              <div className="container">
                <div className="row justify-content-center">
                  {availableWallets[id - 1].map((wallet) => {
                    return (
                      <ul className="navbar-nav action" key={wallet}>
                        <li className="nav-item ml-3">
                          <button
                            className="btn ml-lg-auto btn-bordered-white"
                            onClick={() => connectHandler(id, wallet)}
                          >
                            <i className="icon-wallet mr-md-2" />
                            {wallet}
                          </button>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </Stack>
          </div>
        </ModalContent>
      </Modal>
    </Box>
  );
}
