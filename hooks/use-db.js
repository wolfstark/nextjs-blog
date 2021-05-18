import { useState, useEffect } from "react";
import dotProp from "dot-prop";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

export default function useDB(db, cmd, opts) {
  const [res, setRes] = useState(null);
  useEffect(() => {
    // callDB(db, cmd, opts, setRes);
    if (!db) return;
    // queryAndRender(db, cmd, opts, setRes);
  });
  return res;
}

// const queryAndRender = (db, cmd, opts, setRes) => {
//   console.log("🚀  queryAndRender");
//   console.log(`Call db.${cmd}`);
//   // const DbCmd = dotProp.get(db, cmd).bind(db);
//   const DbCmd = db[cmd].bind(db);
//   const res = DbCmd(opts);
//   console.log(`Result db.${cmd}`, res);
//   setRes(res);
// };

const queryAndRender = throttle(
  (db, cmd, opts, setRes) => {
    console.log("🚀  queryAndRender");
    console.log(`Call db.${cmd}`);
    // const DbCmd = dotProp.get(db, cmd).bind(db);
    const DbCmd = db[cmd].bind(db);
    const res = DbCmd(opts);
    console.log(`Result db.${cmd}`, res);
    setRes(res);
  },
  3000,
  { leading: false }
);
