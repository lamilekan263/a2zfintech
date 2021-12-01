import { useMoralis } from "react-moralis";
import React, { useState } from "react";

import { getExplorer } from "../helpers/networks";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import Blockie from "./Blockie";
import { getEllipsisTxt } from "../helpers/formatters";
import Address from "./Address";

const Account = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated,authenticate, logout, account, chainId } = useMoralis();

  const closeModal = () => setIsModalOpen(false);

  const [ user, setUser ] = useState(null);

  const authenticateUser = async () => {
    const response = await authenticate({provider:"walletconnect", signingMessage: "Welcome to A2ZFin!" });

    console.log(response)
    setUser(response)
  }
  console.log(user)

  if (!isAuthenticated) {
    return (
      <Button onClick={authenticateUser}>
        Connect
      </Button>
     
    );
  }
  return (
    <>
      <Button
        className="shadow-lg bg-red-800"
        onClick={() => setIsModalOpen(true)}
      >
        <p style={{ marginRight: "5px" }}>{getEllipsisTxt(account, 6)}</p>
        <Blockie currentWallet scale={3} />
      </Button>

      <Button
        className="shadow-lg bg-red-800"
        onClick={() => logout()}
      >
        Log Out
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Log Out</ModalHeader>
        <ModalBody>
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <a
            href={`${getExplorer(chainId)}/address/${account}`}
            target="_blank"
            rel="noreferrer"
          >
           
            View on Explorer
          </a>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            layout="outline"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto bg-primary"
            onClick={() => {
              logout();
              closeModal();
            }}
          >
            {" "}
            Disconnect Wallet
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Account;
