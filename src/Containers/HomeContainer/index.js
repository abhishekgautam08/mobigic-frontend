import { fileUpload, getAllFiles } from "@/api/file";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Table } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import RemoveComponent from "./components/removeComponents";
import DownloadComponent from "./components/downloadComponent";
import SpinnerComponent from "@/Components/Spinner/Spinner";
import { useRouter } from "next/router";

const HomeContainer = () => {
  const router = useRouter();
  const [file, setFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [data, setData] = useState([]);
  const [showRemove, setShowRemove] = useState(false);
  const [removeFileData, setRemoveFileData] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [downloadFileData, setDownloadFileData] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // Check if there is exactly one file
    if (acceptedFiles.length === 1) {
      const selectedFile = acceptedFiles[0];

      // Validate file type using MIME type
      if (selectedFile.type === "application/pdf") {
        // Validate file extension
        const validExtensions = [".pdf"];
        const fileExtension = selectedFile.name
          .slice(selectedFile.name.lastIndexOf("."))
          .toLowerCase();

        if (validExtensions.includes(fileExtension)) {
          // Check if the file size is less than or equal to 3MB
          if (selectedFile.size <= 3 * 1024 * 1024) {
            setFile(selectedFile);
            setSelectedFileName(selectedFile.name);
          } else {
            alert("File size exceeds 3MB limit.");
          }
        } else {
          alert("Invalid file extension. Please upload a PDF file.");
        }
      } else {
        alert("Invalid file type. Please upload a PDF file.");
      }
    } else {
      alert(
        "Please upload only a single file. or File size exceeds 3MB limit."
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },

    maxSize: 3 * 1024 * 1024,
    maxFiles: 1,
  });

  const upload = async (e) => {
    e.preventDefault();
    const result = await fileUpload(file);
    if (!result) {
      toast("Something Went Wrong, Please Try Again", { type: "error" });
      return;
    }
    toast("File upload succefully");

    if (result) {
      setOtp(result.otp);
      setShowOtp(true);
    }
  };

  useEffect(() => {
    (async () => {
      const filesData = await getAllFiles();

      if (filesData) {
        setData(filesData.totalRecords);
      }
    })();
  }, []);

  const handleRemoveFile = async (file) => {
    setShowRemove(true);
    setRemoveFileData(file._id);
  };

  const handleDownloadFile = async (file) => {
    setShowDownload(true);
    setDownloadFileData(file);
  };
  const handleOtpModel = () => {
    setShowOtp(false);
    router.reload();
  };

  // if (isSubmitting) {
  //   return <SpinnerComponent />;
  // }
  return (
    <Container>
      <Col>
        {showRemove && (
          <RemoveComponent
            showRemove={showRemove}
            setShowRemove={setShowRemove}
            removeFileData={removeFileData}
          />
        )}
        {showDownload && (
          <DownloadComponent
            showDownload={showDownload}
            setShowDownload={setShowDownload}
            downloadFileData={downloadFileData}
          />
        )}
        <Card style={{ marginTop: 100, padding: 20 }}>
          <div
            {...getRootProps()}
            style={{ borderStyle: "dashed", margin: 15, cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p style={{ textAlign: "center" }}>
                {selectedFileName
                  ? `Selected file: ${selectedFileName}`
                  : "Drag and drop a only PDF file here within 3mb size limit, or click to select a file"}
              </p>
            )}
          </div>
          <button onClick={upload}>Upload</button>
        </Card>
      </Col>
      <Col style={{ marginTop: 20 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Uploaded Date</th>
              <th>Download</th>
              <th>Remove</th>
            </tr>
          </thead>
          {data.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", fontWeight: "bolder" }}
                >
                  No records found
                </td>
              </tr>
            </tbody>
          ) : (
            data.map((file, index) => (
              <tbody key={file._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{file.fileName}</td>
                  <td>{file.createdAt}</td>
                  <td>
                    <Button
                      className="btn-secondary"
                      onClick={() => handleDownloadFile(file)}
                    >
                      Download
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn-secondary"
                      onClick={() => handleRemoveFile(file)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </Table>
      </Col>
      <Modal show={showOtp} onHide={handleOtpModel}>
        <Modal.Header closeButton>
          <Modal.Title>OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your OTP is: {otp}</Modal.Body>
      </Modal>
    </Container>
  );
};

export default HomeContainer;
