<script>
    import {fly} from 'svelte/transition';

    import Column from './components/Column.svelte';
    import Quote from './components/CustomBlocks/Quote.svelte';
    import Panel from './components/Panel.svelte';
    import Background from './components/Background/Background.svelte';

    import Home from './routes/Home.svelte';
</script>

<style>
    main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }

    .container {
        position: relative;
        z-index: 1;
    }

    .horizontally-centered {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
</style>


<main>
    <div class="container">
        <div class="row">
            <Column>
                <Home></Home>
            </Column>

            <Column>
                <div class="row horizontally-centered">
                    <Quote></Quote>
                </div>
            </Column>
        </div>

        <!-- <div class="row">
            <Panel></Panel>
        </div> -->
    </div>

    <Background></Background>
</main>
