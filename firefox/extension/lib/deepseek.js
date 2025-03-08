window.deepseek = {
    selectors: { btns: { send: 'div[role=button]:has([d^="M7 16c-.595 0-1.077-"])' }, chatbox: '#chat-input' },

    getChatbox() { return document.querySelector(this.selectors.chatbox) },
    getSendButton() { return document.querySelector(this.selectors.btns.send) },

    async send(msg) {
        if (typeof arguments[0] != 'string') return console.error(`Argument 'msg' must be a string!`)
        const textArea = this.getChatbox() ; if (!textArea) return console.error('Chatbox not found!')
        textArea.setRangeText(msg) ; textArea.dispatchEvent(new Event('input', { bubbles: true }))
        new Promise(resolve => { // wait for Send button to enable
            const sendBtnSelector = this.selectors.btns.send + '[aria-disabled=false]',
                  sendBtn = document.querySelector(sendBtnSelector)
            if (sendBtn) resolve(sendBtn)
            else new MutationObserver((_, obs) => {
                const sendBtn = document.querySelector(sendBtnSelector)
                if (sendBtn) { obs.disconnect() ; resolve(sendBtn) }
            }).observe(this.getChatbox(), { childList: true, subtree: true })
        }).then(btn => btn.click())
    }
}
