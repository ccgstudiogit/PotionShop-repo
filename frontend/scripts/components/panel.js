export function generatePanelTemplate() {
  const temp = document.getElementById("panel-template");
  const clone = temp.content.cloneNode(true);
  document.body.appendChild(clone);
}
