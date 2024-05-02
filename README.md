# Learn Deno Langchain

## 本リポジトリの目的
Denoでの生成AI活用を手習いし、実務や個人活動で活かすため

## 本リポジトリの達成目標
- [x] AnthropicのAPIを使って、Langchainを動作させる
- [ ] Quickstartを一通りやる
- [ ] 日本語から英語のslugを生成するAPIの作成

## 作業ログ
### OpenAI
429エラーが発生し、動作しなかった。  
調べたところアカウント作成時期からして無料期間が終了していたため、OpenAIでの確認は保留する。  
なお現在のダッシュボード画面から有効期限は確認できないが、これはダッシュボード画面のリニューアルに伴って表示されなくなったため。

``` log
error: Uncaught (in promise) InsufficientQuotaError: 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.
    at Object.defaultFailedAttemptHandler [as onFailedAttempt] (file:///home/windchime-yk/.cache/deno/npm/registry.npmjs.org/@langchain/core/0.1.61/dist/utils/async_caller.js:33:21)
    at RetryOperation._fn (file:///home/windchime-yk/.cache/deno/npm/registry.npmjs.org/p-retry/4.6.2/index.js:67:20)
    at eventLoopTick (ext:core/01_core.js:168:7)
```

## 参考資料
### Langchain全般
- [Quickstart | 🦜️🔗 Langchain](https://js.langchain.com/docs/get_started/quickstart)

### OpenAI
- [ChatGPT-API Error Code 429の解決方法 #ChatGPT - Qiita](https://qiita.com/Keichan_15/items/b1aac09f77c6f8580113)
- [Error Code 429 - You exceeded your current quota, please check your plan and billing details. | OpenAI Help Center](https://help.openai.com/en/articles/6891831-error-code-429-you-exceeded-your-current-quota-please-check-your-plan-and-billing-details)
- [Are OpenAI credits expiring? - API - OpenAI Developer Forum](https://community.openai.com/t/are-openai-credits-expiring/511215)
- [Why did my credit expire? - API - OpenAI Developer Forum](https://community.openai.com/t/why-did-my-credit-expire/118776/19)
