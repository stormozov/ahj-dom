export default class BoardManager {
  #board;
  #boardSize;
  #boardCells;
  #currentPosition = null;

  constructor(boardSize = 4, boardSelector) {
    this.#board = document.querySelector(boardSelector);
    this.#boardSize = boardSize ** 2;
    this.#boardCells = [];
  }

  /**
   * Возвращает размер игрового поля
   *
   * @returns {number} Размер игрового поля
   */
  get boardSize() {
    return this.#boardSize;
  }

  /**
   * Отрисовывает игровое поле
   */
  drawBoard() {
    const boardSize = this.boardSize;

    for (let i = 0; i < boardSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (this.#board) this.#board.appendChild(cell);
    }

    this.#boardCells = document.querySelectorAll(".cell");
    const startPosition = this.#getRandomPosition();
    this.#addPersonToCell(startPosition);
    this.#currentPosition = startPosition;
  }

  /**
   * Перемещает персонажа по ячейкам поля с заданным интервалом
   *
   * @param {number} _interval - интервал в миллисекундах
   */
  movingPersonThroughTheCells(_interval) {
    setInterval(() => {
      if (this.#currentPosition !== null) {
        if (this.#boardCells[this.#currentPosition]) {
          this.#boardCells[this.#currentPosition]
            .querySelector(".person")
            .remove();
        }
      }

      const newPosition = this.#getRandomPosition();
      this.#addPersonToCell(newPosition);
      this.#currentPosition = newPosition;
    }, _interval);
  }

  /**
   * Возвращает случайную позицию
   *
   * @returns {number}
   */
  #getRandomPosition() {
    return Math.floor(Math.random() * this.boardSize);
  }

  /**
   * Добавляет персонажа в указанную ячейку
   *
   * @param {number} position - индекс ячейки
   */
  #addPersonToCell(position) {
    const person = document.createElement("div");
    person.classList.add("person");

    if (this.#boardCells[position]) {
      this.#boardCells[position].appendChild(person);
    }
  }
}
