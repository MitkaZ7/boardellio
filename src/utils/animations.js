import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { CSSPlugin } from "gsap/CSSPlugin";
gsap.registerPlugin(TextPlugin, ScrollTrigger, CSSPlugin);


const tl = gsap.timeline({ 
    repeat: -1,
    
});

export const buttonHoverAnimation = (buttonTarget, isHovered, subItemClass) => {
    let button = gsap.utils.selector(buttonTarget);
    let overlayBg = button(subItemClass)
    console.log(button)
    const btnTL = gsap.timeline().timeScale(3.5);
    if (isHovered) {
        // Анимация при наведении
        btnTL.from(overlayBg, {
           x: 0,
           
        })
            .to(buttonTarget, {
                color: 'white'
        })
        .to(overlayBg, {
           x: 100,
          
        });
    
    } else {
        // Анимация при снятии наведения
        
        btnTL.to(overlayBg, {
            x: 0,
        })
            .to(buttonTarget, {
                clearProps: 'color'
        })
       
    }
};

// export const buttonHoverAnimation = (buttonTarget, isHovered) => {
//     if (isHovered) {
//         // Анимация при наведении
//         gsap.to(buttonTarget, {
//             background: 'linear-gradient(to left, red, green)',
//             duration: 0.3,
//         });
//     } else {
//         // Анимация при снятии наведения
//         gsap.to(buttonTarget, {
//             background: 'linear-gradient(to left, red, green)',
//             duration: 0.3,
//             clearProps: 'background',
//         });
//     }
// };

    
export const technologyScroll = (arrayElements) => {
    for (let i = 0; i < arrayElements.length; i++) {
        let delay = i + 1;
        const elemTL = gsap.timeline();
        if ( i !== 0 ) {
            elemTL.from(arrayElements[i], 1, { y: '-100%', opacity: 0, ease: 'power2.out' })
        }
        if (i !== arrayElements.length) {
            elemTL.to(arrayElements[i], 2, { y: '100%', opacity: 0, ease: 'power2.out' })
        }
        tl.add(elemTL, delay)
   
    }
};





