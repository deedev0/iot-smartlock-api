class TestHandler {
  constructor() {
    this.getTest = this.getTest.bind(this);
  }

  async getTest() {
    return {
      status: 'success',
      data: "test berhasil"
    };
  }
}

module.exports = TestHandler;
