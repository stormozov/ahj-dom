import defaultData from "../../data/data.json";
import TableGenerator from "../TableGenerator/TableGenerator.js";

/**
 * Класс для сортировки и отображения данных в таблице с циклической сменой параметров сортировки.
 */
export default class InMemorySorter {
  /**
   * Конструктор класса InMemorySorter.
   *
   * @param {string} containerSelector - CSS-селектор контейнера для отображения таблицы.
   */
  constructor(containerSelector) {
    /**
     * Поля для сортировки.
     * @type {Array<string>}
     */
    this.fields = ["id", "title", "imdb", "year"];

    /**
     * Общее количество шагов сортировки (количество полей × 2 для восходящего/нисходящего порядка).
     * @type {number}
     */
    this.totalSteps = this.fields.length * 2;

    /**
     * Текущий шаг сортировки.
     * @type {number}
     */
    this.step = 0;

    /**
     * Данные для сортировки (копия исходных данных).
     * @type {Array<Object>}
     */
    this.data = [...defaultData]; // делаем копию, чтобы не мутировать оригинальные данные

    /**
     * Селектор контейнера для отображения таблицы.
     * @type {string}
     */
    this.containerSelector = containerSelector;

    /**
     * Экземпляр генератора таблицы.
     * @type {?TableGenerator}
     */
    this.tableGenerator = null;

    /**
     * Интервал между шагами сортировки (в миллисекундах).
     * @type {number}
     */
    this.intervalSpeed = 2000;
  }

  /**
   * Инициализирует работу сортировщика.
   */
  init() {
    try {
      this.#startSortingCycle();
    } catch (error) {
      console.error("Failed to load data.json:", error);
    }
  }

  /**
   * Запускает циклическую смену параметров сортировки.
   */
  #startSortingCycle() {
    if (this.data.length === 0) return;

    this.#renderTable(); // первоначальный рендеринг

    setInterval(() => {
      const fieldIndex = Math.floor(this.step / 2);
      const ascending = this.step % 2 === 0;
      const fieldKey = this.fields[fieldIndex];
      const directionLabel = ascending ? "↑" : "↓";

      // Формируем текст подписи
      const sortingInfo = `Сортировка: ${fieldKey} (${directionLabel})`;

      this.sortData(fieldIndex, ascending);
      this.#renderTable(sortingInfo); // передаём подпись

      this.step = (this.step + 1) % this.totalSteps;
    }, this.intervalSpeed);
  }

  /**
   * Отображает таблицу в указанном контейнере.
   */
  #renderTable(captionText = "") {
    const container = document.querySelector(this.containerSelector);
    if (!container) return;

    container.innerHTML = ""; // очищаем предыдущее содержимое

    this.tableGenerator = new TableGenerator(container, this.data, captionText);
    this.tableGenerator.init();
  }

  /**
   * Сравнивает два значения для сортировки.
   *
   * @param {any} a - Первое значение.
   * @param {any} b - Второе значение.
   * @param {boolean} [ascending=true] - Признак восходящего порядка сортировки.
   * @returns {number} - Результат сравнения: -1, 0 или 1.
   */
  #compareValues(a, b, ascending = true) {
    if (a < b) return ascending ? -1 : 1;
    if (a > b) return ascending ? 1 : -1;
    return 0;
  }

  /**
   * Сортирует данные по указанному полю.
   *
   * @param {number} fieldIndex - Индекс поля из массива `fields`.
   * @param {boolean} ascending - Признак восходящего порядка сортировки.
   */
  sortData(fieldIndex, ascending) {
    const fieldKey = this.fields[fieldIndex];
    this.data.sort((a, b) => {
      return this.#compareValues(a[fieldKey], b[fieldKey], ascending);
    });
  }
}
