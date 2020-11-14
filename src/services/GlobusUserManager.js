// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

import { UserManager, Log } from 'oidc-client';
import { GlobusUser } from '@/services/GlobusUser';


export class GlobusUserManager extends UserManager {
    _signinEnd(url, args = {}) {
        return this.processSigninResponse(url).then(signinResponse => {
            Log.debug("GlobusUserManager._signinEnd: got signin response");

            let user = new GlobusUser(signinResponse);

            if (args.current_sub) {
                if (args.current_sub !== user.profile.sub) {
                    Log.debug("GlobusUserManager._signinEnd: current user does not match user returned from signin. sub from signin: ", user.profile.sub);
                    return Promise.reject(new Error("login_required"));
                }
                else {
                    Log.debug("GlobusUserManager._signinEnd: current user matches user returned from signin");
                }
            }

            return this.storeUser(user).then(() => {
                Log.debug("GlobusUserManager._signinEnd: user stored");

                this._events.load(user);

                return user;
            });
        });
    }

    _loadUser() {
        return this._userStore.get(this._userStoreKey).then(storageString => {
            if (storageString) {
                Log.debug("UserManager._loadUser: user storageString loaded");
                return GlobusUser.fromStorageString(storageString);
            }

            Log.debug("UserManager._loadUser: no user storageString");
            return null;
        });
    }
}
