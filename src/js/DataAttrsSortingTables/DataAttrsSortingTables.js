import TableGenerator from "../TableGenerator/TableGenerator.js";
import data from "../../data/data.json";

// Получаем элемент обертки таблицы
const wrapper = document.querySelector(".attr-table-wrapper");

// Создаем экземпляр класса TableGenerator и инициализируем его
const tableGenerator = new TableGenerator(wrapper, data);
tableGenerator.init();

// Получаем ключи, используемые для сортировки
const keys = Object.keys(data[0]);

// Сортировка состояний: по возрастанию и убыванию для каждого из первых 4 столбцов
const sortStates = [];
for (let i = 0; i < 4; i++) {
  sortStates.push({ key: keys[i], order: "asc" });
  sortStates.push({ key: keys[i], order: "desc" });
}

let currentSortIndex = 0;

/**
 * Функция сортировки таблицы
 */
export default function sortTable() {
  if (!wrapper) return;

  const { key, order } = sortStates[currentSortIndex];
  const table = wrapper.querySelector("table");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  // Получаем строки в виде массива
  const rows = [...tbody.querySelectorAll("tr")];

  // Отсортируем строки по атрибуту данных для ключа
  rows.sort((a, b) => {
    let aValue = a.dataset[key];
    let bValue = b.dataset[key];

    // Преобразуем значение в число, если это возможно
    const aNum = parseFloat(aValue);
    const bNum = parseFloat(bValue);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      aValue = aNum;
      bValue = bNum;
    }

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });

  // Удаляем текущие строки
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

  // Добавляем отсортированные строки
  rows.forEach((row) => tbody.appendChild(row));

  currentSortIndex = (currentSortIndex + 1) % sortStates.length;
}
