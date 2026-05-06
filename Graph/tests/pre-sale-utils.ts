import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BlacklistUpdated,
  BurnWalletUpdated,
  BuyEnableUpdated,
  OwnershipTransferStarted,
  OwnershipTransferred,
  PlatformWalletUpdated,
  PricingUpdated,
  ProjectWalletUpdated,
  PurchasedWithClaimAmount,
  PurchasedWithETH,
  PurchasedWithETHForNFT,
  PurchasedWithToken,
  PurchasedWithTokenForNFT,
  RoundCreated,
  RoundUpdated,
  SignerUpdated,
  TokenDataAdded,
  TokensAccessUpdated
} from "../generated/PreSale/PreSale"

export function createBlacklistUpdatedEvent(
  which: Address,
  accessNow: boolean
): BlacklistUpdated {
  let blacklistUpdatedEvent = changetype<BlacklistUpdated>(newMockEvent())

  blacklistUpdatedEvent.parameters = new Array()

  blacklistUpdatedEvent.parameters.push(
    new ethereum.EventParam("which", ethereum.Value.fromAddress(which))
  )
  blacklistUpdatedEvent.parameters.push(
    new ethereum.EventParam("accessNow", ethereum.Value.fromBoolean(accessNow))
  )

  return blacklistUpdatedEvent
}

export function createBurnWalletUpdatedEvent(
  oldBurnWallet: Address,
  newBurnWallet: Address
): BurnWalletUpdated {
  let burnWalletUpdatedEvent = changetype<BurnWalletUpdated>(newMockEvent())

  burnWalletUpdatedEvent.parameters = new Array()

  burnWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldBurnWallet",
      ethereum.Value.fromAddress(oldBurnWallet)
    )
  )
  burnWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newBurnWallet",
      ethereum.Value.fromAddress(newBurnWallet)
    )
  )

  return burnWalletUpdatedEvent
}

export function createBuyEnableUpdatedEvent(
  oldAccess: boolean,
  newAccess: boolean
): BuyEnableUpdated {
  let buyEnableUpdatedEvent = changetype<BuyEnableUpdated>(newMockEvent())

  buyEnableUpdatedEvent.parameters = new Array()

  buyEnableUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldAccess", ethereum.Value.fromBoolean(oldAccess))
  )
  buyEnableUpdatedEvent.parameters.push(
    new ethereum.EventParam("newAccess", ethereum.Value.fromBoolean(newAccess))
  )

  return buyEnableUpdatedEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent = changetype<OwnershipTransferStarted>(
    newMockEvent()
  )

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPlatformWalletUpdatedEvent(
  oldPlatformWallet: Address,
  newPlatformWallet: Address
): PlatformWalletUpdated {
  let platformWalletUpdatedEvent = changetype<PlatformWalletUpdated>(
    newMockEvent()
  )

  platformWalletUpdatedEvent.parameters = new Array()

  platformWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldPlatformWallet",
      ethereum.Value.fromAddress(oldPlatformWallet)
    )
  )
  platformWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPlatformWallet",
      ethereum.Value.fromAddress(newPlatformWallet)
    )
  )

  return platformWalletUpdatedEvent
}

export function createPricingUpdatedEvent(
  oldPrice: BigInt,
  newPrice: BigInt
): PricingUpdated {
  let pricingUpdatedEvent = changetype<PricingUpdated>(newMockEvent())

  pricingUpdatedEvent.parameters = new Array()

  pricingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldPrice",
      ethereum.Value.fromUnsignedBigInt(oldPrice)
    )
  )
  pricingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return pricingUpdatedEvent
}

export function createProjectWalletUpdatedEvent(
  oldProjectWallet: Address,
  newProjectWallet: Address
): ProjectWalletUpdated {
  let projectWalletUpdatedEvent = changetype<ProjectWalletUpdated>(
    newMockEvent()
  )

  projectWalletUpdatedEvent.parameters = new Array()

  projectWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldProjectWallet",
      ethereum.Value.fromAddress(oldProjectWallet)
    )
  )
  projectWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newProjectWallet",
      ethereum.Value.fromAddress(newProjectWallet)
    )
  )

  return projectWalletUpdatedEvent
}

export function createPurchasedWithClaimAmountEvent(
  by: Address,
  amount: BigInt,
  token: Address,
  round: BigInt,
  tokenPrice: BigInt,
  tokenPurchased: BigInt
): PurchasedWithClaimAmount {
  let purchasedWithClaimAmountEvent = changetype<PurchasedWithClaimAmount>(
    newMockEvent()
  )

  purchasedWithClaimAmountEvent.parameters = new Array()

  purchasedWithClaimAmountEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )
  purchasedWithClaimAmountEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  purchasedWithClaimAmountEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  purchasedWithClaimAmountEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  purchasedWithClaimAmountEvent.parameters.push(
    new ethereum.EventParam(
      "tokenPrice",
      ethereum.Value.fromUnsignedBigInt(tokenPrice)
    )
  )
  purchasedWithClaimAmountEvent.parameters.push(
    new ethereum.EventParam(
      "tokenPurchased",
      ethereum.Value.fromUnsignedBigInt(tokenPurchased)
    )
  )

  return purchasedWithClaimAmountEvent
}

export function createPurchasedWithETHEvent(
  by: Address,
  code: string,
  amountPurchasedETH: BigInt,
  round: BigInt,
  leaders: Array<Address>,
  percentages: Array<BigInt>,
  roundPrice: BigInt,
  tokenPurchased: BigInt
): PurchasedWithETH {
  let purchasedWithEthEvent = changetype<PurchasedWithETH>(newMockEvent())

  purchasedWithEthEvent.parameters = new Array()

  purchasedWithEthEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )
  purchasedWithEthEvent.parameters.push(
    new ethereum.EventParam("code", ethereum.Value.fromString(code))
  )
  purchasedWithEthEvent.parameters.push(
    new ethereum.EventParam(
      "amountPurchasedETH",
      ethereum.Value.fromUnsignedBigInt(amountPurchasedETH)
    )
  )
  purchasedWithEthEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  purchasedWithEthEvent.parameters.push(
    new ethereum.EventParam("leaders", ethereum.Value.fromAddressArray(leaders))
  )
  purchasedWithEthEvent.parameters.push(
    new ethereum.EventParam(
      "percentages",
      ethereum.Value.fromUnsignedBigIntArray(percentages)
    )
  )
  purchasedWithEthEvent.parameters.push(
    new ethereum.EventParam(
      "roundPrice",
      ethereum.Value.fromUnsignedBigInt(roundPrice)
    )
  )
  purchasedWithEthEvent.parameters.push(
    new ethereum.EventParam(
      "tokenPurchased",
      ethereum.Value.fromUnsignedBigInt(tokenPurchased)
    )
  )

  return purchasedWithEthEvent
}

export function createPurchasedWithETHForNFTEvent(
  by: Address,
  code: string,
  amountInETH: BigInt,
  ethPrice: BigInt,
  round: BigInt,
  leaders: Array<Address>,
  percentages: Array<BigInt>,
  roundPrice: BigInt,
  nftAmounts: Array<BigInt>
): PurchasedWithETHForNFT {
  let purchasedWithEthForNftEvent = changetype<PurchasedWithETHForNFT>(
    newMockEvent()
  )

  purchasedWithEthForNftEvent.parameters = new Array()

  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )
  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam("code", ethereum.Value.fromString(code))
  )
  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam(
      "amountInETH",
      ethereum.Value.fromUnsignedBigInt(amountInETH)
    )
  )
  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam(
      "ethPrice",
      ethereum.Value.fromUnsignedBigInt(ethPrice)
    )
  )
  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam("leaders", ethereum.Value.fromAddressArray(leaders))
  )
  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam(
      "percentages",
      ethereum.Value.fromUnsignedBigIntArray(percentages)
    )
  )
  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam(
      "roundPrice",
      ethereum.Value.fromUnsignedBigInt(roundPrice)
    )
  )
  purchasedWithEthForNftEvent.parameters.push(
    new ethereum.EventParam(
      "nftAmounts",
      ethereum.Value.fromUnsignedBigIntArray(nftAmounts)
    )
  )

  return purchasedWithEthForNftEvent
}

export function createPurchasedWithTokenEvent(
  token: Address,
  tokenPrice: BigInt,
  by: Address,
  code: string,
  amountPurchased: BigInt,
  tokenPurchased: BigInt,
  round: BigInt,
  leaders: Array<Address>,
  percentages: Array<BigInt>
): PurchasedWithToken {
  let purchasedWithTokenEvent = changetype<PurchasedWithToken>(newMockEvent())

  purchasedWithTokenEvent.parameters = new Array()

  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam(
      "tokenPrice",
      ethereum.Value.fromUnsignedBigInt(tokenPrice)
    )
  )
  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )
  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam("code", ethereum.Value.fromString(code))
  )
  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam(
      "amountPurchased",
      ethereum.Value.fromUnsignedBigInt(amountPurchased)
    )
  )
  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam(
      "tokenPurchased",
      ethereum.Value.fromUnsignedBigInt(tokenPurchased)
    )
  )
  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam("leaders", ethereum.Value.fromAddressArray(leaders))
  )
  purchasedWithTokenEvent.parameters.push(
    new ethereum.EventParam(
      "percentages",
      ethereum.Value.fromUnsignedBigIntArray(percentages)
    )
  )

  return purchasedWithTokenEvent
}

export function createPurchasedWithTokenForNFTEvent(
  token: Address,
  tokenPrice: BigInt,
  by: Address,
  code: string,
  amountPurchased: BigInt,
  round: BigInt,
  leaders: Array<Address>,
  percentages: Array<BigInt>,
  roundPrice: BigInt,
  nftAmounts: Array<BigInt>
): PurchasedWithTokenForNFT {
  let purchasedWithTokenForNftEvent = changetype<PurchasedWithTokenForNFT>(
    newMockEvent()
  )

  purchasedWithTokenForNftEvent.parameters = new Array()

  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam(
      "tokenPrice",
      ethereum.Value.fromUnsignedBigInt(tokenPrice)
    )
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam("code", ethereum.Value.fromString(code))
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam(
      "amountPurchased",
      ethereum.Value.fromUnsignedBigInt(amountPurchased)
    )
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam("leaders", ethereum.Value.fromAddressArray(leaders))
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam(
      "percentages",
      ethereum.Value.fromUnsignedBigIntArray(percentages)
    )
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam(
      "roundPrice",
      ethereum.Value.fromUnsignedBigInt(roundPrice)
    )
  )
  purchasedWithTokenForNftEvent.parameters.push(
    new ethereum.EventParam(
      "nftAmounts",
      ethereum.Value.fromUnsignedBigIntArray(nftAmounts)
    )
  )

  return purchasedWithTokenForNftEvent
}

export function createRoundCreatedEvent(
  newRound: BigInt,
  roundData: ethereum.Tuple
): RoundCreated {
  let roundCreatedEvent = changetype<RoundCreated>(newMockEvent())

  roundCreatedEvent.parameters = new Array()

  roundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "newRound",
      ethereum.Value.fromUnsignedBigInt(newRound)
    )
  )
  roundCreatedEvent.parameters.push(
    new ethereum.EventParam("roundData", ethereum.Value.fromTuple(roundData))
  )

  return roundCreatedEvent
}

export function createRoundUpdatedEvent(
  round: BigInt,
  roundData: ethereum.Tuple
): RoundUpdated {
  let roundUpdatedEvent = changetype<RoundUpdated>(newMockEvent())

  roundUpdatedEvent.parameters = new Array()

  roundUpdatedEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  roundUpdatedEvent.parameters.push(
    new ethereum.EventParam("roundData", ethereum.Value.fromTuple(roundData))
  )

  return roundUpdatedEvent
}

export function createSignerUpdatedEvent(
  oldSigner: Address,
  newSigner: Address
): SignerUpdated {
  let signerUpdatedEvent = changetype<SignerUpdated>(newMockEvent())

  signerUpdatedEvent.parameters = new Array()

  signerUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldSigner", ethereum.Value.fromAddress(oldSigner))
  )
  signerUpdatedEvent.parameters.push(
    new ethereum.EventParam("newSigner", ethereum.Value.fromAddress(newSigner))
  )

  return signerUpdatedEvent
}

export function createTokenDataAddedEvent(
  token: Address,
  data: ethereum.Tuple
): TokenDataAdded {
  let tokenDataAddedEvent = changetype<TokenDataAdded>(newMockEvent())

  tokenDataAddedEvent.parameters = new Array()

  tokenDataAddedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenDataAddedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromTuple(data))
  )

  return tokenDataAddedEvent
}

export function createTokensAccessUpdatedEvent(
  round: BigInt,
  token: Address,
  access: boolean,
  customPrice: BigInt
): TokensAccessUpdated {
  let tokensAccessUpdatedEvent = changetype<TokensAccessUpdated>(newMockEvent())

  tokensAccessUpdatedEvent.parameters = new Array()

  tokensAccessUpdatedEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  tokensAccessUpdatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokensAccessUpdatedEvent.parameters.push(
    new ethereum.EventParam("access", ethereum.Value.fromBoolean(access))
  )
  tokensAccessUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "customPrice",
      ethereum.Value.fromUnsignedBigInt(customPrice)
    )
  )

  return tokensAccessUpdatedEvent
}
