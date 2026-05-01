

//navbar animation
gsap.from("navbar",{
    y:-100,
    duration:1,
    delay:0.3
});
//navlinks animation
gsap.from(".navbar li",{
    y:-30,
    opacity:0,
    stagger:0.2,
    delay:1.5,
    duration:0.4,
})
//nav h1 animation
gsap.from(".navbar h2",{
    y:-30,
    opacity:0,
    stagger:0.2,
    delay:1,
    duration:0.4,
})
//nav button animation
gsap.from(".navbar button",{
    y:-30,
    opacity:0,
    stagger:0.2,
    delay:1.75,
    duration:0.4,
})

const words = [
  "Frontend Developer",  
]
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
function type() {
  const current = words[wordIndex];
  const el = document.getElementById("typewriter");

  if (isDeleting) {
    // Backspace
    el.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Typing
    el.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  // Word complete — start deleting
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1400);  // pause before delete
    return;
  }

  // Word deleted — next word
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  // Speed
  const speed = isDeleting ? 70 : 200;
  setTimeout(type, speed);
}

// Start
type();
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.5,
    ease: "power2.out"
  });
});

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
    end: "bottom 60%",
    scrub: 1, // 🔥 smooth scroll control
  }
});
// LEFT shapes
tl.from(".s1", {
  x: -300,
  opacity: 0,
  duration: 1
})
.from(".s2", {
  x: -300,
  opacity: 0,
  duration: 1
}, "-=0.6") // overlap for smoothness 😏


// RIGHT shapes
.from(".s3", {
  x: 300,
  opacity: 0,
  duration: 1
}, "-=0.8")
.from(".s4", {
  x: 300,
  opacity: 0,
  duration: 1
}, "-=0.6")



// Cards stagger in
  gsap.from(".skill-card", {
    scrollTrigger: {
      trigger: ".cards-grid",
      start: "top 85%",
      once: true,
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power3.out"
  });
 
  // Section title
  gsap.from(".section-title", {
    scrollTrigger: { trigger: ".skills", start: "top 80%", once: true },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
 
  // Progress bars animate on scroll
  const bars = document.querySelectorAll(".bar-fill");
 
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute("data-width");
        // small delay so user sees it start from 0
        setTimeout(() => {
          target.style.width = width + "%";
        }, 200);
        barObserver.unobserve(target);
      }
    });
  }, { threshold: 0.3 });
 
  bars.forEach(bar => barObserver.observe(bar));
 
  // Bar items fade in
  gsap.from(".bar-item", {
    scrollTrigger: {
      trigger: ".bars-grid",
      start: "top 85%",
      once: true,
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out"
  });


  const track = document.getElementById("track");
  const cards = document.querySelectorAll(".proj-card");
  const dots  = document.querySelectorAll(".pdot");
 
  // How far to scroll horizontally
  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + (window.innerWidth * 0.16));
 
  // Pin + horizontal drag on scroll
  const tween = gsap.to(track, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: ".projects-pin",
      start: "top top",
      end: () => `+=${track.scrollWidth}`,
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Update dots
        const idx = Math.round(self.progress * (cards.length - 1));
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      }
    }
  });
 
  // Cards fade in stagger on section enter
  gsap.from(".proj-card", {
    scrollTrigger: {
      trigger: ".projects-pin",
      start: "top 90%",
      once: true,
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
  });
 
  // Header animate in
  gsap.from(".projects-header", {
    scrollTrigger: {
      trigger: "#Projects",
      start: "top 80%",
      once: true,
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
 
  // Dot click to jump
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      const progress = i / (cards.length - 1);
      const st = tween.scrollTrigger;
      const scrollTo = st.start + (st.end - st.start) * progress;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    });
  });
  // Marquee
let marqueeDirection = -1; // -1 = left, 1 = right
let marqueeX = 0;
let marqueeSpeed = 0.8;
const content = document.getElementById("marqueeContent");

// Animate loop
function animateMarquee() {
  marqueeX += marqueeDirection * marqueeSpeed;

  // Reset for seamless loop
  const halfWidth = content.offsetWidth / 2;
  if (marqueeX <= -halfWidth) marqueeX = 0;
  if (marqueeX >= 0 && marqueeDirection === 1) marqueeX = -halfWidth;

  gsap.set(content, { x: marqueeX });
  requestAnimationFrame(animateMarquee);
}
animateMarquee();

// Direction change on scroll
window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0) {
    marqueeDirection = -1; // scroll down → left
  } else {
    marqueeDirection = 1;  // scroll up → right
  }
});



gsap.from(".hero-content", {
  y: 80,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

