(async () => {
    await import(chrome.runtime.getURL('lib/deepseek.js'))
    chrome.runtime.onMessage.addListener(query => deepseek.send(query))
})()
