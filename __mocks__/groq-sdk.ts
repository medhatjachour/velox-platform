// Export a Jest mockable constructor function so tests can override behavior using mockImplementation
const Groq = jest.fn(() => ({
  chat: {
    completions: {
      async create(opts: any) {
        const userMessage = opts?.messages?.[0]?.content || ''
        const content = `MOCKED_RESPONSE: ${userMessage}`
        return {
          choices: [
            {
              message: { content },
              finish_reason: 'stop',
            },
          ],
          usage: { total_tokens: 5 },
        }
      },
    },
  },
}))

export default Groq
