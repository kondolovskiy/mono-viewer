<script>
    import { onMount } from 'svelte';
    import { getDateFromTime } from './helpers';
    import MoneyFormatter from './MoneyFormatter.svelte';
    import { Cache } from './services/cache';
    import { fetchData } from './services/api';

    let statement = [];

    let times = [];

    export let params = {};

    $: if(params.accountId) {
        loadData(params.accountId);
    } else { // don't know if it's good idea, but it works
        onMount(async function() {
            await loadData(params.accountId);
        });
    }

    async function loadData(accountId = 0) {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        const timeStart = Math.round(d.getTime() / 1000);
        statement = await fetchData(`personal/statement/${accountId}/${timeStart}`, `STATEMENT-${accountId}`, statement);
    }

    function hasTime(time) {
       return times.includes(getDateFromTime(time));
    }

    function addTime(time) {
        times.push(time);
    }

    function showTime(time) {
        const t = getDateFromTime(time);
        addTime(t);
        return t;
    }

</script>

<style>

    .statement-data {
        width: 80%;
        margin: 0 auto;
        background: #fff;
        border-radius: 10px;
        padding: 1rem;
    }

    .date-group {
        color: #868686;
        font-size: .7em;
        display: block;
        text-align: center;
        margin-top: .6em;
    }

    .statement-item {
        padding: .2em 0 0;
    }

    .statement-item h3,
    .statement-item p {
        margin: .4em;
    }

</style>

<div class="statement-data">
    {#if statement.length}
        {#each statement as item}
            <section class="statement-item">
                {#if !hasTime(item.time)}
                    <time class="date-group">{ showTime(item.time) }</time>
                {/if}
                <h3>
                    <MoneyFormatter colored={true} money={item.amount} code={item.currencyCode} />
                </h3>
                <p>{item.description}</p>
            </section>
        {/each}
    {/if}
</div>