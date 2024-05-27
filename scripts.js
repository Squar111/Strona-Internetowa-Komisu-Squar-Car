function aktualizujZegar() {
    const teraz = new Date();
    const godzina = teraz.getHours().toString().padStart(2, '0');
    const minuta = teraz.getMinutes().toString().padStart(2, '0');
    const sekunda = teraz.getSeconds().toString().padStart(2, '0');
    const zegar = `${godzina}:${minuta}:${sekunda}`;
    document.getElementById('zegar').textContent = `Zegar: ${zegar}`;
}

function aktualizujDate() {
    const teraz = new Date();
    const dzien = teraz.getDate().toString().padStart(2, '0');
    const miesiac = (teraz.getMonth() + 1).toString().padStart(2, '0');
    const rok = teraz.getFullYear();
    const data = `${dzien}.${miesiac}.${rok}`;
    document.getElementById('data').textContent = `Data: ${data}`;
}
function obsluzLicznik() {
    let licznik = localStorage.getItem('licznikOdwiedzin');
    if (licznik === null) {
        licznik = 1;
    } else {
        licznik = parseInt(licznik) + 1;
    }
    localStorage.setItem('licznikOdwiedzin', licznik);
    document.getElementById('licznik').textContent = licznik;
}
function aktualizujCzasNaStronie() {
    let czasNaStronie = localStorage.getItem('czasNaStronie');
    if (czasNaStronie === null) {
        czasNaStronie = 0;
    } else {
        czasNaStronie = parseInt(czasNaStronie);
    }
    czasNaStronie++;
    localStorage.setItem('czasNaStronie', czasNaStronie);
    const godziny = Math.floor(czasNaStronie / 3600);
    const minuty = Math.floor((czasNaStronie % 3600) / 60);
    const sekundy = czasNaStronie % 60;
    document.getElementById('czasNaStronie').textContent = `${godziny}h ${minuty}m ${sekundy}s`;
}
window.onload = function () {
    aktualizujZegar();
    aktualizujDate();
    obsluzLicznik();
    aktualizujCzasNaStronie();
    setInterval(aktualizujZegar, 1000); 
    setInterval(aktualizujCzasNaStronie, 1000);
};
const canvas = document.getElementById("analogClock");
const ctx = canvas.getContext("2d");
const radius = canvas.height / 2;
ctx.translate(radius, radius);
const scale = radius * 0.9;

function drawClock() {
    drawFace(ctx, scale);
    drawNumbers(ctx, scale);
    drawTime(ctx, scale);
}

function drawFace(ctx, scale) {
    ctx.beginPath();
    ctx.arc(0, 0, scale, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, scale * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = 'orange';
    ctx.fill();

    ctx.lineWidth = scale * 0.1;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
}

function drawNumbers(ctx, scale) {
    ctx.font = scale * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
        const ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -scale * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, scale * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, scale) {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    let hourPos = (hour % 12) * Math.PI / 6 + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hourPos, scale * 0.5, scale * 0.07);
    let minutePos = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minutePos, scale * 0.8, scale * 0.07);
    let secondPos = (second * Math.PI / 30);
    drawHand(ctx, secondPos, scale * 0.9, scale * 0.02, 'orange');
}

function drawHand(ctx, pos, length, width, color = '#fff') {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

setInterval(drawClock, 1000);
drawClock();  
