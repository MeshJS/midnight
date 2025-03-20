import { describe, expect, test } from '@jest/globals';
import { Simulator, randomSk } from './token-test-class';
import * as fc from 'fast-check';

const p1secretKey = randomSk();

const p2secretKey = randomSk();

function createSimulator() {
  const simulator = Simulator.deployContract();
  const initialLS = simulator.getLedgerState();  
  
  return simulator;
}

describe('Game Play', () => {
  test('First check of the contract', () => {
    const simulator = createSimulator();     

    let state = simulator.as('p1').mint(100);
    console.log({ 
      reward: state.reward,   
      tvl_token: state.tvlToken, 
      tvl_dust: state.tvlDust,     
    });   
    
    let state2 = simulator.as('p1').mint(100);
    console.log({ 
      reward: state2.reward,   
      tvl_token: state2.tvlToken, 
      tvl_dust: state2.tvlDust,     
    });         

    let state3 = simulator.as('p1').owner_withdraw();
    console.log({ 
      reward: state3.reward,   
      tvl_token: state3.tvlToken, 
      tvl_dust: state3.tvlDust,     
    });  
    
    let state4 = simulator.as('p1').mint(100);
    console.log({ 
      reward: state4.reward,   
      tvl_token: state4.tvlToken, 
      tvl_dust: state4.tvlDust,     
    });  
  });
});
