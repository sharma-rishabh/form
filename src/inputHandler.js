class InputHandler {
  constructor() {
    this.input = [];
  }

  addChunk(chunk) {
    this.input.push(chunk);
  }

  getAllInput() {
    return this.input;
  }

  processChunk(chunkProcessor, chunk, ...args) {
    return chunkProcessor.apply(null, [chunk, ...args]);
  }
}

exports.InputHandler = InputHandler;
