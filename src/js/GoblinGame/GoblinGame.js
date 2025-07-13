import BoardManager from "./BoardManager";

/**
 * Класс игры "Гоблин"
 */
export default class GoblinGame {
  #boardManager;
  #personMovingInterval;
  #boardSelector;

  constructor(boardSelector = ".board") {
    this.#boardSelector = boardSelector;
    this.#boardManager = new BoardManager(4, this.#boardSelector);
    this.#personMovingInterval = 1000;
  }

  /**
   * Инициализация игры
   */
  init() {
    this.#boardManager.drawBoard();
    this.#boardManager.movingPersonThroughTheCells(this.#personMovingInterval);
  }
}
