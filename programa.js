const slider = document.getElementById('slider');
const vectorial = document.getElementById('mapa-vectorial');
const raster = document.getElementById('mapa-raster');

// Inicializar mapa vectorial (izquierdo)
const mapVectorial = L.map('mapa-vectorial', {
    center: [4.573497157789054, -74.11621468512769],  // Coordenadas de Medellín (ajusta según el barrio)
    zoom: 16,
    zoomControl: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapVectorial);

// Inicializar mapa raster (derecho)
const mapRaster = L.map('mapa-raster', {
    center: [4.573497157789054, -74.11621468512769],
    zoom: 16,
    zoomControl: false
});

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap contributors'
}).addTo(mapRaster);

mapVectorial._container.style.clipPath = 'inset(0 50% 0 0)';
mapRaster._container.style.clipPath = 'inset(0 0 0 50%)';

// Función para el slider (barra)
let dragging = false;

slider.addEventListener('mousedown', () => dragging = true);
document.addEventListener('mouseup', () => dragging = false);

document.addEventListener('mousemove', (e) => {
    if (!dragging) return;

    let offset = (e.clientX / window.innerWidth) * 100;

    mapVectorial._container.style.clipPath = `inset(0 ${100 - offset}% 0 0)`;
    mapRaster._container.style.clipPath = `inset(0 0 0 ${offset}%)`;
    slider.style.left = `${offset}%`;
});