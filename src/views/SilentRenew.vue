<template>
    <div class="silent_renew">
    </div>
</template>
<script>
    import { GlobusUserManager } from '@/services/GlobusUserManager';

    export default {
        name: 'SilentRenew',
        mounted() {
            console.log('Silent renew');
            var mgr = new GlobusUserManager().signinSilentCallback();
        }
    }
</script>
<style>
</style>
