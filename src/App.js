import { ethers } from "ethers";
import "./App.css";

function App() {
  const polygonscan_apikey = "";

  async function mainnetMakeTx(event) {
    event.preventDefault();
    try {
      const provider = ethers.getDefaultProvider(
        "https://rpc-mainnet.maticvigil.com/"
      );
      const walletInstance = new ethers.Wallet(
        event.target.privateKey.value,
        ethers.getDefaultProvider("https://rpc-mainnet.maticvigil.com/")
      );

      console.log(walletInstance);
      console.log(
        ethers.utils.formatEther(await walletInstance.getBalance()),
        "MATIC"
      );
      let response = await fetch("https://gasstation-mainnet.matic.network/v2");
      let json = await response.json();

      let feeData = await provider.getFeeData();
      console.log(feeData);

      const maticTxFee =
        ((ethers.utils.parseUnits(`${Math.ceil(json.fast.maxFee)}`, "gwei") /
          1000000000) *
          21000) /
        1000000000;

      if (ethers.utils.isAddress(event.target.walletAddress.value) == true) {
        let txConfirmation = window.confirm(
          "You are about to send " +
            event.target.amount.value +
            " MATIC" +
            " to " +
            event.target.walletAddress.value +
            ". This transaction will cost a fee of " +
            maticTxFee +
            " MATIC" +
            ", Do you wish to proceed?"
        );
        if (txConfirmation) {
          console.log(json);

          const tx = {
            to: event.target.walletAddress.value,
            value: ethers.utils.parseEther(event.target.amount.value),

            maxFeePerGas: ethers.utils.parseUnits(
              `${Math.ceil(json.fast.maxFee)}`,
              "gwei"
            ),
            maxPriorityFeePerGas: ethers.utils.parseUnits(
              `${Math.ceil(json.fast.maxPriorityFee)}`,
              "gwei"
            ),
          };
          console.log("Processing");
          const x = await walletInstance.sendTransaction(tx);
          console.log("Pending Confirmation...");
          await x.wait();
          console.log(x);
          alert(
            "Your transaction of " +
              event.target.amount.value +
              " MATIC" +
              " to " +
              event.target.walletAddress.value +
              " has been completed!"
          );
          console.log("Success");
          console.log(x);
        } else {
          alert("This operation has been cancelled");
        }
      } else {
        console.log("Invalid Address!");
        console.log("Invalid Address");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function mumbaiMakeTx(event) {
    event.preventDefault();
    try {
      const provider = ethers.getDefaultProvider(
        "https://rpc-mainnet.maticvigil.com/"
      );
      const walletInstance = new ethers.Wallet(
        event.target.privateKey.value,
        ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com/")
      );

      console.log(walletInstance);
      console.log(
        ethers.utils.formatEther(await walletInstance.getBalance()),
        "MATIC"
      );

      let response = await fetch("https://gasstation-mainnet.matic.network/v2");
      let json = await response.json();

      let feeData = await provider.getFeeData();
      console.log(feeData);

      const maticTxFee =
        ((ethers.utils.parseUnits(`${Math.ceil(json.fast.maxFee)}`, "gwei") /
          1000000000) *
          21000) /
        1000000000;

      if (ethers.utils.isAddress(event.target.walletAddress.value) == true) {
        let txConfirmation = window.confirm(
          "You are about to send " +
            event.target.amount.value +
            " MATIC" +
            " to " +
            event.target.walletAddress.value +
            ". This transaction will cost a fee of " +
            maticTxFee +
            " MATIC" +
            ", Do you wish to proceed?"
        );
        if (txConfirmation) {
          console.log(json);

          const tx = {
            to: event.target.walletAddress.value,
            value: ethers.utils.parseEther(event.target.amount.value),

            maxFeePerGas: ethers.utils.parseUnits(
              `${Math.ceil(json.fast.maxFee)}`,
              "gwei"
            ),
            maxPriorityFeePerGas: ethers.utils.parseUnits(
              `${Math.ceil(json.fast.maxPriorityFee)}`,
              "gwei"
            ),
          };
          console.log("Processing");
          const x = await walletInstance.sendTransaction(tx);
          console.log("Pending Confirmation...");
          await x.wait();
          console.log(x);
          alert(
            "Your transaction of " +
              event.target.amount.value +
              " MATIC" +
              " to " +
              event.target.walletAddress.value +
              " has been completed!"
          );
          console.log("Success");
          console.log(x);
        } else {
          alert("This operation has been cancelled");
        }
      } else {
        console.log("Invalid Address!");
        console.log("Invalid Address");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function mainnetViewAddressTx(event) {
    event.preventDefault();
    try {
      await fetch(
        `https://api.polygonscan.com/api?module=account&action=txlist&address=${event.target.walletAddress.value}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${polygonscan_apikey}`,
        { credentials: "omit" }
      )
        .then((resp) => resp.text())
        .then((text) => {
          const tx = JSON.parse(text).result;
          console.log(tx);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function mumbaiViewAddressTx(event) {
    event.preventDefault();
    try {
      await fetch(
        `https://api-mumbai.polygonscan.com/api?module=account&action=txlist&address=${event.target.walletAddress.value}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${polygonscan_apikey}`,
        { credentials: "omit" }
      )
        .then((resp) => resp.text())
        .then((text) => {
          const tx = JSON.parse(text).result;
          console.log(tx);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {" "}
        POLYGON ACADEMY MID TERM ASSIGNMENT 1
      </header>

      <p></p>

      <body>
        <div> POLYGON MAINNET </div>
        <form onSubmit={mainnetMakeTx}>
          <input type="text" id="privateKey" placeholder="Private Key" />
          <input type="text" id="walletAddress" placeholder="Wallet Address" />
          <input type="text" id="amount" placeholder="Amount in MATIC" />
          <button type="submit"> Import privateKey</button>
        </form>
        <p></p>
        <form onSubmit={mainnetViewAddressTx}>
          <input type="text" id="walletAddress" placeholder="Wallet Address" />
          <button type="submit"> View Transactions</button>
        </form>

        <p></p>

        <div> MUMBAI TESTNET </div>
        <form onSubmit={mumbaiMakeTx}>
          <input type="text" id="privateKey" placeholder="Private Key" />
          <input type="text" id="walletAddress" placeholder="Wallet Address" />
          <input type="text" id="amount" placeholder="Amount in MATIC" />
          <button type="submit"> Import privateKey</button>
        </form>
        <p></p>
        <form onSubmit={mumbaiViewAddressTx}>
          <input type="text" id="walletAddress" placeholder="Wallet Address" />
          <button type="submit"> View Transactions</button>
        </form>
      </body>
    </div>
  );
}

export default App;
