import request from "supertest";
import assert from "assert";
import app from "../app.js";

describe("user routes", function () {
  this.timeout(5000);

  describe("GET /api/users", function () {
    it("should fetch user list", function (done) {
      request(app)
        .get("/api/users")
        .end(async (err, res) => {
          assert(res.body.length >= 0);
          done();
        });
    });
  });

  describe("POST /api/users", function () {
    this.timeout(5000);
    it("should create user", function (done) {
      request(app)
        .post("/api/users")
        .send({ username: "test", password: "test" })
        .end((err, res) => {
          assert(res.status === 200);
          request(app)
            .get("/api/users")
            .end((err, res) => {
              assert(res.body.length > 0);
              done();
            });
        });
    });
    it("should not create user", function (done) {
      request(app)
        .post("/api/users")
        .send({ username: "test1", password: "test" })
        .end((err, res) => {
          assert(res.status === 200);
          request(app)
            .post("/api/users")
            .send({ username: "test1", password: "test" })
            .end((err, res) => {
              assert(res.status === 400);
              done();
            });
        });
    });
  });

  describe("POST /api/login", function () {
    this.timeout(5000);
    it("should login", function (done) {
      request(app)
        .post("/api/users")
        .send({ username: "test3", password: "test" })
        .end((err, res) => {
          request(app)
            .post("/api/login")
            .send({ username: "test3", password: "test" })
            .end((err, res) => {
              assert(res.body.token);
              assert(res.body.user);
              assert((res.body.user.username = "test3"));
              done();
            });
        });
    });
  });

  describe("PUT /api/users", function () {
    this.timeout(5000);
    it("should change password", function (done) {
      request(app)
        .post("/api/users")
        .send({ username: "test4", password: "test" })
        .end((err, res) => {
          request(app)
            .post("/api/login")
            .send({ username: "test4", password: "test" })
            .end((err, res) => {
              assert(res.body.token);
              request(app)
                .put("/api/users/"+res.body.user.id)
                .set("Authorization", "Bearer " + res.body.token)
                .send({ username: "test4", password: "testnew" })
                .end((err, res) => {
                  assert(res.status === 200);
                  request(app)
                    .post("/api/login")
                    .send({ username: "test4", password: "testnew" })
                    .end((err, res) => {
                      assert(res.body.token);
                      done();
                    });
                });
            });
        });
    });
  });

  describe("DELETE /api/users", function () {
    this.timeout(5000);
    it("should delete user", function (done) {
      request(app)
        .post("/api/users")
        .send({ username: "test5", password: "test" })
        .end((err, res) => {
          request(app)
            .post("/api/login")
            .send({ username: "test5", password: "test" })
            .end((err, res) => {
              assert(res.body.token);
              request(app)
                .delete("/api/users/"+res.body.user.id)
                .set("Authorization", "Bearer " + res.body.token)
                .send({ username: "test5", password: "test" })
                .end((err, res) => {
                  assert(res.status === 200);
                  request(app)
                    .post("/api/login")
                    .send({ username: "test5", password: "test" })
                    .end((err, res) => {
                      assert(res.status === 400);
                      done();
                    });
                });
            });
        });
    });
  });
});
