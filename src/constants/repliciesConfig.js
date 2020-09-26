

export const REPLICIES_CONFIG_RU = {
    'TERMINAL_Z': [{
        q: { txt: 'Кроваво-черное ничто пустилось вить систему клеток,' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'связанных внутри, клеток, связанных внутри, клеток в едином стебле и явственно,' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'до жути на фоне тьмы ввысь белым бил фонтан.' },
        a: [
            { txt: '', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_Z', idChangerState: 'openPhrasePROGRAM_00'} },
        ],
    },],
    'TERMINAL_00': [{
        q: { txt: 'Офицер Кей Ди 6.3.7. приступим. Готовы?' },
        a: [
            { txt: 'Готов',  isShow: true, action: 'next', },
            { txt: 'Не готов.', isShow: true, action: 'close',  },
        ],
    }, {
        q: { txt: 'Ваша контрольная фраза.' },
        a: [
            { txt: 'Я забыл.', isShow: true, action: 'close', },
            { txt: 'Я зайду попозже.',
                    isShow: true, action: 'close', },
            { txt: 'Кроваво-черное ничто пустилось вить систему клеток.', isShow: false, action: 'next', },
        ],
    }, {
        q: { txt: 'Клетки.' },
        a: [
            { txt: 'Клетки.', isShow: true, action: 'startBridge',  dataAction: { keyProgramBridge: 'PROGRAM_00', } },
        ],
    },],
    'TERMINAL_01': [{
        q: { txt: 'Доводилось ли вам бывать в тюрьме? Клетки.' },
        a: [
            { txt: 'Клетки.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Вас держат в клетке? Клетки.' },
        a: [
            { txt: 'Клетки.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_01', } },
        ],
    },],
    'TERMINAL_02': [{
        q: { txt: 'Когда вы не исполняете обязанности, вас держат в коробке? Клетки.' },
        a: [
            { txt: 'Клетки.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_02', } },
        ],
    },],
    'TERMINAL_03': [{
        q: { txt: 'Что вы чувствуете держа за руку того кого любите? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Вас учили приставлять палец к пальцу? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_03', }},
        ],
    },],
    'TERMINAL_04': [{
        q: { txt: 'Вы жаждете связать с кем-нибудь сердце? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Вам снится связь с кем-либо? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'startBridge',  dataAction: { keyProgramBridge: 'PROGRAM_04', } },
        ],
    },],
    'TERMINAL_05': [{
        q: { txt: 'Что вы чувствуете, держа в руках своего ребенка? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Вы чувствуете, что вам чего-то не хватает? Связаны.' },
        a: [
            { txt: 'Связаны.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_05', } },
        ],
    },],
    'TERMINAL_06': [{
        q: { txt: 'Клеток связанных внутри.' },
        a: [
            { txt: 'Клеток связанных внутри.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Повторите три раза "клеток связанных внутри' },
        a: [
            { txt: 'Клеток связанных внутри.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: '' },
        a: [
            { txt: 'Клеток связанных внутри.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: '' },
        a: [
            { txt: 'Клеток связанных внутри.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_06', } },
        ],
    },],
    'TERMINAL_LAST' : [{
        q: { txt: 'На этом все. Кей стабилен, можете пройти за бонусом.' },
        a: [
            { txt: 'Спасибо, сэр.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_LAST', idChangerState: 'resetAllAfterEnd' }},
        ],
    },]
}




export const REPLICIES_CONFIG_EN = {
    'TERMINAL_Z': [{
        q: { txt: 'And blood-black nothingness began to spin...' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'A system of cells interlinked within cells interlinked within cells interlinked within one stem...' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'And dreadfully distinct against the dark, a tall white fountain played.' },
        a: [
            { txt: '', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_Z', idChangerState: 'openPhrasePROGRAM_00'} },
        ],
    },],
    'TERMINAL_00': [{
        q: { txt: 'Officer K-D-six-dash-three-dot-seven, let\'s begin. Ready?' },
        a: [
            { txt: 'Yes, sir.',  isShow: true, action: 'next', },
            { txt: 'No.', isShow: true, action: 'close',  },
        ],
    }, {
        q: { txt: 'Recite your baseline.' },
        a: [
            { txt: 'I do not remember.', isShow: true, action: 'close', },
            { txt: 'I\'ll come back later.',
                    isShow: true, action: 'close', },
            { txt: 'And blood-black nothingness began to spin...', isShow: false, action: 'next', },
        ],
    }, {
        q: { txt: 'Cells.' },
        a: [
            { txt: 'Cells.', isShow: true, action: 'startBridge',  dataAction: { keyProgramBridge: 'PROGRAM_00', } },
        ],
    },],
    'TERMINAL_01': [{
        q: { txt: 'Have you ever been in an institution? Cells.' },
        a: [
            { txt: 'Cells.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: ' Do they keep you in a cell? Cells.' },
        a: [
            { txt: 'Cells.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_01', } },
        ],
    },],
    'TERMINAL_02': [{
        q: { txt: 'When you\'re not performing your duties do they keep you in a little box? Cells.' },
        a: [
            { txt: 'Cells.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_02', } },
        ],
    },],
    'TERMINAL_03': [{
        q: { txt: 'What\'s it like to hold the hand of someone you love? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Did they teach you how to feel finger to finger? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_03', }},
        ],
    },],
    'TERMINAL_04': [{
        q: { txt: 'Do you long for having your heart interlinked? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Do you dream about being interlinked? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'startBridge',  dataAction: { keyProgramBridge: 'PROGRAM_04', } },
        ],
    },],
    'TERMINAL_05': [{
        q: { txt: 'What\'s it like to hold your child in your arms? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Do you feel that there\'s a part of you that\'s missing? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_05', } },
        ],
    },],
    'TERMINAL_06': [{
        q: { txt: 'Within cells interlinked.' },
        a: [
            { txt: 'Within cells interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Why don\'t you say that three times: Within cells interlinked.' },
        a: [
            { txt: 'Within cells interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: '' },
        a: [
            { txt: 'Within cells interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: '' },
        a: [
            { txt: 'Within cells interlinked.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_06', } },
        ],
    },],
    'TERMINAL_LAST' : [{
        q: { txt: 'We\'re done... Constant K, you can pick up your bonus.' },
        a: [
            { txt: 'Thank you, sir.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_LAST', idChangerState: 'resetAllAfterEnd' }},
        ],
    },]
}



export const TRANSLATE_WORLDS = {
    'ru': {
        'open': 'пуск',
        'close': 'закрыть',
        'Previous part "Factory": ': 'Предыдущая часть "Фабрика": ',
        'Author: ': 'Автор: ',
        'link': 'ссылка',
        '/factory': '/ru/factory/'
    }
}

