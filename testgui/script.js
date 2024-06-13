document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('body');
  
    document.getElementById('add').addEventListener('click', () => {
      let element = document.createElement('div');
      element.className = "handout";
      element.setAttribute('contenteditable', "true");
  
      let deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = 'x';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // イベントの伝播を止める
        body.removeChild(element);
      });
  
      element.appendChild(deleteBtn);
      body.appendChild(element);
  
      makeDraggable(element);
    });
  
    function makeDraggable(element) {
      element.draggable = true;
      element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', null);
        element.classList.add('dragging');
      });
  
      element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
      });
  
      body.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingElement = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(body, e.clientY);
        if (afterElement == null) {
          body.appendChild(draggingElement);
        } else {
            body.insertBefore(draggingElement, afterElement);
          }
        });
      }
    
      function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.handout:not(.dragging)')];
    
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
      }
    });