import {derived, readable} from 'svelte/store';


const getImageUrl = (width, height) => {
    return `https://picsum.photos/${width}/${height}`;
};


export const windowWidth = readable(window.innerWidth, set => {});

export const windowHeight = readable(window.innerHeight, set => {});


export const image = derived([windowWidth, windowHeight], ([$windowWidth, $windowHeight], set) => {
    if ($windowWidth && $windowHeight) {
        const image = new Image;
        image.src = getImageUrl($windowWidth, $windowHeight);
        set(image);
    } else {
        set(new Image);
    }
});


export const visible = readable(false, set => {
    image.subscribe($image => {
        if ($image instanceof Image) {
            $image.onload = () => set(true);
        }
    });
});
