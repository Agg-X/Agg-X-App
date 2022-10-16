/**
 *  The MarketplaceLoader class handles calling the client.AvailableMarketplaces() function,
 *  and exposing the selections in the UI.  This is separated out here because in most actual apps, the
 *  tenant and marketplace will be fixed and this will be unnecessary.
 */
export class MarketplaceLoader {

  constructor(wallet, curMarketplaceParams) {
    this.walletClient = wallet;
    this.marketplaceParams = curMarketplaceParams;
  }

  /**
   * Loads an existing <select id="marketplaceSelector"> element with marketplace selection options
   * using the walletClient AvailableMarketplaces() API.
   * @returns {Promise}
   */
  async loadMarketplaces() {
    await this.walletClient.AvailableMarketplaces()
      .catch(err => { return err; })
      .then(marketplaces => {
        let select = document.getElementById("marketplaceSelector");
        if(!select || select?.hasChildNodes()) {
          return;
        }

        window.console.log("load marketplaces[" + Object.keys(marketplaces).length + "]:", marketplaces);
        for(const contents of Object.values(marketplaces)) {
          for(const value of Object.values(contents)) {
            if(typeof value === "object" && "marketplaceSlug" in value && "tenantSlug" in value) {
              let el = document.createElement("option");
              el.textContent = this.display(value.tenantSlug, value.marketplaceSlug);
              el.value = value.tenantSlug + "/" + value.marketplaceSlug;
              select.appendChild(el);
            }
          }
        }
        select.value = this.marketplaceParams.tenantSlug + "/" + this.marketplaceParams.marketplaceSlug;
      });
  }

  /**
   * Set tenant name and marketplace name in url, and reloads to use them.
   */
  setMarketplace(event) {
    const [tenant, market] = event.target.value.split("/");
    const url = new URL(window.location.href);

    url.searchParams.set("tenant-name", tenant);
    url.searchParams.set("marketplace-name", market);
    window.history.replaceState("", "", url.toString());
    window.location = url;
  };

  /**
   * Parse tenant name and marketplace name from url, or default if unset.
   * @returns a marketplaceParams object for use in client construction.
   */
  static parseMarketplaceParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const [tenantDefault, marketplaceDefault] = [ "bcl", "maskverse-marketplace" ] 

    const marketplaceParams = {
      tenantSlug: searchParams.get("tenant-name") || tenantDefault,
      marketplaceSlug: searchParams.get("marketplace-name") || marketplaceDefault,
      toString: function() { return this.tenantSlug + "/" + this.marketplaceSlug; },
    };
    window.console.log("marketplaceParams", marketplaceParams);

    return marketplaceParams;
  }

  display(tenant, marketplace) { return "Selected Marketplace: " + tenant + "/" + marketplace; }

  static networkNumber(networkName) {
    return networkName == "main" ? "955305" : "955210";
  }
}
