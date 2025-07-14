import sortTable from "./DataAttrsSortingTables/DataAttrsSortingTables";
import GoblinGame from "./GoblinGame/GoblinGame";
import InMemorySorter from "./InMemorySorter/InMemorySorter";

function initGoblinGame() {
  const goblinGame = new GoblinGame();
  goblinGame.init();
}

function initDataAttrsSortingTable() {
  setInterval(sortTable, 2000);
}

function initInMemorySorting() {
  const inMemorySorter = new InMemorySorter(".in-memory-table-wrapper");
  inMemorySorter.init();
}

document.addEventListener("DOMContentLoaded", () => {
  initGoblinGame();
  initDataAttrsSortingTable();
  initInMemorySorting();
});
