<script>
    const api = 'https://api.adviceslip.com/advice';

    let quoteText = '';

    fetch(api)
            .then(response => {
                response.json()
                        .then(data => {
                            quoteText = data.slip.advice;
                        })
            });
</script>


<div class="mdc-card mdc-card--outlined">
    <h3>{quoteText}</h3>
</div>
