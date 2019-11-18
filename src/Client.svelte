<script>
    import MoneyFormatter from './MoneyFormatter.svelte';
    import { onMount } from 'svelte';
    import { Cache } from './services/cache';
    import { fetchData } from './services/api';
    import { link } from 'svelte-spa-router'

    let userInfo = {
        name: '',
        accounts: []
    };

    onMount(async function() {
        userInfo = await fetchData('personal/client-info', 'CLIENT', userInfo);
    });

</script>

<style>

    .client-data {
        width: 80%;
        margin: 0 auto;
        padding: 3rem 0;
    }

    .client-accounts {
        display: flex;
        padding: 0;
    }

    .client-accounts > li {
        display: block;
        list-style: none;
        padding: 0;
    }

</style>

<div class="client-data">
    <h2>{userInfo.name}</h2>
    <div>
        <ul class="client-accounts">
            {#if userInfo.accounts}
                {#each userInfo.accounts as account, index}
                    <li>
                        <a href="/account/{account.id}" use:link>
                            <MoneyFormatter money={account.balance} code={account.currencyCode} />
                        </a>
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
</div>
