/* 
  Type acts as an enum for the panel types.
  EMPTY: empty panel letting the user know they should pick one of the available options.
  POTIONS: the potions panel.
  INGREDIENTS: the ingredients panel.
*/
export const Type = {
  EMPTY: "empty",
  POTIONS: "potions",
  INGREDIENTS: "ingredients"
};
Object.freeze(Type);

export function generatePanel(type) {
  // Generate the background of the panel, then add that to the document
  const background = generatePanelBackgroundHTML();
  document.body.innerHTML += background;

  if (type === Type.EMPTY) {
    emptyPanel();
  }
  /*
  const temp = document.getElementById("panel-template");
  const clone = temp.content.cloneNode(true);
  document.body.appendChild(clone);
  */
}

/*
  <div class="panel-options"></div>
  <div class="panel-line"></div>
  <div class="panel-results"></div>

  <div class="text-centered">
    <div class="font-jersey">Press an option above to view and edit data.</div>
  </div>
*/

function generatePanelBackgroundHTML() {
  const html = `
    <section class="panel">
      <div class="panel-background">
        
      </div>
    </section>
  `;

  return html;
}

// An empty panel lets the user know to click one of the options above to view/edit data
function emptyPanel() {
  const displayEmpty = `
    <div class="text-centered">
      <div class="font-jersey text-big">Press an option above to view and edit data.</div>
    </div>
  `;

  document.querySelector('.panel-background').innerHTML = displayEmpty;
}
