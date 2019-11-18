<script>
    import { getCurrencyByCode } from './helpers';

    export let money = 0;
    export let code = null;
    export let colored = false;

    function moneyFormatter(money, currencyCode = null) {

        const cash = money / 100;

        if (!currencyCode) {
            return cash;
        }

        const currency = getCurrencyByCode(currencyCode);

        return `${cash} ${currency}`
    }

    function getMoneyClass(colored, amount) {
        if(!colored) return '';
        return amount < 0 ? 'consumption' : 'income';
    }

    const formattedString = moneyFormatter(money, code);

</script>

<style>
    .consumption {
        color: red;
    }

    .income {
        color: green;
    }
</style>

<span class={getMoneyClass(colored, money)}>{ formattedString }</span>