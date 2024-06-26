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

    const btnTL = gsap.timeline({
        speed: 20,
    }).timeScale(3.5);
    if (isHovered) {
        // Анимация при наведении
        btnTL.to(buttonTarget, {
            scale: 1.2,
            color: "#1beb9e",
            // transformOrigin: "left center"
        })
        // btnTL.from(overlayBg, {
        //    x: 0,
           
        // })
        //     .to(buttonTarget, {
        //         color: 'white'
        // })
        // .to(overlayBg, {
        //    x: 100,
          
        // });
    
    } else {
        // Анимация при снятии наведения
        btnTL.to(overlayBg, {
            x: 0,
          
        })
            .to(buttonTarget, {
                color: '#FEB64D',
                scale: 1,
        })
       
    }
};

    
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

export const fadeInAnimation = (element) => {
    let tl = gsap.timeline().timeScale(0.5)
    
    tl.from(element, {
        opacity: 0,
        // scale: 0,
        ease: 'power1.out',
    })
    .to(element, {
        opacity: 1,
   
       
       

    })

}

export const fadeInToDown = (element) => {
    let tl = gsap.timeline()
    tl.from(element, {
  
        y: -100
    })
    .to(element, {
        ease: "power2.out",
        
        y: 100
    })
    .to(element, {
        delay: 3,
        y: -100
    })
}

export const fadeInTooltip = (element) => {
    gsap.fromTo(
        element,
        {
            autoAlpha: 0,
            y: -100,
        },
        {
            duration: 0.3,
            autoAlpha: 1,
            y: 100,
            ease: "power2.out",
        }
    );
};
export const fadeOutTooltip = (element, delay = 3) => {
    gsap.to(element, {
        delay,
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            // Скрыть тултип после завершения анимации
            element.style.display = "none";
        },
    });
};





