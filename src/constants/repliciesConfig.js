/*
Офицер Кей Ди 6.3.7. приступим. Готовы?
- Готов.
- Ваша контрольная фраза.
- Кроваво-черное ничто пустилось вить систему клеток, связанных внутри, клеток, связанных внутри, клеток в едином стебле и явственно, до жути на фоне тьмы ввысь белым бил фонтан.
- Клетки.
- Клетки.
- Доводилось ли вам бывать в тюрьме? Клетки.
- Клетки.
- Вас держат в клетке? Клетки.
- Клетки. !!!!!!!!!!!!!!!!!!!!!
- Когда вы не исполняете обязанности, вас держат в коробке? Клетки.
- Клетки.
- Связаны.
- Связаны.
- Что вы чувствуете держа за руку того кого любите? Связаны.
- Связаны.
- Вас учили приставлять палец к пальцу? Связаны.
- Связаны.
- Вы жаждете связать с кем-нибудь сердце? Связаны.
- Связаны.
- Вам снится связь с кем-либо? Связаны.
- Связаны.
- Что вы чувствуете, держа в руках своего ребенка? Связаны.
- Связаны.
- Вы чувствуете, что вам чего-то не хватает? Связаны.
- Связаны.
- Клеток связанных внутри.
- Клеток связанных внутри.
- Повторите три раза "клеток связанных внутри"
- Клеток связанных внутри. Клеток связанных внутри. Клеток связанных внутри.
- На этом все. Кей стабилен, можете пройти за бонусом.
*/

export const REPLICIES_CONFIG = {
    'PROGRAM_Z': [{
        q: { rep: 'Кроваво-черное ничто пустилось вить систему клеток,' },
        a: [
            { rep: '', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'связанных внутри, клеток, связанных внутри, клеток в едином стебле и явственно,', show: true },
        a: [
            { rep: '', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'до жути на фоне тьмы ввысь белым бил фонтан.', show: true },
        a: [
            { rep: '', show: true, action: 'startBridge', idChangerState: 'openPhrasePROGRAM_00' },
        ],
    },],
    'PROGRAM_Z2': [{
        q: { rep: '' },
        a: [
            { rep: '', show: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_00': [{
        q: { rep: 'Офицер Кей Ди 6.3.7. приступим. Готовы?' },
        a: [
            { rep: 'Готов',  show: true, action: 'next', idChangerState: null },
            { rep: 'Не готов.', show: true, action: 'close', idChangerState: null },
        ],
    }, {
        q: { rep: 'Ваша контрольная фраза.', show: true },
        a: [
            { rep: 'Не знаю.', show: true, action: 'close', idChangerState: null },
            { rep: 'Зайду попозже.', show: true, action: 'close', idChangerState: null },
            { rep: 'Кроваво-черное ничто пустилось вить систему клеток.', show: false, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'Клетки.', show: true },
        a: [
            { rep: 'Клетки.', show: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_01': [{
        q: { rep: 'Доводилось ли вам бывать в тюрьме? Клетки.', show: true },
        a: [
            { rep: 'Клетки.', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'Вас держат в клетке? Клетки.', show: true },
        a: [
            { rep: 'Клетки.', show: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_02': [{
        q: { rep: 'Когда вы не исполняете обязанности, вас держат в коробке? Клетки.', show: true },
        a: [
            { rep: 'Клетки.', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'Связаны.', show: true },
        a: [
            { rep: 'Связаны.', show: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_03': [{
        q: { rep: 'Что вы чувствуете держа за руку того кого любите? Связаны.', show: true },
        a: [
            { rep: 'Связаны.', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'Вас учили приставлять палец к пальцу? Связаны.', show: true },
        a: [
            { rep: 'Связаны.', show: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_04': [{
        q: { rep: 'Вы жаждете связать с кем-нибудь сердце? Связаны.', show: true },
        a: [
            { rep: 'Связаны.', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'Вам снится связь с кем-либо? Связаны.', show: true },
        a: [
            { rep: 'Связаны.', show: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_05': [{
        q: { rep: 'Что вы чувствуете, держа в руках своего ребенка? Связаны.', show: true },
        a: [
            { rep: 'Связаны.', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'Вы чувствуете, что вам чего-то не хватает? Связаны.', show: true },
        a: [
            { rep: 'Связаны.', show: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_06': [{
        q: { rep: 'Клеток связанных внутри.', show: true },
        a: [
            { rep: 'Клеток связанных внутри.', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: 'Повторите три раза "клеток связанных внутри', show: true },
        a: [
            { rep: 'Клеток связанных внутри.', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: '', show: true },
        a: [
            { rep: 'Клеток связанных внутри.', show: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { rep: '', show: true },
        a: [
            { rep: 'Клеток связанных внутри.', show: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_LAST' : [{
        q: { rep: 'На этом все. Кей стабилен, можете пройти за бонусом.', show: true },
        a: [
            { rep: '', show: true, action: 'startBridge', idChangerState: null },
        ],
    },]
}
