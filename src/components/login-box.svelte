<script lang=ts>
    import type {Error} from "../types";
    export let error: Error | null;
</script>

<div class="login-page">
    <form method="POST" action="login?/getToken">
        <div class="login-box">
            <h2 style="text-align: center;">Login</h2>
            {#if error !== null}
                <div class="warning-box">
                    <p>
                        {error.reason}
                    </p>
                </div>
            {/if}
            <p>Username</p>
            <input name="username"/>
            <p>Password</p>
            <input name="password" type="password"/>
            <div>
                <button style="width: 100%; margin-top: 5px;">Login</button>
            </div>
            <div class="warning-box">
                <p>
                    This site is not affiliated with SEPTA in any way. You will be sending
                    your account details to a server to one not owned by SEPTA. The owner
                    of this website assumes no responsibility for the security of your SEPTA
                    account.
                </p>
            </div>
        </div>
    </form>
</div>

<style>
    p {
        margin: 0;
    }
    .login-box {
        border: 2px solid #000000;
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: max-content;
        padding: 5px;
        border-radius: 5px;
    }
    .warning-box {
        background-color: red;
        padding: 2px;
        border-radius: 5px;
        margin: 2px;
        font-size: small;
        color: white;
    }
    input {
        width: 95%;
    }
</style>