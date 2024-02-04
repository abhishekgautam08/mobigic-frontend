import { removeFile } from "@/api/file";
import { useRouter } from "next/router";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const RemoveComponent = ({ showRemove, setShowRemove, removeFileData }) => {
  const router = useRouter();

  const onClickRemove = async () => {
    try {
      const result = await removeFile(removeFileData);
      if (!result) {
        toast("Something Went Wrong, Please Try Again", { type: "error" });
        return;
      }
      toast("File Remove Successfully ", {
        type: "success",
      });
      setShowRemove(false);

      router.reload();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <>
      <Modal show={showRemove} onHide={() => setShowRemove(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove File</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this file?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemove(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onClickRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveComponent;
