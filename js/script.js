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
    const body = encodeURIComponent(`Hi Maaz,\\n\\n${message}\\n\\nName: ${name}\\nEmail: ${email}`);
    window.location.href = `mailto:maazsabirkhan@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* -------------------------------------------------------
   Resume download
   Generates the current one-page ATS resume in-browser
   and downloads it as "Khan Maaz Resume.pdf".
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
  const left = 45;
  const right = 567;
  const baseFont = 8.5;
  const bodyLeading = 10.2;
  const approxCharWidth = 4.15;

  const commands = [];
  const links = [];

  function textLine(text, x, y, size = baseFont, bold = false, linkItems = []) {
    commands.push(
      `BT /F${bold ? 2 : 1} ${size} Tf ${x} ${y} Td (${pdfEscape(text)}) Tj ET`
    );

    for (const item of linkItems) {
      const prefix = item.prefix || '';
      const label = item.label;
      const linkX = x + prefix.length * approxCharWidth;
      const width = Math.max(12, label.length * approxCharWidth);
      links.push({
        url: item.url,
        rect: [linkX - 1, y - 2, linkX + width + 1, y + size + 2]
      });
    }
  }

  function divider(y) {
    commands.push(`0.6 w ${left} ${y} m ${right} ${y} l S`);
  }

  // Header
  textLine('MAAZ KHAN', 197, 760, 18, true);
  textLine('Computer Engineering Student | Software Developer Intern | AI & Full-Stack Developer', 105, 745, 9.2, true);
  textLine('Mumbai, India | maazsabirkhan@gmail.com | +91 70204 41633', 150, 730, 8.2);
  textLine('Portfolio | LinkedIn | GitHub | LeetCode', 198, 718, 8.2, false, [
    {prefix: '', label: 'Portfolio', url: 'https://github.com/maazcrafts/maaz-portfolio'},
    {prefix: 'Portfolio | ', label: 'LinkedIn', url: 'https://linkedin.com/in/khan-maaz-8a3345377'},
    {prefix: 'Portfolio | LinkedIn | ', label: 'GitHub', url: 'https://github.com/maazcrafts'},
    {prefix: 'Portfolio | LinkedIn | GitHub | ', label: 'LeetCode', url: 'https://leetcode.com/u/maazcrafts'}
  ]);
  divider(708);

  // Professional Summary
  textLine('PROFESSIONAL SUMMARY', left, 695, 9.4, true);
  divider(688);
  textLine('Computer Engineering diploma student with hands-on experience building AI-driven, full-stack, and real-time', left, 675);
  textLine('applications. Experienced with Python, C++, JavaScript, HTML, CSS, SQL, Git, CrewAI, Streamlit, Node.js,', left, 665);
  textLine('React Native, Socket.IO, and PostgreSQL. Built a multi-agent AI research assistant and a real-time encrypted chat', left, 655);
  textLine('platform. Seeking software development, AI/ML, or full-stack internship opportunities.', left, 645);

  // Education
  textLine('EDUCATION', left, 625, 9.4, true);
  divider(618);
  textLine('Diploma in Computer Engineering - Expected 2027', left, 605, 8.5, true);
  textLine("Anjuman-I-Islam's Kalsekar Technical Campus, New Panvel, Navi Mumbai", left, 595);
  textLine('Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Machine Learning', left, 585);
  textLine('Fundamentals, Responsive Web Development', left, 575);

  // Experience
  textLine('PROFESSIONAL EXPERIENCE', left, 555, 9.4, true);
  divider(548);
  textLine('Software Development Intern - Visual Labs | Mazgaon, Mumbai', left, 535, 8.5, true);
  textLine('- Assisted in building and maintaining web applications with the development team.', left + 8, 524);
  textLine('- Worked with Python, HTML, CSS, and JavaScript on real-world software development tasks.', left + 8, 513);
  textLine('- Applied version control, testing, debugging, and collaborative development workflows.', left + 8, 502);
  textLine('- Implemented and tested functional features against project requirements.', left + 8, 491);

  // Technical Skills
  textLine('TECHNICAL SKILLS', left, 472, 9.4, true);
  divider(465);
  textLine('Programming: Python, C++, JavaScript, Java, SQL | Web: HTML5, CSS3, Node.js, React Native, TypeScript,', left, 452);
  textLine('REST APIs, Socket.IO | AI/ML: CrewAI, Streamlit, OpenRouter API, Machine Learning Fundamentals', left, 442);
  textLine('Databases/Tools: PostgreSQL, MySQL, Git, GitHub, VS Code | CS: DSA, OOP, DBMS, Responsive Web Development', left, 432);

  // Projects
  textLine('PROJECTS', left, 413, 9.4, true);
  divider(406);

  textLine('Aerio - Real-Time Encrypted Chat Platform', left, 394, 8.8, true);
  textLine('React Native | TypeScript | Node.js | Socket.IO | PostgreSQL | NaCl | GitHub | Live Demo', left, 384, 7.9, false, [
    {prefix: 'React Native | TypeScript | Node.js | Socket.IO | PostgreSQL | NaCl | ', label: 'GitHub', url: 'https://github.com/maazcrafts/Aerio'},
    {prefix: 'React Native | TypeScript | Node.js | Socket.IO | PostgreSQL | NaCl | GitHub | ', label: 'Live Demo', url: 'https://aerio-delta.vercel.app/chat'}
  ]);
  textLine('- Built a real-time messaging platform with authentication, end-to-end encrypted messaging, voice notes,', left + 8, 372);
  textLine('  attachments, image sharing, and GIF support.', left + 8, 362);
  textLine('- Implemented real-time communication using Socket.IO and NaCl-based cryptography.', left + 8, 352);

  textLine('AI Research Assistant', left, 333, 8.8, true);
  textLine('Python | CrewAI | OpenRouter API', left, 323, 7.9);
  textLine('- Architected a multi-agent AI system for research, summarization, and fact-checking; generated structured', left + 8, 311);
  textLine('  reports through a modular agent pipeline.', left + 8, 301);

  textLine('Bank Account Management System', left, 283, 8.8, true);
  textLine('HTML | CSS | JavaScript', left, 273, 7.9);
  textLine('- Developed a responsive banking web application for account creation and transaction handling with client-side', left + 8, 261);
  textLine('  validation.', left + 8, 251);

  textLine('TuneX Music Player', left, 233, 8.8, true);
  textLine('HTML | CSS | JavaScript', left, 223, 7.9);
  textLine('- Built a responsive browser-based music player with playlist management and JavaScript playback controls.', left + 8, 211);

  textLine('Calculator', left, 192, 8.8, true);
  textLine('HTML | CSS | JavaScript', left, 182, 7.9);
  textLine('- Designed a responsive calculator with keyboard-friendly interaction and minimal UI.', left + 8, 170);

  textLine('Rock Paper Scissors Game', left, 151, 8.8, true);
  textLine('JavaScript', left, 141, 7.9);
  textLine('- Built an interactive browser game with real-time score tracking and complete game logic.', left + 8, 129);

  // Final sections
  textLine('ACHIEVEMENTS', left, 111, 9.4, true);
  divider(104);
  textLine('- Built multiple responsive web applications across frontend, backend, AI, and real-time development.', left + 8, 92);
  textLine('- Developed AI-powered software projects using CrewAI and LLM APIs.', left + 8, 82);
  textLine('- Continuously practicing Data Structures & Algorithms and problem solving.', left + 8, 72);

  textLine('INTERESTS', left, 54, 9.4, true);
  divider(47);
  textLine('Artificial Intelligence | Machine Learning | Software Engineering | Full-Stack Development | Web Development | Problem Solving', left, 35, 7.8);

  const stream = commands.join('\n');
  const objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  objects[6] = `<< /Length ${stream.length} >>\\nstream\\n${stream}\\nendstream`;

  let objectNumber = 7;
  const annotationRefs = [];
  for (const link of links) {
    const [x1, y1, x2, y2] = link.rect;
    objects[objectNumber] =
      `<< /Type /Annot /Subtype /Link /Rect [${x1.toFixed(2)} ${y1.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}] /Border [0 0 0] /A << /Type /Action /S /URI /URI (${pdfEscape(link.url)}) >> >>`;
    annotationRefs.push(`${objectNumber} 0 R`);
    objectNumber += 1;
  }

  objects[3] =
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> /ProcSet [/PDF /Text] >> /Contents 6 0 R /Annots [${annotationRefs.join(' ')}] >>`;

  const maxObject = objects.length - 1;
  let pdf = '%PDF-1.4\\n';
  const offsets = new Array(maxObject + 1).fill(0);

  for (let i = 1; i <= maxObject; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\\n${objects[i]}\\nendobj\\n`;
  }

  const xref = pdf.length;
  pdf += `xref\\n0 ${maxObject + 1}\\n`;
  pdf += '0000000000 65535 f \\n';
  for (let i = 1; i <= maxObject; i++) {
    pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \\n';
  }
  pdf += `trailer\\n<< /Size ${maxObject + 1} /Root 1 0 R >>\\nstartxref\\n${xref}\\n%%EOF\\n`;

  return new Blob([pdf], { type: 'application/pdf' });
}

function downloadResume() {
  try {
    const blob = buildResumePdf();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Khan Maaz Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error('Resume download failed:', error);
  }
}

document.querySelectorAll('[data-resume-download]').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    downloadResume();
  });
});
