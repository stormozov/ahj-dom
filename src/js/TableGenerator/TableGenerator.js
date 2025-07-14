/**
 * Класс для генерации и отрисовки таблицы из переданных данных.
 */
export default class TableGenerator {
  /**
   * @private
   * @type {HTMLElement} - Обертка для таблицы.
   */
  #tableWrapper;

  /**
   * @private
   * @type {Array<Object>} - Массив данных для отображения в таблице.
   */
  #tableContent;

  /**
   * @private
   * @type {Array<string>} - Отсортированные ключи для отображения в заголовке.
   */
  #sortedTableContent;

  /**
   * @private
   * @type {string} - Заголовок таблицы.
   */
  #caption;

  /**
   * Конструктор класса TableGenerator.
   *
   * @param {HTMLElement} tableWrapper - DOM-элемент для размещения таблицы.
   * @param {Array<Object>} tableContent - Массив объектов с данными для таблицы.
   */
  constructor(tableWrapper, tableContent, caption) {
    this.#tableWrapper = tableWrapper;
    this.#tableContent = tableContent;
    this.#caption = caption;

    this.#sortingData();
  }

  /**
   * Геттер для получения обертки таблицы.
   *
   * @returns {HTMLElement} - Обертка таблицы.
   */
  get tableWrapper() {
    return this.#tableWrapper;
  }

  /**
   * Геттер для получения содержимого таблицы.
   *
   * @returns {Array<Object>} - Данные таблицы.
   */
  get tableContent() {
    return this.#tableContent;
  }

  /**
   * Инициализация таблицы: создание и отрисовка.
   */
  init() {
    this.#generateTable();
  }

  /**
   * Генерация структуры таблицы (таблица, заголовок, тело).
   *
   * @private
   */
  #generateTable() {
    if (!this.#tableWrapper) return;

    const table = document.createElement("table");
    table.classList.add("table", "table_attrs-sorting");
    const tbody = document.createElement("tbody");

    this.#tableWrapper.append(table);
    table.append(this.#generateCaption(this.#caption));
    table.append(this.#generateTableHeader());
    table.append(tbody);
    this.#tableContent.forEach((data) => {
      tbody.append(this.#generateTableRow(data));
    });
  }

  /**
   * Генерация заголовка таблицы на основе отсортированных ключей.
   *
   * @private
   * @returns {HTMLElement} - Сгенерированный элемент заголовка (thead).
   */
  #generateTableHeader() {
    const headerRow = document.createElement("thead");

    // Проверяем, есть ли объекты в массиве
    if (this.#tableContent.length > 0) {
      const headerCells = this.#sortedTableContent.map((key) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = key; // Используем ключ как текст ячейки
        return headerCell;
      });

      headerRow.append(...headerCells);
    }

    return headerRow;
  }

  /**
   * Генерация строки таблицы на основе данных.
   *
   * @private
   * @param {Object} data - Объект с данными для строки.
   * @returns {HTMLElement} - Сгенерированная строка таблицы (tr).
   */
  #generateTableRow(data) {
    const row = document.createElement("tr");

    const cells = this.#sortedTableContent.map((key) => {
      let value = data[key];
      if (key === "year") value = `(${value})`;
      if (key === "imdb") value = `imdb: ${value}`;

      row.dataset[key] = data[key];

      const cell = document.createElement("td");
      cell.textContent = value;

      return cell;
    });

    row.append(...cells);

    return row;
  }

  /**
   * Генерация caption таблицы.
   *
   * @private
   * @returns {HTMLElement} - Сгенерированный элемент caption.
   */
  #generateCaption(captionText) {
    const caption = document.createElement("caption");
    caption.textContent = captionText;
    return caption;
  }

  /**
   * Сортировка ключей данных для корректного отображения.
   *
   * @private
   * @returns {Array<Object>} - Отсортированные данные.
   */
  #sortingData() {
    if (this.#tableContent.length > 0) {
      // Получаем ключи из первого объекта
      const keys = Object.keys(this.#tableContent[0]);

      // Сортируем ключи, чтобы 'imdb' был последним
      const sortedKeys = keys.sort((a, b) => {
        if (a === "imdb") return 1; // 'imdb' будет последним
        if (b === "imdb") return -1; // 'imdb' будет последним
        return 0; // остальные ключи остаются в исходном порядке
      });

      this.#sortedTableContent = sortedKeys;
    }

    return this.#tableContent;
  }
}
