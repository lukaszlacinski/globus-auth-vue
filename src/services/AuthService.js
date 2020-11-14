import axios from 'axios';
import { WebStorageStateStore, Log } from 'oidc-client';
import { GlobusUserManager } from '@/services/GlobusUserManager';


export default class AuthService {
    static groupScope() {
        return 'urn:globus:auth:scope:groups.api.globus.org:view_my_groups_and_memberships';
    }

    constructor() {
        Log.logger = console;
        Log.level = Log.DEBUG;
        var settings = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: 'https://auth.globus.org',
            client_id: process.env.VUE_APP_GLOBUS_AUTH_CLIENT_ID,
            redirect_uri: process.env.VUE_APP_BASE_URL + '/auth/callback',
            automaticSilentRenew: true,
            silent_redirect_uri: process.env.VUE_APP_BASE_URL + '/auth/silent-renew',
            response_type: 'code',
            scope: 'openid profile email ' + AuthService.groupScope(),
            post_logout_redirect_uri: process.env.VUE_APP_BASE_URL,
            filterProtocolClaims: true,
            metadata: {
                issuer: 'https://auth.globus.org',
                authorization_endpoint: 'https://auth.globus.org/v2/oauth2/authorize',
                userinfo_endpoint: 'https://auth.globus.org/v2/oauth2/userinfo',
                end_session_endpoint: process.env.VUE_APP_BASE_URL + '/auth/logout',
                //end_session_endpoint: 'https://auth.globus.org/v2/web/logout',
                jwks_uri: 'https://auth.globus.org/jwk.json'
            }
        };
        this.userManager = new GlobusUserManager(settings);
    }

    getUser() {
        return this.userManager.getUser();
    }

    login() {
        return this.userManager.signinRedirect();
    }

    logout() {
        return this.userManager.signoutRedirect();
    }

    getAccessToken() {
        Log.debug('AuthService.getAccessToken');
        return this.userManager.getUser().then(data => {
            return data.access_token;
        });
    }

    getGroupToken() {
        Log.debug('AuthService.getGroupToken');
        return this.userManager.getUser().then(data => {
            if (data.other_tokens) {
                let access_token;
                data.other_tokens.forEach(item => {
                    if (item.scope === AuthService.groupScope()) {
                        access_token = item.access_token;
                    }
                });
                Log.debug('AuthService.getGroupToken: access token: ', item.access_token);
                return access_token;
            }
        });
    }

    isGroupMember(group_id) {
        let groupToken = getGroupToken();
        axios.get('https://groups.api.globus.org/v2/groups/my_groups', {
            headers: {
                'Authorization': 'Bearer ' + groupToken
            }
        })
        .then(response => {
            response.forEach(group => {
                if (group.id === group_id)
                    group.my_memberships.forEach(membership => {
                        if (membership.status === 'active')
                            return true;
                    });
            });
            return false;
        });
        Log.error('AuthService:isGroupMembers: could not get group membership from groups.api.globus.org');
        return false;
    }
}
