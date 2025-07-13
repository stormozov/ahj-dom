import BoardManager from "./BoardManager";

/**
 * Класс игры "Гоблин"
 */
export default class GoblinGame {
  #boardManager;
  #personMovingInterval;

  constructor() {
    this.#boardManager = new BoardManager(4);
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
