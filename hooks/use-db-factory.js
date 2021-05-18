import { useCallback, useEffect, useMemo, useState } from "react";
import OrbitDB from "orbit-db";
import throttle from "lodash/throttle";

let db = null;

export default function useDbFactory(ipfs) {
  const [isDbReady, setIsDbReady] = useState(Boolean(db));
  const [dbInitError, setDbInitError] = useState(null);

  // const [, updateState] = useState();
  // const forceUpdate = useMemo(() => {
  //   return throttle(() => updateState({}), 3000, { leading: false });
  // }, []);
  // const forceUpdate = useMemo(() => {
  //   return throttle(() => updateState({}), 3000, { leading: false });
  // }, []);
  useEffect(() => {
    async function startDB() {
      if (db) {
        console.log("DB already started");
      } else {
        try {
          console.time("DB Started");

          const orbitdb = await OrbitDB.createInstance(ipfs);

          db = await orbitdb.open("wenxi.board", {
            // If database doesn't exist, create it
            create: true,
            overwrite: true,
            // Load only the local version of the database,
            // don't load the latest from the network yet
            localOnly: false,
            type: "docstore",
            // If "Public" flag is set, allow anyone to write to the database,
            // otherwise only the creator of the database can write
            accessController: {
              write: ["*"],
            },
          });
          // db.events.on("ready", forceUpdate);
          // // When database gets replicated with a peer, display results
          // db.events.on("replicated", forceUpdate);
          // // When we update the database, display result
          // db.events.on("write", forceUpdate);
          // // db.events.on("replicate.progress", forceUpdate);
          await db.load();
          console.timeEnd("DB Started");
        } catch (error) {
          console.error("DB init error:", error);
          db = null;
          setDbInitError(error);
        }
      }
      setIsDbReady(Boolean(db));
    }
    ipfs && startDB();
    return function cleanup() {
      if (db) {
        db.close();
        setIsDbReady(false);
      }
    };
  }, [ipfs]);
  return { db, isDbReady, dbInitError };
}
