import {readable, derived, writable} from 'svelte/store';


export const time = readable(new Date(), set => {
    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return () => {
        clearInterval(interval);
    };
});


export const twelveHourFormatToggle = writable(true);

export const formatter = derived(twelveHourFormatToggle, ($twelveHourFormatToggle, set) => {
    set(new Intl.DateTimeFormat('en', {
        hour12: $twelveHourFormatToggle,
        hour: 'numeric',
        minute: '2-digit'
    }));
});
