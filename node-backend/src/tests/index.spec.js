import request from "supertest";
import assert from "assert";
import app from "../app.js";

describe("GET /", () => {
  it("should run a server", function (done) {
    request(app)
      .get("/")
      .end(function (err, res) {
        assert(res.statusCode === 200);
        done();
      });
  });
});
