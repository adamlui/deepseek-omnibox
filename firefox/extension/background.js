const deepseekChatURL = 'https://chat.deepseek.com'

// Launch DeepSeek Chat on toolbar icon click
chrome.action.onClicked.addListener(() => chrome.tabs.create({ url: deepseekChatURL }))

// Query DeepSeek on omnibox query submitted
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (changeInfo.status == 'complete' && tab.url.startsWith(deepseekChatURL)) {
        const query = new URL(tab.url).searchParams.get('q')
        if (query) chrome.tabs.sendMessage(tabId, query)
    }
})
