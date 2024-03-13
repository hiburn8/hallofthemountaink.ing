const sidebar = document.getElementById('sidebar');
const sidebarTab = document.getElementById('sidebar-tab');

sidebar.classList.toggle('hidden');

sidebarTab.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});


const uniqueSections = [...new Set(levelData.map(obj => obj['location']))];

// Iterate through the number of sections
for (let i = 0; i < uniqueSections.length; i++) {
    // Create the section div and set its class
    let sectionDiv = document.createElement('div');
    sectionDiv.className = 'section';
    
    // Create the <h4> element and append it
    const h4 = document.createElement('h4');
    sectionDiv.appendChild(h4);

    h4.textContent = uniqueSections[i]; 
    
    let levels = levelData.filter(obj => obj.location === uniqueSections[i]);
    
    for (let j = 0; j < levels.length; j++) {

      // Create the label, set its class, and prepare for the checkbox
      const label = document.createElement('label');
      label.className = 'checkbox-container';

      // Create the checkbox input, set its type and id
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.id = levels[j].level; // Adjust id for each checkbox

      // Create the span for the custom checkbox appearance
      const span = document.createElement('span');
      span.className = 'checkbox-span';

      span.onclick = function() {
          level = levels[j].level;
          loadLevel(levels[j].level);
      };

      // Append the checkbox and span to the label
      label.appendChild(checkbox);
      label.appendChild(span);

      // Append the label to the section div
      sectionDiv.appendChild(label);

      // Finally, append the section div
      document.getElementById('sidebar').appendChild(sectionDiv);
    }
}