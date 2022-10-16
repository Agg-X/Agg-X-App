
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { useToast, Box, Modal, ModalContent, ModalOverlay, Stack } from "@chakra-ui/react";
import { ethers, Signer } from "ethers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";


type PhantomEvent = "disconnect" | "connect" | "accountChanged";

declare var window: any;

export enum WalletConnector {
  MetaMask = "MetaMask",
  WalletConnect = "WalletConnect",
}

export interface UserWalletProps {
  navBar?: boolean;
}

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


export default function WalletPopup({ navBar = false }: UserWalletProps) {
  const context = useWeb3React();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
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



  useEffect( ()=>{
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

  const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(`connect handler`);
    provider?.connect()
    .catch((err) => { console.error("connect ERROR:", err); });
  }

  const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log("disconnect handler");
    provider?.disconnect()
    .catch((err) => {console.error("disconnect ERROR:", err); });
  }

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
        duration: 9000,
        isClosable: true,
      });
    }
  };


  const signInPhantom = () => {
    console.log("sign in phantom");
    const solanaProvider = new ethers.providers.Web3Provider(
      window.solana,
    ) as any;
  };

  const signOutMetaMask = () => {
    setDefaultAccount(null);
  };

  const accountChangedHandler = (newAccount: React.SetStateAction<null>) => {
    setDefaultAccount(newAccount);
  };

  return (
    <Box>
      <ul className="navbar-nav action">
        <li className="nav-item ml-3">
          <button
            className="btn ml-lg-auto btn-bordered-white"
            onClick={() => setIsOpen(true)}
          >
            <i className="icon-wallet mr-md-2" />
            Wallet Connect
          </button>
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
          {/* <Text textAlign={"center"} variant="title_3xl" color={"black"}>
            Connect a Wallet
          </Text> */}
          <div className="cardd single-wallet">
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">Connact a Wallet</h3>
              <p>
                Connect with one of our available wallet providers or create a
                new one
              </p>
            </div>
            {/* <Box mt={6}>
            <Text textAlign={"left"} variant="title_md" color={"black"}>
              Connect with one of our available wallet providers or create a new
              one
            </Text>
          </Box> */}
            <Stack mt={4} spacing={4}>
              <div className="container">
                <div className="row justify-content-center">
                  <ul className="navbar-nav action">
                    <li className="nav-item ml-3">
                      <button
                        className="btn ml-lg-auto btn-bordered-white"
                        onClick={() => signInPhantom()}
                      >
                        <i className="icon-wallet mr-md-2" />
                        Phantom
                      </button>
                    </li>
                  </ul>
                  <ul className="navbar-nav action">
                    <li className="nav-item ml-3">
                      <button className="btn ml-lg-auto btn-bordered-white">
                        <i className="icon-wallet mr-md-2" />
                        Wallet Connect
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </Stack>
          </div>
        </ModalContent>
      </Modal>
    </Box>
  );
}
