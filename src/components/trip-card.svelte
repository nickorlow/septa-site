<script lang=ts>
    import RouteLogo from './route-logo.svelte';
    import type {Trip} from '../types';

    export let trip: Trip;

    function getRoute(trip: Trip) {
        if(trip.mode == "Regional Rail") {
            if(trip.entry_route == "Junction Route" && trip.exit_route == "Junction Route") {
                return "Center City";
            }

            if(trip.entry_route == "Junction Route" || trip.entry_route == null) {
                return trip.exit_route;
            }

            if(trip.exit_route == "Junction Route" || trip.exit_route == null) {
                return trip.entry_route;
            }

            return trip.entry_route + " -> " + trip.exit_route;
        }

        if(trip.mode == "NHSL") {
            return "Montgomery Lines";
        }

        if(trip.mode == "Bus") {
            return "Bus Route " + trip.entry_route;
        }

        if(trip.mode == "Subway") {
            return trip.entry_route === "MFL" ? "Market-Frankford Lines" : "Broad Street Lines";
        }

        return trip.entry_route;
    }

    function getRouteAbbreviation(trip: Trip) {
        if(trip.mode == "Regional Rail") {
            return "RR";
        }

        if(trip.mode == "NHSL") {
            return "M";
        }

        if(trip.mode == "Bus") {
            return "BUS";
        }

        if(trip.mode == "Subway") {
            return trip.entry_route === "MFL" ? "L" : "B";
        }

        if(trip.mode == "Trolley") {
            //TODO: Seperate between Delco 'D' , Philadelphia 'T', and Girard 'G' Trollies
            return "T";
        }

        return "N";
    }
</script>

<div class="trip-card">
    <RouteLogo routeAbbreviation={getRouteAbbreviation(trip)}/>
    <div style="max-height: 60px; padding: 5px; width: 100%;">
        <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <p class="stop-text">{trip.entry_stop}{trip.exit_stop != null ? (" → " + trip.exit_stop) : ""}</p>
            <p>{trip.trip_type === "Transfer" ? "Free Transfer" : `\$${trip.amount.toFixed(2)}`}</p>
        </div>
        <p class="route-text">{getRoute(trip)}</p>
        <p class="time-text">{new Date(trip.entry_time).toLocaleString()}</p>
    </div>
</div>

<style>
    p {
        margin: 0;
    }
    .trip-card {
        background-color: #eee; 
        display:flex; 
        flex-direction: row; 
        margin-bottom: 10px;
    }
    .stop-text {
        font-weight: bold;
    }
    .time-text {
        font-size: small;
    }
    .route-text {
        font-size: small;
    }
</style>
