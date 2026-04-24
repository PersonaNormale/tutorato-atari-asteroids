// Catalogo di costanti
// Modificatele un po' finché il gioco non si rompe :)
export const CONFIG = {
  width: 800,
  height: 600,

  startingLives: 3,

  ship: {
    radius: 12,
    rotationSpeed: 3,
    thrust: 200,
    linearDampingPerSecond: 0.2,
    respawnInvulnerability: 1.5,
    shootCooldown: 0.2,
  },

  bullets: {
    radius: 2,
    speed: 450,
    lifetime: 0.8,
    maxBullets: 4,
  },

  asteroidLargeRadius: 40,
  asteroidMediumRadius: 24,
  asteroidSmallRadius: 14,

  asteroidLargeMinSpeed: 30,
  asteroidLargeMaxSpeed: 60,
  asteroidMediumMinSpeed: 60,
  asteroidMediumMaxSpeed: 90,
  asteroidSmallMinSpeed: 90,
  asteroidSmallMaxSpeed: 130,

  waveAsteroidCounts: [4, 6, 8, 10],

  scoreLarge: 20,
  scoreMedium: 50,
  scoreSmall: 100,

  spawnSafeDistanceFromShip: 150,
} as const
