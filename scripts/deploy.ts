import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
  const [deployer] = await ethers.getSigners();

  const Floppy = await ethers.getContractFactory('Floppy');
  const floppy = await Floppy.deploy();
  Config.setConfig(network + '.Floppy', floppy.address);

  const Vault = await ethers.getContractFactory('Vault');
  const vault = await Vault.deploy();
  Config.setConfig(network + '.Vault', vault.address);

  await Config.updateConfig();

  console.log('Floppy address:', floppy.address);
  console.log('Vault address:', vault.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
