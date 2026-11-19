import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import http from 'http';

const ARTIFACT_DIR = 'C:/Users/ADMIN/.gemini/antigravity/brain/ce852832-087c-4bb9-9715-1035fff28764';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          setTimeout(check, 500);
        }
      }).on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timeout waiting for server at ${url}`));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

function runChromeScreenshot(url, outputPath, width, height, virtualTimeBudget = 2500) {
  return new Promise((resolve, reject) => {
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-setuid-sandbox',
      '--hide-scrollbars',
      `--virtual-time-budget=${virtualTimeBudget}`,
      `--window-size=${width},${height}`,
      `--screenshot=${outputPath}`,
      url,
    ];
    const proc = spawn(CHROME_PATH, args);
    proc.on('close', (code) => {
      if (code === 0) resolve(true);
      else reject(new Error(`Chrome exited with code ${code}`));
    });
  });
}

async function capture() {
  console.log('Starting next start server on port 3000...');
  const server = spawn('cmd.exe', ['/c', 'npx', 'next', 'start', '-p', '3000'], {
    cwd: 'C:/PROJECT/VIPASI_LOOKBOOK',
    stdio: 'ignore',
  });

  try {
    await waitForServer('http://localhost:3000');
    console.log('Server is online at http://localhost:3000');

    // 1. Desktop Top View (1440 x 900)
    const d1 = path.join(SCREENSHOTS_DIR, 'redesign-desktop-1440.png');
    await runChromeScreenshot('http://localhost:3000', d1, 1440, 900, 2000);
    console.log(`Saved: ${d1}`);

    // 2. Desktop Scrolled View showcasing outfit photography (1440 x 1400)
    const d2 = path.join(SCREENSHOTS_DIR, 'redesign-desktop-scroll.png');
    await runChromeScreenshot('http://localhost:3000', d2, 1440, 1400, 2500);
    console.log(`Saved: ${d2}`);

    // 3. Mobile iPhone View (390 x 844)
    const m1 = path.join(SCREENSHOTS_DIR, 'redesign-mobile-390.png');
    await runChromeScreenshot('http://localhost:3000', m1, 390, 844, 2000);
    console.log(`Saved: ${m1}`);

    // 4. Mobile Long Scroll (390 x 1200)
    const m2 = path.join(SCREENSHOTS_DIR, 'redesign-mobile-scroll.png');
    await runChromeScreenshot('http://localhost:3000', m2, 390, 1200, 2500);
    console.log(`Saved: ${m2}`);

  } finally {
    console.log('Shutting down server...');
    try {
      execSync(`taskkill /F /T /PID ${server.pid}`);
    } catch (e) {}
  }
}

capture().then(() => {
  console.log('All captures completed cleanly.');
  process.exit(0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
