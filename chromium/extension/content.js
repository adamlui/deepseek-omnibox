(async () => {
    await import(chrome.runtime.getURL('lib/deepseek.js'))
    chrome.runtime.onMessage.addListener(message => deepseek.send(message.query))
})()
