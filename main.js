// Navbar Toggle para Mobile
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const navbarLinks = document.querySelectorAll('.navbar-link');

// Função para fechar menu
function closeMenu() {
  navbarToggle.classList.remove('active');
  navbarMenu.classList.remove('active');
}

// Toggle menu mobile
navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});

// Fechar menu ao clicar num link
navbarLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Scroll suave para as secções
navbarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Efeito de scroll na navbar (opcional - adiciona sombra mais forte ao fazer scroll)
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.5)';
  } else {
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
  }
  
  lastScroll = currentScroll;
});

// ===== ANIMAÇÃO BRAVE CONTROLADA POR SCROLL =====
const braveAnimation = {
  totalFrames: 120, // Total de frames que tens
  framePath: 'imagens/brave-animation/ezgif-frame-',
  frameExtension: '.jpg',
  scrollRange: 2000, // Distância de scroll (em pixels) para a animação completa
  currentFrame: 0,
  container: null,
  img: null,
  isVisible: true,
  loadedFrames: new Set() // Cache de frames já carregados
};

// Inicializar animação
function initBraveAnimation() {
  // Criar container
  const container = document.createElement('div');
  container.id = 'brave-animation-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: opacity 0.8s ease, visibility 0.8s ease;
    pointer-events: none;
    opacity: 1;
    visibility: visible;
  `;
  
  // Criar imagem
  const img = document.createElement('img');
  img.id = 'brave-animation-img';
  img.style.cssText = `
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
    filter: drop-shadow(0 10px 40px rgba(0, 0, 0, 0.8));
    image-rendering: high-quality;
  `;
  img.alt = '';
  
  container.appendChild(img);
  document.body.prepend(container);
  
  braveAnimation.container = container;
  braveAnimation.img = img;
  
  // Pré-carregar primeiro frame antes de mostrar
  const firstFrameNumber = String(1).padStart(3, '0');
  const firstFramePath = `${braveAnimation.framePath}${firstFrameNumber}${braveAnimation.frameExtension}`;
  
  const preloadImg = new Image();
  preloadImg.onload = () => {
    // Quando o primeiro frame carregar, mostrar tudo
    img.src = preloadImg.src;
    img.style.display = 'block';
    container.style.opacity = '1';
    container.style.visibility = 'visible';
    braveAnimation.loadedFrames.add(0);
  };
  
  preloadImg.onerror = () => {
    // Se houver erro, esconder tudo
    container.style.display = 'none';
  };
  
  preloadImg.src = firstFramePath;
}

// Atualizar frame baseado no scroll
function updateBraveFrame(scrollPosition) {
  const { totalFrames, scrollRange } = braveAnimation;
  
  // Calcular progresso (0 a 1)
  const progress = Math.max(0, Math.min(1, scrollPosition / scrollRange));
  
  // Calcular frame (0 a totalFrames-1)
  const frameIndex = Math.floor(progress * (totalFrames - 1));
  
  // Atualizar se mudou
  if (frameIndex !== braveAnimation.currentFrame) {
    braveAnimation.currentFrame = frameIndex;
    const frameNumber = String(frameIndex + 1).padStart(3, '0');
    const img = braveAnimation.img;
    const container = braveAnimation.container;
    
    if (img && container) {
      const framePath = `${braveAnimation.framePath}${frameNumber}${braveAnimation.frameExtension}`;
      
      // Pré-carregar frame para evitar flicker
      if (!braveAnimation.loadedFrames.has(frameIndex)) {
        const preloadImg = new Image();
        preloadImg.onload = () => {
          img.src = preloadImg.src;
          braveAnimation.loadedFrames.add(frameIndex);
        };
        preloadImg.onerror = () => {
          // Se houver erro, manter frame anterior
          console.warn(`Frame ${frameNumber} não encontrado`);
        };
        preloadImg.src = framePath;
      } else {
        img.src = framePath;
      }
    }
  }
  
  // Esconder animação após scrollRange
  if (scrollPosition > scrollRange && braveAnimation.isVisible) {
    braveAnimation.isVisible = false;
    if (braveAnimation.container) {
      braveAnimation.container.style.opacity = '0';
      braveAnimation.container.style.visibility = 'hidden';
    }
  } else if (scrollPosition <= scrollRange && !braveAnimation.isVisible) {
    braveAnimation.isVisible = true;
    if (braveAnimation.container) {
      braveAnimation.container.style.opacity = '1';
      braveAnimation.container.style.visibility = 'visible';
    }
  }
  
  // Desvanecer textos mobile EXATAMENTE como a animação
  const welcome = document.getElementById('mobileWelcome');
  const hint = document.getElementById('mobileScrollHint');
  
  if (welcome && hint) {
    // Usar EXATAMENTE a mesma lógica da animação
    let textOpacity = 1;
    
    if (scrollPosition > scrollRange) {
      textOpacity = 0;
      welcome.style.visibility = 'hidden';
      hint.style.visibility = 'hidden';
    } else {
      welcome.style.visibility = 'visible';
      hint.style.visibility = 'visible';
      
      // Desvanecer gradualmente dos 70% até 100%
      if (scrollPosition > scrollRange * 0.7) {
        const fadeStart = scrollRange * 0.7;
        const fadeEnd = scrollRange;
        textOpacity = Math.max(0, 1 - ((scrollPosition - fadeStart) / (fadeEnd - fadeStart)));
      }
    }
    
    welcome.style.opacity = textOpacity;
    hint.style.opacity = textOpacity;
  }
}

// Event listener para scroll (otimizado)
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      updateBraveFrame(scrollPosition);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

// Inicializar quando a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBraveAnimation);
} else {
  initBraveAnimation();
}

// Secção ola está sempre visível, não precisa de controlo de scroll
