import './stylesheets/style.css'




/** ANIMATION LOADER */
const loader = document.querySelector('.progress')
let offsetLoader = -100
let isAnimateLoader = true



const loaderTimeOut = () => {
      if (!isAnimateLoader) return;

      setTimeout(() => {
            offsetLoader ++;
            offsetLoader == 0 && (offsetLoader = -100)
            loader.style.marginLeft = offsetLoader + '%'
            loaderTimeOut()
      }, 30)
}



loaderTimeOut()



export const showStartButton = emitter => {
    const startButtons = document.querySelector('.startbuttons-wrapper')
    const progressWrapper = document.querySelector('.progress-wrapper')

    const hideStartScreen = e => {
        emitter.emit('setLanguage')(e.target.dataset.lang)
        document.querySelector('.start-screen').style.display = 'none'
        
    }

    isAnimateLoader = false
    startButtons.style.display = 'flex'
    startButtons.addEventListener('click', hideStartScreen)
    progressWrapper.style.display = 'none'
}

