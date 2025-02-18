const deepseek = {
    selectors: {
        btns: {
            newChat: 'div:has(> div > svg path[d^="M9.10999"])',
            send: 'div[role=button]:has([d^="M7 16c-.595 0-1.077-"])'
        },
        chatbox: 'chat-input'
    },

    getChatbox() { return document.getElementById(this.selectors.chatbox) },
    getNewChatButton() { return document.querySelector(this.selectors.btns.newChat) },
    getSendButton() { return document.querySelector(this.selectors.btns.send) },

    send(msg) {
        if (typeof arguments[0] != 'string') return console.error(`Argument 'msg' must be a string!`)
        const textArea = this.getChatbox() ; if (!textArea) return console.error('Chatbox not found!')
        textArea.setRangeText(msg) ; textArea.dispatchEvent(new Event('input', { bubbles: true }))
        this.getSendButton()?.click()
    },

    sendInNewChat(msg) {
        if (typeof msg != 'string') return console.error('Message must be a string!')
        try { this.getNewChatButton().click() } catch (err) { return console.error(err.message) }
        setTimeout(() => this.send(msg), 500)
    },

    startNewChat() { try { this.getNewChatButton().click() } catch (err) { console.error(err.message) }}
}

// Export deepseek object
try { window.deepseek = deepseek } catch (err) {} // for Greasemonkey
try { module.exports = deepseek } catch (err) {} // for CommonJS
