<script lang=ts>
    import logo from "../../images/septa_logo.png";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import TripCard from "../../components/trip-card.svelte";
    import SeptaKey from "../../components/septa-key.svelte";
    import type { Trip, Key, UserData } from "../../types";
    import StatisticsCard from "../../components/statistics-card.svelte";

    let form: UserData;

    if (browser) {
        let storedForm: string | null = window.sessionStorage.getItem("user_data");
        if (storedForm !== null) {
           form = JSON.parse(storedForm);
        } else {
            goto("/login");
        }
    }

    function logOut() {
        if (browser) {
            window.sessionStorage.removeItem("user_data");
            goto("/login");
        }
    }

    function getMostCommonItemInArray(arr: string[]) {
        return arr.sort( (a, b) =>
                    arr.filter((v) => v === a).length -
                    arr.filter((v) => v === b).length
            ).at(-1);
    }

    function getMostCommonRoute(arr: Trip[]) {
        let routes = arr.map((x) => x.entry_route);
        routes.concat(arr.map((x) => x.exit_route));
        return getMostCommonItemInArray(routes); 
    }

    function getMostCommonStation(arr: Trip[]) {
        let stations = arr.map((x) => x.entry_stop);
        stations.concat(arr.map((x) => x.exit_stop));
        return getMostCommonItemInArray(stations); 
    }
</script>

<img alt={"SEPTA Logo"} src={logo} width="200" />
<p style="font-size: small;">
    This site has no affiliation with the Southeastern Pennsylvania
    Transportation Authority
</p>

<div style="margin-top: 50px;">
    {#if form != null}
        <p>Welcome, {form.user.firstname} {form.user.lastname}</p>
        <button on:click={logOut}>Log Out</button>

        <div
            style="display: flex; flex-direction: row; justify-content: space-around"
        >
            <div>
                <h2 style="text-align: center;">Your SEPTA Keys</h2>
                <div>
                    {#each form.keys as key}
                        <SeptaKey {key} />
                    {/each}
                </div>
            </div>

            <div>
                <h2 style="text-align: center;">Recent Trips</h2>
                <div>
                    {#each form.trips as trip}
                        <TripCard {trip} />
                    {/each}
                </div>
            </div>

            <div>
                <h2 style="text-align: center;">Statistics</h2>
                <div>
                   
                    <StatisticsCard title={"Total Trips"} content={form.trips.length} />
                    <StatisticsCard title={"Total Fares"} content={`\$${[...form.trips].reduce((x, y) =>  x + y.amount, 0).toFixed(2)}`} />
                    <StatisticsCard title={"Favorite Route"} content={getMostCommonRoute([...form.trips]) ?? "N/A"} />
                    <StatisticsCard title={"Favorite Station"} content={getMostCommonStation([...form.trips]) ?? "N/A"} />
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    p {
        margin: 0;
    }
</style>
