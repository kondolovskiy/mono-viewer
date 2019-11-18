<script>
    import Client from "./Client.svelte";
    import Statement from "./Statement.svelte";
    import Router from 'svelte-spa-router';

    const routes = {
        '/': Statement,
        '/account/:accountId': Statement,
    };
</script>

<style>
    :global(body) {
        padding: 0;
    }

    .app {
        margin: 0 auto;
        background-image: linear-gradient(to left bottom,#ffd6da,#efc9ed 50%,#d8d6ff);
        padding-bottom: 2rem;
    }
</style>
<div class="app">
    <Client />
    <Router {routes} />
</div>

