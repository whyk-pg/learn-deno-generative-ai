# Learn Deno Langchain

## 本リポジトリの目的
Denoでの生成AI活用を手習いし、実務や個人活動で活かすため

## 本リポジトリの達成目標
- [x] AnthropicのAPIを使って、Langchainを動作させる
- [ ] Quickstartを一通りやる
- [ ] 日本語から英語のslugを生成するAPIの作成

## 作業ログ
### Langchain
#### Cheerio使用時のエラー
実行時、以下のようなエラーが出る。node_modulesの有無は関係なし。

``` log
error: Uncaught (in promise) TypeError: load is not a function
    at Function._scrape (file:///home/windchime-yk/dev/org/whyk-pg/learn-deno-langchain/node_modules/.deno/langchain@0.1.36/node_modules/langchain/dist/document_loaders/web/cheerio.js:70:16)
    at eventLoopTick (ext:core/01_core.js:168:7)
    at async CheerioWebBaseLoader.load (file:///home/windchime-yk/dev/org/whyk-pg/learn-deno-langchain/node_modules/.deno/langchain@0.1.36/node_modules/langchain/dist/document_loaders/web/cheerio.js:87:19)
    at async file:///home/windchime-yk/dev/org/whyk-pg/learn-deno-langchain/main.ts:13:13
```
[内部の実装](https://github.com/langchain-ai/langchainjs/blob/0.1.36/langchain/src/document_loaders/web/cheerio.ts#L143)を見る限りだと、Cheerioを動的インポートしている。  
これはCheerioがCommonJS形式でエクスポートしているため、エラーになると思われる。

なお内部的には、以下のような実装になっているようなので、Fetch APIとDOMパーサがあれば、代用可能な認識

- [`langchain-core/src/utils/async_caller.ts`の`callable`](https://github.com/langchain-ai/langchainjs/blob/0.1.36/langchain-core/src/utils/async_caller.ts#L110)にFetch APIを渡す
- [`AsyncCaller.call`で指定したURLのHTMLを取得](https://github.com/langchain-ai/langchainjs/blob/0.1.36/langchain/src/document_loaders/web/cheerio.ts#L98)し、[Cheerioでパース](https://github.com/langchain-ai/langchainjs/blob/0.1.36/langchain/src/document_loaders/web/cheerio.ts#L104)
- [パース済みのテキストデータをメタデータと抱き合わせてDocumentインスタンスで返却](https://github.com/langchain-ai/langchainjs/blob/0.1.36/langchain/src/document_loaders/web/cheerio.ts#L131)

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
### Deno
- [npm: specifiers | Deno Docs](https://docs.deno.com/runtime/manual/node/npm_specifiers#--node-modules-dir-flag)
- [BYONM: Dynamically importing CommonJS file from an npm package errors · Issue #21149 · denoland/deno](https://github.com/denoland/deno/issues/21149)

### Langchain
- [Quickstart | 🦜️🔗 Langchain](https://js.langchain.com/docs/get_started/quickstart)
- [sindresorhus/p-queue: Promise queue with concurrency control](https://github.com/sindresorhus/p-queue)
- [sindresorhus/p-retry: Retry a promise-returning or async function](https://github.com/sindresorhus/p-retry)

### OpenAI
- [ChatGPT-API Error Code 429の解決方法 #ChatGPT - Qiita](https://qiita.com/Keichan_15/items/b1aac09f77c6f8580113)
- [Error Code 429 - You exceeded your current quota, please check your plan and billing details. | OpenAI Help Center](https://help.openai.com/en/articles/6891831-error-code-429-you-exceeded-your-current-quota-please-check-your-plan-and-billing-details)
- [Are OpenAI credits expiring? - API - OpenAI Developer Forum](https://community.openai.com/t/are-openai-credits-expiring/511215)
- [Why did my credit expire? - API - OpenAI Developer Forum](https://community.openai.com/t/why-did-my-credit-expire/118776/19)
