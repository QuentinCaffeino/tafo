<script>
    import Background from "./Background.svelte";
    import Container from "./Container.svelte";
</script>

<style lang="sass">
    main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
</style>


<main>
    <Container></Container>
    <Background></Background>
</main>
