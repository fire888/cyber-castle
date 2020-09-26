const MAX_W = 500
const MIN_W = 350

export function createDeviceResizer () {
    const appWrapper = document.querySelector('.app-wrapper')
    const fullScreenButton = document.querySelector('#butt-fullscreen')

    /** fullscreen */
    const openAppFullScreenIfMobile = () => {    
        if (document.fullscreenElement) { return; }
    
        if (appWrapper.requestFullscreen) {
            appWrapper.requestFullscreen()
        } else if (appWrapper.mozRequestFullScreen) { 
            tappWrapper.mozRequestFullScreen()
        } else if (appWrapper.webkitRequestFullscreen) { 
            appWrapper.webkitRequestFullscreen()
        } else if (appWrapper.msRequestFullscreen) { 
            appWrapper.msRequestFullscreen()
        }
    }
    fullScreenButton.addEventListener('click', openAppFullScreenIfMobile)

    /** resize */
    const resize = e => {
        appWrapper.style.width = window.innerWidth + 'px'
        appWrapper.style.height = window.innerHeight + 'px'
        appWrapper.style.fontSize = Math.max(Math.min(Math.min(window.innerWidth, window.innerHeight), MAX_W), MIN_W) / 50 + 'px'

        fullScreenButton.style.display = document.fullscreenElement ? "none" : "flex"
    }
    window.addEventListener('resize', resize)
    resize()


    //let mode = "desktop"
    //if (checkTouch() && checkIsCanOrientation()) {
    //    mode = "phone"
    //}
}



const checkTouch = () => 
    navigator.maxTouchPoints || 'ontouchstart' in document.documentElement


const checkIsCanOrientation = () => 
    typeof window.orientation !== 'undefined'