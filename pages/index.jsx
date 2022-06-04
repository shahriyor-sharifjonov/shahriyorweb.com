import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import useInterval from 'use-interval'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  // Canvas Settings
  const canvasRef = useRef(null);
  const canvasWidth = 240;
  const canvasHeight = 400;
  const canvasGridSize = 8;
  // Game Settings
  const minGameSpeed = 10;
  const maxGameSpeed = 15;
  // Game State
  const [gameDelay, setGameDelay] = useState(1000 / minGameSpeed);
  const [countDown, setCountDown] = useState(4);
  const [running, setRunning] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [newHighscore, setNewHighscore] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState({
    head: { x: 15, y: 25 },
    trail: [],
  });
  const [apple, setApple] = useState({ x: -1, y: -1 });
  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
  const [previousVelocity, setPreviousVelocity] = useState({
      dx: 0,
      dy: 0,
  });
  const clearCanvas = (ctx) => ctx.clearRect(-1, -1, canvasWidth + 2, canvasHeight + 2);
  const generateApplePosition = () => {
      const x = Math.floor(Math.random() * (canvasWidth / canvasGridSize));
      const y = Math.floor(Math.random() * (canvasHeight / canvasGridSize));
      // Check if random position interferes with snake head or trail
      if ((snake.head.x === x && snake.head.y === y) ||
          snake.trail.some((snakePart) => snakePart.x === x && snakePart.y === y)) {
          return generateApplePosition();
      }
      return { x, y };
  };
  // Initialise state and start countdown
  const startGame = () => {
      setGameDelay(1000 / minGameSpeed);
      setIsLost(false);
      setScore(0);
      setSnake({
        head: { x: 15, y: 25 },
        trail: [],
      });
      setApple(generateApplePosition());
      setVelocity({ dx: 0, dy: -1 });
      setRunning(true);
      setNewHighscore(false);
      setCountDown(3);
  };
  // Reset state and check for highscore
  const gameOver = () => {
      if (score > highscore) {
          setHighscore(score);
          localStorage.setItem('highscore', score.toString());
          setNewHighscore(true);
      }
      setIsLost(true);
      setRunning(false);
      setVelocity({ dx: 0, dy: 0 });
      setCountDown(4);
  };
  const fillRect = (ctx, x, y, w, h) => {
      ctx.fillRect(x, y, w, h);
  };
  const strokeRect = (ctx, x, y, w, h) => {
      ctx.strokeRect(x + 0.5, y + 0.5, w, h);
  };
  const drawSnake = (ctx) => {
      ctx.fillStyle = '#43D9AD';
      ctx.strokeStyle = '#43D9AD';
      fillRect(ctx, snake.head.x * canvasGridSize, snake.head.y * canvasGridSize, canvasGridSize, canvasGridSize);
      strokeRect(ctx, snake.head.x * canvasGridSize, snake.head.y * canvasGridSize, canvasGridSize, canvasGridSize);
      snake.trail.forEach((snakePart) => {
        fillRect(ctx, snakePart.x * canvasGridSize, snakePart.y * canvasGridSize, canvasGridSize, canvasGridSize);
        strokeRect(ctx, snakePart.x * canvasGridSize, snakePart.y * canvasGridSize, canvasGridSize, canvasGridSize);
      });
  };
  const drawApple = (ctx) => {
      ctx.fillStyle = '#FEA55F';
      ctx.strokeStyle = '#FEA55F';
      var img = document.getElementById("img");
      
      if (apple && typeof apple.x !== 'undefined' && typeof apple.y !== 'undefined') {
        fillRect(ctx, apple.x * canvasGridSize, apple.y * canvasGridSize, canvasGridSize, canvasGridSize);
        strokeRect(ctx, apple.x * canvasGridSize, apple.y * canvasGridSize, canvasGridSize, canvasGridSize);
      }
  };
  // Update snake.head, snake.trail and apple positions. Check for collisions.
  const updateSnake = () => {
      // Check for collision with walls
      const nextHeadPosition = {
          x: snake.head.x + velocity.dx,
          y: snake.head.y + velocity.dy,
      };
      if (nextHeadPosition.x < 0 ||
          nextHeadPosition.y < 0 ||
          nextHeadPosition.x >= canvasWidth / canvasGridSize ||
          nextHeadPosition.y >= canvasHeight / canvasGridSize) {
          gameOver();
      }
      // Check for collision with apple
      if (nextHeadPosition.x === apple.x && nextHeadPosition.y === apple.y) {
          setScore((prevScore) => prevScore + 1);
          setApple(generateApplePosition());
      }
      const updatedSnakeTrail = [...snake.trail, Object.assign({}, snake.head)];
      // Remove trail history beyond snake trail length (score + 2)
      while (updatedSnakeTrail.length > score + 2)
          updatedSnakeTrail.shift();
      // Check for snake colliding with itsself
      if (updatedSnakeTrail.some((snakePart) => snakePart.x === nextHeadPosition.x &&
          snakePart.y === nextHeadPosition.y))
          gameOver();
      // Update state
      setPreviousVelocity(Object.assign({}, velocity));
      setSnake({
          head: Object.assign({}, nextHeadPosition),
          trail: [...updatedSnakeTrail],
      });
  };
  // Game Hook
  useEffect(() => {
      const canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
      const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
      if (ctx && !isLost) {
          clearCanvas(ctx);
          drawApple(ctx);
          drawSnake(ctx);
      }
  }, [snake]);
  // Game Update Interval
  useInterval(() => {
      if (!isLost) {
          updateSnake();
      }
  }, running && countDown === 0 ? gameDelay : null);
  // Countdown Interval
  useInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1);
  }, countDown > 0 && countDown < 4 ? 800 : null);
  // DidMount Hook for Highscore
  useEffect(() => {
      setHighscore(localStorage.getItem('highscore')
          ? parseInt(localStorage.getItem('highscore'))
          : 0);
  }, []);
  // Score Hook: increase game speed starting at 16
  useEffect(() => {
      if (score > minGameSpeed && score <= maxGameSpeed) {
          setGameDelay(1000 / score);
      }
  }, [score]);
  // Event Listener: Key Presses
  useEffect(() => {
      const handleKeyDown = (e) => {
          if ([
              'ArrowUp',
              'ArrowDown',
              'ArrowLeft',
              'ArrowRight',
              'w',
              'a',
              's',
              'd',
          ].includes(e.key)) {
              let velocity = { dx: 0, dy: 0 };
              switch (e.key) {
                  case 'ArrowRight':
                      velocity = { dx: 1, dy: 0 };
                      break;
                  case 'ArrowLeft':
                      velocity = { dx: -1, dy: 0 };
                      break;
                  case 'ArrowDown':
                      velocity = { dx: 0, dy: 1 };
                      break;
                  case 'ArrowUp':
                      velocity = { dx: 0, dy: -1 };
                      break;
                  case 'd':
                      velocity = { dx: 1, dy: 0 };
                      break;
                  case 'a':
                      velocity = { dx: -1, dy: 0 };
                      break;
                  case 's':
                      velocity = { dx: 0, dy: 1 };
                      break;
                  case 'w':
                      velocity = { dx: 0, dy: -1 };
                      break;
                  default:
                      console.error('Error with handleKeyDown');
              }
              if (!(previousVelocity.dx + velocity.dx === 0 &&
                  previousVelocity.dy + velocity.dy === 0)) {
                  setVelocity(velocity);
              }
          }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, [previousVelocity]);
  return (
    <div className={`${styles.wrapper} wrapper`}>
      <Head>
        <title>Shahriyorweb Full-stack developer</title>
        <meta name="description" content="Shahriyorweb Full-stack developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header page="home"/>
      <motion.div className={`${styles.container} main`} initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        }
      }}>
        <motion.div
          initial={{ opacity: 0, y: '10%' }} animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            y: '10%',
            transition: {
              duration: 1,
            },
          }}
        >
          <p className={styles.hello}>Hi all. I am</p>
          <h1 className={styles.title}>Shahriyor Web</h1>
          <h2 className={styles.subtitle}>&gt; Full-stack developer</h2>
          <p className={styles.comment}>&#47;&#47; complete the game to continue</p>
          <p className={styles.comment}>&#47;&#47; you can also see it on my Github page</p>
          <pre className={styles.code}>const <span className='variable'>githubLink</span> <span className='punctuation'>=</span> <a href="https://github.com/shahriyor-sharifjonov/shahriyorweb.com" rel="noreferrer" target="_blank" className='string link'>“https:&#47;&#47;github.com&#47;shahriyor-sharifjonov&#47;”</a></pre>
        </motion.div>
        <motion.div className={styles.game}
          initial={{ opacity: 0 }} animate={{
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1,
            },
          }}
        >
          <div className={styles.boltUpLeft}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_di_64_2154)">
              <circle cx="9.23047" cy="9.27106" r="6.5" fill="url(#paint0_radial_64_2154)"/>
              </g>
              <path d="M6.46094 11.5657L11.9995 6.97635M6.46094 6.97635L11.9995 11.5657" stroke="#114944"/>
              <defs>
              <filter id="filter0_di_64_2154" x="0.730469" y="0.771057" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.0525 0 0 0 0 0.2625 0 0 0 0 0.255726 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_2154"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_64_2154" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.101667 0 0 0 0 0.508333 0 0 0 0 0.466409 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_64_2154"/>
              </filter>
              <radialGradient id="paint0_radial_64_2154" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.23047 6.27106) rotate(90) scale(9.5)">
              <stop offset="0.151042" stopColor="#196C6A"/>
              <stop offset="1" stopColor="#114B4A"/>
              </radialGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.boltUpRight}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_di_64_2160)">
              <circle cx="8.73047" cy="9.27106" r="6.5" fill="url(#paint0_radial_64_2160)"/>
              </g>
              <path d="M5.96094 11.5657L11.4995 6.97635M5.96094 6.97635L11.4995 11.5657" stroke="#114944"/>
              <defs>
              <filter id="filter0_di_64_2160" x="0.230469" y="0.771057" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.0525 0 0 0 0 0.2625 0 0 0 0 0.255726 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_2160"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_64_2160" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.12184 0 0 0 0 0.504167 0 0 0 0 0.464752 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_64_2160"/>
              </filter>
              <radialGradient id="paint0_radial_64_2160" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.73047 6.27106) rotate(90) scale(9.5)">
              <stop offset="0.151042" stopColor="#217D7A"/>
              <stop offset="1" stopColor="#114B4A"/>
              </radialGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.boltDownLeft}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_di_64_2157)">
              <circle cx="9.23047" cy="9.43109" r="6.5" fill="url(#paint0_radial_64_2157)"/>
              </g>
              <path d="M6.46094 11.7258L11.9995 7.13638M6.46094 7.13638L11.9995 11.7258" stroke="#093430"/>
              <defs>
              <filter id="filter0_di_64_2157" x="0.730469" y="0.931091" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.0359028 0 0 0 0 0.177018 0 0 0 0 0.195833 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_2157"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_64_2157" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.088125 0 0 0 0 0.391667 0 0 0 0 0.360374 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_64_2157"/>
              </filter>
              <radialGradient id="paint0_radial_64_2157" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.23047 6.43109) rotate(90) scale(9.5)">
              <stop offset="0.151042" stopColor="#164C51"/>
              <stop offset="1" stopColor="#0D3A40"/>
              </radialGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.boltDownRight}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_di_64_2163)">
              <circle cx="8.73047" cy="9.43109" r="6.5" fill="url(#paint0_radial_64_2163)"/>
              </g>
              <path d="M5.96094 11.7258L11.4995 7.13638M5.96094 7.13638L11.4995 11.7258" stroke="#163355"/>
              <defs>
              <filter id="filter0_di_64_2163" x="0.230469" y="0.931091" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.0709722 0 0 0 0 0.174244 0 0 0 0 0.304167 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_2163"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_64_2163" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.170868 0 0 0 0 0.343622 0 0 0 0 0.554167 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_64_2163"/>
              </filter>
              <radialGradient id="paint0_radial_64_2163" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.73047 6.43109) rotate(90) scale(9.5)">
              <stop offset="0.151042" stopColor="#234B7C"/>
              <stop offset="1" stopColor="#122E4F"/>
              </radialGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.gameContent}>
            <div className={styles.gameRoot}>
              <canvas
                ref={canvasRef}
                width={canvasWidth + 1}
                height={canvasHeight + 1}
              />
            </div>
            {!isLost && countDown > 0 ? (
            <motion.button onClick={startGame} className={`btn ${styles.gameStartBtn}`}
              initial={{ x: '-50%'}}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {countDown === 4 ? 'start-game' : countDown}
            </motion.button>
            ) : ('')}
            {isLost && (
              <div className={styles.gameAction}>
                <div className={styles.gameActionTitle}>GAME OVER!</div>
                <button onClick={startGame} className={styles.gameActionBtn}>start-again</button>
              </div>
            )}
          </div>
          <div className={styles.gameInfo}>
            <div className={styles.gameTop}>
              <div className={styles.gameController}>
                <p className={styles.gameComment}>&#47;&#47; use keyboard</p>
                <p className={styles.gameComment}>&#47;&#47; arrows to play</p>
                <div className={styles.gameControllerButtons}>
                  <div className={styles.gameControllerButtonsTop}>
                    <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1.46094" y="1.46356" width="48.0787" height="27.6912" rx="7.5" fill="#010C15" stroke="#1E2D3D"/>
                      <path d="M25.5 12.3091L29.75 18.3091H21.25L25.5 12.3091Z" fill="white"/>
                    </svg>
                  </div>
                  <div className={styles.gameControllerButtonsBot}>
                    <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="49.0786" y="28.6547" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49.0786 28.6547)" fill="#010C15" stroke="#1E2D3D"/>
                      <path d="M22.0391 14.8091L28.0391 10.5591L28.0391 19.0592L22.0391 14.8091Z" fill="white"/>
                    </svg>
                    <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="49.5391" y="28.6547" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49.5391 28.6547)" fill="#010C15" stroke="#1E2D3D"/>
                      <path d="M25.5 17.8091L21.25 11.8091L29.75 11.8091L25.5 17.8091Z" fill="white"/>
                    </svg>
                    <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="49" y="28.6547" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49 28.6547)" fill="#010C15" stroke="#1E2D3D"/>
                      <path d="M27.9604 14.8091L21.9604 19.0592L21.9604 10.5591L27.9604 14.8091Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className={styles.gameComment}>&#47;&#47; Score {score}</p>
              <p className={styles.gameComment}>&#47;&#47; Highscore {highscore}</p>
              
            </div>
            <Link href="/about" passHref >
              <motion.button className={`btn ${styles.gameSkipBtn}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
              >
                skip
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  )
}
