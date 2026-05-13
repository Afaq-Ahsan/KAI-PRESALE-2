
const hre = require('hardhat');
const { run } = require('hardhat');

require('dotenv').config();

async function verify(address, constructorArguments) {
    console.log(`verify  ${address} with arguments ${constructorArguments.join(',')}`);
    await run('verify:verify', {
        address,
        constructorArguments
    });
}

async function main() {
    
    const projectWallet = process.env.PROJECT_WALLET;
    const platFormWallet = process.env.PLATFORM_WALLET;
    const burnWallet = process.env.BURN_WALLET;
    const signer = process.env.SIGNER;
    const claim = process.env.CLAIMS;
    const lockup = process.env.LOCKUP;
    const subscription = process.env.SUBSCRIPTION;
    const owner = process.env.OWNER;
    const lastround = process.env.LAST_ROUND;
    const maxCap = process.env.MAX_CAP;

    const PreSale = await hre.ethers.deployContract(
        'PreSale',
        [projectWallet, platFormWallet, burnWallet, signer, claim, lockup, subscription, owner, lastround, maxCap],
        {
            gasLimit: 6000000
        }
    );

    console.log('Deploying PreSale...');
    await PreSale.waitForDeployment();
    console.log('PreSale deployed to:', PreSale.target);

    await new Promise((resolve) => setTimeout(resolve, 20000));
    verify(PreSale.target, [
        projectWallet,
        platFormWallet,
        burnWallet,
        signer,
        claim,
        lockup,
        subscription,
        owner,
        lastround,
        maxCap
    ]);
}

main();
