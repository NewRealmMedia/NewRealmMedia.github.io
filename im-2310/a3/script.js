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
  ];

  let originalLeft = null;
  let originalTop = null;
  let activeMagnet = null;
  let initialMouseX = null;
  let initialMouseY = null;
  let initialMagnetX = null;
  let initialMagnetY = null;
  let isDragging = false;
  let modal = document.getElementById("modalDialog");
  let showModalButton = document.getElementById("showModal");
  let closeModalButton = document.getElementById("closeModal");

  /* This is responsible for showing, hiding, and closing the modal dialog based on user interactions, such as button clicks or keyboard events. */
  showModalButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  });

  function createRandomMagnetPile() {
    const magnetContainer = document.getElementById('magnet-container');
    const div2Rect = magnetContainer.getBoundingClientRect();
    let maxRandomX;
    let maxRandomY;
  
    if (window.innerWidth < 600) {
      maxRandomX = div2Rect.width - 80;
      maxRandomY = div2Rect.height - 40;
    } else {
      maxRandomX = div2Rect.width - 200;
      maxRandomY = div2Rect.height - 100;
    }
  
    magnetWords.forEach((word) => {
      const magnetElement = document.createElement('div');
      magnetElement.classList.add('magnet');
      magnetElement.textContent = word;
  
      const randomX = Math.random() * maxRandomX;
      const randomY = Math.random() * maxRandomY;
  
      if (window.innerWidth < 600) {
        magnetElement.style.left = `${randomX}px`;
        magnetElement.style.top = `${randomY - 30}px`;
      } else {
        magnetElement.style.left = `${randomX}px`;
        magnetElement.style.top = `${randomY}px`;
      }
  
      const rotateHandle = document.createElement('div');
      rotateHandle.classList.add('rotate-handle');
      rotateHandle.innerHTML = '&#8634;';
      magnetElement.appendChild(rotateHandle);
  
      rotateHandle.addEventListener('mousedown', function(event) {
        event.stopPropagation();
        handleRotationStart(event, magnetElement);
      });
  
      magnetElement.addEventListener('mousedown', function(event) {
        event.stopPropagation();
        handleMagnetMouseDown(event);
      });
  
      magnetElement.style.userSelect = 'none';
      magnetElement.style.webkitUserSelect = 'none';
  
      magnetContainer.appendChild(magnetElement);
    });
  }
  
  /* handleRotationStart function handles the start of rotation for a magnet element.
     It calculates the initial rotation angle and mouse angle,
     and attaches event listeners for mouse movement and release to handle the rotation. */
  function handleRotationStart(event, magnetElement) {
    event.stopPropagation();
    const initialRotation = magnetElement.style.getPropertyValue('--rotation-angle');
    const initialMouseAngle = getMouseAngle(event, magnetElement);
    const magnetRotation = initialRotation ? parseFloat(initialRotation) : 0;

    /* handleRotationMove function is responsible for handling the movement of the mouse during the rotation of a magnet element.
       It takes a mouse event as a parameter. Inside the function, it calculates the current mouse angle relative to the center of the magnet element being rotated.
       It then adjusts the rotation angle of the magnet element based on the difference between the current mouse angle and the initial mouse angle recorded during the start of rotation.
       Finally, it updates the CSS properties of the magnet element to apply the new rotation angle visually. */
    function handleRotationMove(event) {
      event.stopPropagation();
      const currentMouseAngle = getMouseAngle(event, magnetElement);
      const rotationAngle = magnetRotation + (currentMouseAngle - initialMouseAngle);
      magnetElement.style.setProperty('--rotation-angle', `${rotationAngle}deg`);
      magnetElement.style.transform = `rotate(${rotationAngle}deg)`;
    }

    /* handleRotationEnd function is responsible for handling the end of rotation for a magnet element.
       It is triggered when the mouse button is released after rotating the magnet. Inside the function,
       it removes the event listeners for mouse movement and mouse release that were attached during the rotation.
       This ensures that the rotation functionality is deactivated and no longer responds to mouse movements after the rotation is completed. */
    function handleRotationEnd() {
      document.removeEventListener('mousemove', handleRotationMove);
      document.removeEventListener('mouseup', handleRotationEnd);
    }

    document.addEventListener('mousemove', handleRotationMove);
    document.addEventListener('mouseup', handleRotationEnd);
  }

  /* getMouseAngle function calculates the angle between the center of a magnet element and the current mouse position.
     It takes a mouse event and the magnet element as parameters. Inside the function,
     it retrieves the bounding rectangle of the magnet element to determine its position on the page.
     It then calculates the coordinates of the center of the magnet element by adding half of its width to the left coordinate and half of its height to the top coordinate.
     After obtaining the coordinates of the center and the mouse position relative to it, the function uses the Math.atan2 function to calculate the angle in radians.
     Finally, it converts the angle to degrees by multiplying it with the conversion factor (180 / Math.PI) and returns the resulting value.
     The returned angle represents the direction in which the mouse is pointing relative to the magnet element's center. */
  function getMouseAngle(event, element) {
    const elementRect = element.getBoundingClientRect();
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    return Math.atan2(mouseY, mouseX) * (180 / Math.PI);
  }

  /* This function handles the movement of a magnet element while it is being dragged.
     It calculates the distance moved by the mouse and updates the position of the active magnet accordingly. */
  function handleMagnetMouseMove(event) {
    const deltaX = event.clientX - initialMouseX;
    const deltaY = event.clientY - initialMouseY;
    activeMagnet.style.left = `${initialMagnetX + deltaX}px`;
    activeMagnet.style.top = `${initialMagnetY + deltaY}px`;
  }

  /* This function handles the mouse-down event on a magnet element.
     It determines if the clicked element is a magnet or a rotation handle, initializes dragging parameters, and attaches event listeners for mouse movement and release. */
  function handleMagnetMouseDown(event) {
    const isMagnetElement = event.target.classList.contains('magnet');
    const isRotateHandle = event.target.classList.contains('rotate-handle');
    const magnetElement = event.target;

    if (isMagnetElement || isRotateHandle) {
      isDragging = false; // Initialize dragging flag - highlighting/selection experimentation

      activeMagnet = event.currentTarget;
      initialMouseX = event.clientX;
      initialMouseY = event.clientY;
      initialMagnetX = parseFloat(activeMagnet.style.left.replace('px', ''));
      initialMagnetY = parseFloat(activeMagnet.style.top.replace('px', ''));

      originalLeft = initialMagnetX;
      originalTop = initialMagnetY;

      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMagnetMouseMove);
    }

    document.addEventListener('mouseup', function(event) {
      const sourceDiv = event.target;

      handleMagnetMouseUp(sourceDiv);
    });
  }

  /* handleMagnetMouseUp function handles the mouse-up event when a magnet element is released after being dragged.
     It checks for collisions with other magnets, logs collided words if any, checks if the magnet fits within the destination area,
     resets the magnet's position if it's outside the valid area, and removes event listeners for mouse movement and release. */
  function handleMagnetMouseUp(sourceDiv) {
    const destinationDiv = document.getElementById('fridge');
    const magnetContainerDiv = document.getElementById('magnet-container');

    const sourceRect = sourceDiv.getBoundingClientRect();
    const destinationRect = destinationDiv.getBoundingClientRect();
    const magnetContainerRect = magnetContainerDiv.getBoundingClientRect();
    const magnets = Array.from(document.querySelectorAll('.magnet'));

    const collidedMagnets = magnets.filter((magnet) => {
      if (magnet !== sourceDiv) {
        const magnetRect = magnet.getBoundingClientRect();
        return detect2DBoxCollision(sourceRect, magnetRect);
      }
      return false;
    });

    if (collidedMagnets.length > 0) {
      const draggedWord = sourceDiv.textContent;
      const collidedWords = collidedMagnets.map((magnet) => magnet.textContent);
      console.log(`Collision detected between '${draggedWord}' and '${collidedWords.join(', ')}'`);
    }

    const fitsWithinDestination =
      (sourceRect.left >= destinationRect.left &&
        sourceRect.top >= destinationRect.top &&
        sourceRect.right <= destinationRect.right &&
        sourceRect.bottom <= destinationRect.bottom) ||
      (sourceRect.left >= magnetContainerRect.left &&
        sourceRect.top >= magnetContainerRect.top &&
        sourceRect.right <= magnetContainerRect.right &&
        sourceRect.bottom <= magnetContainerRect.bottom);

    if (fitsWithinDestination) {
      // console.log('It fits');
    } else {
      // console.log("It doesn't fit");
      sourceDiv.style.left = originalLeft + 'px';
      sourceDiv.style.top = originalTop + 'px';
    }

    document.removeEventListener('mousemove', handleMagnetMouseMove);
    document.removeEventListener('mouseup', handleMagnetMouseUp);
  }

  /* detect2DBoxCollision function checks for collision between two rectangular boxes in a 2D space.
     It takes the coordinates of the bounding boxes of two elements and determines if they intersect.
     This is experimentation for implementing a 'highlight on collision' mechanism */
  function detect2DBoxCollision(box1, box2) {
    const box1Left = box1.left + window.pageXOffset;
    const box1Top = box1.top + window.pageYOffset;
    const box1Right = box1.right + window.pageXOffset;
    const box1Bottom = box1.bottom + window.pageYOffset;

    const box2Left = box2.left + window.pageXOffset;
    const box2Top = box2.top + window.pageYOffset;
    const box2Right = box2.right + window.pageXOffset;
    const box2Bottom = box2.bottom + window.pageYOffset;

    const collision =
      box1Left < box2Right &&
      box1Right > box2Left &&
      box1Bottom > box2Top &&
      box1Top < box2Bottom;

    return collision;
  }

  createRandomMagnetPile();
});
