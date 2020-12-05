import request from "supertest";
import assert from "assert";
import app from "../app.js";

describe("stock routes", function () {
  var user;
  var token;
  var route;

  describe("user for stocks", function () {
    it("should create user for stocks", function (done) {
      request(app)
        .post("/api/users")
        .send({ username: "testuser", password: "test" })
        .end((err, res) => {
          request(app)
            .post("/api/login")
            .send({ username: "testuser", password: "test" })
            .end((err, res) => {
              user = res.body.user;
              token = res.body.token;
              route = "/api/users/" + user.id + "/stocks";
              done();
            });
        });
    });
  });

  describe("POST /api/users/:id/stocks", function () {
    this.timeout(5000);
    it("should create stock for user", function (done) {
      request(app)
        .post(route)
        .set("Authorization", "Bearer " + token)
        .send({ ticker: "TSLA" })
        .end((err, res) => {
          assert(res.status === 200);
          done();
        });
    });
  });

  describe("GET /api/users/:id/stocks", function () {
    it("should fetch user stock list", function (done) {
      request(app)
        .get(route)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.body.length > 0);
          done();
        });
    });
  });

  describe("GET /api/users/:id/stocks/:ticker", function () {
    this.timeout(20000);
    it("should fetch user stock", function (done) {
      request(app)
        .post(route)
        .set("Authorization", "Bearer " + token)
        .send({ ticker: "IBM" })
        .end((err, res) => {
          assert(res.status === 200);
          request(app)
            .get(route + "/IBM")
            .set("Authorization", "Bearer " + token)
            .end(async (err, res) => {
              assert(
                res.body &&
                  res.body.data &&
                  res.body.data["Meta Data"]["2. Symbol"] === "IBM"
              );
              done();
            });
        });
    });
  });

  describe("PUT /api/users/:id/stocks/:ticker", function () {
    this.timeout(20000);
    it("should change stock ticker for user", function (done) {
      request(app)
        .put(route + "/TSLA")
        .set("Authorization", "Bearer " + token)
        .send({ ticker: "GOOGL" })
        .end((err, res) => {
          assert(res.status === 200);
          request(app)
            .get(route + "/GOOGL")
            .set("Authorization", "Bearer " + token)
            .end(async (err, res) => {
              assert(
                res.body &&
                  res.body.data &&
                  res.body.data["Meta Data"]["2. Symbol"] === "GOOGL"
              );
              done();
            });
        });
    });
  });

  describe("DELETE /api/users/:id/stocks/:ticker", function () {
    this.timeout(5000);
    it("should delete user stock", function (done) {
      request(app)
        .delete(route + "/IBM")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status === 200);
          done();
        });
    });
  });
});
