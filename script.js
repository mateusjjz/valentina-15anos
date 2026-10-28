/**
 * ============================================================================
 * CONFIGURAÇÃO DO CONVITE INTERATIVO (Fácil edição)
 * Altere os dados abaixo se desejar personalizar nomes, datas, links ou chave Pix.
 * ============================================================================
 */
const CONVITE_CONFIG = {
  debutante: 'Valentina',
  data: '16 de janeiro de 2027',
  horario: '20h',
  traje: 'Esporte fino',
  localNome: 'Associação Atlética\nMinuano',
  localEndereco: 'Avenida Amazonas, 3001\nBairro Universitário\nLajeado/RS\nCEP 95914-650',
  mapaUrl:
    'https://www.google.com/maps/search/?api=1&query=Associa%C3%A7%C3%A3o+Atl%C3%A9tica+Minuano+Avenida+Amazonas+3001+Lajeado+RS',
  cerimonialista: 'Lidiane',
  whatsappExibicao: '(51) 98027-6317',
  whatsappNumeroLimpo: '5551980276317',
  whatsappMensagem:
    'Olá Lidiane! Gostaria de confirmar minha presença no aniversário de 15 anos da Valentina! 💖',
  pixTipo: 'Chave Pix (CPF)',
  pixChave: '04181663078',
  pixTitular: 'Valentina — 15 Anos'
};

document.addEventListener('DOMContentLoaded', () => {
  const slidesTrack = document.getElementById('slidesTrack');
  const slidesViewport = document.getElementById('slidesViewport');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const openInviteBtn = document.getElementById('openInviteBtn');
  const swipeHint = document.getElementById('swipeHint');

  // Modal Pix elements
  const pixBtn = document.getElementById('pixBtn');
  const pixModal = document.getElementById('pixModal');
  const closePixModal = document.getElementById('closePixModal');
  const copyPixBtn = document.getElementById('copyPixBtn');
  const copyPixBtnText = document.getElementById('copyPixBtnText');

  const totalSlides = slides.length;
  let currentIndex = 0;

  // Apply config values
  function applyConfig() {
    const debutanteTitle = document.getElementById('debutanteNameTitle');
    const signatureName = document.getElementById('signatureName');
    const eventDateText = document.getElementById('eventDateText');
    const eventTimeText = document.getElementById('eventTimeText');
    const eventDressText = document.getElementById('eventDressText');
    const venueNameText = document.getElementById('venueNameText');
    const venueAddressText = document.getElementById('venueAddressText');
    const mapBtn = document.getElementById('mapBtn');
    const cerimonialistaName = document.getElementById('cerimonialistaName');
    const whatsappPhoneText = document.getElementById('whatsappPhoneText');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const pixKeyType = document.getElementById('pixKeyType');
    const pixKeyValue = document.getElementById('pixKeyValue');
    const pixKeyHolder = document.getElementById('pixKeyHolder');

    if (debutanteTitle) debutanteTitle.textContent = CONVITE_CONFIG.debutante.toUpperCase();
    if (signatureName) signatureName.textContent = CONVITE_CONFIG.debutante;
    if (eventDateText) eventDateText.textContent = CONVITE_CONFIG.data;
    if (eventTimeText) eventTimeText.textContent = CONVITE_CONFIG.horario;
    if (eventDressText) eventDressText.textContent = CONVITE_CONFIG.traje;
    if (venueNameText) venueNameText.innerHTML = CONVITE_CONFIG.localNome.replace(/\n/g, '<br/>');
    if (venueAddressText) venueAddressText.innerHTML = CONVITE_CONFIG.localEndereco.replace(/\n/g, '<br/>');
    if (mapBtn) mapBtn.href = CONVITE_CONFIG.mapaUrl;
    if (cerimonialistaName) cerimonialistaName.textContent = CONVITE_CONFIG.cerimonialista;
    if (whatsappPhoneText) whatsappPhoneText.textContent = CONVITE_CONFIG.whatsappExibicao;
    if (whatsappBtn) {
      whatsappBtn.href = `https://wa.me/${CONVITE_CONFIG.whatsappNumeroLimpo}?text=${encodeURIComponent(
        CONVITE_CONFIG.whatsappMensagem
      )}`;
    }
    if (pixKeyType) pixKeyType.textContent = CONVITE_CONFIG.pixTipo;
    if (pixKeyValue) pixKeyValue.textContent = CONVITE_CONFIG.pixChave;
    if (pixKeyHolder) pixKeyHolder.textContent = CONVITE_CONFIG.pixTitular;
  }

  applyConfig();

  // Create top progress segments
  const progressSegments = [];
  for (let i = 0; i < totalSlides; i++) {
    const seg = document.createElement('div');
    seg.className = 'progress-segment';
    seg.title = `Ir para slide ${i + 1}`;
    seg.addEventListener('click', () => goToSlide(i));
    progressBar.appendChild(seg);
    progressSegments.push(seg);
  }

  function updateUI() {
    const offsetPercent = -(currentIndex * (100 / totalSlides));
    slidesTrack.style.transform = `translate3d(${offsetPercent}%, 0, 0)`;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === currentIndex);
    });

    progressSegments.forEach((seg, idx) => {
      seg.classList.toggle('is-passed', idx < currentIndex);
      seg.classList.toggle('is-current', idx === currentIndex);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;

    if (swipeHint) {
      swipeHint.style.opacity = currentIndex === totalSlides - 1 ? '0' : '1';
    }
  }

  function goToSlide(index) {
    const clamped = Math.max(0, Math.min(totalSlides - 1, index));
    if (clamped !== currentIndex) {
      currentIndex = clamped;
      spawnSparkleBurst();
    }
    updateUI();
  }

  // Button navigation
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(1);
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (pixModal.classList.contains('is-open')) {
      if (e.key === 'Escape') closeModal();
      return;
    }
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    }
  });

  // Touch & Pointer Swipe Navigation
  let startX = 0;
  let startY = 0;
  let currentDeltaX = 0;
  let isDragging = false;
  let isHorizontalSwipe = null;

  function onPointerDown(clientX, clientY, target) {
    if (target.closest('a, button, .modal-card')) return;
    isDragging = true;
    isHorizontalSwipe = null;
    startX = clientX;
    startY = clientY;
    currentDeltaX = 0;
    slidesTrack.classList.add('is-dragging');
  }

  function onPointerMove(clientX, clientY) {
    if (!isDragging) return;
    const dx = clientX - startX;
    const dy = clientY - startY;

    if (isHorizontalSwipe === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
    }

    if (!isHorizontalSwipe) return;

    currentDeltaX = dx;
    const viewportWidth = slidesViewport.clientWidth || 380;
    // Apply resistance at edges
    let effectiveDx = dx;
    if ((currentIndex === 0 && dx > 0) || (currentIndex === totalSlides - 1 && dx < 0)) {
      effectiveDx = dx * 0.28;
    }

    const basePercent = -(currentIndex * (100 / totalSlides));
    const dragPercent = (effectiveDx / viewportWidth) * (100 / totalSlides);
    slidesTrack.style.transform = `translate3d(${basePercent + dragPercent}%, 0, 0)`;
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    slidesTrack.classList.remove('is-dragging');

    const viewportWidth = slidesViewport.clientWidth || 380;
    const threshold = viewportWidth * 0.16;

    if (isHorizontalSwipe) {
      if (currentDeltaX < -threshold && currentIndex < totalSlides - 1) {
        currentIndex++;
        spawnSparkleBurst();
      } else if (currentDeltaX > threshold && currentIndex > 0) {
        currentIndex--;
        spawnSparkleBurst();
      }
    }
    updateUI();
  }

  // Touch events
  slidesViewport.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY, e.target);
      }
    },
    { passive: true }
  );

  slidesViewport.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );

  slidesViewport.addEventListener('touchend', onPointerUp);
  slidesViewport.addEventListener('touchcancel', onPointerUp);

  // Mouse drag events for desktop
  slidesViewport.addEventListener('mousedown', (e) => {
    onPointerDown(e.clientX, e.clientY, e.target);
  });

  window.addEventListener('mousemove', (e) => {
    onPointerMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', onPointerUp);

  // Pix Modal Logic
  function openModal() {
    pixModal.classList.add('is-open');
    pixModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    pixModal.classList.remove('is-open');
    pixModal.setAttribute('aria-hidden', 'true');
  }

  if (pixBtn) {
    pixBtn.addEventListener('click', openModal);
  }
  if (closePixModal) {
    closePixModal.addEventListener('click', closeModal);
  }
  if (pixModal) {
    pixModal.addEventListener('click', (e) => {
      if (e.target === pixModal) closeModal();
    });
  }

  if (copyPixBtn) {
    copyPixBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CONVITE_CONFIG.pixChave);
      } catch {
        const temp = document.createElement('textarea');
        temp.value = CONVITE_CONFIG.pixChave;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      copyPixBtnText.textContent = 'CHAVE COPIADA! ✨';
      setTimeout(() => {
        copyPixBtnText.textContent = 'COPIAR CHAVE PIX';
      }, 2500);
    });
  }

  // ============================================================================
  // SPARKLES & GLITTER PARTICLE ENGINE
  // ============================================================================
  const canvas = document.getElementById('sparklesCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createParticle(isBurst = false) {
    const w = canvas.width || 380;
    const h = canvas.height || 720;
    return {
      x: isBurst ? w * 0.5 + (Math.random() - 0.5) * 140 : Math.random() * w,
      y: isBurst ? h * 0.5 + (Math.random() - 0.5) * 180 : Math.random() * h,
      size: Math.random() * 2.4 + 0.7,
      speedX: (Math.random() - 0.5) * (isBurst ? 2.2 : 0.35),
      speedY: isBurst ? (Math.random() - 0.5) * 2.2 : -(Math.random() * 0.45 + 0.12),
      alpha: Math.random() * 0.85 + 0.15,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.3 ? '#ffb8dc' : '#ffffff',
      life: isBurst ? 55 : Infinity
    };
  }

  for (let i = 0; i < 42; i++) {
    particles.push(createParticle(false));
  }

  function spawnSparkleBurst() {
    for (let i = 0; i < 20; i++) {
      particles.push(createParticle(true));
    }
  }

  function renderSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.twinklePhase += p.twinkleSpeed;

      if (p.life !== Infinity) {
        p.life--;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
      } else {
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      }

      const currentAlpha =
        p.life !== Infinity
          ? (p.life / 55) * p.alpha
          : p.alpha * (0.5 + 0.5 * Math.sin(p.twinklePhase));

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
      ctx.fillStyle = p.hue;
      ctx.shadowColor = '#ff4da6';
      ctx.shadowBlur = 8;

      // Draw diamond star sparkle for larger particles
      if (p.size > 2.1) {
        const s = p.size * 1.9;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s);
        ctx.quadraticCurveTo(p.x, p.y, p.x + s, p.y);
        ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s);
        ctx.quadraticCurveTo(p.x, p.y, p.x - s, p.y);
        ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - s);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(renderSparkles);
  }

  renderSparkles();
  updateUI();
});
