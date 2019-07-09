<style>
    div {
        /*TODO: Add media for smaller screens so blocks aren't 100vh*/
        height: calc(100vh - var(--panel-height));
    }
</style>


<div class="col-md-6">
    <slot></slot>
</div>
