import React, { useEffect, useState } from "react";

/*
// import { ElvWalletClient } from "@eluvio/elv-client-js/src/walletClient";
import { MarketplaceLoader } from "./MarketplaceLoader.js";
const marketplaceParams = MarketplaceLoader.parseMarketplaceParams();

const mode = "staging";
const network = "main";
const walletAppUrl = "https://core.test.contentfabric.io/wallet";
const AuthSection = ({ walletClient }) => {
	const [loggedIn, setLoggedIn] = useState(walletClient.loggedIn);

	const LogIn = async (method) => {
		await walletClient.LogIn({
			method,
			callbackUrl: window.location.href,
			marketplaceParams,
			clearLogin: true,
		});
		setLoggedIn(walletClient.loggedIn);
	};

	const LogOut = async () => {
		await walletClient.LogOut();
		setLoggedIn(false);
	};

	if (!loggedIn) {
		return (
			<div className="section">
				<div className="button-row">
					<button onClick={() => LogIn({ method: "popup" })}>
						Login
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="section">
				<h2>Logged In as {walletClient.UserAddress()}</h2>
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
		}).then((client) => {
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
		return <div className="app">404</div>;
	}

	return (
		<>
			<div className="app">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h1>Eluvio Wallet</h1>
							<AuthSection walletClient={walletClient} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Connect2Eluvio;
*/