import conf from "../config/config.js";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

// console.log(conf.appwriteURL);
export class Service {
  client = new Client();
  tables;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // Your API Endpoint
      .setProject(conf.appwriteProjectId);
    this.tables = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tables.createRow({
         databaseId: conf.appwriteDatabaseId,
  tableId: conf.appwriteTableId,
  rowId: slug,
       data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      })
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tables.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });

    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
     await this.tables.deleteRow({
       databaseId: conf.appwriteDatabaseId,
       tableId: conf.appwriteTableId,
       rowId: slug,
     });
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
     return await this.tables.getRow({
       databaseId: conf.appwriteDatabaseId,
       tableId: conf.appwriteTableId,
       rowId: slug,
     });

    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }
  //  [Query.equal("status", "active")]
  async getPosts(queries = []) {
    try {
     return await this.tables.listRows({
       databaseId: conf.appwriteDatabaseId,
       tableId: conf.appwriteTableId,
       queries,
     });

    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
