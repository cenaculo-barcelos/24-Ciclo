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
      braveAnimation.container.style.pointerEvents = 'none';
    }
  } else if (scrollPosition <= scrollRange && !braveAnimation.isVisible) {
    braveAnimation.isVisible = true;
    if (braveAnimation.container) {
      braveAnimation.container.style.opacity = '1';
      braveAnimation.container.style.visibility = 'visible';
      braveAnimation.container.style.pointerEvents = 'none';
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

// Secção ola está sempre visível, não precisa de controlo de scroll

// ===== TIMELINE DE CICLOS ANTERIORES =====
function initTimeline() {
  const timelineContainer = document.getElementById('timelineItems');
  if (!timelineContainer) return;

  // Gerar ciclos do 23º ao 12º (do mais recente para o mais antigo)
  for (let i = 23; i >= 12; i--) {
    const cicloItem = document.createElement('div');
    cicloItem.className = 'timeline-item';
    cicloItem.dataset.ciclo = i;
    
    const cicloNumber = i;
    const currentYear = new Date().getFullYear();
    const cicloYear = currentYear - (24 - cicloNumber); // Ano aproximado do ciclo
    
    cicloItem.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <img src="imagens/Ciclos/${cicloNumber}ciclo.jpg" 
             alt="${cicloNumber}º Ciclo" 
             class="timeline-image"
             onerror="this.src='imagens/cen.png'; this.style.opacity='0.3';">
        <div class="timeline-number">${cicloNumber}º Ciclo</div>
        <div class="timeline-year">${cicloYear}</div>
      </div>
    `;
    
    timelineContainer.appendChild(cicloItem);
  }

  // Observar elementos para animação ao scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observar todos os itens da timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Observar ciclos para controlar visibilidade do botão "Voltar ao topo"
  const ciclo21 = document.querySelector('.timeline-item[data-ciclo="21"]');
  const ciclo22 = document.querySelector('.timeline-item[data-ciclo="22"]');
  const ciclo23 = document.querySelector('.timeline-item[data-ciclo="23"]');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const ciclosSection = document.getElementById('ciclosAnteriores');
  
  if (ciclo21 && backToTopBtn && ciclosSection) {
    const buttonObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const cicloNum = parseInt(entry.target.dataset.ciclo);
        
        if (entry.isIntersecting) {
          // Mostrar botão quando 21º ciclo está visível
          if (cicloNum === 21) {
            backToTopBtn.classList.add('visible');
          }
          // Esconder botão quando 22º ou 23º ciclo estão visíveis
          if (cicloNum === 22 || cicloNum === 23) {
            backToTopBtn.classList.remove('visible');
          }
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    });
    
    // Observar os três ciclos
    buttonObserver.observe(ciclo21);
    if (ciclo22) buttonObserver.observe(ciclo22);
    if (ciclo23) buttonObserver.observe(ciclo23);
    
    // Função para scroll animado passando pelos ciclos
    function scrollToTopAnimated() {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = ciclosSection.offsetTop - navbarHeight;
      const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
      const distance = targetPosition - currentPosition;
      const duration = 2000; // 2 segundos
      const startTime = performance.now();
      
      // Obter todos os ciclos em ordem (do 21º ao 23º)
      const ciclos = Array.from(document.querySelectorAll('.timeline-item'))
        .filter(item => {
          const cicloNum = parseInt(item.dataset.ciclo);
          return cicloNum >= 21 && cicloNum <= 23;
        })
        .sort((a, b) => parseInt(b.dataset.ciclo) - parseInt(a.dataset.ciclo)); // Do 23º ao 21º
      
      function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para movimento suave
        const easeInOutCubic = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const currentScroll = currentPosition + (distance * easeInOutCubic);
        window.scrollTo(0, currentScroll);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      }
      
      requestAnimationFrame(animateScroll);
    }
    
    // Event listener para voltar ao topo com animação
    backToTopBtn.addEventListener('click', scrollToTopAnimated);
  }
}

// Inicializar tudo quando a página carregar
function initAll() {
  initBraveAnimation();
  initTimeline();
  
  // Atualizar animação com posição inicial de scroll
  setTimeout(() => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    updateBraveFrame(scrollPosition);
  }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
