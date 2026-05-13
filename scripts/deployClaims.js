const hre = require('hardhat');
const { run } = require('hardhat');

async function verify(address, constructorArguments) {
    console.log(`verify  ${address} with arguments ${constructorArguments.join(',')}`);
    await run('verify:verify', {
        address,
        constructorArguments
    });
}

async function main() {
    const signer = '0x12eF0F1C99D8FD50fFd37cCd12B09Ef7f1213269';
    // this is basically funds wallet, used for transferring funds when revoked claim
    const fundsWallet_To_Transfer_Revoked_Funds = '0x12eF0F1C99D8FD50fFd37cCd12B09Ef7f1213269';

    const Claims = await hre.ethers.deployContract('Claims', [signer, fundsWallet_To_Transfer_Revoked_Funds]);

    console.log('Deploying Claims...');
    await Claims.waitForDeployment();
    console.log('Claims deployed to:', Claims.target);

    await new Promise((resolve) => setTimeout(resolve, 20000));
    verify(Claims.target, [signer, fundsWallet_To_Transfer_Revoked_Funds]);
}

main();
