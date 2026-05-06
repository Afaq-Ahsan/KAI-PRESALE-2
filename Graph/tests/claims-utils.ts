import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ClaimRevoked,
  ClaimSet,
  ClaimsUpdated,
  FundsClaimed,
  FundsWalletUpdated,
  PresaleUpdated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SignerUpdated
} from "../generated/Claims/Claims"

export function createClaimRevokedEvent(
  leader: Address,
  token: Address,
  amount: BigInt,
  round: BigInt
): ClaimRevoked {
  let claimRevokedEvent = changetype<ClaimRevoked>(newMockEvent())

  claimRevokedEvent.parameters = new Array()

  claimRevokedEvent.parameters.push(
    new ethereum.EventParam("leader", ethereum.Value.fromAddress(leader))
  )
  claimRevokedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  claimRevokedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  claimRevokedEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )

  return claimRevokedEvent
}

export function createClaimSetEvent(
  to: Address,
  round: BigInt,
  claimInfo: ethereum.Tuple
): ClaimSet {
  let claimSetEvent = changetype<ClaimSet>(newMockEvent())

  claimSetEvent.parameters = new Array()

  claimSetEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  claimSetEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  claimSetEvent.parameters.push(
    new ethereum.EventParam("claimInfo", ethereum.Value.fromTuple(claimInfo))
  )

  return claimSetEvent
}

export function createClaimsUpdatedEvent(
  leader: Address,
  token: Address,
  amount: BigInt,
  round: BigInt
): ClaimsUpdated {
  let claimsUpdatedEvent = changetype<ClaimsUpdated>(newMockEvent())

  claimsUpdatedEvent.parameters = new Array()

  claimsUpdatedEvent.parameters.push(
    new ethereum.EventParam("leader", ethereum.Value.fromAddress(leader))
  )
  claimsUpdatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  claimsUpdatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  claimsUpdatedEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )

  return claimsUpdatedEvent
}

export function createFundsClaimedEvent(
  by: Address,
  round: BigInt,
  token: Address,
  amount: BigInt
): FundsClaimed {
  let fundsClaimedEvent = changetype<FundsClaimed>(newMockEvent())

  fundsClaimedEvent.parameters = new Array()

  fundsClaimedEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )
  fundsClaimedEvent.parameters.push(
    new ethereum.EventParam("round", ethereum.Value.fromUnsignedBigInt(round))
  )
  fundsClaimedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  fundsClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundsClaimedEvent
}

export function createFundsWalletUpdatedEvent(
  oldFundsWallet: Address,
  newFundsWallet: Address
): FundsWalletUpdated {
  let fundsWalletUpdatedEvent = changetype<FundsWalletUpdated>(newMockEvent())

  fundsWalletUpdatedEvent.parameters = new Array()

  fundsWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldFundsWallet",
      ethereum.Value.fromAddress(oldFundsWallet)
    )
  )
  fundsWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFundsWallet",
      ethereum.Value.fromAddress(newFundsWallet)
    )
  )

  return fundsWalletUpdatedEvent
}

export function createPresaleUpdatedEvent(
  prevAddress: Address,
  newAddress: Address
): PresaleUpdated {
  let presaleUpdatedEvent = changetype<PresaleUpdated>(newMockEvent())

  presaleUpdatedEvent.parameters = new Array()

  presaleUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "prevAddress",
      ethereum.Value.fromAddress(prevAddress)
    )
  )
  presaleUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return presaleUpdatedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
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
