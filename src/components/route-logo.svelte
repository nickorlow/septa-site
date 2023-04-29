<script lang=ts>
    export let routeAbbreviation: string;
    enum RouteColor {
        L = '#2E99D1',
        B = '#EE6737',
        M = '#63398F',
        D = '#73bb4d',
        T = '#dd4d80',
        G = '#f6da15',
        RR = '#c0c0c0',
        BUS = '#c2abce'
    }

    let routeColor: RouteColor = getRouteColor(routeAbbreviation);

    function getRouteColor(abbv: string): RouteColor {
        switch (abbv) {
            case "L":
                return RouteColor.L;

            case "B":
                return RouteColor.B;

            case "M":
                return RouteColor.M;

            case "D":
                return RouteColor.D;

            case "T":
                return RouteColor.T;

            case "G":
                return RouteColor.G;

            case "RR":
                return RouteColor.RR;

            case "BUS":
                return RouteColor.BUS;
        }
        return RouteColor.RR;
    }
</script>

<div class="route-logo-box" style={`background-color: ${routeColor};`}>
    <p style={"font-size: 1.5rem"}>{routeAbbreviation}</p>
</div>

<style>
.route-logo-box {
    color: white;
    font-size: 2.2rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 60px;
    font-family: "Roboto", sans-serif;
}
</style>
