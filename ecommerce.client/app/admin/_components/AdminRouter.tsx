import React, { ReactNode } from "react";
import Users from "./Users";
import Categories from "./Categories";
import Products from "./Products";

type Props = {
  component: string;
};

const AdminRouter = ({ component = "users" }: Props) => {
  if (component == "users") {
    return <Users />;
  } else if (component == "products") {
    return <Products />;
  } else if (component == "categories") {
    return <Categories />;
  } else if (component == "overview") {
    return <div className="">Overview</div>;
  } else {
    return <div className="">Overview</div>;
  }
};

export default AdminRouter;
