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
        q: { txt: 'Кроваво-черное ничто пустилось вить систему клеток,' },
        a: [
            { txt: '', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'связанных внутри, клеток, связанных внутри, клеток в едином стебле и явственно,' },
        a: [
            { txt: '', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'до жути на фоне тьмы ввысь белым бил фонтан.' },
        a: [
            { txt: '', isShow: true, action: 'startBridge', idChangerState: 'openPhrasePROGRAM_00' },
        ],
    },],
    'PROGRAM_00': [{
        q: { txt: 'Офицер Кей Ди 6.3.7. приступим. Готовы?' },
        a: [
            { txt: 'Готов',  isShow: true, action: 'next', idChangerState: null },
            { txt: 'Не готов.', isShow: true, action: 'close', idChangerState: null },
        ],
    }, {
        q: { txt: 'Ваша контрольная фраза.' },
        a: [
            { txt: 'Я забыл.', isShow: true, action: 'close', idChangerState: null },
            { txt: 'Я зайду попозже.', isShow: true, action: 'close', idChangerState: null },
            { txt: 'Кроваво-черное ничто пустилось вить систему клеток.', isShow: false, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Клетки.' },
        a: [
            { txt: 'Клетки.', isShow: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_01': [{
        q: { txt: 'Доводилось ли вам бывать в тюрьме? Клетки.' },
        a: [
            { txt: 'Клетки.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Вас держат в клетке? Клетки.' },
        a: [
            { txt: 'Клетки.', isShow: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_02': [{
        q: { txt: 'Когда вы не исполняете обязанности, вас держат в коробке? Клетки.' },
        a: [
            { txt: 'Клетки.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_03': [{
        q: { txt: 'Что вы чувствуете держа за руку того кого любите? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Вас учили приставлять палец к пальцу? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_04': [{
        q: { txt: 'Вы жаждете связать с кем-нибудь сердце? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Вам снится связь с кем-либо? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_05': [{
        q: { txt: 'Что вы чувствуете, держа в руках своего ребенка? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Вы чувствуете, что вам чего-то не хватает? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_06': [{
        q: { txt: 'Клеток связанных внутри.' },
        a: [
            { txt: 'Клеток связанных внутри.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Повторите три раза "клеток связанных внутри' },
        a: [
            { txt: 'Клеток связанных внутри.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: '' },
        a: [
            { txt: 'Клеток связанных внутри.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: '' },
        a: [
            { txt: 'Клеток связанных внутри.', isShow: true, action: 'startBridge', idChangerState: null },
        ],
    },],
    'PROGRAM_LAST' : [{
        q: { txt: 'На этом все. Кей стабилен, можете пройти за бонусом.' },
        a: [
            { txt: 'Спасибо, сэр. ', isShow: true, action: 'startBridge', idChangerState: 'resetAllAfterEnd' },
        ],
    },]
}
