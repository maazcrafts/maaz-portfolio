const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
}

document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }
}));


const resumeModal = document.getElementById('resume-preview');
const resumeOpeners = document.querySelectorAll('[data-resume-preview]');
const resumeClosers = document.querySelectorAll('[data-resume-close]');
const resumeDownloadLink = document.querySelector('[data-resume-download-link]');
let resumePdfLoaded = false;

let pdfJsPromise;
function loadPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs');
  }
  return pdfJsPromise;
}

async function renderResumePreview() {
  if (resumePdfLoaded) return;
  const canvas = document.getElementById('resume-pdf-canvas');
  if (!canvas) return;
  try {
    const pdfjs = await loadPdfJs();
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';
    const pdf = await pdfjs.getDocument('assets/KHAN%20MAAZ%20RESUME.pdf').promise;
    const page = await pdf.getPage(1);
    const container = document.querySelector('.resume-pdf-page');
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = Math.max(1, container.clientWidth / baseViewport.width);
    const viewport = page.getViewport({ scale });
    const outputScale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = viewport.width + 'px';
    canvas.style.height = viewport.height + 'px';
    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport,
      transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null
    }).promise;
    resumePdfLoaded = true;
  } catch (error) {
    console.error('Resume preview failed:', error);
  }
}

function openResumePreview(event) {
  if (event) event.preventDefault();
  if (!resumeModal) return;
  resumeModal.classList.add('open');
  resumeModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('resume-modal-open');
  requestAnimationFrame(renderResumePreview);
}

function closeResumePreview() {
  if (!resumeModal) return;
  resumeModal.classList.remove('open');
  resumeModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('resume-modal-open');
}

resumeOpeners.forEach(link => link.addEventListener('click', openResumePreview));
resumeClosers.forEach(button => button.addEventListener('click', closeResumePreview));

if (resumeDownloadLink) {
  resumeDownloadLink.addEventListener('click', closeResumePreview);
}

if (resumeModal) {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && resumeModal.classList.contains('open')) closeResumePreview();
  });
}
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Hi Maaz,\n\n${message}\n\nName: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:maazsabirkhan@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* -------------------------------------------------------
   Resume download
   Builds a clean one-page PDF in-browser and downloads it
   as "Khan Maaz Resume.pdf".
   ------------------------------------------------------- */

function pdfEscape(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function buildResumePdf() {
  const pageWidth = 612;
  const pageHeight = 792;
  const left = 38;
  const top = 758;
  const leading = 8.35;

  const lines = [
    ['MAAZ KHAN', 12, true],
    ['Computer Engineering Student | Software Developer Intern | AI & Full-Stack Developer', 7.2, false],
    ['Mumbai, India | maazsabirkhan@gmail.com | +91 70204 41633', 6.2, false],
    ['Portfolio: github.com/maazcrafts/maaz-portfolio | LinkedIn: linkedin.com/in/khan-maaz-8a3345377', 6.0, false],
    ['GitHub: github.com/maazcrafts | LeetCode: leetcode.com/u/maazcrafts', 6.0, false],
    ['', 4.0, false],
    ['PROFESSIONAL SUMMARY', 7.4, true],
    ['Computer Engineering diploma student with hands-on experience building AI-driven, full-stack, and real-time', 6.0, false],
    ['applications. Experienced with Python, C++, JavaScript, HTML, CSS, SQL, Git, CrewAI, Streamlit, Node.js,', 6.0, false],
    ['React Native, Socket.IO, and PostgreSQL. Built a multi-agent AI research assistant and a real-time encrypted chat', 6.0, false],
    ['platform. Seeking software development, AI/ML, or full-stack internships.', 6.0, false],
    ['', 4.0, false],
    ['EDUCATION', 7.4, true],
    ['Diploma in Computer Engineering - Expected 2027', 6.2, true],
    ["Anjuman-I-Islam's Kalsekar Technical Campus, New Panvel, Navi Mumbai", 6.0, false],
    ['Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Machine Learning', 6.0, false],
    ['Fundamentals, Responsive Web Development', 6.0, false],
    ['', 4.0, false],
    ['PROFESSIONAL EXPERIENCE', 7.4, true],
    ['Software Development Intern - Visual Labs | Mazgaon, Mumbai', 6.2, true],
    ['- Assisted in building and maintaining web applications with the development team.', 6.0, false],
    ['- Worked with Python, HTML, CSS, and JavaScript on real-world software development tasks.', 6.0, false],
    ['- Applied version control, testing, debugging, and collaborative development workflows.', 6.0, false],
    ['- Implemented and tested functional features against project requirements.', 6.0, false],
    ['', 4.0, false],
    ['TECHNICAL SKILLS', 7.4, true],
    ['Programming: Python, C++, JavaScript, Java, SQL', 6.0, false],
    ['Web: HTML5, CSS3, Node.js, React Native, TypeScript, REST APIs, Socket.IO', 6.0, false],
    ['AI/ML: CrewAI, Streamlit, OpenRouter API, Machine Learning Fundamentals', 6.0, false],
    ['Databases/Tools: PostgreSQL, MySQL, Git, GitHub, VS Code', 6.0, false],
    ['CS: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Responsive Web Development', 6.0, false],
    ['', 4.0, false],
    ['PROJECTS', 7.4, true],
    ['Aerio - Real-Time Encrypted Chat Platform', 6.3, true],
    ['React Native | TypeScript | Node.js | Socket.IO | PostgreSQL | NaCl', 5.9, false],
    ['- Built a real-time messaging platform with authentication, end-to-end encrypted messages, voice notes,', 5.9, false],
    ['  attachments, image sharing, and GIF support.', 5.9, false],
    ['- Implemented real-time communication using Socket.IO and NaCl-based cryptography.', 5.9, false],
    ['GitHub: github.com/maazcrafts/Aerio | Live Demo: aerio-delta.vercel.app/chat', 5.8, false],
    ['AI Research Assistant - Python | CrewAI | OpenRouter | Streamlit', 6.3, true],
    ['- Built a multi-agent application that researches topics, summarizes information, verifies facts, and produces', 5.9, false],
    ['  structured reports.', 5.9, false],
    ['Bank Account Management System - HTML | CSS | JavaScript', 6.3, true],
    ['- Developed a browser-based banking dashboard for deposits, withdrawals, balances, and transaction history.', 5.9, false],
    ['TuneX Music Player - HTML | CSS | JavaScript', 6.3, true],
    ['- Built a browser-based music player with audio controls, search, DOM manipulation, and interactive UI states.', 5.9, false],
    ['Calculator - HTML | CSS | JavaScript', 6.3, true],
    ['- Developed a responsive calculator to practice JavaScript logic and event handling.', 5.9, false],
    ['Rock Paper Scissors - JavaScript', 6.3, true],
    ['- Built an interactive browser game using JavaScript event handling and conditional logic.', 5.9, false],
    ['', 4.0, false],
    ['ACHIEVEMENTS', 7.4, true],
    ['- Built multiple responsive web applications and AI projects using modern development tools.', 5.9, false],
    ['- Developed AI applications using CrewAI and multi-agent workflows.', 5.9, false],
    ['- Continuously improving Data Structures & Algorithms and problem-solving skills.', 5.9, false],
    ['INTERESTS: AI | Machine Learning | Software Engineering | Web Development | Problem Solving', 6.0, false]
  ];

  const commands = ['BT'];
  let y = top;

  for (const [text, size, bold] of lines) {
    if (text) {
      commands.push(`/F${bold ? 2 : 1} ${size} Tf 1 0 0 1 ${left} ${y.toFixed(2)} Tm (${pdfEscape(text)}) Tj`);
      y -= size >= 7.4 ? 9.6 : leading;
    } else {
      y -= 4;
    }
  }

  commands.push('ET');
  const stream = commands.join('\n');

  const objects = {
    1: '<< /Type /Catalog /Pages 2 0 R >>',
    2: '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    3: '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    4: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    5: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    6: `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  };

  let pdf = '%PDF-1.4\n';
  const offsets = {};

  for (let i = 1; i <= 6; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xref = pdf.length;
  pdf += 'xref\n0 7\n0000000000 65535 f \n';
  for (let i = 1; i <= 6; i++) {
    pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

  return new Blob([pdf], { type: 'application/pdf' });
}

function downloadResume() {
  const blob = buildResumePdf();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Khan Maaz Resume.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

document.querySelectorAll('[data-resume-download]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    downloadResume();
  });
});
