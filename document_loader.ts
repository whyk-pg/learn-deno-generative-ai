import { Document } from "@langchain/core/documents";
import { DOMParser, type HTMLDocument } from "deno_dom";

interface LoaderOptions {
  selector?: string;
}

export class DenoDOMWebBaseLoader {
  private url: string = "";
  private options: LoaderOptions = {};

  constructor(url: string, options?: LoaderOptions) {
    this.url = url;
    this.options = options || {};
  }
  async scrape(): Promise<HTMLDocument | null> {
    const response = await fetch(this.url, {
      headers: {
        "user-agent": "learn_deno_langchain",
        "accept": "text/html",
        "accept-charset": "utf-8",
      },
    });
    const html = await response.text();
    return new DOMParser().parseFromString(html, "text/html");
  }
  async load(): Promise<Document<{ source: string }>[]> {
    const html = await this.scrape();
    const text = this.options.selector
      ? html?.body.querySelector(this.options.selector)?.textContent!
      : html?.body.textContent!;
    const metadata = { source: this.url };
    return [new Document({ pageContent: text, metadata })];
  }
}
