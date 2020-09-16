import { ALERT } from "./queries";

export const resolvers = {
  User: {
    age(data: any, args: any, context: any, info: any) {
      return 35;
    },
  },
  Query: {
    alert(data: any, args: any, context: any, info: any) {
      //console.log("context", context);
      return { isShow: false, message: "No message" };
    },
  },
  Mutation: {
    showAlert(
      data: any,
      { message }: { message: string },
      { client }: { client: any },
      info: any
    ) {
      console.log("showAlert");
      client.writeQuery({
        query: ALERT,
        data: { alert: { isShow: true, message: message } },
      });
      return null;
    },
    hideAlert(data: any, arg: any, { client }: { client: any }, info: any) {
      client.writeQuery({
        query: ALERT,
        data: { alert: { isShow: false, message: "No message" } },
      });
      return null;
    },
  },
};
