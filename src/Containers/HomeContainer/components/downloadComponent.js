import { downloadFile } from '@/api/file';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DownloadComponent = ({
  showDownload,
  setShowDownload,
  downloadFileData,
}) => {
      const router = useRouter();

      const [code, setCode] = useState("");

const handleSubmit = async()=>{

 try {
    const fileDetails = {
      code,
      downloadFileData,
    };
   const result = await downloadFile(fileDetails);
  
   if (!result) {
     toast("Something Went Wrong, Please Try Again", { type: "error" });
     return;
   }
   toast("File Download Successfully ", {
     type: "success",
   });
   setShowDownload(false);

    window.open(result.url, "_blank", );

//    router.reload();
 } catch (error) {
   console.error({ error });
 }
}


  return (
    <>
      <Modal show={showDownload} onHide={() => setShowDownload(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter 6-Digit Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                
              />
            </Form.Group>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <Button styvariant="dark" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DownloadComponent