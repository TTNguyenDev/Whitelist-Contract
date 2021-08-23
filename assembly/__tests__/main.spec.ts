import { add_factory, add_staking_pool, initContract, is_factory_whitelisted, is_whitelisted } from '../index';
import { storage, Context, VMContext, logging, context } from "near-sdk-as";
import { AccountId } from '../types'
import { whitelist, WhitelistContract } from '../models';

const account_near: AccountId = 'ttnguyen999.testnet'
const account_whitelist: AccountId = 'ttnguyen999_2.testnet'
let contract: WhitelistContract


describe("WhiteList", () => {
    beforeEach(() => {
        VMContext.setCurrent_account_id(account_near)
        VMContext.setSigner_account_id(account_near)
        VMContext.setPredecessor_account_id(account_near)
        contract = initContract(account_near)
        // VMContext.setPredecessor_account_id(account_near)
    })

    it("should be initialized", () => {
        expect(contract).toBeTruthy()
        expect(contract.foundation_account_id).toBe('ttnguyen999.testnet', contract.foundation_account_id)
        expect(storage.getSome<bool>('init')).toBe(true)
    });

    it("should be able to whitelist", () => {
        expect(is_whitelisted(account_whitelist)).toBe(false, "is WhiteListed True")
        add_staking_pool(account_whitelist)
        expect(is_whitelisted(account_whitelist)).toBe(true, "is WhiteListed False")
        expect(add_staking_pool(account_whitelist)).toBe(false, "Can staking")
    });

    it('is_factory_whitelisted should work', () => {
        expect(is_factory_whitelisted(account_whitelist)).toBe(
            false,
            "The Account is already in factory_whitelist"
        )
        add_factory(account_whitelist)
        expect(is_factory_whitelisted(account_whitelist)).toBe(
            true,
            "Add factory func fail"
        )
    });
});
