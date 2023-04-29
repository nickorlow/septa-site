<script lang=ts>
    export let title: string;
    export let content: string;
</script>

<div class="statistics-card">
    <div style="max-height: 60px; padding: 5px; width: 100%;">
        <div style="display: flex; flex-direction: row; justify-content: space-between;" >
            <p class="title-text">{title}</p>
        </div>
        <p class="content-text">
            {content}
        </p>
    </div>
</div>

<style>
    p {
        margin: 0;
    }

    .statistics-card {
        background-color: #eee; 
        display:flex; 
        flex-direction: row; 
        margin-bottom: 10px;
    }

    .title-text {
        font-weight: bold;
    }

    .content-text {
        font-size: small;
    }
</style>
