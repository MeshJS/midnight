import { describe, expect, test } from '@jest/globals';
import { Simulator, randomSk } from './auction-simulator-class';
import { Certificate, STATE, Maybe } from '../index.js';
import * as fc from 'fast-check';

const p1certificate: Certificate = {
  age: 19n,
  aml: true,
  jurisdiction: true,
  owner: { bytes: new Uint8Array(32) },
  issuer: { bytes: new Uint8Array(32) },
  sk: randomSk(),
};
const p2certificate = {
  age: 22n,
  aml: true,
  jurisdiction: true,
  owner: { bytes: new Uint8Array(32) },
  issuer: { bytes: new Uint8Array(32) },
  sk: randomSk(),
};

function createSimulator() {
  const simulator = Simulator.deployContract(p1certificate);
  const initialLS = simulator.getLedgerState();
  expect(initialLS.state).toBe(STATE.open);
  console.log('admin', initialLS.adminPublicKey);

  simulator.createPrivateState('p2', p2certificate);
  return simulator;
}

describe('Game Play', () => {
  test('First check of the contract', () => {
    const simulator = createSimulator();

    let state2 = simulator.as('p1').register();
    for (const [key, value] of state2.registeredHashes) {
      console.log(key, value);
    }

    let maybeKeys: Maybe<Uint8Array>[] = [];
    let state3 = simulator.as('p2').register();
    for (const [key, value] of state3.registeredHashes) {
      maybeKeys.push({
        is_some: true,
        value: key,
      });
      console.log(key, value);
    }
    console.log(maybeKeys);

    // Pad the vector to exactly 10 elements if necessary:
    while (maybeKeys.length < 10) {
      maybeKeys.push({
        is_some: false,
        value: new Uint8Array(32), // A zero-filled 32-byte array as placeholder
      });
    }

    let state4 = simulator.as('p1').approve_certificates(maybeKeys);
    for (const [key, value] of state4.registeredHashes) {
      console.log(key, value);
    }

    simulator.as('p1').start_bid();

    simulator.as('p1').make_bid(101);    
    simulator.as('p2').make_bid(102);
    simulator.as('p1').make_bid(200);

    const final = simulator.as('p1').close_bid();  
    
    console.log("deadline",final.deadline);
    console.log("winner",final.highestBidder);
    console.log("state",final.state);
    console.log("treasury COIN",final.treasury);
    console.log("winner bid",final.highestBid);  
    console.log("treasury balance", final.treasuryBalance) 
  });
});
