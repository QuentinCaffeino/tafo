import {readable, derived, writable} from 'svelte/store';
import {ImmortalDB} from 'immortal-db';


export const time = readable(new Date(), set => {
    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return () => {
        clearInterval(interval);
    };
});


const twelveHourFormatToggleKey = 'tafo.clock.twelveHourFormatToggle';

export const twelveHourFormatToggle = writable(true);

// TODO: Deal with jumping on start
ImmortalDB.get(twelveHourFormatToggleKey, true)
    .then(data => twelveHourFormatToggle.set(data === 'true'))

twelveHourFormatToggle.subscribe($twelveHourFormatToggle => {
    ImmortalDB.set(twelveHourFormatToggleKey, $twelveHourFormatToggle)
});


export const formatter = derived(twelveHourFormatToggle, ($twelveHourFormatToggle, set) => {
    set(new Intl.DateTimeFormat('en', {
        hour12: $twelveHourFormatToggle,
        hour: 'numeric',
        minute: '2-digit'
    }));
});
