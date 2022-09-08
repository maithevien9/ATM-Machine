require('dotenv').config();
const Web3 = require('web3');
const flopAbi = require('../contracts/floppy.json');
const vaultAbi = require('../contracts/vault.json');

class SmartContractDAO {
  constructor() {
    this.web3 = new Web3('https://rinkeby.infura.io/v3/dfa0ac92ee7d4249869fa1bcf942922d');
    this.token_address = process.env.TOKEN_ADDRESS;
    this.vault_address = process.env.VAULT_ADDRESS;
    this.withdrawer_private_key = process.env.WITHDRAWER_PRIVATE_KEY;
    this.withdrawer_address = process.env.WITHDRAWER_ADDRESS_ADDRESS;
  }

  async withdraw(address, amount) {
    this.web3.eth.accounts.wallet.add(this.withdrawer_private_key);
    const vault_contract = await new this.web3.eth.Contract(vaultAbi, this.vault_address);

    var value = Web3.utils.toWei(amount.toString());

    var rs = await vault_contract.methods.withdraw(value, address).send({
      from: '0xFd68bc72B6D2d6619f3729C531EFA4213EE8868d',
      gas: 3000000,
    });

    return rs.transactionHash;
  }
}

module.exports = SmartContractDAO;
