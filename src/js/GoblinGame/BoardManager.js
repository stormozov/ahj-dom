export default class BoardManager {
  #boardSize;
  #BoardCells;
  #currentPosition = null;

  constructor(boardSize = 4) {
    this.#boardSize = boardSize ** 2;
    this.#BoardCells = [];
  }

  get boardSize() {
    return this.#boardSize;
  }

  drawBoard() {
    const boardSize = this.boardSize;

    for (let i = 0; i < boardSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      document.querySelector(".board").appendChild(cell);
    }

    this.#BoardCells = document.querySelectorAll(".cell");
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
        this.#BoardCells[this.#currentPosition].innerHTML = "";
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
    this.#BoardCells[position].appendChild(person);
  }
}
