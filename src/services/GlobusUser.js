// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

import { User, Log } from 'oidc-client';

export class GlobusUser extends User {
    constructor({id_token, session_state, access_token, refresh_token, token_type, scope, profile, expires_at, state, other_tokens}) {
        super({id_token, session_state, access_token, refresh_token, token_type, scope, profile, expires_at, state});
        this.other_tokens = other_tokens;
    }

    toStorageString() {
        Log.debug("GlobusUser.toStorageString");
        return JSON.stringify({
            id_token: this.id_token,
            session_state: this.session_state,
            access_token: this.access_token,
            refresh_token: this.refresh_token,
            token_type: this.token_type,
            scope: this.scope,
            profile: this.profile,
            expires_at: this.expires_at,
            other_tokens: this.other_tokens
        });
    }

    static fromStorageString(storageString) {
        Log.debug("GlobusUser.fromStorageString");
        return new GlobusUser(JSON.parse(storageString));
    }
}
