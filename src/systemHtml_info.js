import { TRANSLATE_WORLDS } from './constants_replicies'



let currentLanguage = 'en'



export function createInfo (emitter) {
    const cont = document.createElement('div')
    cont.style.display = 'none'
    cont.classList.add('info-cont')

    const wrapper = document.createElement('div')
    wrapper.classList.add('info-wrap')
    cont.appendChild(wrapper)

    const mess = document.createElement('div')
    const createInnerMess = () => {
        mess.innerHTML = t('Previous part "Factory": ')
        mess.innerHTML += `<a href=\'http://js.otrisovano.ru${ t('/factory') }\' target="blanck">${ t('link') }</a></br>`
        mess.innerHTML += t('Author: ')
        mess.innerHTML += `<a href=\'http://otrisovano.ru\' target="blanck">${ t('link') }</a></br>`
        mess.innerHTML += t('Github: ')
        mess.innerHTML += `<a href=\'https://github.com/fire888/cyber-castle\' target="blanck">${ t('link') }</a></br>`
    }
    createInnerMess()
    wrapper.appendChild(mess)

    const closeButt = document.createElement('button')
    closeButt.classList.add('control')
    closeButt.innerText = 'x'
    closeButt.addEventListener('click', () => {
        cont.style.display = 'none'
    })
    wrapper.appendChild(closeButt)
    document.querySelector('#butt-info').addEventListener('click', () => {
        cont.style.display = 'flex'
    })
    emitter.subscribe('setLanguage')(keyLanguage => {
        currentLanguage = keyLanguage
        createInnerMess()
    })


    document.querySelector('.app-wrapper').appendChild(cont)
}



/** Translate. */
const t = val => (TRANSLATE_WORLDS[currentLanguage] && TRANSLATE_WORLDS[currentLanguage][val]) || val

