export default {
  jsonStringify: (obj: any) => {
    try {
      return JSON.stringify(obj);
    } catch (error) {
      console.log("jsonStringify error", obj);
    }
  },
  jsonParse: (string: string) => {
    try {
      return JSON.parse(string);
    } catch (error) {
      console.log("jsonParse error", string);
    }
  },
};
