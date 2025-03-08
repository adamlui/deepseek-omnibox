window.dom = {
    get: {
        loadedElem(selector, { timeout = null } = {}) {
            const raceEntries = [
                new Promise(resolve => { // when elem loads
                    const elem = document.querySelector(selector)
                    if (elem) resolve(elem)
                    else new MutationObserver((_, obs) => {
                        const elem = document.querySelector(selector)
                        if (elem) { obs.disconnect() ; resolve(elem) }
                    }).observe(document.documentElement, { childList: true, subtree: true })
                })
            ]
            if (timeout) raceEntries.push(new Promise(resolve => setTimeout(() => resolve(null), timeout)))
            return Promise.race(raceEntries)
        }
    }
}
