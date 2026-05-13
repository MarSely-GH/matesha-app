/** @typedef {{ id: string, prompt: string, options: string[], correctIndex: number, visual?: object, wrongHelp: { title: string, lines: string[], miniExample?: string } }} BankQuestion */

/** @typedef {{ id: string, bank: BankQuestion[] }} LessonStep */

export function pickInitial(bank) {
  if (!bank?.length) return null
  return bank[Math.floor(Math.random() * bank.length)]
}

export function pickNextVariant(bank, currentId) {
  if (!bank?.length) return null
  const others = bank.filter((q) => q.id !== currentId)
  if (others.length) return others[Math.floor(Math.random() * others.length)]
  return bank.find((q) => q.id !== currentId) ?? bank[0]
}

/** @type {Record<string, LessonStep[]>} */
const STEPS = {
  fractions: [
    {
      id: 'frac-meaning',
      bank: [
        {
          id: 'fm-a',
          prompt: 'Что значит дробь 2/5?',
          options: ['2 кусочка из 5', '5 кусочков из 2', 'две целых пятёрки', 'просто число 25'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 2, den: 5, caption: 'Закрасили 2 части из 5' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: [
              'Давай на кружочке: целое поделили на 5 равных частей.',
              'Нижнее число говорит: «на сколько кусочков поделили целое».',
              'Верхнее число говорит: «сколько кусочков взяли».',
            ],
            miniExample: 'Если бы было 3/8: шоколадку делим на 8 кусочков и берём 3.',
          },
        },
        {
          id: 'fm-b',
          prompt: 'Что значит дробь 3/8?',
          options: ['3 части из 8', '8 частей из 3', '38 целых', 'только число 8'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 3, den: 8, caption: '3 из 8 частей закрашено' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: [
              'Представь пиццу: сначала режем на 8 кусочков — это нижнее число.',
              'Потом берём 3 кусочка — это верхнее число.',
            ],
            miniExample: '4/6 — делим на 6, берём 4.',
          },
        },
        {
          id: 'fm-c',
          prompt: 'Что значит дробь 1/4?',
          options: ['одна часть из четырёх', 'четыре целых', 'один плюс четыре', 'четверть метра всегда'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 1, den: 4, caption: '1 из 4 частей' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Четверть — это когда целое делят на 4 равные части и берут 1.'],
            miniExample: '2/4 — тоже делим на 4, но берём уже 2 кусочка.',
          },
        },
      ],
    },
    {
      id: 'frac-add',
      bank: [
        {
          id: 'fa-a',
          prompt: 'Сколько будет 1/2 + 1/4?',
          options: ['3/4', '2/6', '1/6', '2/4'],
          correctIndex: 0,
          visual: { type: 'fracAdd', left: [1, 2], right: [1, 4], caption: 'Сложим две «пиццы»' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: [
              'Сначала сделаем одинаковые кусочки: 1/2 — это как 2/4.',
              'Потом складываем: 2/4 + 1/4 = 3/4.',
            ],
            miniExample: 'Если бы было 1/3 + 1/6: 1/3 = 2/6, и 2/6 + 1/6 = 3/6 = 1/2.',
          },
        },
        {
          id: 'fa-b',
          prompt: 'Сколько будет 1/3 + 1/6?',
          options: ['1/2', '2/9', '1/9', '2/3'],
          correctIndex: 0,
          visual: { type: 'fracAdd', left: [1, 3], right: [1, 6], caption: 'Сначала к одному размеру кусочков' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['1/3 — это как 2/6 (если шестых кусочков).', '2/6 + 1/6 = 3/6.', '3/6 — это ровно половинка: 1/2.'],
            miniExample: 'Похожий пример: 1/2 + 1/4 → переводим к четвертям.',
          },
        },
        {
          id: 'fa-c',
          prompt: 'Сколько будет 2/5 + 1/10?',
          options: ['1/2', '3/15', '3/10', '2/10'],
          correctIndex: 0,
          visual: { type: 'fracAdd', left: [2, 5], right: [1, 10], caption: 'Приведём к десятым' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['2/5 — это 4/10.', '4/10 + 1/10 = 5/10.', '5/10 — это половинка: 1/2.'],
            miniExample: '1/2 + 1/4 тоже про «сначала одинаковые доли».',
          },
        },
        {
          id: 'fa-d',
          prompt: 'Сколько будет 1/4 + 1/4?',
          options: ['1/2', '2/8', '1/8', '2/4'],
          correctIndex: 0,
          visual: { type: 'fracAdd', left: [1, 4], right: [1, 4], caption: 'Кусочки уже одинаковые' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Тут просто: 1 + 1 = 2, а доли одинаковые — четверти.', 'Получается 2/4, а это то же самое, что 1/2.'],
            miniExample: '1/3 + 1/3 = 2/3 — тоже «складываем верх, низ одинаковый».',
          },
        },
      ],
    },
    {
      id: 'frac-compare',
      bank: [
        {
          id: 'fc-a',
          prompt: 'Какая дробь больше: 2/5 или 1/2?',
          options: ['1/2', '2/5', 'равны', 'нельзя сравнить'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [2, 5], right: [1, 2], caption: 'Сравним «пиццы»' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Представь две одинаковые пиццы.', 'Половинка — это больше, чем две пятых.'],
            miniExample: 'Можно перевести к десятым: 2/5 = 4/10, а 1/2 = 5/10.',
          },
        },
        {
          id: 'fc-b',
          prompt: 'Какая дробь больше: 3/8 или 1/4?',
          options: ['3/8', '1/4', 'равны', 'зависит от настроения'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [3, 8], right: [1, 4], caption: '1/4 — это 2/8' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['1/4 — это как 2/8 (если делим на 8).', '3/8 больше, чем 2/8.'],
            miniExample: '2/5 и 1/2 — тоже удобно переводить к одинаковым долям.',
          },
        },
        {
          id: 'fc-c',
          prompt: 'Какая дробь больше: 1/3 или 1/5?',
          options: ['1/3', '1/5', 'равны', '1/15'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [1, 3], right: [1, 5], caption: 'Кусочков меньше — кусок больше' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Если берём «один кусок», но треть или пятая — треть больше.'],
            miniExample: '1/2 больше, чем 1/4: половинка шире четверти.',
          },
        },
      ],
    },
    {
      id: 'frac-whole',
      bank: [
        {
          id: 'fw-a',
          prompt: 'Сколько будет 5/5?',
          options: ['1', '0', '5', '1/5'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 5, den: 5, caption: 'Все 5 частей закрашены — это целое' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Если взяли все кусочки из всех — получилось целое.', 'Целое — это 1.'],
            miniExample: '4/4 тоже равно 1.',
          },
        },
        {
          id: 'fw-b',
          prompt: 'Сколько будет 6/6?',
          options: ['1', '6', '0', '1/6'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 6, den: 6, caption: 'Все части взяли — целое' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Верх и низ одинаковые — значит взяли всё целиком.'],
            miniExample: '3/3 = 1.',
          },
        },
        {
          id: 'fw-c',
          prompt: 'Сколько будет 4/4 минус «ничего»? (просто 4/4)',
          options: ['1', '4', '0', '16'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 4, den: 4, caption: '4 из 4 — целый круг' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Это шуточный вопрос, но смысл простой: 4/4 — целое.'],
            miniExample: '5/5 = 1.',
          },
        },
      ],
    },
    {
      id: 'frac-part',
      bank: [
        {
          id: 'fp-a',
          prompt: 'Чему равно 2/3 от 9 конфет?',
          options: ['6', '3', '2', '4'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 2, den: 3, caption: 'Сначала делим 9 на 3 части' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Сначала найди одну треть: 9 ÷ 3 = 3.', 'Две трети — это два раза по 3: 3 × 2 = 6.'],
            miniExample: '1/3 от 9 — это 3. 2/3 — вдвое больше: 6.',
          },
        },
        {
          id: 'fp-b',
          prompt: 'Чему равно 1/4 от 12 ягодок?',
          options: ['3', '4', '6', '8'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 1, den: 4, caption: 'Четверть — делим на 4 кучки' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['12 поделить на 4 кучки — в каждой по 3 ягодки.'],
            miniExample: '1/3 от 9 — это 9 ÷ 3 = 3.',
          },
        },
        {
          id: 'fp-c',
          prompt: 'Чему равно 3/5 от 10 шоколадных квадратиков?',
          options: ['6', '5', '3', '2'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 3, den: 5, caption: 'Сначала одна пятая' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Одна пятая от 10 — это 10 ÷ 5 = 2.', 'Три пятых — 2 × 3 = 6.'],
            miniExample: '2/3 от 9: сначала треть — 3, потом ×2 = 6.',
          },
        },
      ],
    },
  ],
  percents: [
    {
      id: 'p-half',
      bank: [
        {
          id: 'ph-a',
          prompt: 'Сколько процентов — это половинка?',
          options: ['50%', '25%', '100%', '10%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 50, caption: 'Половина полоски — 50 из 100' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Проценты — это «из 100 клеточек сколько взяли».', 'Половина — это 50 клеточек из 100.'],
            miniExample: '25% — это четверть полоски.',
          },
        },
        {
          id: 'ph-b',
          prompt: 'Сколько процентов — это четверть?',
          options: ['25%', '50%', '4%', '250%'],
          correctIndex: 0,
          visual: { type: 'percent100', fill: 25, caption: '25 из 100 клеточек' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Четверть от 100 — это 100 ÷ 4 = 25.'],
            miniExample: '50% — половинка.',
          },
        },
        {
          id: 'ph-c',
          prompt: 'Сколько процентов — это три четверти?',
          options: ['75%', '34%', '50%', '7%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 75, caption: '75% — почти вся полоска' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Одна четверть — 25%.', 'Три четверти — 25 + 25 + 25 = 75.'],
            miniExample: '1/2 — это 50%.',
          },
        },
      ],
    },
    {
      id: 'p-of-number',
      bank: [
        {
          id: 'pn-a',
          prompt: 'Сколько будет 20% от 80?',
          options: ['16', '8', '20', '4'],
          correctIndex: 0,
          visual: { type: 'percent100', fill: 20, caption: '20% — это 20 клеточек из 100 (мысленно для 80)' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['20% — это 0,20.', 'Умножь 80 на 0,2 — получится 16.'],
            miniExample: '10% от 80 — это 8, а 20% вдвое больше: 16.',
          },
        },
        {
          id: 'pn-b',
          prompt: 'Сколько будет 10% от 60?',
          options: ['6', '10', '16', '600'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 10, caption: '10% — маленькая часть от целого' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['10% — это «одна десятая».', '60 ÷ 10 = 6.'],
            miniExample: '10% от 80 — это 8.',
          },
        },
        {
          id: 'pn-c',
          prompt: 'Сколько будет 50% от 18?',
          options: ['9', '18', '36', '4'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 50, caption: '50% — ровно половинка' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Половинка от числа — делим на 2.', '18 ÷ 2 = 9.'],
            miniExample: '50% от 10 — это 5.',
          },
        },
      ],
    },
    {
      id: 'p-decimal',
      bank: [
        {
          id: 'pd-a',
          prompt: '0,25 — это сколько процентов?',
          options: ['25%', '2,5%', '250%', '0,25%'],
          correctIndex: 0,
          visual: { type: 'percent100', fill: 25, caption: '0,25 — это четверть, а четверть — 25%' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Чтобы из «ноль целых» сделать проценты — умножь на 100.', '0,25 × 100 = 25.'],
            miniExample: '0,5 — это 50%.',
          },
        },
        {
          id: 'pd-b',
          prompt: '0,1 — это сколько процентов?',
          options: ['10%', '1%', '100%', '0,1%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 10, caption: '0,1 — это десятая часть' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['0,1 × 100 = 10.'],
            miniExample: '0,25 — это 25%.',
          },
        },
        {
          id: 'pd-c',
          prompt: '0,5 — это сколько процентов?',
          options: ['50%', '5%', '500%', '0,5%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 50, caption: 'Половинка как десятичная — 0,5' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['0,5 — это половинка, а половинка — 50%.'],
            miniExample: '0,25 — это 25%.',
          },
        },
      ],
    },
    {
      id: 'p-100meaning',
      bank: [
        {
          id: 'p100-a',
          prompt: '100% — это…',
          options: ['всё целое', 'ничего', 'половина', 'удвоение'],
          correctIndex: 0,
          visual: { type: 'percent100', fill: 100, caption: '100 из 100 — всё' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['100% — это все клеточки, весь путь, вся задача целиком.'],
            miniExample: '50% — только половинка.',
          },
        },
        {
          id: 'p100-b',
          prompt: 'Если выполнено 100% плана, значит…',
          options: ['сделали всё', 'сделали половину', 'ничего не сделали', 'сделали 10%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 100, caption: 'Полоска полностью заполнена' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['100% — это «всё готово».'],
            miniExample: '25% — только четверть плана.',
          },
        },
        {
          id: 'p100-c',
          prompt: '0% — это…',
          options: ['ничего не взяли из 100', 'всё целое', 'половина', 'двойной план'],
          correctIndex: 0,
          visual: { type: 'percent100', fill: 0, caption: '0 клеточек из 100' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['0% — ни одной клеточки, ничего не выбрали из «ста долей».'],
            miniExample: '100% — всё.',
          },
        },
      ],
    },
    {
      id: 'p-price',
      bank: [
        {
          id: 'pp-a',
          prompt: 'Если цена выросла на 10%, новая цена — это…',
          options: ['110% от старой', '10% от старой', '90% от старой', '100% без изменений'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 100, caption: 'Было 100% — добавили 10% → стало 110% (полоска «сверх полной» в жизни бывает)' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Было 100% как «целая цена».', 'Плюс 10% — это 100% + 10% = 110%.'],
            miniExample: 'Если бы выросло на 50%, было бы 150%.',
          },
        },
        {
          id: 'pp-b',
          prompt: 'Если скидка 20%, ты платишь…',
          options: ['80% от цены', '120% от цены', '20% от цены', '0%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 80, caption: 'Скидка «съела» 20% — осталось 80%' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['От 100% отняли 20% — осталось 80%.'],
            miniExample: 'Скидка 10% — платишь 90%.',
          },
        },
        {
          id: 'pp-c',
          prompt: 'Если цена выросла на 50%, новая цена — это…',
          options: ['150% от старой', '50% от старой', '200% от старой', '100%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 100, caption: '100% + 50% = 150% (полоска показывает «полную», а смысл — на 50% больше)' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Было 100%.', 'Плюс половинка (50%) — получится 150%.'],
            miniExample: '+10% — это 110%.',
          },
        },
      ],
    },
  ],
  compare: [
    {
      id: 'cmp-frac',
      bank: [
        {
          id: 'cf-a',
          prompt: 'Что больше: 3/7 или 4/9?',
          options: ['4/9', '3/7', 'равны', 'нельзя'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [3, 7], right: [4, 9], caption: 'Можно перевести к одинаковым «кусочкам»' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Переведём к общим долям: 3/7 = 27/63, а 4/9 = 28/63.', '28 чуть больше 27 — значит больше 4/9.'],
            miniExample: '2/5 и 1/2: удобно к десятым.',
          },
        },
        {
          id: 'cf-b',
          prompt: 'Что больше: 2/3 или 3/5?',
          options: ['2/3', '3/5', 'равны', '1/2'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [2, 3], right: [3, 5], caption: 'Обе дроби почти целые' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['2/3 — это примерно 0,666…', '3/5 = 0,6 — чуть меньше.'],
            miniExample: '4/9 и 3/7 — через общий знаменатель.',
          },
        },
        {
          id: 'cf-c',
          prompt: 'Что больше: 5/8 или 1/2?',
          options: ['5/8', '1/2', 'равны', '1/8'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [5, 8], right: [1, 2], caption: '1/2 — это 4/8' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['1/2 — это как 4/8.', '5/8 больше, чем 4/8.'],
            miniExample: '3/8 и 1/4: 1/4 = 2/8.',
          },
        },
      ],
    },
    {
      id: 'cmp-method',
      bank: [
        {
          id: 'cm-a',
          prompt: 'Самый спокойный способ сравнить дроби — это…',
          options: ['сделать одинаковые доли (общий знаменатель)', 'смотреть только на верх', 'всегда угадывать', 'делить на ноль'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [1, 3], right: [1, 4], caption: 'Разные «куски» — сначала к одному размеру' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Если «низ» разный — кружочки разного размера. Лучше привести к одному размеру доли.'],
            miniExample: '1/2 и 1/4 — сначала переводим к четвертям.',
          },
        },
        {
          id: 'cm-b',
          prompt: 'Если у двух дробей одинаковый низ (знаменатель), что сравниваем?',
          options: ['верх (сколько частей взяли)', 'только низ', 'цвет', 'погоду'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [2, 7], right: [5, 7], caption: 'Доли одинаковые — смотрим наверх' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Когда кусочки одинакового размера, важно сколько взяли — это верх.'],
            miniExample: '3/8 и 5/8: больше 5/8.',
          },
        },
        {
          id: 'cm-c',
          prompt: 'Почему иногда удобно рисовать круг?',
          options: ['так видно доли целого', 'так быстрее зарядка телефона', 'так вырастают деревья', 'просто красиво'],
          correctIndex: 0,
          visual: { type: 'fracCircle', num: 3, den: 8, caption: 'Круг = целое, сектора = доли' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Круг — это «целое». Сектора — «сколько взяли».'],
            miniExample: 'Пицца делится на кусочки — то же самое.',
          },
        },
      ],
    },
    {
      id: 'cmp-close1',
      bank: [
        {
          id: 'cc-a',
          prompt: 'Сравни: 5/6 и 7/8',
          options: ['7/8 больше', '5/6 больше', 'равны', 'нельзя'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [5, 6], right: [7, 8], caption: 'Обе «почти целые»' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Подумай, чего не хватает до 1.', 'До 1 у 5/6 не хватает 1/6.', 'До 1 у 7/8 не хватает только 1/8 — это меньший «кусок нехватки».'],
            miniExample: '9/10 и 8/9 — тоже «кто ближе к 1».',
          },
        },
        {
          id: 'cc-b',
          prompt: 'Сравни: 9/10 и 7/8',
          options: ['9/10 больше', '7/8 больше', 'равны', '1/2'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [9, 10], right: [7, 8], caption: 'Кто ближе к целому?' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['9/10 не хватает 1/10 до 1.', '7/8 не хватает 1/8 — это чуть больше кусок, значит 7/8 чуть дальше от 1.'],
            miniExample: '5/6 и 7/8 — смотрим «недостающий кусок».',
          },
        },
        {
          id: 'cc-c',
          prompt: 'Сравни: 3/4 и 5/6',
          options: ['5/6 больше', '3/4 больше', 'равны', '2/3'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [3, 4], right: [5, 6], caption: 'Обе больше половины' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Можно привести к 12: 3/4 = 9/12, 5/6 = 10/12.', '10/12 больше.'],
            miniExample: '7/8 и 5/6 — «почти целое».',
          },
        },
      ],
    },
    {
      id: 'cmp-same-den',
      bank: [
        {
          id: 'cs-a',
          prompt: 'Что больше: 2/7 или 5/7?',
          options: ['5/7', '2/7', 'равны', '7/2'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [2, 7], right: [5, 7], caption: 'Кусочки одинаковые — смотрим наверх' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Низ одинаковый — значит кусочки одного размера.', 'Больше взяли — там, где верх больше.'],
            miniExample: '3/8 и 5/8 — больше 5/8.',
          },
        },
        {
          id: 'cs-b',
          prompt: 'Что больше: 4/9 или 2/9?',
          options: ['4/9', '2/9', 'равны', '9/4'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [4, 9], right: [2, 9], caption: 'Девятые доли' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Кусочки девятые — сравни 4 и 2.'],
            miniExample: '5/7 и 2/7.',
          },
        },
        {
          id: 'cs-c',
          prompt: 'Что меньше: 3/10 или 7/10?',
          options: ['3/10', '7/10', 'равны', '10/3'],
          correctIndex: 0,
          visual: { type: 'fracTwo', left: [3, 10], right: [7, 10], caption: 'Меньше взяли — меньше дробь' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['При одинаковом низу меньше верх — меньше доля.'],
            miniExample: '2/9 и 4/9.',
          },
        },
      ],
    },
    {
      id: 'cmp-percentmix',
      bank: [
        {
          id: 'cpm-a',
          prompt: '2/3 и 66% (примерно) — что вернее?',
          options: ['2/3 чуть больше 66%', 'равны точно', '66% больше', '2/3 = 50%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 66, caption: '66% — чуть меньше, чем 2/3' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['2/3 — это примерно 66,666…%', 'Это чуть-чуть больше, чем ровно 66%.'],
            miniExample: '1/2 ровно 50%.',
          },
        },
        {
          id: 'cpm-b',
          prompt: '1/2 и 49% — что вернее?',
          options: ['1/2 больше', '49% больше', 'равны', 'нельзя'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 50, caption: 'Половина — это 50%' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['1/2 — это 50%.', '50% больше, чем 49%.'],
            miniExample: '2/3 чуть больше 66%.',
          },
        },
        {
          id: 'cpm-c',
          prompt: '1/4 и 30% — что вернее?',
          options: ['30% больше', '1/4 больше', 'равны', '0%'],
          correctIndex: 0,
          visual: { type: 'percentBar', pct: 25, caption: '1/4 — это 25%' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['1/4 — это 25%.', '30% больше, чем 25%.'],
            miniExample: '1/2 — это 50%.',
          },
        },
      ],
    },
  ],
  equations: [
    {
      id: 'eq-plus',
      bank: [
        {
          id: 'eqp-a',
          prompt: 'Реши: x + 5 = 12',
          options: ['x = 7', 'x = 17', 'x = 5', 'x = 12'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x + 5', right: '12', caption: 'Хотим оставить только x' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Представь весы: слева x и 5, справа 12.', 'Чтобы остался только x, «убираем» 5 с обеих сторон честно.', 'Тогда x = 12 − 5 = 7.'],
            miniExample: 'x + 3 = 10 → x = 7.',
          },
        },
        {
          id: 'eqp-b',
          prompt: 'Реши: x + 4 = 9',
          options: ['x = 5', 'x = 13', 'x = 4', 'x = 36'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x + 4', right: '9', caption: 'Убираем 4 с двух сторон' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Слева убрали 4 — справа тоже убираем 4.', 'x = 9 − 4 = 5.'],
            miniExample: 'x + 5 = 12 → x = 7.',
          },
        },
        {
          id: 'eqp-c',
          prompt: 'Реши: x + 8 = 15',
          options: ['x = 7', 'x = 23', 'x = 8', 'x = 1'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x + 8', right: '15', caption: 'x спрятался вместе с 8' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['x = 15 − 8 = 7.'],
            miniExample: 'x + 4 = 9 → x = 5.',
          },
        },
      ],
    },
    {
      id: 'eq-mul',
      bank: [
        {
          id: 'eqm-a',
          prompt: 'Реши: 3x = 15',
          options: ['x = 5', 'x = 3', 'x = 45', 'x = 12'],
          correctIndex: 0,
          visual: { type: 'balance', left: '3·x', right: '15', caption: '3 «прилипло» к x' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['3x значит «три раза x».', 'Чтобы найти один x — делим 15 на 3.', 'x = 5.'],
            miniExample: '2x = 8 → x = 4.',
          },
        },
        {
          id: 'eqm-b',
          prompt: 'Реши: 2x = 10',
          options: ['x = 5', 'x = 2', 'x = 20', 'x = 8'],
          correctIndex: 0,
          visual: { type: 'balance', left: '2·x', right: '10', caption: 'Делим на 2' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['10 ÷ 2 = 5.'],
            miniExample: '3x = 15 → x = 5.',
          },
        },
        {
          id: 'eqm-c',
          prompt: 'Реши: 4x = 20',
          options: ['x = 5', 'x = 4', 'x = 16', 'x = 24'],
          correctIndex: 0,
          visual: { type: 'balance', left: '4·x', right: '20', caption: 'Делим на 4' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['20 ÷ 4 = 5.'],
            miniExample: '2x = 10 → x = 5.',
          },
        },
      ],
    },
    {
      id: 'eq-meaning',
      bank: [
        {
          id: 'eqmean-a',
          prompt: 'Что значит «решить уравнение»?',
          options: ['найти число вместо буквы', 'удалить все числа', 'нарисовать круг', 'забыть про равно'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x + 2', right: '7', caption: 'Нужно подобрать x' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Уравнение — это загадка: какое число подойдёт вместо буквы?', 'Если подставить — слева и справа станет честно равно.'],
            miniExample: 'x + 2 = 7 → x = 5.',
          },
        },
        {
          id: 'eqmean-b',
          prompt: 'Буква x в уравнении — это…',
          options: ['скрытое число', 'всегда 10', 'ошибка', 'знак умножения'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x', right: '?', caption: 'x — как коробочка с числом' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['x — это «неизвестное число», которое мы ищем.'],
            miniExample: 'x + 1 = 4 → x = 3.',
          },
        },
        {
          id: 'eqmean-c',
          prompt: 'Знак «=» в уравнении говорит…',
          options: ['слева и справа одинаково по значению', 'слева больше', 'справа всегда 0', 'ничего не говорит'],
          correctIndex: 0,
          visual: { type: 'balance', left: '3 + 2', right: '5', caption: 'Весы в равновесии' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Равно — это «одинаковая величина».'],
            miniExample: '7 = 5 + 2.',
          },
        },
      ],
    },
    {
      id: 'eq-minus',
      bank: [
        {
          id: 'eqmi-a',
          prompt: 'Реши: x − 4 = 10',
          options: ['x = 14', 'x = 6', 'x = 4', 'x = 40'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x − 4', right: '10', caption: '«Вернуть» 4 на другую сторону' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Если слева было минус 4, то на другой стороне это как плюс 4.', 'x = 10 + 4 = 14.'],
            miniExample: 'x − 2 = 5 → x = 7.',
          },
        },
        {
          id: 'eqmi-b',
          prompt: 'Реши: x − 3 = 8',
          options: ['x = 11', 'x = 5', 'x = 24', 'x = 3'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x − 3', right: '8', caption: 'Переносим 3' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['x = 8 + 3 = 11.'],
            miniExample: 'x − 4 = 10 → x = 14.',
          },
        },
        {
          id: 'eqmi-c',
          prompt: 'Реши: x − 7 = 1',
          options: ['x = 8', 'x = 6', 'x = 7', 'x = 0'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x − 7', right: '1', caption: 'Переносим 7' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['x = 1 + 7 = 8.'],
            miniExample: 'x − 3 = 8 → x = 11.',
          },
        },
      ],
    },
    {
      id: 'eq-double',
      bank: [
        {
          id: 'eqd-a',
          prompt: 'Если x + x = 8, то x = …',
          options: ['4', '8', '2', '16'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x + x', right: '8', caption: 'x + x — это два раза x' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['x + x — это 2x.', '2x = 8 → делим на 2: x = 4.'],
            miniExample: 'x + x = 10 → x = 5.',
          },
        },
        {
          id: 'eqd-b',
          prompt: 'Если x + x = 12, то x = …',
          options: ['6', '12', '3', '24'],
          correctIndex: 0,
          visual: { type: 'balance', left: 'x + x', right: '12', caption: 'Два одинаковых кусочка' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['12 ÷ 2 = 6.'],
            miniExample: 'x + x = 8 → x = 4.',
          },
        },
        {
          id: 'eqd-c',
          prompt: 'Если x + x + x = 9, то x = …',
          options: ['3', '9', '6', '27'],
          correctIndex: 0,
          visual: { type: 'balance', left: '3x', right: '9', caption: 'Три раза x' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Это как 3x = 9.', 'x = 9 ÷ 3 = 3.'],
            miniExample: 'x + x = 8 → x = 4.',
          },
        },
      ],
    },
  ],
  geometry: [
    {
      id: 'geo-angle',
      bank: [
        {
          id: 'ga-a',
          prompt: 'Сколько градусов в прямом угле?',
          options: ['90°', '45°', '180°', '360°'],
          correctIndex: 0,
          visual: { type: 'angleRight', caption: 'Прямой угол — «уголок тетрадки»' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Прямой угол — как угол листа, если не сгибать.', 'Это 90°.'],
            miniExample: 'Разворот — 180°.',
          },
        },
        {
          id: 'ga-b',
          prompt: 'Сколько градусов в развороте (прямая линия)?',
          options: ['180°', '90°', '360°', '45°'],
          correctIndex: 0,
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Если повернуться «назад», это 180°.'],
            miniExample: 'Прямой угол — 90°.',
          },
        },
        {
          id: 'ga-c',
          prompt: 'Полный круг — сколько градусов?',
          options: ['360°', '180°', '90°', '100°'],
          correctIndex: 0,
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Полный круг — 360°.'],
            miniExample: 'Полкруга — 180°.',
          },
        },
      ],
    },
    {
      id: 'geo-area',
      bank: [
        {
          id: 'garea-a',
          prompt: 'Площадь прямоугольника 3 см × 4 см?',
          options: ['12 см²', '7 см²', '14 см²', '1 см²'],
          correctIndex: 0,
          visual: { type: 'rectArea', w: 3, h: 4, caption: 'Считаем «плитки» внутри' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Представь плитку на полу: 3 ряда и в каждом 4 плитки.', '3 × 4 = 12.', 'Это квадратные сантиметры.'],
            miniExample: '2 × 5 = 10 см².',
          },
        },
        {
          id: 'garea-b',
          prompt: 'Площадь прямоугольника 2 см × 5 см?',
          options: ['10 см²', '7 см²', '25 см²', '4 см²'],
          correctIndex: 0,
          visual: { type: 'rectArea', w: 2, h: 5, caption: 'Длина × ширина' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['2 × 5 = 10.'],
            miniExample: '3 × 4 = 12 см².',
          },
        },
        {
          id: 'garea-c',
          prompt: 'Площадь квадрата со стороной 4 см?',
          options: ['16 см²', '8 см²', '4 см²', '12 см²'],
          correctIndex: 0,
          visual: { type: 'rectArea', w: 4, h: 4, caption: 'Квадрат — сторона × сторона' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['4 × 4 = 16.'],
            miniExample: '3 × 4 = 12 см².',
          },
        },
      ],
    },
    {
      id: 'geo-triangle',
      bank: [
        {
          id: 'gt-a',
          prompt: 'Сумма углов треугольника?',
          options: ['180°', '90°', '360°', '100°'],
          correctIndex: 0,
          visual: { type: 'triangle180', caption: 'Три угла вместе — как половинка разворота' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['В любом треугольнике три угла в сумме дают 180°.', 'Это удобно запомнить как «полпути по прямой».'],
            miniExample: 'Прямой угол — 90°.',
          },
        },
        {
          id: 'gt-b',
          prompt: 'Если в треугольнике два угла 70° и 60°, третий угол…',
          options: ['50°', '90°', '130°', '180°'],
          correctIndex: 0,
          visual: { type: 'triangle180', caption: 'Сначала сложи два угла, потом вычти из 180°' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['70 + 60 = 130.', '180 − 130 = 50.'],
            miniExample: 'Сумма углов треугольника всегда 180°.',
          },
        },
        {
          id: 'gt-c',
          prompt: 'Может ли треугольник иметь углы 90°, 60° и 40°?',
          options: ['нет, сумма будет 190°', 'да, всегда', 'только если он квадратный', 'только ночью'],
          correctIndex: 0,
          visual: { type: 'triangle180', caption: 'Проверь сумму' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['90 + 60 + 40 = 190 — это больше, чем 180.', 'Значит так не бывает.'],
            miniExample: '90 + 45 + 45 = 180 — да, бывает.',
          },
        },
      ],
    },
    {
      id: 'geo-perim',
      bank: [
        {
          id: 'gp-a',
          prompt: 'Периметр квадрата со стороной 5 см?',
          options: ['20 см', '25 см', '10 см', '5 см'],
          correctIndex: 0,
          visual: { type: 'squarePerim', a: 5, caption: 'Обойти все 4 стороны' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Периметр — обойти фигуру и сложить стороны.', '5 + 5 + 5 + 5 = 20.'],
            miniExample: 'Сторона 3 см → 12 см.',
          },
        },
        {
          id: 'gp-b',
          prompt: 'Периметр квадрата со стороной 3 см?',
          options: ['12 см', '9 см', '6 см', '3 см'],
          correctIndex: 0,
          visual: { type: 'squarePerim', a: 3, caption: '4 одинаковые стороны' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['3 × 4 = 12.'],
            miniExample: '5 см → 20 см.',
          },
        },
        {
          id: 'gp-c',
          prompt: 'Периметр прямоугольника 2 см и 6 см (разные стороны)?',
          options: ['16 см', '12 см', '8 см', '36 см'],
          correctIndex: 0,
          visual: { type: 'rectArea', w: 2, h: 6, caption: 'Периметр: 2 + 6 + 2 + 6' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['2 + 6 + 2 + 6 = 16.'],
            miniExample: 'Квадрат 5 см → 20 см.',
          },
        },
      ],
    },
    {
      id: 'geo-parallel',
      bank: [
        {
          id: 'gpl-a',
          prompt: 'Параллельные прямые…',
          options: ['не пересекаются', 'всегда пересекаются', 'всегда перпендикулярны', 'обязательно кривые'],
          correctIndex: 0,
          visual: { type: 'parallelLines', caption: 'Две дорожки рядом' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Параллельные — как рельсы: идут рядом и не встречаются.'],
            miniExample: 'Если встречаются — это уже не параллельные.',
          },
        },
        {
          id: 'gpl-b',
          prompt: 'Две параллельные прямые имеют…',
          options: ['одинаковый «наклон»', 'разный цвет', 'обязательно угол 90°', 'одну точку общую'],
          correctIndex: 0,
          visual: { type: 'parallelLines', caption: 'Наклон одинаковый — поэтому не встречаются' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Параллельные идут «одинаково наклонено» и поэтому не сходятся.'],
            miniExample: 'Рельсы параллельны.',
          },
        },
        {
          id: 'gpl-c',
          prompt: 'Перпендикулярные прямые — это…',
          options: ['пересекаются под прямым углом (90°)', 'никогда не пересекаются', 'всегда параллельны', 'только окружности'],
          correctIndex: 0,
          visual: { type: 'angleRight', caption: 'Перпендикуляр — «красивый уголок» 90°' },
          wrongHelp: {
            title: 'Ничего страшного 💜',
            lines: ['Перпендикулярно — значит встречаются «как угол тетрадки».'],
            miniExample: 'Параллельные — не встречаются.',
          },
        },
      ],
    },
  ],
}

export function getLessonSteps(lessonId) {
  return STEPS[lessonId] ?? []
}
