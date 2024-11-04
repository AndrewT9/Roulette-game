import { ROULETTE_VALUES } from "../data";

const width = window.innerWidth;
const height = window.innerHeight;

let rouletteWheel;
let pointer;
let spinButton;
let resultText;
let isSpinning;
let spinSound;

const sectorCount = ROULETTE_VALUES.length;

function preload() {
  this.load.image('wheel', '/public/roulette.png');
  this.load.image('pointer', '/public/pointer.png');
  this.load.audio('spinSound', '/public/spinSound.mp3');
};

function create() {
  rouletteWheel = this.add.image(width / 2, height / 2, 'wheel').setScale(0.4);
  pointer = this.add.image(width / 2.02, height / 2 - 250, 'pointer').setScale(0.1); 
  spinSound = this.sound.add('spinSound');

  spinButton = this.add.text(width / 2, height - 100, 'Spin', {
    fontSize: '32px',
    color: '#ffffff',
    backgroundColor: '#007bff',
    borderRadius: '8px',
    padding: { x: 20, y: 10 }
  })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      spinWheel.call(this);
    });

  resultText = this.add.text(width / 2, 100, '', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
};

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  spinSound.play();

  const randomRotation = Phaser.Math.Between(3, 8) * 360 + Phaser.Math.Between(0, 360);
  const sectorAngle = 360 / sectorCount;

  this.tweens.add({
    targets: rouletteWheel,
    angle: randomRotation,
    duration: 3000,
    ease: 'Cubic.easeOut',
    onComplete: () => {
      spinSound.stop();
      const finalAngle = randomRotation % 360;
      const winningSectorIndex = Math.floor((360 - finalAngle) / sectorAngle) % sectorCount;
      const value = ROULETTE_VALUES[winningSectorIndex];
      resultText.setText(`Result: ${value}`);
      isSpinning = false;
    }
  });
}

export const mainScene = {
  preload,
  create
};
