<script lang=ts>
    import LoginBox from "../../components/login-box.svelte";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import type { Trip, Key, Error, UserDataResponse } from "../../types";

    export let form: UserDataResponse;
    let error: Error | null = null;

    if(form != null) {
        error = form.error ?? null;

        if(error === null && browser) {
            window.sessionStorage.setItem("user_data", JSON.stringify(form));
            goto("/dashboard");
        }
    }
</script>

<LoginBox error={error} />