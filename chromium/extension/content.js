(async () => {
    for (const resource of ['lib/deepseek.js', 'lib/dom.js']) await import(chrome.runtime.getURL(resource))
    chrome.runtime.onMessage.addListener(
        query => dom.get.loadedElem(deepseek.selectors.chatbox).then(() => deepseek.send(query)))
})()
