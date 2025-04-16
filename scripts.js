const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth ease-out
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
const maxTrailLength = 10; // How many points to keep (controls trail length)

document.addEventListener("mousemove", (e) => {
trail.push({ x: e.clientX, y: e.clientY });

if (trail.length > maxTrailLength) {
    trail.shift(); // Remove oldest point
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

    const alpha = i / trail.length; // Fade effect based on position in trail
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
p.innerHTML = ""; // Clear existing

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
item.addEventListener('mouseenter', function() {
    const previewImageSrc = this.getAttribute('data-preview');
    
    // Create the preview image element if it doesn't exist yet
    let previewImage = document.querySelector('.preview-image');
    if (!previewImage) {
        previewImage = document.createElement('img');
        previewImage.src = previewImageSrc;
        previewImage.classList.add('preview-image');
        document.body.appendChild(previewImage);
    } else {
        previewImage.src = previewImageSrc;  // Update image source if it already exists
    }
    
    // Add the visible class to trigger the transition
    previewImage.classList.add('visible');
    });

item.addEventListener('mouseleave', function() {
    // Find the preview image and remove the 'visible' class to trigger the fade-out
    const previewImage = document.querySelector('.preview-image');
    if (previewImage) {
        previewImage.classList.remove('visible');
    }
    });
});