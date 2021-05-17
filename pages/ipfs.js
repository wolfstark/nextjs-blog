import React from "react";
import useIpfsFactory from "../hooks/use-ipfs-factory.js";
import useDbFactory from "../hooks/use-db-factory.js";
import useIpfs from "../hooks/use-ipfs.js";
// import logo from "./ipfs-logo.svg";

const IPFS = () => {
  const { ipfs, ipfsInitError } = useIpfsFactory();
  const { db } = useDbFactory(ipfs);
  const id = useIpfs(ipfs, "id");
  return (
    <div className="sans-serif">
      <header className="flex items-center pa3 bg-navy bb bw3 b--aqua">
        <h1 className="flex-auto ma0 tr f3 fw2 montserrat aqua">IPFS React</h1>
      </header>
      <main>
        {ipfsInitError && (
          <div className="bg-yellow pa4 mw7 center mv4 white">
            Error: {ipfsInitError.message || ipfsInitError}
          </div>
        )}
        {id && <IpfsId {...id} />}
      </main>
    </div>
  );
};

const Title = ({ children }) => {
  return <h2 className="f5 ma0 pb2 tracked aqua fw4 montserrat">{children}</h2>;
};

const IpfsId = (props) => {
  if (!props) return null;
  return (
    <section className="bg-snow mw7 center mt5">
      <h1 className="f3 fw4 ma0 pv3 aqua montserrat tc" data-test="title">
        Connected to IPFS
      </h1>
      <div className="pa4">
        {["id", "agentVersion"].map((key) => (
          <div className="mb4" key={key}>
            <Title>{key}</Title>
            <div
              className="bg-white pa2 br2 truncate monospace"
              data-test={key}
            >
              {props[key]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IPFS;
