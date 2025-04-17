const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const trail = [];
const maxTrailLength = 10;

document.addEventListener("mousemove", (e) => {
    trail.push({ x: e.clientX, y: e.clientY });

    if (trail.length > maxTrailLength) {
        trail.shift(); 
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
            const prev = trail[i - 1];
            const curr = trail[i];

            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);

            const alpha = i / trail.length; 
            ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    requestAnimationFrame(animate);
}

animate();

document.querySelectorAll(".skill-container p").forEach(p => {
    const text = p.textContent;
    p.innerHTML = ""; 

    for (let char of text) {
        const wrapper = document.createElement("span");
        wrapper.classList.add("char-wrapper");

        const top = document.createElement("span");
        top.textContent = char;

        const bottom = document.createElement("span");
        bottom.textContent = char;

        wrapper.appendChild(top);
        wrapper.appendChild(bottom);
        p.appendChild(wrapper);
    }
});

document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const previewImageSrc = this.getAttribute('data-preview');

        let previewImage = document.querySelector('.preview-image');
        if (!previewImage) {
            previewImage = document.createElement('img');
            previewImage.src = previewImageSrc;
            previewImage.classList.add('preview-image');
            document.body.appendChild(previewImage);
        } else {
            previewImage.src = previewImageSrc;
        }

        previewImage.classList.add('visible');
    });

    item.addEventListener('mouseleave', function () {
        const previewImage = document.querySelector('.preview-image');
        if (previewImage) {
            previewImage.classList.remove('visible');
        }
    });
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".helo .letter").forEach((el, i) => {
    gsap.fromTo(el, {
        opacity: 0,
        y: 100,
    }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: ".helo",
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            delay: i * 0.1,
            markers: false,
        }
    });
});

gsap.to("#ab", {
    scrollTrigger: {
        trigger: ".content-wrapper",
        start: "top 50%",
        end: "top 30%",
        scrub: true,
    },
    scale: 1,
    opacity: 1
});

const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});

const clickableElements = document.querySelectorAll("a, button, .project-item, .char-wrapper");

clickableElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("expand");
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("expand");
    });
});