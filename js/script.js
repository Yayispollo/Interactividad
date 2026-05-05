// ==================== VARIABLES GLOBALES ====================

const cameraImage = document.getElementById('cameraImage');
const introText = document.getElementById('introText');
const galleryItems = document.querySelectorAll('.gallery-item');

let scrollProgress = 0;
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let animationFrameId = null;

// ==================== EVENTO: SCROLL ====================

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = scrollTop / docHeight;

    // Calcular progreso de la sección de cámara (primeros 100vh)
    const cameraSection = document.querySelector('.camera-section');
    const cameraSectionHeight = cameraSection.offsetHeight;
    const cameraSectionProgress = Math.min(scrollTop / cameraSectionHeight, 1);

    // Efecto de zoom progresivo de la cámara
    const scale = 1 + cameraSectionProgress * 3;
    cameraImage.style.transform = `scale(${scale})`;

    // Ocultar texto introductorio después del 50% del scroll
    if (cameraSectionProgress > 0.5) {
        introText.classList.add('hidden');
    } else {
        introText.classList.remove('hidden');
    }

    // Activar parallax en galería después del scroll de la sección cámara
    const gallerySection = document.querySelector('.gallery-section');
    const galleryStart = cameraSectionHeight;
    const distanceFromGallery = scrollTop - galleryStart;

    if (distanceFromGallery > 0) {
        applyScrollParallax(distanceFromGallery);
    }
});

// ==================== EVENTO: MOVIMIENTO DEL MOUSE ====================

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Cancelar animación frame anterior si existe
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    // Usar requestAnimationFrame para mejor rendimiento
    animationFrameId = requestAnimationFrame(() => {
        applyMouseParallax();
    });
});

// ==================== FUNCIONES DE PARALLAX ====================

/**
 * Aplica efecto parallax basado en el movimiento del mouse
 * Mueve cada item según su distancia del centro
 */
function applyMouseParallax() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calcular porcentaje de desplazamiento desde el centro
    const percentX = (mouseX - centerX) / (centerX / 2);
    const percentY = (mouseY - centerY) / (centerY / 2);

    galleryItems.forEach((item, index) => {
        // Cada item se mueve más según su índice (efecto profundidad)
        const moveX = percentX * (10 + index * 3);
        const moveY = percentY * (10 + index * 3);
        
        item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

/**
 * Aplica efecto parallax basado en el scroll
 * Mueve y rota cada item según la distancia de scroll
 */
function applyScrollParallax(distance) {
    galleryItems.forEach((item, index) => {
        // Velocidad variable según el índice
        const speed = 0.5 + (index * 0.1);
        const moveY = distance * speed;
        
        // Rotación progresiva
        const rotation = (distance * 0.02) + (index * 5);
        
        item.style.transform = `translateY(${moveY}px) rotate(${rotation}deg)`;
    });
}

// ==================== FUNCIÓN: COMBINAR PARALLAX ====================

/**
 * Combina los efectos de parallax del mouse y del scroll
 * Se ejecuta en tiempo real para mejor experiencia
 */
function updateParallaxCombined() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const percentX = (mouseX - centerX) / (centerX / 2);
    const percentY = (mouseY - centerY) / (centerY / 2);

    const cameraSection = document.querySelector('.camera-section');
    const cameraSectionHeight = cameraSection.offsetHeight;
    const scrollTop = window.scrollY;
    const distanceFromGallery = scrollTop - cameraSectionHeight;

    if (distanceFromGallery > 0) {
        galleryItems.forEach((item, index) => {
            // Parallax del scroll
            const speed = 0.5 + (index * 0.1);
            const moveYScroll = distanceFromGallery * speed;
            const rotation = (distanceFromGallery * 0.02) + (index * 5);

            // Parallax del mouse
            const moveXMouse = percentX * (10 + index * 3);
            const moveYMouse = percentY * (10 + index * 3);

            // Combinar ambos efectos
            const totalMoveX = moveXMouse;
            const totalMoveY = moveYScroll + moveYMouse;

            item.style.transform = `translate(${totalMoveX}px, ${totalMoveY}px) rotate(${rotation}deg)`;
        });
    }
}

// Actualizar parallax combinado en cada frame
document.addEventListener('mousemove', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(updateParallaxCombined);
});

window.addEventListener('scroll', updateParallaxCombined);

// ==================== EVENTO: LOAD ====================

window.addEventListener('load', () => {
    // Agregar animación flotante a la cámara
    cameraImage.classList.add('floating');
    
    console.log('🎥 Página cargada correctamente');
    console.log('📸 Desplázate para amplificar la cámara');
    console.log('🖱️ Mueve el mouse para ver el parallax');
});

// ==================== OPTIMIZACIÓN: THROTTLE ====================

/**
 * Función para limitar la frecuencia de ejecución de una función
 * Útil para eventos que se disparan muy frecuentemente
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ==================== INICIALIZACIÓN ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Script iniciado');
});

// ==================== DETECCIÓN: DISPOSITIVO ====================

const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

if (isMobile()) {
    console.log('📱 Dispositivo móvil detectado');
    // Reducir intensidad de efectos en móviles
    galleryItems.forEach((item) => {
        item.style.transition = 'transform 0.1s ease-out';
    });
}