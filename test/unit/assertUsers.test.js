import Assert from "assert";
import mongoose from "mongoose";
import { config } from "../../src/config.js";
import Users from "../../src/dao/Users.dao.js";

const assert = Assert.strict;

describe("Probando User DAO", () => {
  let mockUser = {
    first_name: "Coder",
    last_name: "House",
    email: "prueba@correo.com",
    password: "123",
  };

  before(function () {
    mongoose.connect(config.dbUrl);
    this.usersDao = new Users();
  });

  beforeEach(function () {
    mongoose.connection.collections.users.drop();
  });

  it("El Dao debe retornar los usuarios en un array", async function () {
    const result = await this.usersDao.get();
    assert.strictEqual(Array.isArray(result), true);
  });

  it("El Dao debe agregar un usuario correctamente a la base de datos", async function () {
    const result = await this.usersDao.save(mockUser);
    assert.ok(result._id);
  });

  it("El Dao debe agregar al documento insertado un arreglo de mascotas vacio por defecto", async function () {
    const result = await this.usersDao.save(mockUser);
    assert.deepStrictEqual(result.pets, []);
  });

  it("El Dao puede obtener un usuario por email", async function () {
    const result = await this.usersDao.save(mockUser);

    const user = await this.usersDao.getBy({ email: result.email });
    assert.strictEqual(typeof user, "object");
  });
});
