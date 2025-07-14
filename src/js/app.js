import sortTable from "./DataAttrsSortingTables/DataAttrsSortingTables";
import GoblinGame from "./GoblinGame/GoblinGame";

function initGoblinGame() {
  const goblinGame = new GoblinGame();
  goblinGame.init();
}

function initDataAttrsSortingTable() {
  setInterval(sortTable, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  initGoblinGame();
  initDataAttrsSortingTable();
});
