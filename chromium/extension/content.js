(async () => {
    for (const resource of ['lib/deepseek.js', 'lib/dom.js']) await import(chrome.runtime.getURL(resource))
    console.log('JS resources loaded')
    chrome.runtime.onMessage.addListener(query =>
        dom.get.loadedElem(deepseek.selectors.chatbox)
            .then(() => { console.log('chatbox loaded') ; deepseek.send(query) })
    )
})()
