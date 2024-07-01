import { Db, InsertOneResult, ObjectId } from "mongodb";
import { client } from "../database/config";
import { User } from "../models/User";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-admin/auth";
import { Association } from "../models/Association";
import { RegistrationBag } from "../models/RegistrationBag";
import { handleError } from "./error.api";
const mm = "association.api";
const dbName = "kasie_transie";
export async function getCountries(): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    // await client.db('admin').command({ ping: 1 });
    const db: Db = client.db(dbName);
    result = await db.collection("Country").find().toArray();
    console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} countries 🥬 🥬 `);
    return result;
  } catch (e) {
    console.log(e);
    handleError(`getCountries: ${e}`, {});
    throw new Error(`getCountries: ${e}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}
export async function getAssociations(): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("Association").find().toArray();
    console.log(
      `${mm} 🍎🍎🍎 getAssociations found: 🥬 ${result.length} associations 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
     handleError(`getAssociations: ${e}`, {});
     throw new Error(`getAssociations: ${e}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}

export async function createSettings(settings: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("SettingsModel").insertOne(settings);
    console.log(
      `${mm} 🍎🍎🍎 createSettings done: 🥬 ${result.insertedId}  🥬🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
     handleError(`createSettings: ${e}`, {});
     throw new Error(`createSettings: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createAssociation(
  association: Association
): Promise<RegistrationBag> {
  console.log(
    `\n\n${mm} 🍎🍎🍎 createAssociation ............`
  );
  let result: InsertOneResult;
  let bag = <RegistrationBag>{};
  try {
    const user: User = {
      _partitionKey: association.associationId,
      _id: new ObjectId(),
      userType: "ADMIN",
      userId: "",
      firstName: association.adminUserFirstName,
      lastName: association.adminUserLastName,
      gender: "",
      countryId: "",
      associationId: association.associationId,
      associationName: "",
      fcmToken: "",
      email: association.adminEmail,
      cellphone: "",
      password: association.adminPassword,
      countryName: "",
      dateRegistered: new Date().toISOString(),
      qrCodeUrl: "",
      profileUrl: "",
      profileThumbnail: "",
    };
    await createAssociationUser(user);
    association.adminPassword = "";
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("Association").insertOne(association);
    console.log(
      `${mm} 🍎🍎🍎 createAssociation done: 🥬 ${result.insertedId}  🥬🥬 `
    );

    bag.association = association;
    bag.user = user;
    return bag;
  } catch (e) {
    console.error(e);
    handleError(`createAssociation: ${e}`, {});
    throw new Error(`createAssociation: ${e}`);
  } finally {
    await client.close();
  }
  return bag;
}
export async function createAssociationUser(user: User): Promise<User> {
  console.log(`\n\n${mm} 🍎🍎🍎 createAssociationUser ............`);
  const mUser = <User>{};
  try {
    const me: UserRecord = await admin.auth().createUser({
      email: user.email,
      password: user.password,
      displayName: `${user.firstName} ${user.lastName}`,
    });
    console.log(`${mm} Created Firebase user: 🍎 ${JSON.stringify(me)}`);

    mUser.associationId = user.associationId;
    mUser.firstName = user.firstName;
    mUser.lastName = user.lastName;
    mUser.email = user.email;
    mUser.userId = me.uid;
    mUser.userType = user.userType;

    console.log(`${mm} write user to database`);
    await client.connect();
    const db: Db = client.db(dbName);
    const result = await db.collection("User").insertOne(mUser);
    console.log(
      `${mm} 🍎🍎🍎 createAssociationUser done: 🥬 ${result.insertedId}  🥬🥬 `
    );
  } catch (e) {
    console.error(e);
    handleError(`createAssociationUser: ${e}`, {});
    throw new Error(`createAssociationUser: ${e}`);
  } finally {
    await client.close();
  }
  return mUser;
}
export async function getAssociationCars(
  associationId: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("Vehicle")
      .find({ associationId: associationId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 getAssociationCars found: 🥬 ${result.length} cars 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`getAssociationCars: ${e}`, {});
    throw new Error(`getAssociationCars: ${e}`);
  } finally {
    await client.close();
  }
  return result;
}
export async function getAssociationUsers(
  associationId: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("User")
      .find({ associationId: associationId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 getAssociationUsers found: 🥬 ${result.length} users 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`getAssociationUsers: ${e}`, {});
    throw new Error(`getAssociationUsers: ${e}`);
  } finally {
    await client.close();
  }
  return result;
}
