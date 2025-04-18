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
const maxTrailLength = 30;
const retractSpeed = 0.1;
const inactivityThreshold = 50;

let lastMoveTime = Date.now();

document.addEventListener("mousemove", (e) => {
    lastMoveTime = Date.now();

    trail.push({ 
        x: e.clientX, 
        y: e.clientY,
        initialX: e.clientX,
        initialY: e.clientY,
    });

    if (trail.length > maxTrailLength) {
        trail.shift();
    }
});

function drawSmoothLine(prev, curr, thickness = 2) {
    const controlPoint1 = {
        x: prev.x + (curr.x - prev.x) / 3,
        y: prev.y + (curr.y - prev.y) / 3
    };

    const controlPoint2 = {
        x: curr.x - (curr.x - prev.x) / 3,
        y: curr.y - (curr.y - prev.y) / 3
    };
    
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, curr.x, curr.y);
    ctx.strokeStyle = "rgba(255, 0, 0, 1)";
    ctx.lineWidth = thickness;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentTime = Date.now();
    const isInactive = currentTime - lastMoveTime > inactivityThreshold;

    if (isInactive && trail.length > 0) {
        trail.shift();
    }

    const lineThickness = 1.5;

    for (let i = 1; i < trail.length; i++) {
        const prev = trail[i - 1];
        const curr = trail[i];

        drawSmoothLine(prev, curr, lineThickness);
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

const clickableElements = document.querySelectorAll("a, button, .project-item, .char-wrapper, .form-control");

clickableElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        if (!el.classList.contains("skill-item")) { 
            cursor.classList.add("expand");
        }
    });

    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("expand");
    });
});

const skillItems = document.querySelectorAll(".char-wrapper");

skillItems.forEach(item => {
    item.classList.add("skill-item");
});

gsap.utils.toArray(".snap-section").forEach(section => {
  gsap.fromTo(section,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        markers: false
      }
    }
  );
});

document.querySelectorAll(".animated-link").forEach(link => {
    const text = link.textContent.trim();
    link.innerHTML = ""; 
  
    for (let char of text) {
      const wrapper = document.createElement("span");
      wrapper.classList.add("char-wrapper");
  
      const top = document.createElement("span");
      top.textContent = char;
  
      const bottom = document.createElement("span");
      bottom.textContent = char;
  
      wrapper.appendChild(top);
      wrapper.appendChild(bottom);
      link.appendChild(wrapper);
    }
});

function showMessage(event) {
    event.preventDefault(); 
  
    const message = document.createElement('div');
    message.textContent = 'Message sent!';
    message.className = 'custom-toast';
    document.body.appendChild(message);
  
    setTimeout(() => {
      message.remove();
    }, 5000);
  
    const form = event.target;
    form.reset();
  }

  const loadingText = document.getElementById("loading-number");
  const scrambleText = document.getElementById("scramble-text");
  const targetWord = "MHNBL";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  let count = 0;
  const interval = setInterval(() => {
    loadingText.textContent = count.toString().padStart(2, "0");
  
    let display = "";
    for (let i = 0; i < targetWord.length; i++) {
      if (count >= (i + 1) * 20) {
        display += targetWord[i];
      } else {
        display += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    scrambleText.textContent = display;
  
    count++;
    if (count > 100) {
      clearInterval(interval);
  
      const loadingScreen = document.getElementById("loading-screen");
      loadingScreen.style.opacity = 0;  
  
      setTimeout(() => {
        loadingScreen.classList.add("hidden");  
      }, 1000);
    }
  }, 30);

  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff" 
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5
      },
      "size": {
        "value": 3
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2
      }
    },
    "retina_detect": true
  });
  