import React, { useEffect, useState } from 'react'

import { ElvWalletClient } from "@eluvio/elv-client-js/src/walletClient/index";
import { MarketplaceLoader } from "./MarketplaceLoader.js";
const marketplaceParams = MarketplaceLoader.parseMarketplaceParams();


const mode = "staging";
const network = "main";
const walletAppUrl = "https://core.test.contentfabric.io/wallet";
const AuthSection = (walletClient:any) => {
	const [loggedIn, setLoggedIn] = useState(walletClient.loggedIn);

	const LogIn = async ( method:any ) => {
		await walletClient.LogIn({
			method,
			callbackUrl: window.location.href,
			marketplaceParams,
			clearLogin: true,
		});

		if (method !== "redirect") {
			setLoggedIn(true);
		}
	};

	const LogOut = async () => {
		await walletClient.LogOut();
		setLoggedIn(false);
	};

	if (!loggedIn) {
		return (
			<div className="section">
				<div className="button-row">
					<button onClick={() => LogIn({ method: "redirect" })}>
						Login
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="section">
				<h2>
					Logged In as{" "}
					{walletClient.UserInfo()?.email ||
						walletClient.UserAddress()}
				</h2>
				<div className="button-row">
					<button onClick={() => LogOut()}>Log Out</button>
				</div>
			</div>
			<br />
		</>
	);
};


const Connect2Eluvio = () => {

    const [walletClient, setWalletClient] = useState(undefined);
	useEffect(() => {
		ElvWalletClient.Initialize({
			network,
			mode,
			//marketplaceParams
		}).then((client:any) => {
			client.walletAppUrl = walletAppUrl;

			window.client = client;

			// Replace CanSign method to force popup flow for personal sign with custodial wallet user
			client.CanSign = () =>
				client.loggedIn &&
				client.UserInfo().walletName.toLowerCase() === "metamask";

			setWalletClient(client);
		});
	}, []);

	if (!walletClient) {
		return (
			<div className="app">
				<PageLoader />
			</div>
		);
	}

  return (
    <div>Connect2Eluvio</div>
  )
}

export default Connect2Eluvio