<script>
    import Panel from "./Panel/Panel.svelte";
    import Container from "./Container/Container.svelte";
    import Background from "./Container/Background.svelte";
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
    <Panel></Panel>
    <Container></Container>
    <Background></Background>
</main>
