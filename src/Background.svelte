<script>
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    const getImageUrl = (width, height) => {
        return `https://picsum.photos/${width}/${height}`;
    };

    const imageUrl = getImageUrl(windowWidth, windowHeight);
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


<div class="image" style="background-image: url({imageUrl})"></div>
