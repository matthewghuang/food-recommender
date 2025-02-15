import * as webllm from "@mlc-ai/web-llm"

class WebLLM {
    constructor(engine: webllm.MLCEngine) {
        this.engine = engine
    }

    public static async init(model: string, initCallback: webllm.InitProgressCallback): Promise<WebLLM> {
        const engine = await webllm.CreateMLCEngine(model, { initProgressCallback: initCallback })
        return new WebLLM(engine)
    }

    engine: webllm.MLCEngine | undefined
}

export default WebLLM