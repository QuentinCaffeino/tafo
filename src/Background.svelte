<script>
    import {fade} from 'svelte/transition';


    let visible = false;

    let windowWidth = window.innerWidth;

    let windowHeight = window.innerHeight;

    let imageUrl = '';


    const getImageUrl = (width, height) => {
        return `https://picsum.photos/${width}/${height}`;
    };


    const updateImage = (src) => {
        const img = new Image();

        img.onload = function () {
            visible = !visible;
        };

        img.src = src;
    };

    imageUrl = getImageUrl(windowWidth, windowHeight);
    updateImage(imageUrl);
</script>

<style lang="sass">
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


{#if visible}
    <div class="image" style="background-image: url({imageUrl})"
         transition:fade="{{ duration: 300 }}"></div>
{/if}
