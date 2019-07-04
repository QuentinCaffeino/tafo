<script>
    import {fly} from 'svelte/transition';

    const api = 'https://api.adviceslip.com/advice';


    let visible = false;

    let quoteText = '';


    fetch(api)
            .then(response => {
                response.json()
                        .then(data => {
                            quoteText = data.slip.advice;
                            visible = !visible;
                        })
            });
</script>


{#if visible}
    <div class="col shadow pt-3 pr-3 pl-3 pb-2 bg-white rounded text-dark"
         transition:fly="{{ y: 200, duration: 400 }}">
        <h3>{quoteText}</h3>
    </div>
{/if}
