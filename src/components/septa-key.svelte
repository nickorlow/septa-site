<script lang=ts>
    import type {Key} from "../types";
    export let key: Key; 
</script>

<div class="septa-key">
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 70px">
        <p>{key.card_number}</p>
        <div style="display: flex; justify-content: space-between;">
            <p>{key.expiration_date}</p>
            <p>${key.balances.travel_wallet_balance.toFixed(2)}</p>
        </div>
    </div>
</div>

<style>
    p {
        margin: 0;
        font-size: 1rem;
    }
    .septa-key {
        background-color: #04AFAA;
        border-radius: 10px; 
        padding: 10px;
        color: white;
        width: 150px;
        height: 70px;
        font-size: 1.2rem;
        text-align: right;
    }
</style>
