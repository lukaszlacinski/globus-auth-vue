<template>
    <div class="callback">
    </div>
</template>
<script>
    import { WebStorageStateStore } from 'oidc-client';
    import { GlobusUserManager } from '@/services/GlobusUserManager';

    export default {
        name: 'Callback',
        mounted() {
            var mgr = new GlobusUserManager({ response_mode: 'query', userStore: new WebStorageStateStore() })
            mgr.signinRedirectCallback().then((user) => {
                console.log("Callback: signin response success", user);
                this.$router.push({ name: 'Home' });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
</script>
<style>
</style>
