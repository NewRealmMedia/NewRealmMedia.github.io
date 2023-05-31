document.addEventListener('DOMContentLoaded', function() {
  const magnetWords = [
    'Olfactory',
    'Verve',
    'Interstellar',
    'Look',
    'At',
    'Her',
    'Bun',
    'Bet',
    'Bud',
    'Bugs',
    // Add more magnet words as needed
  ];


  const magnetContainer = document.getElementById("magnet-container");

  // Track the original position of the magnets
  const originalPositions = {};

  // Add event listeners to all magnets
  const magnets = magnetContainer.querySelectorAll(".magnet");
  magnets.forEach((magnet) => {
    magnet.addEventListener("dragstart", dragStart);
    magnet.addEventListener("dragend", dragEnd);
  });

  // Event handler for drag start
  function dragStart(event) {
    const magnetId = event.target.id;
    originalPositions[magnetId] = {
      top: event.target.style.top,
      left: event.target.style.left
    };
  }




  function createRandomMagnetPile() {
    const magnetContainer = document.getElementById('magnet-container');
    magnetContainer.innerHTML = ''; // Clear the magnet container

    const div2Rect = magnetContainer.getBoundingClientRect();
    const maxRandomX = div2Rect.width - 200; // Adjust the range as needed
    const maxRandomY = div2Rect.height - 20; // Adjust the range as needed

    magnetWords.forEach((word) => {
      const magnetElement = document.createElement('div');
      magnetElement.classList.add('magnet', 'prevent-select'); // Add the 'prevent-select' class
      magnetElement.textContent = word;

      // Randomly position the magnet within div2
      const randomX = Math.random() * (maxRandomX - magnetElement.offsetWidth);
      const randomY = Math.random() * (maxRandomY - magnetElement.offsetHeight);
      magnetElement.style.left = `${randomX}px`;
      magnetElement.style.top = `${randomY}px`;

      // Append the magnet element to the container
      magnetContainer.appendChild(magnetElement);

      // Create the rotation handle
      const rotateHandle = document.createElement('div');
      rotateHandle.classList.add('rotate-handle');
      rotateHandle.innerHTML = '&#8634;'; // Add a rotation handle symbol
      magnetElement.appendChild(rotateHandle); // Append the rotateHandle to the magnetElement

      // Add event listener for rotation handle's mousedown event
      rotateHandle.addEventListener('mousedown', function(event) {
        event.stopPropagation();
        handleRotationStart(event, magnetElement);
      });

      // Add event listener for magnet's mousedown event
      magnetElement.addEventListener('mousedown', function(event) {
        event.stopPropagation();
        handleMagnetMouseDown(event);
      });
    });
  }

  function handleRotationStart(event, magnetElement) {
    event.stopPropagation();
    const initialRotation = magnetElement.style.getPropertyValue('--rotation-angle');
    const initialMouseAngle = getMouseAngle(event, magnetElement);
    const magnetRotation = initialRotation ? parseFloat(initialRotation) : 0;

    function handleRotationMove(event) {
      event.stopPropagation();
      const currentMouseAngle = getMouseAngle(event, magnetElement);
      const rotationAngle = magnetRotation + (currentMouseAngle - initialMouseAngle);
      magnetElement.style.setProperty('--rotation-angle', `${rotationAngle}deg`);
      magnetElement.style.transform = `rotate(${rotationAngle}deg)`;
    }

    function handleRotationEnd() {
      document.removeEventListener('mousemove', handleRotationMove);
      document.removeEventListener('mouseup', handleRotationEnd);
    }

    document.addEventListener('mousemove', handleRotationMove);
    document.addEventListener('mouseup', handleRotationEnd);
  }

  function getMouseAngle(event, element) {
    const elementRect = element.getBoundingClientRect();
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    return Math.atan2(mouseY, mouseX) * (180 / Math.PI);
  }

  function handleMagnetMouseDown(event) {
    activeMagnet = event.currentTarget;
    initialMouseX = event.clientX;
    initialMouseY = event.clientY;
    initialMagnetX = parseFloat(activeMagnet.style.left.replace('px', ''));
    initialMagnetY = parseFloat(activeMagnet.style.top.replace('px', ''));

    document.addEventListener('mousemove', handleMagnetMouseMove);
    document.addEventListener('mouseup', handleMagnetMouseUp);
  }

  function handleMagnetMouseMove(event) {
    const deltaX = event.clientX - initialMouseX;
    const deltaY = event.clientY - initialMouseY;
    activeMagnet.style.left = `${initialMagnetX + deltaX}px`;
    activeMagnet.style.top = `${initialMagnetY + deltaY}px`;
  }

  function handleMagnetMouseUp() {
    activeMagnet = null;
    initialMouseX = null;
    initialMouseY = null;
    initialMagnetX = null;
    initialMagnetY = null;

    document.removeEventListener('mousemove', handleMagnetMouseMove);
    document.removeEventListener('mouseup', handleMagnetMouseUp);
  }

  let activeMagnet = null;
  let initialMouseX = null;
  let initialMouseY = null;
  let initialMagnetX = null;
  let initialMagnetY = null;

  createRandomMagnetPile();

  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', createRandomMagnetPile);

  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', createRandomMagnetPile);
});
