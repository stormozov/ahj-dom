export default class BoardManager {
  #boardSize;
  #BoardCells;

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
    this.#addPersonToCell(this.#getRandomPosition());
  }

  /**
   * Перемещает персонажа по ячейкам поля с заданным интервалом
   *
   * @param {number} _interval - интервал в миллисекундах
   */
  movingPersonThroughTheCells(_interval) {
    setInterval(() => {
      this.#clearCells();
      this.#addPersonToCell(this.#getRandomPosition());
    }, _interval);
  }

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

  /**
   * Очищает контент внутри всех ячеек поля
   */
  #clearCells() {
    this.#BoardCells.forEach((cell) => {
      cell.innerHTML = "";
    });
  }
}
