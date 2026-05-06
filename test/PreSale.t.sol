// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import { Test, console } from "../lib/forge-std/src/Test.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { MessageHashUtils } from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import { ILockup, ISubscription, IPreSale } from "../contracts/ILockup.sol";

import "../contracts/Common.sol";

import { AggregatorV3Interface, TokenRegistry } from "../contracts/TokenRegistry.sol";
import { PreSale } from "../contracts/PreSale.sol";
import { Claims } from "../contracts/Claims.sol";
import { Rounds } from "../contracts/Rounds.sol";
import { Lockup } from "./lockup/Lockup.sol";
import { Subscription } from "./subscription/Subscription.sol";
import { IClaims, ClaimInfo } from "../contracts/IClaims.sol";

contract PreSaleTest is Test {
    using MessageHashUtils for bytes32;
    using SafeERC20 for IERC20;

    error OwnableUnauthorizedAccount(address);

    string code = "12345";
    uint32 round = 2;
    uint256 minAmount = 1;

    uint256 roundPrice = 1000000000000000000;

    IERC20 USDT;
    IERC20 USDC;
    IERC20 GEMS;
    IERC20 STAT;

    address[] leaders;
    uint256[] percentages;

    uint256 privateKey;
    address signer;
    PreSale public preSale;
    address caller;
    PreSale.TokenInfo ethInfo;
    PreSale.TokenInfo usdtInfo;
    address[] fundsWalletAddresses;
    address signerAddress;
    Claims public claimsContractAddress;
    Lockup public lockupContractAddress;
    Subscription public subscriptionContractAddress;
    address owner;
    address user;
    address usdtWallet;
    address usdcWallet;
    address projectWallet;
    address platformWallet;
    address burnWallet;
    uint32 lastRound;

    function setUp() public {
        USDC = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
        USDT = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
        GEMS = IERC20(0x3010ccb5419F1EF26D40a7cd3F0d707a0fa127Dc);
        STAT = IERC20(0xF24970354d7229Ca736E60d8d9F5E6F7FB5B36ef); // Mock Token

        fundsWalletAddresses = [
            0x19A865ab3A6E9DD7ac716891B0080b2cB3ffb9fa,
            0x395bFD879A3AE7eC4E469e26c8C1d7BB2F9d77B9,
            0xF14aEB1Cb06c674B58D87D2Cc2dfc4b1e9f4EdB6
        ];

        leaders = [
            0x12eF0F1C99D8FD50fFd37cCd12B09Ef7f1213269,
            0x19A865ab3A6E9DD7ac716891B0080b2cB3ffb9fa,
            0x395bFD879A3AE7eC4E469e26c8C1d7BB2F9d77B9,
            0xF14aEB1Cb06c674B58D87D2Cc2dfc4b1e9f4EdB6,
            0xC0FC8954c62A45c3c0a13813Bd2A10d88D70750D
        ];

        percentages = [25000, 25000, 25000, 25000, 25000];

        signerAddress = 0x12eF0F1C99D8FD50fFd37cCd12B09Ef7f1213269;
        owner = 0x19A865ab3A6E9DD7ac716891B0080b2cB3ffb9fa;
        user = 0x12eF0F1C99D8FD50fFd37cCd12B09Ef7f1213269;

        privateKey = vm.envUint("PRIVATE_KEY_SEPOLIA");
        signer = vm.addr(privateKey);
        caller = 0x19A865ab3A6E9DD7ac716891B0080b2cB3ffb9fa;
        usdtWallet = 0xe1E13A8D3d5B1596dc8849aE35c9f410A4aB49D1;
        usdcWallet = 0x5414d89a8bF7E99d732BC52f3e6A3Ef461c0C078;
        projectWallet = 0x7b3A848119f61B88a7E505A107ABdA6414c50941;
        platformWallet = 0x2D88285d59C07ed0fA8E7E72964440071d2960ED;
        burnWallet = 0xDbd9023E5F8c8E1c95a8A418E0D220E06A3CA7BA;
        deal(caller, 100000000000000000000000e18); // Give caller an ETH balance of 1e23 * 1e18
        deal(user, 100000000000000000000000e18);
        deal(address(GEMS), user, 8000000 * 1e18); // Give caller an GEMS balance
        deal(address(USDT), user, 8000000 * 1e6);

        lastRound = 1;

        claimsContractAddress = new Claims(signerAddress, usdtWallet);
        lockupContractAddress = new Lockup(USDT, 1, (block.timestamp + 2 minutes), owner);
        subscriptionContractAddress = new Subscription(owner, user, owner, GEMS, 400000000);
        preSale = new PreSale(
            projectWallet,
            platformWallet,
            burnWallet,
            signerAddress,
            Claims(claimsContractAddress),
            ILockup(address(lockupContractAddress)),
            ISubscription(address(subscriptionContractAddress)),
            owner,
            lastRound,
            5250000000000000000000000000
        );

        claimsContractAddress.updatePresaleAddress(IPreSale(address(preSale))); //set the presale address
        claimsContractAddress.grantRole(claimsContractAddress.COMMISSIONS_MANAGER(), owner);

        vm.startPrank(owner);
        preSale.createNewRound(block.timestamp, block.timestamp + 10 minutes, roundPrice); //creating new round
        IERC20[] memory tokens = new IERC20[](4);
        tokens[0] = IERC20(ETH);
        tokens[1] = USDT;
        tokens[2] = USDC;
        tokens[3] = GEMS;

        bool[] memory accesses = new bool[](4);
        accesses[0] = true;
        accesses[1] = true;
        accesses[2] = true;
        accesses[3] = true;

        uint256[] memory cPrice = new uint256[](4); //current price
        cPrice[0] = 0;
        cPrice[1] = 0;
        cPrice[2] = 0;
        cPrice[3] = 0;

        preSale.updateAllowedTokens(2, tokens, accesses, cPrice);

        TokenRegistry.PriceFeedData[] memory priceFeedData = new TokenRegistry.PriceFeedData[](2);
        priceFeedData[0] = TokenRegistry.PriceFeedData({
            priceFeed: AggregatorV3Interface(0x3E7d1eAB13ad0104d2750B8863b489D65364e32D),
            normalizationFactorForToken: 22,
            tolerance: 172800
        });
        priceFeedData[1] = TokenRegistry.PriceFeedData({
            priceFeed: AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419),
            normalizationFactorForToken: 10,
            tolerance: 7200
        });

        IERC20[] memory tok = new IERC20[](2);
        tok[0] = IERC20(USDT);
        tok[1] = IERC20(ETH);

        preSale.setTokenPriceFeed(tok, priceFeedData);

        usdtInfo = preSale.getLatestPrice(USDT);
        ethInfo = preSale.getLatestPrice(IERC20(ETH));

        vm.stopPrank();

        vm.startPrank(usdtWallet);
        USDT.safeTransfer(user, USDT.balanceOf(usdtWallet));
        vm.stopPrank();

        vm.startPrank(user);
        USDT.forceApprove(address(this), USDT.balanceOf(user));
        vm.stopPrank();

        vm.startPrank(usdcWallet);
        USDC.safeTransfer(user, USDC.balanceOf(usdcWallet));
        vm.stopPrank();

        vm.startPrank(user);
        USDC.forceApprove(address(this), USDC.balanceOf(user));
        vm.stopPrank();
    }

    function testPurchaseTokenWithETH() public {
        uint256 expectedProjectFunds;
        uint256 expectedPlatformfunds;
        uint256 expectedBurnFunds;
        uint256 expectedClaimsFunds;
        uint256 expectedPendingClaims;
        uint256 expectedTotalPercentage = 0;

        uint256 leaderPercentageAmount = (percentages[0]) +
            (percentages[1]) +
            (percentages[2]) +
            (percentages[3]) +
            (percentages[4]);

        uint256[] memory previousLeaderClaims = new uint256[](leaders.length);

        (uint8 v, bytes32 r, bytes32 s) = _signWithETH();
        uint256 deadline = block.timestamp + 2 minutes;

        // uint256 investment = 0.105 ether;
        uint256 investment = 120 ether;

        vm.startPrank(signer);
        (v, r, s) = _signWithETH();
        vm.stopPrank();

        _lockupStake();
        _subscribe();
        console.log("subscribed");
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;

        //leader previous claim
        for (uint256 i = 0; i < leaders.length; ++i) {
            previousLeaderClaims[i] = claimsContractAddress.pendingClaims(leaders[i], round, IERC20(ETH));
        }

        uint256 sumPercentage;
        uint256 remainingPercentageAmount;
        for (uint256 j; j < percentages.length; ++j) {
            sumPercentage += percentages[j];
        }

        expectedClaimsFunds = (investment * 250_000) / PPM;

        uint256 sumPercentageAmount = (investment * sumPercentage) / PPM;

        if (sumPercentage < 250_000) {
            remainingPercentageAmount = expectedClaimsFunds - sumPercentageAmount;
        }
        expectedClaimsFunds -= remainingPercentageAmount;
        expectedPlatformfunds = remainingPercentageAmount;

        expectedProjectFunds = (investment * 630000) / PPM;
        expectedPlatformfunds += (investment * 100000) / PPM;
        expectedBurnFunds += (investment * 20000) / PPM;

        vm.startPrank(user);
        preSale.purchaseTokenWithETH{ value: investment }(
            code,
            round,
            deadline,
            minAmount,
            indexes,
            leaders,
            percentages,
            v,
            r,
            s
        );

        for (uint256 i = 0; i < leaders.length; ++i) {
            expectedPendingClaims = (investment * percentages[i]) / PPM;
            expectedTotalPercentage += percentages[i];
            assertEq(
                claimsContractAddress.pendingClaims(leaders[i], round, IERC20(ETH)) - previousLeaderClaims[i],
                expectedPendingClaims,
                "leader fund amount "
            );
        }
        assertEq(expectedTotalPercentage, leaderPercentageAmount, "leader percentage contract");
    }

    function testPurchaseTokenWithUSDT() public {
        uint256 expectedProjectFunds;
        uint256 expectedPlatformfunds;
        uint256 expectedBurnFunds;
        uint256 expectedClaimsFunds;

        uint256[] memory previousLeaderClaims = new uint256[](leaders.length);

        (uint8 v, bytes32 r, bytes32 s) = _signWithToken();
        uint256 deadline = block.timestamp + 2 minutes;

        uint256 investment = 0.105 ether;

        vm.startPrank(signer);
        (v, r, s) = _signWithToken();
        vm.stopPrank();

        _lockupStake();
        _subscribe();
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;

        //leader previous claim
        for (uint256 i = 0; i < leaders.length; ++i) {
            previousLeaderClaims[i] = claimsContractAddress.pendingClaims(leaders[i], round, IERC20(USDT));
        }

        uint256 sumPercentage;
        uint256 remainingPercentageAmount;
        for (uint256 j; j < percentages.length; ++j) {
            sumPercentage += percentages[j];
        }

        expectedClaimsFunds = (investment * 250_000) / PPM;
        uint256 sumPercentageAmount = (investment * sumPercentage) / PPM;

        if (sumPercentage < 250_000) {
            remainingPercentageAmount = expectedClaimsFunds - sumPercentageAmount;
        }
        expectedClaimsFunds -= remainingPercentageAmount;
        expectedPlatformfunds = remainingPercentageAmount;

        expectedProjectFunds = (investment * 630000) / PPM;
        expectedPlatformfunds += (investment * 100000) / PPM;
        expectedBurnFunds += (investment * 20000) / PPM;

        vm.startPrank(user);
        USDT.forceApprove(address(preSale), USDT.balanceOf(user));
        preSale.purchaseTokenWithToken(
            USDT,
            0,
            0,
            100000000,
            minAmount,
            indexes,
            leaders,
            percentages,
            code,
            round,
            deadline,
            v,
            r,
            s
        );
        vm.stopPrank();

        vm.warp(block.timestamp + 100 days);
        claimsContractAddress.grantRole(claimsContractAddress.COMMISSIONS_MANAGER(), address(this));
        claimsContractAddress.enableClaims(2, true);

        IERC20[] memory tokens = new IERC20[](1);
        tokens[0] = USDT;

        vm.startPrank(0x19A865ab3A6E9DD7ac716891B0080b2cB3ffb9fa);
        claimsContractAddress.claim(2, tokens);
        vm.stopPrank();
    }

    function test_RevertWhen_BuyDisabled() public {
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;
        vm.startPrank(owner);
        preSale.enableBuy(false);
        vm.stopPrank();

        (uint8 v, bytes32 r, bytes32 s) = _signWithETH();

        vm.expectRevert(abi.encodeWithSignature("BuyNotEnabled()"));
        vm.prank(user);
        preSale.purchaseTokenWithETH{ value: 1 ether }(
            code,
            round,
            block.timestamp + 2 minutes,
            1,
            indexes,
            leaders,
            percentages,
            v,
            r,
            s
        );
    }

    function test_RevertWhen_UserBlacklisted_ETH() public {
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;
        vm.startPrank(owner);
        preSale.updateBlackListedUser(user, true);
        vm.stopPrank();

        (uint8 v, bytes32 r, bytes32 s) = _signWithETH();

        vm.expectRevert(abi.encodeWithSignature("Blacklisted()"));
        vm.prank(user);
        preSale.purchaseTokenWithETH{ value: 1 ether }(
            code,
            round,
            block.timestamp + 2 minutes,
            1,
            indexes,
            leaders,
            percentages,
            v,
            r,
            s
        );
    }

    function test_RevertWhen_DeadlineExpired_ETH() public {
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;
        (uint8 v, bytes32 r, bytes32 s) = _signWithETH();

        // push time so the signed deadline is in the past
        vm.warp(block.timestamp + 1 days);

        vm.expectRevert(abi.encodeWithSignature("DeadlineExpired()"));
        vm.prank(user);
        preSale.purchaseTokenWithETH{ value: 1 ether }(
            code,
            round,
            block.timestamp - 1,
            1,
            indexes,
            leaders,
            percentages,
            v,
            r,
            s
        );
    }

    function test_RevertWhen_TokenDisallowed() public {
        // Disallow USDT for round

        IERC20[] memory tokens = new IERC20[](3);
        tokens[0] = IERC20(ETH);
        tokens[1] = USDC;
        tokens[2] = GEMS;

        bool[] memory accesses = new bool[](3);
        accesses[0] = true;
        accesses[1] = true;
        accesses[2] = true;

        uint256[] memory cPrice = new uint256[](3); //current price
        cPrice[0] = 0;
        cPrice[1] = 0;
        cPrice[2] = 0;
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;
        vm.startPrank(owner);
        preSale.updateAllowedTokens(round, tokens, accesses, cPrice);
        vm.stopPrank();

        (uint8 v, bytes32 r, bytes32 s) = _signWithToken();

        vm.startPrank(user);
        USDT.forceApprove(address(preSale), 1e6);
        vm.expectRevert(abi.encodeWithSignature("TokenDisallowed()"));
        preSale.purchaseTokenWithToken(
            STAT,
            0,
            0,
            1e6,
            1,
            indexes,
            leaders,
            percentages,
            code,
            round,
            block.timestamp + 2 minutes,
            v,
            r,
            s
        );
        vm.stopPrank();
    }

    function test_RevertWhen_ArrayLengthMismatch() public {
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;
        address[] memory ls = new address[](2);
        ls[0] = leaders[0];
        ls[1] = leaders[1];
        uint256[] memory perc = new uint256[](1);
        perc[0] = 25_000;

        (uint8 v, bytes32 r, bytes32 s) = _signWithETH();

        vm.expectRevert(abi.encodeWithSignature("ArrayLengthMismatch()"));
        vm.prank(user);
        preSale.purchaseTokenWithETH{ value: 1 ether }(
            code,
            round,
            block.timestamp + 2 minutes,
            1,
            indexes,
            ls,
            perc,
            v,
            r,
            s
        );
    }

    function test_RevertWhen_PercentageSumZero() public {
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;
        address[] memory ls = new address[](2);
        ls[0] = leaders[0];
        ls[1] = leaders[1];

        uint256[] memory perc = new uint256[](2);
        perc[0] = 0;
        perc[1] = 0;

        (uint8 v, bytes32 r, bytes32 s) = _signWithETH();

        vm.expectRevert(abi.encodeWithSignature("ZeroValue()"));
        vm.prank(user);
        preSale.purchaseTokenWithETH{ value: 1 ether }(
            code,
            round,
            block.timestamp + 2 minutes,
            1,
            indexes,
            ls,
            perc,
            v,
            r,
            s
        );
    }

    function test_RevertWhen_PercentageSumExceedsCap() public {
        uint256[] memory indexes = new uint256[](1);
        indexes[0] = 0;
        // Sum > 250_000 (CLAIMS_PERCENTAGE_PPM)
        address[] memory ls = new address[](3);
        ls[0] = leaders[0];
        ls[1] = leaders[1];
        ls[2] = leaders[2];

        uint256[] memory perc = new uint256[](3);
        perc[0] = 100_000;
        perc[1] = 100_000;
        perc[2] = 100_001; // total 300,001

        (uint8 v, bytes32 r, bytes32 s) = _signWithETH();

        vm.expectRevert(abi.encodeWithSignature("InvalidPercentage()"));
        vm.prank(user);
        preSale.purchaseTokenWithETH{ value: 1 ether }(
            code,
            round,
            block.timestamp + 2 minutes,
            1,
            indexes,
            ls,
            perc,
            v,
            r,
            s
        );
    }

    function test_OwnerOnly_AdminUpdates() public {
        // change signer
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user));
        vm.prank(user);
        preSale.changeSigner(address(0xBEEF));

        vm.prank(owner);
        vm.expectEmit(true, true, true, true);
        emit PreSale.SignerUpdated(signerAddress, address(0xBEEF));
        preSale.changeSigner(address(0xBEEF));

        // update platform wallet
        vm.prank(owner);
        vm.expectEmit(true, true, true, true);
        emit PreSale.PlatformWalletUpdated(platformWallet, address(0xCAFE));
        preSale.updatePlatformWallet(address(0xCAFE));

        // update project wallet
        vm.prank(owner);
        vm.expectEmit(true, true, true, true);
        emit PreSale.ProjectWalletUpdated(projectWallet, address(0xFACE));
        preSale.updateProjectWallet(address(0xFACE));

        // update burn wallet
        vm.prank(owner);
        vm.expectEmit(true, true, true, true);
        emit PreSale.BurnWalletUpdated(burnWallet, address(0xDEAD));
        preSale.updateBurnWallet(address(0xDEAD));

        // buy toggle
        vm.prank(owner);
        vm.expectEmit(true, true, true, true);
        emit PreSale.BuyEnableUpdated(true, false);
        preSale.enableBuy(false);
    }

    function test_RevertWhen_RoundNotEnabled() public {
        // try to claim without enabling
        vm.warp(block.timestamp + 2 hours);

        IERC20[] memory tokens = new IERC20[](1);
        tokens[0] = USDT;

        vm.expectRevert(abi.encodeWithSignature("RoundNotEnabled()"));
        vm.prank(leaders[0]);
        claimsContractAddress.claim(round, tokens);
    }

    function test_RevertWhen_RoundNotEnded() public {
        vm.prank(owner);
        claimsContractAddress.enableClaims(round, true);

        IERC20[] memory tokens = new IERC20[](1);
        tokens[0] = USDT;

        vm.expectRevert(abi.encodeWithSignature("RoundNotEnded()"));
        vm.prank(leaders[0]);
        claimsContractAddress.claim(round, tokens);
    }

    function _signWithETH() internal view returns (uint8, bytes32, bytes32) {
        uint256 deadline = block.timestamp + 2 minutes;
        bytes32 mhash = keccak256(abi.encodePacked(user, code, deadline));
        bytes32 msgHash = mhash.toEthSignedMessageHash();
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, msgHash);
        return (v, r, s);
    }

    function _signWithToken() internal view returns (uint8, bytes32, bytes32) {
        uint256 referenceTokenPrice = 0;
        uint256 normalizationFactor = 0;
        uint256 deadline = block.timestamp + 2 minutes;
        bytes32 mhash = keccak256(
            abi.encodePacked(user, code, referenceTokenPrice, deadline, USDT, normalizationFactor)
        );
        bytes32 msgHash = mhash.toEthSignedMessageHash();
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, msgHash);
        return (v, r, s);
    }

    function _validateSignWithTokenForSubscription(
        uint256 referenceTokenPrice,
        uint256 normalizationFactor,
        IERC20 token,
        uint256 deadline
    ) private returns (uint8, bytes32, bytes32) {
        vm.startPrank(signer);
        bytes32 msgHash = (
            keccak256(abi.encodePacked(user, uint8(normalizationFactor), uint256(referenceTokenPrice), deadline, token))
        ).toEthSignedMessageHash();
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, msgHash);
        vm.stopPrank();
        return (v, r, s);
    }

    function _lockupStake() private {
        vm.startPrank(user);
        USDT.forceApprove(address(lockupContractAddress), USDT.balanceOf(user));
        lockupContractAddress.stake(5555);
        vm.stopPrank();
    }

    function _subscribe() private {
        uint256 price = 392522046;
        uint8 nf = 22;

        vm.startPrank(user);
        GEMS.forceApprove(address(subscriptionContractAddress), GEMS.balanceOf(user));

        (uint8 v1, bytes32 r1, bytes32 s1) = _validateSignWithTokenForSubscription(price, nf, GEMS, block.timestamp);
        vm.startPrank(user);

        subscriptionContractAddress.subscribe(price, block.timestamp, nf, v1, r1, s1);
        vm.stopPrank();
    }
}