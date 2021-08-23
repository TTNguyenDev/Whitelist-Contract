import { u128, PersistentSet } from 'near-sdk-as'

// import Types
import { AccountId } from './types'

// Export persistent storage structures
export const whitelist = new PersistentSet<AccountId>('w')
export const factory_whitelist = new PersistentSet<AccountId>('f')

// Export classes
@nearBindgen
export class WhitelistContract {
    /// The account ID of the NEAR Foundation. It allows to whitelist new staking pool accounts.
    /// It also allows to whitelist new Staking Pool Factories, which can whitelist staking pools.
    foundation_account_id: AccountId;

    /// The whitelisted account IDs of approved staking pool contracts.
    whitelist: PersistentSet<AccountId>;

    /// The whitelist of staking pool factories. Any account from this list can whitelist staking
    /// pools.
    factory_whitelist: PersistentSet<AccountId>;

    constructor(
        _foundation_account_id: AccountId,
        _whitelist: PersistentSet<AccountId>,
        _factory_whitelist: PersistentSet<AccountId>
    ) {
        this.foundation_account_id = _foundation_account_id;
        this.whitelist = _whitelist;
        this.factory_whitelist = _factory_whitelist;
        // factory_whitelist.add(foundation_account_id);
    }
}
