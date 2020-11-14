<template>
    <div class="logout">
    </div>
</template>
<script>
    export default {
        name: 'Logout',
        mounted() {
            this.$router.push({ name: 'Home' });
        }
    }
</script>
<style>
</style>
