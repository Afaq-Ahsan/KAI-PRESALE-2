import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"

import {
  BlacklistUpdated as BlacklistUpdatedEvent,
  BurnWalletUpdated as BurnWalletUpdatedEvent,
  BuyEnableUpdated as BuyEnableUpdatedEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlatformWalletUpdated as PlatformWalletUpdatedEvent,
  PricingUpdated as PricingUpdatedEvent,
  ProjectWalletUpdated as ProjectWalletUpdatedEvent,
  PurchasedWithClaimAmount as PurchasedWithClaimAmountEvent,
  PurchasedWithETH as PurchasedWithETHEvent,
  PurchasedWithETHForNFT as PurchasedWithETHForNFTEvent,
  PurchasedWithToken as PurchasedWithTokenEvent,
  PurchasedWithTokenForNFT as PurchasedWithTokenForNFTEvent,
  RoundCreated as RoundCreatedEvent,
  RoundUpdated as RoundUpdatedEvent,
  SignerUpdated as SignerUpdatedEvent,
  TokenDataAdded as TokenDataAddedEvent,
  TokensAccessUpdated as TokensAccessUpdatedEvent
} from "../generated/PreSale/PreSale"
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
  TokensAccessUpdated,
  Purchase
} from "../generated/schema"


let WBTC = '0x54410d42628C7fD6720C489219033345Bcb7Cc73'
WBTC = WBTC.toLowerCase()
let WBTC_DEC: BigInt = BigInt.fromI64(1000000000000)

let ETH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
ETH = ETH.toLowerCase()

let LINK = '0x37bBd68526C9BDb49f18fB36983701E344f2A163'
LINK = LINK.toLowerCase()
let LINK_ETH_DEC: BigInt = BigInt.fromI32(100)

let USDT = '0x6fEA2f1b82aFC40030520a6C49B0d3b652A65915'
USDT = USDT.toLowerCase()
let USDT_DEC: BigInt = BigInt.fromI64(100000000000000)

let USDC = '0x25762231808F040410586504fDF08Df259A2163c'
USDC = USDC.toLowerCase()
let USDC_DEC: BigInt = BigInt.fromI64(100000000000000)

export function handleBlacklistUpdated(event: BlacklistUpdatedEvent): void {
  let entity = new BlacklistUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.which = event.params.which
  entity.accessNow = event.params.accessNow

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBurnWalletUpdated(event: BurnWalletUpdatedEvent): void {
  let entity = new BurnWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldBurnWallet = event.params.oldBurnWallet
  entity.newBurnWallet = event.params.newBurnWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBuyEnableUpdated(event: BuyEnableUpdatedEvent): void {
  let entity = new BuyEnableUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldAccess = event.params.oldAccess
  entity.newAccess = event.params.newAccess

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlatformWalletUpdated(
  event: PlatformWalletUpdatedEvent
): void {
  let entity = new PlatformWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldPlatformWallet = event.params.oldPlatformWallet
  entity.newPlatformWallet = event.params.newPlatformWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePricingUpdated(event: PricingUpdatedEvent): void {
  let entity = new PricingUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldPrice = event.params.oldPrice
  entity.newPrice = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProjectWalletUpdated(
  event: ProjectWalletUpdatedEvent
): void {
  let entity = new ProjectWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldProjectWallet = event.params.oldProjectWallet
  entity.newProjectWallet = event.params.newProjectWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePurchasedWithClaimAmount(
  event: PurchasedWithClaimAmountEvent
): void {
  let entity = new PurchasedWithClaimAmount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.by = event.params.by
  entity.amount = event.params.amount
  entity.token = event.params.token
  entity.round = event.params.round
  entity.tokenPrice = event.params.tokenPrice
  entity.tokenPurchased = event.params.tokenPurchased

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let _id = event.transaction.hash.concatI32(event.logIndex.toI32())
  let _purchased = new Purchase(_id);
  _purchased.by = event.params.by
  _purchased.code = ""
  _purchased.token = event.params.token
  _purchased.tokenSelected = "TOKEN"
  _purchased.type = "GEMS"
  _purchased.amountPurchased = event.params.amount
  _purchased.tokenPrice = event.params.tokenPrice
  _purchased.round = event.params.round
  _purchased.blockTimestamp = event.block.timestamp
  _purchased.tokenPurchased = event.params.tokenPurchased
  _purchased.nftAmounts = []

  _purchased.dollarAmount = event.params.amount.times(event.params.tokenPrice)
  if (event.params.tokenPurchased == BigInt.fromI32(0)) {
    _purchased.roundPrice = BigInt.fromI32(0)
  } else {
    let denomination: BigInt = BigInt.fromI32(100000000)
    if (event.params.token.toHexString() == LINK ||
      event.params.token.toHexString() == ETH) {
      denomination = denomination.times(LINK_ETH_DEC)
    } else if (event.params.token.toHexString() == USDT) {
      denomination = denomination.times(USDT_DEC)
    } else if (event.params.token.toHexString() == USDC) {
      denomination = denomination.times(USDC_DEC)
    } else if (event.params.token.toHexString() == WBTC) {
      denomination = denomination.times(WBTC_DEC)
    }
    _purchased.roundPrice = _purchased.dollarAmount.times(denomination).div(event.params.tokenPurchased)
  }
  _purchased.leaders = []
  _purchased.percentages = []
  _purchased.transactionHash = event.transaction.hash
  _purchased.save()
}


export function handlePurchasedWithETH(event: PurchasedWithETHEvent): void {
  let entity = new PurchasedWithETH(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.by = event.params.by
  entity.code = event.params.code
  entity.amountPurchasedETH = event.params.amountPurchasedETH
  entity.round = event.params.round
  entity.leaders = changetype<Bytes[]>(event.params.leaders)
  entity.percentages = event.params.percentages
  entity.roundPrice = event.params.roundPrice
  entity.tokenPurchased = event.params.tokenPurchased

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let _id = event.transaction.hash.concatI32(event.logIndex.toI32())
  let _purchased = new Purchase(_id);

  _purchased.by = event.params.by
  _purchased.code = event.params.code
  _purchased.token = new Bytes(0)
  _purchased.tokenSelected = "ETH"
  _purchased.type = "GEMS"
  _purchased.amountPurchased = event.params.amountPurchasedETH
  _purchased.round = event.params.round
  _purchased.blockTimestamp = event.block.timestamp
  _purchased.tokenPurchased = event.params.tokenPurchased
  _purchased.nftAmounts = []
  _purchased.leaders = entity.leaders
  _purchased.percentages = entity.percentages
  _purchased.roundPrice = event.params.roundPrice
  _purchased.tokenPrice = BigInt.fromI32(0)
  _purchased.dollarAmount = BigInt.fromI32(0)
  _purchased.transactionHash = event.transaction.hash
  _purchased.save()
}

export function handlePurchasedWithETHForNFT(
  event: PurchasedWithETHForNFTEvent
): void {
  let entity = new PurchasedWithETHForNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.by = event.params.by
  entity.code = event.params.code
  entity.amountInETH = event.params.amountInETH
  entity.ethPrice = event.params.ethPrice
  entity.round = event.params.round
  entity.leaders = changetype<Bytes[]>(event.params.leaders)
  entity.percentages = event.params.percentages
  entity.roundPrice = event.params.roundPrice
  entity.nftAmounts = event.params.nftAmounts

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()


  let _id = event.transaction.hash.concatI32(event.logIndex.toI32())
  let _purchased = new Purchase(_id);

  _purchased.by = event.params.by
  _purchased.code = event.params.code
  _purchased.tokenSelected = "ETH"
  _purchased.type = "NFT"
  _purchased.leaders = entity.leaders
  _purchased.percentages = entity.percentages
  _purchased.amountPurchased = event.params.amountInETH
  _purchased.round = event.params.round
  _purchased.blockTimestamp = event.block.timestamp
  _purchased.tokenPurchased = BigInt.fromI32(0)
  _purchased.nftAmounts = event.params.nftAmounts
  _purchased.token = new Bytes(0)
  _purchased.roundPrice = event.params.roundPrice
  _purchased.tokenPrice = event.params.ethPrice
  _purchased.transactionHash = event.transaction.hash
  _purchased.dollarAmount = BigInt.fromI32(0)
  _purchased.save()
}

export function handlePurchasedWithToken(event: PurchasedWithTokenEvent): void {
  let entity = new PurchasedWithToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.tokenPrice = event.params.tokenPrice
  entity.by = event.params.by
  entity.code = event.params.code
  entity.amountPurchased = event.params.amountPurchased
  entity.tokenPurchased = event.params.tokenPurchased
  entity.round = event.params.round
  entity.leaders = changetype<Bytes[]>(event.params.leaders)
  entity.percentages = event.params.percentages

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()


  let _id = event.transaction.hash.concatI32(event.logIndex.toI32())
  let _purchased = new Purchase(_id);

  _purchased.by = event.params.by
  _purchased.code = event.params.code
  _purchased.token = event.params.token
  _purchased.tokenSelected = "TOKEN"
  _purchased.type = "GEMS"
  _purchased.amountPurchased = event.params.amountPurchased
  _purchased.round = event.params.round
  _purchased.blockTimestamp = event.block.timestamp
  _purchased.tokenPurchased = event.params.tokenPurchased
  _purchased.nftAmounts = []
  _purchased.tokenPrice = event.params.tokenPrice


  _purchased.leaders = entity.leaders
  _purchased.percentages = entity.percentages

  let denomination: BigInt = BigInt.fromI32(100000000)
  if (event.params.token.toHexString() == LINK) {
    denomination = denomination.times(LINK_ETH_DEC)
  } else if (event.params.token.toHexString() == USDT) {
    denomination = denomination.times(USDT_DEC)
  } else if (event.params.token.toHexString() == USDC) {
    denomination = denomination.times(USDC_DEC)
  } else if (event.params.token.toHexString() == WBTC) {
    denomination = denomination.times(WBTC_DEC)
  }
  _purchased.dollarAmount = event.params.amountPurchased.times(event.params.tokenPrice)
  _purchased.roundPrice = _purchased.dollarAmount.times(denomination).div(event.params.tokenPurchased)
  _purchased.transactionHash = event.transaction.hash
  _purchased.save()
}

export function handlePurchasedWithTokenForNFT(
  event: PurchasedWithTokenForNFTEvent
): void {
  let entity = new PurchasedWithTokenForNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.tokenPrice = event.params.tokenPrice
  entity.by = event.params.by
  entity.code = event.params.code
  entity.amountPurchased = event.params.amountPurchased
  entity.round = event.params.round
  entity.leaders = changetype<Bytes[]>(event.params.leaders)
  entity.percentages = event.params.percentages
  entity.roundPrice = event.params.roundPrice
  entity.nftAmounts = event.params.nftAmounts

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()


  let _id = event.transaction.hash.concatI32(event.logIndex.toI32())
  let _purchased = new Purchase(_id);

  _purchased.by = event.params.by
  _purchased.code = event.params.code
  _purchased.token = event.params.token
  _purchased.tokenSelected = "TOKEN"
  _purchased.type = "NFT"
  _purchased.leaders = entity.leaders
  _purchased.percentages = entity.percentages
  _purchased.amountPurchased = event.params.amountPurchased
  _purchased.round = event.params.round
  _purchased.blockTimestamp = event.block.timestamp
  _purchased.tokenPurchased = BigInt.fromI32(0)
  _purchased.nftAmounts = event.params.nftAmounts
  _purchased.roundPrice = event.params.roundPrice
  _purchased.tokenPrice = event.params.tokenPrice
  _purchased.dollarAmount = BigInt.fromI32(0)
  _purchased.transactionHash = event.transaction.hash

  _purchased.save()
}

export function handleRoundCreated(event: RoundCreatedEvent): void {
  let entity = new RoundCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newRound = event.params.newRound
  entity.roundData_startTime = event.params.roundData.startTime
  entity.roundData_endTime = event.params.roundData.endTime
  entity.roundData_price = event.params.roundData.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoundUpdated(event: RoundUpdatedEvent): void {
  let entity = new RoundUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.round = event.params.round
  entity.roundData_startTime = event.params.roundData.startTime
  entity.roundData_endTime = event.params.roundData.endTime
  entity.roundData_price = event.params.roundData.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSignerUpdated(event: SignerUpdatedEvent): void {
  let entity = new SignerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldSigner = event.params.oldSigner
  entity.newSigner = event.params.newSigner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenDataAdded(event: TokenDataAddedEvent): void {
  let entity = new TokenDataAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.data_priceFeed = event.params.data.priceFeed
  entity.data_normalizationFactorForToken =
    event.params.data.normalizationFactorForToken
  entity.data_normalizationFactorForNFT =
    event.params.data.normalizationFactorForNFT
  entity.data_tolerance = event.params.data.tolerance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensAccessUpdated(
  event: TokensAccessUpdatedEvent
): void {
  let entity = new TokensAccessUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.round = event.params.round
  entity.token = event.params.token
  entity.access = event.params.access
  entity.customPrice = event.params.customPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
