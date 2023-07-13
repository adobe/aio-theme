// Create a parent component that wraps child components with a Provider

import { useState, React } from "react";
import Context from "../Context";
import {Table} from "./index";
const TableContent = () => {
  const [isTable, setIsTable] = useState(true);

  return (
    <div>
      <Context.TableProvider value={{ isTable, setIsTable }}>
        <Table/>
      </Context.TableProvider>
    </div>
  );
}

export default TableContent;