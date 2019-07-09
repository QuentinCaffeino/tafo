<script>
    export let to = "";


    const getProps = ({location, href, isPartiallyCurrent, isCurrent}) => {
        const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        // The object returned here is spread on the anchor element's attributes
        if (isActive) {
            return {class: "active"};
        }

        return {};
    }
</script>


<a to={to} getProps={getProps}>
    <slot></slot>
</a>
