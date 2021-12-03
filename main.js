import "./style.css";
import * as THREE from "three";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("./pictures/space2.jpg");
scene.background = spaceTexture;

// Avatar

const profilepicTexture = new THREE.TextureLoader().load(
  "./pictures/profilepic.jpg"
);

const profilepic = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: profilepicTexture })
);

scene.add(profilepic);

// Moon

const earthTexture = new THREE.TextureLoader().load("./pictures/earth2.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: earthTexture,
  })
);

scene.add(earth);

const saturnTexture = new THREE.TextureLoader().load("./pictures/sun.jpg");
const spaceRing = new THREE.Mesh(
  new THREE.TorusGeometry(10, 3, 16, 100),
  new THREE.MeshBasicMaterial({ map: saturnTexture })
);

scene.add(spaceRing);

earth.position.z = 30;
earth.position.setX(-10);

profilepic.position.z = -5;
profilepic.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.005;
  earth.rotation.y += 0.0075;
  earth.rotation.z += 0.005;

  profilepic.rotation.y += 0.01;
  profilepic.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  spaceRing.rotation.x += 0.01;

  earth.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
