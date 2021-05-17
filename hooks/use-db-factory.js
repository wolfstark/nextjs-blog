import { useEffect, useState } from "react";
import OrbitDB from "orbit-db";

let db = null;

export default function useDbFactory(ipfs) {
  const [isDbReady, setIsDbReady] = useState(Boolean(db));
  const [dbInitError, setDbInitError] = useState(null);

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
