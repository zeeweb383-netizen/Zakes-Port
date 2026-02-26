// Contact form simulation
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (name && email && message) {
    formMsg.textContent = "🚀 Message sent successfully!";
    formMsg.classList.remove("text-red-500");
    formMsg.classList.add("text-green-500");
    contactForm.reset();
  } else {
    formMsg.textContent = "❌ Please fill out all fields.";
    formMsg.classList.remove("text-green-500");
    formMsg.classList.add("text-red-500");
  }
});

/* === GALLERY MODAL FUNCTIONALITY === */
class GalleryModal {
  constructor() {
    this.modal = document.getElementById("galleryModal");
    this.closeBtn = document.getElementById("closeModal");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.exportBtn = document.getElementById("exportBtn");
    this.favoriteBtn = document.getElementById("favoriteBtn");
    this.galleryImage = document.getElementById("galleryImage");
    this.currentItemSpan = document.getElementById("currentItem");
    this.totalItemsSpan = document.getElementById("totalItems");
    this.itemTitle = document.getElementById("itemTitle");
    this.itemCategory = document.getElementById("itemCategory");
    this.itemDescription = document.getElementById("itemDescription");
    this.itemTech = document.getElementById("itemTech");
    this.itemYear = document.getElementById("itemYear");
    this.itemStatus = document.getElementById("itemStatus");
    
    this.currentIndex = 0;
    this.favorites = new Set();

    // Keep references for moving description on mobile
    this._descriptionOriginalParent = this.itemDescription ? this.itemDescription.parentNode : null;
    this._descriptionNextSibling = this.itemDescription ? this.itemDescription.nextElementSibling : null;
    this._galleryImageContainer = document.querySelector('.gallery-image-container');

    // Gallery Items Data - update slides 1-26 with provided details
    this.items = [
      { id: 0, title: "Telkom Times Publications", category: "Creative Thinking", description: "Editorial Design & Content Development - Monthly publication content showcasing editorial design, storytelling, and structured article development for internal communication.", tech: "Editorial Design, Content Writing, Typography, Digital Publishing, SharePoint", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_02.png" },
      { id: 1, title: "Content Deliverables & Growth", category: "Creative Thinking", description: "Content Performance Strategy - Visual presentation of content deliverables and communication outputs including articles, campaigns, and messaging platforms.", tech: "Data Visualization, Infographic Design, Corporate Layout Design, Microsoft PowerPoint", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_03.png" },
      { id: 2, title: "SABRE Awards Achievement", category: "Creative Thinking", description: "Award-Winning Communication Campaign - Showcase of award-winning internal communication work demonstrating excellence in employee engagement and corporate messaging.", tech: "Campaign Design, Corporate Branding, Communication Strategy, Presentation Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_04.png" },
      { id: 3, title: "Readership Analytics", category: "Creative Thinking", description: "Communication Analytics & Reporting - Graphical representation of readership growth and communication performance across multiple reporting periods.", tech: "Data Visualization, Infographic Design, Microsoft Excel, PowerPoint Charts", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_05.png" },
      { id: 4, title: "Performing Content", category: "Creative Thinking", description: "Engagement Performance Insights - Data-driven presentation showing performance of communication content across different months and platforms.", tech: "Data Visualization, Infographic Design, Reporting Design, Microsoft PowerPoint", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_06.png" },
      { id: 5, title: "Communication Channel Enhancements", category: "Creative Thinking", description: "Digital Communication Experience - Presentation of enhanced internal communication platforms designed to improve content visibility, accessibility, and employee engagement through modern digital interfaces.", tech: "UX Design, Interface Design, Digital Communication Design, SharePoint, Viva Connect, Layout Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_07.png" },
      { id: 6, title: "Viva Engage Performance", category: "Creative Thinking", description: "Social Engagement Strategy - Overview of internal social platform engagement including content performance, employee reactions, and communication reach.", tech: "Content Design, Social Media Design, Engagement Strategy, Digital Content Creation", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_08.png" },
      { id: 7, title: "Viva Engage Analytics", category: "Creative Thinking", description: "Engagement Analysis & Optimization - Data-driven analysis showing engagement levels and opportunities for improving communication through diversified content formats.", tech: "Data Visualization, Reporting Design, Digital Analytics, Infographic Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_09.png" },
      { id: 8, title: "Telkom Bulletin Communication", category: "Creative Thinking", description: "Message Design & Distribution - Structured communication messages designed and distributed to employees using visually clear and engaging layouts.", tech: "Layout Design, Typography, Email Design, Corporate Branding, Microsoft Outlook Templates", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_10.png" },
      { id: 9, title: "Safety Awareness Campaign", category: "Creative Thinking", description: "Safety Awareness Campaign Design - Communication campaign designed to promote safe driving practices through articles, visual messaging, and awareness materials.", tech: "Campaign Design, Visual Communication, Screensaver Design, Content Development, Graphic Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_11.png" },
      { id: 10, title: "Heritage Month Communication", category: "Creative Thinking", description: "Cultural Campaign Design - Communication materials designed to support cultural awareness initiatives and organisational engagement during Heritage Month.", tech: "Graphic Design, Visual Storytelling, Campaign Design, Corporate Branding", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_12.png" },
      { id: 11, title: "Business Unit Support", category: "Creative Thinking", description: "Digital Application Development - Development and testing of digital applications and communication tools supporting various business unit initiatives.", tech: "Web Design, UI Design, Form Development, Application Testing, HTML, SharePoint", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_14.png" },
      { id: 12, title: "AGM Communication", category: "Creative Thinking", description: "Corporate Information Distribution - Structured communication materials developed to distribute important corporate information clearly and professionally to employees and stakeholders.", tech: "Layout Design, Corporate Branding, Communication Design, Microsoft PowerPoint", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_15.png" },
      { id: 13, title: "Newsletter Design & Storytelling", category: "Creative Thinking", description: "Newsletter Design & Storytelling - Special edition newsletter designed to showcase value creation initiatives through engaging storytelling and professional editorial layout.", tech: "Editorial Design, Typography, Layout Design, Visual Storytelling, Graphic Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_16.png" },
      { id: 14, title: "Special Edition Newsletter", category: "Creative Thinking", description: "Newsletter Design & Storytelling - Special edition newsletter designed to showcase value creation initiatives through engaging storytelling and professional editorial layout.", tech: "Editorial Design, Typography, Layout Design, Visual Storytelling, Graphic Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_17.png" },
      { id: 15, title: "Cybersecurity Awareness Campaign", category: "Creative Thinking", description: "Digital Awareness Campaign - Multi-channel awareness campaign designed to educate employees on cybersecurity practices through articles, emailers, and interactive sessions.", tech: "Campaign Design, Email Design, Visual Communication, Content Strategy, Graphic Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_18.png" },
      { id: 16, title: "Innovation Campaign (Lions’ Den)", category: "Creative Thinking", description: "Innovation Campaign Design - Creative campaign materials developed to promote innovation participation through engaging visual content and communication activations.", tech: "Campaign Design, Motion Graphics, Email Design, Visual Communication, Graphic Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_19.png" },
      { id: 17, title: "Innovation Campaign Activations", category: "Creative Thinking", description: "Engagement Activation Design - Creative engagement activities and communication materials designed to increase participation and awareness through interactive experiences.", tech: "Campaign Design, Promotional Design, Graphic Design, Visual Communication", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_20.png" },
      { id: 18, title: "Awareness Campaign Strategy", category: "Creative Thinking", description: "Awareness Campaign Planning - Strategic communication materials developed to support awareness initiatives through structured messaging and visual storytelling.", tech: "Campaign Planning, Graphic Design, Content Strategy, Visual Communication", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_21.png" },
      { id: 19, title: "Women’s Month Campaign", category: "Creative Thinking", description: "Integrated Campaign Design - Integrated communication campaign celebrating women's contributions through storytelling, digital content, and engagement initiatives.", tech: "Campaign Design, Social Media Design, Visual Storytelling, Graphic Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_22.png" },
      { id: 20, title: "Women’s Month Campaign Strategy", category: "Creative Thinking", description: "Campaign Concept Development - Concept development and communication strategy for a campaign designed to celebrate achievements and inspire future leadership.", tech: "Design Thinking, Concept Development, Campaign Strategy, Visual Communication", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_23.png" },
      { id: 21, title: "Women’s Month Completion", category: "Creative Thinking", description: "Campaign Execution & Delivery - Final campaign deliverables including video content, newsletters, and advertising materials designed to showcase campaign outcomes.", tech: "Video Production, Graphic Design, Layout Design, Advertising Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_24.png" },
      { id: 22, title: "Women’s Month Activities", category: "Creative Thinking", description: "Employee Engagement Campaign - Employee engagement initiatives designed to encourage participation and recognition through storytelling and digital content.", tech: "Graphic Design, Social Media Design, Campaign Design, Visual Storytelling", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_25.png" },
      { id: 23, title: "Women’s Month Extended Activities", category: "Creative Thinking", description: "Empowerment Campaign Design - Communication materials supporting empowerment initiatives including workshops, leadership development, and wellness activities.", tech: "Campaign Design, Graphic Design, Content Design, Visual Communication", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_26.png" },
      { id: 24, title: "Women’s Month Analytics", category: "Creative Thinking", description: "Campaign Performance Insights - Visual analytics demonstrating campaign reach, engagement, and communication performance.", tech: "Data Visualization, Reporting Design, Infographic Design", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_27.png" },
      { id: 25, title: "Social Media Marketing", category: "Creative Thinking", description: "Digital Marketing Strategy - Social media communication designed to promote organisational initiatives through engaging digital content and storytelling.", tech: "Social Media Design, Content Strategy, Graphic Design, Digital Marketing", year: "2025", status: "Completed", image: "images/Portfolio of evidence_Page_28.png" }
    ];

    this.totalItemsSpan.textContent = this.items.length;
    this.init();
  }

  init() {
    // Close button
    this.closeBtn.addEventListener("click", () => this.closeModal());
    
    // Keyboard: Escape to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        // Close gallery modal
        if (this.modal.classList.contains("active")) {
          this.closeModal();
        }
        // Close fullscreen viewer
        const fullscreenViewer = document.getElementById("fullscreenViewer");
        if (fullscreenViewer.classList.contains("active")) {
          this.closeFullscreen();
        }
        // Close image info modal
        const imageInfoModal = document.getElementById("imageInfoModal");
        if (imageInfoModal.classList.contains("active")) {
          this.closeImageInfo();
        }
      }
    });

    // Keyboard: Arrow keys for navigation
    document.addEventListener("keydown", (e) => {
      if (!this.modal.classList.contains("active")) return;
      if (e.key === "ArrowLeft") this.prevItem();
      if (e.key === "ArrowRight") this.nextItem();
    });

    // Update description placement on resize (mobile <-> desktop)
    window.addEventListener('resize', () => this.updateDescriptionPlacement());

    // Navigation buttons
    this.prevBtn.addEventListener("click", () => this.prevItem());
    this.nextBtn.addEventListener("click", () => this.nextItem());

    // Export button
    this.exportBtn.addEventListener("click", () => this.exportItem());

    // Favorite button
    this.favoriteBtn.addEventListener("click", () => this.toggleFavorite());

    // Backdrop close
    document.querySelector(".modal-backdrop").addEventListener("click", () => {
      this.closeModal();
    });

    // Fullscreen button
    document.getElementById("fullscreenBtn").addEventListener("click", () => {
      this.openFullscreen();
    });

    // Fullscreen close button
    document.getElementById("fullscreenCloseBtn").addEventListener("click", () => {
      this.closeFullscreen();
    });

    // Fullscreen backdrop close
    document.querySelector(".fullscreen-backdrop").addEventListener("click", () => {
      this.closeFullscreen();
    });

    // Fullscreen navigation
    document.getElementById("fullscreenPrevBtn").addEventListener("click", () => {
      this.prevItem();
    });

    document.getElementById("fullscreenNextBtn").addEventListener("click", () => {
      this.nextItem();
    });

    // Click on fullscreen image to close
    document.getElementById("fullscreenImage").addEventListener("click", () => {
      this.closeFullscreen();
    });

    // Open modal buttons (Explore More)
    document.querySelectorAll(".view-more-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.openModal();
      });
    });

    // Image info modal
    document.getElementById("imageInfoCloseBtn").addEventListener("click", () => {
      this.closeImageInfo();
    });

    document.getElementById("closeInfoBtn").addEventListener("click", () => {
      this.closeImageInfo();
    });

    document.getElementById("downloadImageBtn").addEventListener("click", () => {
      this.downloadCurrentImage();
    });

    document.querySelector(".image-info-backdrop").addEventListener("click", () => {
      this.closeImageInfo();
    });
  }

  openModal() {
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
    this.updateDisplay();
    this.updateDescriptionPlacement();
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
  
  updateDescriptionPlacement() {
    if (!this.itemDescription || !this._descriptionOriginalParent) return;
    
    // Keep description in its original location within gallery-details
    // The CSS media queries handle the visual positioning automatically
    if (this.itemDescription.parentNode !== this._descriptionOriginalParent) {
      if (this._descriptionNextSibling && this._descriptionNextSibling.parentNode === this._descriptionOriginalParent) {
        this._descriptionOriginalParent.insertBefore(this.itemDescription, this._descriptionNextSibling);
      } else {
        this._descriptionOriginalParent.appendChild(this.itemDescription);
      }
    }
  }

  updateDisplay() {
    const item = this.items[this.currentIndex];

    // Update image
    this.galleryImage.src = item.image;
    this.galleryImage.alt = item.title;

    // Update fullscreen image
    document.getElementById("fullscreenImage").src = item.image;
    document.getElementById("fullscreenImage").alt = item.title;

    // Update counter
    this.currentItemSpan.textContent = this.currentIndex + 1;
    document.getElementById("fullscreenCurrentItem").textContent = this.currentIndex + 1;

    // Update details
    this.itemTitle.textContent = item.title;
    this.itemCategory.textContent = item.category;
    this.itemDescription.textContent = item.description;
    this.itemTech.textContent = item.tech;
    this.itemYear.textContent = item.year;
    this.itemStatus.textContent = item.status;
    this.itemStatus.className = `metadata-value status-${item.status.toLowerCase().replace(" ", "-")}`;

    // Update favorite button state
    const isFavorite = this.favorites.has(item.id);
    this.favoriteBtn.classList.toggle("liked", isFavorite);

    // Ensure description placement follows the current viewport
    this.updateDescriptionPlacement();
  }

  nextItem() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateDisplay();
  }

  prevItem() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateDisplay();
  }

  goToItem(index) {
    this.currentIndex = index;
    this.updateDisplay();
  }

  toggleFavorite() {
    const item = this.items[this.currentIndex];
    if (this.favorites.has(item.id)) {
      this.favorites.delete(item.id);
    } else {
      this.favorites.add(item.id);
    }
    this.updateDisplay();
  }

  exportItem() {
    const item = this.items[this.currentIndex];
    const exportData = {
      title: item.title,
      category: item.category,
      description: item.description,
      tech: item.tech,
      year: item.year,
      status: item.status,
      timestamp: new Date().toISOString()
    };

    // Create JSON file
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);

    // Show feedback
    const originalText = this.exportBtn.innerHTML;
    this.exportBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Exported!</span>';
    setTimeout(() => {
      this.exportBtn.innerHTML = originalText;
    }, 2000);
  }

  openFullscreen() {
    const fullscreenViewer = document.getElementById("fullscreenViewer");
    fullscreenViewer.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeFullscreen() {
    const fullscreenViewer = document.getElementById("fullscreenViewer");
    fullscreenViewer.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  openImageInfo() {
    const imageInfoModal = document.getElementById("imageInfoModal");
    const galleryImage = document.getElementById("galleryImage");
    const infoPreviewImage = document.getElementById("infoPreviewImage");
    
    // Set preview image
    infoPreviewImage.src = galleryImage.src;
    
    // Get image dimensions
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      document.getElementById("imageDimensions").textContent = `${width} × ${height} px`;
      
      // Calculate estimated file size (rough estimate)
      const estimatedSize = Math.round((width * height * 3) / 1024); // Rough estimate in KB
      document.getElementById("imageFileSize").textContent = this.formatFileSize(estimatedSize * 1024);
    };
    img.src = galleryImage.src;
    
    // Set format
    const imageExtension = galleryImage.src.split('.').pop().toUpperCase();
    document.getElementById("imageFormat").textContent = imageExtension;
    
    imageInfoModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeImageInfo() {
    const imageInfoModal = document.getElementById("imageInfoModal");
    imageInfoModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  downloadCurrentImage() {
    const item = this.items[this.currentIndex];
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `${item.title.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Initialize Gallery Modal
const galleryModal = new GalleryModal();

// Helper function to open gallery by category
function openGalleryByCategory(categoryName) {
  // Filter items by category
  const filteredItems = galleryModal.items.filter(item => item.category === categoryName);
  
  // If we have filtered items, show them
  if (filteredItems.length > 0) {
    // Temporarily replace items with filtered ones
    const originalItems = galleryModal.items;
    galleryModal.items = filteredItems;
    
    // Update total items count
    galleryModal.totalItemsSpan.textContent = filteredItems.length;
    
    // Reset to first item
    galleryModal.currentIndex = 0;
    
    // Open modal
    galleryModal.openModal();
    
    // Restore original items when modal closes
    const closeHandler = () => {
      galleryModal.items = originalItems;
      galleryModal.totalItemsSpan.textContent = originalItems.length;
    };
    
    // Add one-time close listener
    galleryModal.modal.addEventListener('animationend', closeHandler, { once: true });
  }
}

// Attach category-based opening to project cards
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    const button = card.querySelector('.view-more-button');
    if (button) {
      // Determine which category this card represents
      const titleElement = card.querySelector('h4');
      const title = titleElement ? titleElement.textContent : '';
      
      let category = 'Creative Thinking'; // default
      if (title.includes('Digital Design')) category = 'Digital Design';
      if (title.includes('Web') || title.includes('App')) category = 'Web & App Development';
      
      // Add click listener
      button.addEventListener('click', (e) => {
        e.preventDefault();
        openGalleryByCategory(category);
      });
    }
  });
});


// Theme toggle
const toggleBtn = document.getElementById('themeToggle');
const bulb = document.getElementById('bulbIcon');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  bulb.classList.toggle('text-yellow-500');
});

// Typing effect
const typedText = document.getElementById('typed-text');
const phrases = [
  "+ Front-End Developer.",
  "+ Creative Digital Designer.",
  "+ Web Design Enthusiast."
];
let phraseIndex = 0;

function typePhrase(phrase) {
  let charIndex = 0;
  typedText.textContent = "";

  function typeChar() {
    if (charIndex < phrase.length) {
      typedText.textContent += phrase.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 50);
    } else {
      setTimeout(deletePhrase, 1500);
    }
  }

  typeChar();
}

function deletePhrase() {
  let current = typedText.textContent;
  function deleteChar() {
    if (current.length > 0) {
      current = current.slice(0, -1);
      typedText.textContent = current;
      setTimeout(deleteChar, 25);
    } else {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typePhrase(phrases[phraseIndex]);
    }
  }
  deleteChar();
}

typePhrase(phrases[phraseIndex]);

// Hero animations
gsap.from('#hero h2', {
  duration: 1,
  y: -50,
  opacity: 0,
  ease: "power3.out"
});

gsap.from('#hero p', {
  duration: 1.5,
  delay: 0.5,
  y: 50,
  opacity: 0,
  ease: "power3.out"
});

// Section scroll animation
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
});

// Glitter effect in hero
const hero = document.getElementById('hero');
const glitterLayer = document.createElement('div');
glitterLayer.classList.add('glitter-layer');
hero.appendChild(glitterLayer);

for (let i = 0; i < 100; i++) {
  const dot = document.createElement('div');
  dot.classList.add('glitter-dot');
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.animationDelay = `${Math.random() * 3}s`;
  glitterLayer.appendChild(dot);
}

// Spaceship animation
const spaceship = document.getElementById("spaceship");
function animateSpaceship() {
  const maxX = hero.clientWidth - spaceship.clientWidth;
  const maxY = hero.clientHeight - spaceship.clientHeight;

  gsap.to(spaceship, {
    duration: 2.5,
    top: Math.random() * maxY,
    left: Math.random() * maxX,
    rotation: Math.random() * 360,
    ease: "power2.inOut"
  });
}

setInterval(animateSpaceship, 3000);
window.addEventListener('load', () => {
  spaceship.style.top = `${hero.clientHeight / 2}px`;
  spaceship.style.left = `${hero.clientWidth / 2}px`;
  animateSpaceship();
});

// Contact animation
gsap.from("#contact .max-w-3xl", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 85%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out"
});

// Intersection animation
const contactSection = document.querySelector("#contact .animate-fade-in-up");
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    contactSection.classList.add("animate-fade-in-up");
    observer.unobserve(contactSection);
  }
}, { threshold: 0.3 });
observer.observe(contactSection);

// Input particle effect
const wrappers = document.querySelectorAll('.input-wrapper');
wrappers.forEach(wrapper => {
  wrapper.addEventListener('mousemove', e => {
    const particle = document.createElement('div');
    particle.className = 'input-particle';
    const rect = wrapper.getBoundingClientRect();
    particle.style.left = `${e.clientX - rect.left}px`;
    particle.style.top = `${e.clientY - rect.top}px`;
    wrapper.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  });
});

// Particle system in hero only
const particleConfig = {
  particles: [],
  numParticles: 50,
  maxConnections: 5,
  connectionThreshold: 150,
  baseSpeed: 0.2,
  canvas: null,
  ctx: null,
  width: 0,
  height: 0,
  density: 1,
  hoverArea: { x: null, y: null, active: false }
};

function initParticles() {
  particleConfig.canvas = document.createElement('canvas');
  Object.assign(particleConfig.canvas.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-1',
    pointerEvents: 'none',
    width: '100%',
    height: '100%'
  });

  hero.appendChild(particleConfig.canvas);
  particleConfig.ctx = particleConfig.canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  createParticles();
  animateParticles();
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);
  document.getElementById('data-refresh-btn').addEventListener('click', handleDataRefresh);
}

function resizeCanvas() {
  particleConfig.width = hero.clientWidth;
  particleConfig.height = hero.clientHeight;
  particleConfig.canvas.width = particleConfig.width;
  particleConfig.canvas.height = particleConfig.height;
}

function createParticles() {
  particleConfig.particles = [];
  for (let i = 0; i < particleConfig.numParticles; i++) {
    particleConfig.particles.push({
      x: Math.random() * particleConfig.width,
      y: Math.random() * particleConfig.height,
      radius: Math.random() * 2 + 1,
      color: `rgba(120, 180, 255, ${Math.random() * 0.2 + 0.1})`,
      speedX: (Math.random() - 0.5) * particleConfig.baseSpeed,
      speedY: (Math.random() - 0.5) * particleConfig.baseSpeed,
      connections: 0
    });
  }
}

function animateParticles() {
  particleConfig.ctx.clearRect(0, 0, particleConfig.width, particleConfig.height);
  updateAndDrawParticles();
  requestAnimationFrame(animateParticles);
}

function updateAndDrawParticles() {
  const pList = particleConfig.particles;
  const ctx = particleConfig.ctx;
  pList.forEach(p => {
    p.connections = 0;
    let speedMultiplier = 1;
    if (particleConfig.hoverArea.active) {
      const dx = p.x - particleConfig.hoverArea.x;
      const dy = p.y - particleConfig.hoverArea.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) speedMultiplier = particleConfig.density * (1 + (100 - dist) / 100);
    }
    p.x += p.speedX * speedMultiplier;
    p.y += p.speedY * speedMultiplier;
    if (p.x < 0 || p.x > particleConfig.width) p.speedX *= -1;
    if (p.y < 0 || p.y > particleConfig.height) p.speedY *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  ctx.lineWidth = 0.5;
  for (let i = 0; i < pList.length; i++) {
    for (let j = i + 1; j < pList.length; j++) {
      const a = pList[i];
      const b = pList[j];
      if (a.connections >= particleConfig.maxConnections || b.connections >= particleConfig.maxConnections) continue;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < particleConfig.connectionThreshold) {
        const opacity = 1 - (dist / particleConfig.connectionThreshold);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(100, 170, 255, ${opacity * 0.1})`;
        ctx.stroke();
        a.connections++;
        b.connections++;
      }
    }
  }
}

function handleMouseMove(e) {
  const rect = hero.getBoundingClientRect();
  particleConfig.hoverArea.x = e.clientX - rect.left;
  particleConfig.hoverArea.y = e.clientY - rect.top;
  particleConfig.hoverArea.active = true;
}

function handleMouseLeave() {
  particleConfig.hoverArea.active = false;
}

function handleDataRefresh() {
  particleConfig.density = 3;
  const refreshBtn = document.getElementById('data-refresh-btn');
  refreshBtn.querySelector('i').classList.add('pulse-animation');
  updateChartData();
  setTimeout(() => {
    particleConfig.density = 1;
    refreshBtn.querySelector('i').classList.remove('pulse-animation');
  }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
});


// Animate star ratings on scroll
document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.querySelector(".stars");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".stars").forEach((el, i) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(10px)";
          setTimeout(() => {
            el.style.transition = "all 0.6s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 200);
        });
      }
    });
  }, { threshold: 0.6 });

  const target = document.querySelector("#hero");
  if (target) observer.observe(target);
});

// ===== ULTRA PREMIUM MOBILE MENU =====
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
const mobileItems = document.querySelectorAll(".mobile-menu li");

let menuOpen = false;

function openMenu() {
  menuOpen = true;

  menuToggle.classList.add("active");
  document.body.style.overflow = "hidden";

  gsap.to("#hero", {
  scale: 0.97,
  duration: 0.6,
  ease: "power3.out"
});


  // Overlay fade in
  gsap.to(menuOverlay, {
    opacity: 1,
    visibility: "visible",
    duration: 0.4,
    ease: "power2.out"
  });

  // Slide menu in
  gsap.to(mobileMenu, {
    x: 0,
    duration: 0.6,
    ease: "power4.out"
  });

  // Stagger link reveal
  gsap.to(mobileItems, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.2,
    ease: "power3.out"
  });
}

function closeMenu() {
  menuOpen = false;

  menuToggle.classList.remove("active");
  document.body.style.overflow = "";

  gsap.to("#hero", {
  scale: 1,
  duration: 0.6,
  ease: "power3.out"
});


  gsap.to(menuOverlay, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      menuOverlay.style.visibility = "hidden";
    }
  });

  gsap.to(mobileMenu, {
    x: "100%",
    duration: 0.5,
    ease: "power3.in"
  });

  gsap.set(mobileItems, {
    opacity: 0,
    y: 20
  });
}

menuToggle.addEventListener("click", () => {
  menuOpen ? closeMenu() : openMenu();
});

menuOverlay.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", closeMenu);
});


// ===== Magnetic Hover =====
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("mousemove", (e) => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(link, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out"
    });
  });
});

// ===== Cursor Glow Effect =====
mobileMenu.addEventListener("mousemove", (e) => {
  const rect = mobileMenu.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  mobileMenu.style.setProperty('--x', `${x}px`);
  mobileMenu.style.setProperty('--y', `${y}px`);

  mobileMenu.style.setProperty(
    'background',
    `radial-gradient(circle at ${x}px ${y}px, rgba(255,60,172,0.2), rgba(17,24,39,0.98) 60%)`
  );
});

// Animated KPI Numbers
const counters = document.querySelectorAll(".kpi-number");

counters.forEach(counter => {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  const updateCounter = () => {
    const increment = target / 100;

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

document.addEventListener("DOMContentLoaded", function () {

  const growthCanvas = document.getElementById("growthChart");
  const skillCanvas = document.getElementById("skillChart");

  if (growthCanvas) {
    new Chart(growthCanvas, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Weekly Hours",
          data: [5, 6, 8, 7, 9, 4, 3],
          borderColor: "#ff0080",
          backgroundColor: "rgba(255,0,128,0.2)",
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }},
        scales: {
          x: { ticks: { color: "#aaa" }},
          y: { ticks: { color: "#aaa" }}
        }
      }
    });
  }

  if (skillCanvas) {
    new Chart(skillCanvas, {
      type: "doughnut",
      data: {
        labels: ["Frontend", "Backend", "UI/UX"],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ["#ff0080", "#7928ca", "#00c6ff"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#aaa" }}}
      }
    });
  }

});

