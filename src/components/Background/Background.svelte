<script>
    import {fade} from 'svelte/transition';
    import {visible, image} from './BackgroundStore';
</script>

<style>
    .image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.5;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>


{#if $visible}
    <div class="image" style="background-image: url({$image.src})"
         transition:fade="{{ duration: 300 }}"></div>
{/if}
